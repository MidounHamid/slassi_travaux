'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Construction, 
  PaintBucket, 
  Layers, 
  ClipboardCheck, 
  Truck, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles 
} from 'lucide-react';
import { ServiceItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import ServiceModal from './ServiceModal';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2,
  Construction,
  PaintBucket,
  Layers,
  ClipboardCheck,
  Truck
};

export default function ServicesSection() {
  const { lang, t, isRTL } = useLanguage();
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#0B1120] text-white relative">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/35 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.services.badge}</span>
          </div>
          <h2 className="font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight mb-4">
            {t.services.title}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            {t.services.subtitle}
          </p>
          <div className="w-20 h-1.5 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto mt-4 rounded-full" />
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {t.services.items.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Building2;

            return (
              <div
                key={service.id}
                className="group relative rounded-2xl bg-gradient-to-b from-slate-800/90 to-slate-900/90 border border-slate-700/80 hover:border-amber-500/60 p-7 sm:p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-between"
              >
                {/* Accent top stripe */}
                <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-amber-500 via-amber-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-t-full" />

                <div>
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-[#0F172A] border border-slate-700 group-hover:border-amber-500/50 flex items-center justify-center mb-6 text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300 shadow-md">
                    <IconComponent className="w-7 h-7 stroke-[2]" />
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-xl text-white mb-3 group-hover:text-amber-400 transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>
                </div>

                {/* Card Action */}
                <div className="pt-4 border-t border-slate-700/60 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedService(service as ServiceItem)}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors group/btn cursor-pointer"
                  >
                    <span>{t.services.learnMore}</span>
                    <ArrowIcon className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>

                  <span className="text-[11px] font-mono text-slate-500 font-bold">
                    0{index + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner for Custom Consultation */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-slate-800 via-[#0F172A] to-slate-900 border border-slate-700 p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 flex-shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-lg text-white">
                {isRTL ? "هل لديك مشروع بمواصفات خاصة أو دفتر شروط محدد؟" : "Vous avez un projet spécifique ou un appel d'offres en cours ?"}
              </h4>
              <p className="text-sm text-slate-400">
                {isRTL ? "مكتب دراساتنا التقنية مستعد لدراسة ملفكم ومراجعة المخططات الهندسية فوراً." : "Notre bureau technique étudie vos plans d'architecte et métrés sous 48h."}
              </p>
            </div>
          </div>

          <Link
            href="/contact"
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm shadow-glow-gold hover:shadow-lg transition-all"
          >
            <span>{t.nav.quoteBtn}</span>
            <ArrowIcon className="w-4 h-4" />
          </Link>
        </div>

      </div>

      {/* Detail Modal */}
      <ServiceModal
        service={selectedService}
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        lang={lang}
        t={t}
      />
    </section>
  );
}
