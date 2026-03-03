/**
 * IIPS v1 → v2 Conversion Script — Espace Prestataire
 * Converts all prestataire pages to v2 layout
 * Run: node convert-prestataire-v2.js
 */
const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, 'pages', 'prestataire');
const DEST_DIR = path.join(__dirname, 'pages-v2', 'prestataire');

fs.mkdirSync(DEST_DIR, { recursive: true });

// V2 Sidebar for Prestataire (Clinique — blue theme)
function generateSidebar(activeModule) {
  const items = [
    { section: 'Principal', items: [
      { href: 'dashboard.html', module: 'dashboard', label: 'Tableau de bord', icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="2" width="7" height="8"/><rect x="11" y="2" width="7" height="5"/><rect x="2" y="12" width="7" height="6"/><rect x="11" y="9" width="7" height="9"/></svg>' },
    ]},
    { section: 'Prestations', items: [
      { href: 'saisie-prestation.html', module: 'saisie-prestation', label: 'Saisie prestation', icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2H5a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7l-5-5z"/><path d="M12 2v5h5"/><line x1="7" y1="10" x2="13" y2="10"/><line x1="7" y1="13" x2="11" y2="13"/></svg>' },
      { href: 'prestations.html', module: 'prestations', label: 'Suivi prestations', icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 5H7a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><path d="M9 5a2 2 0 002-2h0a2 2 0 012 2v0H9z"/><line x1="8" y1="10" x2="12" y2="10"/><line x1="8" y1="13" x2="12" y2="13"/></svg>' },
      { href: 'historique-patient.html', module: 'historique-patient', label: 'Historique patient', icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="10" cy="7" r="4"/><path d="M3 18v-1a7 7 0 0114 0v1"/></svg>' },
      { href: 'analyses.html', module: 'analyses', label: 'Analyses', icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M8 2v4a2 2 0 01-2 2H2"/><path d="M6 18V8l6-6v4a2 2 0 002 2h4v10a2 2 0 01-2 2H8a2 2 0 01-2-2z"/><line x1="10" y1="12" x2="14" y2="12"/><line x1="10" y1="15" x2="14" y2="15"/></svg>' },
      { href: 'hospitalisation.html', module: 'hospitalisation', label: 'Hospitalisation', icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="4" width="16" height="14"/><line x1="10" y1="4" x2="10" y2="18"/><line x1="2" y1="11" x2="18" y2="11"/><path d="M8 1v3"/><path d="M12 1v3"/></svg>' },
    ]},
    { section: 'Finance', items: [
      { href: 'bordereaux.html', module: 'bordereaux', label: 'Bordereaux', icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="4" width="16" height="12"/><line x1="2" y1="9" x2="18" y2="9"/></svg>' },
      { href: 'suivi-paiements.html', module: 'suivi-paiements', label: 'Suivi paiements', icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="10" y1="2" x2="10" y2="18"/><path d="M14 5H8.5a2.5 2.5 0 000 5h3a2.5 2.5 0 010 5H6"/></svg>' },
    ]},
    { section: 'Support', items: [
      { href: 'demandes.html', module: 'demandes', label: 'Demandes', icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="2" width="12" height="16"/><line x1="8" y1="6" x2="12" y2="6"/><line x1="8" y1="10" x2="12" y2="10"/><line x1="8" y1="14" x2="10" y2="14"/></svg>' },
      { href: 'reclamations.html', module: 'reclamations', label: 'Réclamations', icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17 10c0 4.4-3.6 8-8 8a8 8 0 01-4-.9L2 18l1-3.1A7.9 7.9 0 012 10c0-4.4 3.6-8 8-8a8 8 0 018 8z"/><line x1="10" y1="7" x2="10" y2="11"/><circle cx="10" cy="14" r="0.5" fill="currentColor"/></svg>' },
      { href: 'messagerie.html', module: 'messagerie', label: 'Messagerie', icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 13a2 2 0 01-2 2H6l-4 4V4a2 2 0 012-2h12a2 2 0 012 2z"/></svg>' },
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
        <span class="sidebar__brand-name">Espace Clinique</span>
        <span class="sidebar__brand-tagline">IIPS Santé</span>
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
      html += `          <a href="${item.href}" class="nav-item${activeClass}" data-module="${item.module}" data-tooltip="${item.label}">
            <span class="nav-item__icon">${item.icon}</span>
            <span class="nav-item__label">${item.label}</span>
          </a>\n`;
    });

    html += `        </details>
      </div>\n\n`;
  });

  html += `    </nav>

    <div class="sidebar__footer">
      <div class="sidebar__user">
        <div class="sidebar__user-avatar">JK</div>
        <div class="sidebar__user-info">
          <div class="sidebar__user-name">Dr. Kouassi Jean</div>
          <div class="sidebar__user-role">Clinique Biaka Boda</div>
        </div>
        <a href="../login.html" style="color: rgba(255,255,255,0.4); margin-left: auto;" title="Déconnexion">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 15H4a2 2 0 01-2-2V5a2 2 0 012-2h2"/><polyline points="11,13 15,9 11,5"/><line x1="15" y1="9" x2="6" y2="9"/></svg>
        </a>
      </div>
    </div>
  </aside>`;

  return html;
}

// V2 Topbar for Prestataire
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
        <input type="text" class="topbar__search-input" placeholder="Rechercher un assuré, une prestation...">
        <div class="topbar__search-shortcut">
          <kbd>Ctrl</kbd><kbd>K</kbd>
        </div>
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
              <span class="topbar__notif-count">2 nouvelles</span>
            </div>
            <div class="topbar__notif-list">
              <div class="topbar__notif-item unread">
                <div class="topbar__notif-icon topbar__notif-icon--success"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3,8 6,11 13,4"/></svg></div>
                <div class="topbar__notif-content">
                  <div class="topbar__notif-title">Bordereau BRD-0042 validé — paiement en cours</div>
                  <div class="topbar__notif-meta">Il y a 30 min</div>
                </div>
              </div>
              <div class="topbar__notif-item unread">
                <div class="topbar__notif-icon topbar__notif-icon--info"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="8" r="6"/><line x1="8" y1="5" x2="8" y2="8"/><line x1="8" y1="8" x2="10" y2="10"/></svg></div>
                <div class="topbar__notif-content">
                  <div class="topbar__notif-title">Prestation PRS-0423 en attente de validation IIPS</div>
                  <div class="topbar__notif-meta">Il y a 2h</div>
                </div>
              </div>
            </div>
            <div class="topbar__notif-footer"><a href="#">Voir toutes les notifications</a></div>
          </div>
        </div>
      </div>

      <button class="topbar__user">
        <div class="topbar__user-avatar-top">JK</div>
        <span class="topbar__user-name-top">Dr. Kouassi</span>
        <svg class="topbar__user-chevron" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4,5 7,8 10,5"/></svg>
      </button>
      <div class="topbar__user-dropdown">
        <div class="topbar__user-dropdown__info">
          <div class="topbar__user-dropdown__name">Dr. Kouassi Jean</div>
          <div class="topbar__user-dropdown__role">Clinique Biaka Boda</div>
        </div>
        <a href="#" class="topbar__user-dropdown__item">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="8" cy="5" r="3"/><path d="M2 15v-1a6 6 0 0112 0v1"/></svg>
          Mon profil
        </a>
        <hr class="topbar__user-dropdown__divider">
        <a href="../login.html" class="topbar__user-dropdown__item topbar__user-dropdown__item--danger">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M5 13H3.5a1.5 1.5 0 01-1.5-1.5v-7A1.5 1.5 0 013.5 3H5"/><polyline points="9,11 13,8 9,5"/><line x1="13" y1="8" x2="5" y2="8"/></svg>
          Déconnexion
        </a>
      </div>
    </header>`;
}

// Breadcrumb mapping
const PAGE_BREADCRUMBS = {
  'dashboard.html':           { label: 'Tableau de bord', module: 'dashboard' },
  'saisie-prestation.html':   { label: 'Saisie prestation', module: 'saisie-prestation' },
  'prestations.html':         { label: 'Suivi prestations', module: 'prestations' },
  'prestation-detail.html':   { label: 'Détail prestation', module: 'prestations', parent: { href: 'prestations.html', label: 'Suivi prestations' } },
  'historique-patient.html':  { label: 'Historique patient', module: 'historique-patient' },
  'analyses.html':            { label: 'Analyses', module: 'analyses' },
  'hospitalisation.html':     { label: 'Hospitalisation', module: 'hospitalisation' },
  'bordereaux.html':          { label: 'Bordereaux', module: 'bordereaux' },
  'suivi-paiements.html':     { label: 'Suivi paiements', module: 'suivi-paiements' },
  'demandes.html':            { label: 'Demandes', module: 'demandes' },
  'reclamations.html':        { label: 'Réclamations', module: 'reclamations' },
  'messagerie.html':          { label: 'Messagerie', module: 'messagerie' },
};

// Process each file
const files = fs.readdirSync(SRC_DIR).filter(f => f.endsWith('.html'));
let count = 0;

files.forEach(file => {
  let html = fs.readFileSync(path.join(SRC_DIR, file), 'utf8');

  const breadcrumb = PAGE_BREADCRUMBS[file] || { label: file.replace('.html', ''), module: 'dashboard' };

  // 1. Add v2 CSS link after design-system.css
  html = html.replace(
    /<link rel="stylesheet" href="\.\.\/\.\.\/css\/design-system\.css">/,
    '<link rel="stylesheet" href="../../css/design-system.css">\n  <link rel="stylesheet" href="../../css/design-system-v2.css">'
  );

  // 2. Add v2 JS after main.js
  html = html.replace(
    /<script src="\.\.\/\.\.\/js\/main\.js"><\/script>/,
    '<script src="../../js/main.js"></script>\n<script src="../../js/main-v2.js"></script>'
  );

  // 3. Replace sidebar
  const sidebarRegex = /[ \t]*(?:<!--[^>]*SIDEBAR[^>]*-->[\s]*)?<aside class="sidebar">[\s\S]*?<\/aside>/;
  if (sidebarRegex.test(html)) {
    html = html.replace(sidebarRegex, generateSidebar(breadcrumb.module));
  }

  // 4. Replace topbar
  const topbarRegex = /[ \t]*(?:<!--[^>]*Top Bar[^>]*-->[\s]*)?<header class="topbar">[\s\S]*?<\/header>/;
  if (topbarRegex.test(html)) {
    html = html.replace(topbarRegex, generateTopbar(breadcrumb.label, breadcrumb.parent));
  }

  // 5. Update title
  html = html.replace(/<title>IIPS —/, '<title>IIPS v2 —');

  fs.writeFileSync(path.join(DEST_DIR, file), html);
  count++;
  console.log(`✓ ${file} → pages-v2/prestataire/${file}`);
});

console.log(`\n✅ Converted ${count} prestataire pages to v2`);
