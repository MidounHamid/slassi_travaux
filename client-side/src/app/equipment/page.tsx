'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Truck, FileText } from 'lucide-react';
import MachinerySection from '../../components/MachinerySection';
import { useLanguage } from '../../context/LanguageContext';

export default function EquipmentPage() {
  const { t, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div>
      {/* Page Hero Banner */}
      <div className="relative py-16 sm:py-24 bg-[#0F172A] border-b border-slate-800">
        <div className="absolute inset-0 bg-stripes opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/35 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Truck className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.equipment.badge}</span>
          </div>
          <h1 className="font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-4">
            {t.equipment.title}
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-3xl mx-auto">
            {t.equipment.subtitle}
          </p>
        </div>
      </div>

      {/* Main Machinery Component */}
      <MachinerySection />

      {/* Bottom Action */}
      <div className="bg-slate-900 py-16 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="font-black text-2xl sm:text-3xl text-white mb-3">
            {isRTL ? "قدرة استجابة فورية ونشر ميداني سريع في جميع جهات المغرب" : "Puissance d'intervention et logistique rodée sur tout le Maroc"}
          </h3>
          <p className="text-slate-400 text-sm sm:text-base mb-6 max-w-xl mx-auto">
            {isRTL ? "امتلاكنا الكامل للآليات يضمن استقلالية تامة وعدم الارتهان للوسطاء الخارجيين." : "Notre flotte propriétaire élimine les risques de retards liés à la sous-traitance d'engins."}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm rounded-xl shadow-glow-gold transition-all"
          >
            <FileText className="w-4 h-4" />
            <span>{t.nav.quoteBtn}</span>
            <ArrowIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
