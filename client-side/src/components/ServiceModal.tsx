'use client';

import React from 'react';
import Link from 'next/link';
import { 
  X, 
  CheckCircle, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  FileText, 
  Building2, 
  Construction, 
  PaintBucket, 
  Layers, 
  ClipboardCheck, 
  Truck 
} from 'lucide-react';
import { ServiceItem, Language } from '../types';
import { TranslationsType } from '../i18n/translations';

interface ServiceModalProps {
  service: ServiceItem | null;
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  t: TranslationsType;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2,
  Construction,
  PaintBucket,
  Layers,
  ClipboardCheck,
  Truck
};

export default function ServiceModal({ service, isOpen, onClose, lang, t }: ServiceModalProps) {
  if (!isOpen || !service) return null;
  const isRTL = lang === 'ar';
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  const IconComponent = iconMap[service.icon] || Building2;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden text-white flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#0F172A] to-slate-800 p-6 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 flex-shrink-0">
              <IconComponent className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                {t.services.badge}
              </span>
              <h3 className="font-black text-xl sm:text-2xl text-white">
                {service.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <p className="text-slate-300 text-base leading-relaxed">
            {service.shortDesc}
          </p>

          {/* Scope of works */}
          <div>
            <h4 className="font-bold text-base text-amber-400 uppercase tracking-wide mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>{isRTL ? "نطاق الأشغال والتدخل الفني" : "Périmètre d'Exécution & Prestations"}</span>
            </h4>
            <div className="space-y-2.5">
              {service.scope.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60 text-sm text-slate-200">
                  <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Advantage Box */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-sm flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="block text-white font-bold mb-0.5">
                {isRTL ? "ميزة الجودة والمطابقة التقنية" : "Garantie de Qualité & Conformité :"}
              </strong>
              <span>{service.advantage}</span>
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="p-6 bg-slate-950/80 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
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
            <span>{t.nav.quoteBtn}</span>
            <ArrowIcon className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
