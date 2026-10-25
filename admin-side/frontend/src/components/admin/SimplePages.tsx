"use client";

import React from "react";
import {
  FileText,
  ExternalLink,
  Eye,
  Layers,
  Sparkles,
  CheckCircle2,
  SlidersHorizontal,
  Home,
  Info,
  Briefcase,
  HardHat,
  Truck,
  Calculator,
  Phone,
} from "lucide-react";
import { PageNode, LayoutType } from "@/types/pagetree";
import { AVAILABLE_LAYOUTS } from "@/data/initialData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

interface SimplePagesProps {
  pages: PageNode[];
  onUpdatePageLayout: (
    pageId: string,
    field: "layoutThisPage" | "layoutSubpages",
    value: LayoutType | "None (Inherit)"
  ) => void;
  onPreviewLayout: (layout: LayoutType) => void;
  onSwitchToExpertMode: () => void;
}

export function SimplePages({
  pages,
  onUpdatePageLayout,
  onPreviewLayout,
  onSwitchToExpertMode,
}: SimplePagesProps) {
  const { t, language } = useLanguage();

  const getPageIcon = (slug: string) => {
    switch (slug) {
      case "":
        return Home;
      case "about":
        return Info;
      case "services":
        return Briefcase;
      case "projects":
        return HardHat;
      case "equipment":
        return Truck;
      case "estimator":
        return Calculator;
      case "contact":
        return Phone;
      default:
        return FileText;
    }
  };

  const getPageUrl = (slug: string) => {
    return slug ? `http://localhost:3000/${slug}` : "http://localhost:3000";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Gestion Simple & Directe</span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Pages Publiques de Votre Site Web
          </h1>
          <p className="text-xs text-slate-400">
            Visualisez et modifiez directement le modèle de présentation de chaque page du site Slassi Travaux.
          </p>
        </div>

        <Button
          variant="outline"
          onClick={onSwitchToExpertMode}
          className="text-xs border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <SlidersHorizontal className="h-3.5 w-3.5 text-sky-400" />
          <span>Mode Arborescence Technique (TYPO3)</span>
        </Button>
      </div>

      {/* Pages List */}
      <div className="space-y-3">
        {pages.map((p, index) => {
          const PageIcon = getPageIcon(p.slug);
          const liveUrl = getPageUrl(p.slug);

          return (
            <div
              key={p.id}
              className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              {/* Page Identity */}
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-amber-400 shrink-0">
                  <PageIcon className="h-5 w-5" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white">{p.title}</h3>
                    <Badge variant="success" className="text-[10px] py-0 px-2">
                      En ligne
                    </Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                    <span className="font-mono text-sky-400 text-[11px]">
                      /{p.slug}
                    </span>
                    <span>•</span>
                    <span className="text-slate-400">
                      Modifié : {p.lastModified}
                    </span>
                  </div>
                </div>
              </div>

              {/* Layout Selector and Actions */}
              <div className="flex flex-wrap items-center gap-3 self-stretch md:self-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-800">
                {/* Layout Dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 hidden lg:inline">
                    Gabarit :
                  </span>
                  <select
                    value={p.actualLayout}
                    onChange={(e) =>
                      onUpdatePageLayout(
                        p.id,
                        "layoutThisPage",
                        e.target.value as LayoutType
                      )
                    }
                    className="h-8 px-2.5 text-xs rounded-lg bg-slate-800 border border-slate-700 text-slate-200 font-medium focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
                  >
                    {AVAILABLE_LAYOUTS.map((layout) => (
                      <option key={layout.id} value={layout.id}>
                        {layout.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-1.5">
                  <Button
                    size="xs"
                    variant="outline"
                    onClick={() => onPreviewLayout(p.actualLayout)}
                    title="Voir l'aperçu du modèle"
                    className="text-xs text-slate-300 hover:text-white flex items-center gap-1 border-slate-700"
                  >
                    <Eye className="h-3.5 w-3.5 text-amber-400" />
                    <span>Aperçu</span>
                  </Button>

                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors"
                  >
                    <span>Voir en direct</span>
                    <ExternalLink className="h-3 w-3 text-sky-400" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
