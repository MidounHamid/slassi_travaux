'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { companyProfile } from '../data/companyData';
import { useLanguage } from '../context/LanguageContext';

export default function FloatingWhatsApp() {
  const { isRTL } = useLanguage();

  return (
    <aside aria-label="WhatsApp Contact" className={`fixed bottom-6 z-40 ${isRTL ? 'left-6' : 'right-6'}`}>
      <a
        href={`https://wa.me/${companyProfile.contact.whatsapp}?text=Bonjour%20Slassi%20Travaux,%20je%20souhaite%20des%20informations%20sur%20un%20projet.`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contacter Slassi Travaux sur WhatsApp"
        className="group relative flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
      >
        <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-40 animate-ping pointer-events-none" />
        
        <MessageCircle className="w-6 h-6 fill-white text-emerald-500 relative z-10 flex-shrink-0" />
        
        <span className="hidden sm:inline-block font-bold text-xs tracking-wide relative z-10">
          {isRTL ? "محادثة مباشرة عبر واتساب" : "WhatsApp Direct"}
        </span>
      </a>
    </aside>
  );
}
