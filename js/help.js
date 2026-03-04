/* ============================================================
   IIPS — Aide contextuelle v3
   Un panneau par espace, avec rubriques en accordéon.
   Auto-injection du panel dans le DOM.
   ============================================================ */

/* ============================================================
   1. CONTENU — un objet par espace, avec rubriques
   ============================================================ */

var HELP_CONTENT = {

  /* ----------------------------------------------------------
     ESPACE GESTIONNAIRE
  ---------------------------------------------------------- */
  'gestionnaire': {
    space: 'Espace Gestionnaire',
    intro: 'Plateforme complète de gestion de l\'assurance santé IIPS. Gérez les contrats, sinistres, souscriptions, finances et tous les modules métier depuis un espace unique.',
    rubriques: [
      {
        id: 'g-production',
        title: 'Production — Contrats',
        desc: 'Gestion du portefeuille de contrats d\'assurance santé collective et individuelle.',
        items: [
          'Créer un nouveau contrat et définir les garanties',
          'Gérer les adhérents et leurs ayants-droit',
          'Éditer les attestations, cartes et avenants',
          'Suspendre ou résilier un contrat',
          'Suivre le workflow de validation multi-niveaux'
        ]
      },
      {
        id: 'g-souscription',
        title: 'Souscriptions',
        desc: 'Suivi du processus d\'adhésion des nouveaux membres avec checklist documentaire.',
        items: [
          'Initier une nouvelle souscription',
          'Vérifier et valider la checklist documentaire',
          'Générer l\'attestation de souscription',
          'Gérer les renouvellements et avenants',
          'Suivre le pipeline de dossiers en cours'
        ]
      },
      {
        id: 'g-sinistre',
        title: 'Sinistres',
        desc: 'Traitement des déclarations de sinistres, détection de fraude et gestion des remboursements.',
        items: [
          'Déclarer et instruire un sinistre',
          'Analyser les dossiers médicaux joints',
          'Valider ou rejeter un remboursement',
          'Détecter et signaler les alertes fraude',
          'Générer le bordereau de règlement après validation'
        ]
      },
      {
        id: 'g-pec',
        title: 'Prise en charge (PEC)',
        desc: 'Autorisation de soins en tiers payant et vérification d\'éligibilité en temps réel.',
        items: [
          'Vérifier l\'éligibilité par numéro de carte ou QR code',
          'Émettre une autorisation de prise en charge',
          'Valider les actes nécessitant avis médical',
          'Consulter le réseau de soins agréé',
          'Rejeter ou ajuster une demande non conforme'
        ]
      },
      {
        id: 'g-finance',
        title: 'Finance — Comptabilité & Paiements',
        desc: 'Suivi comptable, trésorerie, paiements prestataires et recouvrement des cotisations.',
        items: [
          'Enregistrer les encaissements de primes',
          'Valider et signer les bordereaux de paiement prestataires',
          'Effectuer les rapprochements bancaires',
          'Suivre les impayés et envoyer des relances',
          'Générer les rapports comptables et exports'
        ]
      },
      {
        id: 'g-crm',
        title: 'CRM — Prospection commerciale',
        desc: 'Gestion du pipeline commercial, fiches prospects et opportunités de vente.',
        items: [
          'Créer et qualifier une fiche prospect',
          'Enregistrer les interactions (appels, emails, RDV)',
          'Suivre l\'avancement du pipeline',
          'Générer un devis indicatif',
          'Convertir un prospect en souscription'
        ]
      },
      {
        id: 'g-outils',
        title: 'Outils — GED, Reporting, Secrétariat',
        desc: 'Modules transversaux : gestion documentaire, analyses et tâches administratives.',
        items: [
          'Archiver et retrouver tout document via la GED',
          'Générer des rapports de sinistralité et performance',
          'Gérer les courriers et le planning du secrétariat',
          'Confectionner et distribuer les cartes assurés',
          'Exporter les données en Excel ou PDF'
        ]
      },
      {
        id: 'g-admin',
        title: 'Administration & Configuration',
        desc: 'Gestion des utilisateurs, rôles, habilitations et paramétrage de la plateforme.',
        items: [
          'Créer et gérer les comptes utilisateurs',
          'Attribuer les rôles et permissions',
          'Paramétrer les barèmes et règles métier',
          'Consulter les journaux d\'audit',
          'Configurer les notifications et intégrations'
        ]
      },
      {
        id: 'g-raccourcis',
        title: 'Raccourcis clavier',
        desc: 'Naviguez plus vite avec les raccourcis clavier.',
        shortcuts: [
          ['Ctrl', 'K', 'Recherche rapide'],
          ['Ctrl', 'B', 'Réduire / agrandir la sidebar'],
          ['Esc', '', 'Fermer les panneaux ouverts']
        ]
      }
    ]
  },

  /* ----------------------------------------------------------
     ESPACE PRESTATAIRE
  ---------------------------------------------------------- */
  'prestataire': {
    space: 'Espace Prestataire',
    intro: 'Portail dédié aux établissements et professionnels de santé du réseau IIPS. Soumettez vos prestations, suivez vos paiements et échangez avec les équipes IIPS.',
    rubriques: [
      {
        id: 'p-pec',
        title: 'Prise en charge & Éligibilité',
        desc: 'Vérification des droits des patients et soumission des demandes d\'autorisation.',
        items: [
          'Vérifier l\'éligibilité par numéro de carte ou QR code',
          'Soumettre une demande de prise en charge programmée',
          'Consulter le statut d\'une demande en cours',
          'Télécharger une autorisation accordée',
          'Gérer les hospitalisations et demandes de prolongation'
        ]
      },
      {
        id: 'p-prestations',
        title: 'Saisie & Suivi des prestations',
        desc: 'Déclaration des actes de soins effectués et suivi du remboursement.',
        items: [
          'Saisir une nouvelle prestation avec actes et montants',
          'Joindre les ordonnances et bilans justificatifs',
          'Filtrer les prestations par statut (en attente, validée, rejetée)',
          'Contester un rejet dans les 30 jours',
          'Consulter l\'historique des soins d\'un patient'
        ]
      },
      {
        id: 'p-bordereaux',
        title: 'Bordereaux de facturation',
        desc: 'Regroupement mensuel des prestations et soumission à IIPS pour paiement.',
        items: [
          'Créer un bordereau groupant les prestations du mois',
          'Vérifier et corriger les lignes avant soumission',
          'Soumettre le bordereau pour validation',
          'Suivre le statut de traitement',
          'Télécharger le récapitulatif accepté'
        ]
      },
      {
        id: 'p-paiements',
        title: 'Suivi des paiements',
        desc: 'Historique des virements reçus d\'IIPS et gestion des litiges financiers.',
        items: [
          'Consulter les virements reçus et leur détail',
          'Télécharger les avis de virement',
          'Signaler un paiement manquant ou incorrect',
          'Exporter le relevé comptable en CSV',
          'Contacter la comptabilité IIPS via la messagerie'
        ]
      },
      {
        id: 'p-reclamations',
        title: 'Réclamations & Messagerie',
        desc: 'Dépôt de réclamations et communication sécurisée avec les équipes IIPS.',
        items: [
          'Déposer une réclamation avec pièces justificatives',
          'Suivre l\'instruction de votre réclamation (délai : 15 j)',
          'Envoyer un message à votre gestionnaire IIPS',
          'Répondre à une demande de complément d\'information',
          'Consulter l\'historique de tous vos échanges'
        ]
      },
      {
        id: 'p-analyses',
        title: 'Analyses & Statistiques',
        desc: 'Pilotez votre activité grâce aux indicateurs de performance du portail.',
        items: [
          'Suivre le volume de prestations par mois',
          'Analyser les taux d\'acceptation et de rejet',
          'Identifier les actes les plus fréquents',
          'Comparer vos délais de paiement moyens',
          'Exporter les données pour votre comptabilité'
        ]
      }
    ]
  },

  /* ----------------------------------------------------------
     ESPACE SOCIÉTÉ
  ---------------------------------------------------------- */
  'societe': {
    space: 'Espace Société',
    intro: 'Portail dédié aux entreprises clientes IIPS. Gérez votre contrat collectif, vos adhérents, suivez la consommation de votre couverture santé et gérez vos cotisations.',
    rubriques: [
      {
        id: 's-contrat',
        title: 'Mon contrat & Garanties',
        desc: 'Consultation et gestion de votre contrat d\'assurance santé collective.',
        items: [
          'Consulter les garanties et plafonds de remboursement',
          'Télécharger les conditions particulières et le DIS',
          'Demander un avenant modificatif (effectif au 1er du mois suivant)',
          'Consulter l\'historique des avenants et renouvellements',
          'Vérifier la date d\'échéance et les conditions de renouvellement'
        ]
      },
      {
        id: 's-adherents',
        title: 'Gestion des adhérents',
        desc: 'Ajout, modification et radiation des salariés et de leurs ayants-droit.',
        items: [
          'Ajouter un nouvel adhérent (délai : 30 jours après embauche)',
          'Déclarer les ayants-droit avec pièces justificatives',
          'Mettre à jour les informations d\'un salarié',
          'Radier un adhérent lors d\'un départ',
          'Exporter la liste complète des bénéficiaires actifs'
        ]
      },
      {
        id: 's-primes',
        title: 'Cotisations & Primes',
        desc: 'Suivi des appels de cotisation, paiements et historique financier.',
        items: [
          'Consulter les appels de cotisation en cours',
          'Télécharger les avis de cotisation et factures',
          'Vérifier l\'historique des paiements',
          'Signaler un litige de facturation',
          'Anticiper les révisions tarifaires liées à l\'évolution des effectifs'
        ]
      },
      {
        id: 's-prestations',
        title: 'Consommation & États des prestations',
        desc: 'Analyse des remboursements effectués pour vos salariés et suivi de sinistralité.',
        items: [
          'Générer un état de consommation par période',
          'Filtrer par famille de soins, prestataire ou bénéficiaire',
          'Suivre le taux de sinistralité global',
          'Comparer avec les périodes précédentes',
          'Exporter en Excel pour votre comptabilité interne'
        ]
      },
      {
        id: 's-reclamations',
        title: 'Réclamations & Messagerie',
        desc: 'Dépôt de réclamations et communication directe avec votre gestionnaire IIPS.',
        items: [
          'Déposer une réclamation (délai légal : 60 jours)',
          'Suivre l\'instruction en cours (réponse sous 10 j ouvrés)',
          'Envoyer un message à votre gestionnaire dédié',
          'Joindre des documents à vos demandes',
          'Consulter l\'historique complet de vos échanges'
        ]
      }
    ]
  },

  /* ----------------------------------------------------------
     ESPACE MÉDECIN-CONSEIL
  ---------------------------------------------------------- */
  'medecin': {
    space: 'Espace Médecin-conseil',
    intro: 'Portail de validation médicale pour les médecins-conseil IIPS. Rendez des avis sur les prises en charge, gérez les dossiers médicaux et assurez le contrôle de la qualité des soins.',
    rubriques: [
      {
        id: 'm-avis',
        title: 'Avis médicaux & PEC',
        desc: 'Validation des demandes de prise en charge soumises par les prestataires.',
        items: [
          'Consulter les dossiers en attente de validation médicale',
          'Rendre un avis favorable, défavorable ou avec réserves',
          'Demander des informations ou examens complémentaires',
          'Traiter les demandes urgentes (délai : 2h ouvrées)',
          'Motiver systématiquement les avis défavorables'
        ]
      },
      {
        id: 'm-dossiers',
        title: 'Dossiers médicaux',
        desc: 'Consultation des dossiers médicaux des assurés sous votre supervision.',
        items: [
          'Rechercher un dossier par numéro d\'assuré',
          'Consulter l\'historique complet des soins et hospitalisations',
          'Accéder aux résultats d\'analyses et ordonnances',
          'Annoter et compléter un dossier médical',
          'Toutes les consultations sont tracées dans l\'audit'
        ]
      },
      {
        id: 'm-ordonnances',
        title: 'Ordonnances & Prescriptions',
        desc: 'Vérification et validation des ordonnances soumises par les prestataires.',
        items: [
          'Valider ou refuser une ordonnance soumise',
          'Vérifier la conformité avec la liste positive médicaments',
          'Contrôler les interactions médicamenteuses',
          'Émettre une restriction de prescription si nécessaire',
          'Les ordonnances validées sont transmises à la pharmacie désignée'
        ]
      },
      {
        id: 'm-protocoles',
        title: 'Protocoles & Référentiels',
        desc: 'Référentiel des protocoles médicaux et grilles de remboursement IIPS.',
        items: [
          'Consulter un protocole par pathologie ou acte médical',
          'Télécharger la grille de remboursement en vigueur',
          'Accéder aux recommandations HAS et guides pratiques',
          'Proposer une mise à jour de protocole',
          'Les protocoles sont actualisés chaque trimestre'
        ]
      },
      {
        id: 'm-alertes',
        title: 'Alertes & Surveillance médicale',
        desc: 'Détection et traitement des situations médicales à risque ou anormales.',
        items: [
          'Consulter les alertes actives triées par priorité',
          'Traiter et documenter les mesures prises',
          'Signaler une surconsommation ou anomalie médicale',
          'Escalader vers la direction médicale si nécessaire',
          'Les alertes non traitées sous 48h génèrent une relance'
        ]
      },
      {
        id: 'm-teleconsultation',
        title: 'Téléconsultation & Rendez-vous',
        desc: 'Organisation des consultations à distance et des rendez-vous d\'expertise.',
        items: [
          'Planifier et démarrer une session de téléconsultation',
          'Inviter un assuré ou prestataire à rejoindre la session',
          'Partager et annoter des documents médicaux en direct',
          'Rédiger l\'ordonnance électronique post-consultation',
          'Renseigner le compte-rendu dans les 24h suivant la consultation'
        ]
      },
      {
        id: 'm-messagerie',
        title: 'Messagerie sécurisée',
        desc: 'Communication confidentielle avec les gestionnaires IIPS et les prestataires.',
        items: [
          'Envoyer un message chiffré à un gestionnaire ou prestataire',
          'Répondre aux demandes d\'avis complémentaire',
          'Partager des documents médicaux sécurisés',
          'Délai de réponse attendu : 4h ouvrées pour les messages médicaux',
          'Toutes les communications sont soumises au secret médical'
        ]
      }
    ]
  }
};

