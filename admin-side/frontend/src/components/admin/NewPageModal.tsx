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
import { LayoutType, PageNode } from "@/types/pagetree";
import { AVAILABLE_LAYOUTS } from "@/data/initialData";
import { PlusCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface NewPageModalProps {
  open: boolean;
  onClose: () => void;
  onAddPage: (newPage: Partial<PageNode>) => void;
  pages: PageNode[];
}

export function NewPageModal({
  open,
  onClose,
  onAddPage,
  pages,
}: NewPageModalProps) {
  const { t } = useLanguage();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [parentId, setParentId] = useState<string>("page-1");
  const [layout, setLayout] = useState<LayoutType>("Default");

  const parentOptions = pages
    .filter((p) => p.depth <= 1)
    .map((p) => ({
      value: p.id,
      label: `${"— ".repeat(p.depth)}${p.title}`,
    }));

  const layoutOptions = AVAILABLE_LAYOUTS.map((l) => ({
    value: l.id,
    label: l.name,
    badge: `${l.columns} col`,
  }));

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const parentNode = pages.find((p) => p.id === parentId);
    const newDepth = parentNode ? parentNode.depth + 1 : 1;

    onAddPage({
      title: title.trim(),
      slug: slug.trim() || title.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      parentId,
      depth: newDepth,
      iconType: "page",
      actualLayout: layout,
      layoutThisPage: layout,
      layoutSubpages: "None (Inherit)",
      status: "published",
      hasChildren: false,
      expanded: false,
      author: "Hamid Slassi",
      lastModified: "À l'instant",
    });

    setTitle("");
    setSlug("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent onClose={onClose} className="max-w-md">
        <form onSubmit={handleCreate}>
          <DialogHeader>
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-sky-400">
              <PlusCircle className="h-5 w-5" />
              <DialogTitle>{t("modal_new_page_title")}</DialogTitle>
            </div>
            <DialogDescription>
              {t("modal_new_page_desc")}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3.5 my-4 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1">
                {t("lbl_page_title")}
              </label>
              <Input
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (!slug) {
                    setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, "-"));
                  }
                }}
                placeholder="ex: Nos Certifications ISO & Agrément BTP"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                {t("lbl_url_slug")}
              </label>
              <Input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="certifications-btp"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                {t("lbl_parent_page")}
              </label>
              <Select
                value={parentId}
                onChange={(val) => setParentId(val)}
                options={parentOptions}
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                {t("lbl_initial_layout")}
              </label>
              <Select
                value={layout}
                onChange={(val) => setLayout(val as LayoutType)}
                options={layoutOptions}
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
              className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold"
            >
              {t("btn_save_publish")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
