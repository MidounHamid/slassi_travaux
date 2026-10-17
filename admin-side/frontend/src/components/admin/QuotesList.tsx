"use client";

import React from "react";
import { Calculator, MapPin, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

export function QuotesList() {
  const { t } = useLanguage();

  const mockQuotes = [
    {
      id: "DEV-2026-089",
      client: "Société Immobilière Saïss",
      project: "Terrassement & Plateforme Logistique 4 200 m²",
      location: "Zone Industrielle Bensouda, Fès",
      amount: "285 000 MAD",
      date: "Aujourd'hui à 09:30",
      status: "pending",
      phone: "+212 6 61 12 34 56",
    },
    {
      id: "DEV-2026-088",
      client: "Groupe Hôtelier Médina",
      project: "VRD & Assainissement Complexe Touristique",
      location: "Route d'Immouzzer, Fès",
      amount: "540 000 MAD",
      date: "Hier à 16:15",
      status: "reviewed",
      phone: "+212 6 62 98 76 54",
    },
    {
      id: "DEV-2026-087",
      client: "Promoteur Privé",
      project: "Gros Œuvre & Fondations Immeuble R+5",
      location: "Quartier Champs de Course, Fès",
      amount: "1 250 000 MAD",
      date: "14 Oct 2026",
      status: "contacted",
      phone: "+212 6 63 45 67 89",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center space-x-2 rtl:space-x-reverse">
            <Calculator className="h-5 w-5 text-amber-500" />
            <span>{t("quotes_title")}</span>
          </h2>
          <p className="text-xs text-slate-400">
            {t("quotes_desc")}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {mockQuotes.map((q) => (
          <div
            key={q.id}
            className="p-4 rounded-lg border border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
          >
            <div className="space-y-1">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="font-mono text-sky-400 font-bold">{q.id}</span>
                <Badge
                  variant={
                    q.status === "pending"
                      ? "warning"
                      : q.status === "reviewed"
                      ? "default"
                      : "success"
                  }
                  className="text-[10px]"
                >
                  {q.status === "pending"
                    ? t("status_new")
                    : q.status === "reviewed"
                    ? t("status_reviewed")
                    : t("status_contacted")}
                </Badge>
                <span className="text-slate-400 text-[10px]">• {q.date}</span>
              </div>
              <div className="font-semibold text-slate-100 text-sm">{q.client}</div>
              <div className="text-slate-300">{q.project}</div>
              <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 pt-1">
                <span className="flex items-center space-x-1 rtl:space-x-reverse">
                  <MapPin className="h-3 w-3 text-amber-400" />
                  <span>{q.location}</span>
                </span>
                <span className="flex items-center space-x-1 rtl:space-x-reverse">
                  <Phone className="h-3 w-3 text-emerald-400" />
                  <span>{q.phone}</span>
                </span>
              </div>
            </div>

            <div className="flex flex-col md:items-end justify-between space-y-2 shrink-0">
              <div className="text-right rtl:text-left">
                <span className="text-[10px] text-slate-400 block">{t("quote_estimated_amount")}</span>
                <span className="text-base font-mono font-bold text-amber-400">
                  {q.amount}
                </span>
              </div>
              <div className="flex space-x-2 rtl:space-x-reverse">
                <Button variant="outline" size="xs">
                  {t("btn_details")}
                </Button>
                <Button
                  variant="default"
                  size="xs"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white"
                >
                  {t("btn_call_client")}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
