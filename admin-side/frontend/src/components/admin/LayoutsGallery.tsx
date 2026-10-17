"use client";

import React from "react";
import { AVAILABLE_LAYOUTS } from "@/data/initialData";
import { LayoutType } from "@/types/pagetree";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Check, Layers } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface LayoutsGalleryProps {
  onSelectPreview: (layout: LayoutType) => void;
  onApplyToTree: (layout: LayoutType) => void;
}

export function LayoutsGallery({ onSelectPreview, onApplyToTree }: LayoutsGalleryProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center space-x-2 rtl:space-x-reverse">
            <Layers className="h-5 w-5 text-amber-500" />
            <span>{t("gallery_title")}</span>
          </h2>
          <p className="text-xs text-slate-400">
            {t("gallery_desc")}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {AVAILABLE_LAYOUTS.map((layout) => (
          <Card
            key={layout.id}
            className="border-slate-800 bg-slate-900/70 hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center justify-between mb-1.5">
                <Badge
                  variant={layout.id === "Special Startpage" ? "amber" : "secondary"}
                  className="text-[10px]"
                >
                  {layout.columns} {t("col_badge")}
                </Badge>
                <div className="flex space-x-1 rtl:space-x-reverse">
                  {layout.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <CardTitle className="text-sm font-bold text-white">
                {layout.id}
              </CardTitle>
              <CardDescription className="text-xs text-slate-400 mt-1 line-clamp-3">
                {layout.description}
              </CardDescription>
            </CardHeader>

            {/* Visual Mini Wireframe */}
            <CardContent className="p-4 pt-1">
              <div className="h-24 rounded border border-slate-800 bg-[#090d16] p-2 flex flex-col justify-between">
                <div className="h-4 rounded bg-slate-800 flex items-center px-2 text-[8px] text-slate-400 font-mono">
                  En-tête Navigation & Menu
                </div>
                <div className="flex-1 my-1.5 grid gap-1" style={{ gridTemplateColumns: `repeat(${layout.columns}, minmax(0, 1fr))` }}>
                  {Array.from({ length: layout.columns }).map((_, i) => (
                    <div
                      key={i}
                      className="rounded bg-sky-950/30 border border-sky-500/20 flex items-center justify-center text-[8px] text-sky-400 font-mono"
                    >
                      Col {i + 1}
                    </div>
                  ))}
                </div>
                <div className="h-3 rounded bg-slate-800/60 flex items-center px-2 text-[7px] text-slate-400 font-mono">
                  Pied de page & Mentions SARL AU
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-4 pt-0 flex justify-between gap-2 border-t border-slate-800/80 mt-2">
              <Button
                variant="outline"
                size="xs"
                onClick={() => onSelectPreview(layout.id)}
                className="flex-1 flex items-center justify-center space-x-1 rtl:space-x-reverse text-slate-300 hover:text-white"
              >
                <Eye className="h-3.5 w-3.5" />
                <span>{t("btn_simulate")}</span>
              </Button>
              <Button
                variant="cms"
                size="xs"
                onClick={() => onApplyToTree(layout.id)}
                className="flex-1 flex items-center justify-center space-x-1 rtl:space-x-reverse bg-amber-600/20 text-amber-300 border-amber-500/30 hover:bg-amber-600/30"
              >
                <Check className="h-3.5 w-3.5" />
                <span>{t("btn_assign")}</span>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
