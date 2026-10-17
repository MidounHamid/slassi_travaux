'use client';

import React from 'react';
import { MapPin, Phone, Mail, Clock, Globe, MessageSquare } from 'lucide-react';
import { companyProfile } from '../data/companyData';
import { useLanguage } from '../context/LanguageContext';

export default function TopBar() {
  const { lang, setLang, t, isRTL } = useLanguage();

  return (
    <div className="bg-[#0B1120] border-b border-slate-800/80 text-xs text-slate-300 py-2 px-4 sm:px-8 hidden md:block select-none">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
        {/* Left Side: Address & Direct Contact */}
        <div className={`flex items-center gap-6 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className="flex items-center gap-1.5 text-slate-300 hover:text-amber-500 transition-colors">
            <MapPin className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
            <span className="truncate">{t.topBar.address}</span>
          </div>

          <a 
            href={`tel:${companyProfile.contact.phone}`} 
            className="flex items-center gap-1.5 text-slate-300 hover:text-amber-500 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
            <span dir="ltr">{companyProfile.contact.phoneDisplay}</span>
          </a>

          <a 
            href={`mailto:${companyProfile.contact.email}`} 
            className="hidden lg:flex items-center gap-1.5 text-slate-300 hover:text-amber-500 transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
            <span>{companyProfile.contact.email}</span>
          </a>
        </div>

        {/* Right Side: Hours & Language Switcher */}
        <div className={`flex items-center gap-5 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className="hidden xl:flex items-center gap-1.5 text-slate-400">
            <Clock className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
            <span>{t.topBar.hours}</span>
          </div>

          {/* WhatsApp Direct */}
          <a
            href={`https://wa.me/${companyProfile.contact.whatsapp}?text=Bonjour%20Slassi%20Travaux,%20je%20souhaite%20des%20informations%20sur%20un%20projet.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>

          {/* Language Switcher */}
          <div className="flex items-center bg-slate-900 border border-slate-700/80 rounded-md p-0.5">
            <Globe className="w-3 h-3 text-slate-400 mx-1.5" />
            
            <button
              onClick={() => setLang('fr')}
              className={`px-2 py-0.5 rounded text-xs font-semibold transition-all cursor-pointer ${
                lang === 'fr'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              FR
            </button>
            
            <button
              onClick={() => setLang('ar')}
              className={`px-2 py-0.5 rounded text-xs font-semibold transition-all cursor-pointer ${
                lang === 'ar'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              عربي
            </button>

            <button
              onClick={() => setLang('en')}
              className={`px-2 py-0.5 rounded text-xs font-semibold transition-all cursor-pointer ${
                lang === 'en'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
