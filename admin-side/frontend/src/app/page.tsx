"use client";
import React, { useState, useEffect } from 'react';
import { TopHeader } from "@/components/admin/TopHeader";
import { Sidebar } from "@/components/admin/Sidebar";
import { SimpleDashboard } from "@/components/admin/SimpleDashboard";
import { SimpleProjects } from "@/components/admin/SimpleProjects";
import { SimpleMachinery } from "@/components/admin/SimpleMachinery";
import { SimplePages } from "@/components/admin/SimplePages";
import { CompanySettings } from "@/components/admin/CompanySettings";
import { QuotesList } from "@/components/admin/QuotesList";
import { LayoutPreviewModal } from "@/components/admin/LayoutPreviewModal";
import { NewPageModal } from "@/components/admin/NewPageModal";
import { PageEditModal } from "@/components/admin/PageEditModal";
import { INITIAL_PAGES } from "@/data/initialData";
import { PageNode, LayoutType } from "@/types/pagetree";
import { CheckCircle2, Building2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { api, AuthUser } from "@/lib/api";
import { LoginForm } from "@/components/admin/LoginForm";

export default function AdminPage() {
  const { t, language } = useLanguage();
  const [pages, setPages] = useState<PageNode[]>(INITIAL_PAGES);
  // Default to clean, intuitive dashboard
  const [activeSection, setActiveSection] = useState<string>("dashboard");
  const [selectedPreviewLayout, setSelectedPreviewLayout] = useState<LayoutType | null>(null);
  const [editingPage, setEditingPage] = useState<PageNode | null>(null);
  const [isNewPageOpen, setIsNewPageOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  // Check JWT authentication state on mount
  useEffect(() => {
    async function checkAuth() {
      if (api.isAuthenticated()) {
        const storedUser = api.getStoredUser();
        if (storedUser) {
          setCurrentUser(storedUser);
        }
        setIsAuthenticated(true);

        // Verify token in background against Laravel backend
        try {
          const res = await api.me();
          if (res.success && res.user) {
            setCurrentUser(res.user);
          }
        } catch (err) {
          console.warn("Session expired or token invalid:", err);
          setIsAuthenticated(false);
          setCurrentUser(null);
        }
      } else {
        setIsAuthenticated(false);
      }
    }
    checkAuth();
  }, []);

  // Fetch pages from API when authenticated
  useEffect(() => {
    if (!isAuthenticated) return;
    async function loadPages() {
      try {
        const data = await api.getPages();
        if (data && data.length > 0) {
          setPages(data);
        }
      } catch (err) {
        console.warn("Could not load pages from API, using defaults:", err);
      }
    }
    loadPages();
  }, [isAuthenticated]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleLoginSuccess = (user: AuthUser, token: string) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    showToast(language === "ar" ? `مرحباً بك، ${user.name}` : `Bienvenue, ${user.name}`);
  };

  const handleLogout = async () => {
    await api.logout();
    setCurrentUser(null);
    setIsAuthenticated(false);
    showToast(language === "ar" ? "تم تسجيل الخروج بنجاح" : "Déconnexion effectuée avec succès.");
  };

  // Update layout when changed from the select dropdowns
  const handleUpdatePageLayout = (
    pageId: string,
    field: "layoutThisPage" | "layoutSubpages",
    value: LayoutType | "None (Inherit)"
  ) => {
    setPages((prevPages) => {
      const targetPageIndex = prevPages.findIndex((p) => p.id === pageId);
      if (targetPageIndex === -1) return prevPages;

      const updated = [...prevPages];
      const currentPage = { ...updated[targetPageIndex] };

      if (field === "layoutThisPage") {
        currentPage.layoutThisPage = value;
        if (value !== "None (Inherit)") {
          currentPage.actualLayout = value;
        } else {
          const parent = prevPages.find((p) => p.id === currentPage.parentId);
          currentPage.actualLayout =
            parent && parent.layoutSubpages !== "None (Inherit)"
              ? parent.layoutSubpages
              : "Default";
        }
      } else {
        currentPage.layoutSubpages = value;
        if (value !== "None (Inherit)") {
          for (let i = 0; i < updated.length; i++) {
            if (
              updated[i].parentId === pageId &&
              updated[i].layoutThisPage === "None (Inherit)"
            ) {
              updated[i] = {
                ...updated[i],
                actualLayout: value,
              };
            }
          }
        }
      }

      updated[targetPageIndex] = currentPage;

      // Sync to API
      api.updatePage(pageId, {
        [field]: value,
        actualLayout: currentPage.actualLayout,
      }).catch(err => console.warn("Failed syncing page layout to API:", err));

      return updated;
    });

    showToast(`Modèle de page mis à jour avec succès.`);
  };

  const handleAddPage = async (newPageData: Partial<PageNode>) => {
    const newPage: PageNode = {
      id: `page-${Date.now()}`,
      title: newPageData.title || "Nouvelle Page",
      slug: newPageData.slug || "nouvelle-page",
      depth: 1,
      iconType: "page",
      actualLayout: newPageData.actualLayout || "Default",
      layoutThisPage: newPageData.layoutThisPage || "Default",
      layoutSubpages: "None (Inherit)",
      status: "published",
      hasChildren: false,
      expanded: false,
      author: "Hamid Slassi",
      lastModified: "À l'instant",
      parentId: "page-1",
    };

    try {
      const created = await api.createPage(newPage);
      setPages((prev) => [...prev, created]);
    } catch (err) {
      console.warn("Failed creating page on API, saving locally:", err);
      setPages((prev) => [...prev, newPage]);
    }
    showToast(`Page "${newPage.title}" ajoutée avec succès.`);
  };

  const handleSavePage = async (updatedPage: PageNode) => {
    setPages((prev) =>
      prev.map((p) => (p.id === updatedPage.id ? updatedPage : p))
    );
    try {
      await api.updatePage(updatedPage.id, updatedPage);
    } catch (err) {
      console.warn("Failed saving page to API:", err);
    }
    showToast(`Propriétés de la page "${updatedPage.title}" enregistrées.`);
  };

  // 1. Initial hydration / checking JWT session
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#070b14] text-slate-300">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black mb-4 shadow-lg shadow-amber-500/20 animate-pulse">
          <Building2 className="h-6 w-6" />
        </div>
        <div className="h-5 w-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
          Slassi Travaux • Chargement sécurisé...
        </p>
      </div>
    );
  }

  // 2. Unauthenticated: Render the JWT Login Form
  if (!isAuthenticated) {
    return <LoginForm onLoginSuccess={handleLoginSuccess} />;
  }

  // 3. Authenticated: Render the Admin Dashboard
  return (
    <div className="min-h-screen flex flex-col bg-[#080d1a] text-slate-100">
      {/* Top Header bar */}
      <TopHeader
        user={currentUser}
        onLogout={handleLogout}
        onSearchClick={() => setActiveSection("dashboard")}
        onNavigateHome={() => setActiveSection("dashboard")}
      />

      {/* Main Workspace: Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Dark Sidebar */}
        <Sidebar
          activeSection={activeSection}
          onSelectSection={(sec) => setActiveSection(sec)}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-[#080d1a]">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* 1. Simplified Dashboard (Default View) */}
            {activeSection === "dashboard" && (
              <SimpleDashboard
                onNavigate={(sec) => setActiveSection(sec)}
                onNewProjectClick={() => setActiveSection("projects")}
                onNewMachineClick={() => setActiveSection("machinery")}
              />
            )}

            {/* 2. Simplified Projects & Construction Sites */}
            {activeSection === "projects" && <SimpleProjects />}

            {/* 3. Simplified Heavy Machinery Fleet */}
            {activeSection === "machinery" && <SimpleMachinery />}

            {/* 4. Simplified Website Pages */}
            {activeSection === "pages" && (
              <SimplePages
                pages={pages}
                onUpdatePageLayout={handleUpdatePageLayout}
                onPreviewLayout={(layout) => setSelectedPreviewLayout(layout)}
              />
            )}

            {/* 5. Inquiries & Quotes List */}
            {activeSection === "quotes" && <QuotesList />}

            {/* 6. Company Legal & Contact Settings */}
            {activeSection === "settings" && <CompanySettings />}
          </div>
        </main>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center space-x-2 rtl:space-x-reverse rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-xs text-slate-100 shadow-2xl animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modals */}
      <LayoutPreviewModal
        layoutName={selectedPreviewLayout}
        open={Boolean(selectedPreviewLayout)}
        onClose={() => setSelectedPreviewLayout(null)}
      />

      <NewPageModal
        open={isNewPageOpen}
        onClose={() => setIsNewPageOpen(false)}
        onAddPage={handleAddPage}
        pages={pages}
      />

      <PageEditModal
        page={editingPage}
        open={Boolean(editingPage)}
        onClose={() => setEditingPage(null)}
        onSave={handleSavePage}
      />
    </div>
  );
}