/* ============================================================
   2. DÉTECTION DU PORTAIL
   ============================================================ */

function getPortal() {
  var path = window.location.pathname.replace(/\\/g, '/');
  var portals = ['gestionnaire', 'prestataire', 'societe', 'medecin'];
  for (var i = 0; i < portals.length; i++) {
    if (path.indexOf('/' + portals[i] + '/') !== -1) return portals[i];
  }
  // Si data-page-module est défini → c'est le gestionnaire
  if (document.body.getAttribute('data-page-module')) return 'gestionnaire';
  return 'gestionnaire';
}

/* ============================================================
   3. RENDU DU CONTENU (accordéon)
   ============================================================ */

function renderHelpContent(content) {
  var body = document.getElementById('help-panel-body');
  var spaceEl = document.getElementById('help-panel-space');
  if (!body) return;
  if (spaceEl) spaceEl.textContent = content.space;

  var html = '';

  // Intro
  html += '<p class="help-intro">' + content.intro + '</p>';

  // Rubriques en accordéon
  content.rubriques.forEach(function(rub, index) {
    var isFirst = index === 0;
    html += '<div class="help-rubrique' + (isFirst ? ' open' : '') + '" id="rub-' + rub.id + '">';
    html += '<button class="help-rubrique__header" onclick="toggleRubrique(\'' + rub.id + '\')">';
    html += '<span class="help-rubrique__title">' + rub.title + '</span>';
    html += '<svg class="help-rubrique__chevron" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3,5 7,9 11,5"/></svg>';
    html += '</button>';
    html += '<div class="help-rubrique__body">';

    if (rub.desc) {
      html += '<p class="help-rubrique__desc">' + rub.desc + '</p>';
    }

    if (rub.items && rub.items.length) {
      html += '<ul class="help-section__list">';
      rub.items.forEach(function(item) {
        html += '<li class="help-section__item">' + item + '</li>';
      });
      html += '</ul>';
    }

    if (rub.shortcuts && rub.shortcuts.length) {
      html += '<div class="help-section__shortcuts">';
      rub.shortcuts.forEach(function(s) {
        html += '<div class="help-shortcut"><span class="help-shortcut__keys">';
        if (s[0]) html += '<kbd>' + s[0] + '</kbd>';
        if (s[1]) html += '<kbd>' + s[1] + '</kbd>';
        html += '</span><span class="help-shortcut__label">' + s[2] + '</span></div>';
      });
      html += '</div>';
    }

    html += '</div></div>';
  });

  body.innerHTML = html;
}

