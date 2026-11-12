<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use App\Models\Permission;
use App\Models\Project;
use App\Models\ProjectHighlight;
use App\Models\Machinery;
use App\Models\Quote;
use App\Models\CompanySetting;
use App\Models\SitePage;
use App\Models\Service;
use App\Models\ServiceScope;
use App\Models\Testimonial;
use App\Models\Commitment;
use App\Models\ProjectImage;
use App\Models\EquipmentCategory;
use App\Models\EquipmentCategoryItem;
use App\Models\EquipmentStat;
use App\Models\EstimatorProjectType;
use App\Models\EstimatorFinish;
use App\Models\EstimatorLocation;
use App\Models\TeamMember;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // ==========================================
        // 1. ROLES & PERMISSIONS SYSTEM
        // ==========================================
        $permissionsList = [
            // Projects Module
            ['name' => 'projects.view', 'label_fr' => 'Consulter les chantiers et projets', 'module' => 'projects'],
            ['name' => 'projects.create', 'label_fr' => 'Ajouter un nouveau projet BTP', 'module' => 'projects'],
            ['name' => 'projects.edit', 'label_fr' => 'Modifier un projet et ses avancements', 'module' => 'projects'],
            ['name' => 'projects.delete', 'label_fr' => 'Supprimer un projet', 'module' => 'projects'],

            // Machinery / Fleet Module
            ['name' => 'machinery.view', 'label_fr' => 'Consulter la flotte d\'engins lourds', 'module' => 'machinery'],
            ['name' => 'machinery.create', 'label_fr' => 'Ajouter une machine au parc', 'module' => 'machinery'],
            ['name' => 'machinery.edit', 'label_fr' => 'Modifier statut chantier & maintenance d\'engin', 'module' => 'machinery'],
            ['name' => 'machinery.delete', 'label_fr' => 'Retirer un engin du parc', 'module' => 'machinery'],

            // Quotes & Estimates Module
            ['name' => 'quotes.view', 'label_fr' => 'Consulter les demandes de devis clients', 'module' => 'quotes'],
            ['name' => 'quotes.edit', 'label_fr' => 'Traiter et actualiser le statut des devis', 'module' => 'quotes'],
            ['name' => 'quotes.delete', 'label_fr' => 'Supprimer un devis ou contact', 'module' => 'quotes'],

            // Site Pages / CMS Module
            ['name' => 'pages.view', 'label_fr' => 'Consulter l\'arborescence du site', 'module' => 'pages'],
            ['name' => 'pages.create', 'label_fr' => 'Créer de nouvelles pages', 'module' => 'pages'],
            ['name' => 'pages.edit', 'label_fr' => 'Modifier la mise en page et les contenus', 'module' => 'pages'],
            ['name' => 'pages.delete', 'label_fr' => 'Supprimer des pages du CMS', 'module' => 'pages'],

            // Company Legal & Contact Settings
            ['name' => 'settings.view', 'label_fr' => 'Consulter les paramètres d\'entreprise', 'module' => 'settings'],
            ['name' => 'settings.edit', 'label_fr' => 'Modifier le capital, RC, ICE et coordonnées', 'module' => 'settings'],

            // Team & User Management
            ['name' => 'users.view', 'label_fr' => 'Consulter les membres de l\'équipe et leurs rôles', 'module' => 'users'],
            ['name' => 'users.manage', 'label_fr' => 'Créer et gérer les accès et rôles utilisateurs', 'module' => 'users'],
        ];

        $createdPermissions = [];
        foreach ($permissionsList as $pData) {
            $createdPermissions[$pData['name']] = Permission::updateOrCreate(
                ['name' => $pData['name']],
                $pData
            );
        }

        // Roles definition
        $rolesData = [
            'super_admin' => [
                'name' => 'super_admin',
                'label_fr' => 'Directeur Général (Super Admin)',
                'label_ar' => 'المدير العام (مسؤول النظام)',
                'description' => 'Accès intégral à l\'ensemble des modules, sécurité et gestion juridique.',
                'permissions' => array_keys($createdPermissions), // All permissions
            ],
            'project_manager' => [
                'name' => 'project_manager',
                'label_fr' => 'Chef de Projet BTP',
                'label_ar' => 'مدير مشاريع البناء',
                'description' => 'Gestion des chantiers, planification des travaux et consultation du parc d\'engins.',
                'permissions' => [
                    'projects.view', 'projects.create', 'projects.edit', 'projects.delete',
                    'machinery.view', 'quotes.view', 'pages.view', 'settings.view',
                ],
            ],
            'fleet_manager' => [
                'name' => 'fleet_manager',
                'label_fr' => 'Responsable Matériel & Parc',
                'label_ar' => 'مسؤول أسطول الآليات والمعدات',
                'description' => 'Gestion de la flotte d\'engins, affectation sur chantiers et suivi de maintenance.',
                'permissions' => [
                    'machinery.view', 'machinery.create', 'machinery.edit', 'machinery.delete',
                    'projects.view', 'settings.view',
                ],
            ],
            'commercial' => [
                'name' => 'commercial',
                'label_fr' => 'Chargé d\'Affaires & Devis',
                'label_ar' => 'المكلف بالشؤون التجارية والتقديرات',
                'description' => 'Réception des demandes de devis, contact des maîtres d\'ouvrage et suivi des dossiers.',
                'permissions' => [
                    'quotes.view', 'quotes.edit', 'quotes.delete',
                    'projects.view', 'settings.view',
                ],
            ],
        ];

        $roles = [];
        foreach ($rolesData as $slug => $rData) {
            $role = Role::updateOrCreate(
                ['name' => $rData['name']],
                [
                    'label_fr' => $rData['label_fr'],
                    'label_ar' => $rData['label_ar'],
                    'description' => $rData['description'],
                    'is_system' => true,
                ]
            );

            // Sync permissions
            $permissionIds = [];
            foreach ($rData['permissions'] as $pName) {
                if (isset($createdPermissions[$pName])) {
                    $permissionIds[] = $createdPermissions[$pName]->id;
                }
            }
            $role->permissions()->sync($permissionIds);
            $roles[$slug] = $role;
        }

        // ==========================================
        // 2. USERS & ACCOUNTS SEEDING
        // ==========================================
        $usersToSeed = [
            [
                'email' => 'admin@slassi-travaux.ma',
                'name' => 'Hamid Slassi',
                'password' => 'admin123',
                'role_id' => $roles['super_admin']->id,
                'role' => 'super_admin',
                'job_title' => 'Directeur Général',
            ],
            [
                'email' => 'chef.projet@slassi-travaux.ma',
                'name' => 'Youssef El Amrani',
                'password' => 'projet123',
                'role_id' => $roles['project_manager']->id,
                'role' => 'project_manager',
                'job_title' => 'Conducteur Principal de Travaux',
            ],
            [
                'email' => 'parc@slassi-travaux.ma',
                'name' => 'Tariq Berrada',
                'password' => 'parc123',
                'role_id' => $roles['fleet_manager']->id,
                'role' => 'fleet_manager',
                'job_title' => 'Chef de Parc & Maintenance',
            ],
            [
                'email' => 'commercial@slassi-travaux.ma',
                'name' => 'Fatima-Zahra Mansouri',
                'password' => 'commercial123',
                'role_id' => $roles['commercial']->id,
                'role' => 'commercial',
                'job_title' => 'Chargée d\'Affaires BTP',
            ],
        ];

        foreach ($usersToSeed as $uData) {
            User::updateOrCreate(
                ['email' => $uData['email']],
                [
                    'name' => $uData['name'],
                    'password' => Hash::make($uData['password']),
                    'role_id' => $uData['role_id'],
                    'role' => $uData['role'],
                    'job_title' => $uData['job_title'],
                    'status' => 'active',
                ]
            );
        }

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

        // ==========================================
        // 7. BTP SERVICES & TECHNICAL SCOPES
        // ==========================================
        $servicesData = [
            [
                'slug' => 'gros-oeuvre',
                'title_fr' => 'Bâtiment & Gros Œuvre',
                'title_ar' => 'البناء والأشغال الكبرى',
                'title_en' => 'Building & Structural Works',
                'short_desc_fr' => 'Fondations profondes, radiers, structures en béton armé conformes au RPS 2011 et ouvrages industriels.',
                'short_desc_ar' => 'أساسات عميقة، خرسانة مسلحة مطابقة لمعايير الزلازل RPS 2011 وبناء المجمعات السكنية والصناعية.',
                'short_desc_en' => 'Deep foundations, reinforced concrete structures compliant with RPS 2011 and industrial complexes.',
                'icon' => 'Building2',
                'image' => '/images/project-residential.jpg',
                'advantage_title_fr' => 'Contrôles Systématiques',
                'advantage_title_ar' => 'مراقبة تقنية صارمة',
                'advantage_title_en' => 'Systematic Lab Testing',
                'advantage_desc_fr' => 'Béton BAP C30/37 vibré testé à 7 et 28 jours par laboratoires agréés.',
                'advantage_desc_ar' => 'اختبارات ضغط الخرسانة في المختبر العمومي للتجارب والدراسات LPEE.',
                'advantage_desc_en' => 'Compressive strength tested at 7 & 28 days by accredited national laboratories.',
                'order' => 1,
                'scopes' => [
                    ['fr' => 'Terrassement et fouilles en excavation', 'ar' => 'أشغال الحفر الهندسي وتجهيز الأرضيات', 'en' => 'Site excavation and earthworks'],
                    ['fr' => 'Fondations sur pieux et radier général étanche', 'ar' => 'أساسات خازوقية وأساسات رافت عازلة', 'en' => 'Piled foundations and waterproof raft slabs'],
                    ['fr' => 'Structures poteaux-poutres en béton armé haute résistance', 'ar' => 'أعمدة وجسور خرسانية مسلحة فائقة المقاومة', 'en' => 'Reinforced high-strength concrete frames'],
                    ['fr' => 'Planchers précontraints et dalles alvéolaires', 'ar' => 'أسقف سابقة الإجهاد وبلاطات مفرغة', 'en' => 'Pre-stressed and hollow-core slabs'],
                    ['fr' => 'Maçonnerie et étanchéité multicouche toiture-terrasse', 'ar' => 'البناء والعزل المائي المزدوج للأسطح', 'en' => 'Masonry and multilayer roof waterproofing'],
                ],
            ],
            [
                'slug' => 'vrd-voirie',
                'title_fr' => 'VRD & Travaux Publics',
                'title_ar' => 'الطرق والشبكات التحتية (VRD)',
                'title_en' => 'Roads & Utilities (VRD)',
                'short_desc_fr' => 'Assainissement eaux usées et pluviales, voirie lourde, terrassement et viabilisation de lotissements.',
                'short_desc_ar' => 'شبكات التطهير السائل ومياه الأمطار، تعبيد الطرق وتجهيز التجزئات السكنية والصناعية.',
                'short_desc_en' => 'Stormwater & wastewater sewer networks, road paving, grading and full subdivision servicing.',
                'icon' => 'Truck',
                'image' => '/images/project-vrd.jpg',
                'advantage_title_fr' => 'Flotte d\'Engins Propriétaire',
                'advantage_title_ar' => 'أسطول آليات مملوك بالكامل',
                'advantage_title_en' => 'Proprietary Machine Fleet',
                'advantage_desc_fr' => 'Intervention rapide sans sous-traitance avec nos pelles, niveleuses et finisseurs.',
                'advantage_desc_ar' => 'تدخل سريع بدون وسطاء بفضل أسطولنا من الحفارات وكاسحات الأسفلت.',
                'advantage_desc_en' => 'Immediate deployment without subcontractors using our heavy fleet.',
                'order' => 2,
                'scopes' => [
                    ['fr' => 'Canalisations d\'assainissement grand diamètre (diam. 600 à 1500 mm)', 'ar' => 'قنوات تطهير بقطر كبير (600 إلى 1500 ملم)', 'en' => 'Large diameter storm sewer pipes'],
                    ['fr' => 'Pose de bordures de trottoir T2/CS2 et caniveaux béton', 'ar' => 'وضع أرصفة الطرق وقنوات تصريف المياه الخرسانية', 'en' => 'Concrete curbs and rainwater gutters'],
                    ['fr' => 'Revêtement en enrobé bitumineux à chaud épaisseur 6 à 8 cm', 'ar' => 'تعبيد الطرق بالأسفلت الساخن بسماكة 6 إلى 8 سم', 'en' => 'Hot-mix asphalt roadway paving (6-8cm)'],
                    ['fr' => 'Éclairage public LED et réseaux souterrains basse/moyenne tension', 'ar' => 'إنارة عمومية موفرة وشبكات كهربائية تحت أرضية', 'en' => 'Underground electrical and LED street lighting'],
                ],
            ],
            [
                'slug' => 'genie-civil',
                'title_fr' => 'Génie Civil & Ouvrages d\'Art',
                'title_ar' => 'الهندسة المدنية والمنشآت',
                'title_en' => 'Civil Engineering & Heavy Works',
                'short_desc_fr' => 'Réservoirs hydrauliques, dalots, murs de soutènement et plateformes logistiques industrielles.',
                'short_desc_ar' => 'خزانات المياه، المنشآت الهيدروليكية، الجدران الاستنادية والمنصات اللوجستية.',
                'short_desc_en' => 'Hydraulic reservoirs, box culverts, retaining walls and large logistics platforms.',
                'icon' => 'Construction',
                'image' => '/images/project-civil.jpg',
                'advantage_title_fr' => 'Étanchéité Garantie 20 Ans',
                'advantage_title_ar' => 'عزل مائي مضمون 20 سنة',
                'advantage_title_en' => '20-Year Watertight Guarantee',
                'advantage_desc_fr' => 'Adjuvants hydrofuges de masse et traitement des reprises de bétonnage.',
                'advantage_desc_ar' => 'استعمال مواد كيميائية عازلة ومعالجة مفاصل التمدد بأحدث التقنيات.',
                'advantage_desc_en' => 'Integral mass waterproofing and specialized construction joint sealing.',
                'order' => 3,
                'scopes' => [
                    ['fr' => 'Réservoirs d\'eau potable semi-enterrés jusqu\'à 20 000 m³', 'ar' => 'خزانات مياه شرب نصف مطمورة سعة تصل إلى 20 ألف م³', 'en' => 'Semi-buried potable water reservoirs up to 20,000 m³'],
                    ['fr' => 'Dalots en béton armé pour franchissement de cours d\'eau et oueds', 'ar' => 'منشآت تصريف خرسانية لعبور الأودية والمسالك المائية', 'en' => 'Reinforced concrete culverts for river crossings'],
                    ['fr' => 'Murs de soutènement en béton banché et parois clouées', 'ar' => 'جدران استنادية مسلحة لحماية المنحدرات الطرقية', 'en' => 'Retaining walls and soil nail stabilization'],
                    ['fr' => 'Stations de relevage, pompage et dégrillage', 'ar' => 'محطات الضخ والرفع الهيدروليكية', 'en' => 'Pumping stations and water distribution plants'],
                ],
            ],
            [
                'slug' => 'renovation',
                'title_fr' => 'Rénovation & Aménagement Tout Corps d\'État',
                'title_ar' => 'التهيئة والتجديد المعماري',
                'title_en' => 'Fit-Out & Architectural Refurbishment',
                'short_desc_fr' => 'Réhabilitation complète, renforcement structurel carbone, façades rideaux et aménagements de prestige.',
                'short_desc_ar' => 'تجديد شامل للبنايات، تدعيم الهياكل بالكربون، واجهات زجاجية وتشطيبات راقية.',
                'short_desc_en' => 'Complete building refurbishment, carbon fiber strengthening, curtain walls and luxury interior fit-out.',
                'icon' => 'PaintBucket',
                'image' => '/images/project-renovation.jpg',
                'advantage_title_fr' => 'Finitions Nobles & Artisanat',
                'advantage_title_ar' => 'أصالة مغربية وتشطيبات حديثة',
                'advantage_title_en' => 'Bespoke Craftsmanship',
                'advantage_desc_fr' => 'Pose de marbre marocain poli miroir, boiseries de cèdre et aluminium thermolaqué.',
                'advantage_desc_ar' => 'أرضيات رخام رويال مصقول، خشب الأرز وألمنيوم عازل للصوت والحرارة.',
                'advantage_desc_en' => 'Polished Royal Moroccan marble, cedar woodwork, and acoustic aluminum.',
                'order' => 4,
                'scopes' => [
                    ['fr' => 'Renforcement structurel par plats et tissus de fibres de carbone', 'ar' => 'تدعيم الهياكل القائمة بألياف الكربون وراتنج الإيبوكسي', 'en' => 'Carbon fiber fabric & plate structural strengthening'],
                    ['fr' => 'Façades vitrées isolantes, mur-rideau et bardage ventilé', 'ar' => 'واجهات زجاجية عازلة للحرارة وتكسية حديثة', 'en' => 'Insulated curtain wall and ventilated facade systems'],
                    ['fr' => 'Revêtements marbre, zellige traditionnel et parquets nobles', 'ar' => 'أرضيات رخامية، زليج تقليدي وأرضيات خشبية راقية', 'en' => 'Marble flooring, handcrafted zellige tile and hardwoods'],
                    ['fr' => 'Réseaux électriques ondulés, sécurité incendie et VMC double flux', 'ar' => 'شبكات كهربائية محمية، إنذار حريق وتهوية مركزية', 'en' => 'Clean power electrical grids, fire suppression and HVAC'],
                ],
            ],
            [
                'slug' => 'terrassement',
                'title_fr' => 'Terrassement en Grande Masse',
                'title_ar' => 'أشغال الحفر الكبرى والتسوية',
                'title_en' => 'Bulk Earthworks & Grading',
                'short_desc_fr' => 'Excavation, déblai/remblai, nivellement laser et compactage dynamique pour plateformes industrielles.',
                'short_desc_ar' => 'حفر ونقل الأتربة، تسوية بنظام الليزر ودمك ديناميكي للمنصات اللوجستية.',
                'short_desc_en' => 'Excavation, cut & fill, laser grading and dynamic compaction for large logistics sites.',
                'icon' => 'Layers',
                'image' => '/images/hero.jpg',
                'advantage_title_fr' => 'Rendement de 5 000 m³/jour',
                'advantage_title_ar' => 'إنتاجية تزيد عن 5,000 م³ يومياً',
                'advantage_title_en' => '5,000 m³/day Excavation Rate',
                'advantage_desc_fr' => 'Mobilisation immédiate de pelles lourdes 30T et camions bennes 8x4.',
                'advantage_desc_ar' => 'تعبئة فورية للحفارات الثقيلة وشاحنات النقل الضخمة.',
                'advantage_desc_en' => 'Immediate deployment of 30T hydraulic excavators and 8x4 dumper trucks.',
                'order' => 5,
                'scopes' => [
                    ['fr' => 'Décapage de terre végétale et mise en cordon', 'ar' => 'إزالة التربة السطحية وتخزينها لاستصلاح المساحات', 'en' => 'Topsoil stripping and stockpiling'],
                    ['fr' => 'Fouilles en grande profondeur et déroctage au brise-roche', 'ar' => 'حفر عميق وتكسير الصخور بالصدم الهيدروليكي', 'en' => 'Deep trenching and hydraulic rock breaking'],
                    ['fr' => 'Nivellement guidé par laser et GPS centimétrique', 'ar' => 'تسوية دقيقة بنظام التوجيه بالليزر ونظام GPS', 'en' => 'Laser-guided and GPS-controlled precision grading'],
                    ['fr' => 'Compactage contrôlé au pénétromètre dynamique et essais de plaque', 'ar' => 'دمك خاضع للمراقبة عبر تجارب الكثافة والتحمل', 'en' => 'Dynamic compaction monitored by plate load tests'],
                ],
            ],
            [
                'slug' => 'pilotage-opc',
                'title_fr' => 'Pilotage OPC & Suivi de Chantier',
                'title_ar' => 'إدارة وتنسيق الأوراش (OPC)',
                'title_en' => 'Construction Management & Site Supervision',
                'short_desc_fr' => 'Ordonnancement, coordination technique, sécurité TRC et planification rigoureuse des délais.',
                'short_desc_ar' => 'تخطيط زمني دقيق، تنسيق بين المتدخلين، ومطابقة صارمة لدفاتر التحملات.',
                'short_desc_en' => 'Scheduling, technical trade coordination, site safety standards and strict deadline execution.',
                'icon' => 'ClipboardCheck',
                'image' => '/images/machinery-fleet.jpg',
                'advantage_title_fr' => 'Zéro Retard Contractuel',
                'advantage_title_ar' => 'التزام تام بمواعيد التسليم',
                'advantage_title_en' => 'Zero Schedule Delays',
                'advantage_desc_fr' => 'Planification informatisée Gantt et réunions hebdomadaires d\'avancement.',
                'advantage_desc_ar' => 'برمجة دقيقة للمسار الحرج واجتماعات تنسيقية دورية مع الملاك.',
                'advantage_desc_en' => 'Critical path method (CPM) planning and weekly site progress meetings.',
                'order' => 6,
                'scopes' => [
                    ['fr' => 'Établissement du planning chemin critique sous MS Project / Primavera', 'ar' => 'إعداد المخطط الزمني الشامل وتحليل المسار الحرج', 'en' => 'Comprehensive master schedule using MS Project / Primavera'],
                    ['fr' => 'Coordination des corps d\'état techniques et réunions hebdomadaires', 'ar' => 'التنسيق بين كافة الفرق الفنية واجتماعات الأوراش', 'en' => 'Subcontractor coordination and weekly site meetings'],
                    ['fr' => 'Vérification et validation contradictoire des attachements', 'ar' => 'مراجعة قياسات الأشغال والمصادقة على الكشوفات الشهرية', 'en' => 'Monthly quantity take-offs and contractor billing checks'],
                    ['fr' => 'Assistance aux opérations de réception provisoire et définitive', 'ar' => 'المواكبة في التسليم المؤقت والنهائي للأشغال', 'en' => 'Turnkey commissioning and final site handover support'],
                ],
            ],
        ];

        foreach ($servicesData as $sData) {
            $scopes = $sData['scopes'];
            unset($sData['scopes']);

            $service = Service::updateOrCreate(
                ['slug' => $sData['slug']],
                $sData
            );

            $service->scopes()->delete();
            foreach ($scopes as $idx => $sc) {
                ServiceScope::create([
                    'service_id' => $service->id,
                    'text_fr' => $sc['fr'],
                    'text_ar' => $sc['ar'],
                    'text_en' => $sc['en'] ?? null,
                    'order' => $idx + 1,
                ]);
            }
        }

        // ==========================================
        // 8. CLIENT TESTIMONIALS & PARTNER REFERENCES
        // ==========================================
        $testimonialsData = [
            [
                'client_name' => 'M. Hassan Berrada',
                'role_fr' => 'Directeur Technique',
                'role_ar' => 'المدير التقني',
                'role_en' => 'Technical Director',
                'company_fr' => 'Groupe Saïss Immobilier',
                'company_ar' => 'مجموعة سايس العقارية',
                'company_en' => 'Saïss Real Estate Group',
                'city_fr' => 'Fès',
                'city_ar' => 'فاس',
                'city_en' => 'Fez',
                'comment_fr' => 'Slassi Travaux a mené à bien la réalisation de notre complexe résidentiel Al Jawahir à Fès dans des conditions exemplaires. Le respect des délais et la qualité des bétons armés ont largement dépassé nos attentes.',
                'comment_ar' => 'قامت شركة سلاسي للأشغال بإنجاز مجمعنا السكني الجواهر بفاس بكفاءة عالية واحترافية ملحوظة. احترام الآجال المحددة وجودة الخرسانة المسلحة كانا في الموعد تماماً.',
                'comment_en' => 'Slassi Travaux successfully delivered our Al Jawahir residential project in Fez under exemplary conditions. Schedule compliance and reinforced concrete quality exceeded our expectations.',
                'rating' => 5,
                'avatar_image' => '/images/favicon-icon.jpg',
                'project_id' => $jawahirProject?->id,
                'order' => 1,
            ],
            [
                'client_name' => 'Ing. Karim Tazi',
                'role_fr' => 'Directeur de Projet VRD',
                'role_ar' => 'مدير مشاريع البنية التحتية',
                'role_en' => 'Infrastructure Project Director',
                'company_fr' => 'Commune Urbaine de Fès',
                'company_ar' => 'الجماعة الحضرية لفاس',
                'company_en' => 'Municipality of Fez',
                'city_fr' => 'Fès',
                'city_ar' => 'فاس',
                'city_en' => 'Fez',
                'comment_fr' => 'Un partenaire rigoureux pour les marchés publics de voirie et de VRD. Leur parc matériel en propre leur confère une réactivité incomparable sur les axes routiers majeurs du Saïss.',
                'comment_ar' => 'شريك نموذجي وموثوق في تنفيذ الصفقات العمومية للطرق والشبكات. امتلاكهم لأسطول الآليات المتطور يمنحهم سرعة استجابة ملموسة في الشوارع الكبرى بفاس.',
                'comment_en' => 'A rigorous and reliable partner for municipal road infrastructure contracts. Their proprietary equipment fleet provides unmatched responsiveness.',
                'rating' => 5,
                'avatar_image' => '/images/project-vrd.jpg',
                'project_id' => $boulevardProject?->id,
                'order' => 2,
            ],
            [
                'client_name' => 'M. Mehdi Alami',
                'role_fr' => 'Gérant & Promoteur',
                'role_ar' => 'مدير عام ومنعش عقاري',
                'role_en' => 'Managing Director',
                'company_fr' => 'Alami Résidences',
                'company_ar' => 'إقامات العلمي',
                'company_en' => 'Alami Residences',
                'city_fr' => 'Meknès',
                'city_ar' => 'مكناس',
                'city_en' => 'Meknes',
                'comment_fr' => 'Du terrassement initial jusqu\'à la livraison du gros œuvre, l\'équipe d\'ingénieurs de Slassi Travaux a su trouver les meilleures solutions techniques face aux contraintes du sol.',
                'comment_ar' => 'منذ انطلاق أشغال الحفر وحتى تسليم الهيكل الخرساني، أثبت الفريق الهندسي لشركة سلاسي قدرة متميزة على إيجاد الحلول التقنية الملائمة لطبيعة التربة.',
                'comment_en' => 'From initial excavation to structural completion, Slassi Travaux\'s engineering staff consistently identified the optimal technical solutions.',
                'rating' => 5,
                'avatar_image' => '/images/project-civil.jpg',
                'project_id' => null,
                'order' => 3,
            ],
        ];

        foreach ($testimonialsData as $tData) {
            Testimonial::updateOrCreate(
                ['client_name' => $tData['client_name']],
                $tData
            );
        }

        // ==========================================
        // 9. QUALITY COMMITMENTS & MOROCCAN STANDARDS
        // ==========================================
        $commitmentsData = [
            [
                'title_fr' => 'Assurance Décennale & Responsabilité Civile TRC',
                'title_ar' => 'تأمين شامل وضمان عشري TRC',
                'title_en' => '10-Year Decennial & Full TRC Site Insurance',
                'desc_fr' => 'Police tous risques chantier (TRC) et garantie décennale souscrites auprès des plus grands assureurs du Royaume pour une sérénité contractuelle absolue.',
                'desc_ar' => 'بوليصة تأمين شاملة لجميع أخطار الورش (TRC) مع ضمان عشري معتمد لدى كبريات شركات التأمين بالمغرب لضمان أمان استثماري كامل.',
                'desc_en' => 'All-Risk Contractors Insurance (TRC) and 10-year decennial structural guarantee covering all project assets.',
                'icon' => 'ShieldCheck',
                'image' => '/images/project-civil.jpg',
                'badge_fr' => 'Engagement Contractuel Garanti',
                'badge_ar' => 'مضمون وموثق بالشهادات الرسمية',
                'badge_en' => 'Certified Contractual Commitment',
                'standard_code' => 'TRC / CCTG',
                'order' => 1,
            ],
            [
                'title_fr' => 'Conformité Stricte aux Normes Parasismiques (RPS 2011)',
                'title_ar' => 'مطابقة تامة لمعايير الزلازل RPS 2011',
                'title_en' => 'Strict Compliance with Moroccan Seismic Code (RPS 2011)',
                'desc_fr' => 'Bétons haute performance dosés, vibrés et formulés pour absorber les sollicitations sismiques selon la réglementation nationale en vigueur.',
                'desc_ar' => 'خرسانة مسلحة ذات مقاومة عالية مصممة وفق أحدث حسابات مقاومة الزلازل بالمغرب مع حديد مطابق للمواصفات.',
                'desc_ar' => 'High-strength structural concrete engineered to resist seismic forces in accordance with Moroccan building laws.',
                'icon' => 'FileCheck',
                'image' => '/images/project-residential.jpg',
                'badge_fr' => 'Conforme RPS 2011',
                'badge_ar' => 'مطابق للائحة RPS 2011',
                'badge_en' => 'RPS 2011 Certified',
                'standard_code' => 'RPS 2011 / NM',
                'order' => 2,
            ],
            [
                'title_fr' => 'Contrôles Systématiques par Laboratoires Agréés (LPEE, LABOTEST)',
                'title_ar' => 'فحوصات مخبرية مستمرة من LPEE و LABOTEST',
                'title_en' => 'Accredited Laboratory Controls (LPEE, LABOTEST)',
                'desc_fr' => 'Essais de compression à 7 et 28 jours, contrôle sclérométrique, essais de plaque et carottage systématique pour une traçabilité intégrale.',
                'desc_ar' => 'تجارب تكسير الخرسانة بعد 7 و 28 يوماً، قياس الكثافة وتجارب التحميل الميدانية لضمان أعلى معايير الصلابة.',
                'desc_en' => 'Compressive strength testing at 7 and 28 days, plate load tests, and core sampling ensuring complete material traceability.',
                'icon' => 'Microscope',
                'image' => '/images/project-renovation.jpg',
                'badge_fr' => 'Agrément LPEE / LABOTEST',
                'badge_ar' => 'اعتماد رسمي LPEE',
                'badge_en' => 'LPEE Quality Approved',
                'standard_code' => 'NM BTP / CCTG',
                'order' => 3,
            ],
            [
                'title_fr' => 'Respect Contractuel Inconditionnel des Délais',
                'title_ar' => 'التزام حرفي وصارم بالمواعيد التعاقدية',
                'title_en' => 'Strict Adherence to Project Milestones & Deadlines',
                'desc_fr' => 'Planification minutieuse sous MS Project avec analyse du chemin critique et doublement des équipes en cas de phase sensible.',
                'desc_ar' => 'جدولة دقيقة لمراحل الإنجاز ومضاعفة فرق العمل في المراحل الحساسة لتسليم المشاريع في موعدها المحدد.',
                'desc_en' => 'Rigorous critical path tracking and dynamic shift management to ensure zero project delay.',
                'icon' => 'Clock',
                'image' => '/images/hero.jpg',
                'badge_fr' => 'Garantie de Livraison',
                'badge_ar' => 'ضمان التسليم في الآجال',
                'badge_en' => 'On-Time Handover Guarantee',
                'standard_code' => 'ISO 9001:2015',
                'order' => 4,
            ],
        ];

        foreach ($commitmentsData as $cData) {
            Commitment::updateOrCreate(
                ['title_fr' => $cData['title_fr']],
                $cData
            );
        }

        // ==========================================
        // 10. EQUIPMENT FLEET CATEGORIES & STATS
        // ==========================================
        $equipmentStats = [
            ['count' => '40+', 'label_fr' => 'Engins lourds propriétaires', 'label_ar' => 'آلية ومعدة ثقيلة مملوكة', 'label_en' => 'Heavy construction machines', 'order' => 1],
            ['count' => '100%', 'label_fr' => 'Flotte entretenue et disponible', 'label_ar' => 'أسطول جاهز ومستمر الصيانة', 'label_en' => 'Maintained & operational fleet', 'order' => 2],
            ['count' => '24/7', 'label_fr' => 'Capacité de déploiement d\'urgence', 'label_ar' => 'جاهزية للتدخل والعمل المستمر', 'label_en' => 'Rapid field mobilization', 'order' => 3],
            ['count' => '0', 'label_fr' => 'Retard dû à la sous-traitance d\'engins', 'label_ar' => 'تأخير ناتج عن كراء الآليات', 'label_en' => 'Zero equipment rental delays', 'order' => 4],
        ];

        foreach ($equipmentStats as $st) {
            EquipmentStat::updateOrCreate(
                ['count' => $st['count'], 'label_fr' => $st['label_fr']],
                $st
            );
        }

        $equipmentCategories = [
            [
                'slug' => 'terrassement-extraction',
                'title_fr' => 'Terrassement & Extraction',
                'title_ar' => 'الحفر الثقيل وتجهيز المواقع',
                'title_en' => 'Earthmoving & Excavation',
                'icon' => 'Truck',
                'banner_image' => '/images/machinery-fleet.jpg',
                'order' => 1,
                'items' => [
                    ['fr' => 'Pelles sur chenilles 20T - 35T (CAT 330D, Komatsu PC290)', 'ar' => 'حفارات على جنزير 20 إلى 35 طن (كاتربيلر، كوماتسو)', 'en' => '20T - 35T Crawler Excavators (CAT 330D, Komatsu)'],
                    ['fr' => 'Bulldozers D6 et D8 avec ripper de déroctage', 'ar' => 'جرافات ثقيلة D6 و D8 مع كاسحة صخور هيدروليكية', 'en' => 'D6 & D8 Heavy Bulldozers with ripper'],
                    ['fr' => 'Chargeuses sur pneus avec godet 3.5 m³', 'ar' => 'شاحنات تحميل على عجلات مع مجرفة 3.5 م³', 'en' => 'Heavy wheel loaders (3.5 m³ bucket)'],
                    ['fr' => 'Mini-pelles urbaines pour tranchées étroites et VRD', 'ar' => 'حفارات صغيرة لأشغال الشبكات بالمناطق الحضرية', 'en' => 'Compact excavators for urban utility trenches'],
                ],
            ],
            [
                'slug' => 'transport-evacuation',
                'title_fr' => 'Transport & Logistique de Chantier',
                'title_ar' => 'النقل واللوجستيك الميداني',
                'title_en' => 'Transport & Heavy Haulage',
                'icon' => 'Truck',
                'banner_image' => '/images/project-vrd.jpg',
                'order' => 2,
                'items' => [
                    ['fr' => 'Camions bennes 8x4 Mercedes Actros (Charge utile 32T)', 'ar' => 'شاحنات قلابة 8×4 مرسيدس أكتروس (حمولة 32 طن)', 'en' => '8x4 Mercedes Actros Dump Trucks (32T payload)'],
                    ['fr' => 'Semi-remorques porte-engins lourds jusqu\'à 60T', 'ar' => 'مقطورات ثقيلة لنقل الآليات حتى 60 طن', 'en' => 'Heavy lowboy equipment haulers up to 60T'],
                    ['fr' => 'Camions citernes à eau 15 000 L pour arrosage et compactage', 'ar' => 'شاحنات صهاريج مياه 15 ألف لتر للرش والدمك', 'en' => '15,000L water tank trucks for soil wetting'],
                ],
            ],
            [
                'slug' => 'nivellement-compactage',
                'title_fr' => 'Nivellement & Compactage',
                'title_ar' => 'التسوية الدقيقة والدك الاهتزازي',
                'title_en' => 'Grading & Soil Compaction',
                'icon' => 'Layers',
                'banner_image' => '/images/hero.jpg',
                'order' => 3,
                'items' => [
                    ['fr' => 'Niveleuses CAT 140M équipées de guidage laser et ultrasons', 'ar' => 'كاسحات تسوية كاتربيلر 140M بنظام التوجيه بالليزر', 'en' => 'CAT 140M motor graders with sonic & laser guidance'],
                    ['fr' => 'Compacteurs monocylindres vibrants Bomag BW213 (13T)', 'ar' => 'مداحل اهتزازية أسطوانية بوماغ (13 طن)', 'en' => 'Bomag BW213 single drum vibratory rollers (13T)'],
                    ['fr' => 'Compacteurs tandem et à pneus pour enrobés bitumineux', 'ar' => 'مداحل مطاطية لتسوية وتكثيف الأسفلت الساخن', 'en' => 'Pneumatic tire and tandem rollers for asphalt'],
                ],
            ],
            [
                'slug' => 'beton-levage',
                'title_fr' => 'Béton & Équipements de Levage',
                'title_ar' => 'معدات الخرسانة والرفع',
                'title_en' => 'Concrete & Cranes',
                'icon' => 'Construction',
                'banner_image' => '/images/project-civil.jpg',
                'order' => 4,
                'items' => [
                    ['fr' => 'Camions malaxeurs (toupies) à béton 10 m³', 'ar' => 'شاحنات خلاطات خرسانة سعة 10 متر مكعب', 'en' => '10 m³ Transit Concrete Mixers'],
                    ['fr' => 'Pompes à béton automotrices à flèche 36m', 'ar' => 'مضخات خرسانة ذاتية الحركة بذراع 36 متراً', 'en' => '36m boom truck-mounted concrete pumps'],
                    ['fr' => 'Centrales à béton de chantier automatisées', 'ar' => 'محطات خلط خرسانة آلية في الأوراش', 'en' => 'Automated batching concrete plant systems'],
                    ['fr' => 'Grues à tour à montage rapide et treuils de levage', 'ar' => 'رافعات برجية سريعة التركيب ورافعات سلكية', 'en' => 'Fast-erecting tower cranes and site hoists'],
                ],
            ],
        ];

        foreach ($equipmentCategories as $eqCat) {
            $items = $eqCat['items'];
            unset($eqCat['items']);

            $catModel = EquipmentCategory::updateOrCreate(
                ['slug' => $eqCat['slug']],
                $eqCat
            );

            $catModel->items()->delete();
            foreach ($items as $idx => $it) {
                EquipmentCategoryItem::create([
                    'equipment_category_id' => $catModel->id,
                    'name_fr' => $it['fr'],
                    'name_ar' => $it['ar'],
                    'name_en' => $it['en'] ?? null,
                    'order' => $idx + 1,
                ]);
            }
        }

        // ==========================================
        // 11. ESTIMATOR CONFIGURATION (TYPES, FINISHES, LOCATIONS)
        // ==========================================
        $estimatorTypes = [
            [
                'type_key' => 'building',
                'name_fr' => 'Bâtiment Résidentiel (R+4)',
                'name_ar' => 'عمارة سكنية (R+4)',
                'name_en' => 'Residential Building (R+4)',
                'base_rate' => 3200,
                'unit' => 'm²',
                'icon' => 'Building2',
                'image' => '/images/project-residential.jpg',
                'order' => 1,
            ],
            [
                'type_key' => 'villa',
                'name_fr' => 'Villa Individuelle de Haut Standing',
                'name_ar' => 'فيلا فاخرة منفصلة',
                'name_en' => 'Luxury Detached Villa',
                'base_rate' => 4500,
                'unit' => 'm²',
                'icon' => 'Building',
                'image' => '/images/project-renovation.jpg',
                'order' => 2,
            ],
            [
                'type_key' => 'industrial',
                'name_fr' => 'Hangar Industriel & Dépôt Logistique',
                'name_ar' => 'مستودع وهنغار صناعي لوجستي',
                'name_en' => 'Industrial Warehouse & Logistics Hangar',
                'base_rate' => 2200,
                'unit' => 'm²',
                'icon' => 'Layers',
                'image' => '/images/hero.jpg',
                'order' => 3,
            ],
            [
                'type_key' => 'vrd',
                'name_fr' => 'Aménagement VRD & Voirie (au mètre)',
                'name_ar' => 'تهيئة الطرق والشبكات التحتية (بالمتر)',
                'name_en' => 'Roads & Utilities Infrastructure (per meter)',
                'base_rate' => 950,
                'unit' => 'ml',
                'icon' => 'Truck',
                'image' => '/images/project-vrd.jpg',
                'order' => 4,
            ],
            [
                'type_key' => 'renovation',
                'name_fr' => 'Rénovation & Réhabilitation de Bâtiment',
                'name_ar' => 'تجديد وإعادة تأهيل المباني القائمة',
                'name_en' => 'Complete Building Renovation & Fit-Out',
                'base_rate' => 1800,
                'unit' => 'm²',
                'icon' => 'PaintBucket',
                'image' => '/images/project-renovation.jpg',
                'order' => 5,
            ],
        ];

        foreach ($estimatorTypes as $et) {
            EstimatorProjectType::updateOrCreate(
                ['type_key' => $et['type_key']],
                $et
            );
        }

        $estimatorFinishes = [
            [
                'finish_key' => 'gros_oeuvre',
                'name_fr' => 'Gros Œuvre Seul (Fondations + Béton Armé)',
                'name_ar' => 'الهيكل الخرساني والأساسات فقط (عظم)',
                'name_en' => 'Structural Core Only (Foundations & Concrete)',
                'multiplier' => 0.65,
                'description_fr' => 'Fouilles, fondations, ossature en béton armé et dalles de plancher.',
                'order' => 1,
            ],
            [
                'finish_key' => 'standard',
                'name_fr' => 'Standard Fini (Clé en main prêt à l\'usage)',
                'name_ar' => 'تشطيب قياسي متكامل (جاهز للاستخدام)',
                'name_en' => 'Turnkey Standard Finish',
                'multiplier' => 1.00,
                'description_fr' => 'Gros œuvre complet + revêtements carrelage, menuiseries et sanitaires standards.',
                'order' => 2,
            ],
            [
                'finish_key' => 'haut_standing',
                'name_fr' => 'Haut Standing (Marbre, Isolation & Climatisation)',
                'name_ar' => 'تشطيب فاخر (رخام، عزل حراري وتكييف)',
                'name_en' => 'High Standing (Marble, Insulation & HVAC)',
                'multiplier' => 1.35,
                'description_fr' => 'Marbre poli, double vitrage thermique, volets roulants motorisés et faux-plafonds.',
                'order' => 3,
            ],
            [
                'finish_key' => 'prestige',
                'name_fr' => 'Prestige & Luxe (Domotique, Façades Verre)',
                'name_ar' => 'تشطيب استثنائي (تحكم ذكي وواجهات زجاجية)',
                'name_en' => 'Prestige Luxury (Smart Home & Curtain Walls)',
                'multiplier' => 1.80,
                'description_fr' => 'Équipements domotiques, menuiseries à rupture de pont thermique et finitions nobles.',
                'order' => 4,
            ],
        ];

        foreach ($estimatorFinishes as $ef) {
            EstimatorFinish::updateOrCreate(
                ['finish_key' => $ef['finish_key']],
                $ef
            );
        }

        $estimatorLocations = [
            ['location_key' => 'fes', 'name_fr' => 'Fès (Agglomération & Environs)', 'name_ar' => 'فاس ونواحيها', 'name_en' => 'Fez & Environs', 'logistics_multiplier' => 1.00, 'order' => 1],
            ['location_key' => 'meknes', 'name_fr' => 'Meknès & Région Saïss', 'name_ar' => 'مكناس وإقليم سايس', 'name_en' => 'Meknes & Saïss Region', 'logistics_multiplier' => 1.02, 'order' => 2],
            ['location_key' => 'casablanca', 'name_fr' => 'Casablanca - Grand Casablanca', 'name_ar' => 'الدار البيضاء الكبرى', 'name_en' => 'Greater Casablanca', 'logistics_multiplier' => 1.08, 'order' => 3],
            ['location_key' => 'rabat', 'name_fr' => 'Rabat - Salé - Témara', 'name_ar' => 'الرباط - سلا - تمارة', 'name_en' => 'Rabat - Salé - Témara', 'logistics_multiplier' => 1.06, 'order' => 4],
            ['location_key' => 'autre', 'name_fr' => 'Autres Régions du Royaume', 'name_ar' => 'باقي جهات المملكة', 'name_en' => 'Other Moroccan Regions', 'logistics_multiplier' => 1.12, 'order' => 5],
        ];

        foreach ($estimatorLocations as $el) {
            EstimatorLocation::updateOrCreate(
                ['location_key' => $el['location_key']],
                $el
            );
        }

        // ==========================================
        // 12. TEAM LEADERSHIP & TECHNICAL EXECUTIVES
        // ==========================================
        $teamData = [
            [
                'name' => 'Hamid Slassi',
                'role_fr' => 'Directeur Général & Fondateur',
                'role_ar' => 'المدير العام والمؤسس',
                'role_en' => 'Chief Executive Officer & Founder',
                'department_fr' => 'Direction Générale',
                'department_ar' => 'الإدارة العامة',
                'department_en' => 'Executive Board',
                'image' => '/images/favicon-icon.jpg',
                'email' => 'direction@slassi-travaux.ma',
                'phone' => '+212 5 35 62 14 80',
                'experience_years' => '15+ ans',
                'bio_fr' => 'Ingénieur d\'État en Génie Civil avec plus de 15 années d\'expérience dans la direction de chantiers majeurs d\'infrastructures et de bâtiment au Maroc.',
                'bio_ar' => 'مهندس دولة في الهندسة المدنية بخبرة تتجاوز 15 سنة في قيادة المشاريع العمرانية والبنيات التحتية بالمغرب.',
                'bio_en' => 'Civil Engineer with over 15 years leading major public works and construction developments across Morocco.',
                'order' => 1,
            ],
            [
                'name' => 'Youssef El Amrani',
                'role_fr' => 'Conducteur Principal de Travaux',
                'role_ar' => 'مدير الأوراش الرئيسي',
                'role_en' => 'Lead Site Construction Manager',
                'department_fr' => 'Génie Civil & Gros Œuvre',
                'department_ar' => 'الهندسة المدنية والبناء',
                'department_en' => 'Civil Works',
                'image' => '/images/project-residential.jpg',
                'email' => 'chef.projet@slassi-travaux.ma',
                'phone' => '+212 6 61 48 92 10',
                'experience_years' => '12 ans',
                'bio_fr' => 'Spécialiste de la conduite de chantiers complexes en béton armé et coordination des corps d\'état secondaires.',
                'bio_ar' => 'متخصص في إدارة الأوراش الخرسانية الكبرى والتنسيق بين مقاولي الباطن والمهندسين المعماريين.',
                'bio_en' => 'Expert in structural reinforced concrete execution and multi-trade site coordination.',
                'order' => 2,
            ],
            [
                'name' => 'Tariq Berrada',
                'role_fr' => 'Responsable Matériel & Logistique',
                'role_ar' => 'مسؤول أسطول الآليات واللوجستيك',
                'role_en' => 'Fleet & Logistics Director',
                'department_fr' => 'Parc & Maintenance',
                'department_ar' => 'الأسطول والصيانة',
                'department_en' => 'Fleet Maintenance',
                'image' => '/images/machinery-fleet.jpg',
                'email' => 'parc@slassi-travaux.ma',
                'phone' => '+212 6 62 11 22 33',
                'experience_years' => '14 ans',
                'bio_fr' => 'Gestionnaire chevronné de parcs d\'engins lourds Caterpillar et Mercedes-Benz, assurant 100% de disponibilité opérationnelle.',
                'bio_ar' => 'خبير في صيانة الآليات الثقيلة كاتربيلر ومرسيدس لضمان استمرارية العمل بدون توقف.',
                'bio_en' => 'Master technician managing 40+ CAT and Mercedes heavy machinery units with zero downtime.',
                'order' => 3,
            ],
            [
                'name' => 'Fatima-Zahra Mansouri',
                'role_fr' => 'Ingénieure d\'Affaires & Métré BTP',
                'role_ar' => 'مهندسة الدراسات وحساب الكميات',
                'role_en' => 'Quantity Surveyor & Bid Engineer',
                'department_fr' => 'Bureau d\'Études & Devis',
                'department_ar' => 'مكتب الدراسات والتقديرات',
                'department_en' => 'Estimating & Tenders',
                'image' => '/images/project-renovation.jpg',
                'email' => 'devis@slassi-travaux.ma',
                'phone' => '+212 5 35 62 14 81',
                'experience_years' => '9 ans',
                'bio_fr' => 'Experte en métré, analyse de prix unitaires et réponse aux appels d\'offres publics et privés.',
                'bio_ar' => 'متخصصة في حساب الكميات والتقدير المالي والمشاركة في الصفقات العمومية والخاصة.',
                'bio_en' => 'Specialist in structural bill of quantities, unit cost estimation and public procurement bids.',
                'order' => 4,
            ],
        ];

        foreach ($teamData as $tm) {
            TeamMember::updateOrCreate(
                ['name' => $tm['name']],
                $tm
            );
        }

        // ==========================================
        // 13. PROJECT GALLERY & CONSTRUCTION PICTURES
        // ==========================================
        $galleryImages = [
            'residence-al-jawahir-fes' => [
                ['path' => '/images/project-residential.jpg', 'caption' => 'Vue extérieure en perspective 3D - Façade R+7', 'is_cover' => true],
                ['path' => '/images/hero.jpg', 'caption' => 'Phase gros œuvre en béton armé haute résistance', 'is_cover' => false],
            ],
            'amenagement-boulevard-fes-saiss' => [
                ['path' => '/images/project-vrd.jpg', 'caption' => 'Revêtement en enrobé bitumineux à chaud 7cm', 'is_cover' => true],
                ['path' => '/images/machinery-fleet.jpg', 'caption' => 'Mobilisation de la flotte niveleuses et finisseurs', 'is_cover' => false],
            ],
            'ouvrage-hydraulique-reservoir-meknes' => [
                ['path' => '/images/project-civil.jpg', 'caption' => 'Réservoir semi-enterré 10 000 m³ avec radier étanche', 'is_cover' => true],
                ['path' => '/images/hero.jpg', 'caption' => 'Essais de mise en eau concluants à 100%', 'is_cover' => false],
            ],
            'rehabilitation-siege-direction-fes' => [
                ['path' => '/images/project-renovation.jpg', 'caption' => 'Façade mur-rideau et marbre Royal de Fès poli miroir', 'is_cover' => true],
                ['path' => '/images/project-residential.jpg', 'caption' => 'Renforcement des poteaux par fibres de carbone', 'is_cover' => false],
            ],
            'plateforme-logistique-fes-sud' => [
                ['path' => '/images/hero.jpg', 'caption' => 'Terrassement de grande masse et compactage 35 000 m²', 'is_cover' => true],
                ['path' => '/images/machinery-fleet.jpg', 'caption' => 'Pelles hydrauliques CAT 330D en rotation continue', 'is_cover' => false],
            ],
        ];

        foreach ($galleryImages as $projSlug => $imgs) {
            $proj = $createdProjects[$projSlug] ?? null;
            if ($proj) {
                $proj->images()->delete();
                foreach ($imgs as $idx => $img) {
                    ProjectImage::create([
                        'project_id' => $proj->id,
                        'image_path' => $img['path'],
                        'caption_fr' => $img['caption'],
                        'is_cover' => $img['is_cover'],
                        'order' => $idx + 1,
                    ]);
                }
            }
        }
    }
}
