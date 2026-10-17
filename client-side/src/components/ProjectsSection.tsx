'use client';

import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  ArrowUpRight, 
  Eye
} from 'lucide-react';
import { projectsList } from '../data/projectsData';
import { Project } from '../types';
import { useLanguage } from '../context/LanguageContext';
import ProjectModal from './ProjectModal';

export default function ProjectsSection() {
  const { lang, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filterTabs = [
    { id: 'all', label: t.projects.filterAll },
    { id: 'building', label: t.projects.filterBuilding },
    { id: 'vrd', label: t.projects.filterVrd },
    { id: 'civil', label: t.projects.filterCivil },
    { id: 'renovation', label: t.projects.filterRenovation }
  ];

  const filteredProjects = activeCategory === 'all'
    ? projectsList
    : projectsList.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="py-20 lg:py-28 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/35 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.projects.badge}</span>
          </div>
          <h2 className="font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight mb-4">
            {t.projects.title}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            {t.projects.subtitle}
          </p>
          <div className="w-20 h-1.5 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto mt-4 rounded-full" />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeCategory === tab.id
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-glow-gold scale-105'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white border border-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const title = project.title[lang] || project.title.fr;
            const loc = project.location[lang] || project.location.fr;
            const catLabel = project.categoryLabel[lang] || project.categoryLabel.fr;

            return (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer rounded-2xl bg-slate-800/90 border border-slate-700/80 hover:border-amber-500/60 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between"
              >
                {/* Image & Overlay */}
                <div className="relative h-60 w-full overflow-hidden bg-slate-950">
                  <img
                    src={project.image}
                    alt={title}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <span className="px-2.5 py-1 rounded-md bg-[#0F172A]/90 text-amber-400 text-[11px] font-bold uppercase tracking-wider backdrop-blur-md border border-slate-700">
                      {catLabel}
                    </span>

                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold backdrop-blur-md ${
                      project.status === 'done'
                        ? 'bg-emerald-500/90 text-white'
                        : 'bg-amber-500/90 text-slate-950'
                    }`}>
                      {project.status === 'done' ? t.projects.statusDone : t.projects.statusOngoing}
                    </span>
                  </div>

                  {/* Hover Peek Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-[#0F172A]/40 backdrop-blur-[2px]">
                    <div className="w-12 h-12 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-glow-gold transform scale-75 group-hover:scale-100 transition-transform">
                      <Eye className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 mb-2">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{loc}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-lg text-white group-hover:text-amber-400 transition-colors line-clamp-2 mb-3">
                      {title}
                    </h3>
                  </div>

                  {/* Card Bottom specs */}
                  <div className="pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold text-slate-300">
                      {project.year}
                    </span>

                    <span className="inline-flex items-center gap-1 font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
                      <span>{t.projects.viewDetails}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Detail Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        lang={lang}
        t={t}
      />
    </section>
  );
}
