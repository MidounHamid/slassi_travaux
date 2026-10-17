'use client';

import React from 'react';
import { 
  ShieldCheck, 
  FileCheck, 
  Microscope, 
  Clock, 
  Award, 
  CheckCircle, 
  Scale
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShieldCheck,
  FileCheck,
  Microscope,
  Clock
};

export default function CommitmentsSection() {
  const { t, isRTL } = useLanguage();

  return (
    <section id="commitments" className="py-20 lg:py-28 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/35 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.commitments.badge}</span>
          </div>
          <h2 className="font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight mb-4">
            {t.commitments.title}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            {t.commitments.subtitle}
          </p>
          <div className="w-20 h-1.5 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto mt-4 rounded-full" />
        </div>

        {/* 4 Pillars of Commitments */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {t.commitments.items.map((item, idx) => {
            const Icon = iconMap[item.icon] || ShieldCheck;

            return (
              <div
                key={idx}
                className="rounded-2xl bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-slate-700/80 p-7 sm:p-8 hover:border-amber-500/60 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 flex-shrink-0">
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-700/60 flex items-center gap-2 text-xs font-semibold text-amber-400">
                  <CheckCircle className="w-4 h-4" />
                  <span>{isRTL ? "مضمون وموثق بالشهادات الرسمية" : "Engagement Contractuel Garanti"}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Moroccan Standards & Certifications Bar */}
        <div className="rounded-2xl bg-gradient-to-r from-[#0F172A] via-slate-800 to-[#0F172A] border border-slate-700 p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 flex-shrink-0">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-lg text-white">
                {isRTL ? "الالتزام الحرفي بدفاتر الشروط والتحملات العامة (CCTG)" : "Conformité Totale au CCTG & Normes Marocaines (NM)"}
              </h4>
              <p className="text-xs sm:text-sm text-slate-400">
                {isRTL ? "اعتماد رسمي لجميع اختبارات المقاومة الانضغاطية للخرسانة وتجارب التربة لدى المختبر العمومي للتجارب والدراسات." : "Contrôles continus par laboratoires accrédités (LPEE, LABOTEST, CTP)."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-bold text-amber-400">
              RPS 2011
            </span>
            <span className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-bold text-amber-400">
              NM BTP
            </span>
            <span className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-bold text-amber-400">
              QHSE
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
