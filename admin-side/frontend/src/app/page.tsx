"use client";

import React, { useState } from "react";
import { TopHeader } from "@/components/admin/TopHeader";
import { Sidebar } from "@/components/admin/Sidebar";
import { SimpleDashboard } from "@/components/admin/SimpleDashboard";
import { SimpleProjects } from "@/components/admin/SimpleProjects";
import { SimpleMachinery } from "@/components/admin/SimpleMachinery";
import { SimplePages } from "@/components/admin/SimplePages";
import { PagetreeOverview } from "@/components/admin/PagetreeOverview";
import { LayoutsGallery } from "@/components/admin/LayoutsGallery";
import { CompanySettings } from "@/components/admin/CompanySettings";
import { QuotesList } from "@/components/admin/QuotesList";
import { LayoutPreviewModal } from "@/components/admin/LayoutPreviewModal";
import { NewPageModal } from "@/components/admin/NewPageModal";
import { PageEditModal } from "@/components/admin/PageEditModal";
import { INITIAL_PAGES } from "@/data/initialData";
import { PageNode, LayoutType } from "@/types/pagetree";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function AdminPage() {
  const { t, language } = useLanguage();
  const [pages, setPages] = useState<PageNode[]>(INITIAL_PAGES);
  // Default to clean, intuitive dashboard
  const [activeSection, setActiveSection] = useState<string>("dashboard");
  const [selectedPreviewLayout, setSelectedPreviewLayout] = useState<LayoutType | null>(null);
  const [editingPage, setEditingPage] = useState<PageNode | null>(null);
  const [isNewPageOpen, setIsNewPageOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
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
      return updated;
    });

    showToast(`Modèle de page mis à jour avec succès.`);
  };

  const handleAddPage = (newPageData: Partial<PageNode>) => {
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

    setPages((prev) => [...prev, newPage]);
    showToast(`Page "${newPage.title}" ajoutée avec succès.`);
  };

  const handleSavePage = (updatedPage: PageNode) => {
    setPages((prev) =>
      prev.map((p) => (p.id === updatedPage.id ? updatedPage : p))
    );
    showToast(`Propriétés de la page "${updatedPage.title}" enregistrées.`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080d1a] text-slate-100">
      {/* Top Header bar */}
      <TopHeader
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
                onSwitchToExpertMode={() => setActiveSection("pagetree")}
              />
            )}

            {/* 5. Inquiries & Quotes List */}
            {activeSection === "quotes" && <QuotesList />}

            {/* 6. Company Legal & Contact Settings */}
            {activeSection === "settings" && <CompanySettings />}

            {/* 7. Advanced Technical Pagetree Overview (TYPO3 CMS Style) */}
            {activeSection === "pagetree" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-xs text-slate-400">
                    Mode Expert : Arborescence technique avancée et règles d'héritage de modèles.
                  </span>
                  <button
                    onClick={() => setActiveSection("pages")}
                    className="text-xs text-amber-400 hover:underline cursor-pointer"
                  >
                    ← Revenir au Mode Simple (Recommandé)
                  </button>
                </div>
                <PagetreeOverview
                  pages={pages}
                  onUpdatePageLayout={handleUpdatePageLayout}
                  onPreviewLayout={(layout) => setSelectedPreviewLayout(layout)}
                  onEditPage={(page) => setEditingPage(page)}
                  onPreviewPage={(page) => setSelectedPreviewLayout(page.actualLayout)}
                />
              </div>
            )}

            {/* 8. Advanced Layouts Gallery */}
            {activeSection === "layouts" && (
              <LayoutsGallery
                onSelectPreview={(layout) => setSelectedPreviewLayout(layout)}
                onApplyToTree={(layout) => {
                  setSelectedPreviewLayout(layout);
                  showToast(`Gabarit "${layout}" sélectionné.`);
                }}
              />
            )}
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
