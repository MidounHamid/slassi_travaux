"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, translations } from "../i18n/translations";

type TranslationKey = keyof typeof translations.fr;

interface LanguageContextType {
  language: Language;
  dir: "ltr" | "rtl";
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("fr");

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("slassi_admin_lang") as Language;
      if (savedLang === "ar" || savedLang === "fr" || savedLang === "en") {
        setLanguageState(savedLang);
      }
    } catch {
      // ignore
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("slassi_admin_lang", lang);
    } catch {
      // ignore
    }
  };

  const dir = language === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
      document.documentElement.dir = dir;
    }
  }, [language, dir]);

  const t = (key: TranslationKey): string => {
    const langDict = translations[language];
    if (langDict && key in langDict) {
      return langDict[key];
    }
    return translations.fr[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, dir, setLanguage, t }}>
      <div dir={dir} className={language === "ar" ? "font-arabic" : ""}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
