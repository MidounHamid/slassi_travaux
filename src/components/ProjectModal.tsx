'use client';

import React from 'react';
import Link from 'next/link';
import { 
  X, 
  MapPin, 
  Building, 
  Calendar, 
  Layers, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  HardHat
} from 'lucide-react';
import { Project, Language } from '../types';
import { TranslationsType } from '../i18n/translations';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  t: TranslationsType;
}

export default function ProjectModal({ project, isOpen, onClose, lang, t }: ProjectModalProps) {
  if (!isOpen || !project) return null;
  const isRTL = lang === 'ar';
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const title = project.title[lang] || project.title.fr;
  const desc = project.description[lang] || project.description.fr;
  const loc = project.location[lang] || project.location.fr;
  const clientName = project.client[lang] || project.client.fr;
  const catLabel = project.categoryLabel[lang] || project.categoryLabel.fr;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden text-white flex flex-col max-h-[92vh]">
        
        {/* Modal Top Banner with Image */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-950 flex-shrink-0">
          <img
            src={project.image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-slate-950/80 hover:bg-amber-500 hover:text-slate-950 text-white transition-all shadow-lg cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Status Badge & Category */}
          <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-center justify-between gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider shadow-md">
              {catLabel}
            </span>

            <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-md ${
              project.status === 'done'
                ? 'bg-emerald-500/90 text-white'
                : 'bg-amber-500/90 text-slate-950'
            }`}>
              {project.status === 'done' ? t.projects.statusDone : t.projects.statusOngoing}
            </span>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Title */}
          <div>
            <h3 className="font-black text-2xl sm:text-3xl text-white mb-2">
              {title}
            </h3>
            <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span>{loc}</span>
            </div>
          </div>

          {/* Technical Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
              <span className="block text-[11px] font-semibold text-slate-400 uppercase mb-1 flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-amber-500" />
                {t.projects.client}
              </span>
              <span className="text-xs sm:text-sm font-bold text-white line-clamp-2">
                {clientName}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
              <span className="block text-[11px] font-semibold text-slate-400 uppercase mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-500" />
                {t.projects.year}
              </span>
              <span className="text-xs sm:text-sm font-bold text-white">
                {project.year}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
              <span className="block text-[11px] font-semibold text-slate-400 uppercase mb-1 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-amber-500" />
                {t.projects.area}
              </span>
              <span className="text-xs sm:text-sm font-bold text-white">
                {project.area}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
              <span className="block text-[11px] font-semibold text-slate-400 uppercase mb-1 flex items-center gap-1">
                <HardHat className="w-3.5 h-3.5 text-amber-500" />
                {t.projects.budget}
              </span>
              <span className="text-xs sm:text-sm font-bold text-amber-400">
                {project.budget}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-bold text-sm text-amber-400 uppercase tracking-wider mb-2">
              {isRTL ? "الوصف الهندسي الشامل للمشروع" : "Description & Enjeux Techniques"}
            </h4>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed bg-slate-800/40 p-4 rounded-xl border border-slate-700/50">
              {desc}
            </p>
          </div>

          {/* Key Milestones / Highlights */}
          {project.highlights && (
            <div>
              <h4 className="font-bold text-sm text-amber-400 uppercase tracking-wider mb-2.5">
                {isRTL ? "مؤشرات الإنجاز الرئيسية" : "Chiffres Clés & Réalisations Notables"}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {project.highlights.map((h, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-200 text-xs font-semibold">
                    <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <span>{h[lang] || h.fr}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-6 bg-slate-950/90 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm transition-colors cursor-pointer"
          >
            {t.services.modalClose}
          </button>

          <Link
            href="/contact"
            onClick={onClose}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm shadow-glow-gold hover:shadow-lg transition-all"
          >
            <span>{isRTL ? "طلب دراسة لمشروع مماثل" : "Demander une Étude Similaire"}</span>
            <ArrowIcon className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
