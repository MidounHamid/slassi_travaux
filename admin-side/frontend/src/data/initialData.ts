import { PageNode, LayoutDefinition } from "../types/pagetree";

export const AVAILABLE_LAYOUTS: LayoutDefinition[] = [
  {
    id: "Special Startpage",
    name: "Special Startpage (Page d'accueil Corporate)",
    description: "Layout d'accueil immersif avec Hero plein écran, barre de statistiques BTP, 3 blocs d'accès rapide et grille interactive.",
    columns: 3,
    previewType: "hero-3col",
    tags: ["Landing", "Owner Pick", "Full Width"],
  },
  {
    id: "Default",
    name: "Default (Standard 2 Colonnes avec Contenu)",
    description: "Gabarit polyvalent avec en-tête standard, corps principal et zone latérale pour widgets ou navigation contextuelle.",
    columns: 2,
    previewType: "standard-sidebar",
    tags: ["Standard", "Content"],
  },
  {
    id: "Catalog & Fleet Grid",
    name: "Catalog & Fleet Grid (Parc Engins & Matériel)",
    description: "Affichage en carrousel et grille multi-colonnes optimisé pour les fiches techniques d'engins de chantier et spécifications.",
    columns: 3,
    previewType: "grid-cards",
    tags: ["Machinery", "Grid"],
  },
  {
    id: "Estimator Calculator",
    name: "Estimator Calculator (Simulateur de Devis)",
    description: "Gabarit interactif avec formulaire multi-étapes, calcul automatique de volume/surface et génération d'estimation instantanée.",
    columns: 1,
    previewType: "calculator",
    tags: ["Form", "Interactive"],
  },
  {
    id: "Showcase Gallery",
    name: "Showcase Gallery (Galerie Chantiers BTP)",
    description: "Galerie immersive avec filtrage par catégorie (VRD, Gros Œuvre, Voirie), modale avant/après et localisation satellite.",
    columns: 3,
    previewType: "gallery",
    tags: ["Projects", "Portfolio"],
  },
  {
    id: "Contact & Location",
    name: "Contact & Location (Bureaux & Contact Direct)",
    description: "Gabarit double panneau avec formulaire direct pour la direction, carte géographique interactive de Fès et liens WhatsApp.",
    columns: 2,
    previewType: "contact-map",
    tags: ["Contact", "Map"],
  },
];

export const INITIAL_PAGES: PageNode[] = [
  {
    id: "page-1",
    title: "Page d'Accueil (Site Principal)",
    slug: "",
    depth: 0,
    iconType: "globe",
    actualLayout: "Special Startpage",
    layoutThisPage: "Special Startpage",
    layoutSubpages: "Default",
    status: "published",
    hasChildren: true,
    expanded: true,
    lastModified: "Aujourd'hui à 10:14",
    author: "Hamid Slassi (PDG)",
    parentId: null,
  },
  {
    id: "page-2",
    title: "Qui Sommes-Nous (À Propos)",
    slug: "about",
    depth: 1,
    iconType: "page",
    actualLayout: "Default",
    layoutThisPage: "Default",
    layoutSubpages: "None (Inherit)",
    status: "published",
    hasChildren: false,
    expanded: false,
    lastModified: "16 Oct 2026",
    author: "Hamid Slassi",
    parentId: "page-1",
  },
  {
    id: "page-3",
    title: "Nos Métiers & Services BTP",
    slug: "services",
    depth: 1,
    iconType: "page",
    actualLayout: "Default",
    layoutThisPage: "Default",
    layoutSubpages: "None (Inherit)",
    status: "published",
    hasChildren: false,
    expanded: false,
    lastModified: "14 Oct 2026",
    author: "Hamid Slassi",
    parentId: "page-1",
  },
  {
    id: "page-4",
    title: "Chantiers & Réalisations",
    slug: "projects",
    depth: 1,
    iconType: "page",
    actualLayout: "Showcase Gallery",
    layoutThisPage: "Showcase Gallery",
    layoutSubpages: "Default",
    status: "published",
    hasChildren: false,
    expanded: false,
    lastModified: "15 Oct 2026",
    author: "Hamid Slassi",
    parentId: "page-1",
  },
  {
    id: "page-5",
    title: "Parc Matériel & Engins",
    slug: "equipment",
    depth: 1,
    iconType: "page",
    actualLayout: "Catalog & Fleet Grid",
    layoutThisPage: "Catalog & Fleet Grid",
    layoutSubpages: "Default",
    status: "published",
    hasChildren: false,
    expanded: false,
    lastModified: "12 Oct 2026",
    author: "Hamid Slassi",
    parentId: "page-1",
  },
  {
    id: "page-6",
    title: "Simulateur de Devis Instantané",
    slug: "estimator",
    depth: 1,
    iconType: "page",
    actualLayout: "Estimator Calculator",
    layoutThisPage: "Estimator Calculator",
    layoutSubpages: "Default",
    status: "published",
    hasChildren: false,
    expanded: false,
    lastModified: "Hier à 18:30",
    author: "Hamid Slassi",
    parentId: "page-1",
  },
  {
    id: "page-7",
    title: "Contact & Siège Social (Fès)",
    slug: "contact",
    depth: 1,
    iconType: "page",
    actualLayout: "Contact & Location",
    layoutThisPage: "Contact & Location",
    layoutSubpages: "None (Inherit)",
    status: "published",
    hasChildren: false,
    expanded: false,
    lastModified: "15 Oct 2026",
    author: "Hamid Slassi",
    parentId: "page-1",
  },
];

