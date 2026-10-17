# Slassi CMS - Back-Office Direction & Pagetree Layouts Manager

Application Next.js + TypeScript + Shadcn UI conçue sur mesure pour la direction générale de **Slassi De Travaux Divers (Slassi Travaux)** - Entreprise générale de BTP & Génie Civil à Fès, Maroc (Capital: 17 000 000 DH).

Inspiré de l'interface de gestion de gabarits backend (Enterprise CMS / TYPO3-style Pagetree overview).

## 🚀 Fonctionnalités Clés

1. **Pagetree Overview (Arborescence & Layouts)** :
   - Vue hiérarchique avec arborescence graphique (`Congratulations`, `Home`, `Spacer`, `Features`, `Customize`, `Pages`, `Chantiers`, `Parc Engins`, `Estimator`).
   - Sélecteurs interactifs en temps réel :
     - **Depth** : 1 level, 2 levels, 3 levels, All levels.
     - **Type** : Layouts, Content Elements, Access Rights, SEO & Social.
     - **Actual backend layout** : Affichage dynamique du gabarit résolu.
     - **Backend Layout (this page only)** : Sélection immédiate du gabarit appliqué à la page.
     - **Backend Layout (subpages)** : Règle d'héritage appliquée aux enfants.
   - Boutons d'actions par ligne : consultation des propriétés et édition complète.

2. **Gabarits Disponibles (Backend Layouts)** :
   - **Special Startpage** : Hero immersif 3D, chiffres clés, 3 colonnes d'accès rapide.
   - **Default** : Gabarit 2 colonnes standard avec barre latérale contextuelle.
   - **Catalog & Fleet Grid** : Grille 3 colonnes pour la flotte de 24 engins lourds (Pelles, Bulls, Compacteurs).
   - **Estimator Calculator** : Simulateur de devis BTP interactif avec calcul de cubage et prix au m².
   - **Showcase Gallery** : Galerie immersive de chantiers avec modale avant/après.
   - **Contact & Location** : Double panneau avec carte de localisation à Fès et accès WhatsApp direct.

3. **Simulateur Wireframe Interactif (LayoutPreviewModal)** :
   - Clic sur n'importe quel gabarit pour afficher une maquette filaire interactive (Wireframe) simulant le rendu final desktop.

4. **Gestion Métier pour le PDG (Klass Admin / Hamid Slassi)** :
   - Tableau de bord avec indicateurs clés (Pages indexées, Gabarits actifs, Engins, Devis en attente).
   - Suivi des demandes de devis générées par les clients.
   - Éditeur des coordonnées officielles et mentions légales (Capital 17M MAD).

## 🛠️ Lancement en Local

Dans le dossier `admin-side/frontend` :

```bash
npm run dev
# ou
npx next dev -p 3001
```

Ouvrez ensuite [http://localhost:3001](http://localhost:3001) dans votre navigateur.
