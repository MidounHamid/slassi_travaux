"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck, Building2, Phone, Save, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function CompanySettings() {
  const { t } = useLanguage();
  const [saved, setSaved] = useState(false);
  const [companyName, setCompanyName] = useState("Slassi De Travaux Divers SARL AU");
  const [capital, setCapital] = useState("17 000 000 DH");
  const [address, setAddress] = useState("Fès, Maroc");
  const [phone, setPhone] = useState("+212 6 61 00 00 00");
  const [email, setEmail] = useState("contact@slassi-travaux.ma");
  const [rc, setRc] = useState("RC Fès N° 12458");
  const [patente, setPatente] = useState("Patente 14589632");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <form onSubmit={handleSave} className="space-y-4 max-w-4xl">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center space-x-2 rtl:space-x-reverse">
            <Building2 className="h-5 w-5 text-amber-500" />
            <span>{t("settings_title")}</span>
          </h2>
          <p className="text-xs text-slate-400">
            {t("settings_desc")}
          </p>
        </div>
        <Button
          type="submit"
          size="sm"
          className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold flex items-center space-x-1 rtl:space-x-reverse"
        >
          {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          <span>{saved ? t("btn_saved_success") : t("btn_save")}</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Legal Card */}
        <Card className="border-slate-800 bg-slate-900/60">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm text-slate-200 flex items-center space-x-1.5 rtl:space-x-reverse">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>{t("card_legal_title")}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-2 space-y-3">
            <div>
              <label className="block text-slate-400 mb-1">{t("lbl_legal_name")}</label>
              <Input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">{t("lbl_capital")}</label>
              <Input
                value={capital}
                onChange={(e) => setCapital(e.target.value)}
                className="font-mono text-amber-400 font-bold"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-400 mb-1">{t("lbl_rc")}</label>
                <Input value={rc} onChange={(e) => setRc(e.target.value)} />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">{t("lbl_patente")}</label>
                <Input value={patente} onChange={(e) => setPatente(e.target.value)} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Card */}
        <Card className="border-slate-800 bg-slate-900/60">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm text-slate-200 flex items-center space-x-1.5 rtl:space-x-reverse">
              <Phone className="h-4 w-4 text-sky-400" />
              <span>{t("card_contact_title")}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-2 space-y-3">
            <div>
              <label className="block text-slate-400 mb-1">{t("lbl_address")}</label>
              <Input value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">{t("lbl_phone")}</label>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">{t("lbl_email")}</label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}
