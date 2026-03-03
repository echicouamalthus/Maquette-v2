/* ============================================================
   IIPS Prototype — Système de Gestion des Rôles
   Définition des rôles, permissions et personas
   ============================================================ */

const IIPS_ROLES = {
  commercial: {
    key: 'commercial',
    label: 'Commercial IIPS',
    shortLabel: 'Commercial',
    description: 'Prospection, CRM et suivi des souscriptions',
    icon: 'crm',
    modules: ['dashboard', 'souscription', 'crm'],
    persona: {
      name: 'Kouamé Serge',
      initials: 'KS',
      title: 'Commercial IIPS',
      email: 'kouame.serge@iips.ci'
    }
  },
  superviseur: {
    key: 'superviseur',
    label: 'Chef d\'équipe commerciale',
    shortLabel: 'Chef équipe',
    description: 'Supervision équipes commerciales, validation Niv. 1 souscriptions',
    icon: 'subscription',
    modules: ['dashboard', 'souscription', 'crm'],
    persona: {
      name: "N'Guessan Marie",
      initials: 'NM',
      title: 'Chef d\'équipe commerciale',
      email: 'nguessan.marie@iips.ci'
    }
  },
  directeur: {
    key: 'directeur',
    label: 'Directeur / Approbateur',
    shortLabel: 'Directeur',
    description: 'Approbation finale, reporting et pilotage',
    icon: 'building',
    modules: ['dashboard', 'souscription', 'reporting', 'administration'],
    persona: {
      name: 'Ouattara Ibrahim',
      initials: 'OI',
      title: 'Directeur général',
      email: 'ouattara.ibrahim@iips.ci'
    }
  },
  gestionnaire: {
    key: 'gestionnaire',
    label: 'Gestionnaire IIPS',
    shortLabel: 'Gestionnaire',
    description: 'Gestion complète : contrats, sinistres, comptabilité, paiements',
    icon: 'contract',
    modules: ['dashboard', 'production', 'souscription', 'sinistre', 'pec', 'confection-cartes', 'secretariat', 'crm', 'comptabilite', 'tresorerie', 'paiement', 'recouvrement', 'ged', 'reporting', 'administration', 'configuration'],
    persona: {
      name: 'Aminata Diabaté',
      initials: 'AD',
      title: 'Gestionnaire santé',
      email: 'aminata.diabate@iips.ci'
    }
  },
  admin: {
    key: 'admin',
    label: 'Administrateur système',
    shortLabel: 'Admin',
    description: 'Administration, configuration et suivi connexions',
    icon: 'admin',
    modules: ['dashboard', 'reporting', 'administration', 'configuration'],
    persona: {
      name: 'Yao Patrick',
      initials: 'YP',
      title: 'Administrateur système',
      email: 'yao.patrick@iips.ci'
    }
  },
  ged: {
    key: 'ged',
    label: 'Gestionnaire GED',
    shortLabel: 'GED',
    description: 'Gestion électronique des documents',
    icon: 'ged',
    modules: ['dashboard', 'ged'],
    persona: {
      name: 'Bah Aïssatou',
      initials: 'BA',
      title: 'Gestionnaire documentaire',
      email: 'bah.aissatou@iips.ci'
    }
  },

  /* ── Nouveaux rôles (Cahier v3.0) ── */

  direction_generale: {
    key: 'direction_generale',
    label: 'Direction Générale',
    shortLabel: 'DG',
    description: 'Supervision globale, pilotage stratégique, signature polices',
    icon: 'building',
    modules: ['dashboard', 'production', 'souscription', 'sinistre', 'pec', 'comptabilite', 'tresorerie', 'paiement', 'recouvrement', 'reporting', 'administration'],
    persona: {
      name: 'Koné Aboubacar',
      initials: 'KAb',
      title: 'Directeur Général',
      email: 'kone.aboubacar@iips.ci'
    }
  },
  audit: {
    key: 'audit',
    label: 'Audit et Contrôle',
    shortLabel: 'Audit',
    description: 'Audit des activités, contrôle de conformité',
    icon: 'admin',
    modules: ['dashboard', 'production', 'souscription', 'sinistre', 'pec', 'comptabilite', 'tresorerie', 'paiement', 'recouvrement', 'reporting', 'administration'],
    persona: {
      name: 'Konan Affoué',
      initials: 'KAf',
      title: 'Auditeur interne',
      email: 'konan.affoue@iips.ci'
    }
  },
  exploitation: {
    key: 'exploitation',
    label: 'Service Exploitation',
    shortLabel: 'Exploitation',
    description: 'Traitement dossiers, attribution n° police, validation Niv. 3',
    icon: 'contract',
    modules: ['dashboard', 'production', 'souscription', 'pec'],
    persona: {
      name: 'Koné Mariam',
      initials: 'KM',
      title: 'Chef service exploitation',
      email: 'kone.mariam@iips.ci'
    }
  },
  comptabilite_role: {
    key: 'comptabilite_role',
    label: 'Comptabilité',
    shortLabel: 'Compta',
    description: 'États financiers, règlement factures, conformité fiscale',
    icon: 'contract',
    modules: ['dashboard', 'comptabilite', 'tresorerie', 'paiement', 'reporting'],
    persona: {
      name: 'Coulibaly Fatou',
      initials: 'CF',
      title: 'Chef comptable',
      email: 'coulibaly.fatou@iips.ci'
    }
  },
  caisse: {
    key: 'caisse',
    label: 'Caisse',
    shortLabel: 'Caisse',
    description: 'Encaissements primes, carnets, changements contrat/carte',
    icon: 'contract',
    modules: ['dashboard', 'comptabilite', 'tresorerie', 'paiement'],
    persona: {
      name: 'Traoré Mamadou',
      initials: 'TM',
      title: 'Caissier principal',
      email: 'traore.mamadou@iips.ci'
    }
  },
  recouvrement_role: {
    key: 'recouvrement_role',
    label: 'Service Recouvrement',
    shortLabel: 'Recouvrement',
    description: 'Suivi impayés, relances, imports retours bancaires',
    icon: 'contract',
    modules: ['dashboard', 'recouvrement', 'comptabilite'],
    persona: {
      name: 'Diallo Sékou',
      initials: 'DS',
      title: 'Chargé de recouvrement',
      email: 'diallo.sekou@iips.ci'
    }
  },
  pec_hospitalisation: {
    key: 'pec_hospitalisation',
    label: 'PEC Hospitalisation',
    shortLabel: 'PEC Hospi',
    description: 'Demandes de prise en charge hospitalisation',
    icon: 'contract',
    modules: ['dashboard', 'pec', 'sinistre'],
    persona: {
      name: 'Bamba Aïssata',
      initials: 'BAi',
      title: 'Gestionnaire PEC hospitalisation',
      email: 'bamba.aissata@iips.ci'
    }
  },
  reseau_soins: {
    key: 'reseau_soins',
    label: 'Réseau de Soins',
    shortLabel: 'Réseau Soins',
    description: 'Gestion prestataires, conventionnement, tarification',
    icon: 'contract',
    modules: ['dashboard', 'pec', 'sinistre', 'configuration'],
    persona: {
      name: 'Yao Christelle',
      initials: 'YC',
      title: 'Responsable réseau de soins',
      email: 'yao.christelle@iips.ci'
    }
  },
  marketing: {
    key: 'marketing',
    label: 'Marketing',
    shortLabel: 'Marketing',
    description: 'Stratégie commerciale, fidélisation, analyse ventes',
    icon: 'crm',
    modules: ['dashboard', 'crm', 'reporting'],
    persona: {
      name: 'Gnagné Estelle',
      initials: 'GE',
      title: 'Responsable marketing',
      email: 'gnagne.estelle@iips.ci'
    }
  },

  /* ── Services spécialisés (Cahier v3.0) ── */

  direction_production: {
    key: 'direction_production',
    label: 'Direction Production',
    shortLabel: 'Dir. Prod.',
    description: 'Pilotage production, approbation polices, supervision globale',
    icon: 'contract',
    modules: ['dashboard', 'production', 'souscription', 'sinistre', 'pec', 'comptabilite', 'tresorerie', 'paiement', 'recouvrement', 'reporting'],
    persona: {
      name: 'Bah Souleymane',
      initials: 'BS',
      title: 'Directeur de la Production',
      email: 'bah.souleymane@iips.ci'
    }
  },
  rh: {
    key: 'rh',
    label: 'Ressources Humaines',
    shortLabel: 'RH',
    description: 'Gestion du personnel, paie, administration RH',
    icon: 'admin',
    modules: ['dashboard', 'comptabilite', 'administration'],
    persona: {
      name: 'Touré Fatoumata',
      initials: 'TF',
      title: 'Responsable RH',
      email: 'toure.fatoumata@iips.ci'
    }
  },
  confection_cartes: {
    key: 'confection_cartes',
    label: 'Confection Cartes',
    shortLabel: 'Cartes',
    description: 'Planification production, vérification pièces, conformité, impression cartes',
    icon: 'contract',
    modules: ['dashboard', 'confection-cartes'],
    homePage: 'confection-cartes.html',
    persona: {
      name: 'Coulibaly Ibrahima',
      initials: 'CI',
      title: 'Responsable confection cartes',
      email: 'coulibaly.ibrahima@iips.ci'
    }
  },
  secretariat: {
    key: 'secretariat',
    label: 'Secrétariat',
    shortLabel: 'Secrétariat',
    description: 'Correspondances, édition polices, imports bancaires, PEC lunetterie',
    icon: 'contract',
    modules: ['dashboard', 'production', 'secretariat', 'recouvrement', 'comptabilite'],
    homePage: 'secretariat.html',
    persona: {
      name: 'Konaté Mariam',
      initials: 'KMa',
      title: 'Secrétaire de direction',
      email: 'konate.mariam@iips.ci'
    }
  },
  pec_analyses: {
    key: 'pec_analyses',
    label: 'PEC Analyses & Radio',
    shortLabel: 'PEC Analyses',
    description: 'Prise en charge analyses médicales et radiologie',
    icon: 'contract',
    modules: ['dashboard', 'pec', 'sinistre'],
    persona: {
      name: 'Diomandé Aoua',
      initials: 'DA',
      title: 'Gestionnaire PEC analyses',
      email: 'diomande.aoua@iips.ci'
    }
  },
  chef_commercial: {
    key: 'chef_commercial',
    label: 'Chef Commercial',
    shortLabel: 'Chef Comm.',
    description: 'Supervision équipes commerciales, objectifs, reporting',
    icon: 'crm',
    modules: ['dashboard', 'souscription', 'crm', 'reporting'],
    persona: {
      name: 'Soro Aboubakar',
      initials: 'SA',
      title: 'Chef commercial',
      email: 'soro.aboubakar@iips.ci'
    }
  },
  archives: {
    key: 'archives',
    label: 'Archives',
    shortLabel: 'Archives',
    description: 'Gestion et conservation des archives physiques et numériques',
    icon: 'ged',
    modules: ['dashboard', 'ged'],
    persona: {
      name: 'Koffi Alphonse',
      initials: 'KAl',
      title: 'Responsable archives',
      email: 'koffi.alphonse@iips.ci'
    }
  },

  /* ── Rôles CDC v3.0 — Compléments ── */

  gestion_sinistres: {
    key: 'gestion_sinistres',
    label: 'Service Gestion des Sinistres',
    shortLabel: 'Sinistres',
    description: 'Enregistrement factures, conformité, correction, validation médecin conseil, paiements',
    icon: 'contract',
    modules: ['dashboard', 'sinistre', 'pec', 'comptabilite', 'paiement'],
    persona: {
      name: 'Konan Yao',
      initials: 'KY',
      title: 'Chef service sinistres',
      email: 'konan.yao@iips.ci'
    }
  },
  medecin_conseil: {
    key: 'medecin_conseil',
    label: 'Médecin Conseil',
    shortLabel: 'Méd. Conseil',
    description: 'Validation médicale des factures et PEC, analyse conformité médicale',
    icon: 'contract',
    modules: ['dashboard', 'sinistre', 'pec'],
    persona: {
      name: 'Dr. Konaté Seydou',
      initials: 'KS',
      title: 'Médecin conseil IIPS',
      email: 'konate.seydou@iips.ci'
    }
  },
  tresorerie_role: {
    key: 'tresorerie_role',
    label: 'Trésorerie',
    shortLabel: 'Trésorerie',
    description: 'Rapprochement bancaire, imports retours SGBCI/Trésor/Espèce',
    icon: 'contract',
    modules: ['dashboard', 'tresorerie', 'comptabilite', 'recouvrement', 'paiement'],
    persona: {
      name: 'Ouédraogo Awa',
      initials: 'OA',
      title: 'Trésorière',
      email: 'ouedraogo.awa@iips.ci'
    }
  }
};

const DEFAULT_ROLE = 'gestionnaire';

function getCurrentRole() {
  return localStorage.getItem('iips-role') || DEFAULT_ROLE;
}

function setCurrentRole(roleKey) {
  localStorage.setItem('iips-role', roleKey);
}

function getRoleConfig(roleKey) {
  return IIPS_ROLES[roleKey] || IIPS_ROLES[DEFAULT_ROLE];
}

function canAccessModule(roleKey, moduleKey) {
  var role = getRoleConfig(roleKey);
  return role.modules.indexOf(moduleKey) !== -1;
}

function getPersona(roleKey) {
  return getRoleConfig(roleKey).persona;
}