export interface AdminProject {
  id: string;
  title: string;
  category: "Gros Œuvre" | "VRD & Assainissement" | "Terrassement" | "Voirie";
  client: string;
  location: string;
  budget: string;
  status: "ongoing" | "done" | "review";
  progress: number;
  date: string;
}

export const INITIAL_PROJECTS: AdminProject[] = [
  {
    id: "proj-1",
    title: "Résidence Al Jawahir (R+7, 2 Sous-sols)",
    category: "Gros Œuvre",
    client: "Groupe Immobilier Saïss",
    location: "Fès - Ville Nouvelle",
    budget: "42 000 000 MAD",
    status: "ongoing",
    progress: 85,
    date: "2025 - 2026",
  },
  {
    id: "proj-2",
    title: "Plateforme Logistique Fès-Sud (35 000 m²)",
    category: "Terrassement",
    client: "Zone Logistique Fès",
    location: "Fès - Axe Sud",
    budget: "18 500 000 MAD",
    status: "ongoing",
    progress: 60,
    date: "2026",
  },
  {
    id: "proj-3",
    title: "Élargissement & VRD Boulevard Saïss",
    category: "VRD & Assainissement",
    client: "Commune Urbaine de Fès",
    location: "Boulevard Saïss, Fès",
    budget: "26 000 000 MAD",
    status: "done",
    progress: 100,
    date: "2024 - 2025",
  },
  {
    id: "proj-4",
    title: "Aménagement Lotissement Al Amal (120 Lots)",
    category: "Voirie",
    client: "Société Al Omrane",
    location: "Route de Sefrou, Fès",
    budget: "14 200 000 MAD",
    status: "ongoing",
    progress: 40,
    date: "2026",
  },
];

export interface AdminMachine {
  id: string;
  code: string;
  name: string;
  category: "Terrassement" | "Nivellement" | "Compactage" | "Transport";
  specs: string;
  status: "available" | "on_site" | "maintenance";
  currentSite?: string;
}

export const INITIAL_MACHINERY: AdminMachine[] = [
  {
    id: "mach-1",
    code: "ENG-01",
    name: "Pelle Chenille CAT 330D",
    category: "Terrassement",
    specs: "30 Tonnes • Godet 1.8 m³",
    status: "on_site",
    currentSite: "Plateforme Logistique Fès-Sud",
  },
  {
    id: "mach-2",
    code: "ENG-02",
    name: "Bulldozer Komatsu D65PX",
    category: "Terrassement",
    specs: "21 Tonnes • Lame Orientable",
    status: "on_site",
    currentSite: "Résidence Al Jawahir",
  },
  {
    id: "mach-3",
    code: "ENG-03",
    name: "Niveleuse CAT 140M",
    category: "Nivellement",
    specs: "19 Tonnes • Guidage Laser",
    status: "available",
    currentSite: "Dépôt Central Fès",
  },
  {
    id: "mach-4",
    code: "ENG-04",
    name: "Compacteur Bomag BW213",
    category: "Compactage",
    specs: "13 Tonnes • Monocylindre Vibrant",
    status: "available",
    currentSite: "Dépôt Central Fès",
  },
  {
    id: "mach-5",
    code: "ENG-05",
    name: "Camion Benne Mercedes Actros 8x4",
    category: "Transport",
    specs: "32 Tonnes • Benne 20 m³",
    status: "on_site",
    currentSite: "Boulevard Saïss",
  },
  {
    id: "mach-6",
    code: "ENG-06",
    name: "Chargeuse sur Pneus CAT 966H",
    category: "Terrassement",
    specs: "24 Tonnes • Godet 3.5 m³",
    status: "maintenance",
    currentSite: "Atelier Technique Fès",
  },
];
