"use client";

import React from "react";
import {
  Star,
  FileEdit,
  FileText,
  Info,
  LayoutGrid,
  Search,
  ExternalLink,
  ChevronDown,
  Building2,
  ShieldCheck,
  Languages,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { useLanguage } from "@/context/LanguageContext";

interface TopHeaderProps {
  onSearchClick?: () => void;
}

export function TopHeader({ onSearchClick }: TopHeaderProps) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="h-12 w-full bg-[#111827] border-b border-slate-800 flex items-center justify-between px-3 text-slate-300 select-none sticky top-0 z-40">
      {/* Left: Site switcher & Brand */}
      <div className="flex items-center space-x-3 rtl:space-x-reverse">
        <div className="flex items-center space-x-2 rtl:space-x-reverse px-2 py-1 rounded bg-slate-800/80 border border-slate-700/60 text-xs font-semibold text-white">
          <Building2 className="h-3.5 w-3.5 text-amber-500" />
          <span className="tracking-wide">{t("brand_name")}</span>
          <span className="text-[10px] text-amber-400 font-mono bg-amber-500/10 px-1 py-0.2 rounded border border-amber-500/20">
            {t("prod_badge")}
          </span>
          <ChevronDown className="h-3 w-3 text-slate-400 opacity-60" />
        </div>

        <div className="h-4 w-[1px] bg-slate-800 hidden sm:block" />

        <div className="hidden md:flex items-center space-x-1 rtl:space-x-reverse text-xs text-slate-400">
          <span className="text-slate-500">{t("site_label")}</span>
          <span className="text-slate-200 font-medium hover:text-white cursor-pointer transition-colors">
            {t("site_value")}
          </span>
        </div>
      </div>

      {/* Center / Right: Quick Action icons + Language Toggle */}
      <div className="flex items-center space-x-1 sm:space-x-2 rtl:space-x-reverse">
        {/* Screenshot Icons: Star, Quick Edit, Documents, Info, Grid */}
        <button
          title={t("fav_tooltip")}
          className="p-1.5 rounded text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <Star className="h-4 w-4" />
        </button>

        <button
          title={t("edit_tooltip")}
          className="p-1.5 rounded text-slate-400 hover:text-sky-400 hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <FileEdit className="h-4 w-4" />
        </button>

        <button
          title={t("media_tooltip")}
          className="p-1.5 rounded text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <FileText className="h-4 w-4" />
        </button>

        <button
          title={t("help_tooltip")}
          className="p-1.5 rounded text-slate-400 hover:text-purple-400 hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <Info className="h-4 w-4" />
        </button>

        <button
          title={t("modules_tooltip")}
          className="p-1.5 rounded text-slate-400 hover:text-indigo-400 hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <LayoutGrid className="h-4 w-4" />
        </button>

        <div className="h-4 w-[1px] bg-slate-800 mx-1" />

        {/* Language Switcher Pill: FR / EN / AR */}
        <div className="flex items-center p-0.5 rounded-lg bg-slate-800/90 border border-slate-700">
          <button
            type="button"
            onClick={() => setLanguage("fr")}
            className={`px-2 py-0.5 text-[11px] font-semibold rounded transition-all cursor-pointer ${
              language === "fr"
                ? "bg-sky-600 text-white shadow-xs"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            FR
          </button>
          <button
            type="button"
            onClick={() => setLanguage("en")}
            className={`px-2 py-0.5 text-[11px] font-semibold rounded transition-all cursor-pointer ${
              language === "en"
                ? "bg-sky-600 text-white shadow-xs"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => setLanguage("ar")}
            className={`px-2 py-0.5 text-[11px] font-semibold rounded transition-all cursor-pointer ${
              language === "ar"
                ? "bg-amber-600 text-slate-950 font-bold shadow-xs"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            عربي
          </button>
        </div>

        <div className="h-4 w-[1px] bg-slate-800 mx-1" />

        {/* User Pill from screenshot: "Klass Admin" */}
        <div className="flex items-center space-x-2 rtl:space-x-reverse px-2 py-1 rounded-full bg-slate-800/90 hover:bg-slate-800 border border-slate-700 cursor-pointer transition-colors">
          <Avatar
            size="sm"
            fallback="KA"
            className="bg-amber-600 text-slate-950 font-bold border-amber-400/40"
          />
          <div className="flex flex-col text-left rtl:text-right pr-1 rtl:pr-0 rtl:pl-1">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <span className="text-xs font-semibold text-slate-100">{t("user_name")}</span>
              <ShieldCheck className="h-3 w-3 text-emerald-400" />
            </div>
            <span className="text-[10px] text-slate-400 leading-none">{t("user_role")}</span>
          </div>
          <ChevronDown className="h-3 w-3 text-slate-400 opacity-60" />
        </div>

        {/* Search Input from screenshot */}
        <div
          onClick={onSearchClick}
          className="relative hidden lg:flex items-center cursor-pointer"
        >
          <div className="flex items-center space-x-2 rtl:space-x-reverse h-7 rounded-md border border-slate-700 bg-slate-900/90 px-2.5 text-xs text-slate-400 hover:border-slate-600 transition-colors w-40 xl:w-56 justify-between">
            <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
              <Search className="h-3.5 w-3.5 text-slate-400" />
              <span>{t("search_placeholder")}</span>
            </div>
            <kbd className="font-mono text-[10px] bg-slate-800 px-1 py-0.5 rounded text-slate-400 border border-slate-700">
              {t("ctrl_k")}
            </kbd>
          </div>
        </div>

        {/* Public Site button */}
        <a
          href="http://localhost:3000"
          target="_blank"
          rel="noreferrer"
          className="hidden sm:inline-flex items-center space-x-1 rtl:space-x-reverse text-xs px-2.5 py-1 rounded bg-sky-600/20 text-sky-400 hover:bg-sky-600/30 border border-sky-500/30 transition-colors"
        >
          <span>{t("view_site")}</span>
          <ExternalLink className="h-3 w-3 ml-0.5 rtl:ml-0 rtl:mr-0.5" />
        </a>
      </div>
    </header>
  );
}
