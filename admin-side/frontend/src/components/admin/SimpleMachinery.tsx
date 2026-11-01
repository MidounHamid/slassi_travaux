"use client";

import React, { useEffect, useState } from "react";
import {
  Truck,
  Plus,
  Trash2,
  X,
  Search,
  MapPin,
  RefreshCw,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/context/LanguageContext";
import { api, ApiMachinery } from "@/lib/api";
import { INITIAL_MACHINERY } from "@/data/initialData";

interface SimpleMachineryProps {
  onNewMachineModalOpen?: () => void;
}

export function SimpleMachinery({ onNewMachineModalOpen }: SimpleMachineryProps) {
  const { language } = useLanguage();
  const [machines, setMachines] = useState<ApiMachinery[]>(INITIAL_MACHINERY);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New Machine Form State
  const [newCode, setNewCode] = useState("");
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState<ApiMachinery["category"]>("Terrassement");
  const [newSpecs, setNewSpecs] = useState("");
  const [newStatus, setNewStatus] = useState<ApiMachinery["status"]>("available");
  const [newSite, setNewSite] = useState("Dépôt Central Fès");

  const fetchMachinery = async () => {
    try {
      setLoading(true);
      const res = await api.getMachinery({
        category: filterCategory,
        search: search.trim() || undefined,
      });
      if (res && res.data && res.data.length > 0) {
        setMachines(res.data);
      }
    } catch (err) {
      console.warn("API fetch machinery failed, keeping state:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMachinery();
  }, [filterCategory]);

  const handleAddMachine = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    setIsSubmitting(true);
    const newMachData: Partial<ApiMachinery> = {
      code: newCode.trim() || `ENG-${machines.length + 1 < 10 ? "0" : ""}${machines.length + 1}`,
      name: newName.trim(),
      category: newCategory,
      specs: newSpecs.trim() || "Spécifications standard",
      status: newStatus,
      currentSite: newSite.trim() || "Dépôt Central Fès",
    };

    try {
      const created = await api.createMachine(newMachData);
      setMachines([created, ...machines]);
    } catch (err) {
      console.warn("API machine creation failed, saving locally:", err);
      const localMach: ApiMachinery = {
        id: `mach-${Date.now()}`,
        code: newMachData.code!,
        name: newMachData.name!,
        category: newMachData.category!,
        specs: newMachData.specs!,
        status: newMachData.status!,
        currentSite: newMachData.currentSite!,
      };
      setMachines([localMach, ...machines]);
    } finally {
      setIsSubmitting(false);
      setIsModalOpen(false);
      // Reset
      setNewCode("");
      setNewName("");
      setNewSpecs("");
      setNewSite("Dépôt Central Fès");
    }
  };

  const handleStatusChange = async (id: string | number, status: ApiMachinery["status"]) => {
    const updatedSite =
      status === "available"
        ? "Dépôt Central Fès"
        : status === "maintenance"
        ? "Atelier Technique Fès"
        : "Sur Chantier";

    // Optimistic UI update
    setMachines(
      machines.map((m) => {
        if (m.id === id) {
          return {
            ...m,
            status,
            currentSite: updatedSite,
          };
        }
        return m;
      })
    );

    try {
      await api.updateMachine(id, {
        status,
        currentSite: updatedSite,
      });
    } catch (err) {
      console.warn("API status change failed:", err);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!confirm("Voulez-vous retirer cet engin de la flotte ?")) return;

    try {
      await api.deleteMachine(id);
    } catch (err) {
      console.warn("API delete failed:", err);
    }
    setMachines(machines.filter((m) => m.id !== id));
  };

  const availableCount = machines.filter((m) => m.status === "available").length;
  const onSiteCount = machines.filter((m) => m.status === "on_site").length;
  const maintenanceCount = machines.filter((m) => m.status === "maintenance").length;

  const filtered = machines.filter((m) => {
    const matchesCat = filterCategory === "all" || m.category === filterCategory;
    const matchesSearch =
      search === "" ||
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.code.toLowerCase().includes(search.toLowerCase()) ||
      (m.currentSite && m.currentSite.toLowerCase().includes(search.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-1.5">
            <Truck className="h-3.5 w-3.5" />
            <span>Flotte BTP Slassi Travaux (MySQL)</span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Parc Matériel & Engins Lourds
          </h1>
          <p className="text-xs text-slate-400">
            Suivez l'état et l'affectation de vos pelles, bulldozers, niveleuses et camions connectés en direct.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button
            size="sm"
            variant="outline"
            onClick={fetchMachinery}
            className="text-xs border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800"
          >
            <RefreshCw className={`h-3.5 w-3.5 mr-1 ${loading ? "animate-spin text-emerald-400" : ""}`} />
            <span>Actualiser</span>
          </Button>

          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Ajouter un Engin</span>
          </Button>
        </div>
      </div>

      {/* Quick Status Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3 rounded-lg border border-emerald-500/30 bg-emerald-950/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300 font-medium">Disponibles au Dépôt :</span>
          </div>
          <span className="font-bold text-emerald-400 text-sm">{availableCount} engins</span>
        </div>

        <div className="p-3 rounded-lg border border-amber-500/30 bg-amber-950/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="text-slate-300 font-medium">Actifs sur Chantiers :</span>
          </div>
          <span className="font-bold text-amber-400 text-sm">{onSiteCount} engins</span>
        </div>

        <div className="p-3 rounded-lg border border-slate-700 bg-slate-900/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
            <span className="text-slate-300 font-medium">En Entretien / Révision :</span>
          </div>
          <span className="font-bold text-slate-300 text-sm">{maintenanceCount} engins</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/60 p-1 rounded-lg border border-slate-800">
          {[
            { id: "all", label: "Toute la flotte" },
            { id: "Terrassement", label: "Pelles & Bulls" },
            { id: "Nivellement", label: "Niveleuses" },
            { id: "Compactage", label: "Compacteurs" },
            { id: "Transport", label: "Camions" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                filterCategory === cat.id
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="h-3.5 w-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher un engin (ex: CAT, Bomag)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-8 pl-9 pr-3 text-xs bg-slate-900/80 border border-slate-700 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Machinery Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((m) => (
          <div
            key={m.id}
            className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-all space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  {m.code}
                </span>

                <Badge
                  variant={
                    m.status === "available"
                      ? "success"
                      : m.status === "on_site"
                      ? "warning"
                      : "secondary"
                  }
                  className="text-[10px]"
                >
                  {m.status === "available"
                    ? "✓ Disponible"
                    : m.status === "on_site"
                    ? "⏳ Sur Chantier"
                    : "🔧 Maintenance"}
                </Badge>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-100">{m.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{m.specs}</p>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-300 pt-1">
                <MapPin className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                <span className="truncate">{m.currentSite || "Non assigné"}</span>
              </div>
            </div>

            {/* Quick Status Buttons */}
            <div className="pt-2 border-t border-slate-800/80 space-y-2 text-xs">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Changer l'état :</span>
                <button
                  onClick={() => handleDelete(m.id)}
                  title="Supprimer cet engin"
                  className="text-slate-500 hover:text-red-400 p-0.5 cursor-pointer"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-1 text-[10px]">
                <button
                  onClick={() => handleStatusChange(m.id, "available")}
                  className={`py-1 rounded font-medium border transition-colors cursor-pointer ${
                    m.status === "available"
                      ? "bg-emerald-600 text-white border-emerald-500"
                      : "bg-slate-800 text-slate-400 border-slate-700 hover:text-white"
                  }`}
                >
                  Disponible
                </button>
                <button
                  onClick={() => handleStatusChange(m.id, "on_site")}
                  className={`py-1 rounded font-medium border transition-colors cursor-pointer ${
                    m.status === "on_site"
                      ? "bg-amber-600 text-white border-amber-500"
                      : "bg-slate-800 text-slate-400 border-slate-700 hover:text-white"
                  }`}
                >
                  Chantier
                </button>
                <button
                  onClick={() => handleStatusChange(m.id, "maintenance")}
                  className={`py-1 rounded font-medium border transition-colors cursor-pointer ${
                    m.status === "maintenance"
                      ? "bg-rose-600 text-white border-rose-500"
                      : "bg-slate-800 text-slate-400 border-slate-700 hover:text-white"
                  }`}
                >
                  Entretien
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="p-8 text-center text-xs text-slate-400 border border-dashed border-slate-800 rounded-xl">
          Aucun engin ne correspond à votre recherche.
        </div>
      )}

      {/* Add Machine Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Truck className="h-4 w-4 text-emerald-400" />
                <span>Ajouter un Engin à la Flotte</span>
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleAddMachine} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Code Engin *
                  </label>
                  <Input
                    placeholder="ex: ENG-09"
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Catégorie
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) =>
                      setNewCategory(e.target.value as ApiMachinery["category"])
                    }
                    className="w-full h-8 px-2 rounded-md bg-slate-800 border border-slate-700 text-slate-200 text-xs focus:outline-none"
                  >
                    <option value="Terrassement">Terrassement</option>
                    <option value="Nivellement">Nivellement</option>
                    <option value="Compactage">Compactage</option>
                    <option value="Transport">Transport</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Modèle & Marque *
                </label>
                <Input
                  required
                  placeholder="ex: Pelle Chenille CAT 320D"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Spécifications Techniques
                </label>
                <Input
                  placeholder="ex: 22 Tonnes • Godet 1.2 m³"
                  value={newSpecs}
                  onChange={(e) => setNewSpecs(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Emplacement Actuel
                </label>
                <Input
                  placeholder="ex: Dépôt Central Fès ou Chantier"
                  value={newSite}
                  onChange={(e) => setNewSite(e.target.value)}
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-800">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={isSubmitting}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer"
                >
                  {isSubmitting ? "Enregistrement..." : "Enregistrer l'Engin"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
