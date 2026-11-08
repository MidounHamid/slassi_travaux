"use client";

import React, { useEffect, useState } from "react";
import {
  HardHat,
  Plus,
  MapPin,
  Trash2,
  X,
  Search,
  RefreshCw,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/context/LanguageContext";
import { api, ApiProject } from "@/lib/api";
import { INITIAL_PROJECTS } from "@/data/initialData";

interface SimpleProjectsProps {
  onNewProjectModalOpen?: () => void;
}

export function SimpleProjects({ onNewProjectModalOpen }: SimpleProjectsProps) {
  const { language } = useLanguage();
  const [projects, setProjects] = useState<ApiProject[]>(INITIAL_PROJECTS);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New Project Form State
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<ApiProject["category"]>("Gros Œuvre");
  const [newClient, setNewClient] = useState("");
  const [newLocation, setNewLocation] = useState("Fès - Maroc");
  const [newBudget, setNewBudget] = useState("");
  const [newProgress, setNewProgress] = useState(50);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await api.getProjects({
        category: filterCategory,
        search: search.trim() || undefined,
      });
      if (data && data.length > 0) {
        setProjects(data);
      }
    } catch (err) {
      console.warn("Failed fetching projects from API, keeping state:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [filterCategory]);

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    setIsSubmitting(true);
    const newProjData: Partial<ApiProject> = {
      title: newTitle.trim(),
      category: newCategory,
      client: newClient.trim() || "Client Privé",
      location: newLocation.trim() || "Fès - Maroc",
      budget: newBudget.trim() ? `${newBudget.trim()} MAD` : "Non spécifié",
      status: newProgress >= 100 ? "done" : "ongoing",
      progress: Number(newProgress),
      date: "2026",
    };

    try {
      const created = await api.createProject(newProjData);
      setProjects([created, ...projects]);
    } catch (err) {
      console.warn("API creation failed, adding locally:", err);
      const localProj: ApiProject = {
        id: `proj-${Date.now()}`,
        title: newProjData.title!,
        category: newProjData.category!,
        client: newProjData.client!,
        location: newProjData.location!,
        budget: newProjData.budget!,
        status: newProjData.status!,
        progress: newProjData.progress!,
        date: "2026",
      };
      setProjects([localProj, ...projects]);
    } finally {
      setIsSubmitting(false);
      setIsModalOpen(false);
      // Reset form
      setNewTitle("");
      setNewClient("");
      setNewBudget("");
      setNewProgress(50);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!confirm(t("proj_delete_confirm"))) return;

    try {
      await api.deleteProject(id);
    } catch (err) {
      console.warn("API delete failed, removing locally:", err);
    }
    setProjects(projects.filter((p) => p.id !== id));
  };

  const handleToggleStatus = async (id: string | number) => {
    const target = projects.find((p) => p.id === id);
    if (!target) return;

    const nextStatus = target.status === "done" ? "ongoing" : "done";
    const nextProgress = nextStatus === "done" ? 100 : Math.min(target.progress, 90);

    // Optimistic UI update
    setProjects(
      projects.map((p) =>
        p.id === id ? { ...p, status: nextStatus, progress: nextProgress } : p
      )
    );

    try {
      await api.updateProject(id, {
        status: nextStatus,
        progress: nextProgress,
      });
    } catch (err) {
      console.warn("API status update failed:", err);
    }
  };

  const filtered = projects.filter((p) => {
    const matchesCat = filterCategory === "all" || p.category === filterCategory;
    const matchesSearch =
      search === "" ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.client.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-400 text-xs font-semibold mb-1.5">
            <HardHat className="h-3.5 w-3.5" />
            <span>{projects.length} {t("proj_badge_suffix")}</span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            {t("proj_title")}
          </h1>
          <p className="text-xs text-slate-400">
            {t("proj_desc")}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button
            size="sm"
            variant="outline"
            onClick={fetchProjects}
            className="text-xs border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800"
          >
            <RefreshCw className={`h-3.5 w-3.5 mr-1 rtl:mr-0 rtl:ml-1 ${loading ? "animate-spin text-sky-400" : ""}`} />
            <span>{t("proj_refresh")}</span>
          </Button>

          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>{t("proj_new")}</span>
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/60 p-1 rounded-lg border border-slate-800">
          {[
            { id: "all", label: t("proj_filter_all") },
            { id: "Gros Œuvre", label: t("proj_filter_building") },
            { id: "VRD & Assainissement", label: t("proj_filter_vrd") },
            { id: "Terrassement", label: t("proj_filter_terr") },
            { id: "Voirie", label: t("proj_filter_voirie") },
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
            placeholder={t("proj_search_ph")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full h-8 text-xs bg-slate-900/80 border border-slate-700 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500 ${language === "ar" ? "pr-9 pl-3 text-right" : "pl-9 pr-3"}`}
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
                    proj.category === "Gros Œuvre" || proj.category === "building"
                      ? "amber"
                      : proj.category === "Terrassement" || proj.category === "civil"
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
                  {proj.status === "done" ? `✓ ${t("proj_status_done")}` : `⏳ ${t("proj_status_ongoing")}`}
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
                  <span>• {proj.client}</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>{t("proj_progress")} (%)</span>
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
                  className="text-[11px] text-slate-300 hover:text-white cursor-pointer"
                >
                  {proj.status === "done" ? t("proj_mark_ongoing") : t("proj_mark_done")}
                </Button>
                <button
                  onClick={() => handleDelete(proj.id)}
                  title="Supprimer ce chantier de la base de données"
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
          {t("proj_search_ph")}
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
                className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleAddProject} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {t("proj_form_title")} *
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
                    {t("proj_form_category")}
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) =>
                      setNewCategory(e.target.value as ApiProject["category"])
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
                    {t("proj_form_budget")}
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
                  {t("proj_form_client")}
                </label>
                <Input
                  placeholder="ex: Groupe Immobilier Saïss"
                  value={newClient}
                  onChange={(e) => setNewClient(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {t("proj_form_location")}
                </label>
                <Input
                  placeholder="ex: Fès - Ville Nouvelle"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1 flex items-center justify-between">
                  <span>{t("proj_form_progress")}</span>
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
                  disabled={isSubmitting}
                  className="bg-sky-600 hover:bg-sky-500 text-white font-bold cursor-pointer"
                >
                  {isSubmitting ? t("proj_submitting") : t("proj_submit")}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
