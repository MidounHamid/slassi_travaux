"use client";

import React from "react";
import {
  ExternalLink,
  Columns,
  Maximize2,
  RefreshCw,
  Plus,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

interface SubHeaderProps {
  currentPath: string;
  onNewPageClick: () => void;
  onRefresh: () => void;
  onViewLayoutsClick: () => void;
}

export function SubHeader({
  currentPath = "Congratulations",
  onNewPageClick,
  onRefresh,
  onViewLayoutsClick,
}: SubHeaderProps) {
  const { t } = useLanguage();

  return (
    <div className="h-10 w-full bg-[#1e293b]/50 border-b border-slate-800/80 px-4 flex items-center justify-between text-xs text-slate-300">
      {/* Breadcrumb Path from the screenshot: "Path: / Congratulations" */}
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <span className="text-slate-400 font-medium">{t("path_label")}</span>
        <div className="flex items-center space-x-1.5 rtl:space-x-reverse font-mono text-slate-200 bg-slate-900/60 px-2 py-0.5 rounded border border-slate-700/60">
          <span className="text-slate-500">/</span>
          <span className="flex items-center space-x-1 rtl:space-x-reverse text-sky-400 font-semibold">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-1 rtl:mr-0 rtl:ml-1 animate-pulse" />
            {currentPath}
          </span>
        </div>
      </div>

      {/* Right Action Icons matching screenshot */}
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <Button
          variant="outline"
          size="xs"
          onClick={onViewLayoutsClick}
          className="text-xs flex items-center space-x-1 rtl:space-x-reverse text-slate-300 hover:text-white"
        >
          <Layers className="h-3 w-3 text-sky-400" />
          <span className="hidden sm:inline">{t("available_layouts")}</span>
        </Button>

        <Button
          variant="default"
          size="xs"
          onClick={onNewPageClick}
          className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-semibold flex items-center space-x-1 rtl:space-x-reverse shadow-sm"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>{t("new_page")}</span>
        </Button>

        <div className="h-4 w-[1px] bg-slate-700 mx-1 hidden sm:block" />

        {/* Screenshot utility icons: View, Split view, Refresh */}
        <button
          onClick={onRefresh}
          title={t("refresh_tooltip")}
          className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <RefreshCw className="h-3.5 w-3.5" />
        </button>

        <button
          title={t("split_view_tooltip")}
          className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <Columns className="h-3.5 w-3.5" />
        </button>

        <button
          title={t("fullscreen_tooltip")}
          className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <Maximize2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
