# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**IIPS** — Static HTML/CSS/JS prototype for a health insurance management system (Logiciel de Gestion Assurance Santé) for Institut International de Prévoyance pour la Santé, developed by KOJIT Systems Côte d'Ivoire.

## Running the Prototype

No build tools, no framework. Serve statically:

```bash
pnpm dlx serve . -l 8080
```

Open `http://localhost:8080` — `index.html` redirects automatically to the login page.

## Project Structure

```
Maquette/
├── index.html                          # Redirect to login
├── css/
│   ├── design-system.css               # Design system (tokens, components, layout)
│   ├── production.css                  # Module Production styles
│   ├── souscription.css                # Module Souscription styles
│   └── sinistre.css                    # Module Sinistres styles
├── js/
│   ├── icons.js                        # SVG icon library
│   └── main.js                         # Interactions (nav, modals, tabs, toasts)
└── pages/
    ├── login.html                      # G-001: Login with space selector
    └── gestionnaire/
        ├── dashboard.html              # G-002: Tableau de bord
        ├── contrats.html               # G-010: Liste des contrats (Production)
        ├── contrat-nouveau.html        # G-011: Nouveau contrat (Production)
        ├── contrat-detail.html         # G-012: Détail contrat (Production)
        ├── souscriptions.html          # G-020: Liste des souscriptions
        ├── souscription-nouvelle.html  # G-021: Nouvelle souscription
        ├── souscription-detail.html    # G-022: Détail souscription
        ├── souscription-avenant.html   # G-025: Mise à jour contractuelle
        ├── sinistres.html              # G-030: Liste des sinistres
        ├── sinistre-detail.html        # G-032: Détail sinistre
        ├── comptabilite.html           # G-050: Comptabilité (placeholder)
        ├── paiements.html              # G-060: Paiements (placeholder)
        └── reporting.html              # G-080: Reporting (placeholder)
```

Asset paths use relative references based on directory depth:
- `pages/*.html` → `../css/`, `../js/`
- `pages/gestionnaire/*.html` → `../../css/`, `../../js/`

## Architecture

### App Shell Pattern

Every interior page uses the same layout skeleton:

```html
<div class="app-shell">
  <aside class="sidebar"><!-- nav items --></aside>
  <main class="app-main">
    <header class="topbar"><!-- search, notifications, profile --></header>
    <div class="app-content"><!-- page-specific content --></div>
  </main>
</div>
```

Copy this structure (sidebar + topbar) from `dashboard.html` when creating new pages.

### Four User Spaces

The app has 4 role-based portals, each planned as a subdirectory under `pages/`:
- **Gestionnaire** — IIPS staff managing contracts, claims, accounting
- **Prestataire** — Healthcare provider portal
- **Société** — Corporate client portal
- **Assuré** — Individual insured portal

### File Responsibilities

| File | Role |
|------|------|
| `design-system.css` | Single source of truth for all styles — 19 numbered sections covering tokens, layout, components, and utilities |
| `production.css` | Module-specific styles for Production pages (G-010 to G-018): contract cards, comparison grids, guarantee cards, workflow steps |
| `souscription.css` | Module-specific styles for Souscription pages (G-020 to G-025): doc-checklist, form sections, info grids, diff rows |
| `sinistre.css` | Module-specific styles for Sinistres pages (G-030 to G-034): acte-tags, fraud alerts, claim headers, remboursement cards |
| `icons.js` | SVG icon library as a `const ICONS` object with an `icon(name)` helper. All icons use `stroke="currentColor"` |
| `main.js` | All JS behaviors: sidebar nav, tabs, modals (`openModal`/`closeModal`), toasts (`showToast`), dropdowns, table row selection, animated counters (`data-count`), table search filter (`data-filter-table`), sidebar collapse (`toggleSidebar`) |
| `login.html` | Self-contained (inline styles/scripts) login page with role/space selector |
| `dashboard.html` | Gestionnaire dashboard demonstrating all major design system components |

## Key Design Tokens

```css
--iips-primary: #0B6E4F    /* Green — primary actions */
--iips-secondary: #1B4965  /* Blue — secondary info */
--iips-accent: #E8871E     /* Orange — attention/CTA */
```

Fonts: `Outfit` (display/headings), `DM Sans` (body), `JetBrains Mono` (codes/references).

## Conventions

- **CSS naming:** BEM-like — `.block__element--modifier` (e.g., `.stat-card__trend--up`, `.badge--success`)
- **Icons:** Always use `stroke="currentColor"` and `stroke-width="1.8"` for consistency
- **Navigation:** Traditional multi-page (no SPA/client-side router) — each screen is a separate HTML file
- **Language:** All UI text is in French. Currency is FCFA
- **Screen codes:** Each screen has a reference code (e.g., G-001 = Login, G-002 = Dashboard, G-010 = Contrats list)

## Adding a New Page

1. Create the HTML file in the correct subdirectory (e.g., `pages/gestionnaire/`)
2. Link the design system CSS and load `icons.js` before body content, then `main.js` at end of body — adjust relative paths for directory depth
3. Use the `.app-shell` layout structure (copy sidebar + topbar from `dashboard.html`)
4. Set the correct `.active` class on the corresponding `.nav-item` in the sidebar

## JS API for Interactions

```js
openModal('modal-id')           // Show a modal
closeModal('modal-id')          // Hide a modal
showToast('Message', 'success') // Types: success, error, warning, info
toggleSidebar()                 // Collapse/expand sidebar
```

Declarative attributes: `data-tab="name"` for tabs, `data-count="1847"` for animated counters, `data-filter-table="tableId"` for table search.
