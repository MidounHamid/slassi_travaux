"use client";

import React, { useState } from "react";
import {
  FolderTree,
  HardHat,
  Truck,
  Calculator,
  FileImage,
  Sliders,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Shield,
  Layers,
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

  const navigationItems = [
    {
      group: t("group_structure"),
      items: [
        {
          id: "pagetree",
          label: t("nav_pagetree"),
          desc: t("nav_pagetree_desc"),
          icon: FolderTree,
          badge: "10",
        },
        {
          id: "layouts",
          label: t("nav_layouts"),
          desc: t("nav_layouts_desc"),
          icon: Layers,
          badge: "6",
        },
      ],
    },
    {
      group: t("group_content"),
      items: [
        {
          id: "projects",
          label: t("nav_projects"),
          desc: t("nav_projects_desc"),
          icon: HardHat,
          badge: "18",
        },
        {
          id: "machinery",
          label: t("nav_machinery"),
          desc: t("nav_machinery_desc"),
          icon: Truck,
          badge: "24",
        },
        {
          id: "quotes",
          label: t("nav_quotes"),
          desc: t("nav_quotes_desc"),
          icon: Calculator,
          badge: "12",
          badgeColor: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
        },
        {
          id: "media",
          label: t("nav_media"),
          desc: t("nav_media_desc"),
          icon: FileImage,
        },
      ],
    },
    {
      group: t("group_system"),
      items: [
        {
          id: "analytics",
          label: t("nav_analytics"),
          desc: t("nav_analytics_desc"),
          icon: TrendingUp,
        },
        {
          id: "settings",
          label: t("nav_settings"),
          desc: t("nav_settings_desc"),
          icon: Sliders,
        },
      ],
    },
  ];

  return (
    <aside
      className={cn(
        "h-[calc(100vh-3rem)] bg-[#0c1220] border-r rtl:border-r-0 rtl:border-l border-slate-800 flex flex-col justify-between transition-all duration-200 select-none shrink-0 z-30",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Top Sidebar Header / Title */}
      <div className="flex flex-col">
        <div className="h-10 px-3 border-b border-slate-800/80 flex items-center justify-between text-slate-400 text-xs font-semibold">
          {!collapsed && (
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="uppercase tracking-wider text-[11px] text-slate-400">
                {t("main_menu")}
              </span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer ml-auto rtl:ml-0 rtl:mr-auto"
            title={collapsed ? "Expand" : "Collapse"}
          >
            {collapsed ? (
              language === "ar" ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
            ) : (
              language === "ar" ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Navigation list */}
        <div className="p-2 space-y-4 overflow-y-auto max-h-[calc(100vh-12rem)]">
          {navigationItems.map((group, idx) => (
            <div key={idx} className="space-y-1">
              {!collapsed && (
                <div className="px-2 text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  {group.group}
                </div>
              )}
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectSection(item.id)}
                    className={cn(
                      "w-full flex items-center space-x-2.5 rtl:space-x-reverse px-2.5 py-2 rounded-md text-xs font-medium transition-all cursor-pointer group text-left rtl:text-right",
                      isActive
                        ? "bg-sky-600/20 text-sky-300 border border-sky-500/30 shadow-xs"
                        : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-100"
                    )}
                    title={collapsed ? item.label : undefined}
                  >
                    <Icon
                      className={cn(
                        "h-4 w-4 shrink-0 transition-transform group-hover:scale-110",
                        isActive ? "text-sky-400" : "text-slate-400 group-hover:text-slate-200"
                      )}
                    />
                    {!collapsed && (
                      <div className="flex flex-1 items-center justify-between min-w-0">
                        <div className="truncate">
                          <div className={cn("truncate font-medium", isActive && "text-white")}>
                            {item.label}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate">
                            {item.desc}
                          </div>
                        </div>
                        {item.badge && (
                          <span
                            className={cn(
                              "text-[10px] px-1.5 py-0.2 rounded font-mono ml-1.5 rtl:ml-0 rtl:mr-1.5 shrink-0",
                              item.badgeColor || "bg-slate-800 text-slate-300 border border-slate-700"
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
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Owner Company Info Card */}
      {!collapsed ? (
        <div className="p-3 border-t border-slate-800/80 bg-slate-900/40 text-xs">
          <div className="flex items-center space-x-2 rtl:space-x-reverse mb-1.5">
            <Shield className="h-4 w-4 text-amber-500 shrink-0" />
            <div className="font-semibold text-slate-200 truncate">
              {t("company_footer_title")}
            </div>
          </div>
          <p className="text-[11px] text-slate-400 leading-tight">
            <span className="text-amber-400 font-mono">{t("company_footer_capital")}</span>
          </p>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800 text-[10px] text-slate-400">
            <span className="flex items-center space-x-1 rtl:space-x-reverse">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{t("company_footer_cms")}</span>
            </span>
            <span className="font-mono text-slate-400">{t("company_footer_city")}</span>
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
