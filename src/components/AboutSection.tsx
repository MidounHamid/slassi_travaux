'use client';

import React from 'react';
import { 
  ShieldCheck, 
  HardHat, 
  Truck, 
  Leaf, 
  CheckCircle, 
  Building2, 
  FileCheck2, 
  Compass
} from 'lucide-react';
import { companyProfile } from '../data/companyData';
import { useLanguage } from '../context/LanguageContext';

export default function AboutSection() {
  const { t, isRTL } = useLanguage();
  const pillarIcons = [ShieldCheck, HardHat, Truck, Leaf];

  return (
    <section id="about" className="py-20 lg:py-28 bg-slate-900 text-white relative overflow-hidden border-b border-slate-800">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>{t.about.badge}</span>
          </div>
          <h2 className="font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight">
            {t.about.title}
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto mt-4 rounded-full" />
        </div>

        {/* Top Split: Narrative & Corporate Identity Card */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
          
          {/* Narrative Text (7 cols) */}
          <div className="lg:col-span-7 space-y-5 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p className="font-semibold text-white text-lg sm:text-xl border-l-4 border-amber-500 pl-4 pr-2">
              {t.about.intro}
            </p>
            <p className="text-slate-300">
              {t.about.p1}
            </p>
            <p className="text-slate-300">
              {t.about.p2}
            </p>

            {/* Quick Highlights list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
              <div className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-800/70 border border-slate-700/60">
                <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <span className="text-sm font-semibold text-slate-200">
                  {isRTL ? "رأس مال 17 مليون درهم" : "Capital Social : 17 000 000 DH"}
                </span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-800/70 border border-slate-700/60">
                <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <span className="text-sm font-semibold text-slate-200">
                  {isRTL ? "مقر رئيسي بمدينة فاس" : "Siège Central à Fès"}
                </span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-800/70 border border-slate-700/60">
                <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <span className="text-sm font-semibold text-slate-200">
                  {isRTL ? "مهندسون وتقنيون معتمدون" : "Ingénieurs & Encadrement Expérimenté"}
                </span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-800/70 border border-slate-700/60">
                <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <span className="text-sm font-semibold text-slate-200">
                  {isRTL ? "تدخل في جميع أنحاء المغرب" : "Intervention sur tout le Maroc"}
                </span>
              </div>
            </div>
          </div>

          {/* Corporate Credentials Box (5 cols) */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900 p-6 sm:p-8 border border-slate-700 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between border-b border-slate-700 pb-4 mb-6">
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    {t.about.legalBadge}
                  </span>
                  <h3 className="font-black text-xl text-white">
                    SLASSI TRAVAUX
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                  <FileCheck2 className="w-5 h-5 text-amber-400" />
                </div>
              </div>

              {/* Legal Data Grid */}
              <div className="space-y-3.5 text-sm">
                <div className="flex items-center justify-between py-1.5 border-b border-slate-700/50">
                  <span className="text-slate-400">{t.about.legalDetails[0].label} :</span>
                  <span className="font-bold text-white">{t.about.legalDetails[0].value}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-700/50">
                  <span className="text-slate-400">{t.about.legalDetails[1].label} :</span>
                  <span className="font-bold text-amber-400">{companyProfile.capitalFormatted}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-700/50">
                  <span className="text-slate-400">{isRTL ? "السجل التجاري (RC)" : "Registre du Commerce"} :</span>
                  <span className="font-bold text-white font-mono">{companyProfile.legal.rc}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-700/50">
                  <span className="text-slate-400">{isRTL ? "المعرف الموحد (ICE)" : "Identifiant Unique (ICE)"} :</span>
                  <span className="font-bold text-white font-mono">{companyProfile.legal.ice}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-700/50">
                  <span className="text-slate-400">{isRTL ? "المعرف الجبائي (IF)" : "Identifiant Fiscal (IF)"} :</span>
                  <span className="font-bold text-white font-mono">{companyProfile.legal.if}</span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-slate-400">{isRTL ? "الانخراط بالضمان الاجتماعي" : "Affiliation CNSS"} :</span>
                  <span className="font-bold text-white font-mono">{companyProfile.legal.cnss}</span>
                </div>
              </div>

              {/* Bottom Address snippet */}
              <div className="mt-6 pt-4 border-t border-slate-700 text-xs text-slate-400 flex items-start gap-2">
                <Compass className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <span>{companyProfile.headquarters.fullAddressFr}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars Section */}
        <div className="mt-12">
          <div className="text-center mb-8">
            <h3 className="font-black text-xl sm:text-2xl text-white">
              {t.about.valuesTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.about.values.map((val, idx) => {
              const Icon = pillarIcons[idx] || ShieldCheck;
              return (
                <div 
                  key={val.title}
                  className="rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-500/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#0F172A] border border-slate-700 group-hover:border-amber-500/60 flex items-center justify-center mb-4 transition-colors">
                    <Icon className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <h4 className="font-bold text-lg text-white mb-2 group-hover:text-amber-400 transition-colors">
                    {val.title}
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
