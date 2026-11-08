"use client";

import React from "react";
import {
  ExternalLink,
  ChevronDown,
  Building2,
  ShieldCheck,
  Search,
  Sparkles,
  LogOut,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { useLanguage } from "@/context/LanguageContext";
import { AuthUser } from "@/lib/api";

interface TopHeaderProps {
  onSearchClick?: () => void;
  onNavigateHome?: () => void;
  user?: AuthUser | null;
  onLogout?: () => void;
}

export function TopHeader({ onSearchClick, onNavigateHome, user, onLogout }: TopHeaderProps) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="h-14 w-full bg-[#0d1424] border-b border-slate-800 flex items-center justify-between px-4 text-slate-300 select-none sticky top-0 z-40 shadow-sm">
      {/* Left: Brand Logo & Title */}
      <div className="flex items-center space-x-3 rtl:space-x-reverse">
        <button
          onClick={onNavigateHome}
          className="flex items-center space-x-2.5 rtl:space-x-reverse px-2.5 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700/80 hover:border-amber-500/50 transition-all cursor-pointer text-left rtl:text-right group"
        >
          <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-black shadow-sm group-hover:scale-105 transition-transform">
            <Building2 className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
              <span className="font-black text-xs text-white tracking-wide">
                SLASSI TRAVAUX
              </span>
              <span className="text-[9px] font-bold text-amber-400 bg-amber-500/15 px-1.5 py-0.2 rounded border border-amber-500/30">
                ADMIN
              </span>
            </div>
            <span className="text-[10px] text-slate-400 leading-tight">
              SARL AU • Fès, Maroc
            </span>
          </div>
        </button>

        <div className="h-5 w-[1px] bg-slate-800 hidden md:block" />

        <div className="hidden lg:flex items-center space-x-1.5 rtl:space-x-reverse text-xs text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-300 font-medium">{t("portal_official_badge")}</span>
        </div>
      </div>

      {/* Right: Quick actions, Language toggle, Profile & Live Site link */}
      <div className="flex items-center space-x-2 sm:space-x-3 rtl:space-x-reverse">
        {/* Direct Link to Live Public Site */}
        <a
          href="http://localhost:3000"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center space-x-1.5 rtl:space-x-reverse text-xs px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/35 font-semibold transition-all shadow-xs"
        >
          <span>{t("view_site")}</span>
          <ExternalLink className="h-3.5 w-3.5 rtl:rotate-180" />
        </a>

        {/* Language Switcher Pill: FR / عربي / EN */}
        <div className="flex items-center p-0.5 rounded-lg bg-slate-800/90 border border-slate-700">
          <button
            type="button"
            onClick={() => setLanguage("fr")}
            className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
              language === "fr"
                ? "bg-amber-500 text-slate-950 shadow-xs"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            FR
          </button>
          <button
            type="button"
            onClick={() => setLanguage("ar")}
            className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
              language === "ar"
                ? "bg-amber-500 text-slate-950 shadow-xs"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            عربي
          </button>
          <button
            type="button"
            onClick={() => setLanguage("en")}
            className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
              language === "en"
                ? "bg-amber-500 text-slate-950 shadow-xs"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            EN
          </button>
        </div>

        <div className="h-5 w-[1px] bg-slate-800 hidden sm:block" />

        {/* User Pill */}
        {(() => {
          const userName = user?.name || "Hamid Slassi";
          const userInitials = userName
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")
            .toUpperCase() || "HS";

          const roleColors: Record<string, string> = {
            super_admin: "text-amber-400 bg-amber-500/15 border-amber-500/30",
            project_manager: "text-emerald-400 bg-emerald-500/15 border-emerald-500/30",
            fleet_manager: "text-blue-400 bg-blue-500/15 border-blue-500/30",
            commercial: "text-purple-400 bg-purple-500/15 border-purple-500/30",
          };

          const roleClass = roleColors[user?.role || "super_admin"] || "text-slate-300 bg-slate-700/30 border-slate-600";

          return (
            <div className="flex items-center space-x-2 rtl:space-x-reverse px-2.5 py-1 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs">
              <Avatar
                size="sm"
                fallback={userInitials}
                className="bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 font-black border-amber-400/30 text-xs h-7 w-7"
              />
              <div className="hidden sm:flex flex-col text-left rtl:text-right leading-tight">
                <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
                  <span className="font-bold text-white truncate max-w-[120px]">{userName}</span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${roleClass}`}>
                    {(() => {
                      if (language === "ar") {
                        if (user?.role === "super_admin") return "المدير العام";
                        if (user?.role === "project_manager") return "مدير المشاريع";
                        if (user?.role === "fleet_manager") return "مسؤول الآليات";
                        if (user?.role === "commercial") return "تجاري";
                        return user?.role_label || "مسؤول";
                      }
                      if (language === "en") {
                        if (user?.role === "super_admin") return "Super Admin";
                        if (user?.role === "project_manager") return "Project Manager";
                        if (user?.role === "fleet_manager") return "Fleet Manager";
                        if (user?.role === "commercial") return "Commercial";
                        return user?.role || "Admin";
                      }
                      return user?.role_label || "Admin";
                    })()}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 truncate max-w-[180px]">
                  {user?.job_title || user?.email}
                </span>
              </div>
            </div>
          );
        })()}

        {/* Logout Button */}
        {onLogout && (
          <button
            type="button"
            onClick={onLogout}
            title={t("btn_logout")}
            className="flex items-center space-x-1.5 rtl:space-x-reverse px-2.5 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 hover:text-red-200 border border-red-500/30 transition-all cursor-pointer text-xs"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden md:inline font-medium">
              {t("btn_logout")}
            </span>
          </button>
        )}
      </div>
    </header>
  );
}
