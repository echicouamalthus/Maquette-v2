/* ============================================================
   IIPS Prototype — Main JavaScript
   Navigation, Modals, Tabs, Interactions
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  // --- Role-Based Access Filtering ---
  (function applyRoleFiltering() {
    if (typeof IIPS_ROLES === 'undefined') return;

    var roleKey = getCurrentRole();
    var role = getRoleConfig(roleKey);
    var persona = role.persona;
    var allowedModules = role.modules;

    // 1. Filter nav items by data-module attribute
    document.querySelectorAll('.nav-item[data-module]').forEach(function (item) {
      var mod = item.getAttribute('data-module');
      if (allowedModules.indexOf(mod) === -1) {
        item.style.display = 'none';
      }
    });

    // 2. Hide entire nav-sections if all their nav-items are hidden
    document.querySelectorAll('.nav-section').forEach(function (section) {
      var items = section.querySelectorAll('.nav-item');
      if (items.length === 0) return;
      var allHidden = true;
      items.forEach(function (item) {
        if (item.style.display !== 'none') allHidden = false;
      });
      if (allHidden) section.style.display = 'none';
    });

    // 3. Update sidebar user info
    var userNameEl = document.querySelector('.sidebar__user-name');
    var userRoleEl = document.querySelector('.sidebar__user-role');
    var userAvatarEl = document.querySelector('.sidebar__user-avatar');
    if (userNameEl) userNameEl.textContent = persona.name;
    if (userRoleEl) userRoleEl.textContent = persona.title;
    if (userAvatarEl) userAvatarEl.textContent = persona.initials;

    // 4. Update page header greeting
    var subtitle = document.querySelector('.page-header__subtitle');
    if (subtitle && subtitle.textContent.indexOf('Bienvenue') !== -1) {
      subtitle.textContent = 'Bienvenue, ' + persona.name.split(' ')[0] + '. Voici un aperçu de votre activité.';
    }

    // 5. Filter dashboard widgets by role modules
    document.querySelectorAll('[data-dash-modules]').forEach(function (widget) {
      var requiredModules = widget.getAttribute('data-dash-modules').split(',');
      var hasAccess = requiredModules.some(function (m) {
        return allowedModules.indexOf(m.trim()) !== -1;
      });
      if (!hasAccess) widget.style.display = 'none';
    });

    // 6. Re-adjust KPI grid after hiding cards
    var kpiGrid = document.querySelector('.grid.grid-4');
    if (kpiGrid) {
      var visibleCards = kpiGrid.querySelectorAll('.stat-card:not([style*="display: none"])');
      var count = visibleCards.length;
      if (count > 0 && count < 4) {
        kpiGrid.style.gridTemplateColumns = 'repeat(' + count + ', 1fr)';
      }
    }

    // 7. Page access protection (toast warning instead of redirect for prototype navigation)
    var homePage = role.homePage || 'dashboard.html';
    var pageModule = document.body.getAttribute('data-page-module');
    var currentPage = window.location.pathname.split('/').pop();
    var isHomePage = (currentPage === homePage);

    if (pageModule && pageModule !== 'dashboard' && !isHomePage && allowedModules.indexOf(pageModule) === -1) {
      // Show warning toast instead of redirecting — allows prototype browsing
      setTimeout(function () {
        if (typeof showToast === 'function') {
          showToast('Le rôle « ' + role.shortLabel + ' » n\'a pas accès au module « ' + pageModule + ' ». Changez de rôle dans la topbar.', 'warning');
        }
      }, 500);
    }

    // 8. Role switcher dropdown
    var switcher = document.getElementById('role-switcher');
    var roleLabel = document.getElementById('topbar-role-label');
    if (switcher) {
      Object.keys(IIPS_ROLES).forEach(function (key) {
        var r = IIPS_ROLES[key];
        var option = document.createElement('button');
        option.className = 'topbar__role-option' + (r.key === roleKey ? ' active' : '');
        option.innerHTML =
          '<div>' +
            '<div class="topbar__role-option__label">' + r.label + '</div>' +
            '<div class="topbar__role-option__desc">' + r.description + '</div>' +
          '</div>';
        option.addEventListener('click', function () {
          setCurrentRole(r.key);
          var targetHome = r.homePage || 'dashboard.html';
          window.location.href = targetHome;
        });
        switcher.appendChild(option);
      });
    }
    if (roleLabel) {
      roleLabel.textContent = role.shortLabel;
    }
  })();

  // --- Sidebar Navigation Active State ---
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', function () {
      // Only prevent default for "#" links
      if (this.getAttribute('href') === '#') {
        event.preventDefault();
      }
      navItems.forEach(i => i.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // --- Tabs ---
  document.querySelectorAll('.tabs').forEach(tabGroup => {
    const tabs = tabGroup.querySelectorAll('.tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', function () {
        tabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        // Show corresponding tab panel
        const target = this.dataset.tab;
        if (target) {
          const panels = this.closest('.card, .tab-container')?.querySelectorAll('.tab-panel');
          panels?.forEach(p => {
            const panelId = p.id || p.getAttribute('data-tab-panel');
            p.style.display = panelId === target ? 'block' : 'none';
          });
        }
      });
    });
  });

  // --- Modal Management ---
  window.openModal = function (modalId) {
    const backdrop = document.getElementById(modalId);
    if (backdrop) {
      backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeModal = function (modalId) {
    const backdrop = document.getElementById(modalId);
    if (backdrop) {
      backdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  // Close modal on backdrop click
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', function (e) {
      if (e.target === this) {
        this.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // --- Toast Notifications ---
  window.showToast = function (message, type = 'success', duration = 4000) {
    const icons = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ'
    };

    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.innerHTML = `
      <span style="font-size: 18px; font-weight: 700;">${icons[type]}</span>
      <div>
        <div style="font-weight: 600; font-size: 14px; color: var(--gray-900);">${type === 'success' ? 'Succès' : type === 'error' ? 'Erreur' : type === 'warning' ? 'Attention' : 'Information'}</div>
        <div style="font-size: 13px; color: var(--gray-600); margin-top: 2px;">${message}</div>
      </div>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(40px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  };

  // --- Dropdown Toggle ---
  document.querySelectorAll('[data-dropdown]').forEach(trigger => {
    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      const dropdown = this.nextElementSibling;
      if (dropdown) {
        dropdown.classList.toggle('active');
      }
    });
  });

  document.addEventListener('click', function () {
    document.querySelectorAll('.dropdown-menu.active').forEach(d => {
      d.classList.remove('active');
    });
  });

  // --- Table Row Selection ---
  document.querySelectorAll('.table__checkbox input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function () {
      const row = this.closest('tr');
      if (row) {
        row.classList.toggle('selected', this.checked);
      }
    });
  });

  // --- Select All Checkbox ---
  document.querySelectorAll('.select-all-checkbox').forEach(selectAll => {
    selectAll.addEventListener('change', function () {
      const table = this.closest('table');
      const checkboxes = table.querySelectorAll('tbody .table__checkbox input');
      checkboxes.forEach(cb => {
        cb.checked = selectAll.checked;
        cb.dispatchEvent(new Event('change'));
      });
    });
  });

  // --- Animated Counters ---
  function animateCounter(element, target, duration = 1000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        element.textContent = target.toLocaleString('fr-FR');
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(start).toLocaleString('fr-FR');
      }
    }, 16);
  }

  // Animate stat cards on page load
  document.querySelectorAll('.stat-card__value[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    if (!isNaN(target)) {
      animateCounter(el, target);
    }
  });

  // --- Search Input Filter (for list pages) ---
  const filterInputs = document.querySelectorAll('[data-filter-table]');
  filterInputs.forEach(input => {
    input.addEventListener('input', function () {
      const tableId = this.dataset.filterTable;
      const table = document.getElementById(tableId);
      if (!table) return;
      
      const query = this.value.toLowerCase();
      const rows = table.querySelectorAll('tbody tr');
      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(query) ? '' : 'none';
      });
    });
  });

  // --- Sidebar Collapse Toggle ---
  window.toggleSidebar = function () {
    const sidebar = document.querySelector('.sidebar');
    const main = document.querySelector('.app-main');
    sidebar.classList.toggle('collapsed');
    main.classList.toggle('sidebar-collapsed');
  };

  // --- Staggered Animations ---
  const animatedElements = document.querySelectorAll('.animate-in');
  animatedElements.forEach((el, i) => {
    el.style.animationDelay = `${i * 0.05}s`;
  });

  // --- Demo Companies Data ---
  window.DEMO_COMPANIES = [
    {
      raisonSociale: 'SOTRA CI',
      denomination: 'Société des Transports Abidjanais',
      rccm: 'CI-ABJ-1999-B09-03214',
      dgi: 'CI-0098321-T',
      secteur: 'Transport',
      effectif: 450,
      nomDG: 'M. Konan Yves',
      telDG: '+225 21 24 90 00',
      responsableRH: 'Mme Traoré Aminata — DRH',
      emailRH: 'drh@sotra.ci',
      telRH: '+225 21 24 90 10',
      adresse: 'Boulevard de Vridi, Treichville — Abidjan',
      ville: 'Abidjan',
      personneContact: 'Mme Traoré Aminata — Directrice des Ressources Humaines'
    },
    {
      raisonSociale: 'CIE',
      denomination: 'Compagnie Ivoirienne d\'Électricité',
      rccm: 'CI-ABJ-1990-B05-01456',
      dgi: 'CI-0045123-E',
      secteur: 'Énergie',
      effectif: 1250,
      nomDG: 'M. Diarrassouba Karim',
      telDG: '+225 21 23 33 00',
      responsableRH: 'M. Koné Amadou — DRH',
      emailRH: 'rh@cie.ci',
      telRH: '+225 21 23 33 15',
      adresse: '1, Place de la République, Plateau — Abidjan',
      ville: 'Abidjan',
      personneContact: 'M. Koné Amadou — Directeur des Ressources Humaines'
    },
    {
      raisonSociale: 'SODECI',
      denomination: 'Société de Distribution d\'Eau de Côte d\'Ivoire',
      rccm: 'CI-ABJ-1987-B03-00987',
      dgi: 'CI-0034567-W',
      secteur: 'Énergie',
      effectif: 320,
      nomDG: 'M. Sylla Boubacar',
      telDG: '+225 21 23 40 00',
      responsableRH: 'Mme Diallo Fatoumata — DRH',
      emailRH: 'drh@sodeci.ci',
      telRH: '+225 21 23 40 20',
      adresse: 'Rue Botreau Roussel, Plateau — Abidjan',
      ville: 'Abidjan',
      personneContact: 'Mme Diallo Fatoumata — Directrice des Ressources Humaines'
    },
    {
      raisonSociale: 'Ivoire Agro-Business SA',
      denomination: 'Ivoire Agro-Business Société Anonyme',
      rccm: 'CI-ABJ-2023-M14-07892',
      dgi: 'CI-0289341-A',
      secteur: 'Agro-industrie',
      effectif: 85,
      nomDG: 'M. Touré Sekou',
      telDG: '+225 27 20 31 45 00',
      responsableRH: 'Mme Coulibaly Mariam — DRH',
      emailRH: 'drh@ivoireagro.ci',
      telRH: '+225 27 20 31 45 78',
      adresse: 'Zone Industrielle de Yopougon, Lot 247, Abidjan',
      ville: 'Abidjan',
      personneContact: 'Mme Coulibaly Mariam — Directrice des Ressources Humaines'
    },
    {
      raisonSociale: 'AERIA CI',
      denomination: 'Aéroport International Félix Houphouët-Boigny',
      rccm: 'CI-ABJ-2001-B12-05432',
      dgi: 'CI-0145789-R',
      secteur: 'Transport',
      effectif: 85,
      nomDG: 'M. Ouédraogo Alassane',
      telDG: '+225 21 27 72 40 01',
      responsableRH: 'Mme Aka Christelle — DRH',
      emailRH: 'drh@aeria.ci',
      telRH: '+225 21 27 72 40 00',
      adresse: '07 BP 148, Abidjan 07 — Port-Bouët',
      ville: 'Abidjan',
      personneContact: 'Mme Aka Christelle — Directrice des Ressources Humaines'
    },
    {
      raisonSociale: 'Petro Ivoire SA',
      denomination: 'Petro Ivoire Société Anonyme',
      rccm: 'CI-ABJ-2005-B08-04521',
      dgi: 'CI-0187654-P',
      secteur: 'Énergie',
      effectif: 320,
      nomDG: 'M. Kouadio Bertin',
      telDG: '+225 21 25 60 00',
      responsableRH: 'Mme N\'Guessan Viviane — DRH',
      emailRH: 'drh@petroivoire.ci',
      telRH: '+225 21 25 60 15',
      adresse: 'Zone 4C, Rue Paul Langevin, Marcory — Abidjan',
      ville: 'Abidjan',
      personneContact: 'Mme N\'Guessan Viviane — Directrice des Ressources Humaines'
    },
    {
      raisonSociale: 'CIMAF Côte d\'Ivoire',
      denomination: 'Ciments de l\'Afrique — Côte d\'Ivoire',
      rccm: 'CI-SPE-2012-B06-02345',
      dgi: 'CI-0234567-C',
      secteur: 'Industrie',
      effectif: 450,
      nomDG: 'M. Benani Hassan',
      telDG: '+225 34 79 20 00',
      responsableRH: 'M. Bamba Lacina — RAF',
      emailRH: 'rh@cimaf.ci',
      telRH: '+225 34 79 20 10',
      adresse: 'Zone Industrielle, San Pedro',
      ville: 'San Pedro',
      personneContact: 'M. Bamba Lacina — Responsable Administratif et Financier'
    }
  ];

  // --- Company Search Autocomplete ---
  window.initCompanySearch = function(config) {
    var container = document.getElementById(config.containerId);
    if (!container) return;

    var inputWrapper = container.querySelector('.company-search__input-wrapper');
    var input = container.querySelector('.company-search__input');
    var clearBtn = container.querySelector('.company-search__clear');
    var dropdown = container.querySelector('.company-search__dropdown');
    var selectedCard = container.querySelector('.company-search__selected');
    var changeBtn = container.querySelector('.company-search__change-btn');
    var companies = config.companies || [];
    var highlightIndex = -1;

    function renderDropdown(query) {
      var q = (query || '').toLowerCase().trim();
      dropdown.innerHTML = '';
      highlightIndex = -1;

      var filtered = companies.filter(function(c) {
        return c.raisonSociale.toLowerCase().indexOf(q) !== -1 ||
               c.denomination.toLowerCase().indexOf(q) !== -1 ||
               c.rccm.toLowerCase().indexOf(q) !== -1;
      });

      if (filtered.length === 0 && q.length > 0) {
        var noRes = document.createElement('div');
        noRes.className = 'company-search__no-results';
        noRes.textContent = 'Aucune entreprise trouvée pour "' + query + '"';
        dropdown.appendChild(noRes);
      }

      filtered.forEach(function(company) {
        var option = document.createElement('button');
        option.type = 'button';
        option.className = 'company-search__option';

        var name = company.raisonSociale;
        if (q.length > 0) {
          var regex = new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
          name = name.replace(regex, '<mark>$1</mark>');
        }

        option.innerHTML =
          '<div class="company-search__option-icon">' + icon('building') + '</div>' +
          '<div class="company-search__option-info">' +
            '<div class="company-search__option-name">' + name + '</div>' +
            '<div class="company-search__option-meta">' + company.secteur + ' — ' + company.effectif + ' employés — ' + company.ville + '</div>' +
          '</div>';

        option.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          selectCompany(company);
        });

        dropdown.appendChild(option);
      });

      // "Nouveau souscripteur" option
      var divider = document.createElement('hr');
      divider.className = 'company-search__divider';
      dropdown.appendChild(divider);

      var addBtn = document.createElement('button');
      addBtn.type = 'button';
      addBtn.className = 'company-search__add';
      addBtn.innerHTML = icon('plus') + ' Nouveau souscripteur' + (q ? ' : "' + query + '"' : '');
      addBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        clearSelection();
        dropdown.classList.remove('active');
        if (q) input.value = '';
        showToast('Saisissez manuellement les informations du souscripteur', 'info');
      });
      dropdown.appendChild(addBtn);

      dropdown.classList.add('active');
    }

    function selectCompany(company) {
      inputWrapper.style.display = 'none';
      selectedCard.classList.add('active');
      selectedCard.querySelector('.company-search__selected-name').textContent = company.raisonSociale;
      selectedCard.querySelector('.company-search__selected-meta').textContent = company.denomination + ' — ' + company.secteur;
      dropdown.classList.remove('active');
      input.value = '';

      // Fill form fields
      if (config.fieldMap) {
        Object.keys(config.fieldMap).forEach(function(key) {
          var el = document.querySelector(config.fieldMap[key]);
          if (!el || company[key] === undefined) return;
          if (el.tagName === 'SELECT') {
            for (var i = 0; i < el.options.length; i++) {
              if (el.options[i].text === company[key] || el.options[i].value === company[key]) {
                el.selectedIndex = i;
                break;
              }
            }
          } else {
            el.value = company[key];
          }
        });
      }

      // Fill summary fields
      if (config.summaryMap) {
        Object.keys(config.summaryMap).forEach(function(key) {
          var el = document.querySelector(config.summaryMap[key]);
          if (el && company[key] !== undefined) {
            el.textContent = company[key];
          }
        });
      }

      // Make filled fields readonly
      if (config.fieldMap) {
        Object.keys(config.fieldMap).forEach(function(key) {
          var el = document.querySelector(config.fieldMap[key]);
          if (el && el.tagName === 'INPUT') {
            el.setAttribute('readonly', '');
            el.style.background = 'var(--gray-50)';
          } else if (el && el.tagName === 'SELECT') {
            el.setAttribute('disabled', '');
            el.style.opacity = '0.7';
          }
        });
      }

      if (config.onSelect) config.onSelect(company);
    }

    function clearSelection() {
      inputWrapper.style.display = '';
      selectedCard.classList.remove('active');
      input.value = '';
      input.focus();

      if (config.fieldMap) {
        Object.keys(config.fieldMap).forEach(function(key) {
          var el = document.querySelector(config.fieldMap[key]);
          if (!el) return;
          if (el.tagName === 'SELECT') {
            el.selectedIndex = 0;
            el.removeAttribute('disabled');
            el.style.opacity = '';
          } else {
            el.value = '';
            el.removeAttribute('readonly');
            el.style.background = '';
          }
        });
      }

      if (config.onClear) config.onClear();
    }

    // Input events
    input.addEventListener('input', function() {
      clearBtn.style.display = this.value ? 'flex' : 'none';
      renderDropdown(this.value);
    });

    input.addEventListener('focus', function() {
      renderDropdown(this.value);
    });

    clearBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      input.value = '';
      clearBtn.style.display = 'none';
      dropdown.classList.remove('active');
      input.focus();
    });

    changeBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      clearSelection();
    });

    // Keyboard navigation
    input.addEventListener('keydown', function(e) {
      var options = dropdown.querySelectorAll('.company-search__option');
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        highlightIndex = Math.min(highlightIndex + 1, options.length - 1);
        updateHighlight(options);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        highlightIndex = Math.max(highlightIndex - 1, 0);
        updateHighlight(options);
      } else if (e.key === 'Enter' && highlightIndex >= 0) {
        e.preventDefault();
        options[highlightIndex].click();
      } else if (e.key === 'Escape') {
        dropdown.classList.remove('active');
      }
    });

    function updateHighlight(options) {
      options.forEach(function(opt, i) {
        opt.classList.toggle('highlighted', i === highlightIndex);
      });
      if (options[highlightIndex]) {
        options[highlightIndex].scrollIntoView({ block: 'nearest' });
      }
    }

    // Close dropdown on outside click
    document.addEventListener('click', function(e) {
      if (!container.contains(e.target)) {
        dropdown.classList.remove('active');
      }
    });

    // Expose selectCompany for pre-selection
    container._selectCompany = selectCompany;
    container._companies = companies;
  };

  // --- Demo Persons Data (Individual subscribers) ---
  window.DEMO_PERSONS = [
    {
      civilite: 'Mme',
      nom: 'Diaby',
      prenom: 'Mariame',
      nomComplet: 'Mme Diaby Mariame',
      dateNaissance: '1992-09-15',
      lieuNaissance: 'Daloa',
      genre: 'Femme',
      cni: 'CI-1992-0915-6789',
      nationalite: 'Ivoirienne',
      profession: 'Pharmacienne — Officine PharmaPlus Daloa',
      situationMatrimoniale: 'Marié(e)',
      telephone: '+225 05 67 89 01 23',
      email: 'm.diaby@pharmaplus.ci',
      adresse: 'Quartier Orly, Rue 12 — Daloa',
      ville: 'Daloa'
    },
    {
      civilite: 'Mme',
      nom: 'Konaté',
      prenom: 'Fatoumata',
      nomComplet: 'Mme Konaté Fatoumata',
      dateNaissance: '1988-08-14',
      lieuNaissance: 'Bouaké',
      genre: 'Femme',
      cni: 'CI-1988-0814-3421',
      nationalite: 'Ivoirienne',
      profession: 'Enseignante — Lycée Municipal de Bouaké',
      situationMatrimoniale: 'Marié(e)',
      telephone: '+225 07 58 43 21 90',
      email: 'konate.fatoumata@gmail.com',
      adresse: 'Quartier Commerce, Rue 18, Bouaké',
      ville: 'Bouaké'
    },
    {
      civilite: 'M.',
      nom: 'Ouattara',
      prenom: 'Ibrahima',
      nomComplet: 'M. Ouattara Ibrahima',
      dateNaissance: '1985-03-22',
      lieuNaissance: 'Korhogo',
      genre: 'Homme',
      cni: 'CI-1985-0322-5541',
      nationalite: 'Ivoirienne',
      profession: 'Ingénieur BTP — SOGECI',
      situationMatrimoniale: 'Marié(e)',
      telephone: '+225 01 23 45 67 89',
      email: 'i.ouattara@sogeci.ci',
      adresse: 'Riviera Faya, Cocody — Abidjan',
      ville: 'Abidjan'
    },
    {
      civilite: 'Mme',
      nom: 'Bamba',
      prenom: 'Aïssata',
      nomComplet: 'Mme Bamba Aïssata',
      dateNaissance: '1995-11-08',
      lieuNaissance: 'Abidjan',
      genre: 'Femme',
      cni: 'CI-1995-1108-7823',
      nationalite: 'Ivoirienne',
      profession: 'Comptable — Cabinet Deloitte CI',
      situationMatrimoniale: 'Célibataire',
      telephone: '+225 07 89 12 34 56',
      email: 'a.bamba@deloitte.ci',
      adresse: 'Angré 8è Tranche, Cocody — Abidjan',
      ville: 'Abidjan'
    },
    {
      civilite: 'M.',
      nom: 'Coulibaly',
      prenom: 'Moussa',
      nomComplet: 'M. Coulibaly Moussa',
      dateNaissance: '1979-06-30',
      lieuNaissance: 'Yamoussoukro',
      genre: 'Homme',
      cni: 'CI-1979-0630-2156',
      nationalite: 'Ivoirienne',
      profession: 'Commerçant — Import-Export',
      situationMatrimoniale: 'Marié(e)',
      telephone: '+225 05 56 78 90 12',
      email: 'moussa.coul@yahoo.fr',
      adresse: 'Quartier Habitat, Yamoussoukro',
      ville: 'Yamoussoukro'
    }
  ];

  // --- Person Search Autocomplete ---
  window.initPersonSearch = function(config) {
    var container = document.getElementById(config.containerId);
    if (!container) return;

    var inputWrapper = container.querySelector('.company-search__input-wrapper');
    var input = container.querySelector('.company-search__input');
    var clearBtn = container.querySelector('.company-search__clear');
    var dropdown = container.querySelector('.company-search__dropdown');
    var selectedCard = container.querySelector('.company-search__selected');
    var changeBtn = container.querySelector('.company-search__change-btn');
    var persons = config.persons || [];
    var highlightIndex = -1;

    function renderDropdown(query) {
      var q = (query || '').toLowerCase().trim();
      dropdown.innerHTML = '';
      highlightIndex = -1;

      var filtered = persons.filter(function(p) {
        return p.nom.toLowerCase().indexOf(q) !== -1 ||
               p.prenom.toLowerCase().indexOf(q) !== -1 ||
               p.nomComplet.toLowerCase().indexOf(q) !== -1 ||
               p.cni.toLowerCase().indexOf(q) !== -1;
      });

      if (filtered.length === 0 && q.length > 0) {
        var noRes = document.createElement('div');
        noRes.className = 'company-search__no-results';
        noRes.textContent = 'Aucun assuré trouvé pour "' + query + '"';
        dropdown.appendChild(noRes);
      }

      filtered.forEach(function(person) {
        var option = document.createElement('button');
        option.type = 'button';
        option.className = 'company-search__option';

        var name = person.nomComplet;
        if (q.length > 0) {
          var regex = new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
          name = name.replace(regex, '<mark>$1</mark>');
        }

        var initials = (person.prenom.charAt(0) + person.nom.charAt(0)).toUpperCase();

        option.innerHTML =
          '<div class="company-search__option-icon" style="background: var(--iips-accent-50, #FEF3E2); color: var(--iips-accent);">' +
            '<span style="font-weight: 700; font-size: 13px;">' + initials + '</span>' +
          '</div>' +
          '<div class="company-search__option-info">' +
            '<div class="company-search__option-name">' + name + '</div>' +
            '<div class="company-search__option-meta">' + person.profession + ' — ' + person.ville + '</div>' +
          '</div>';

        option.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          selectPerson(person);
        });

        dropdown.appendChild(option);
      });

      // "Nouveau souscripteur" option
      var divider = document.createElement('hr');
      divider.className = 'company-search__divider';
      dropdown.appendChild(divider);

      var addBtn = document.createElement('button');
      addBtn.type = 'button';
      addBtn.className = 'company-search__add';
      addBtn.innerHTML = icon('plus') + ' Nouveau souscripteur' + (q ? ' : "' + query + '"' : '');
      addBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        clearSelection();
        dropdown.classList.remove('active');
        if (q) input.value = '';
        showToast('Saisissez manuellement les informations du souscripteur', 'info');
      });
      dropdown.appendChild(addBtn);

      dropdown.classList.add('active');
    }

    function selectPerson(person) {
      inputWrapper.style.display = 'none';
      selectedCard.classList.add('active');
      selectedCard.querySelector('.company-search__selected-name').textContent = person.nomComplet;
      selectedCard.querySelector('.company-search__selected-meta').textContent = person.profession;
      dropdown.classList.remove('active');
      input.value = '';

      // Fill form fields
      if (config.fieldMap) {
        Object.keys(config.fieldMap).forEach(function(key) {
          var el = document.querySelector(config.fieldMap[key]);
          if (!el || person[key] === undefined) return;
          if (el.tagName === 'SELECT') {
            for (var i = 0; i < el.options.length; i++) {
              if (el.options[i].text === person[key] || el.options[i].value === person[key]) {
                el.selectedIndex = i;
                break;
              }
            }
          } else {
            el.value = person[key];
          }
        });
      }

      // Fill summary fields
      if (config.summaryMap) {
        Object.keys(config.summaryMap).forEach(function(key) {
          var el = document.querySelector(config.summaryMap[key]);
          if (el && person[key] !== undefined) {
            el.textContent = person[key];
          }
        });
      }

      // Make filled fields readonly
      if (config.fieldMap) {
        Object.keys(config.fieldMap).forEach(function(key) {
          var el = document.querySelector(config.fieldMap[key]);
          if (el && el.tagName === 'INPUT') {
            el.setAttribute('readonly', '');
            el.style.background = 'var(--gray-50)';
          } else if (el && el.tagName === 'SELECT') {
            el.setAttribute('disabled', '');
            el.style.opacity = '0.7';
          }
        });
      }

      if (config.onSelect) config.onSelect(person);
    }

    function clearSelection() {
      inputWrapper.style.display = '';
      selectedCard.classList.remove('active');
      input.value = '';
      input.focus();

      if (config.fieldMap) {
        Object.keys(config.fieldMap).forEach(function(key) {
          var el = document.querySelector(config.fieldMap[key]);
          if (!el) return;
          if (el.tagName === 'SELECT') {
            el.selectedIndex = 0;
            el.removeAttribute('disabled');
            el.style.opacity = '';
          } else {
            el.value = '';
            el.removeAttribute('readonly');
            el.style.background = '';
          }
        });
      }

      if (config.onClear) config.onClear();
    }

    // Input events
    input.addEventListener('input', function() {
      clearBtn.style.display = this.value ? 'flex' : 'none';
      renderDropdown(this.value);
    });

    input.addEventListener('focus', function() {
      renderDropdown(this.value);
    });

    clearBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      input.value = '';
      clearBtn.style.display = 'none';
      dropdown.classList.remove('active');
      input.focus();
    });

    changeBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      clearSelection();
    });

    // Keyboard navigation
    input.addEventListener('keydown', function(e) {
      var options = dropdown.querySelectorAll('.company-search__option');
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        highlightIndex = Math.min(highlightIndex + 1, options.length - 1);
        updateHighlight(options);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        highlightIndex = Math.max(highlightIndex - 1, 0);
        updateHighlight(options);
      } else if (e.key === 'Enter' && highlightIndex >= 0) {
        e.preventDefault();
        options[highlightIndex].click();
      } else if (e.key === 'Escape') {
        dropdown.classList.remove('active');
      }
    });

    function updateHighlight(options) {
      options.forEach(function(opt, i) {
        opt.classList.toggle('highlighted', i === highlightIndex);
      });
      if (options[highlightIndex]) {
        options[highlightIndex].scrollIntoView({ block: 'nearest' });
      }
    }

    // Close dropdown on outside click
    document.addEventListener('click', function(e) {
      if (!container.contains(e.target)) {
        dropdown.classList.remove('active');
      }
    });

    // Expose for pre-selection
    container._selectPerson = selectPerson;
    container._persons = persons;
  };

});
