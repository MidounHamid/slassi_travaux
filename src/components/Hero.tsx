'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Building, 
  Award, 
  Layers, 
  HardHat,
  Calculator,
  ChevronDown
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { t, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#0F172A]">
      {/* Background Image with Cinematic Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero.jpg"
          alt="BTP Chantier Maroc Slassi Travaux"
          className="w-full h-full object-cover object-center transform scale-105 filter brightness-[0.45] contrast-110"
        />
        {/* Subtle Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/70 to-[#0F172A]/50" />
        {/* Industrial Diagonal Grid Overlay */}
        <div className="absolute inset-0 bg-stripes opacity-20 pointer-events-none" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center md:text-left">
        <div className={`max-w-4xl ${isRTL ? 'md:ml-auto md:text-right' : ''}`}>
          
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 backdrop-blur-md mb-6 badge-shimmer">
            <HardHat className="w-4 h-4 text-amber-500 animate-pulse" />
            <span className="text-xs sm:text-sm font-bold text-amber-300 tracking-wide uppercase">
              {t.hero.badge}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.15] mb-6 drop-shadow-md">
            <span className="block">{t.hero.titleStart}</span>
            <span className="block text-slate-200">{t.hero.titleMiddle}</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-200">
              {t.hero.titleEnd}
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-300 font-normal leading-relaxed mb-8 max-w-3xl">
            {t.hero.subheadline}
          </p>

          {/* CTA Action Buttons with Multi-Page Links */}
          <div className={`flex flex-col sm:flex-row items-center gap-4 mb-12 ${isRTL ? 'justify-start' : 'justify-start'}`}>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 text-slate-950 font-black text-base shadow-glow-gold hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group"
            >
              <span>{t.hero.ctaQuote}</span>
              <ArrowIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-white font-bold text-base border border-slate-700/80 hover:border-amber-500/50 backdrop-blur-md transition-all duration-200"
            >
              <Building className="w-5 h-5 text-amber-500" />
              <span>{t.hero.ctaProjects}</span>
            </Link>

            <Link
              href="/estimator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 text-amber-300 font-semibold text-sm border border-amber-500/20 backdrop-blur-md transition-all duration-200"
            >
              <Calculator className="w-4 h-4 text-amber-500" />
              <span>{t.hero.ctaEstimator}</span>
            </Link>
          </div>

          {/* Quick Trust Badges */}
          <div className={`flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-300 ${isRTL ? 'justify-start' : 'justify-start'}`}>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <span>{isRTL ? "مطابق لمعايير RPS 2011 المقاومة للزلازل" : "Conforme RPS 2011 (Parasismique Maroc)"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <span>{isRTL ? "ضمان عشري وتأمين شامل TRC" : "Garantie Décennale & Assurance TRC"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <span>{isRTL ? "أسطول آليات ثقيلة مملوك بالكامل" : "Parc d'Engins Lourds Propriétaire"}</span>
            </div>
          </div>
        </div>

        {/* Floating Horizontal Key Stats Bar */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          <div className="glass-card rounded-xl p-4 sm:p-5 border-l-4 border-l-amber-500">
            <div className="flex items-baseline gap-1 mb-1">
              <span className="font-black text-2xl sm:text-3xl text-white">
                {t.hero.stats.capital.value}
              </span>
              <span className="text-xs font-bold text-amber-500 uppercase">
                {t.hero.stats.capital.unit}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              {t.hero.stats.capital.label}
            </p>
          </div>

          <div className="glass-card rounded-xl p-4 sm:p-5 border-l-4 border-l-amber-600">
            <div className="flex items-baseline gap-1 mb-1">
              <span className="font-black text-2xl sm:text-3xl text-white">
                {t.hero.stats.projects.value}
              </span>
              <span className="text-xs font-bold text-amber-400 uppercase">
                {t.hero.stats.projects.unit}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              {t.hero.stats.projects.label}
            </p>
          </div>

          <div className="glass-card rounded-xl p-4 sm:p-5 border-l-4 border-l-amber-400">
            <div className="flex items-baseline gap-1 mb-1">
              <span className="font-black text-2xl sm:text-3xl text-white">
                {t.hero.stats.experience.value}
              </span>
              <span className="text-xs font-bold text-amber-400 uppercase">
                {t.hero.stats.experience.unit}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              {t.hero.stats.experience.label}
            </p>
          </div>

          <div className="glass-card rounded-xl p-4 sm:p-5 border-l-4 border-l-emerald-500">
            <div className="flex items-baseline gap-1 mb-1">
              <span className="font-black text-2xl sm:text-3xl text-emerald-400">
                {t.hero.stats.compliance.value}
              </span>
              <span className="text-xs font-bold text-emerald-300 uppercase">
                {t.hero.stats.compliance.unit}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              {t.hero.stats.compliance.label}
            </p>
          </div>

        </div>
      </div>

      {/* Scroll Down Indicator */}
      <Link 
        href="/about" 
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 text-slate-400 hover:text-amber-500 transition-colors animate-bounce hidden md:block"
        aria-label="En savoir plus"
      >
        <ChevronDown className="w-6 h-6" />
      </Link>
    </section>
  );
}
