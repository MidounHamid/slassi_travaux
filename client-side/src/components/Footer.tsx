'use client';

import React from 'react';
import Link from 'next/link';
import { 
  HardHat, 
  ArrowUp, 
  ChevronRight,
  Globe
} from 'lucide-react';
import { companyProfile } from '../data/companyData';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { lang, setLang, t, isRTL } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: t.nav.home, href: "/" },
    { name: t.nav.about, href: "/about" },
    { name: t.nav.services, href: "/services" },
    { name: t.nav.projects, href: "/projects" },
    { name: t.nav.equipment, href: "/equipment" },
    { name: t.nav.commitments, href: "/commitments" },
    { name: t.nav.estimator, href: "/estimator" },
    { name: t.nav.contact, href: "/contact" }
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-sm relative">
      
      {/* Top Footer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand & Corporate Overview (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 shadow-glow-gold">
                <HardHat className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <span className="font-black text-lg text-white block">
                  SLASSI <span className="text-amber-500">TRAVAUX</span>
                </span>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  {isRTL ? "شركة عامة للبناء والأشغال العمومية" : "BTP & Génie Civil • Fès"}
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {t.footer.desc}
            </p>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <strong className="block text-amber-400 font-bold mb-0.5">
                {companyProfile.legalForm} • {companyProfile.capital}
              </strong>
              <span>{companyProfile.headquarters.fullAddressFr}</span>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400 transition-colors"
                  >
                    <ChevronRight className={`w-3.5 h-3.5 text-slate-600 ${isRTL ? 'rotate-180' : ''}`} />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Fiscal Credentials (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              {t.footer.legalTitle}
            </h4>
            
            <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-4 space-y-2 font-mono text-xs text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Capital Social :</span>
                <span className="text-amber-400 font-bold">{companyProfile.capitalFormatted}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">ICE :</span>
                <span className="text-white font-bold">{companyProfile.legal.ice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">RC Fès :</span>
                <span className="text-white">{companyProfile.legal.rc}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Identifiant Fiscal (IF) :</span>
                <span className="text-white">{companyProfile.legal.if}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Patente :</span>
                <span className="text-white">{companyProfile.legal.patente}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Affiliation CNSS :</span>
                <span className="text-white">{companyProfile.legal.cnss}</span>
              </div>
            </div>

            {/* Language Switcher in Footer */}
            <div className="flex items-center gap-2 pt-2">
              <Globe className="w-4 h-4 text-slate-400" />
              <button
                onClick={() => setLang('fr')}
                className={`px-2 py-1 rounded text-xs font-bold cursor-pointer ${lang === 'fr' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white bg-slate-900'}`}
              >
                Français
              </button>
              <button
                onClick={() => setLang('ar')}
                className={`px-2 py-1 rounded text-xs font-bold cursor-pointer ${lang === 'ar' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white bg-slate-900'}`}
              >
                العربية
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-1 rounded text-xs font-bold cursor-pointer ${lang === 'en' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white bg-slate-900'}`}
              >
                English
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar & Copyright */}
      <div className="bg-slate-950 border-t border-slate-900 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            <span>{t.footer.rights}</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-400">{t.footer.designedWith}</span>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-amber-400 border border-slate-800 transition-colors cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>{t.footer.backToTop}</span>
            </button>
          </div>
        </div>
      </div>

    </footer>
  );
}
