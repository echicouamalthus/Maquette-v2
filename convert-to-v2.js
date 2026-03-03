/**
 * IIPS v1 → v2 Conversion Script
 * Converts all gestionnaire pages to v2 layout
 * Run: node convert-to-v2.js
 */
const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, 'pages', 'gestionnaire');
const DEST_DIR = path.join(__dirname, 'pages-v2', 'gestionnaire');

// Ensure dest dir exists
fs.mkdirSync(DEST_DIR, { recursive: true });

// Module → nav item mapping for active state and breadcrumb
const MODULE_MAP = {
  'dashboard':        { label: 'Tableau de bord', parent: null },
  'production':       { label: 'Production', parent: null },
  'souscription':     { label: 'Souscriptions', parent: null },
  'sinistre':         { label: 'Sinistres', parent: null },
  'pec':              { label: 'Prise en charge', parent: null },
  'confection-cartes':{ label: 'Confection Cartes', parent: null },
  'secretariat':      { label: 'Secrétariat', parent: null },
  'crm':              { label: 'CRM', parent: null },
  'comptabilite':     { label: 'Comptabilité', parent: null },
  'tresorerie':       { label: 'Trésorerie', parent: null },
  'paiement':         { label: 'Paiements', parent: null },
  'recouvrement':     { label: 'Recouvrement', parent: null },
  'ged':              { label: 'GED', parent: null },
  'reporting':        { label: 'Reporting', parent: null },
  'administration':   { label: 'Administration', parent: null },
  'configuration':    { label: 'Configuration', parent: null },
};

