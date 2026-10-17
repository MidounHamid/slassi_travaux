"use client";

import React, { useState } from "react";
import { TopHeader } from "@/components/admin/TopHeader";
import { SubHeader } from "@/components/admin/SubHeader";
import { Sidebar } from "@/components/admin/Sidebar";
import { PagetreeOverview } from "@/components/admin/PagetreeOverview";
import { OwnerStatsCards } from "@/components/admin/OwnerStatsCards";
import { LayoutsGallery } from "@/components/admin/LayoutsGallery";
import { CompanySettings } from "@/components/admin/CompanySettings";
import { QuotesList } from "@/components/admin/QuotesList";
import { LayoutPreviewModal } from "@/components/admin/LayoutPreviewModal";
import { NewPageModal } from "@/components/admin/NewPageModal";
import { PageEditModal } from "@/components/admin/PageEditModal";
import { INITIAL_PAGES, AVAILABLE_LAYOUTS } from "@/data/initialData";
import { PageNode, LayoutType } from "@/types/pagetree";
import { CheckCircle2, HardHat, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/LanguageContext";

export default function AdminPage() {
  const { t, language } = useLanguage();
  const [pages, setPages] = useState<PageNode[]>(INITIAL_PAGES);
  const [activeSection, setActiveSection] = useState<string>("pagetree");
  const [selectedPreviewLayout, setSelectedPreviewLayout] = useState<LayoutType | null>(null);
  const [editingPage, setEditingPage] = useState<PageNode | null>(null);
  const [isNewPageOpen, setIsNewPageOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Update layout when changed from the select dropdowns in the table
  const handleUpdatePageLayout = (
    pageId: string,
    field: "layoutThisPage" | "layoutSubpages",
    value: LayoutType | "None (Inherit)"
  ) => {
    setPages((prevPages) => {
      // Find the parent to determine inheritance if needed
      const targetPageIndex = prevPages.findIndex((p) => p.id === pageId);
      if (targetPageIndex === -1) return prevPages;

      const updated = [...prevPages];
      const currentPage = { ...updated[targetPageIndex] };

      if (field === "layoutThisPage") {
        currentPage.layoutThisPage = value;
        if (value !== "None (Inherit)") {
          currentPage.actualLayout = value;
        } else {
          // inherit from parent's layoutSubpages or default
          const parent = prevPages.find((p) => p.id === currentPage.parentId);
          currentPage.actualLayout =
            parent && parent.layoutSubpages !== "None (Inherit)"
              ? parent.layoutSubpages
              : "Default";
        }
      } else {
        currentPage.layoutSubpages = value;
        // Optionally update children who inherit
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

    showToast(`Mise à jour du layout effectuée avec succès pour cette page.`);
  };

  const handleAddPage = (newPageData: Partial<PageNode>) => {
    const newPage: PageNode = {
      id: `page-${Date.now()}`,
      title: newPageData.title || "Nouvelle Page",
      slug: newPageData.slug || "nouvelle-page",
      depth: newPageData.depth || 1,
      iconType: newPageData.iconType || "page",
      actualLayout: newPageData.actualLayout || "Default",
      layoutThisPage: newPageData.layoutThisPage || "Default",
      layoutSubpages: newPageData.layoutSubpages || "None (Inherit)",
      status: "published",
      hasChildren: false,
      expanded: false,
      author: "Hamid Slassi",
      lastModified: "À l'instant",
      parentId: newPageData.parentId || "page-1",
    };

    setPages((prev) => [...prev, newPage]);
    showToast(`Page "${newPage.title}" ajoutée à l'arborescence.`);
  };

  const handleSavePage = (updatedPage: PageNode) => {
    setPages((prev) =>
      prev.map((p) => (p.id === updatedPage.id ? updatedPage : p))
    );
    showToast(`Propriétés de la page "${updatedPage.title}" enregistrées.`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19] text-slate-100">
      {/* Top Header bar matching screenshot */}
      <TopHeader onSearchClick={() => setActiveSection("pagetree")} />

      {/* Breadcrumbs Sub-header matching screenshot */}
      <SubHeader
        currentPath={
          activeSection === "pagetree"
            ? (language === "ar" ? "الصفحة الرئيسية (Congratulations)" : "Congratulations")
            : activeSection === "layouts"
            ? t("nav_layouts")
            : activeSection === "quotes"
            ? t("nav_quotes")
            : t("nav_settings")
        }
        onNewPageClick={() => setIsNewPageOpen(true)}
        onRefresh={() => showToast(language === "ar" ? "تم تحديث شجرة الموقع." : language === "en" ? "Tree data refreshed successfully." : "Données de l'arborescence rechargées.")}
        onViewLayoutsClick={() => setActiveSection("layouts")}
      />

      {/* Main Workspace: Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Dark Sidebar */}
        <Sidebar
          activeSection={activeSection}
          onSelectSection={(sec) => setActiveSection(sec)}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#0b0f19]">
          <div className="max-w-7xl mx-auto space-y-5">
            {/* Owner KPIs overview */}
            <OwnerStatsCards
              totalPages={pages.length}
              activeLayoutsCount={AVAILABLE_LAYOUTS.length}
            />

            {/* Dynamic View based on Active Section */}
            {activeSection === "pagetree" && (
              <PagetreeOverview
                pages={pages}
                onUpdatePageLayout={handleUpdatePageLayout}
                onPreviewLayout={(layout) => setSelectedPreviewLayout(layout)}
                onEditPage={(page) => setEditingPage(page)}
                onPreviewPage={(page) => setSelectedPreviewLayout(page.actualLayout)}
              />
            )}

            {activeSection === "layouts" && (
              <LayoutsGallery
                onSelectPreview={(layout) => setSelectedPreviewLayout(layout)}
                onApplyToTree={(layout) => {
                  setSelectedPreviewLayout(layout);
                  showToast(`Gabarit "${layout}" sélectionné.`);
                }}
              />
            )}

            {activeSection === "quotes" && <QuotesList />}

            {activeSection === "settings" && <CompanySettings />}

            {activeSection === "projects" && (
              <div className="p-6 rounded-lg border border-slate-800 bg-slate-900/60 space-y-4">
                <div className="flex items-center space-x-2 text-white">
                  <HardHat className="h-5 w-5 text-amber-500" />
                  <h2 className="text-lg font-bold">Chantiers & Projets BTP Slassi</h2>
                </div>
                <p className="text-xs text-slate-400">
                  Visualisez et associez les chantiers (VRD, Gros Œuvre, Voirie) au gabarit "Showcase Gallery".
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded border border-slate-700 bg-slate-800/60">
                    <div className="font-bold text-slate-200">Plateforme Logistique Fès-Sud</div>
                    <div className="text-[11px] text-slate-400">Terrassement de 35 000 m²</div>
                    <Badge variant="success" className="text-[9px] mt-2">En Cours</Badge>
                  </div>
                  <div className="p-3 rounded border border-slate-700 bg-slate-800/60">
                    <div className="font-bold text-slate-200">Voirie & Assainissement Bensouda</div>
                    <div className="text-[11px] text-slate-400">Pose de collecteurs 1200mm</div>
                    <Badge variant="default" className="text-[9px] mt-2">Réceptionné</Badge>
                  </div>
                  <div className="p-3 rounded border border-slate-700 bg-slate-800/60">
                    <div className="font-bold text-slate-200">Résidence Les Jardins du Saïss</div>
                    <div className="text-[11px] text-slate-400">Gros œuvre 4 blocs R+6</div>
                    <Badge variant="warning" className="text-[9px] mt-2">Finitions</Badge>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "machinery" && (
              <div className="p-6 rounded-lg border border-slate-800 bg-slate-900/60 space-y-4">
                <div className="flex items-center space-x-2 text-white">
                  <Truck className="h-5 w-5 text-amber-500" />
                  <h2 className="text-lg font-bold">Flotte & Parc d'Engins de Terrassement</h2>
                </div>
                <p className="text-xs text-slate-400">
                  Catalogue relié en direct au gabarit "Catalog & Fleet Grid" de la page "Customize / Parc Matériel".
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded border border-slate-700 bg-slate-800/60">
                    <span className="font-mono text-amber-400 font-bold block">ENG-01</span>
                    <span className="font-semibold text-white">Pelle Chenille CAT 330D</span>
                    <span className="text-[10px] text-slate-400 block mt-1">30 Tonnes • Godet 1.8m³</span>
                  </div>
                  <div className="p-3 rounded border border-slate-700 bg-slate-800/60">
                    <span className="font-mono text-amber-400 font-bold block">ENG-02</span>
                    <span className="font-semibold text-white">Bulldozer Komatsu D65PX</span>
                    <span className="text-[10px] text-slate-400 block mt-1">21 Tonnes • Lame Orientable</span>
                  </div>
                  <div className="p-3 rounded border border-slate-700 bg-slate-800/60">
                    <span className="font-mono text-amber-400 font-bold block">ENG-03</span>
                    <span className="font-semibold text-white">Niveleuse CAT 140M</span>
                    <span className="text-[10px] text-slate-400 block mt-1">19 Tonnes • Précision Laser</span>
                  </div>
                  <div className="p-3 rounded border border-slate-700 bg-slate-800/60">
                    <span className="font-mono text-amber-400 font-bold block">ENG-04</span>
                    <span className="font-semibold text-white">Compacteur Bomag BW213</span>
                    <span className="text-[10px] text-slate-400 block mt-1">13 Tonnes • Vibrant Monocylindre</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center space-x-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-xs text-slate-100 shadow-2xl animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
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