function toggleRubrique(id) {
  var el = document.getElementById('rub-' + id);
  if (!el) return;
  el.classList.toggle('open');
}

/* ============================================================
   4. CONTRÔLE DU PANEL
   ============================================================ */

function toggleHelp() {
  var panel = document.getElementById('help-panel');
  if (!panel) return;
  panel.classList.contains('open') ? closeHelp() : openHelp();
}

function openHelp() {
  var panel = document.getElementById('help-panel');
  var overlay = document.getElementById('help-overlay');
  if (!panel) return;
  var portal = getPortal();
  var content = HELP_CONTENT[portal] || HELP_CONTENT['gestionnaire'];
  renderHelpContent(content);
  panel.classList.add('open');
  if (overlay) overlay.classList.add('active');
}

function closeHelp() {
  var panel = document.getElementById('help-panel');
  var overlay = document.getElementById('help-overlay');
  if (panel) panel.classList.remove('open');
  if (overlay) overlay.classList.remove('active');
}

/* ============================================================
   5. AUTO-INJECTION
   ============================================================ */

function injectHelpPanel() {
  if (document.getElementById('help-panel')) return;

  var panel = document.createElement('div');
  panel.className = 'help-panel';
  panel.id = 'help-panel';
  panel.innerHTML =
    '<div class="help-panel__header">'
    +   '<div class="help-panel__title-wrap">'
    +     '<div class="help-panel__badge">?</div>'
    +     '<div>'
    +       '<div class="help-panel__title">Guide de l\'espace</div>'
    +       '<div class="help-panel__space" id="help-panel-space"></div>'
    +     '</div>'
    +   '</div>'
    +   '<button class="help-panel__close" onclick="closeHelp()" title="Fermer">'
    +     '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2"><line x1="2" y1="2" x2="12" y2="12"/><line x1="12" y1="2" x2="2" y2="12"/></svg>'
    +   '</button>'
    + '</div>'
    + '<div class="help-panel__body" id="help-panel-body"></div>'
    + '<div class="help-panel__footer">'
    +   '<div class="help-panel__version">IIPS v2.0 — KOJIT Systems Côte d\'Ivoire</div>'
    + '</div>';
  document.body.appendChild(panel);

  var overlay = document.createElement('div');
  overlay.className = 'help-overlay';
  overlay.id = 'help-overlay';
  overlay.onclick = closeHelp;
  document.body.appendChild(overlay);

  // Wiring bouton ?
  var helpBtn = document.querySelector('.topbar__action-btn[title="Aide"], .topbar__action-btn[title="Aide contextuelle"]');
  if (helpBtn) {
    helpBtn.title = 'Aide';
    helpBtn.onclick = toggleHelp;
  }
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeHelp();
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectHelpPanel);
} else {
  injectHelpPanel();
}
