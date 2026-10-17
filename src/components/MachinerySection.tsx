'use client';

import React from 'react';
import { 
  Truck, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function MachinerySection() {
  const { t, isRTL } = useLanguage();

  return (
    <section id="machinery" className="py-20 lg:py-28 bg-[#0F172A] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/35 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Truck className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.equipment.badge}</span>
          </div>
          <h2 className="font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight mb-4">
            {t.equipment.title}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            {t.equipment.subtitle}
          </p>
          <div className="w-20 h-1.5 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto mt-4 rounded-full" />
        </div>

        {/* Featured Fleet Image Banner */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-700/80 mb-14 group">
          <div className="h-72 sm:h-96 w-full overflow-hidden">
            <img
              src="/images/machinery-fleet.jpg"
              alt="Parc Matériel et Engins Slassi Travaux Maroc"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/50 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="max-w-xl">
              <span className="px-3 py-1 rounded-md bg-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider">
                {isRTL ? "أسطول لوجستي مملوك بالكامل" : "Flotte Lourde Propriétaire"}
              </span>
              <h3 className="font-black text-xl sm:text-2xl text-white mt-2 drop-shadow">
                {isRTL ? "جاهزية تشغيلية فورية لكافة المشاريع الكبرى بالمغرب" : "Disponibilité Immédiate sur Vos Chantiers à Fès et Tout le Maroc"}
              </h3>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-700 backdrop-blur-md">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-bold text-slate-200">
                {isRTL ? "صيانة وقائية دورية ومطابقة لمعايير السلامة" : "Maintenance & Révision Continue"}
              </span>
            </div>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {t.equipment.stats.map((st, i) => (
            <div key={i} className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-amber-500/50 transition-all">
              <div className="font-black text-3xl sm:text-4xl text-amber-400 mb-1">
                {st.count}
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium">
                {st.label}
              </div>
            </div>
          ))}
        </div>

        {/* 4 Equipment Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {t.equipment.categories.map((cat, idx) => (
            <div
              key={idx}
              className="p-7 rounded-2xl bg-slate-800/60 border border-slate-700/70 hover:bg-slate-800/90 transition-all"
            >
              <div className="flex items-center gap-3 mb-5 border-b border-slate-700 pb-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold">
                  0{idx + 1}
                </div>
                <h4 className="font-bold text-lg text-white">
                  {cat.title}
                </h4>
              </div>

              <ul className="space-y-3">
                {cat.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
