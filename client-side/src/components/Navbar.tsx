'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  ChevronRight, 
  PhoneCall, 
  FileText, 
  Compass, 
  Globe 
} from 'lucide-react';
import { companyProfile } from '../data/companyData';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const { lang, setLang, t, isRTL } = useLanguage();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#0F172A]/95 backdrop-blur-md border-b border-slate-700/80 shadow-glow-navy' 
          : 'bg-[#0F172A]/90 backdrop-blur-sm border-b border-slate-800/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0">
        <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center group focus:outline-none">
            <img
              src="/images/logo.png"
              alt="Slassi Travaux"
              className="h-40 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              style={{ mixBlendMode: 'screen' }}
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className={`hidden xl:flex items-center gap-1 lg:gap-2 ml-10 ${isRTL ? 'flex-row-reverse mr-10 ml-0' : 'flex-row'}`}>
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                    active
                      ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                      : 'text-slate-200 hover:text-amber-400 hover:bg-slate-800/60'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* CTA Buttons & Action Area */}
          <div className={`hidden md:flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            {/* Quick Estimator Shortcut */}
            <Link
              href="/estimator"
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700 rounded-lg transition-all"
            >
              <Compass className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.nav.estimator}</span>
            </Link>

            {/* Primary Request Quote CTA */}
            <Link
              href="/contact"
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm rounded-lg shadow-glow-gold hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <FileText className="w-4 h-4" />
              <span>{t.nav.quoteBtn}</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 xl:hidden">
            {/* Mobile Lang switcher mini */}
            <div className="flex items-center bg-slate-900 border border-slate-700 rounded p-0.5 md:hidden">
              <button
                onClick={() => setLang('fr')}
                className={`px-1.5 py-0.5 text-[10px] font-bold rounded cursor-pointer ${lang === 'fr' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}
              >
                FR
              </button>
              <button
                onClick={() => setLang('ar')}
                className={`px-1.5 py-0.5 text-[10px] font-bold rounded cursor-pointer ${lang === 'ar' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}
              >
                عربي
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
              className="p-2.5 rounded-lg bg-slate-800 text-slate-200 hover:text-amber-400 hover:bg-slate-700 transition-colors focus:outline-none cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0F172A] border-b border-slate-700/80 px-4 pt-3 pb-6 shadow-2xl animate-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-2 mb-4">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg text-base font-semibold transition-colors ${
                    active
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'text-slate-200 hover:bg-slate-800 hover:text-amber-400'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className={`w-4 h-4 ${active ? 'text-slate-950' : 'text-slate-400'} ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-3">
            {/* Mobile Lang select */}
            <div className="flex items-center justify-between px-3 py-2 bg-slate-900/80 rounded-lg">
              <span className="text-xs text-slate-400 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-amber-500" />
                Langue / اللغة:
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => { setLang('fr'); }}
                  className={`px-2.5 py-1 text-xs font-bold rounded cursor-pointer ${lang === 'fr' ? 'bg-amber-500 text-slate-950' : 'text-slate-300 bg-slate-800'}`}
                >
                  Français
                </button>
                <button
                  onClick={() => { setLang('ar'); }}
                  className={`px-2.5 py-1 text-xs font-bold rounded cursor-pointer ${lang === 'ar' ? 'bg-amber-500 text-slate-950' : 'text-slate-300 bg-slate-800'}`}
                >
                  العربية
                </button>
                <button
                  onClick={() => { setLang('en'); }}
                  className={`px-2.5 py-1 text-xs font-bold rounded cursor-pointer ${lang === 'en' ? 'bg-amber-500 text-slate-950' : 'text-slate-300 bg-slate-800'}`}
                >
                  English
                </button>
              </div>
            </div>

            {/* Mobile Call Direct */}
            <a
              href={`tel:${companyProfile.contact.phone}`}
              className="flex items-center justify-center gap-2 w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-lg text-sm border border-slate-700"
            >
              <PhoneCall className="w-4 h-4 text-amber-500" />
              <span>{t.nav.callUs} : {companyProfile.contact.phoneDisplay}</span>
            </a>

            {/* Mobile Primary Quote CTA */}
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold rounded-lg text-sm shadow-glow-gold"
            >
              <FileText className="w-4 h-4" />
              <span>{t.nav.quoteBtn}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
