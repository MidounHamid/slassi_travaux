'use client';

import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare, 
  UploadCloud, 
  Building2, 
  ExternalLink,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { companyProfile } from '../data/companyData';
import { useLanguage } from '../context/LanguageContext';

export default function ContactSection() {
  const { t, isRTL, estimateData } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    projectType: '',
    city: '',
    budget: '',
    message: ''
  });

  // Automatically prefill if user came from the estimator
  useEffect(() => {
    if (estimateData) {
      setFormData(prev => ({
        ...prev,
        projectType: estimateData.type || prev.projectType,
        message: `[Demande issue du Simulateur de Devis]\nType de projet : ${estimateData.type}\nSuperficie estimée : ${estimateData.surface} m²\nNiveau de finitions : ${estimateData.finish}\nFourchette budgétaire calculée : ${estimateData.estimateRange}`
      }));
    }
  }, [estimateData]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#0B1120] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/35 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Mail className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.contact.badge}</span>
          </div>
          <h2 className="font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight mb-4">
            {t.contact.title}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            {t.contact.subtitle}
          </p>
          <div className="w-20 h-1.5 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto mt-4 rounded-full" />
        </div>

        {/* 2-Column Layout: Contact Form & HQ Coordinates Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Quotation Form (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
            
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-black text-2xl text-white">
                  {t.contact.form.successTitle}
                </h3>
                <p className="text-slate-300 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
                  {t.contact.form.successDesc}
                </p>
                <div className="pt-6">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        company: '',
                        phone: '',
                        email: '',
                        projectType: '',
                        city: '',
                        budget: '',
                        message: ''
                      });
                    }}
                    className="px-6 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    {isRTL ? "إرسال طلب جديد" : "Envoyer une autre demande"}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Form Alert / Instructions */}
                <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs">
                  <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>
                    {isRTL 
                      ? "عروض أسعار مجانية، دراسة تقنية للمخططات، والتزام تام بالسرية المهنية." 
                      : "Étude technique confidentielle & gratuite sur plans. Réponse sous 24h à 48h."}
                  </span>
                </div>

                {/* Name & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      {t.contact.form.name} <span className="text-amber-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t.contact.form.namePlaceholder}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      {t.contact.form.company}
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder={t.contact.form.companyPlaceholder}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      {t.contact.form.phone} <span className="text-amber-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      dir="ltr"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+212 6 XX XX XX XX"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500 text-left"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      {t.contact.form.email} <span className="text-amber-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      dir="ltr"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t.contact.form.emailPlaceholder}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500 text-left"
                    />
                  </div>
                </div>

                {/* Project Type & City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      {t.contact.form.projectType} <span className="text-amber-500">*</span>
                    </label>
                    <select
                      name="projectType"
                      required
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                    >
                      {t.contact.form.projectTypeOptions.map((opt, i) => (
                        <option key={i} value={i === 0 ? '' : opt} disabled={i === 0} className="bg-slate-900">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      {t.contact.form.city}
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder={t.contact.form.cityPlaceholder}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    {t.contact.form.budget}
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    {t.contact.form.budgetOptions.map((b, i) => (
                      <option key={i} value={b} className="bg-slate-900">
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    {t.contact.form.message} <span className="text-amber-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t.contact.form.messagePlaceholder}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* File Upload Simulation */}
                <div className="p-4 border-2 border-dashed border-slate-700 hover:border-amber-500/50 rounded-xl text-center cursor-pointer transition-colors bg-slate-800/40">
                  <UploadCloud className="w-6 h-6 text-amber-500 mx-auto mb-1.5" />
                  <span className="block text-xs text-slate-300 font-semibold">
                    {t.contact.form.uploadLabel}
                  </span>
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-base shadow-glow-gold transition-all duration-200 cursor-pointer"
                >
                  <Send className="w-5 h-5" />
                  <span>{isSubmitting ? t.contact.form.submitting : t.contact.form.submitBtn}</span>
                </button>

              </form>
            )}

          </div>

          {/* Company Coordinates Sidebar (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Headquarters Card */}
            <div className="bg-slate-900 border border-slate-700/80 rounded-2xl p-6 sm:p-7 shadow-xl space-y-6">
              
              <div className="border-b border-slate-700 pb-4">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  {companyProfile.legalForm} • Capital : {companyProfile.capital}
                </span>
                <h3 className="font-black text-xl text-white mt-1">
                  {t.contact.sidebar.hqTitle}
                </h3>
              </div>

              {/* Coordinates List */}
              <div className="space-y-4 text-sm">
                
                {/* Address */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-slate-400 uppercase">
                      {isRTL ? "العنوان البريدي بفاس" : "Adresse Siège Social"}
                    </span>
                    <p className="text-slate-200 font-medium leading-snug mt-0.5">
                      {t.contact.sidebar.address}
                    </p>
                  </div>
                </div>

                {/* Direct Phone */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 flex-shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-slate-400 uppercase">
                      {t.contact.sidebar.phoneLabel}
                    </span>
                    <a
                      href={`tel:${companyProfile.contact.phone}`}
                      dir="ltr"
                      className="block text-white font-bold text-base hover:text-amber-400 transition-colors mt-0.5"
                    >
                      {companyProfile.contact.phoneDisplay}
                    </a>
                  </div>
                </div>

                {/* Corporate WhatsApp */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-0.5">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-slate-400 uppercase">
                      {t.contact.sidebar.whatsappLabel}
                    </span>
                    <a
                      href={`https://wa.me/${companyProfile.contact.whatsapp}?text=Bonjour%20Slassi%20Travaux,%20je%20souhaite%20des%20informations%20sur%20un%20projet.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      dir="ltr"
                      className="block text-emerald-400 font-bold hover:text-emerald-300 transition-colors mt-0.5"
                    >
                      {companyProfile.contact.mobile}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 flex-shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-slate-400 uppercase">
                      {t.contact.sidebar.emailLabel}
                    </span>
                    <a
                      href={`mailto:${companyProfile.contact.email}`}
                      className="block text-slate-200 hover:text-amber-400 transition-colors mt-0.5"
                    >
                      {companyProfile.contact.email}
                    </a>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-3 border-t border-slate-800 pt-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="text-xs text-slate-300 space-y-1">
                    <span className="block font-bold text-white uppercase">
                      {t.contact.sidebar.hoursTitle}
                    </span>
                    <p>{t.contact.sidebar.hoursWeek}</p>
                    <p>{t.contact.sidebar.hoursSat}</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Simulated Interactive Map Card of Fez Office */}
            <div className="bg-slate-900 border border-slate-700/80 rounded-2xl overflow-hidden shadow-xl">
              <div className="p-4 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  {isRTL ? "موقع المقر بمدينة فاس" : "Plan d'Accès Siège Fès"}
                </span>
                <a
                  href="https://maps.google.com/?q=Avenue+Mohamed+Slaoui+Fes+Morocco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400 hover:underline"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Map Canvas Graphic */}
              <div className="h-44 bg-gradient-to-br from-slate-950 via-[#0F172A] to-slate-900 relative flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-stripes opacity-15" />
                
                {/* Marker Center */}
                <div className="relative z-10 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-500 text-slate-950 shadow-glow-gold animate-bounce mb-2">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <span className="block text-xs font-black text-white bg-slate-900/90 px-3 py-1 rounded-full border border-amber-500/40 shadow-lg">
                    Résidence Bureau Jawahir • Av. Mohamed Slaoui
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
