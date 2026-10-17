'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, TranslationsType } from '../i18n/translations';
import { Language, EstimatorProjectResult } from '../types';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: TranslationsType;
  isRTL: boolean;
  estimateData: EstimatorProjectResult | null;
  setEstimateData: (data: EstimatorProjectResult | null) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('fr');
  const [estimateData, setEstimateData] = useState<EstimatorProjectResult | null>(null);

  // Initialize from localStorage if available
  useEffect(() => {
    const saved = localStorage.getItem('slassi_lang') as Language;
    if (saved && (saved === 'fr' || saved === 'ar' || saved === 'en')) {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('slassi_lang', newLang);
  };

  // Sync RTL and lang attribute in DOM
  useEffect(() => {
    document.documentElement.lang = lang;
    if (lang === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }, [lang]);

  const t = translations[lang] || translations.fr;
  const isRTL = lang === 'ar';

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isRTL, estimateData, setEstimateData }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
