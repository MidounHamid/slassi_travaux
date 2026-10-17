import { Project } from '../types';

export const projectsList: Project[] = [
  {
    id: "residence-al-jawahir-fes",
    title: {
      fr: "Résidence de Haut Standing Al Jawahir",
      ar: "إقامة الجواهر السكنية الفاخرة",
      en: "Al Jawahir Luxury Residential Complex"
    },
    category: "building",
    categoryLabel: {
      fr: "Bâtiment & Gros Œuvre",
      ar: "البناء والأشغال الكبرى",
      en: "Building & Structural"
    },
    location: {
      fr: "Fès - Ville Nouvelle",
      ar: "فاس - المدينة الجديدة",
      en: "Fez - Ville Nouvelle"
    },
    client: {
      fr: "Groupe Immobilier Saïss",
      ar: "مجموعة سايس العقارية",
      en: "Saïss Real Estate Group"
    },
    year: "2024 - 2025",
    area: "14 500 m² couverts",
    status: "done",
    image: "/images/project-residential.jpg",
    budget: "42 000 000 MAD",
    description: {
      fr: "Construction tous corps d'état d'un complexe résidentiel et commercial R+7 avec deux sous-sols de parking. Gros œuvre en béton armé haute résistance conforme au RPS 2011, double vitrage thermique et finitions de prestige.",
      ar: "تشييد شامل لمركب سكني وتجاري مكون من 7 طوابق مع طابقين تحت أرضيين لمواقف السيارات. هيكل خرساني عالي الصلوبة مطابق لمعايير RPS 2011 مع تشطيبات فاخرة.",
      en: "Turnkey construction of a 7-story residential & commercial complex with 2 basement parking levels. High-strength reinforced concrete frame compliant with RPS 2011 seismic codes and premium architectural finishings."
    },
    highlights: [
      { fr: "Bétonnage de 6 800 m³", ar: "صب 6,800 متر مكعب خرسانة", en: "6,800 m³ Concrete Poured" },
      { fr: "Fondations sur 48 pieux", ar: "أساسات على 48 خازوقاً", en: "48 Drilled Shaft Piles" },
      { fr: "Livraison avec 2 mois d'avance", ar: "تسليم مبكر بشهرين", en: "Delivered 2 Months Ahead" }
    ]
  },
  {
    id: "amenagement-boulevard-fes-saiss",
    title: {
      fr: "Mise à Niveau VRD & Élargissement Boulevard Saïss",
      ar: "تهيئة الشبكات وتوسعة شارع سايس الرئيسي",
      en: "Saïss Boulevard Urban Utilities & Road Expansion"
    },
    category: "vrd",
    categoryLabel: {
      fr: "VRD & Travaux Publics",
      ar: "الطرق والشبكات التحتية (VRD)",
      en: "Roads & Utilities (VRD)"
    },
    location: {
      fr: "Fès - Axe Sud",
      ar: "فاس - المحور الجنوبي",
      en: "Fez - South Corridor"
    },
    client: {
      fr: "Commune Urbaine de Fès",
      ar: "الجماعة الحضرية لفاس",
      en: "Municipality of Fez"
    },
    year: "2024",
    area: "8.5 km de voirie urbaine",
    status: "done",
    image: "/images/project-vrd.jpg",
    budget: "28 500 000 MAD",
    description: {
      fr: "Travaux d'assainissement lourd pluvial (collecteurs diam. 1200 mm), terrassement de voirie, pose de bordures T2/CS2, revêtement en enrobé bitumineux à chaud épaisseur 7cm, et réseau d'éclairage public LED basse consommation.",
      ar: "أشغال التطهير السائل لمياه الأمطار (قنوات بقطر 1200 ملم)، تسوية الطرق، وضع الأرصفة والتكسية بالأسفلت الساخن بسماكة 7 سم مع إنارة عمومية موفرة للطاقة.",
      en: "Major stormwater sewer upgrade (1200mm collectors), road grading, curbs installation, 7cm hot-mix asphalt paving, and energy-efficient LED street lighting network."
    },
    highlights: [
      { fr: "45 000 m² d'enrobé bitumineux", ar: "45,000 م² أسفلت ساخن", en: "45,000 m² Hot Asphalt" },
      { fr: "8 200 ml de canalisations", ar: "8,200 متر طولي قنوات", en: "8,200 Linear Meters Pipes" },
      { fr: "100% sans interruption de trafic", ar: "دون تعطيل حركة السير", en: "Zero Traffic Disruptions" }
    ]
  },
  {
    id: "ouvrage-hydraulique-reservoir-meknes",
    title: {
      fr: "Réservoir d'Eau Semi-Enterré 10 000 m³ & Station",
      ar: "خزان مياه نصف مطمور سعة 10,000 م³ ومحطة ضخ",
      en: "10,000 m³ Semi-Buried Water Reservoir & Pumping Plant"
    },
    category: "civil",
    categoryLabel: {
      fr: "Génie Civil & Ouvrages",
      ar: "الهندسة المدنية والمنشآت",
      en: "Civil Engineering"
    },
    location: {
      fr: "Région Meknès - Saïss",
      ar: "ناحية مكناس - سايس",
      en: "Meknes - Saïss Region"
    },
    client: {
      fr: "Régie Autonome de Distribution d'Eau & Électricité",
      ar: "الوكالة المستقلة لتوزيع الماء والكهرباء",
      en: "Water & Electricity Distribution Agency"
    },
    year: "2023 - 2024",
    area: "Réservoir 10 000 m³ + Radier étanche",
    status: "done",
    image: "/images/project-civil.jpg",
    budget: "36 000 000 MAD",
    description: {
      fr: "Ouvrage hydraulique majeur en béton armé étanche avec traitement hydrofuge de masse. Radier général de 1.20m d'épaisseur, voiles périphériques de 8m de hauteur et couverture en dalles précontraintes supportant le remblai paysager.",
      ar: "منشأة مائية كبرى بالخرسانة المسلحة العازلة للماء. أساس رافت بسماكة 1.20م، جدران محيطية بارتفاع 8 أمتار وأسقف سابقة الإجهاد تدعم الردم البيئي.",
      en: "Heavy hydraulic civil works in watertight reinforced concrete with integral crystallization waterproofing. 1.20m thick raft foundation, 8m high perimeter walls, and pre-stressed roof slab."
    },
    highlights: [
      { fr: "Étanchéité garantie 20 ans", ar: "عزل مائي مضمون 20 سنة", en: "20-Year Watertight Guarantee" },
      { fr: "Béton BAP C35/45 vibré", ar: "خرسانة ذاتية الانضغاط C35/45", en: "Self-Compacting C35/45 Concrete" },
      { fr: "Essais de mise en eau concluants", ar: "اختبارات ملء ناجحة 100%", en: "Hydrostatic Tests 100% Passed" }
    ]
  },
  {
    id: "rehabilitation-siege-direction-fes",
    title: {
      fr: "Rénovation & Aménagement de Siège Administratif",
      ar: "تجديد وتهيئة المقر الإداري الجهوي",
      en: "Regional Administrative Headquarters Refurbishment"
    },
    category: "renovation",
    categoryLabel: {
      fr: "Rénovation & Aménagement",
      ar: "التهيئة والتجديد المعماري",
      en: "Fit-Out & Renovation"
    },
    location: {
      fr: "Avenue Allal Ben Abdallah, Fès",
      ar: "شارع علال بن عبد الله، فاس",
      en: "Allal Ben Abdallah Ave, Fez"
    },
    client: {
      fr: "Institution Bancaire & Financière",
      ar: "مؤسسة بنكية ومالية",
      en: "Banking & Financial Group"
    },
    year: "2024",
    area: "3 800 m² sur 4 niveaux",
    status: "done",
    image: "/images/project-renovation.jpg",
    budget: "18 200 000 MAD",
    description: {
      fr: "Réhabilitation architecturale complète : renforcement des structures existantes par fibres de carbone, remplacement total des façades en mur-rideau vitré thermique, marbre Royal de Fès poli miroir, et aménagements bois de cèdre sculpté.",
      ar: "إعادة تأهيل معماري شامل: تدعيم الهياكل القائمة بألياف الكربون، واجهات زجاجية عازلة، أرضيات رخام رويال فاس وخشب الأرز الأصيل المنحوت.",
      en: "Complete architectural rehabilitation: carbon-fiber structural strengthening, high-efficiency thermal curtain wall facade, polished Royal Fez marble flooring, and bespoke carved cedar interior joinery."
    },
    highlights: [
      { fr: "Finitions d'artisanat marocain & moderne", ar: "دمج الأصالة المغربية مع الحداثة", en: "Authentic Craft & Modern Style" },
      { fr: "Isolation thermique A+", ar: "عزل حراري عالي الكفاءة", en: "A+ Thermal Performance" },
      { fr: "Travaux en site occupé sécurisé", ar: "أشغال آمنة في مبنى مشتغل", en: "Safe Works in Occupied Facility" }
    ]
  },
  {
    id: "parc-logistique-zone-ain-chkef",
    title: {
      fr: "Plateforme Logistique & Hangars Métalliques",
      ar: "المنصة اللوجستية والمستودعات الصناعية",
      en: "Ain Chkef Industrial Logistics Park"
    },
    category: "building",
    categoryLabel: {
      fr: "Bâtiment & Gros Œuvre",
      ar: "البناء والأشغال الكبرى",
      en: "Building & Structural"
    },
    location: {
      fr: "Zone Industrielle Aïn Chkef, Fès",
      ar: "المنطقة الصناعية عين الشقف، فاس",
      en: "Ain Chkef Industrial Zone, Fez"
    },
    client: {
      fr: "Consortium Agro-Industriel Saïss",
      ar: "المجمع الزراعي الصناعي سايس",
      en: "Saïss Agro-Industrial Consortium"
    },
    year: "2025 - 2026",
    area: "22 000 m² de plateforme",
    status: "ongoing",
    image: "/images/hero.jpg",
    budget: "55 000 000 MAD",
    description: {
      fr: "Terrassement en grande masse (120 000 m³), radiers industriels quartzés anti-poussière supportant 8T/m², charpentes mixtes béton-métal, quais de déchargement niveleurs et voirie lourde pour semi-remorques.",
      ar: "أشغال حفر كبرى (120,000 م³)، أرضيات صناعية معالجة بمادة الكوارتز تتحمل 8 أطنان/م²، هياكل هجينة بين الخرسانة والفولاذ، وأرصفة تحميل لوجستية.",
      en: "Bulk mass excavation (120,000 m³), quartz-hardened heavy industrial slabs supporting 8T/m², hybrid precast concrete and steel framing, and heavy-duty arterial truck roads."
    },
    highlights: [
      { fr: "120 000 m³ de terrassement", ar: "120,000 م³ حفر وردم", en: "120,000 m³ Bulk Earthworks" },
      { fr: "Dalles quartz haute résistance", ar: "أرضيات كوارتز فائقة التحمل", en: "High-Load Quartz Slabs" },
      { fr: "En phase de montage final", ar: "في مرحلة التركيب النهائي", en: "In Final Assembly Phase" }
    ]
  }
];
