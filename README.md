# IIPS — Prototype Maquette HTML/CSS

<p align="center">
  <strong>Logiciel de Gestion Assurance Santé</strong><br>
  Institut International de Prévoyance pour la Santé<br>
  <em>Prestataire : KOJIT Systems Côte d'Ivoire — Février 2026</em>
</p>

---

## 📋 Sommaire

- [Présentation du projet](#-présentation-du-projet)
- [Démarrage rapide](#-démarrage-rapide)
- [Structure du projet](#-structure-du-projet)
- [Espaces applicatifs](#-espaces-applicatifs)
- [Inventaire des écrans](#-inventaire-des-écrans)
- [Design System](#-design-system)
- [Planning de réalisation](#-planning-de-réalisation)
- [Données de démonstration](#-données-de-démonstration)
- [Couverture fonctionnelle](#-couverture-fonctionnelle)
- [Notes techniques](#-notes-techniques)

---

## 🎯 Présentation du projet

Ce prototype HTML/CSS/JS représente la **maquette interactive** du logiciel IIPS, une plateforme intégrée de gestion d'assurance santé couvrant l'ensemble du cycle métier :

**Prospection → Souscription → Contrat → Primes → Prestations → Sinistres → Paiements → Reporting**

Le prototype couvre **4 espaces applicatifs** destinés aux différents acteurs du système, avec **14 écrans HTML** entièrement navigables et interconnectés, construits sur un **Design System cohérent** de plus de 750 lignes CSS.

### Objectifs du prototype

- Valider l'ergonomie et les parcours utilisateurs avant le développement
- Servir de référence visuelle pour l'équipe de développement KOJIT
- Permettre aux parties prenantes IIPS de naviguer dans l'application cible
- Documenter les composants UI réutilisables via le Design System

---

## 🚀 Démarrage rapide

Aucune installation requise. Le prototype fonctionne en HTML/CSS/JS statique.

1. **Téléchargez** le dossier `iips-prototype/`
2. **Ouvrez** `pages/login.html` dans un navigateur (Chrome, Firefox, Edge)
3. **Naviguez** en sélectionnant un espace (Gestionnaire, Prestataire, Société, Assuré) puis cliquez sur "Se connecter"

### Comptes de démonstration

| Espace | Utilisateur | Rôle |
|--------|-------------|------|
| Gestionnaire | Aminata Diabaté | Responsable gestion santé |
| Prestataire | Dr. Kouassi Jean | Directeur clinique Biaka Boda |
| Société | M. Traoré Moussa | DRH — SOTRA CI |
| Assuré | Mme Bamba Fatoumata | Employée — Bénéficiaire contrat groupe |

> **Note :** Tous les comptes sont pré-remplis sur la page de login. Sélectionnez simplement l'espace souhaité et cliquez sur "Se connecter".

---

## 📁 Structure du projet

```
iips-prototype/
│
├── index.html                              # Redirection vers login
├── README.md                               # Ce fichier
│
├── css/
│   └── design-system.css                   # Design System complet (750+ lignes)
│       ├── Tokens (couleurs, typo, espacement, ombres)
│       ├── Reset & base styles
│       ├── Layout system (app shell, grids)
│       ├── Sidebar & navigation
│       ├── Top bar
│       ├── Boutons (6 variantes × 3 tailles)
│       ├── Cards & Stat cards
│       ├── Tables
│       ├── Formulaires
│       ├── Badges & status
│       ├── Modals
│       ├── Tabs
│       ├── Pagination
│       ├── Toast notifications
│       ├── Workflow steps
│       ├── Avatars
│       ├── Animations (fadeIn, slideUp, slideInRight)
│       └── Utility classes
│
├── js/
│   ├── main.js                             # Interactions globales
│   │   ├── Navigation active state
│   │   ├── Tabs switching
│   │   ├── Modal open/close
│   │   ├── Toast notifications
│   │   ├── Table row selection & select-all
│   │   ├── Animated counters
│   │   ├── Search filter (temps réel)
│   │   └── Staggered animations
│   │
│   └── icons.js                            # 25+ icônes SVG inline
│
├── pages/
│   ├── login.html                          # Page de connexion multi-espace
│   │
│   ├── gestionnaire/                       # 🟢 ESPACE GESTIONNAIRE (8 écrans)
│   │   ├── dashboard.html                  # G-002 — Tableau de bord KPI
│   │   ├── contrats.html                   # G-010 — Liste des contrats
│   │   ├── contrat-nouveau.html            # G-011 — Formulaire nouveau contrat
│   │   ├── souscriptions.html              # G-020 — Gestion souscriptions + workflow
│   │   ├── sinistres.html                  # G-030 — Gestion sinistres + alertes fraude
│   │   ├── comptabilite.html               # G-050 — Primes, encaissements, commissions
│   │   ├── paiements.html                  # G-060 — Bordereaux & remboursements
│   │   └── reporting.html                  # G-080 — Reporting & pilotage
│   │
│   ├── prestataire/                        # 🔵 ESPACE PRESTATAIRE (2 écrans)
│   │   ├── dashboard.html                  # P-002 — Dashboard + vérification assuré
│   │   └── saisie-prestation.html          # P-011 — Formulaire saisie prestation
│   │
│   ├── societe/                            # 🟣 ESPACE SOCIÉTÉ (1 écran)
│   │   └── dashboard.html                  # S-002 — Dashboard DRH + gestion adhérents
│   │
│   ├── assure/                             # 🌑 ESPACE ASSURÉ (1 écran, mobile-first)
│   │   └── dashboard.html                  # A-002 — App mobile : carte, garanties, prestations
│   │
│   └── medecin/                            # 🩺 ESPACE MÉDECIN (non implémenté — LOT 3)
│
└── components/                             # Réservé pour composants partagés
```

---

## 🏢 Espaces applicatifs

### 🟢 Espace Gestionnaire (Aminata Diabaté)
**8 écrans** — Application web back-office complète pour l'équipe IIPS.

| Écran | Réf. | Description | Fonctionnalités clés |
|-------|------|-------------|---------------------|
| Dashboard | G-002 | Tableau de bord principal | 4 KPI animés, graphique sinistralité, répartition actes, activité récente |
| Contrats | G-010 | Liste des contrats | Filtres par statut/type, recherche temps réel, pagination, export |
| Nouveau contrat | G-011 | Formulaire création | Wizard 4 étapes, tarification auto, surcotisations, calcul carence |
| Souscriptions | G-020 | Workflow souscriptions | 4 statuts workflow, compteur pièces jointes, badges par étape |
| Sinistres | G-030 | Gestion des sinistres | Types d'actes colorés, alerte fraude, validation/rejet rapide |
| Comptabilité | G-050 | Primes & prélèvements | 3 onglets (primes, encaissements, commissions), relance, Mobile Money |
| Paiements | G-060 | Bordereaux & remboursements | Cards bordereaux, validation paiement, suivi remboursements |
| Reporting | G-080 | Pilotage & rapports | 5 KPI, graphique primes vs sinistres, top prestataires, générateur |

### 🔵 Espace Prestataire (Dr. Kouassi Jean)
**2 écrans** — Interface web pour les professionnels de santé du réseau.

| Écran | Réf. | Description | Fonctionnalités clés |
|-------|------|-------------|---------------------|
| Dashboard | P-002 | Tableau de bord prestataire | 4 KPI, vérification assuré temps réel, dernières prestations |
| Saisie prestation | P-011 | Formulaire saisie | Sélecteur type d'acte, contrôle garanties, prescription |

### 🟣 Espace Société (M. Traoré, DRH)
**1 écran** — Portail web pour les entreprises clientes.

| Écran | Réf. | Description | Fonctionnalités clés |
|-------|------|-------------|---------------------|
| Dashboard | S-002 | Tableau de bord DRH | Résumé contrat, prime mensuelle, adhérents avec mouvements |

### 🌑 Espace Assuré (Mme Bamba Fatoumata)
**1 écran** — Application mobile-first pour les bénéficiaires.

| Écran | Réf. | Description | Fonctionnalités clés |
|-------|------|-------------|---------------------|
| Dashboard | A-002 | App mobile assuré | Carte numérique QR code, plafonds, garanties, historique, bottom nav |

---

## 📊 Inventaire des écrans

### Écrans réalisés (14)

| # | ID | Écran | Espace | Statut |
|---|-----|-------|--------|--------|
| 1 | G-001 | Login / Connexion | Commun | ✅ |
| 2 | G-002 | Dashboard principal | Gestionnaire | ✅ |
| 3 | G-010 | Liste des contrats | Gestionnaire | ✅ |
| 4 | G-011 | Nouveau contrat | Gestionnaire | ✅ |
| 5 | G-020 | Souscriptions + Workflow | Gestionnaire | ✅ |
| 6 | G-030 | Sinistres + Alertes fraude | Gestionnaire | ✅ |
| 7 | G-050 | Comptabilité (3 onglets) | Gestionnaire | ✅ |
| 8 | G-060 | Paiements (2 onglets) | Gestionnaire | ✅ |
| 9 | G-080 | Reporting & Pilotage | Gestionnaire | ✅ |
| 10 | P-002 | Dashboard prestataire | Prestataire | ✅ |
| 11 | P-011 | Saisie prestation | Prestataire | ✅ |
| 12 | S-002 | Dashboard société | Société | ✅ |
| 13 | A-002 | App mobile assuré | Assuré | ✅ |
| 14 | — | Index (redirection) | — | ✅ |

### Écrans restants pour couverture complète (94)

Ces écrans sont documentés dans le fichier `IIPS_Inventaire_Ecrans.docx` et peuvent être ajoutés en itérations futures :

- **Gestionnaire** : Détail contrat, historique, suspension, résiliation, attestations, upload pièces, détail souscription, workflow validation sinistre, régularisation, alertes fraudes, CRM (7 écrans), GED (4 écrans), reporting avancé (3 écrans), administration (5 écrans), configuration (10 écrans)
- **Prestataire** : Login, vérification assuré, saisie hospitalisation/analyses/pharmacie/optique, historique patient, bordereaux, suivi paiements, réclamations, messagerie
- **Société** : Login, liste contrats, détail contrat, gestion adhérents, historique primes, suivi paiements, états prestations
- **Assuré** : Login, garanties détail, contrats, plafonds, carte numérique, réseau soins (carte), téléchargements, primes, demande remboursement, carnet santé, réclamations, messagerie
- **Médecin** : Login, dashboard, rendez-vous, prise en charge, prescription, téléconsultation

---

## 🎨 Design System

### Identité visuelle

Chaque espace possède sa propre identité de couleur :

| Espace | Couleur principale | Sidebar | Usage |
|--------|-------------------|---------|-------|
| Gestionnaire | `#0B6E4F` (Vert) | Sombre (gray-900) | Back-office IIPS |
| Prestataire | `#0284C7` (Bleu) | Bleu foncé | Cliniques / hôpitaux |
| Société | `#7C3AED` (Violet) | Gris foncé | Portail entreprise |
| Assuré | `#0B6E4F` (Vert) | — (mobile, pas de sidebar) | Application mobile |

### Palette de couleurs

```
Marque
├── Primary (Vert)    : #0B6E4F / #14A076 / #084D38
├── Secondary (Bleu)  : #1B4965 / #2A6F97 / #12334A
└── Accent (Orange)   : #E8871E / #F5A623 / #C56D0A

Sémantique
├── Success  : #12B76A (validé, actif, payé)
├── Warning  : #F79009 (en attente, alerte)
├── Error    : #F04438 (rejeté, impayé, fraude)
└── Info     : #2E90FA (en cours, information)

Neutres
├── gray-50  : #F9FAFB (fond de page)
├── gray-200 : #EAECF0 (bordures)
├── gray-500 : #667085 (texte secondaire)
├── gray-800 : #1D2939 (texte principal)
└── gray-900 : #101828 (titres, sidebar)
```

### Typographies

| Police | Usage | Import |
|--------|-------|--------|
| **Outfit** | Titres, valeurs KPI, display | Google Fonts |
| **DM Sans** | Texte courant, formulaires, labels | Google Fonts |
| **JetBrains Mono** | Références, montants, codes contrat | Google Fonts |

### Composants UI (19 catégories)

| Composant | Variantes | Description |
|-----------|-----------|-------------|
| **Sidebar** | Standard, collapsed | Navigation latérale avec sections, badges, avatar utilisateur |
| **Top bar** | — | Barre de recherche, notifications, actions |
| **Boutons** | primary, secondary, ghost, danger, success, accent × sm, md, lg | Avec icônes, icon-only |
| **Cards** | Standard, Stat card | Header/body/footer, tendances (up/down), icônes colorées |
| **Tables** | — | Checkbox, hover, row actions, sorting headers |
| **Formulaires** | input, select, textarea | Labels, required, hint, error, form-row (2-3 colonnes) |
| **Badges** | success, warning, error, info, neutral, primary | Avec dot indicator |
| **Modals** | — | Backdrop blur, header/body/footer |
| **Tabs** | — | Active state, switchable content panels |
| **Pagination** | — | Info + contrôles numérotés |
| **Toast** | success, error, warning, info | Auto-dismiss, slide-in animation |
| **Workflow steps** | active, completed | Cercles numérotés + lignes de connexion |
| **Avatars** | sm, md, lg, xl | Initiales, couleurs personnalisées |
| **Empty states** | — | Icône, titre, description, CTA |
| **Filter bar** | — | Status tabs, selects, recherche |
| **Progress bar** | — | Fill coloré avec pourcentage |
| **Bordereau cards** | pending, validated, paid | Bande latérale couleur, grille d'infos |
| **Sparklines** | — | Mini barres horizontales tendances |
| **Animations** | fadeIn, slideUp, slideInRight | Staggered delays (animate-in-delay-1..4) |

---

## 📅 Planning de réalisation

| Jour | Contenu | Écrans | Statut |
|------|---------|--------|--------|
| **J1** | Structure projet, Design System CSS (750+ lignes), JS interactions, icônes SVG, Login, Dashboard gestionnaire | 2 | ✅ Terminé |
| **J2** | Espace Gestionnaire — Production : liste contrats, nouveau contrat (wizard + tarification auto), souscriptions (workflow multiniveau), sinistres (alertes fraude) | 4 | ✅ Terminé |
| **J3** | Espace Gestionnaire — Finance & Pilotage : comptabilité (primes, encaissements, commissions), paiements (bordereaux, remboursements), reporting (graphiques, générateur rapports) | 3 | ✅ Terminé |
| **J4** | Espace Prestataire (dashboard + vérification assuré + saisie prestation) + Espace Société (dashboard DRH + gestion adhérents) | 3 | ✅ Terminé |
| **J5** | Espace Assuré mobile-first (carte numérique QR, plafonds, garanties, prestations, bottom navigation) | 1 | ✅ Terminé |

**Total : 14 écrans HTML en 5 jours**

---

## 🧪 Données de démonstration

Le prototype utilise des données fictives réalistes contextualisées pour la Côte d'Ivoire :

### Entreprises clientes
- **SOTRA CI** — 450 employés, contrat Groupe ALPHA 2
- **Orange CI** — 1 200 employés, contrat ALPHA 1
- **Bolloré Transport CI** — 320 employés, contrat ALPHA 2

### Prestataires réseau
- CHU Cocody, Clinique Biaka Boda, Pharmacie Salama, Labo BioMedical+, Optique Vision Plus

### Types de contrats
- ALPHA 1, ALPHA 2, Fonctionnaire, Groupe, Individuel

### Montants en FCFA
- Primes mensuelles : 35 000 à 8 900 000 FCFA
- Prestations : 8 500 à 875 000 FCFA
- Bordereaux : 1 680 000 à 12 340 000 FCFA

---

## 🔧 Couverture fonctionnelle

### Parcours couverts dans le prototype

```
✅ PARCOURS COMPLET : Connexion → Dashboard → Vue d'ensemble activité

✅ CYCLE CONTRAT :
   Liste contrats → Filtres/recherche → Nouveau contrat (wizard)
   → Tarification automatique → Adhérents → Création

✅ CYCLE SOUSCRIPTION :
   Liste souscriptions → Workflow (en attente → superviseur → directeur → validée)

✅ CYCLE SINISTRE :
   Liste sinistres → Types d'actes → Validation/Rejet → Alertes fraude

✅ CYCLE FINANCIER :
   Primes à échéance → Prélèvements → Encaissements → Commissions
   → Bordereaux prestataires → Paiements → Remboursements assurés

✅ PILOTAGE :
   KPI dynamiques → Graphiques comparatifs → Top prestataires
   → Production commerciale → Satisfaction → Générateur rapports

✅ PARCOURS PRESTATAIRE :
   Vérification assuré (éligibilité + garanties) → Saisie prestation
   → Contrôle temps réel → Soumission

✅ PARCOURS SOCIÉTÉ :
   Résumé contrat → Gestion adhérents (ajout/retrait)
   → Suivi primes → Mouvements personnel

✅ PARCOURS ASSURÉ :
   Carte numérique QR → Plafonds consommation
   → Historique prestations → Garanties
```

### Fonctionnalités interactives

- Navigation complète entre tous les écrans via sidebar et liens
- Onglets interactifs (Comptabilité : 3 onglets, Paiements : 2 onglets)
- Filtres par statut (tabs cliquables)
- Recherche en temps réel dans les tables
- Sélection de lignes (checkbox + select all)
- Toast notifications sur les actions (valider, créer, exporter)
- Vérification assuré avec affichage résultat dynamique
- Sélecteur d'espace sur la page de login
- Compteurs animés sur les KPIs du dashboard

---

## 📝 Notes techniques

### Technologies utilisées
- **HTML5** — Structure sémantique
- **CSS3** — Variables CSS, Flexbox, Grid, animations
- **JavaScript** (vanilla) — Interactions, navigation, toasts
- **Google Fonts** — Outfit, DM Sans, JetBrains Mono

### Navigateurs supportés
- Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

### Responsive
- L'espace Assuré est conçu en **mobile-first** (430px max-width)
- Les espaces Gestionnaire, Prestataire et Société sont optimisés pour **desktop** (1280px+)

### Conventions de nommage
- **IDs écrans** : `G-XXX` (Gestionnaire), `P-XXX` (Prestataire), `S-XXX` (Société), `A-XXX` (Assuré), `M-XXX` (Médecin)
- **CSS** : BEM-like (`.card__header`, `.stat-card__value`, `.nav-item__icon`)
- **Fichiers** : kebab-case (`contrat-nouveau.html`, `saisie-prestation.html`)

### Poids du projet
- CSS Design System : ~750 lignes
- JS interactions : ~150 lignes
- JS icônes : ~200 lignes
- 14 pages HTML : ~5 500 lignes total
- **Aucune dépendance externe** (hors Google Fonts)

---

## 📎 Documents de référence

Ces documents ont servi de base à la conception du prototype :

| Document | Contenu |
|----------|---------|
| `KOJIT_Systems_Offre_Technique.pdf` | Offre technique complète (39 pages) — Architecture, modules, planning |
| `IIPS_Inventaire_Ecrans.docx` | Inventaire détaillé des 108 écrans par espace et module |
| `IIPS_Parcours_Client.docx` | 12 étapes du parcours client (prospection → pilotage) |
| `IIPS_Analyse_Personas.docx` | 5 personas, modules fonctionnels, priorités MVP |

---

<p align="center">
  <strong>IIPS — Institut International de Prévoyance pour la Santé</strong><br>
  Prototype réalisé en février 2026<br>
  Développé par KOJIT Systems Côte d'Ivoire
</p>