// V2 Sidebar template (with ACTIVE_MODULE placeholder)
function generateSidebar(activeModule) {
  const items = [
    { section: 'Principal', items: [
      { href: 'dashboard.html', module: 'dashboard', label: 'Tableau de bord', icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="7" height="8" rx="1.5"/><rect x="11" y="2" width="7" height="5" rx="1.5"/><rect x="2" y="12" width="7" height="6" rx="1.5"/><rect x="11" y="9" width="7" height="9" rx="1.5"/></svg>' },
    ]},
    { section: 'Gestion', items: [
      { href: 'contrats.html', module: 'production', label: 'Production', badge: '24', icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2H5a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7l-5-5z"/><path d="M12 2v5h5"/><line x1="7" y1="10" x2="13" y2="10"/><line x1="7" y1="13" x2="11" y2="13"/></svg>' },
      { href: 'souscriptions.html', module: 'souscription', label: 'Souscriptions', badge: '8', icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 17v-1a4 4 0 00-4-4H8a4 4 0 00-4 4v1"/><circle cx="10" cy="6" r="3.5"/><line x1="15" y1="5" x2="15" y2="9"/><line x1="13" y1="7" x2="17" y2="7"/></svg>' },
      { href: 'sinistres.html', module: 'sinistre', label: 'Sinistres', badge: '12', icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" transform="scale(0.85) translate(1.5,0)"/><line x1="10" y1="8" x2="10" y2="12"/><circle cx="10" cy="15" r="0.5" fill="currentColor"/></svg>' },
      { href: 'pec.html', module: 'pec', label: 'Prise en charge', badge: '7', icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M16 7V4a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2v-3"/><path d="M8 10h9"/><path d="M14 7l3 3-3 3"/><line x1="8" y1="6" x2="12" y2="6"/><line x1="8" y1="14" x2="11" y2="14"/></svg>' },
      { href: 'confection-cartes.html', module: 'confection-cartes', label: 'Confection Cartes', icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="2" y="4" width="16" height="12" rx="2"/><line x1="2" y1="9" x2="18" y2="9"/><line x1="6" y1="13" x2="10" y2="13"/></svg>' },
      { href: 'secretariat.html', module: 'secretariat', label: 'Secrétariat', icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="3" y="2" width="14" height="16" rx="2"/><line x1="7" y1="6" x2="13" y2="6"/><line x1="7" y1="10" x2="13" y2="10"/><line x1="7" y1="14" x2="10" y2="14"/></svg>' },
    ]},
    { section: 'Commercial', items: [
      { href: 'crm.html', module: 'crm', label: 'CRM', icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 18v-1a3 3 0 00-3-3h-1"/><path d="M13 8a3 3 0 100-6"/><path d="M12 18v-1a4 4 0 00-4-4H5a4 4 0 00-4 4v1"/><circle cx="6.5" cy="6" r="3"/></svg>' },
    ]},
    { section: 'Finance', items: [
      { href: 'comptabilite.html', module: 'comptabilite', label: 'Comptabilité', icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="10" y1="2" x2="10" y2="18"/><path d="M14 5H8.5a2.5 2.5 0 000 5h3a2.5 2.5 0 010 5H6"/></svg>' },
      { href: 'tresorerie.html', module: 'tresorerie', label: 'Trésorerie', icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="16" height="14" rx="2"/><path d="M2 7h16"/><path d="M2 11h16"/><circle cx="14" cy="14" r="2"/></svg>' },
      { href: 'paiements.html', module: 'paiement', label: 'Paiements', icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="16" height="12" rx="2"/><line x1="2" y1="9" x2="18" y2="9"/></svg>' },
      { href: 'recouvrement.html', module: 'recouvrement', label: 'Recouvrement', icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 4v6h6"/><path d="M3.51 14a8 8 0 0013.9-3.2"/><path d="M19 16v-6h-6"/><path d="M16.49 6A8 8 0 002.6 9.2"/></svg>' },
    ]},
    { section: 'Outils', items: [
      { href: 'ged.html', module: 'ged', label: 'GED', icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 16V6a2 2 0 00-2-2H9L7 2H4a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2z"/></svg>' },
      { href: 'reporting.html', module: 'reporting', label: 'Reporting', icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="15" y1="5" x2="15" y2="15"/><line x1="10" y1="8" x2="10" y2="15"/><line x1="5" y1="11" x2="5" y2="15"/></svg>' },
    ]},
    { section: 'Système', items: [
      { href: 'administration.html', module: 'administration', label: 'Administration', icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-2.82.72V20" transform="scale(0.82) translate(1.5,1.5)"/></svg>' },
      { href: 'configuration.html', module: 'configuration', label: 'Configuration', icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><line x1="3" y1="5" x2="17" y2="5"/><line x1="3" y1="10" x2="17" y2="10"/><line x1="3" y1="15" x2="17" y2="15"/><circle cx="13" cy="5" r="2" fill="currentColor"/><circle cx="7" cy="10" r="2" fill="currentColor"/><circle cx="11" cy="15" r="2" fill="currentColor"/></svg>' },
    ]},
  ];

  const chevronSvg = '<svg class="section-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4,6 8,10 12,6"/></svg>';

  let html = `  <!-- ===== SIDEBAR v2 ===== -->
  <aside class="sidebar">
    <!-- Toggle Button -->
    <button class="sidebar__toggle" onclick="toggleSidebar()" title="Réduire le menu">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="10,3 5,8 10,13"/></svg>
    </button>

    <div class="sidebar__brand">
      <img src="../../iips.jpg" alt="IIPS" class="sidebar__brand-logo">
      <div class="sidebar__brand-text">
        <span class="sidebar__brand-name">IIPS Santé</span>
        <span class="sidebar__brand-tagline">Gestion Assurance</span>
      </div>
    </div>

    <nav class="sidebar__nav">\n`;

  items.forEach(section => {
    html += `      <div class="nav-section">
        <details open>
          <summary class="nav-section__title">
            ${section.section}
            ${chevronSvg}
          </summary>\n`;

    section.items.forEach(item => {
      const isActive = item.module === activeModule;
      const activeClass = isActive ? ' active' : '';
      const badgeHtml = item.badge ? `\n            <span class="nav-item__badge">${item.badge}</span>` : '';

      html += `          <a href="${item.href}" class="nav-item${activeClass}" data-module="${item.module}" data-tooltip="${item.label}">
            <span class="nav-item__icon">${item.icon}</span>
            <span class="nav-item__label">${item.label}</span>${badgeHtml}
          </a>\n`;
    });

    html += `        </details>
      </div>\n\n`;
  });

  html += `    </nav>

    <div class="sidebar__footer">
      <div class="sidebar__user">
        <div class="sidebar__user-avatar">AD</div>
        <div class="sidebar__user-info">
          <div class="sidebar__user-name">Aminata Diabaté</div>
          <div class="sidebar__user-role">Gestionnaire santé</div>
        </div>
        <a href="../login.html" style="color: rgba(255,255,255,0.4); margin-left: auto;" title="Déconnexion">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 15H4a2 2 0 01-2-2V5a2 2 0 012-2h2"/><polyline points="11,13 15,9 11,5"/><line x1="15" y1="9" x2="6" y2="9"/></svg>
        </a>
      </div>
    </div>
  </aside>`;

  return html;
}

// V2 Topbar template
function generateTopbar(breadcrumbLabel, breadcrumbParent) {
  const parentLink = breadcrumbParent
    ? `<a href="${breadcrumbParent.href}">${breadcrumbParent.label}</a>\n        <span class="separator">/</span>\n        `
    : '';

  return `    <!-- Top Bar v2 -->
    <header class="topbar">
      <button class="topbar__hamburger" onclick="toggleSidebar()" title="Menu">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><line x1="3" y1="5" x2="17" y2="5"/><line x1="3" y1="10" x2="17" y2="10"/><line x1="3" y1="15" x2="17" y2="15"/></svg>
      </button>

      <nav class="topbar__breadcrumb">
        <a href="dashboard.html">Accueil</a>
        <span class="separator">/</span>
        ${parentLink}<span class="current">${breadcrumbLabel}</span>
      </nav>

      <div class="topbar__search">
        <span class="topbar__search-icon">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="8" cy="8" r="5.5"/><line x1="12.5" y1="12.5" x2="16" y2="16"/></svg>
        </span>
        <input type="text" class="topbar__search-input" placeholder="Rechercher un contrat, un assuré, un prestataire...">
        <div class="topbar__search-shortcut">
          <kbd>Ctrl</kbd><kbd>K</kbd>
        </div>
      </div>

      <div class="topbar__role-indicator">
        <button class="topbar__role-badge" data-dropdown>
          <span class="badge badge--primary" id="topbar-role-label">Gestionnaire</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4,5 7,8 10,5"/></svg>
        </button>
        <div class="dropdown-menu topbar__role-dropdown" id="role-switcher"></div>
      </div>

      <div class="topbar__actions">
        <button class="topbar__action-btn" title="Aide">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="8"/><path d="M7.5 7.5a2.5 2.5 0 014.87.83c0 1.67-2.5 2.5-2.5 2.5"/><circle cx="10" cy="14" r="0.5" fill="currentColor"/></svg>
        </button>
        <div class="topbar__notif-wrapper">
          <button class="topbar__action-btn topbar__notif-toggle" title="Notifications">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 7a5 5 0 00-10 0c0 5-2.5 7-2.5 7h15S15 12 15 7z"/><path d="M8.5 17a1.5 1.5 0 003 0"/></svg>
            <span class="badge-dot"></span>
          </button>
          <div class="topbar__notif-dropdown">
            <div class="topbar__notif-header">
              <h4>Notifications</h4>
              <span class="topbar__notif-count">3 nouvelles</span>
            </div>
            <div class="topbar__notif-list">
              <div class="topbar__notif-item unread">
                <div class="topbar__notif-icon topbar__notif-icon--success"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3,8 6,11 13,4"/></svg></div>
                <div class="topbar__notif-content">
                  <div class="topbar__notif-title">Contrat CTR-2026-1847 validé par le superviseur</div>
                  <div class="topbar__notif-meta">Il y a 15 min</div>
                </div>
              </div>
              <div class="topbar__notif-item unread">
                <div class="topbar__notif-icon topbar__notif-icon--warning"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3v5"/><circle cx="8" cy="11" r="0.5" fill="currentColor"/></svg></div>
                <div class="topbar__notif-content">
                  <div class="topbar__notif-title">Alerte fraude : doublon détecté — Pharmacie Salama</div>
                  <div class="topbar__notif-meta">Il y a 1h</div>
                </div>
              </div>
              <div class="topbar__notif-item unread">
                <div class="topbar__notif-icon topbar__notif-icon--info"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="8" r="6"/><line x1="8" y1="5" x2="8" y2="8"/><line x1="8" y1="8" x2="10" y2="10"/></svg></div>
                <div class="topbar__notif-content">
                  <div class="topbar__notif-title">Échéance renouvellement SOTRA CI dans 15 jours</div>
                  <div class="topbar__notif-meta">Il y a 3h</div>
                </div>
              </div>
            </div>
            <div class="topbar__notif-footer"><a href="#">Voir toutes les notifications</a></div>
          </div>
        </div>
      </div>

      <button class="topbar__user">
        <div class="topbar__user-avatar-top">AD</div>
        <span class="topbar__user-name-top">Aminata</span>
        <svg class="topbar__user-chevron" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4,5 7,8 10,5"/></svg>
      </button>
      <div class="topbar__user-dropdown">
        <div class="topbar__user-dropdown__info">
          <div class="topbar__user-dropdown__name">Aminata Diabaté</div>
          <div class="topbar__user-dropdown__role">Gestionnaire santé</div>
        </div>
        <a href="profil.html" class="topbar__user-dropdown__item">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="8" cy="5" r="3"/><path d="M2 15v-1a6 6 0 0112 0v1"/></svg>
          Mon profil
        </a>
        <a href="configuration.html" class="topbar__user-dropdown__item">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="8" cy="8" r="2.5"/><path d="M13.5 8a5.5 5.5 0 01-.3 1.8"/></svg>
          Paramètres
        </a>
        <hr class="topbar__user-dropdown__divider">
        <a href="../login.html" class="topbar__user-dropdown__item topbar__user-dropdown__item--danger">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M5 13H3.5a1.5 1.5 0 01-1.5-1.5v-7A1.5 1.5 0 013.5 3H5"/><polyline points="9,11 13,8 9,5"/><line x1="13" y1="8" x2="5" y2="8"/></svg>
          Déconnexion
        </a>
      </div>
    </header>`;
}

// Page title → breadcrumb mapping
const PAGE_BREADCRUMBS = {
  'contrats.html':               { label: 'Production', module: 'production' },
  'contrat-nouveau.html':        { label: 'Nouveau contrat', module: 'production', parent: { href: 'contrats.html', label: 'Production' } },
  'contrat-detail.html':         { label: 'Détail contrat', module: 'production', parent: { href: 'contrats.html', label: 'Production' } },
  'contrat-adherents.html':      { label: 'Adhérents', module: 'production', parent: { href: 'contrats.html', label: 'Production' } },
  'contrat-attestation.html':    { label: 'Attestation', module: 'production', parent: { href: 'contrats.html', label: 'Production' } },
  'contrat-cartes.html':         { label: 'Cartes', module: 'production', parent: { href: 'contrats.html', label: 'Production' } },
  'contrat-historique.html':     { label: 'Historique', module: 'production', parent: { href: 'contrats.html', label: 'Production' } },
  'contrat-resiliation.html':    { label: 'Résiliation', module: 'production', parent: { href: 'contrats.html', label: 'Production' } },
  'contrat-suspension.html':     { label: 'Suspension', module: 'production', parent: { href: 'contrats.html', label: 'Production' } },
  'souscriptions.html':          { label: 'Souscriptions', module: 'souscription' },
  'souscription-nouvelle.html':  { label: 'Nouvelle souscription', module: 'souscription', parent: { href: 'souscriptions.html', label: 'Souscriptions' } },
  'souscription-detail.html':    { label: 'Détail souscription', module: 'souscription', parent: { href: 'souscriptions.html', label: 'Souscriptions' } },
  'souscription-avenant.html':   { label: 'Mise à jour contractuelle', module: 'souscription', parent: { href: 'souscriptions.html', label: 'Souscriptions' } },
  'souscription-workflow.html':  { label: 'Workflow validation', module: 'souscription', parent: { href: 'souscriptions.html', label: 'Souscriptions' } },
  'sinistres.html':              { label: 'Sinistres', module: 'sinistre' },
  'sinistre-detail.html':        { label: 'Détail sinistre', module: 'sinistre', parent: { href: 'sinistres.html', label: 'Sinistres' } },
  'sinistre-regularisation.html':{ label: 'Régularisation', module: 'sinistre', parent: { href: 'sinistres.html', label: 'Sinistres' } },
  'sinistre-prestation.html':    { label: 'Prestation', module: 'sinistre', parent: { href: 'sinistres.html', label: 'Sinistres' } },
  'alertes-fraudes.html':        { label: 'Alertes fraudes', module: 'sinistre', parent: { href: 'sinistres.html', label: 'Sinistres' } },
  'pec.html':                    { label: 'Prise en charge', module: 'pec' },
  'pec-detail.html':             { label: 'Détail PEC', module: 'pec', parent: { href: 'pec.html', label: 'Prise en charge' } },
  'confection-cartes.html':      { label: 'Confection Cartes', module: 'confection-cartes' },
  'secretariat.html':            { label: 'Secrétariat', module: 'secretariat' },
  'crm.html':                    { label: 'CRM', module: 'crm' },
  'prospect-detail.html':        { label: 'Détail prospect', module: 'crm', parent: { href: 'crm.html', label: 'CRM' } },
  'prospect-detail-qualifie.html':{ label: 'Prospect qualifié', module: 'crm', parent: { href: 'crm.html', label: 'CRM' } },
  'comptabilite.html':           { label: 'Comptabilité', module: 'comptabilite' },
  'encaissement-nouveau.html':   { label: 'Nouvel encaissement', module: 'comptabilite', parent: { href: 'comptabilite.html', label: 'Comptabilité' } },
  'commission-detail.html':      { label: 'Détail commission', module: 'comptabilite', parent: { href: 'comptabilite.html', label: 'Comptabilité' } },
  'tresorerie.html':             { label: 'Trésorerie', module: 'tresorerie' },
  'paiements.html':              { label: 'Paiements', module: 'paiement' },
  'bordereau-detail.html':       { label: 'Détail bordereau', module: 'paiement', parent: { href: 'paiements.html', label: 'Paiements' } },
  'remboursement-detail.html':   { label: 'Détail remboursement', module: 'paiement', parent: { href: 'paiements.html', label: 'Paiements' } },
  'recouvrement.html':           { label: 'Recouvrement', module: 'recouvrement' },
  'ged.html':                    { label: 'GED', module: 'ged' },
  'reporting.html':              { label: 'Reporting', module: 'reporting' },
  'administration.html':         { label: 'Administration', module: 'administration' },
  'utilisateur-detail.html':     { label: 'Détail utilisateur', module: 'administration', parent: { href: 'administration.html', label: 'Administration' } },
  'configuration.html':          { label: 'Configuration', module: 'configuration' },
  'reseau-soins.html':           { label: 'Réseau de soins', module: 'configuration', parent: { href: 'configuration.html', label: 'Configuration' } },
  'profil.html':                 { label: 'Mon profil', module: 'dashboard' },
};

// Process each file
const files = fs.readdirSync(SRC_DIR).filter(f => f.endsWith('.html') && f !== 'dashboard.html');
let count = 0;

files.forEach(file => {
  let html = fs.readFileSync(path.join(SRC_DIR, file), 'utf8');

  // Get page module
  const moduleMatch = html.match(/data-page-module="([^"]+)"/);
  const pageModule = moduleMatch ? moduleMatch[1] : 'dashboard';

  // Get breadcrumb info
  const breadcrumb = PAGE_BREADCRUMBS[file] || { label: file.replace('.html', ''), module: pageModule };

  // 1. Add v2 CSS link after design-system.css
  html = html.replace(
    /<link rel="stylesheet" href="\.\.\/\.\.\/css\/design-system\.css">/,
    '<link rel="stylesheet" href="../../css/design-system.css">\n  <link rel="stylesheet" href="../../css/design-system-v2.css">'
  );

  // 2. Add v2 JS after main.js (before </body>)
  html = html.replace(
    /<script src="\.\.\/\.\.\/js\/main\.js"><\/script>/,
    '<script src="../../js/main.js"></script>\n<script src="../../js/main-v2.js"></script>'
  );

  // 3. Replace sidebar (everything from <aside class="sidebar"> to </aside>)
  const sidebarRegex = /[ \t]*(?:<!--[^>]*SIDEBAR[^>]*-->[\s]*)?<aside class="sidebar">[\s\S]*?<\/aside>/;
  if (sidebarRegex.test(html)) {
    html = html.replace(sidebarRegex, generateSidebar(breadcrumb.module));
  }

  // 4. Replace topbar (everything from <header class="topbar"> to first </header>)
  const topbarRegex = /[ \t]*(?:<!--[^>]*Top Bar[^>]*-->[\s]*)?<header class="topbar">[\s\S]*?<\/header>/;
  if (topbarRegex.test(html)) {
    html = html.replace(topbarRegex, generateTopbar(breadcrumb.label, breadcrumb.parent));
  }

  // 5. Update title to include v2
  html = html.replace(/<title>IIPS —/, '<title>IIPS v2 —');

  // Write v2 file
  fs.writeFileSync(path.join(DEST_DIR, file), html);
  count++;
  console.log(`✓ ${file} → pages-v2/gestionnaire/${file}`);
});

console.log(`\n✅ Converted ${count} pages to v2`);
