/**
 * IIPS v1 → v2 Conversion Script — Espace Médecin
 * Converts all médecin pages to v2 layout
 * Run: node convert-medecin-v2.js
 */
const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, 'pages', 'medecin');
const DEST_DIR = path.join(__dirname, 'pages-v2', 'medecin');

fs.mkdirSync(DEST_DIR, { recursive: true });

// V2 Sidebar for Médecin (teal theme)
function generateSidebar(activeModule) {
  const items = [
    { section: 'Principal', items: [
      { href: 'dashboard.html', module: 'dashboard', label: 'Tableau de bord', icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="2" width="7" height="8"/><rect x="11" y="2" width="7" height="5"/><rect x="2" y="12" width="7" height="6"/><rect x="11" y="9" width="7" height="9"/></svg>' },
    ]},
    { section: 'Consultations', items: [
      { href: 'rendez-vous.html', module: 'rendez-vous', label: 'Rendez-vous', badge: '6', icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="14" height="14"/><line x1="3" y1="8" x2="17" y2="8"/><line x1="7" y1="2" x2="7" y2="6"/><line x1="13" y1="2" x2="13" y2="6"/></svg>' },
      { href: 'ordonnances.html', module: 'ordonnances', label: 'Ordonnances', icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 2H6a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2z"/><line x1="8" y1="7" x2="12" y2="7"/><line x1="8" y1="10" x2="12" y2="10"/><line x1="8" y1="13" x2="10" y2="13"/></svg>' },
      { href: 'teleconsultation.html', module: 'teleconsultation', label: 'Téléconsultation', icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="3" width="16" height="11"/><line x1="7" y1="17" x2="13" y2="17"/><line x1="10" y1="14" x2="10" y2="17"/></svg>' },
    ]},
    { section: 'Validation', items: [
      { href: 'dossiers.html', module: 'dossiers', label: 'Dossiers médicaux', badge: '18', icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 16V6a2 2 0 00-2-2H9L7 2H4a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2z"/></svg>' },
      { href: 'avis.html', module: 'avis', label: 'Avis rendus', icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2H5a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7l-5-5z"/><path d="M12 2v5h5"/><line x1="7" y1="10" x2="13" y2="10"/><line x1="7" y1="13" x2="11" y2="13"/></svg>' },
    ]},
    { section: 'Surveillance', items: [
      { href: 'protocoles.html', module: 'protocoles', label: 'Protocoles', icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 2H4a2 2 0 00-2 2v1a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2h-5"/><line x1="10" y1="7" x2="10" y2="18"/><path d="M6 18h8"/></svg>' },
      { href: 'alertes.html', module: 'alertes', label: 'Alertes médicales', badge: '5', icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" transform="scale(0.85) translate(1.5,0)"/><line x1="10" y1="8" x2="10" y2="12"/><circle cx="10" cy="15" r="0.5" fill="currentColor"/></svg>' },
    ]},
    { section: 'Support', items: [
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
        <span class="sidebar__brand-name">Espace Médecin</span>
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
        <div class="sidebar__user-avatar">KS</div>
        <div class="sidebar__user-info">
          <div class="sidebar__user-name">Dr. Konaté Seydou</div>
          <div class="sidebar__user-role">Médecin-conseil IIPS</div>
        </div>
        <a href="../login.html" style="color: rgba(255,255,255,0.4); margin-left: auto;" title="Déconnexion">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 15H4a2 2 0 01-2-2V5a2 2 0 012-2h2"/><polyline points="11,13 15,9 11,5"/><line x1="15" y1="9" x2="6" y2="9"/></svg>
        </a>
      </div>
    </div>
  </aside>`;

  return html;
}

// V2 Topbar for Médecin
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
        <input type="text" class="topbar__search-input" placeholder="Rechercher un dossier, un patient...">
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
              <span class="topbar__notif-count">3 nouvelles</span>
            </div>
            <div class="topbar__notif-list">
              <div class="topbar__notif-item unread">
                <div class="topbar__notif-icon topbar__notif-icon--warning"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3v5"/><circle cx="8" cy="11" r="0.5" fill="currentColor"/></svg></div>
                <div class="topbar__notif-content">
                  <div class="topbar__notif-title">3 dossiers urgents nécessitent un avis médical</div>
                  <div class="topbar__notif-meta">Il y a 20 min</div>
                </div>
              </div>
              <div class="topbar__notif-item unread">
                <div class="topbar__notif-icon topbar__notif-icon--info"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="8" r="6"/><line x1="8" y1="5" x2="8" y2="8"/><line x1="8" y1="8" x2="10" y2="10"/></svg></div>
                <div class="topbar__notif-content">
                  <div class="topbar__notif-title">Alerte surconsommation — Pharmacie Salama</div>
                  <div class="topbar__notif-meta">Il y a 1h</div>
                </div>
              </div>
              <div class="topbar__notif-item unread">
                <div class="topbar__notif-icon topbar__notif-icon--success"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3,8 6,11 13,4"/></svg></div>
                <div class="topbar__notif-content">
                  <div class="topbar__notif-title">Protocole PTL-007 validé par la direction</div>
                  <div class="topbar__notif-meta">Il y a 3h</div>
                </div>
              </div>
            </div>
            <div class="topbar__notif-footer"><a href="#">Voir toutes les notifications</a></div>
          </div>
        </div>
      </div>

      <button class="topbar__user">
        <div class="topbar__user-avatar-top">KS</div>
        <span class="topbar__user-name-top">Dr. Konaté</span>
        <svg class="topbar__user-chevron" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4,5 7,8 10,5"/></svg>
      </button>
      <div class="topbar__user-dropdown">
        <div class="topbar__user-dropdown__info">
          <div class="topbar__user-dropdown__name">Dr. Konaté Seydou</div>
          <div class="topbar__user-dropdown__role">Médecin-conseil IIPS</div>
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
  'dashboard.html':        { label: 'Tableau de bord', module: 'dashboard' },
  'rendez-vous.html':      { label: 'Rendez-vous', module: 'rendez-vous' },
  'ordonnances.html':      { label: 'Ordonnances', module: 'ordonnances' },
  'teleconsultation.html': { label: 'Téléconsultation', module: 'teleconsultation' },
  'dossiers.html':         { label: 'Dossiers médicaux', module: 'dossiers' },
  'dossier-patient.html':  { label: 'Dossier patient', module: 'dossiers', parent: { href: 'dossiers.html', label: 'Dossiers médicaux' } },
  'avis.html':             { label: 'Avis rendus', module: 'avis' },
  'protocoles.html':       { label: 'Protocoles', module: 'protocoles' },
  'alertes.html':          { label: 'Alertes médicales', module: 'alertes' },
  'statistiques.html':     { label: 'Statistiques', module: 'dashboard' },
  'parametres.html':       { label: 'Paramètres', module: 'dashboard' },
  'messagerie.html':       { label: 'Messagerie', module: 'messagerie' },
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
  console.log(`✓ ${file} → pages-v2/medecin/${file}`);
});

console.log(`\n✅ Converted ${count} médecin pages to v2`);
