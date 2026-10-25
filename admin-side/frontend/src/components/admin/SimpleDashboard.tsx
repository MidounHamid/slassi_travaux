"use client";

import React from "react";
import {
  FileText,
  Layers,
  Truck,
  Calculator,
  Plus,
  ArrowRight,
  Phone,
  MessageCircle,
  HardHat,
  MapPin,
  CheckCircle2,
  ExternalLink,
  Building2,
  Clock,
  Sparkles,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { INITIAL_PROJECTS, INITIAL_MACHINERY } from "@/data/initialData";

interface SimpleDashboardProps {
  onNavigate: (section: string) => void;
  onNewProjectClick: () => void;
  onNewMachineClick: () => void;
}

export function SimpleDashboard({
  onNavigate,
  onNewProjectClick,
  onNewMachineClick,
}: SimpleDashboardProps) {
  const { t, language } = useLanguage();

  const recentQuotes = [
    {
      id: "DEV-2026-089",
      client: "Société Immobilière Saïss",
      project: "Terrassement & Plateforme Logistique 4 200 m²",
      location: "Zone Industrielle Bensouda, Fès",
      amount: "285 000 MAD",
      date: language === "ar" ? "اليوم في 09:30" : "Aujourd'hui à 09:30",
      status: "pending",
      phone: "+212 6 61 12 34 56",
      whatsapp: "212661123456",
    },
    {
      id: "DEV-2026-088",
      client: "Groupe Hôtelier Médina",
      project: "VRD & Assainissement Complexe Touristique",
      location: "Route d'Immouzzer, Fès",
      amount: "540 000 MAD",
      date: language === "ar" ? "أمس في 16:15" : "Hier à 16:15",
      status: "reviewed",
      phone: "+212 6 62 98 76 54",
      whatsapp: "212662987654",
    },
    {
      id: "DEV-2026-087",
      client: "Promoteur Privé",
      project: "Gros Œuvre & Fondations Immeuble R+5",
      location: "Quartier Champs de Course, Fès",
      amount: "1 250 000 MAD",
      date: language === "ar" ? "14 أكتوبر 2026" : "14 Oct 2026",
      status: "contacted",
      phone: "+212 6 63 45 67 89",
      whatsapp: "212663456789",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950/40 border border-slate-700/80 p-6 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center space-x-2 rtl:space-x-reverse px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>{t("mode_simple")}</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              {t("dashboard_welcome")}
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl">
              {t("dashboard_subtitle")}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                <Building2 className="h-3.5 w-3.5 text-amber-400" />
                <span>Slassi De Travaux SARL AU</span>
              </span>
              <span>•</span>
              <span className="text-amber-400/90 font-mono font-semibold">
                Capital : 17 000 000 MAD
              </span>
              <span>•</span>
              <span className="text-slate-300">Siège : Fès, Maroc</span>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center shrink-0">
            <a
              href="http://localhost:3000"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg hover:shadow-amber-500/20 transition-all cursor-pointer"
            >
              <span>{language === "ar" ? "معاينة الموقع المباشر" : "Voir le Site Public"}</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* 4 Simple Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Quotes Card */}
        <div
          onClick={() => onNavigate("quotes")}
          className="p-5 rounded-xl border border-slate-800 bg-slate-900/70 hover:bg-slate-800/80 hover:border-amber-500/50 transition-all cursor-pointer group shadow-sm flex flex-col justify-between"
        >
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {language === "ar" ? "طلبات التقدير" : "Demandes Devis"}
              </span>
              <div className="text-2xl font-black text-white tracking-tight flex items-baseline gap-2">
                <span>12</span>
                <span className="text-xs font-semibold text-amber-400">
                  {language === "ar" ? "+3 اليوم" : "+3 en attente"}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {language === "ar" ? "عبر حاسبة الموقع الإلكتروني" : "Reçus via le simulateur"}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400 group-hover:scale-110 transition-transform">
              <Calculator className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-amber-400 group-hover:text-amber-300">
            <span>{language === "ar" ? "معالجة الطلبات" : "Traiter les devis"}</span>
            <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Projects Card */}
        <div
          onClick={() => onNavigate("projects")}
          className="p-5 rounded-xl border border-slate-800 bg-slate-900/70 hover:bg-slate-800/80 hover:border-sky-500/50 transition-all cursor-pointer group shadow-sm flex flex-col justify-between"
        >
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {language === "ar" ? "الأوراش الجارية" : "Chantiers Actifs"}
              </span>
              <div className="text-2xl font-black text-white tracking-tight flex items-baseline gap-2">
                <span>14</span>
                <span className="text-xs font-semibold text-sky-400">
                  {language === "ar" ? "فاس ونواحيها" : "Fès & Région"}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {language === "ar" ? "أشغال كبرى، طرقات، تهيئة" : "Gros œuvre, VRD, Terrassement"}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-sky-500/15 border border-sky-500/30 text-sky-400 group-hover:scale-110 transition-transform">
              <HardHat className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-sky-400 group-hover:text-sky-300">
            <span>{language === "ar" ? "إدارة الأوراش" : "Gérer les chantiers"}</span>
            <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Machinery Card */}
        <div
          onClick={() => onNavigate("machinery")}
          className="p-5 rounded-xl border border-slate-800 bg-slate-900/70 hover:bg-slate-800/80 hover:border-emerald-500/50 transition-all cursor-pointer group shadow-sm flex flex-col justify-between"
        >
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {language === "ar" ? "أسطول الآليات" : "Parc d'Engins"}
              </span>
              <div className="text-2xl font-black text-white tracking-tight flex items-baseline gap-2">
                <span>24</span>
                <span className="text-xs font-semibold text-emerald-400">
                  {language === "ar" ? "19 قيد التشغيل" : "19 en service"}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {language === "ar" ? "5 آليات متوفرة بالمستودع" : "5 engins disponibles au dépôt"}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 group-hover:scale-110 transition-transform">
              <Truck className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-emerald-400 group-hover:text-emerald-300">
            <span>{language === "ar" ? "تفقد الآليات" : "Voir le parc matériel"}</span>
            <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Pages Card */}
        <div
          onClick={() => onNavigate("pages")}
          className="p-5 rounded-xl border border-slate-800 bg-slate-900/70 hover:bg-slate-800/80 hover:border-amber-500/50 transition-all cursor-pointer group shadow-sm flex flex-col justify-between"
        >
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {language === "ar" ? "صفحات الموقع" : "Pages du Site"}
              </span>
              <div className="text-2xl font-black text-white tracking-tight flex items-baseline gap-2">
                <span>7</span>
                <span className="text-xs font-semibold text-emerald-400">
                  {language === "ar" ? "منشورة 100%" : "En ligne"}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {language === "ar" ? "الصفحات الرئيسية العامة" : "Accueil, Services, Chantiers..."}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 group-hover:scale-110 transition-transform">
              <FileText className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-amber-400 group-hover:text-amber-300">
            <span>{language === "ar" ? "تعديل الصفحات" : "Modifier les pages"}</span>
            <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Quick Action Bar */}
      <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-400" />
          <span>{t("quick_actions")}</span>
        </span>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            size="sm"
            onClick={onNewProjectClick}
            className="bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>{t("act_new_project")}</span>
          </Button>

          <Button
            size="sm"
            onClick={onNewMachineClick}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>{t("act_new_machine")}</span>
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => onNavigate("quotes")}
            className="text-xs border-slate-700 text-slate-200 hover:bg-slate-800 flex items-center gap-1.5"
          >
            <Calculator className="h-3.5 w-3.5 text-amber-400" />
            <span>{t("act_view_quotes")}</span>
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => onNavigate("settings")}
            className="text-xs border-slate-700 text-slate-200 hover:bg-slate-800 flex items-center gap-1.5"
          >
            <Building2 className="h-3.5 w-3.5 text-slate-400" />
            <span>{t("act_edit_contact")}</span>
          </Button>
        </div>
      </div>

      {/* Two Columns: Recent Quotes & Ongoing Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Recent Quotes */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Calculator className="h-4 w-4 text-amber-400" />
              <span>{t("recent_quotes_title")}</span>
            </h2>
            <button
              onClick={() => onNavigate("quotes")}
              className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 cursor-pointer"
            >
              <span>{t("btn_view_all_quotes")}</span>
              <ArrowRight className="h-3 w-3 rtl:rotate-180" />
            </button>
          </div>

          <div className="space-y-2.5">
            {recentQuotes.map((q) => (
              <div
                key={q.id}
                className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-colors space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-amber-400">
                      {q.id}
                    </span>
                    <Badge
                      variant={q.status === "pending" ? "warning" : "default"}
                      className="text-[10px] py-0 px-2"
                    >
                      {q.status === "pending" ? "Nouveau" : "En cours"}
                    </Badge>
                  </div>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {q.date}
                  </span>
                </div>

                <div>
                  <div className="text-sm font-bold text-slate-100">{q.client}</div>
                  <p className="text-xs text-slate-300 line-clamp-1">{q.project}</p>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 text-xs">
                  <span className="font-mono font-bold text-amber-400 text-sm">
                    {q.amount}
                  </span>

                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/${q.whatsapp}?text=Bonjour%20${encodeURIComponent(q.client)},%20suite%20%C3%A0%20votre%20demande%20de%20devis%20Slassi%20Travaux`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold transition-colors"
                    >
                      <MessageCircle className="h-3 w-3" />
                      <span>{t("btn_whatsapp")}</span>
                    </a>
                    <a
                      href={`tel:${q.phone}`}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-[11px] font-medium transition-colors"
                    >
                      <Phone className="h-3 w-3 text-sky-400" />
                      <span>{t("btn_call")}</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Priority Ongoing Projects */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <HardHat className="h-4 w-4 text-sky-400" />
              <span>{t("active_projects_title")}</span>
            </h2>
            <button
              onClick={() => onNavigate("projects")}
              className="text-xs text-sky-400 hover:text-sky-300 font-medium flex items-center gap-1 cursor-pointer"
            >
              <span>{t("btn_view_all_projects")}</span>
              <ArrowRight className="h-3 w-3 rtl:rotate-180" />
            </button>
          </div>

          <div className="space-y-2.5">
            {INITIAL_PROJECTS.slice(0, 3).map((proj) => (
              <div
                key={proj.id}
                className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-colors space-y-2"
              >
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-[10px] text-sky-400 border-sky-500/30">
                    {proj.category}
                  </Badge>
                  <span className="text-[11px] font-bold text-slate-300 font-mono">
                    {proj.progress}% réalisé
                  </span>
                </div>

                <div>
                  <div className="text-sm font-bold text-slate-100">{proj.title}</div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                    <span className="flex items-center gap-1 text-slate-300">
                      <MapPin className="h-3 w-3 text-amber-400" />
                      {proj.location}
                    </span>
                    <span>•</span>
                    <span>{proj.client}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-amber-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${proj.progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                  <span className="font-mono font-semibold text-slate-200">
                    Budget : {proj.budget}
                  </span>
                  <span className="text-emerald-400 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="h-3 w-3" />
                    {proj.status === "done" ? "Réceptionné" : "En cours d'exécution"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
