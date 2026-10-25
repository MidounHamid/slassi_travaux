"use client";

import React, { useState } from "react";
import {
  Calculator,
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  CheckCircle2,
  Search,
  Filter,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

interface QuoteItem {
  id: string;
  client: string;
  project: string;
  location: string;
  amount: string;
  date: string;
  status: "pending" | "reviewed" | "contacted";
  phone: string;
  whatsapp: string;
}

const INITIAL_QUOTES: QuoteItem[] = [
  {
    id: "DEV-2026-089",
    client: "Société Immobilière Saïss",
    project: "Terrassement & Plateforme Logistique 4 200 m²",
    location: "Zone Industrielle Bensouda, Fès",
    amount: "285 000 MAD",
    date: "Aujourd'hui à 09:30",
    status: "pending",
    phone: "+212 6 61 12 34 56",
    whatsapp: "212661123456",
  },
  {
    id: "DEV-2026-088",
    client: "Groupe Hôtelier Médina",
    project: "VRD & Assainissement Complexe Touristique",
    location: "Route d'Immouzzer, Fès",
    amount: "540 000 MAD",
    date: "Hier à 16:15",
    status: "reviewed",
    phone: "+212 6 62 98 76 54",
    whatsapp: "212662987654",
  },
  {
    id: "DEV-2026-087",
    client: "Promoteur Privé M. Berrada",
    project: "Gros Œuvre & Fondations Immeuble R+5",
    location: "Quartier Champs de Course, Fès",
    amount: "1 250 000 MAD",
    date: "14 Oct 2026",
    status: "contacted",
    phone: "+212 6 63 45 67 89",
    whatsapp: "212663456789",
  },
  {
    id: "DEV-2026-086",
    client: "Coopérative Agricole Saïss",
    project: "Nivellement et Accès Piste Rurale 2.8 km",
    location: "Ain Cheggag, Région Fès",
    amount: "195 000 MAD",
    date: "12 Oct 2026",
    status: "pending",
    phone: "+212 6 64 11 22 33",
    whatsapp: "212664112233",
  },
  {
    id: "DEV-2026-085",
    client: "Particulier M. Alami",
    project: "Terrassement de Villa & Fouilles en Rigoles",
    location: "Route de Sefrou, Fès",
    amount: "78 000 MAD",
    date: "10 Oct 2026",
    status: "contacted",
    phone: "+212 6 65 77 88 99",
    whatsapp: "212665778899",
  },
];

export function QuotesList() {
  const { t, language } = useLanguage();
  const [quotes, setQuotes] = useState<QuoteItem[]>(INITIAL_QUOTES);
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  const handleStatusChange = (id: string, newStatus: QuoteItem["status"]) => {
    setQuotes(
      quotes.map((q) => (q.id === id ? { ...q, status: newStatus } : q))
    );
  };

  const filtered = quotes.filter((q) => {
    const matchesFilter = filter === "all" || q.status === filter;
    const matchesSearch =
      search === "" ||
      q.client.toLowerCase().includes(search.toLowerCase()) ||
      q.project.toLowerCase().includes(search.toLowerCase()) ||
      q.location.toLowerCase().includes(search.toLowerCase()) ||
      q.id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-400 text-xs font-semibold mb-1.5">
            <Calculator className="h-3.5 w-3.5" />
            <span>12 Estimations Clients Reçues</span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Demandes de Devis (Simulateur en Ligne)
          </h1>
          <p className="text-xs text-slate-400">
            Répondez directement aux clients par WhatsApp ou appel téléphonique pour valider leurs projets BTP.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/60 p-1 rounded-lg border border-slate-800">
          {[
            { id: "all", label: "Toutes les demandes" },
            { id: "pending", label: "Nouveaux (En attente)" },
            { id: "reviewed", label: "En étude" },
            { id: "contacted", label: "Clients contactés" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                filter === f.id
                  ? "bg-purple-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="h-3.5 w-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher un client, projet..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-8 pl-9 pr-3 text-xs bg-slate-900/80 border border-slate-700 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Quotes Cards */}
      <div className="space-y-3">
        {filtered.map((q) => (
          <div
            key={q.id}
            className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  {q.id}
                </span>

                {/* Status selector */}
                <select
                  value={q.status}
                  onChange={(e) =>
                    handleStatusChange(q.id, e.target.value as QuoteItem["status"])
                  }
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border focus:outline-none cursor-pointer ${
                    q.status === "pending"
                      ? "bg-amber-950/40 border-amber-500/40 text-amber-400"
                      : q.status === "reviewed"
                      ? "bg-sky-950/40 border-sky-500/40 text-sky-400"
                      : "bg-emerald-950/40 border-emerald-500/40 text-emerald-400"
                  }`}
                >
                  <option value="pending" className="bg-slate-900 text-amber-400">
                    ⏳ Nouveau (En attente)
                  </option>
                  <option value="reviewed" className="bg-slate-900 text-sky-400">
                    🔍 En étude technique
                  </option>
                  <option value="contacted" className="bg-slate-900 text-emerald-400">
                    ✓ Client Contacté
                  </option>
                </select>

                <span className="text-slate-400 text-[11px] flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {q.date}
                </span>
              </div>

              <div className="font-bold text-slate-100 text-sm">{q.client}</div>
              <div className="text-slate-300 font-medium">{q.project}</div>

              <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 pt-0.5">
                <span className="flex items-center gap-1 text-slate-300">
                  <MapPin className="h-3.5 w-3.5 text-amber-400" />
                  <span>{q.location}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-slate-300 font-mono">
                  <Phone className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{q.phone}</span>
                </span>
              </div>
            </div>

            {/* Price and Actions */}
            <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-3 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-slate-800">
              <div className="text-left md:text-right">
                <span className="text-[10px] text-slate-400 block uppercase tracking-wider">
                  Montant Estimé
                </span>
                <span className="text-base font-mono font-black text-amber-400">
                  {q.amount}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/${q.whatsapp}?text=Bonjour%20${encodeURIComponent(q.client)},%20suite%20%C3%A0%20votre%20demande%20de%20devis%20sur%20slassi-travaux.ma`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shadow-sm cursor-pointer"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={`tel:${q.phone}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-xs transition-colors cursor-pointer"
                >
                  <Phone className="h-3.5 w-3.5 text-sky-400" />
                  <span>Appeler</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="p-8 text-center text-xs text-slate-400 border border-dashed border-slate-800 rounded-xl">
          Aucune demande ne correspond au filtre sélectionné.
        </div>
      )}
    </div>
  );
}
