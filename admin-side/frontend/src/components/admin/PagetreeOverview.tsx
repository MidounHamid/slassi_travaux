"use client";

import React, { useState } from "react";
import {
  Globe,
  FileText,
  FileEdit,
  ChevronRight,
  ChevronDown,
  Layers,
  Info,
  Search,
  Eye,
} from "lucide-react";
import { PageNode, LayoutType } from "@/types/pagetree";
import { AVAILABLE_LAYOUTS } from "@/data/initialData";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/LanguageContext";

interface PagetreeOverviewProps {
  pages: PageNode[];
  onUpdatePageLayout: (
    pageId: string,
    field: "layoutThisPage" | "layoutSubpages",
    value: LayoutType | "None (Inherit)"
  ) => void;
  onPreviewLayout: (layout: LayoutType) => void;
  onEditPage: (page: PageNode) => void;
  onPreviewPage: (page: PageNode) => void;
}

export function PagetreeOverview({
  pages,
  onUpdatePageLayout,
  onPreviewLayout,
  onEditPage,
  onPreviewPage,
}: PagetreeOverviewProps) {
  const { t, language } = useLanguage();
  const [depth, setDepth] = useState<string>("2 levels");
  const [viewType, setViewType] = useState<string>("Layouts");
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [collapsedNodes, setCollapsedNodes] = useState<Record<string, boolean>>({});

  const depthOptions = [
    { value: "1 level", label: language === "ar" ? "المستوى 1" : "1 level" },
    { value: "2 levels", label: language === "ar" ? "المستوى 2" : "2 levels" },
    { value: "3 levels", label: language === "ar" ? "المستوى 3" : "3 levels" },
    { value: "All levels", label: language === "ar" ? "كافة المستويات" : "All levels" },
  ];

  const typeOptions = [
    { value: "Layouts", label: language === "ar" ? "نماذج العرض (Layouts)" : "Layouts" },
    { value: "Content Elements", label: language === "ar" ? "عناصر المحتوى" : "Content Elements" },
    { value: "Access Rights", label: language === "ar" ? "صلاحيات الوصول" : "Access Rights" },
    { value: "SEO & Social", label: language === "ar" ? "تحسين محركات البحث SEO" : "SEO & Social" },
  ];

  const layoutDropdownOptions = [
    { value: "None (Inherit)", label: t("none_inherit") },
    ...AVAILABLE_LAYOUTS.map((l) => ({
      value: l.id,
      label: l.id,
      badge: `${l.columns} col`,
    })),
  ];

  const toggleExpand = (id: string) => {
    setCollapsedNodes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Filter pages according to depth and search
  const filteredPages = pages.filter((page) => {
    if (searchFilter) {
      return (
        page.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
        page.actualLayout.toLowerCase().includes(searchFilter.toLowerCase())
      );
    }
    if (depth === "1 level") return page.depth <= 0;
    if (depth === "2 levels") return page.depth <= 1;
    if (depth === "3 levels") return page.depth <= 2;
    return true;
  });

  return (
    <div className="w-full bg-[#0f172a] rounded-lg border border-slate-800 shadow-xl overflow-hidden">
      {/* Top Section Header matching screenshot */}
      <div className="p-5 pb-3 border-b border-slate-800/80 bg-slate-900/60">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center space-x-2 rtl:space-x-reverse">
              <span>{t("pagetree_title")}</span>
              <Badge variant="outline" className="text-[10px] text-sky-400 border-sky-500/30">
                {t("cms_badge")}
              </Badge>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              {t("pagetree_desc")}
            </p>
          </div>

          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="relative">
              <Search className="h-3.5 w-3.5 absolute left-2.5 rtl:left-auto rtl:right-2.5 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder={t("filter_page_placeholder")}
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="h-8 pl-8 pr-3 rtl:pl-3 rtl:pr-8 text-xs rounded-md bg-slate-800/90 border border-slate-700 text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500 w-44 sm:w-56"
              />
            </div>
          </div>
        </div>

        {/* Filter Controls from screenshot: Depth and Type */}
        <div className="flex flex-wrap items-center gap-4 text-xs pt-2">
          {/* Depth control */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <label className="text-slate-300 font-medium whitespace-nowrap">{t("depth_label")}</label>
            <div className="w-36">
              <Select
                value={depth}
                onChange={(val) => setDepth(val)}
                options={depthOptions}
              />
            </div>
          </div>

          {/* Type control */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <label className="text-slate-300 font-medium whitespace-nowrap">{t("type_label")}</label>
            <div className="w-44">
              <Select
                value={viewType}
                onChange={(val) => setViewType(val)}
                options={typeOptions}
              />
            </div>
          </div>

          <div className="text-[11px] text-slate-400 ml-auto rtl:ml-0 rtl:mr-auto hidden sm:flex items-center space-x-1.5 rtl:space-x-reverse">
            <Info className="h-3.5 w-3.5 text-slate-400" />
            <span>{filteredPages.length} {t("pages_indexed_suffix")}</span>
          </div>
        </div>
      </div>

      {/* Main CMS Tree Grid Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left rtl:text-right text-xs border-collapse">
          {/* Table Header matching the screenshot */}
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/90 text-slate-300 font-semibold select-none">
              <th className="py-2.5 px-3 min-w-[280px]">
                <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
                  <span className="p-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400">
                    <FileText className="h-3 w-3" />
                  </span>
                  <span>{t("th_pagetitle")}</span>
                </div>
              </th>

              <th className="py-2.5 px-3 min-w-[190px]">
                <span>{t("th_actual_layout")}</span>
              </th>

              <th className="py-2.5 px-3 min-w-[210px]">
                <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
                  <span className="p-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400">
                    <Layers className="h-3 w-3" />
                  </span>
                  <span>{t("th_layout_this_page")}</span>
                </div>
              </th>

              <th className="py-2.5 px-3 min-w-[200px]">
                <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
                  <span className="p-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400">
                    <Layers className="h-3 w-3" />
                  </span>
                  <span>{t("th_layout_subpages")}</span>
                </div>
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-800/60 bg-[#0f172a]">
            {filteredPages.map((page) => {
              const isCollapsed = collapsedNodes[page.id];
              const indentPadding = `${page.depth * 24 + 10}px`;

              return (
                <tr
                  key={page.id}
                  className="hover:bg-slate-800/40 transition-colors group"
                >
                  {/* Column 1: Pagetitle with hierarchical tree graphics */}
                  <td className="py-2 px-3 align-middle">
                    <div
                      className="flex items-center space-x-2 rtl:space-x-reverse"
                      style={
                        language === "ar"
                          ? { paddingRight: indentPadding }
                          : { paddingLeft: indentPadding }
                      }
                    >
                      {/* Tree branch line connector */}
                      {page.depth > 0 && (
                        <span className="text-slate-600 font-mono text-xs select-none -ml-4 rtl:-mr-4 rtl:ml-0 mr-1 rtl:mr-0 rtl:rotate-180">
                          {page.depth === 1 ? "├──" : "└──"}
                        </span>
                      )}

                      {/* Expand / Collapse toggle for root or parent */}
                      {page.hasChildren ? (
                        <button
                          onClick={() => toggleExpand(page.id)}
                          className="p-0.5 rounded hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                        >
                          {isCollapsed ? (
                            <ChevronRight className="h-3 w-3 rtl:rotate-180" />
                          ) : (
                            <ChevronDown className="h-3 w-3" />
                          )}
                        </button>
                      ) : (
                        <span className="w-3" />
                      )}

                      {/* Node Icon matching screenshot */}
                      {page.iconType === "globe" ? (
                        <Globe className="h-4 w-4 text-emerald-400 shrink-0" />
                      ) : page.iconType === "spacer" ? (
                        <span className="flex items-center justify-center h-4 w-4 text-slate-400 shrink-0 font-bold">
                          —
                        </span>
                      ) : (
                        <FileText className="h-3.5 w-3.5 text-sky-400 shrink-0" />
                      )}

                      {/* Page Title */}
                      <span className="font-medium text-slate-200 group-hover:text-white truncate">
                        {page.title}
                      </span>

                      {/* Root badge if Congratulations */}
                      {page.depth === 0 && (
                        <Badge
                          variant="secondary"
                          className="text-[10px] bg-slate-800 text-slate-300 border border-slate-700"
                        >
                          {t("root_badge")}
                        </Badge>
                      )}
                    </div>
                  </td>

                  {/* Column 2: Actual backend layout + row action icons */}
                  <td className="py-2 px-3 align-middle">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      {/* Action icons from screenshot: [Doc], [Edit] */}
                      <div className="flex items-center space-x-1 rtl:space-x-reverse shrink-0">
                        <button
                          onClick={() => onPreviewPage(page)}
                          title="Propriétés"
                          className="p-1 rounded bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                        >
                          <FileText className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => onEditPage(page)}
                          title="Éditer"
                          className="p-1 rounded bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                        >
                          <FileEdit className="h-3 w-3" />
                        </button>
                      </div>

                      {/* Actual backend layout badge / button */}
                      <button
                        onClick={() => onPreviewLayout(page.actualLayout)}
                        className="inline-flex items-center space-x-1.5 rtl:space-x-reverse text-xs text-sky-300 hover:text-sky-200 hover:underline cursor-pointer font-medium"
                      >
                        <span className="truncate">{page.actualLayout}</span>
                        <Eye className="h-3 w-3 opacity-60 group-hover:opacity-100" />
                      </button>
                    </div>
                  </td>

                  {/* Column 3: Backend Layout (this page only) */}
                  <td className="py-2 px-3 align-middle">
                    <div className="w-48">
                      <Select
                        value={page.layoutThisPage}
                        onChange={(val) =>
                          onUpdatePageLayout(
                            page.id,
                            "layoutThisPage",
                            val as LayoutType | "None (Inherit)"
                          )
                        }
                        options={layoutDropdownOptions}
                        size="sm"
                      />
                    </div>
                  </td>

                  {/* Column 4: Backend Layout (subpages) */}
                  <td className="py-2 px-3 align-middle">
                    <div className="w-48">
                      <Select
                        value={page.layoutSubpages}
                        onChange={(val) =>
                          onUpdatePageLayout(
                            page.id,
                            "layoutSubpages",
                            val as LayoutType | "None (Inherit)"
                          )
                        }
                        options={layoutDropdownOptions}
                        size="sm"
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer Info & Quick Tips */}
      <div className="p-3 bg-slate-900/80 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{t("footer_sync")}</span>
        </div>
        <div className="flex items-center space-x-3 rtl:space-x-reverse text-slate-400">
          <span>{t("footer_inheritance")} <strong className="text-slate-300">Default</strong></span>
          <span>•</span>
          <span><strong className="text-amber-400">{t("footer_company")}</strong></span>
        </div>
      </div>
    </div>
  );
}
