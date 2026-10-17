'use client';

import React from 'react';
import { Calculator } from 'lucide-react';
import ProjectEstimator from '../../components/ProjectEstimator';
import { useLanguage } from '../../context/LanguageContext';

export default function EstimatorPage() {
  const { t } = useLanguage();

  return (
    <div>
      {/* Page Hero Banner */}
      <div className="relative py-16 sm:py-24 bg-[#0F172A] border-b border-slate-800">
        <div className="absolute inset-0 bg-stripes opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/35 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Calculator className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.estimator.badge}</span>
          </div>
          <h1 className="font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-4">
            {t.estimator.title}
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-3xl mx-auto">
            {t.estimator.subtitle}
          </p>
        </div>
      </div>

      {/* Main Interactive Project Estimator Component */}
      <ProjectEstimator />
    </div>
  );
}
