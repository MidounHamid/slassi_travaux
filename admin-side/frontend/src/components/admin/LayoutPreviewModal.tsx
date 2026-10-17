"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LayoutType } from "@/types/pagetree";
import { AVAILABLE_LAYOUTS } from "@/data/initialData";
import { Monitor, Layers } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface LayoutPreviewModalProps {
  layoutName: LayoutType | null;
  open: boolean;
  onClose: () => void;
  onApplyToAll?: (layout: LayoutType) => void;
}

export function LayoutPreviewModal({
  layoutName,
  open,
  onClose,
  onApplyToAll,
}: LayoutPreviewModalProps) {
  const { t, language } = useLanguage();

  if (!layoutName) return null;

  const layoutDef = AVAILABLE_LAYOUTS.find((l) => l.id === layoutName) || {
    id: layoutName,
    name: layoutName,
    description: "Gabarit standard configuré pour le site internet de l'entreprise.",
    columns: 2,
    previewType: "standard-sidebar",
    tags: ["Default"],
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent onClose={onClose} className="max-w-3xl">
        <DialogHeader>
          <div className="flex items-center space-x-2 rtl:space-x-reverse text-sky-400">
            <Layers className="h-5 w-5" />
            <DialogTitle className="text-xl">
              {t("preview_title")} {layoutDef.name}
            </DialogTitle>
          </div>
          <DialogDescription>
            {layoutDef.description}
          </DialogDescription>
        </DialogHeader>

        {/* Wireframe Mockup Canvas */}
        <div className="my-4 p-4 rounded-xl border border-slate-800 bg-[#090d16] space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px] text-slate-400">
            <span className="flex items-center space-x-1.5 rtl:space-x-reverse">
              <Monitor className="h-3.5 w-3.5 text-slate-400" />
              <span>{t("preview_wireframe_desktop")}</span>
            </span>
            <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
              {layoutDef.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-[10px]">
                  {tag}
                </Badge>
              ))}
              <Badge variant="outline" className="text-[10px] text-amber-400 border-amber-500/30">
                {layoutDef.columns} {t("col_badge")}
              </Badge>
            </div>
          </div>

          {/* Wireframe Rendering according to previewType */}
          {layoutDef.previewType === "hero-3col" && (
            <div className="space-y-2">
              <div className="h-7 rounded bg-slate-800/80 border border-slate-700/60 flex items-center justify-between px-3 text-[10px] text-slate-400 font-mono">
                <span>LOGO SLASSI TRAVAUX</span>
                <span className="flex space-x-3 rtl:space-x-reverse">
                  <span>Accueil</span>
                  <span>Société</span>
                  <span>Chantiers</span>
                  <span>Contact</span>
                </span>
              </div>
              <div className="h-28 rounded-lg bg-gradient-to-r from-amber-950/40 via-slate-800 to-slate-900 border border-amber-500/20 flex flex-col justify-center px-6">
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                  BTP & GÉNIE CIVIL MAROC • 17M MAD
                </span>
                <span className="text-sm font-bold text-white mt-1">
                  Bâtir l'Avenir avec Précision et Excellence
                </span>
                <div className="flex space-x-2 rtl:space-x-reverse mt-2">
                  <div className="h-5 w-24 bg-amber-600 rounded text-[9px] text-slate-950 font-bold flex items-center justify-center">
                    Devis Gratuit
                  </div>
                  <div className="h-5 w-24 bg-slate-800 rounded border border-slate-700 text-[9px] text-slate-300 flex items-center justify-center">
                    Parc Engins
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="h-20 rounded bg-slate-800/50 border border-slate-700/60 p-2.5 flex flex-col justify-between">
                  <span className="text-[10px] font-bold text-sky-400">Gros Œuvre & BTP</span>
                  <span className="text-[9px] text-slate-400">Bâtiments industriels et résidences à Fès.</span>
                </div>
                <div className="h-20 rounded bg-slate-800/50 border border-slate-700/60 p-2.5 flex flex-col justify-between">
                  <span className="text-[10px] font-bold text-amber-400">VRD & Terrassement</span>
                  <span className="text-[9px] text-slate-400">Voiries, assainissement et plateformes.</span>
                </div>
                <div className="h-20 rounded bg-slate-800/50 border border-slate-700/60 p-2.5 flex flex-col justify-between">
                  <span className="text-[10px] font-bold text-emerald-400">Génie Civil</span>
                  <span className="text-[9px] text-slate-400">Ponts, bassins et ouvrages d'art.</span>
                </div>
              </div>
            </div>
          )}

          {layoutDef.previewType === "grid-cards" && (
            <div className="space-y-2">
              <div className="h-6 rounded bg-slate-800 flex items-center px-3 text-[10px] text-slate-300 font-medium">
                Parc d'Engins & Flotte Matériel Lourd (24 Unités)
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-16 rounded bg-slate-800/60 border border-slate-700 p-2 flex flex-col justify-between">
                    <div className="flex justify-between items-center text-[9px]">
                      <span className="font-bold text-slate-200">Pelle CAT {320 + i * 5}D</span>
                      <span className="text-emerald-400 font-mono">Dispo</span>
                    </div>
                    <span className="text-[8px] text-slate-400">Poids 22T • Flèche 5.7m</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {layoutDef.previewType === "calculator" && (
            <div className="space-y-2">
              <div className="h-7 rounded bg-slate-800 flex items-center justify-between px-3 text-[10px] text-amber-400 font-medium">
                <span>Simulateur en Ligne de Devis & Calcul de Volume</span>
                <span className="text-slate-400">Étape 2 / 3</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-24 rounded bg-slate-800/60 border border-slate-700 p-3 space-y-1.5">
                  <span className="text-[10px] text-slate-300 font-bold">1. Type de Chantier</span>
                  <div className="h-5 rounded bg-slate-900 border border-slate-700 text-[9px] flex items-center px-2 text-slate-300">
                    Terrassement & Nivellement
                  </div>
                  <div className="h-5 rounded bg-slate-900 border border-slate-700 text-[9px] flex items-center px-2 text-slate-300">
                    Superficie : 2 500 m²
                  </div>
                </div>
                <div className="h-24 rounded bg-amber-950/30 border border-amber-500/30 p-3 flex flex-col justify-between">
                  <span className="text-[10px] text-amber-300 font-bold">Estimation Prévisionnelle</span>
                  <span className="text-base font-bold text-white font-mono">145 000 MAD</span>
                  <span className="text-[8px] text-slate-400">Sous réserve d'étude géotechnique</span>
                </div>
              </div>
            </div>
          )}

          {(layoutDef.previewType === "standard-sidebar" ||
            layoutDef.previewType === "gallery" ||
            layoutDef.previewType === "contact-map") && (
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2 h-36 rounded bg-slate-800/60 border border-slate-700 p-3 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold text-white">Zone Principale de Contenu</span>
                  <p className="text-[9px] text-slate-400 mt-1">
                    Textes institutionnels, rapports d'audit et galeries photographiques.
                  </p>
                </div>
                <div className="h-6 w-32 bg-sky-600/30 border border-sky-500/40 rounded text-[9px] text-sky-300 flex items-center justify-center font-medium">
                  Bloc d'Action
                </div>
              </div>
              <div className="col-span-1 h-36 rounded bg-slate-800/40 border border-slate-700/80 p-3 space-y-2">
                <span className="text-[10px] font-bold text-slate-300">Barre Latérale</span>
                <div className="h-5 rounded bg-slate-900 text-[8px] text-slate-400 flex items-center px-1.5">
                  Coordonnées Fès
                </div>
                <div className="h-5 rounded bg-slate-900 text-[8px] text-slate-400 flex items-center px-1.5">
                  Plaquette PDF
                </div>
                <div className="h-5 rounded bg-slate-900 text-[8px] text-slate-400 flex items-center px-1.5">
                  ISO 9001
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" size="sm" onClick={onClose}>
            {t("btn_close")}
          </Button>
          {onApplyToAll && (
            <Button
              variant="default"
              size="sm"
              onClick={() => {
                onApplyToAll(layoutDef.id);
                onClose();
              }}
              className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold"
            >
              {t("btn_apply_subpages")}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
