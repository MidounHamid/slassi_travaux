"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { PageNode, LayoutType } from "@/types/pagetree";
import { AVAILABLE_LAYOUTS } from "@/data/initialData";
import { FileEdit } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface PageEditModalProps {
  page: PageNode | null;
  open: boolean;
  onClose: () => void;
  onSave: (updatedPage: PageNode) => void;
}

export function PageEditModal({
  page,
  open,
  onClose,
  onSave,
}: PageEditModalProps) {
  const { t } = useLanguage();
  const [title, setTitle] = useState(page?.title || "");
  const [actualLayout, setActualLayout] = useState<LayoutType>(page?.actualLayout || "Default");
  const [layoutThisPage, setLayoutThisPage] = useState<LayoutType | "None (Inherit)">(
    page?.layoutThisPage || "None (Inherit)"
  );
  const [layoutSubpages, setLayoutSubpages] = useState<LayoutType | "None (Inherit)">(
    page?.layoutSubpages || "None (Inherit)"
  );
  const [status, setStatus] = useState<"published" | "draft" | "hidden">(
    page?.status || "published"
  );

  React.useEffect(() => {
    if (page) {
      setTitle(page.title);
      setActualLayout(page.actualLayout);
      setLayoutThisPage(page.layoutThisPage);
      setLayoutSubpages(page.layoutSubpages);
      setStatus(page.status);
    }
  }, [page]);

  if (!page) return null;

  const layoutOptions = [
    { value: "None (Inherit)", label: t("none_inherit") },
    ...AVAILABLE_LAYOUTS.map((l) => ({
      value: l.id,
      label: l.name,
      badge: `${l.columns} col`,
    })),
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...page,
      title,
      actualLayout: layoutThisPage !== "None (Inherit)" ? layoutThisPage : page.actualLayout,
      layoutThisPage,
      layoutSubpages,
      status,
      lastModified: "À l'instant",
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent onClose={onClose} className="max-w-md">
        <form onSubmit={handleSave}>
          <DialogHeader>
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-sky-400">
              <FileEdit className="h-5 w-5" />
              <DialogTitle>{t("modal_edit_title")} {page.title}</DialogTitle>
            </div>
            <DialogDescription>
              {t("modal_edit_desc")}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3.5 my-4 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1">
                {t("lbl_page_title")}
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                {t("th_layout_this_page")} :
              </label>
              <Select
                value={layoutThisPage}
                onChange={(val) => setLayoutThisPage(val as any)}
                options={layoutOptions}
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                {t("th_layout_subpages")} :
              </label>
              <Select
                value={layoutSubpages}
                onChange={(val) => setLayoutSubpages(val as any)}
                options={layoutOptions}
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                {t("lbl_status")}
              </label>
              <Select
                value={status}
                onChange={(val) => setStatus(val as any)}
                options={[
                  { value: "published", label: t("status_published") },
                  { value: "draft", label: t("status_draft") },
                  { value: "hidden", label: t("status_hidden") },
                ]}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" size="sm" type="button" onClick={onClose}>
              {t("btn_cancel")}
            </Button>
            <Button
              variant="default"
              size="sm"
              type="submit"
              className="bg-sky-600 hover:bg-sky-500 font-bold"
            >
              {t("btn_save_changes")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
