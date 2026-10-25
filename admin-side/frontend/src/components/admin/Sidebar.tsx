"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  HardHat,
  Truck,
  Calculator,
  FileText,
  Sliders,
  ChevronLeft,
  ChevronRight,
  Shield,
  Layers,
  FolderTree,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

interface SidebarProps {
  activeSection: string;
  onSelectSection: (section: string) => void;
}

export function Sidebar({ activeSection, onSelectSection }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { t, language } = useLanguage();

  const mainItems = [
    {
      id: "dashboard",
      label: t("nav_dashboard"),
      desc: t("nav_dashboard_desc"),
      icon: LayoutDashboard,
      highlight: true,
    },
    {
      id: "quotes",
      label: t("nav_quotes"),
      desc: t("nav_quotes_desc"),
      icon: Calculator,
      badge: "12",
      badgeColor: "bg-purple-500/20 text-purple-300 border border-purple-500/30",
    },
    {
      id: "projects",
      label: t("nav_projects"),
      desc: t("nav_projects_desc"),
      icon: HardHat,
      badge: "14",
      badgeColor: "bg-sky-500/20 text-sky-300 border border-sky-500/30",
    },
    {
      id: "machinery",
      label: t("nav_machinery"),
      desc: t("nav_machinery_desc"),
      icon: Truck,
      badge: "24",
      badgeColor: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
    },
    {
      id: "pages",
      label: t("nav_simple_pages"),
      desc: t("nav_simple_pages_desc"),
      icon: FileText,
      badge: "7",
      badgeColor: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
    },
    {
      id: "settings",
      label: t("nav_settings"),
      desc: t("nav_settings_desc"),
      icon: Building2,
    },
  ];

  const advancedItems = [
    {
      id: "pagetree",
      label: t("nav_pagetree"),
      desc: t("nav_pagetree_desc"),
      icon: FolderTree,
    },
    {
      id: "layouts",
      label: t("nav_layouts"),
      desc: t("nav_layouts_desc"),
      icon: Layers,
    },
  ];

  return (
    <aside
      className={cn(
        "h-[calc(100vh-3.5rem)] bg-[#0a0f1d] border-r rtl:border-r-0 rtl:border-l border-slate-800 flex flex-col justify-between transition-all duration-200 select-none shrink-0 z-30",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Top Sidebar Header / Title */}
      <div className="flex flex-col">
        <div className="h-10 px-3 border-b border-slate-800/80 flex items-center justify-between text-slate-400 text-xs font-semibold">
          {!collapsed && (
            <span className="uppercase tracking-wider text-[10px] font-bold text-slate-400">
              {t("main_menu")}
            </span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer ml-auto rtl:ml-0 rtl:mr-auto"
            title={collapsed ? "Agrandir" : "Réduire"}
          >
            {collapsed ? (
              language === "ar" ? (
                <ChevronLeft className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )
            ) : language === "ar" ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Main Simple Navigation List */}
        <div className="p-2 space-y-1.5 overflow-y-auto max-h-[calc(100vh-14rem)]">
          {mainItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectSection(item.id)}
                className={cn(
                  "w-full flex items-center space-x-2.5 rtl:space-x-reverse px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer group text-left rtl:text-right",
                  isActive
                    ? "bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-xs"
                    : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-100"
                )}
                title={collapsed ? item.label : undefined}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 shrink-0 transition-transform group-hover:scale-110",
                    isActive
                      ? "text-amber-400"
                      : "text-slate-400 group-hover:text-slate-200"
                  )}
                />
                {!collapsed && (
                  <div className="flex flex-1 items-center justify-between min-w-0">
                    <div className="truncate">
                      <div className={cn("truncate font-semibold", isActive && "text-white")}>
                        {item.label}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate font-normal">
                        {item.desc}
                      </div>
                    </div>
                    {item.badge && (
                      <span
                        className={cn(
                          "text-[10px] px-1.5 py-0.2 rounded font-mono ml-1.5 rtl:ml-0 rtl:mr-1.5 shrink-0 font-bold",
                          item.badgeColor
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}

          {/* Expert / Advanced Mode Divider */}
          <div className="pt-3 pb-1">
            {!collapsed && (
              <div className="px-2 text-[10px] uppercase font-bold tracking-wider text-slate-400 flex items-center justify-between">
                <span>{language === "ar" ? "الوضع المتقدم" : "Mode Avancé"}</span>
                <span className="text-[9px] text-slate-400 font-mono">CMS</span>
              </div>
            )}
          </div>

          {advancedItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectSection(item.id)}
                className={cn(
                  "w-full flex items-center space-x-2.5 rtl:space-x-reverse px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer group text-left rtl:text-right opacity-80 hover:opacity-100",
                  isActive
                    ? "bg-sky-600/20 text-sky-300 border border-sky-500/30"
                    : "text-slate-400 hover:bg-slate-800/40 hover:text-slate-200"
                )}
                title={collapsed ? item.label : undefined}
              >
                <Icon
                  className={cn(
                    "h-3.5 w-3.5 shrink-0 transition-transform",
                    isActive ? "text-sky-400" : "text-slate-400"
                  )}
                />
                {!collapsed && (
                  <div className="truncate">
                    <div className="truncate text-[11px]">{item.label}</div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Owner Company Info Card */}
      {!collapsed ? (
        <div className="p-3 border-t border-slate-800/80 bg-slate-900/40 text-xs">
          <div className="flex items-center space-x-2 rtl:space-x-reverse mb-1">
            <Shield className="h-4 w-4 text-amber-500 shrink-0" />
            <div className="font-bold text-slate-200 truncate text-[11px]">
              Slassi De Travaux SARL AU
            </div>
          </div>
          <p className="text-[10px] text-slate-400 leading-tight">
            Capital : <span className="text-amber-400 font-mono font-bold">17 000 000 DH</span>
          </p>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800 text-[10px] text-slate-400">
            <span className="flex items-center space-x-1 rtl:space-x-reverse text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Système Connecté</span>
            </span>
            <span className="text-slate-300 font-medium">Fès, Maroc</span>
          </div>
        </div>
      ) : (
        <div className="p-2 border-t border-slate-800 flex justify-center text-amber-500">
          <Shield className="h-4 w-4" />
        </div>
      )}
    </aside>
  );
}
