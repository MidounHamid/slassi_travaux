"use client";

import React, { useState } from "react";
import {
  Building2,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  AlertCircle,
  KeyRound,
  ExternalLink,
  Sparkles,
  ArrowRight,
  HardHat,
  Cpu,
} from "lucide-react";
import { api, AuthUser } from "@/lib/api";
import { useLanguage } from "@/context/LanguageContext";

interface LoginFormProps {
  onLoginSuccess: (user: AuthUser, token: string) => void;
}

export function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const { language, setLanguage } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError(
        language === "ar"
          ? "يرجى ملء جميع الحقول المطلوبة."
          : "Veuillez renseigner votre email et mot de passe."
      );
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await api.login({ email, password });
      if (res.success && res.token) {
        setSuccess(true);
        setTimeout(() => {
          onLoginSuccess(res.user, res.token);
        }, 500);
      } else {
        setError(res.message || "Échec d'authentification");
      }
    } catch (err: any) {
      console.error("Login failed:", err);
      setError(
        err.message ||
          (language === "ar"
            ? "تعذر تسجيل الدخول. يرجى التحقق من بياناتك."
            : "Identifiants invalides. Vérifiez votre email et mot de passe.")
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail("admin@slassi-travaux.ma");
    setPassword("admin123");
    setError(null);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#070b14] relative overflow-hidden px-4 py-8">
      {/* Background Architectural Grid & Subtle Ambient Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#141e3315_1px,transparent_1px),linear-gradient(to_bottom,#141e3315_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Language & Public Link Top Nav */}
      <div className="absolute top-4 inset-x-4 max-w-5xl mx-auto flex items-center justify-between z-20">
        <a
          href="http://localhost:3000"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center space-x-1.5 rtl:space-x-reverse text-xs px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60 transition-all shadow-xs"
        >
          <span>{language === "ar" ? "زيارة الموقع العام" : "Site Public Slassi"}</span>
          <ExternalLink className="h-3.5 w-3.5 text-amber-400" />
        </a>

        <div className="flex items-center p-0.5 rounded-lg bg-slate-900/80 border border-slate-700/60">
          <button
            type="button"
            onClick={() => setLanguage("fr")}
            className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
              language === "fr"
                ? "bg-amber-500 text-slate-950 shadow-xs"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            FR
          </button>
          <button
            type="button"
            onClick={() => setLanguage("ar")}
            className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
              language === "ar"
                ? "bg-amber-500 text-slate-950 shadow-xs"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            عربي
          </button>
          <button
            type="button"
            onClick={() => setLanguage("en")}
            className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
              language === "en"
                ? "bg-amber-500 text-slate-950 shadow-xs"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            EN
          </button>
        </div>
      </div>

      {/* Main Glassmorphic Card */}
      <div className="w-full max-w-md z-10 animate-in fade-in zoom-in-95 duration-300">
        <div className="relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#0d1424]/95 p-6 sm:p-8 border border-slate-700/80 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          {/* Top Decorative Amber Line */}
          <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

          {/* Header Branding */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="relative mb-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20 ring-4 ring-amber-500/10">
                <Building2 className="h-7 w-7" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-slate-900 border-2 border-slate-800 flex items-center justify-center text-amber-400">
                <KeyRound className="h-3 w-3" />
              </div>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              SLASSI TRAVAUX
            </h1>
            <p className="text-xs text-amber-400/90 font-semibold tracking-wider uppercase mt-0.5">
              {language === "ar"
                ? "بوابة الإدارة المركزية • مصادقة JWT"
                : "Portail Administratif • Session JWT"}
            </p>
            <span className="text-[11px] text-slate-400 mt-1 max-w-xs">
              {language === "ar"
                ? "سجل الدخول لإدارة المشاريع، أسطول الآليات، وطلبات العروض"
                : "Accès réservé à la direction et aux chefs de projets autorisés"}
            </span>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start space-x-2.5 rtl:space-x-reverse text-red-300 text-xs animate-in slide-in-from-top-2">
              <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
              <div className="flex-1 leading-relaxed">{error}</div>
            </div>
          )}

          {/* Success Banner */}
          {success && (
            <div className="mb-5 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center space-x-2.5 rtl:space-x-reverse text-emerald-300 text-xs animate-in slide-in-from-top-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
              <div className="flex-1 font-semibold">
                {language === "ar"
                  ? "تم التحقق بنجاح! جاري توجيهك إلى لوحة التحكم..."
                  : "Authentification réussie ! Chargement du tableau de bord..."}
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 text-left rtl:text-right">
                {language === "ar" ? "البريد الإلكتروني" : "Adresse Email Professionnelle"}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3.5 rtl:pl-0 rtl:pr-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@slassi-travaux.ma"
                  disabled={loading || success}
                  className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl pl-10 rtl:pl-3.5 rtl:pr-10 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all disabled:opacity-50"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  {language === "ar" ? "كلمة المرور" : "Mot de passe"}
                </label>
                <span className="text-[10px] text-amber-400/80">
                  {language === "ar" ? "مشفر عبر HMAC-SHA256" : "Sécurisé JWT (HS256)"}
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3.5 rtl:pl-0 rtl:pr-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  disabled={loading || success}
                  className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl pl-10 rtl:pl-10 rtl:pr-10 pr-10 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 pr-3.5 rtl:pr-0 rtl:pl-3.5 flex items-center text-slate-400 hover:text-slate-200 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || success}
              className="w-full mt-2 py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all duration-200 flex items-center justify-center space-x-2 rtl:space-x-reverse cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>
                    {language === "ar"
                      ? "جاري التحقق من الرمز..."
                      : "Vérification du jeton JWT..."}
                  </span>
                </>
              ) : success ? (
                <>
                  <ShieldCheck className="h-4 w-4" />
                  <span>{language === "ar" ? "تم التحقق !" : "Connecté avec succès"}</span>
                </>
              ) : (
                <>
                  <span>
                    {language === "ar" ? "تسجيل الدخول" : "Se Connecter à l'Administration"}
                  </span>
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </>
              )}
            </button>
          </form>

          {/* Interactive Multi-Role Demo Switcher */}
          <div className="mt-6 pt-5 border-t border-slate-800/80">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2.5">
              <span className="font-semibold flex items-center space-x-1.5 rtl:space-x-reverse text-amber-400">
                <Sparkles className="h-3.5 w-3.5" />
                <span>
                  {language === "ar" ? "اختر دوراً لتجربة الصلاحيات" : "Tester les Rôles & Permissions"}
                </span>
              </span>
              <span className="text-[10px] text-slate-500">1-Clic</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {/* 1. Super Admin */}
              <button
                type="button"
                onClick={() => {
                  setEmail("admin@slassi-travaux.ma");
                  setPassword("admin123");
                  setError(null);
                }}
                className={`p-2 rounded-xl text-left rtl:text-right border transition-all cursor-pointer ${
                  email === "admin@slassi-travaux.ma"
                    ? "bg-amber-500/20 border-amber-500 text-amber-300 shadow-xs"
                    : "bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300"
                }`}
              >
                <div className="flex items-center space-x-1.5 rtl:space-x-reverse font-bold text-[11px]">
                  <span>👑</span>
                  <span className="truncate">Super Admin</span>
                </div>
                <div className="text-[10px] text-slate-500 truncate mt-0.5">Direction Générale</div>
              </button>

              {/* 2. Chef de Projet */}
              <button
                type="button"
                onClick={() => {
                  setEmail("chef.projet@slassi-travaux.ma");
                  setPassword("projet123");
                  setError(null);
                }}
                className={`p-2 rounded-xl text-left rtl:text-right border transition-all cursor-pointer ${
                  email === "chef.projet@slassi-travaux.ma"
                    ? "bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-xs"
                    : "bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300"
                }`}
              >
                <div className="flex items-center space-x-1.5 rtl:space-x-reverse font-bold text-[11px]">
                  <span>🏗️</span>
                  <span className="truncate">Chef de Projet</span>
                </div>
                <div className="text-[10px] text-slate-500 truncate mt-0.5">Chantiers & Travaux</div>
              </button>

              {/* 3. Responsable Matériel */}
              <button
                type="button"
                onClick={() => {
                  setEmail("parc@slassi-travaux.ma");
                  setPassword("parc123");
                  setError(null);
                }}
                className={`p-2 rounded-xl text-left rtl:text-right border transition-all cursor-pointer ${
                  email === "parc@slassi-travaux.ma"
                    ? "bg-blue-500/20 border-blue-500 text-blue-300 shadow-xs"
                    : "bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300"
                }`}
              >
                <div className="flex items-center space-x-1.5 rtl:space-x-reverse font-bold text-[11px]">
                  <span>🚜</span>
                  <span className="truncate">Resp. Parc</span>
                </div>
                <div className="text-[10px] text-slate-500 truncate mt-0.5">Engins & Maintenance</div>
              </button>

              {/* 4. Commercial */}
              <button
                type="button"
                onClick={() => {
                  setEmail("commercial@slassi-travaux.ma");
                  setPassword("commercial123");
                  setError(null);
                }}
                className={`p-2 rounded-xl text-left rtl:text-right border transition-all cursor-pointer ${
                  email === "commercial@slassi-travaux.ma"
                    ? "bg-purple-500/20 border-purple-500 text-purple-300 shadow-xs"
                    : "bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300"
                }`}
              >
                <div className="flex items-center space-x-1.5 rtl:space-x-reverse font-bold text-[11px]">
                  <span>💼</span>
                  <span className="truncate">Commercial</span>
                </div>
                <div className="text-[10px] text-slate-500 truncate mt-0.5">Devis & Estimations</div>
              </button>
            </div>
          </div>

          {/* Security & Standards Badges Footer */}
          <div className="mt-5 pt-4 border-t border-slate-800/50 flex items-center justify-center space-x-4 rtl:space-x-reverse text-[10px] text-slate-500">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <ShieldCheck className="h-3 w-3 text-emerald-400" />
              <span>JWT Bearer RFC 7519</span>
            </div>
            <span>•</span>
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <Cpu className="h-3 w-3 text-amber-400" />
              <span>Laravel 12 API</span>
            </div>
          </div>
        </div>

        {/* Corporate Legal Footer */}
        <p className="text-center text-[11px] text-slate-500 mt-4">
          © {new Date().getFullYear()} SLASSI DE TRAVAUX DIVERS SARL AU • RC 58492 Fès
        </p>
      </div>
    </div>
  );
}
