'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Building2, HardHat, FileText } from 'lucide-react';
import AboutSection from '../../components/AboutSection';
import TestimonialsSection from '../../components/TestimonialsSection';
import { useLanguage } from '../../context/LanguageContext';

export default function AboutPage() {
  const { t, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div>
      {/* Page Hero Banner */}
      <div className="relative py-16 sm:py-24 bg-[#0F172A] border-b border-slate-800">
        <div className="absolute inset-0 bg-stripes opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/35 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.about.badge}</span>
          </div>
          <h1 className="font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-4">
            {t.about.title}
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-3xl mx-auto">
            {t.about.intro}
          </p>
        </div>
      </div>

      {/* Main About Component */}
      <AboutSection />

      {/* Client Testimonials */}
      <TestimonialsSection />

      {/* Page Bottom CTA */}
      <div className="bg-[#0B1120] py-16 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto mb-4">
            <HardHat className="w-6 h-6" />
          </div>
          <h3 className="font-black text-2xl sm:text-3xl text-white mb-3">
            {isRTL ? "هل ترغب في مناقشة مشروعك مع فريقنا الهندسي؟" : "Prêt à démarrer votre projet avec Slassi Travaux ?"}
          </h3>
          <p className="text-slate-400 text-sm sm:text-base mb-6 max-w-xl mx-auto">
            {isRTL ? "نحن رهن إشارتكم لتقديم المشورة التقنية ودراسة المخططات وتقديم عروض أسعار تنافسية." : "Contactez notre bureau d'études pour une estimation sur mesure et un accompagnement technique rigoureux."}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm rounded-xl shadow-glow-gold transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>{t.nav.quoteBtn}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm rounded-xl border border-slate-700 transition-all"
            >
              <span>{t.nav.projects}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
