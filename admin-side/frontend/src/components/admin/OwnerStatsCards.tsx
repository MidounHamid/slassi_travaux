"use client";

import React from "react";
import {
  FileText,
  Layers,
  Truck,
  Calculator,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";

interface OwnerStatsCardsProps {
  totalPages: number;
  activeLayoutsCount: number;
}

export function OwnerStatsCards({
  totalPages,
  activeLayoutsCount,
}: OwnerStatsCardsProps) {
  const { t, language } = useLanguage();

  const stats = [
    {
      title: t("stat_pages_title"),
      value: totalPages.toString(),
      subtext: t("stat_pages_sub"),
      icon: FileText,
      color: "text-sky-400",
      bgColor: "bg-sky-500/10 border-sky-500/20",
    },
    {
      title: t("stat_layouts_title"),
      value: language === "ar" ? `${activeLayoutsCount} نماذج` : language === "en" ? `${activeLayoutsCount} Layouts` : `${activeLayoutsCount} Gabarits`,
      subtext: t("stat_layouts_sub"),
      icon: Layers,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10 border-amber-500/20",
    },
    {
      title: t("stat_machinery_title"),
      value: language === "ar" ? "24 آلية" : language === "en" ? "24 Machines" : "24 Engins",
      subtext: t("stat_machinery_sub"),
      icon: Truck,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
      title: t("stat_quotes_title"),
      value: language === "ar" ? "12 تقديراً" : language === "en" ? "12 Estimates" : "12 Estimations",
      subtext: t("stat_quotes_sub"),
      icon: Calculator,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10 border-purple-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-5">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <Card
            key={idx}
            className="border-slate-800 bg-slate-900/60 hover:bg-slate-900/90 transition-all hover:border-slate-700 shadow-sm"
          >
            <CardContent className="p-4 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  {stat.title}
                </p>
                <div className="text-xl font-bold text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="flex items-center space-x-1.5 rtl:space-x-reverse text-[10px]">
                  <span className="text-slate-400">{stat.subtext}</span>
                </div>
              </div>

              <div className={`p-2.5 rounded-lg border ${stat.bgColor}`}>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
