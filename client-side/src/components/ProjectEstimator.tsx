'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Calculator, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Check, 
  Info,
  Clock
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ProjectEstimator() {
  const { lang, t, isRTL, setEstimateData } = useLanguage();
  const router = useRouter();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const [selectedType, setSelectedType] = useState(t.estimator.types[0].id);
  const [surface, setSurface] = useState(350);
  const [selectedLocation, setSelectedLocation] = useState(t.estimator.locations[0].id);
  const [selectedFinish, setSelectedFinish] = useState(t.estimator.finishes[1].id);

  // Current selected objects
  const currentType = t.estimator.types.find(type => type.id === selectedType) || t.estimator.types[0];
  const currentFinish = t.estimator.finishes.find(f => f.id === selectedFinish) || t.estimator.finishes[1];

  // Base Calculation
  const baseCost = currentType.baseRate * surface * currentFinish.mult;
  const minCost = Math.round(baseCost * 0.92);
  const maxCost = Math.round(baseCost * 1.15);

  // Timeline estimation
  let estimatedMonths = "3 à 6 mois";
  if (isRTL) {
    if (surface < 200) estimatedMonths = "3 إلى 5 أشهر";
    else if (surface < 600) estimatedMonths = "6 إلى 10 أشهر";
    else if (surface < 1500) estimatedMonths = "10 إلى 14 شهراً";
    else estimatedMonths = "14 إلى 20 شهراً";
  } else if (lang === 'en') {
    if (surface < 200) estimatedMonths = "3 to 5 months";
    else if (surface < 600) estimatedMonths = "6 to 10 months";
    else if (surface < 1500) estimatedMonths = "10 to 14 months";
    else estimatedMonths = "14 to 20 months";
  } else {
    if (surface < 200) estimatedMonths = "3 à 5 mois";
    else if (surface < 600) estimatedMonths = "6 à 10 mois";
    else if (surface < 1500) estimatedMonths = "10 à 14 mois";
    else estimatedMonths = "14 à 20 mois";
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat(lang === 'ar' ? 'ar-MA' : 'fr-MA').format(num);
  };

  const handleTransfer = () => {
    setEstimateData({
      type: currentType.name,
      surface: surface,
      finish: currentFinish.name,
      estimateRange: `${formatNumber(minCost)} - ${formatNumber(maxCost)} MAD`
    });
    router.push('/contact');
  };

  return (
    <section id="estimator" className="py-20 lg:py-28 bg-[#0B1120] text-white relative overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/35 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.estimator.badge}</span>
          </div>
          <h2 className="font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight mb-4">
            {t.estimator.title}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            {t.estimator.subtitle}
          </p>
          <div className="w-20 h-1.5 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto mt-4 rounded-full" />
        </div>

        {/* Simulator Grid (Configurator on Left, Instant Result on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Form (7 Cols) */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 sm:p-8 space-y-7 shadow-xl">
            
            {/* Step 1: Project Type */}
            <div>
              <label className="block font-bold text-sm text-amber-400 uppercase tracking-wider mb-3">
                {t.estimator.step1}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {t.estimator.types.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedType(type.id)}
                    className={`p-3.5 rounded-xl text-left transition-all border flex items-center justify-between cursor-pointer ${
                      selectedType === type.id
                        ? 'bg-amber-500 text-slate-950 font-bold border-amber-500 shadow-md'
                        : 'bg-slate-800/80 text-slate-200 border-slate-700 hover:bg-slate-700/80'
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-semibold leading-snug">{type.name}</span>
                    {selectedType === type.id && <Check className="w-4 h-4 flex-shrink-0 ml-2" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Surface Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="font-bold text-sm text-amber-400 uppercase tracking-wider">
                  {t.estimator.step2} : {t.estimator.surfaceLabel}
                </label>
                <span className="px-3 py-1 bg-[#0F172A] border border-amber-500/40 text-amber-400 font-mono font-bold rounded-lg text-sm">
                  {surface} m²
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="5000"
                step="25"
                value={surface}
                onChange={(e) => setSurface(parseInt(e.target.value))}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1">
                <span>50 m²</span>
                <span>1 000 m²</span>
                <span>2 500 m²</span>
                <span>5 000 m²</span>
              </div>
            </div>

            {/* Step 3: Location */}
            <div>
              <label className="block font-bold text-sm text-amber-400 uppercase tracking-wider mb-2.5">
                {t.estimator.step3}
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
              >
                {t.estimator.locations.map((loc) => (
                  <option key={loc.id} value={loc.id} className="bg-slate-900 text-white">
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Step 4: Finish Level */}
            <div>
              <label className="block font-bold text-sm text-amber-400 uppercase tracking-wider mb-3">
                {t.estimator.step4}
              </label>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {t.estimator.finishes.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setSelectedFinish(f.id)}
                    className={`py-2.5 px-3 rounded-xl text-center text-xs font-bold transition-all border cursor-pointer ${
                      selectedFinish === f.id
                        ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Results Summary Box (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 via-[#0F172A] to-slate-900 border border-amber-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-500/20 text-amber-400 text-xs font-bold uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.estimator.estimateTitle}</span>
            </div>

            {/* Budget Range Box */}
            <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700 mb-6">
              <span className="text-xs text-slate-400 font-semibold block mb-1">
                {t.estimator.estimateRange}
              </span>
              <div className="font-black text-2xl sm:text-3xl text-amber-400 tracking-tight mb-2">
                {formatNumber(minCost)} - {formatNumber(maxCost)} <span className="text-lg text-white">MAD</span>
              </div>
              <div className="text-xs text-slate-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>{isRTL ? "المدة الزمنية التقديرية للإنجاز :" : "Délai prévisionnel :"} <strong>{estimatedMonths}</strong></span>
              </div>
            </div>

            {/* Configuration Recap */}
            <div className="space-y-2.5 text-xs text-slate-300 mb-6 border-t border-slate-800 pt-4">
              <div className="flex justify-between">
                <span className="text-slate-400">{isRTL ? "نوع المنشأة :" : "Nature des travaux :"}</span>
                <span className="font-semibold text-white">{currentType.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{isRTL ? "المساحة المحسوبة :" : "Superficie estimée :"}</span>
                <span className="font-semibold text-white">{surface} m²</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{isRTL ? "مستوى التشطيب :" : "Gamme de finitions :"}</span>
                <span className="font-semibold text-white">{currentFinish.name}</span>
              </div>
            </div>

            {/* Transfer Button */}
            <button
              onClick={handleTransfer}
              className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm shadow-glow-gold transition-all duration-200 cursor-pointer"
            >
              <span>{t.estimator.transferToForm}</span>
              <ArrowIcon className="w-4 h-4" />
            </button>

            {/* Disclaimer */}
            <div className="mt-4 flex items-start gap-2 text-[11px] text-slate-400 leading-relaxed">
              <Info className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <span>{t.estimator.estimateNote}</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
