<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Project;
use App\Models\ProjectHighlight;
use App\Models\Machinery;
use App\Models\Quote;
use App\Models\CompanySetting;
use App\Models\SitePage;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Admin User
        User::firstOrCreate(
            ['email' => 'admin@slassi-travaux.ma'],
            [
                'name' => 'Hamid Slassi',
                'password' => Hash::make('admin123'),
            ]
        );

        // 2. Company Profile & Settings
        CompanySetting::updateOrCreate(
            ['id' => 1],
            [
                'company_name' => 'SLASSI DE TRAVAUX DIVERS',
                'short_name' => 'Slassi Travaux',
                'legal_form' => 'SARL AU',
                'capital' => '17 000 000 MAD',
                'capital_formatted' => '17.000.000,00 DH',
                'founding_year' => '2010',
                'experience_years' => '15+',
                'city' => 'Fès',
                'country' => 'Maroc',
                'address_line1' => 'Bureau N°21, 4ème étage, Résidence Bureau Jawahir',
                'address_line2' => 'Avenue Mohamed Slaoui',
                'postal_code' => '30000',
                'full_address_fr' => 'Bureau N°21, 4ème étage, Résidence Bureau Jawahir, Avenue Mohamed Slaoui, Fès, Maroc',
                'full_address_ar' => 'مكتب رقم 21، الطابق الرابع، إقامة مكاتب الجواهر، شارع محمد السلاوي، فاس، المغرب',
                'full_address_en' => 'Suite 21, 4th Floor, Jawahir Office Residence, Mohamed Slaoui Avenue, Fez, Morocco',
                'lat' => 34.0331,
                'lng' => -5.0003,
                'phone' => '+212 5 35 62 14 80',
                'phone_display' => '+212 535 62 14 80',
                'mobile' => '+212 6 61 48 92 10',
                'whatsapp' => '212661489210',
                'email' => 'contact@slassi-travaux.ma',
                'commercial_email' => 'devis@slassi-travaux.ma',
                'recruitment_email' => 'recrutement@slassi-travaux.ma',
                'ice' => '002341982000045',
                'rc' => '58492 (Tribunal de Commerce de Fès)',
                'identifiant_fiscal' => '45892147',
                'patente' => '14209841',
                'cnss' => '9283411',
                'projects_count' => 120,
                'capital_mad' => '17M+ MAD',
                'active_sites' => 14,
                'engineers_staff' => 85,
                'heavy_machines' => 40,
                'zero_accident_score' => '99.8%',
            ]
        );

        // 3. Projects & Project Highlights
        $projectsData = [
            [
                'slug' => 'residence-al-jawahir-fes',
                'title_fr' => 'Résidence de Haut Standing Al Jawahir (R+7)',
                'title_ar' => 'إقامة الجواهر السكنية الفاخرة (R+7)',
                'title_en' => 'Al Jawahir Luxury Residential Complex (R+7)',
                'category' => 'building',
                'category_label_fr' => 'Bâtiment & Gros Œuvre',
                'category_label_ar' => 'البناء والأشغال الكبرى',
                'category_label_en' => 'Building & Structural',
                'location_fr' => 'Fès - Ville Nouvelle',
                'location_ar' => 'فاس - المدينة الجديدة',
                'location_en' => 'Fez - Ville Nouvelle',
                'client_fr' => 'Groupe Immobilier Saïss',
                'client_ar' => 'مجموعة سايس العقارية',
                'client_en' => 'Saïss Real Estate Group',
                'year' => '2024 - 2026',
                'area' => '14 500 m² couverts',
                'budget' => '42 000 000 MAD',
                'progress' => 85,
                'status' => 'ongoing',
                'image' => '/images/project-residential.jpg',
                'description_fr' => 'Construction tous corps d\'état d\'un complexe résidentiel et commercial R+7 avec deux sous-sols de parking. Gros œuvre en béton armé haute résistance conforme au RPS 2011, double vitrage thermique et finitions de prestige.',
                'description_ar' => 'تشييد شامل لمركب سكني وتجاري مكون من 7 طوابق مع طابقين تحت أرضيين لمواقف السيارات. هيكل خرساني عالي الصلوبة مطابق لمعايير RPS 2011 مع تشطيبات فاخرة.',
                'description_en' => 'Turnkey construction of a 7-story residential & commercial complex with 2 basement parking levels. High-strength reinforced concrete frame compliant with RPS 2011 seismic codes and premium architectural finishings.',
                'highlights' => [
                    ['fr' => 'Bétonnage de 6 800 m³', 'ar' => 'صب 6,800 متر مكعب خرسانة', 'en' => '6,800 m³ Concrete Poured'],
                    ['fr' => 'Fondations sur 48 pieux', 'ar' => 'أساسات على 48 خازوقاً', 'en' => '48 Drilled Shaft Piles'],
                    ['fr' => 'Livraison avec 2 mois d\'avance', 'ar' => 'تسليم مبكر بشهرين', 'en' => 'Delivered 2 Months Ahead'],
                ],
            ],
            [
                'slug' => 'amenagement-boulevard-fes-saiss',
                'title_fr' => 'Mise à Niveau VRD & Élargissement Boulevard Saïss',
                'title_ar' => 'تهيئة الشبكات وتوسعة شارع سايس الرئيسي',
                'title_en' => 'Saïss Boulevard Urban Utilities & Road Expansion',
                'category' => 'vrd',
                'category_label_fr' => 'VRD & Assainissement',
                'category_label_ar' => 'الطرق والشبكات التحتية (VRD)',
                'category_label_en' => 'Roads & Utilities (VRD)',
                'location_fr' => 'Boulevard Saïss, Fès',
                'location_ar' => 'فاس - المحور الجنوبي',
                'location_en' => 'Fez - South Corridor',
                'client_fr' => 'Commune Urbaine de Fès',
                'client_ar' => 'الجماعة الحضرية لفاس',
                'client_en' => 'Municipality of Fez',
                'year' => '2024 - 2025',
                'area' => '8.5 km de voirie urbaine',
                'budget' => '26 000 000 MAD',
                'progress' => 100,
                'status' => 'done',
                'image' => '/images/project-vrd.jpg',
                'description_fr' => 'Travaux d\'assainissement lourd pluvial (collecteurs diam. 1200 mm), terrassement de voirie, pose de bordures T2/CS2, revêtement en enrobé bitumineux à chaud épaisseur 7cm, et réseau d\'éclairage public LED basse consommation.',
                'description_ar' => 'أشغال التطهير السائل لمياه الأمطار (قنوات بقطر 1200 ملم)، تسوية الطرق، وضع الأرصفة والتكسية بالأسفلت الساخن بسماكة 7 سم مع إنارة عمومية موفرة للطاقة.',
                'description_en' => 'Major stormwater sewer upgrade (1200mm collectors), road grading, curbs installation, 7cm hot-mix asphalt paving, and energy-efficient LED street lighting network.',
                'highlights' => [
                    ['fr' => '45 000 m² d\'enrobé bitumineux', 'ar' => '45,000 م² أسفلت ساخن', 'en' => '45,000 m² Hot Asphalt'],
                    ['fr' => '8 200 ml de canalisations', 'ar' => '8,200 متر طولي قنوات', 'en' => '8,200 Linear Meters Pipes'],
                    ['fr' => '100% sans interruption de trafic', 'ar' => 'دون تعطيل حركة السير', 'en' => 'Zero Traffic Disruptions'],
                ],
            ],
            [
                'slug' => 'plateforme-logistique-fes-sud',
                'title_fr' => 'Plateforme Logistique Fès-Sud (35 000 m²)',
                'title_ar' => 'المنصة اللوجستية فاس الجنوب (35,000 م²)',
                'title_en' => 'Fez-South Logistics Platform (35,000 m²)',
                'category' => 'civil',
                'category_label_fr' => 'Terrassement & Génie Civil',
                'category_label_ar' => 'الحفر الهندسي والمنشآت',
                'category_label_en' => 'Earthworks & Civil Engineering',
                'location_fr' => 'Fès - Axe Sud',
                'location_ar' => 'فاس - المدخل الجنوبي',
                'location_en' => 'Fez - South Axis',
                'client_fr' => 'Zone Logistique Fès',
                'client_ar' => 'المنطقة اللوجستية فاس',
                'client_en' => 'Fez Logistics Zone',
                'year' => '2026',
                'area' => '35 000 m²',
                'budget' => '18 500 000 MAD',
                'progress' => 60,
                'status' => 'ongoing',
                'image' => '/images/hero.jpg',
                'description_fr' => 'Terrassement en grande masse, décapage et compactage dynamique sur 35 000 m². Réalisation de voiries lourdes pour circulation de poids lourds et raccordement au réseau autoroutier.',
                'description_ar' => 'أشغال الحفر والتسوية على مساحة 35 ألف متر مربع مع إنجاز طرق ثقيلة لتحمل الشاحنات والربط بالطريق السيار.',
                'description_en' => 'Large scale earthmoving, dynamic compaction over 35,000 m², heavy arterial roadway construction for freight trucks, and highway network connections.',
                'highlights' => [
                    ['fr' => '120 000 m³ déblayés', 'ar' => '120,000 م³ حفر وردم', 'en' => '120,000 m³ Excavation'],
                    ['fr' => 'Compaction 98% OPM', 'ar' => 'درجة دمك 98% OPM', 'en' => '98% OPM Compaction'],
                    ['fr' => 'Flotte de 12 engins mobilisée', 'ar' => 'تعبئة 12 آلية ثقيلة', 'en' => '12 Heavy Machines Mobilized'],
                ],
            ],
            [
                'slug' => 'amenagement-lotissement-al-amal',
                'title_fr' => 'Aménagement Lotissement Al Amal (120 Lots)',
                'title_ar' => 'تهيئة تجزئة الأمل (120 بقعة سكنية)',
                'title_en' => 'Al Amal Subdivision Development (120 Lots)',
                'category' => 'vrd',
                'category_label_fr' => 'Voirie & Réseaux',
                'category_label_ar' => 'الطرق والشبكات',
                'category_label_en' => 'Roads & Distribution',
                'location_fr' => 'Route de Sefrou, Fès',
                'location_ar' => 'طريق صفرو، فاس',
                'location_en' => 'Sefrou Road, Fez',
                'client_fr' => 'Société Al Omrane',
                'client_ar' => 'شركة العمران',
                'client_en' => 'Al Omrane Group',
                'year' => '2026',
                'area' => '120 Lots viabilisés',
                'budget' => '14 200 000 MAD',
                'progress' => 40,
                'status' => 'ongoing',
                'image' => '/images/project-civil.jpg',
                'description_fr' => 'Viabilisation complète : réseau d\'eau potable, assainissement séparatif, électrification basse et moyenne tension, éclairage public et trottoirs.',
                'description_ar' => 'تجهيز كامل للشبكات: الماء الصالح للشرب، التطهير السائل، الكهرباء والإنارة العمومية وتبليط الأرصفة.',
                'description_en' => 'Full site servicing: potable water network, separate sanitary/storm drainage, MV/LV power grids, streetlights and pedestrian sidewalks.',
                'highlights' => [
                    ['fr' => '120 lots viabilisés', 'ar' => '120 بقعة مجهزة', 'en' => '120 Serviced Lots'],
                    ['fr' => 'Réseaux souterrains 100%', 'ar' => 'شبكات تحت أرضية 100%', 'en' => '100% Underground Utilities'],
                    ['fr' => 'Respect des normes Al Omrane', 'ar' => 'مطابقة تامة لمعايير العمران', 'en' => 'Compliant with Al Omrane Standards'],
                ],
            ],
            [
                'slug' => 'ouvrage-hydraulique-reservoir-meknes',
                'title_fr' => 'Réservoir d\'Eau Semi-Enterré 10 000 m³ & Station',
                'title_ar' => 'خزان مياه نصف مطمور سعة 10,000 م³ ومحطة ضخ',
                'title_en' => '10,000 m³ Semi-Buried Water Reservoir & Pumping Plant',
                'category' => 'civil',
                'category_label_fr' => 'Génie Civil & Ouvrages',
                'category_label_ar' => 'الهندسة المدنية والمنشآت',
                'category_label_en' => 'Civil Engineering',
                'location_fr' => 'Région Meknès - Saïss',
                'location_ar' => 'ناحية مكناس - سايس',
                'location_en' => 'Meknes - Saïss Region',
                'client_fr' => 'Régie Autonome de Distribution d\'Eau & Électricité',
                'client_ar' => 'الوكالة المستقلة لتوزيع الماء والكهرباء',
                'client_en' => 'Water & Electricity Distribution Agency',
                'year' => '2023 - 2024',
                'area' => 'Réservoir 10 000 m³ + Radier étanche',
                'budget' => '36 000 000 MAD',
                'progress' => 100,
                'status' => 'done',
                'image' => '/images/project-civil.jpg',
                'description_fr' => 'Ouvrage hydraulique majeur en béton armé étanche avec traitement hydrofuge de masse. Radier général de 1.20m d\'épaisseur, voiles périphériques de 8m de hauteur et couverture en dalles précontraintes supportant le remblai paysager.',
                'description_ar' => 'منشأة مائية كبرى بالخرسانة المسلحة العازلة للماء. أساس رافت بسماكة 1.20م، جدران محيطية بارتفاع 8 أمتار وأسقف سابقة الإجهاد تدعم الردم البيئي.',
                'description_en' => 'Heavy hydraulic civil works in watertight reinforced concrete with integral crystallization waterproofing. 1.20m thick raft foundation, 8m high perimeter walls, and pre-stressed roof slab.',
                'highlights' => [
                    ['fr' => 'Étanchéité garantie 20 ans', 'ar' => 'عزل مائي مضمون 20 سنة', 'en' => '20-Year Watertight Guarantee'],
                    ['fr' => 'Béton BAP C35/45 vibré', 'ar' => 'خرسانة ذاتية الانضغاط C35/45', 'en' => 'Self-Compacting C35/45 Concrete'],
                    ['fr' => 'Essais de mise en eau 100% concluants', 'ar' => 'اختبارات ملء ناجحة 100%', 'en' => 'Hydrostatic Tests 100% Passed'],
                ],
            ],
            [
                'slug' => 'rehabilitation-siege-direction-fes',
                'title_fr' => 'Rénovation & Aménagement de Siège Administratif',
                'title_ar' => 'تجديد وتهيئة المقر الإداري الجهوي',
                'title_en' => 'Regional Administrative Headquarters Refurbishment',
                'category' => 'renovation',
                'category_label_fr' => 'Rénovation & Aménagement',
                'category_label_ar' => 'التهيئة والتجديد المعماري',
                'category_label_en' => 'Fit-Out & Renovation',
                'location_fr' => 'Avenue Allal Ben Abdallah, Fès',
                'location_ar' => 'شارع علال بن عبد الله، فاس',
                'location_en' => 'Allal Ben Abdallah Ave, Fez',
                'client_fr' => 'Institution Bancaire & Financière',
                'client_ar' => 'مؤسسة بنكية ومالية',
                'client_en' => 'Banking & Financial Group',
                'year' => '2024',
                'area' => '3 800 m² sur 4 niveaux',
                'budget' => '18 200 000 MAD',
                'progress' => 100,
                'status' => 'done',
                'image' => '/images/project-renovation.jpg',
                'description_fr' => 'Réhabilitation architecturale complète : renforcement des structures existantes par fibres de carbone, remplacement total des façades en mur-rideau vitré thermique, marbre Royal de Fès poli miroir, et aménagements bois de cèdre sculpté.',
                'description_ar' => 'إعادة تأهيل معماري شامل: تدعيم الهياكل القائمة بألياف الكربون، واجهات زجاجية عازلة، أرضيات رخام رويال فاس وخشب الأرز الأصيل المنحوت.',
                'description_en' => 'Complete architectural rehabilitation: carbon-fiber structural strengthening, high-efficiency thermal curtain wall facade, polished Royal Fez marble flooring, and bespoke carved cedar interior joinery.',
                'highlights' => [
                    ['fr' => 'Finitions artisanat marocain & moderne', 'ar' => 'دمج الأصالة المغربية مع الحداثة', 'en' => 'Authentic Craft & Modern Style'],
                    ['fr' => 'Isolation thermique A+', 'ar' => 'عزل حراري عالي الكفاءة', 'en' => 'A+ Thermal Performance'],
                    ['fr' => 'Travaux en site occupé sécurisé', 'ar' => 'أشغال آمنة في مبنى مشتغل', 'en' => 'Safe Works in Occupied Facility'],
                ],
            ],
        ];

        $createdProjects = [];
        foreach ($projectsData as $pData) {
            $highlights = $pData['highlights'] ?? [];
            unset($pData['highlights']);

            $project = Project::updateOrCreate(
                ['slug' => $pData['slug']],
                $pData
            );
            $createdProjects[$pData['slug']] = $project;

            $project->highlights()->delete();
            foreach ($highlights as $idx => $h) {
                ProjectHighlight::create([
                    'project_id' => $project->id,
                    'text_fr' => $h['fr'],
                    'text_ar' => $h['ar'],
                    'text_en' => $h['en'],
                    'order' => $idx,
                ]);
            }
        }

        // 4. Heavy Machinery Fleet (with Foreign Key relation to projects!)
        $platformProject = $createdProjects['plateforme-logistique-fes-sud'] ?? null;
        $jawahirProject = $createdProjects['residence-al-jawahir-fes'] ?? null;
        $boulevardProject = $createdProjects['amenagement-boulevard-fes-saiss'] ?? null;

        $machineryData = [
            [
                'code' => 'ENG-01',
                'name' => 'Pelle Chenille CAT 330D',
                'category' => 'Terrassement',
                'specs' => '30 Tonnes • Godet 1.8 m³',
                'status' => 'on_site',
                'current_site' => 'Plateforme Logistique Fès-Sud',
                'project_id' => $platformProject?->id,
            ],
            [
                'code' => 'ENG-02',
                'name' => 'Bulldozer Komatsu D65PX',
                'category' => 'Terrassement',
                'specs' => '21 Tonnes • Lame Orientable',
                'status' => 'on_site',
                'current_site' => 'Résidence Al Jawahir',
                'project_id' => $jawahirProject?->id,
            ],
            [
                'code' => 'ENG-03',
                'name' => 'Niveleuse CAT 140M',
                'category' => 'Nivellement',
                'specs' => '19 Tonnes • Guidage Laser',
                'status' => 'available',
                'current_site' => 'Dépôt Central Fès',
                'project_id' => null,
            ],
            [
                'code' => 'ENG-04',
                'name' => 'Compacteur Bomag BW213',
                'category' => 'Compactage',
                'specs' => '13 Tonnes • Monocylindre Vibrant',
                'status' => 'available',
                'current_site' => 'Dépôt Central Fès',
                'project_id' => null,
            ],
            [
                'code' => 'ENG-05',
                'name' => 'Camion Benne Mercedes Actros 8x4',
                'category' => 'Transport',
                'specs' => '32 Tonnes • Benne 20 m³',
                'status' => 'on_site',
                'current_site' => 'Boulevard Saïss',
                'project_id' => $boulevardProject?->id,
            ],
            [
                'code' => 'ENG-06',
                'name' => 'Chargeuse sur Pneus CAT 966H',
                'category' => 'Terrassement',
                'specs' => '24 Tonnes • Godet 3.5 m³',
                'status' => 'maintenance',
                'current_site' => 'Atelier Technique Fès',
                'project_id' => null,
            ],
            [
                'code' => 'ENG-07',
                'name' => 'Pelle Pneus Liebherr A920',
                'category' => 'Terrassement',
                'specs' => '20 Tonnes • Flèche à Volée Variable',
                'status' => 'available',
                'current_site' => 'Dépôt Central Fès',
                'project_id' => null,
            ],
            [
                'code' => 'ENG-08',
                'name' => 'Finisseur Asphalte Vogele Super 1800',
                'category' => 'Nivellement',
                'specs' => 'Largeur de pose jusqu\'à 9m',
                'status' => 'available',
                'current_site' => 'Dépôt Central Fès',
                'project_id' => null,
            ],
        ];

        foreach ($machineryData as $mData) {
            Machinery::updateOrCreate(
                ['code' => $mData['code']],
                $mData
            );
        }

        // 5. Inquiries & Quotes
        $quotesData = [
            [
                'reference' => 'DEV-2026-089',
                'client_name' => 'Société Immobilière Saïss',
                'company' => 'Saïss Immobilier',
                'project_type' => 'Terrassement & Plateforme Logistique',
                'project_title' => 'Terrassement & Plateforme Logistique 4 200 m²',
                'location' => 'Zone Industrielle Bensouda, Fès',
                'city' => 'Fès',
                'surface' => 4200,
                'finish_level' => 'Standard',
                'estimated_amount' => '285 000 MAD',
                'budget_range' => '250 000 - 320 000 MAD',
                'phone' => '+212 6 61 12 34 56',
                'whatsapp' => '212661123456',
                'email' => 'direction@saiss-immo.ma',
                'status' => 'pending',
                'message' => 'Projet de plateforme logistique à lancer avant fin d\'année. Besoin d\'un calendrier prévisionnel et étude des sols.',
            ],
            [
                'reference' => 'DEV-2026-088',
                'client_name' => 'Groupe Hôtelier Médina',
                'company' => 'Médina Hospitality Fès',
                'project_type' => 'VRD & Assainissement',
                'project_title' => 'VRD & Assainissement Complexe Touristique',
                'location' => 'Route d\'Immouzzer, Fès',
                'city' => 'Fès',
                'surface' => 6800,
                'finish_level' => 'Haut Standing',
                'estimated_amount' => '540 000 MAD',
                'budget_range' => '500 000 - 600 000 MAD',
                'phone' => '+212 6 62 98 76 54',
                'whatsapp' => '212662987654',
                'email' => 'projets@hotelmedina-fes.com',
                'status' => 'reviewed',
                'message' => 'Raccordement voirie et assainissement autonome pour complexe 5 étoiles en périphérie de Fès.',
            ],
            [
                'reference' => 'DEV-2026-087',
                'client_name' => 'Promoteur Privé M. Berrada',
                'company' => 'Berrada Promotion',
                'project_type' => 'Gros Œuvre & Fondations',
                'project_title' => 'Gros Œuvre & Fondations Immeuble R+5',
                'location' => 'Quartier Champs de Course, Fès',
                'city' => 'Fès',
                'surface' => 2400,
                'finish_level' => 'Gros Œuvre Béton Armé',
                'estimated_amount' => '1 250 000 MAD',
                'budget_range' => '1.2M - 1.4M MAD',
                'phone' => '+212 6 63 45 67 89',
                'whatsapp' => '212663456789',
                'email' => 'contact@berrada-bat.ma',
                'status' => 'contacted',
                'message' => 'Plans d\'architecture et de béton armé validés par le bureau de contrôle. Recherche entreprise avec références solides.',
            ],
            [
                'reference' => 'DEV-2026-086',
                'client_name' => 'Coopérative Agricole Saïss',
                'company' => 'Coopérative Saïss',
                'project_type' => 'Voirie Rurale',
                'project_title' => 'Nivellement et Accès Piste Rurale 2.8 km',
                'location' => 'Ain Cheggag, Région Fès',
                'city' => 'Ain Cheggag',
                'surface' => 14000,
                'finish_level' => 'Tout-venant compacté',
                'estimated_amount' => '195 000 MAD',
                'budget_range' => '180 000 - 220 000 MAD',
                'phone' => '+212 6 64 11 22 33',
                'whatsapp' => '212664112233',
                'email' => 'coop.saiss@gmail.com',
                'status' => 'pending',
                'message' => 'Aménagement d\'une piste pour accès engins agricoles avant la saison des pluies.',
            ],
            [
                'reference' => 'DEV-2026-085',
                'client_name' => 'Particulier M. Alami',
                'company' => null,
                'project_type' => 'Terrassement de Villa',
                'project_title' => 'Terrassement de Villa & Fouilles en Rigoles',
                'location' => 'Route de Sefrou, Fès',
                'city' => 'Fès',
                'surface' => 650,
                'finish_level' => 'Fouilles en masse',
                'estimated_amount' => '78 000 MAD',
                'budget_range' => '70 000 - 90 000 MAD',
                'phone' => '+212 6 65 77 88 99',
                'whatsapp' => '212665778899',
                'email' => 'alami.f@gmail.com',
                'status' => 'contacted',
                'message' => 'Terrain en pente légère, besoin d\'excavation pour sous-sol et piscine.',
            ],
        ];

        foreach ($quotesData as $qData) {
            Quote::updateOrCreate(
                ['reference' => $qData['reference']],
                $qData
            );
        }

        // 6. Site Pages (TYPO3-Style Layouts & CMS Tree)
        $pagesData = [
            [
                'page_key' => 'page-1',
                'title' => "Page d'Accueil (Site Principal)",
                'slug' => '',
                'depth' => 0,
                'icon_type' => 'globe',
                'actual_layout' => 'Special Startpage',
                'layout_this_page' => 'Special Startpage',
                'layout_subpages' => 'Default',
                'status' => 'published',
                'has_children' => true,
                'expanded' => true,
                'last_modified' => 'Aujourd\'hui à 10:14',
                'author' => 'Hamid Slassi (PDG)',
                'parent_page_key' => null,
            ],
            [
                'page_key' => 'page-2',
                'title' => 'Qui Sommes-Nous (À Propos)',
                'slug' => 'about',
                'depth' => 1,
                'icon_type' => 'page',
                'actual_layout' => 'Default',
                'layout_this_page' => 'Default',
                'layout_subpages' => 'None (Inherit)',
                'status' => 'published',
                'has_children' => false,
                'expanded' => false,
                'last_modified' => '16 Oct 2026',
                'author' => 'Hamid Slassi',
                'parent_page_key' => 'page-1',
            ],
            [
                'page_key' => 'page-3',
                'title' => 'Nos Métiers & Services BTP',
                'slug' => 'services',
                'depth' => 1,
                'icon_type' => 'page',
                'actual_layout' => 'Default',
                'layout_this_page' => 'Default',
                'layout_subpages' => 'None (Inherit)',
                'status' => 'published',
                'has_children' => false,
                'expanded' => false,
                'last_modified' => '14 Oct 2026',
                'author' => 'Hamid Slassi',
                'parent_page_key' => 'page-1',
            ],
            [
                'page_key' => 'page-4',
                'title' => 'Chantiers & Réalisations',
                'slug' => 'projects',
                'depth' => 1,
                'icon_type' => 'page',
                'actual_layout' => 'Showcase Gallery',
                'layout_this_page' => 'Showcase Gallery',
                'layout_subpages' => 'Default',
                'status' => 'published',
                'has_children' => false,
                'expanded' => false,
                'last_modified' => '15 Oct 2026',
                'author' => 'Hamid Slassi',
                'parent_page_key' => 'page-1',
            ],
            [
                'page_key' => 'page-5',
                'title' => 'Parc Matériel & Engins',
                'slug' => 'equipment',
                'depth' => 1,
                'icon_type' => 'page',
                'actual_layout' => 'Catalog & Fleet Grid',
                'layout_this_page' => 'Catalog & Fleet Grid',
                'layout_subpages' => 'Default',
                'status' => 'published',
                'has_children' => false,
                'expanded' => false,
                'last_modified' => '12 Oct 2026',
                'author' => 'Hamid Slassi',
                'parent_page_key' => 'page-1',
            ],
            [
                'page_key' => 'page-6',
                'title' => 'Simulateur de Devis Instantané',
                'slug' => 'estimator',
                'depth' => 1,
                'icon_type' => 'page',
                'actual_layout' => 'Estimator Calculator',
                'layout_this_page' => 'Estimator Calculator',
                'layout_subpages' => 'Default',
                'status' => 'published',
                'has_children' => false,
                'expanded' => false,
                'last_modified' => 'Hier à 18:30',
                'author' => 'Hamid Slassi',
                'parent_page_key' => 'page-1',
            ],
            [
                'page_key' => 'page-7',
                'title' => 'Contact & Siège Social (Fès)',
                'slug' => 'contact',
                'depth' => 1,
                'icon_type' => 'page',
                'actual_layout' => 'Contact & Location',
                'layout_this_page' => 'Contact & Location',
                'layout_subpages' => 'None (Inherit)',
                'status' => 'published',
                'has_children' => false,
                'expanded' => false,
                'last_modified' => '15 Oct 2026',
                'author' => 'Hamid Slassi',
                'parent_page_key' => 'page-1',
            ],
        ];

        foreach ($pagesData as $pData) {
            SitePage::updateOrCreate(
                ['page_key' => $pData['page_key']],
                $pData
            );
        }
    }
}
