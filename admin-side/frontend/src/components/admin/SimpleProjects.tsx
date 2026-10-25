"use client";

import React, { useState } from "react";
import {
  HardHat,
  Plus,
  MapPin,
  Building2,
  Calendar,
  CheckCircle2,
  Trash2,
  Edit2,
  Check,
  X,
  Search,
} from "lucide-react";
import { AdminProject, INITIAL_PROJECTS } from "@/data/initialData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/context/LanguageContext";

interface SimpleProjectsProps {
  onNewProjectModalOpen?: () => void;
}

export function SimpleProjects({ onNewProjectModalOpen }: SimpleProjectsProps) {
  const { language } = useLanguage();
  const [projects, setProjects] = useState<AdminProject[]>(INITIAL_PROJECTS);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Project Form State
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<AdminProject["category"]>("Gros Œuvre");
  const [newClient, setNewClient] = useState("");
  const [newLocation, setNewLocation] = useState("Fès - Maroc");
  const [newBudget, setNewBudget] = useState("");
  const [newProgress, setNewProgress] = useState(50);

  const filtered = projects.filter((p) => {
    const matchesCat = filterCategory === "all" || p.category === filterCategory;
    const matchesSearch =
      search === "" ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.client.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newProj: AdminProject = {
      id: `proj-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      client: newClient.trim() || "Client Privé",
      location: newLocation.trim() || "Fès",
      budget: newBudget.trim() ? `${newBudget.trim()} MAD` : "Non spécifié",
      status: newProgress >= 100 ? "done" : "ongoing",
      progress: Number(newProgress),
      date: "2026",
    };

    setProjects([newProj, ...projects]);
    setIsModalOpen(false);
    // Reset form
    setNewTitle("");
    setNewClient("");
    setNewBudget("");
    setNewProgress(50);
  };

  const handleDelete = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  const handleToggleStatus = (id: string) => {
    setProjects(
      projects.map((p) => {
        if (p.id === id) {
          const nextStatus = p.status === "done" ? "ongoing" : "done";
          return {
            ...p,
            status: nextStatus,
            progress: nextStatus === "done" ? 100 : Math.min(p.progress, 90),
          };
        }
        return p;
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-400 text-xs font-semibold mb-1.5">
            <HardHat className="h-3.5 w-3.5" />
            <span>{projects.length} Chantiers Référencés</span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Chantiers & Projets Slassi Travaux
          </h1>
          <p className="text-xs text-slate-400">
            Gérez simplement la liste des chantiers (Terrassement, VRD, Bâtiment) affichés sur le site internet.
          </p>
        </div>

        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Nouveau Chantier</span>
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/60 p-1 rounded-lg border border-slate-800">
          {[
            { id: "all", label: "Tous les projets" },
            { id: "Gros Œuvre", label: "Gros Œuvre" },
            { id: "VRD & Assainissement", label: "VRD" },
            { id: "Terrassement", label: "Terrassement" },
            { id: "Voirie", label: "Voirie" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                filterCategory === cat.id
                  ? "bg-sky-600 text-white shadow-xs"
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
            placeholder="Rechercher un chantier..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-8 pl-9 pr-3 text-xs bg-slate-900/80 border border-slate-700 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((proj) => (
          <div
            key={proj.id}
            className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-all space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <Badge
                  variant={
                    proj.category === "Gros Œuvre"
                      ? "amber"
                      : proj.category === "Terrassement"
                      ? "default"
                      : "secondary"
                  }
                  className="text-[11px] font-semibold"
                >
                  {proj.category}
                </Badge>

                <button
                  onClick={() => handleToggleStatus(proj.id)}
                  title="Cliquer pour basculer le statut"
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border cursor-pointer transition-colors ${
                    proj.status === "done"
                      ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
                      : "bg-amber-500/15 border-amber-500/30 text-amber-400"
                  }`}
                >
                  {proj.status === "done" ? "✓ Réceptionné" : "⏳ En cours"}
                </button>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-100">{proj.title}</h3>
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mt-1">
                  <span className="flex items-center gap-1 text-slate-300">
                    <MapPin className="h-3 w-3 text-amber-400" />
                    {proj.location}
                  </span>
                  <span>•</span>
                  <span>Client : {proj.client}</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Progression des travaux</span>
                  <span className="font-mono font-bold text-slate-200">
                    {proj.progress}%
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      proj.progress >= 100
                        ? "bg-emerald-500"
                        : "bg-gradient-to-r from-sky-500 to-amber-500"
                    }`}
                    style={{ width: `${proj.progress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="font-mono font-bold text-amber-400">
                {proj.budget}
              </span>

              <div className="flex items-center gap-1.5">
                <Button
                  size="xs"
                  variant="outline"
                  onClick={() => handleToggleStatus(proj.id)}
                  className="text-[11px] text-slate-300 hover:text-white"
                >
                  {proj.status === "done" ? "Marquer en cours" : "Marquer terminé"}
                </Button>
                <button
                  onClick={() => handleDelete(proj.id)}
                  title="Supprimer ce chantier"
                  className="p-1 rounded text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="p-8 text-center text-xs text-slate-400 border border-dashed border-slate-800 rounded-xl">
          Aucun chantier ne correspond à votre recherche.
        </div>
      )}

      {/* Add Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <HardHat className="h-4 w-4 text-sky-400" />
                <span>Ajouter un Nouveau Chantier BTP</span>
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleAddProject} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Nom du Chantier *
                </label>
                <Input
                  required
                  placeholder="ex: Résidence Al Jawahir R+7"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Catégorie
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) =>
                      setNewCategory(e.target.value as AdminProject["category"])
                    }
                    className="w-full h-8 px-2 rounded-md bg-slate-800 border border-slate-700 text-slate-200 text-xs focus:outline-none"
                  >
                    <option value="Gros Œuvre">Gros Œuvre</option>
                    <option value="VRD & Assainissement">VRD & Assainissement</option>
                    <option value="Terrassement">Terrassement</option>
                    <option value="Voirie">Voirie</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Budget Estimé
                  </label>
                  <Input
                    placeholder="ex: 15 000 000"
                    value={newBudget}
                    onChange={(e) => setNewBudget(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Client / Promoteur
                </label>
                <Input
                  placeholder="ex: Groupe Immobilier Saïss"
                  value={newClient}
                  onChange={(e) => setNewClient(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Lieu (Ville / Quartier)
                </label>
                <Input
                  placeholder="ex: Fès - Ville Nouvelle"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1 flex items-center justify-between">
                  <span>Avancement des Travaux</span>
                  <span className="font-mono text-amber-400 font-bold">{newProgress}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={newProgress}
                  onChange={(e) => setNewProgress(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
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
                  className="bg-sky-600 hover:bg-sky-500 text-white font-bold"
                >
                  Enregistrer le Chantier
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
