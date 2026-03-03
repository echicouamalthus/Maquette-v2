# Parcours Client v2 — IIPS
## Description détaillée des processus métiers — Version 2

**Projet** : Logiciel de Gestion Assurance Santé — IIPS
**Base** : CdC v3.0 + Maquette KOJIT + Design System v2
**Date** : 02/03/2026
**Version** : 2.0

---

## Changements v2 par rapport à v1

| Aspect | v1 | v2 |
|--------|----|----|
| **Design** | Sidebar classique, coins arrondis | Floating sidebar (shadcn), `border-radius: 0` |
| **Login** | Page unique, 7 boutons d'espace | 2 étapes : choix espace → formulaire |
| **Prestataire** | 3 portails séparés (Clinique, Pharmacie, Opticien) | 1 portail unifié avec filtrage par type |
| **Espace Assuré** | Mobile-first dans `pages/assure/` | Inchangé (reste en v1) |
| **Layout** | `app-shell` plein écran | Panneaux flottants sur fond gris `#f4f4f5` |
| **Header** | Fixe classique | Sticky dans `.app-main`, rôle dropdown scrollable |
| **Chemins** | `pages/espace/` | `pages-v2/espace/` |

### Inventaire des écrans v2

| Espace | Nb écrans | Répertoire |
|--------|-----------|------------|
| Login | 1 | `pages-v2/login.html` |
| Gestionnaire | 42 | `pages-v2/gestionnaire/` |
| Prestataire | 12 | `pages-v2/prestataire/` |
| Société | 7 | `pages-v2/societe/` |
| Médecin | 9 | `pages-v2/medecin/` |
| Assuré | 9 | `pages/assure/` (v1) |
| **Total** | **80** | |

---

# P-01 : PROSPECTION ET ACQUISITION CLIENT

## Contexte
Tout commence par l'acquisition de nouveaux clients. L'IIPS dispose d'un réseau de 60 commerciaux, encadrés par 40 chefs commerciaux, répartis par régions et agences. Le processus démarre sur le terrain et se finalise dans le système.

## Acteurs impliqués
| Acteur | Rôle dans ce parcours | Nb utilisateurs |
|---|---|---|
| **Commercial** | Prospecte sur le terrain, identifie les clients potentiels, collecte les premières informations | 60 |
| **Chef commercial** | Supervise les commerciaux de son équipe, valide la qualité des prospects | 40 |
| **Marketing** | Définit les campagnes, analyse les ventes, propose des actions de fidélisation | 1 |

## Déroulement des actions

### Étape 1 — Prospection terrain
Le **commercial** identifie un prospect (particulier ou entreprise). Il collecte les informations de base : nom, prénom, téléphone, situation familiale, employeur, besoin en assurance santé. Ces informations sont saisies dans le CRM du système.

> **Écran v2** : `pages-v2/gestionnaire/crm.html` — Onglet "Prospects"
> Le commercial crée une fiche prospect avec le statut "Nouveau".

### Étape 2 — Qualification du prospect
Le commercial approfondit le contact : il présente les différentes garanties (Alpha 1, Alpha 2, Betha, Confort, Enseignant...), évalue le besoin du prospect et détermine la formule adaptée.

> **Écran v2** : `pages-v2/gestionnaire/prospect-detail.html`
> Fiche complète du prospect avec historique des échanges et documents collectés.

### Étape 3 — Conversion en souscription
Lorsque le prospect est prêt à souscrire, le commercial convertit la fiche prospect en dossier de souscription. Le système rattache automatiquement le dossier au commercial, à son chef d'équipe et à son agence.

> **Écran v2** : `pages-v2/gestionnaire/prospect-detail-qualifie.html`
> Prospect qualifié avec bouton "Convertir en souscription". Le statut passe de "Qualifié" à "Converti".

### Étape 4 — Campagnes marketing (en parallèle)
Le service **Marketing** analyse les statistiques de vente par produit, région et commercial. Il lance des campagnes ciblées (SMS, e-mailing).

> **Écran v2** : `pages-v2/gestionnaire/crm.html` — Onglet "Opportunités"
> Suivi des opportunités commerciales et pipeline de vente.

---

# P-02 : SOUSCRIPTION ET CRÉATION DES ADHÉRENTS

## Contexte
La souscription est le point d'entrée de tout nouvel adhérent dans le système IIPS. Ce parcours couvre la collecte des informations, la constitution du dossier et sa validation à travers 4 niveaux hiérarchiques.

Le processus suit un enchaînement strict : **Création dossier → Validation N1 → N2 → N3 → N4 → Dossier validé**

Tout rejet à un niveau renvoie automatiquement le dossier au niveau précédent. Délai maximum : **90 jours**.

## Acteurs impliqués

| Acteur | Rôle dans ce parcours | Nb utilisateurs |
|---|---|---|
| **Commercial** | Crée le dossier, collecte les pièces et photos (droits : ajout/lecture) | 60 |
| **Chef d'équipe** (Validation N1) | Premier filtre, vérifie la complétude (droits : ajout/lecture/modification) | 40 |
| **Gestionnaire/Agence** (Validation N2) | Contrôle conformité, peut corriger (droits : ajout/modification/suppression) | 6 |
| **Service Exploitation** (Validation N3) | Vérification approfondie, contrôle anti-doublon, attribution n° police | 2 |
| **Direction Production** (Validation N4) | Autorité finale. Validation → statut "Validé — en attente de contrat" | 1 |

## Déroulement des actions

### Étape 1 — Arrivée du dossier
Deux sources : conversion depuis le CRM (P-01) ou création directe. Le dossier est rattaché au commercial, à son chef d'équipe et à son agence.

> **Écran v2** : `pages-v2/gestionnaire/souscriptions.html`
> Liste de tous les dossiers. Statuts : "Brouillon", "En validation N1/N2/N3/N4", "Validé", "Rejeté".

### Étape 2 — Saisie du dossier par le commercial
Le **commercial** remplit le formulaire : informations adhérent, choix contrat, ayants droit, maladies chroniques, pièces justificatives. Le système calcule la prime automatiquement.

> **Écran v2** : `pages-v2/gestionnaire/souscription-nouvelle.html`
> Formulaire complet, calcul automatique de la prime, checklist de pièces.

### Étape 3 — Validation Niveau 1 : Chef d'équipe
Vérifie la complétude, la présence des pièces, la cohérence des informations.

> **Écran v2** : `pages-v2/gestionnaire/souscription-workflow.html`
> Les 4 niveaux de validation. Boutons "Valider" et "Rejeter" avec motif.

### Étape 4 — Validation Niveau 2 : Gestionnaire/Agence
Contrôle approfondi de conformité. Peut corriger des informations mineures.

> **Écran v2** : `pages-v2/gestionnaire/souscription-detail.html`
> Vue complète du dossier avec historique des validations.

### Étape 5 — Validation Niveau 3 : Service Exploitation
Contrôle anti-doublon, vérification tarification, attribution du numéro de police.

> **Écran v2** : `pages-v2/gestionnaire/souscription-workflow.html`
> Le dossier est au niveau 3. Le numéro de police attribué est visible.

### Étape 6 — Validation Niveau 4 : Direction Production (finale)
Autorité finale. Après validation → statut "Validé — en attente de contrat". Les adhérents sont créés mais pas encore actifs.

> **Écran v2** : `pages-v2/gestionnaire/souscription-workflow.html`
> Bouton "Validation finale".

```
COMMERCIAL              CHEF D'ÉQUIPE            GESTIONNAIRE
Crée le dossier ──────► Valide N1 ────────────► Valide N2
  (Brouillon)           (En validation N1)       (En validation N2)
      ▲                       │                        │
      └── Rejeté N1 ◄────────┘                        │
                               ▲                       │
                               └── Rejeté N2 ◄────────┘

EXPLOITATION              DIRECTION PRODUCTION
Valide N3 ──────────────► Valide N4 (finale)
(En validation N3)         (En validation N4)
      │                         │
      ▲                         ▼
      └── Rejeté N3 ◄──────┘   DOSSIER VALIDÉ
                                (adhérents créés, en attente de contrat)
                                      │
                                      ▼
                                Vers P-03 : Vie du contrat
```

---

# P-03 : VIE DU CONTRAT (CRÉATION, ACTIVATION ET MODIFICATIONS)

## Contexte
Cycle de vie complet du contrat : création → paiement → activation → modifications → suspension/résiliation.

## Acteurs impliqués

| Acteur | Rôle dans ce parcours | Nb utilisateurs |
|---|---|---|
| **Service Exploitation** | Crée le contrat depuis la souscription validée | 2 |
| **Direction Production** | Vérifie, valide, autorise suspensions/résiliations | 1 |
| **Caisse** | Encaisse les frais de dossier (déclencheur d'activation) | 4 |
| **Secrétariat** | Édite la police d'assurance et les fichiers de prélèvement | 3 |
| **Service Confection des Cartes** | Produit et distribue les cartes physiques | 5 |
| **Archives** | Numérise et classe le dossier dans la GED | 5 |
| **Gestionnaire** | Traite les avenants en cours de vie | 6 |
| **Adhérent** | Paye les frais, demande les modifications | Illimité |

## Déroulement des actions

### Étape 1 — Création du contrat
Le **Service Exploitation** transforme la souscription validée en contrat. Le système pré-remplit automatiquement toutes les informations.

> **Écran v2** : `pages-v2/gestionnaire/contrat-nouveau.html`
> Formulaire pré-rempli : informations générales, adhérent, ayants droit, garanties, primes, échéancier.

> **Écran v2** : `pages-v2/gestionnaire/contrats.html`
> Le contrat apparaît avec statut "En attente de paiement".

### Étape 2 — Paiement des frais de dossier (déclencheur d'activation)
L'adhérent se rend à la Caisse. Le paiement **déclenche l'activation**.

| Contrat | Frais de dossier |
|---|---|
| Alpha 1 | 21 705F |
| Alpha 2 | 14 000F |
| Betha | 21 705F |
| Betha Classique | 14 000F |
| Enseignant | 10 000F |
| Confort Plus | 15 000F |
| Confort Classique | 15 000F |
| Groupe IIPS | Selon convention |

> **Écran v2** : `pages-v2/gestionnaire/encaissement-nouveau.html`
> Saisie de l'encaissement : recherche contrat, type de frais, montant, mode de paiement, reçu.

### Étape 3 — Contrat actif
Après paiement → statut "Actif". Délais de carence : accident 0j, maladie 3 mois, chronique 6 mois, maternité 12 mois.

> **Écran v2** : `pages-v2/gestionnaire/contrat-detail.html`
> Fiche complète : informations, adhérent, ayants droit, garanties, primes, documents, historique.

### Étape 4 — Édition de la police d'assurance
Le **Secrétariat** édite la police officielle.

> **Écran v2** : `pages-v2/gestionnaire/secretariat.html`
> Section "Polices à éditer".

> **Écran v2** : `pages-v2/gestionnaire/contrat-attestation.html`
> Génération et impression de la police / attestation PDF.

### Étape 5 — Confection et remise des cartes
Le service produit les cartes pour chaque bénéficiaire. En attendant, carte numérique disponible sur l'espace Assuré mobile.

> **Écran v2** : `pages-v2/gestionnaire/confection-cartes.html`
> Planning de production : en attente, en fabrication, produites, distribuées.

> **Écran v2** : `pages-v2/gestionnaire/contrat-cartes.html`
> Liste des cartes émises depuis le détail contrat.

### Étape 6 — Archivage du dossier

> **Écran v2** : `pages-v2/gestionnaire/ged.html`
> Documents classés par dossier, recherche, téléchargement.

```
SOUSCRIPTION VALIDÉE (P-02)
         |
         v
SERVICE EXPLOITATION ---------> DIRECTION PRODUCTION
Crée le contrat                  Vérifie et valide
         |                             |
         v                             v
    CONTRAT CRÉÉ <------------- CONTRAT VALIDÉ
    (En attente de paiement)
         |
         v
      CAISSE
    Encaisse frais de dossier
         |
         v
    CONTRAT ACTIF --------+---------------+---------------+
         |                |               |               |
         v                v               v               v
    SECRÉTARIAT    CONFECTION CARTES   ARCHIVES    PREMIER PRÉLÈVEMENT
    Édite police   Produit cartes      Classe      (voir P-04)
                                       dossier
```

### Modifications en cours de vie

#### Action 3a — Avenant (modification contractuelle)
Avenants à la date anniversaire : ajout/retrait d'enfant, conjoint, seconde épouse, changement d'âge, ajout garantie. Le **Gestionnaire** traite les modifications contractuelles.

> **Écran v2** : `pages-v2/gestionnaire/souscription-avenant.html`
> Formulaire avec comparaison avant/après et nouveau montant. (Acteur : **Gestionnaire**)

> **Écran v2** : `pages-v2/gestionnaire/contrat-adherents.html`
> Liste des bénéficiaires mise à jour. (Acteur : **Gestionnaire**)

#### Action 3b — Changement de formule
Frais : 7 500F. Nouveau numéro de police attribué, ancien contrat clôturé, nouvelles cartes émises.

> **Écrans v2** : `contrat-detail.html` → `encaissement-nouveau.html`

#### Action 3c — Suspension
Durée max 3 mois, renouvelable 1×/an. Cartes bloquées. Direction Production uniquement.

> **Écran v2** : `pages-v2/gestionnaire/contrat-suspension.html`

#### Action 3d — Résiliation définitive
Direction Production uniquement. Cartes bloquées et archivées. Attestation de radiation générée.

> **Écran v2** : `pages-v2/gestionnaire/contrat-resiliation.html`

#### Action 3e — Réédition de cartes
Coût : 3 000F/carte. Ancienne carte désactivée.

#### Action 3f — Édition d'attestations
Le **Secrétariat** édite les attestations d'assurance sur demande de l'adhérent.

> **Écran v2** : `pages-v2/gestionnaire/contrat-attestation.html`
> Génération de l'attestation PDF. (Acteur : **Secrétariat**)

#### Traçabilité
Toutes les actions horodatées dans un journal non modifiable. Consultable par le **Gestionnaire**, le **Service Exploitation**, la **Direction Production** et l'**Audit**.

> **Écran v2** : `pages-v2/gestionnaire/contrat-historique.html`
> Journal des modifications du contrat. (Acteurs : **Gestionnaire, Exploitation, Direction Production, Audit** — lecture seule)

---

# P-04 : PRÉLÈVEMENT DES PRIMES ET RECOUVREMENT

## Contexte
Chaque mois, primes prélevées via Trésor Public, banques (SGBCI) ou espèces. Le service Recouvrement gère les impayés.

## Acteurs impliqués
| Acteur | Rôle dans ce parcours | Nb utilisateurs |
|---|---|---|
| **Secrétariat** | Édite les polices, génère les fichiers de prélèvement | 3 |
| **Comptabilité** | Enregistre les mouvements, importe les retours bancaires | 5 |
| **Trésorerie** | Rapprochement entre fichiers émis et retours reçus | 1 |
| **Service Recouvrement** | Détecte les impayés, relances, contentieux | 1 |
| **Caisse** | Encaisse les paiements espèces et régularisations | 4 |

## Déroulement des actions

### Étape 1 — Édition des fichiers de prélèvement
Fichiers : Trésor, SGBCI, Espèce, Banques — contenant adhérents, n° police, montants.

> **Écran v2** : `pages-v2/gestionnaire/secretariat.html`
> Génération et suivi des fichiers de prélèvement.

### Étape 2 — Envoi et retour des fichiers
Transmission aux organismes payeurs. Fichier retour avec succès/échec par adhérent.

### Étape 3 — Importation des retours

> **Écran v2** : `pages-v2/gestionnaire/comptabilite.html`
> Importation des fichiers retour, écritures comptables automatiques.

### Étape 4 — Rapprochement

> **Écran v2** : `pages-v2/gestionnaire/tresorerie.html`
> Tableau de rapprochement avec taux de succès/échec par type de fichier.

### Étape 5 — Traitement des impayés
Relance N1 (appel), N2 (courrier), N3 (mise en demeure). Si non-paiement → suspension → résiliation.

> **Écran v2** : `pages-v2/gestionnaire/recouvrement.html`
> Liste des impayés par ancienneté, montants dus, historique des relances.

### Étape 6 — Encaissement suite à relance

> **Écran v2** : `pages-v2/gestionnaire/encaissement-nouveau.html`

---

# P-05 : PRISE EN CHARGE (PEC) — CONSULTATION ET ANALYSES

## Contexte
L'assuré se rend chez un prestataire du réseau IIPS. Le prestataire vérifie ses droits et demande une PEC. Le service PEC autorise ou refuse selon les droits, plafonds et garanties.

## Acteurs impliqués
| Acteur | Rôle dans ce parcours | Nb utilisateurs |
|---|---|---|
| **Assuré** | Se présente chez le prestataire avec sa carte | Illimité |
| **Prestataire Clinique** | Vérifie l'éligibilité, demande la PEC, réalise les soins | Plusieurs |
| **PEC Analyses** | Vérifie droits, contrôle plafonds, valide ou rejette | 10 |
| **PEC Hospitalisation** | Idem pour les demandes d'hospitalisation | 5 |

## Déroulement des actions

### Étape 1 — Présentation de l'assuré
L'assuré présente sa carte (physique ou numérique via l'app mobile).

> **Écran Assuré** : `pages/assure/carte.html` (v1 — mobile)
> Carte numérique avec QR code.

> **Écran Assuré** : `pages/assure/garanties.html` (v1 — mobile)
> Consultation des garanties et plafonds restants.

### Étape 2 — Vérification d'éligibilité par le prestataire
Vérification en temps réel : contrat actif, bénéficiaire valide, carte valide, carence passée.

> **Écran v2** : `pages-v2/prestataire/dashboard.html`
> Tableau de bord avec vérification rapide des droits.

### Étape 3 — Demande de prise en charge
Nature des actes, montant estimatif, diagnostic CIM.

> **Écran v2** : `pages-v2/prestataire/demandes.html`
> Formulaire de demande de PEC.

### Étape 4 — Traitement de la PEC par l'IIPS
Contrôles : plafonds, compatibilité, fréquence, cohérence, anti-fraude.

> **Écran v2** : `pages-v2/gestionnaire/pec.html`
> Liste des demandes de PEC avec filtres.

> **Écran v2** : `pages-v2/gestionnaire/pec-detail.html`
> Détail : informations assuré, actes demandés, plafonds, décision.

### Étape 5 — Réalisation des soins
Taux : Alpha 1 / Confort Plus = 80% (pharmacie 70%), Betha / Enseignant = 70%.

---

# P-06 : PRISE EN CHARGE — PHARMACIE

## Contexte
Le parcours pharmacie a ses spécificités : vérification d'ordonnance, contrôle des quantités délivrables, durée de traitement, interactions médicamenteuses.

> **Note v2** : En v2, la Pharmacie est intégrée dans le portail Prestataire unifié avec filtrage par type.

## Acteurs impliqués
| Acteur | Rôle dans ce parcours | Nb utilisateurs |
|---|---|---|
| **Assuré** | Se présente avec ordonnance et carte | Illimité |
| **Prestataire Pharmacie** | Vérifie droits, délivre médicaments, facture | Plusieurs |

## Déroulement des actions

### Étape 1 — Présentation et vérification
Le pharmacien vérifie : droits adhérent, validité ordonnance, plafonds pharmaceutiques.

> **Écran v2** : `pages-v2/prestataire/dashboard.html` (type = Pharmacie)
> Vérification ordonnance et droits adhérent.

### Étape 2 — Dispensation des médicaments
Contrôles automatiques : quantité max, durée max, restrictions âge/sexe, interactions, fréquence.

> **Écran v2** : `pages-v2/prestataire/saisie-prestation.html` (type = Pharmacie)
> Saisie des médicaments, quantités, contrôles automatiques.

### Étape 3 — Facturation
Part IIPS : 70% (tous contrats pour la pharmacie). Part assuré : 30%.

> **Écran v2** : `pages-v2/prestataire/prestations.html`
> Historique des dispensations avec montants.

---

# P-07 : PRISE EN CHARGE — OPTIQUE (LUNETTERIE)

## Contexte
Le parcours optique passe par le **Secrétariat** de l'IIPS (et non le service PEC). Plafonds spécifiques par contrat.

> **Note v2** : En v2, l'Opticien est intégré dans le portail Prestataire unifié avec filtrage par type.

## Acteurs impliqués
| Acteur | Rôle dans ce parcours | Nb utilisateurs |
|---|---|---|
| **Assuré** | Se présente avec prescription ophtalmologique | Illimité |
| **Prestataire Opticien** | Vérifie couverture, soumet devis, délivre | Plusieurs |
| **Secrétariat** | Traite les PEC lunetterie (spécificité IIPS) | 3 |

## Déroulement des actions

### Étape 1 — Vérification de la couverture optique
Plafonds : Alpha/Confort Plus = 75 000F, Betha/Confort CL = 50 000F, Enseignant = 40 000F.

> **Écran v2** : `pages-v2/prestataire/dashboard.html` (type = Opticien)

### Étape 2 — Soumission du devis

> **Écran v2** : `pages-v2/prestataire/saisie-prestation.html` (type = Opticien)
> Saisie du devis détaillé.

### Étape 3 — Traitement par le Secrétariat

> **Écran v2** : `pages-v2/gestionnaire/secretariat.html`
> Section "PEC Lunetterie" — traitement des demandes optiques.

### Étape 4 — Délivrance et facturation

> **Écran v2** : `pages-v2/prestataire/prestations.html`
> Historique des prestations optiques.

---

# P-08 : TRAITEMENT DES SINISTRES ET RÈGLEMENT

## Contexte
Après les soins, le prestataire soumet ses factures. Le service Sinistres vérifie, le Médecin Conseil valide médicalement, puis la Comptabilité règle via bordereaux.

## Acteurs impliqués
| Acteur | Rôle dans ce parcours | Nb utilisateurs |
|---|---|---|
| **Prestataire** (tous types) | Soumet ses factures et justificatifs | Plusieurs |
| **Service Gestion des Sinistres** | Enregistre, vérifie, corrige | 6 |
| **Médecin Conseil** | Valide la conformité médicale | 1 |
| **Comptabilité** | Prépare et exécute les paiements | 5 |

## Déroulement des actions

### Étape 1 — Soumission des factures

> **Écran v2** : `pages-v2/prestataire/saisie-prestation.html`
> Saisie de la prestation avec upload des justificatifs.

> **Écran v2** : `pages-v2/prestataire/prestations.html`
> Liste des prestations soumises avec statuts.

### Étape 2 — Enregistrement et vérification

> **Écran v2** : `pages-v2/gestionnaire/sinistres.html`
> Liste des sinistres avec montants, prestataires, statuts, scores de risque.

> **Écran v2** : `pages-v2/gestionnaire/sinistre-detail.html`
> Détail : actes, montants, taux de remboursement, part IIPS/adhérent.

> **Écran v2** : `pages-v2/gestionnaire/sinistre-prestation.html`
> Détail des actes facturés, vérification ligne par ligne. (Acteur : **Service Gestion des Sinistres**)

### Étape 3 — Contrôle anti-fraude
Le **Service Gestion des Sinistres** détecte les anomalies via le scoring automatique. L'**Audit** peut consulter les alertes pour contrôle de conformité.

> **Écran v2** : `pages-v2/gestionnaire/alertes-fraudes.html`
> Tableau des alertes fraudes avec scoring, investigations. (Acteurs : **Service Gestion des Sinistres, Audit**)

### Étape 4 — Validation médicale par le Médecin Conseil
Avis : Conforme, Non conforme, À compléter.

> **Écran v2** : `pages-v2/medecin/avis.html`
> Interface de validation médicale.

> **Écran v2** : `pages-v2/medecin/dossiers.html`
> Liste des dossiers à examiner.

> **Écran v2** : `pages-v2/medecin/protocoles.html`
> Protocoles thérapeutiques de référence.

### Étape 5 — Régularisation
Le **Service Gestion des Sinistres** corrige les montants si nécessaire après contrôle médical ou anti-fraude.

> **Écran v2** : `pages-v2/gestionnaire/sinistre-regularisation.html`
> Formulaire de régularisation avec motif et montant ajusté. (Acteur : **Service Gestion des Sinistres**)

### Étape 6 — Préparation du bordereau de paiement

> **Écran v2** : `pages-v2/gestionnaire/paiements.html`
> Liste des bordereaux par prestataire, montants, statuts.

> **Écran v2** : `pages-v2/gestionnaire/bordereau-detail.html`
> Détail du bordereau : sinistres inclus, montant total.

### Étape 7 — Règlement

> **Écran v2** : `pages-v2/gestionnaire/comptabilite.html`
> Écritures comptables, validation des paiements.

### Étape 8 — Suivi par le prestataire

> **Écran v2** : `pages-v2/prestataire/suivi-paiements.html`
> Historique des paiements reçus.

> **Écran v2** : `pages-v2/prestataire/bordereaux.html`
> Bordereaux reçus avec détail.

---

# P-09 : REMBOURSEMENT DIRECT À L'ASSURÉ

## Contexte
L'assuré a payé ses soins de sa poche (prestataire hors réseau ou urgence). Il demande un remboursement via son espace mobile.

## Acteurs impliqués
| Acteur | Rôle dans ce parcours | Nb utilisateurs |
|---|---|---|
| **Assuré** | Soumet sa demande avec justificatifs | Illimité |
| **Gestionnaire** | Traite, vérifie, calcule le remboursement | 6 |
| **Comptabilité** | Exécute le remboursement | 5 |

## Déroulement des actions

### Étape 1 — Soumission par l'assuré

> **Écran Assuré** : `pages/assure/remboursement.html` (v1 — mobile)
> Formulaire de demande avec upload.

### Étape 2 — Suivi par l'assuré

> **Écran Assuré** : `pages/assure/prestations.html` (v1 — mobile)

> **Écran Assuré** : `pages/assure/messages.html` (v1 — mobile)

### Étape 3 — Traitement par le gestionnaire

> **Écran v2** : `pages-v2/gestionnaire/sinistres.html`
> Le sinistre apparaît avec source "Assuré".

> **Écran v2** : `pages-v2/gestionnaire/sinistre-detail.html`

### Étape 4 — Versement
La **Comptabilité** prépare et exécute le remboursement à l'assuré.

> **Écran v2** : `pages-v2/gestionnaire/remboursement-detail.html`
> Détail du remboursement : montant, mode de paiement, date. (Acteur : **Comptabilité**)

---

# P-10 : COMMISSIONS DES COMMERCIAUX

## Contexte
Commerciaux et chefs d'équipe rémunérés par commissions et primes. Calcul automatisé.

## Acteurs impliqués
| Acteur | Rôle dans ce parcours | Nb utilisateurs |
|---|---|---|
| **Commercial** | Réalise les ventes | 60 |
| **Chef commercial** | Supervise, bénéficie du préfinancement | 40 |
| **RH** | Gère les commissions et le versement | 1 |
| **Comptabilité** | Exécute les paiements | 5 |

## Déroulement des actions

### Étape 1 — Calcul automatique des commissions
Commission standard 10%, prime transport 30 000F (≥10 ventes/mois), préfinancement 40 000–150 000F (chefs d'équipe).

### Étape 2 — Validation et versement

> **Écran v2** : `pages-v2/gestionnaire/commission-detail.html`
> Détail par commercial : ventes, montants, primes.

---

# P-11 : ESPACE SOCIÉTÉ — SUIVI PAR L'ENTREPRISE CLIENTE

## Contexte
Les entreprises clientes disposent d'un espace dédié pour le suivi des contrats de leurs employés, les primes et les statistiques de consommation.

## Acteurs impliqués
| Acteur | Rôle dans ce parcours | Nb utilisateurs |
|---|---|---|
| **Responsable RH de l'entreprise** | Consulte, gère les adhérents, suit les primes | Plusieurs |

## Déroulement des actions

### Étape 1 — Connexion et tableau de bord

> **Écran v2** : `pages-v2/societe/dashboard.html`
> Dashboard : adhérents, primes, consommation, alertes.

### Étape 2 — Consultation des contrats

> **Écran v2** : `pages-v2/societe/contrats.html`
> Liste avec 3 onglets : Actifs, En attente, Historique.

### Étape 3 — Gestion des adhérents

> **Écran v2** : `pages-v2/societe/adherents.html`
> Liste des adhérents avec modale d'ajout/retrait.

### Étape 4 — Suivi des primes

> **Écran v2** : `pages-v2/societe/primes.html`
> Échéancier, montants dus, paiements effectués.

### Étape 5 — Statistiques de consommation

> **Écran v2** : `pages-v2/societe/etats-prestations.html`
> Graphiques et tableaux par catégorie.

### Étape 6 — Réclamations et messagerie

> **Écran v2** : `pages-v2/societe/reclamations.html`

> **Écran v2** : `pages-v2/societe/messagerie.html`

---

# P-12 : RÉCLAMATION — PROCESSUS COMPLET

## Contexte
Tout acteur externe (assuré, prestataire, société) peut déposer une réclamation. Le CRM centralise le suivi.

## Acteurs impliqués
| Acteur | Rôle dans ce parcours | Nb utilisateurs |
|---|---|---|
| **Assuré** | Dépose depuis son espace mobile | Illimité |
| **Prestataire** | Dépose depuis son espace | Plusieurs |
| **Société** | Dépose depuis son espace | Plusieurs |
| **Gestionnaire CRM** | Reçoit, traite, résout | 6 |

## Déroulement des actions

### Étape 1 — Dépôt de la réclamation

> **Écran Assuré** : `pages/assure/reclamation.html` (v1 — mobile)

> **Écran v2** : `pages-v2/prestataire/reclamations.html`

> **Écran v2** : `pages-v2/societe/reclamations.html`

### Étape 2 — Réception et traitement

> **Écran v2** : `pages-v2/gestionnaire/crm.html` — Onglet "Réclamations"

### Étape 3 — Résolution et notification

> **Écran v2** : `pages-v2/gestionnaire/crm.html` — Onglet "Calendrier"

---

# P-13 : MÉDECIN CONSEIL — CONTRÔLE ET VALIDATION MÉDICALE

## Contexte
Le Médecin Conseil est le garant de la conformité médicale de toutes les prestations servies.

## Acteurs impliqués
| Acteur | Rôle dans ce parcours | Nb utilisateurs |
|---|---|---|
| **Médecin Conseil** | Analyse, valide, alerte | 1 |

## Déroulement des actions

### Étape 1 — Tableau de bord

> **Écran v2** : `pages-v2/medecin/dashboard.html`
> KPIs : dossiers à valider, avis rendus, alertes actives.

### Étape 2 — Examen des dossiers

> **Écran v2** : `pages-v2/medecin/dossiers.html`

### Étape 3 — Avis médical
Conforme / Non conforme / À compléter.

> **Écran v2** : `pages-v2/medecin/avis.html`

### Étape 4 — Vérification des protocoles

> **Écran v2** : `pages-v2/medecin/protocoles.html`

### Étape 5 — Gestion des alertes

> **Écran v2** : `pages-v2/medecin/alertes.html`

### Étape 6 — Vérification des ordonnances

> **Écran v2** : `pages-v2/medecin/ordonnances.html`

### Étape 7 — Communication

> **Écran v2** : `pages-v2/medecin/messagerie.html`

---

# P-14 : ADMINISTRATION, CONFIGURATION ET AUDIT

## Contexte
L'administrateur gère les accès au système, les rôles et la configuration métier. L'auditeur contrôle la traçabilité.

## Acteurs impliqués
| Acteur | Rôle dans ce parcours | Nb utilisateurs |
|---|---|---|
| **Administrateur** | Gère les comptes, rôles, sécurité | 2 |
| **Audit et Contrôle** | Contrôle la traçabilité et la conformité | 1 |
| **Direction Générale** | Supervise, décisions stratégiques | 2 |

## Déroulement des actions

### Action 14a — Gestion des utilisateurs

> **Écran v2** : `pages-v2/gestionnaire/administration.html` — Onglet "Utilisateurs"

> **Écran v2** : `pages-v2/gestionnaire/utilisateur-detail.html`
> Création/modification avec attribution de rôle, service, droits.

### Action 14b — Gestion des rôles et permissions
Matrice des permissions. Interdiction de l'auto-validation.

> **Écran v2** : `pages-v2/gestionnaire/administration.html` — Onglet "Rôles"

### Action 14c — Audit et traçabilité
Journal non modifiable de toutes les actions.

> **Écran v2** : `pages-v2/gestionnaire/administration.html` — Onglet "Audit"

### Action 14d — Configuration des actes médicaux
Restrictions, compatibilités, fréquences, spécialités, diagnostic CIM.

> **Écran v2** : `pages-v2/gestionnaire/configuration.html` — Onglet "Actes"

### Action 14e — Configuration des tarifs et barèmes

> **Écran v2** : `pages-v2/gestionnaire/configuration.html` — Onglets "Tarifs" et "Barèmes"

### Action 14f — Configuration de l'organisation
Hiérarchie : Régions → Agences → Chefs d'équipe → Commerciaux.

> **Écran v2** : `pages-v2/gestionnaire/configuration.html` — Onglet "Organisation"

### Action 14g — Reporting et pilotage

> **Écran v2** : `pages-v2/gestionnaire/reporting.html`
> Tableaux de bord dynamiques, exports Excel/PDF/CSV.

> **Écran v2** : `pages-v2/gestionnaire/dashboard.html`
> KPIs consolidés.

---

# P-15 : GESTION DU RÉSEAU DE SOINS

## Contexte

L'IIPS gère un réseau de prestataires agréés (cliniques, pharmacies, opticiens). Le service **Réseau de Soins** est responsable des conventions, agréments, tarifications négociées et du suivi qualité des structures partenaires.

## Acteurs impliqués

| Acteur | Rôle dans ce parcours | Nb utilisateurs |
|---|---|---|
| **Réseau de Soins** | Gère les conventions, agréments et tarification des prestataires | 2 |

## Déroulement des actions

### Étape 1 — Suivi du réseau de prestataires

Le service **Réseau de Soins** gère les conventions avec les structures de santé : agréments, tarification négociée, suivi de la qualité des soins et des volumes de prestations par prestataire.

> **Écran v2** : `pages-v2/gestionnaire/reseau-soins.html`
> Liste des prestataires conventionnés, statut des conventions, indicateurs qualité. (Acteur : **Réseau de Soins**)

### Étape 2 — Configuration des structures

Le paramétrage des structures de soins (types, spécialités, zones géographiques) est effectué dans la configuration.

> **Écran v2** : `pages-v2/gestionnaire/configuration.html` — Onglet "Structures"
> (Acteur : **Réseau de Soins**)

---

# TABLEAU DES FONCTIONNALITÉS PAR ACTEUR

Ce tableau présente l'ensemble des acteurs du système IIPS, leurs ressources humaines, rôles métier et outils (interfaces) utilisés.

| Acteurs | Ressource | Rôle | Outil |
|---------|-----------|------|-------|
| **IIPS — Direction Générale** | Directeur Général | Supervise l'activité générale de l'IIPS, prend les décisions stratégiques, consulte les tableaux de bord consolidés et les rapports | Application web de gestion : Espace Gestionnaire (`dashboard.html`, `reporting.html`) |
| *(Pilote l'ensemble de l'organisme d'assurance santé)* | Auditeur / Contrôleur | Contrôle la traçabilité de toutes les actions, consulte le journal d'audit non modifiable, vérifie la conformité des opérations | Application web de gestion : Espace Gestionnaire (`administration.html` — onglet Audit) |
| | | | |
| **IIPS — Direction Production** | Directeur de Production | Autorité finale de validation des souscriptions (N4), autorise les suspensions et résiliations de contrats, signe numériquement les polices | Application web de gestion : Espace Gestionnaire (`souscription-workflow.html`, `contrat-suspension.html`, `contrat-resiliation.html`) |
| *(Valide et supervise la production des contrats)* | | | |
| | | | |
| **IIPS — Service Exploitation** | Agent d'exploitation | Effectue les vérifications techniques approfondies sur les dossiers de souscription (N3), contrôle anti-doublon, attribue les numéros de police, crée les contrats à partir des souscriptions validées | Application web de gestion : Espace Gestionnaire (`souscription-workflow.html`, `contrat-nouveau.html`) |
| *(Traite les dossiers de souscription et crée les contrats)* | | | |
| | | | |
| **IIPS — Réseau commercial** | Commercial | Prospecte sur le terrain, identifie les clients potentiels, collecte les informations, crée les fiches prospects dans le CRM, saisit les dossiers de souscription. N'a accès qu'à ses propres dossiers | Application web de gestion : Espace Gestionnaire (`crm.html`, `prospect-detail.html`, `souscription-nouvelle.html`) |
| *(Prospecte et acquiert de nouveaux adhérents, 60 commerciaux répartis par régions)* | Chef d'équipe / Chef commercial | Supervise les commerciaux de son équipe, valide la qualité des prospects, effectue la validation N1 des dossiers de souscription (complétude et cohérence) | Application web de gestion : Espace Gestionnaire (`crm.html`, `souscription-workflow.html`) |
| | Marketing | Définit les campagnes commerciales (SMS, e-mailing), analyse les statistiques de vente par produit, région et commercial, suit le pipeline d'opportunités | Application web de gestion : Espace Gestionnaire (`crm.html` — onglets Opportunités, Calendrier) |
| | | | |
| **IIPS — Gestion des contrats** | Gestionnaire IIPS | Contrôle la conformité des dossiers de souscription (validation N2), peut corriger les informations, traite les modifications contractuelles (avenants), gère la liste des bénéficiaires, consulte l'historique des contrats et le CRM | Application web de gestion : Espace Gestionnaire (`souscription-detail.html`, `souscription-avenant.html`, `contrat-adherents.html`, `contrat-historique.html`, `sinistres.html`, `crm.html`) |
| *(Gère le portefeuille de contrats, les sinistres et la relation client)* | | | |
| | | | |
| **IIPS — Prise en charge (PEC)** | Agent PEC Analyses | Vérifie les droits de l'assuré, contrôle les plafonds annuels, vérifie la compatibilité des actes, valide ou rejette les demandes de prise en charge pour consultations et analyses | Application web de gestion : Espace Gestionnaire (`pec.html`, `pec-detail.html`) |
| *(Autorise ou refuse les prises en charge médicales)* | Agent PEC Hospitalisation | Idem que PEC Analyses mais pour les demandes d'hospitalisation, avec des contrôles supplémentaires sur les durées et les actes chirurgicaux | Application web de gestion : Espace Gestionnaire (`pec.html`, `pec-detail.html`) |
| | | | |
| **IIPS — Gestion des Sinistres** | Agent sinistres | Enregistre les factures des prestataires, vérifie la conformité des actes et montants, contrôle les alertes anti-fraude, effectue les régularisations, prépare les dossiers pour le Médecin Conseil | Application web de gestion : Espace Gestionnaire (`sinistres.html`, `sinistre-detail.html`, `sinistre-prestation.html`, `sinistre-regularisation.html`, `alertes-fraudes.html`) |
| *(Traite les sinistres et contrôle la conformité des factures)* | | | |
| | | | |
| **IIPS — Réseau de Soins** | Responsable réseau | Gère les conventions avec les prestataires agréés (cliniques, pharmacies, opticiens), négocie les tarifs, suit la qualité des soins et les volumes de prestations | Application web de gestion : Espace Gestionnaire (`reseau-soins.html`, `configuration.html` — onglet Structures) |
| *(Gère le réseau de prestataires conventionnés)* | | | |
| | | | |
| **IIPS — Caisse** | Caissier | Encaisse les frais de dossier (déclencheur d'activation du contrat), les frais de changement de formule, les frais de réédition de cartes, et les régularisations suite à relance de recouvrement | Application web de gestion : Espace Gestionnaire (`comptabilite.html`, `encaissement-nouveau.html`) |
| *(Encaisse les frais et primes, déclenche l'activation des contrats)* | | | |
| | | | |
| **IIPS — Secrétariat** | Secrétaire | Édite les polices d'assurance officielles, génère les fichiers de prélèvement mensuels (Trésor, SGBCI, Espèce, Banques), traite les PEC lunetterie (spécificité IIPS) | Application web de gestion : Espace Gestionnaire (`secretariat.html`, `contrat-attestation.html`) |
| *(Édite les polices et gère les fichiers de prélèvement)* | | | |
| | | | |
| **IIPS — Confection des cartes** | Agent de confection | Planifie la production des cartes d'assuré, vérifie la conformité des informations et photos, imprime les cartes, effectue le contrôle qualité, organise la distribution aux adhérents | Application web de gestion : Espace Gestionnaire (`confection-cartes.html`, `contrat-cartes.html`) |
| *(Produit et distribue les cartes d'assuré physiques)* | | | |
| | | | |
| **IIPS — Archives / GED** | Archiviste | Numérise les pièces originales du dossier physique, classe automatiquement dans la GED par n° police, nom et agence, indexe par mots-clés pour recherche ultérieure | Application web de gestion : Espace Gestionnaire (`ged.html`) |
| *(Numérise et classe les dossiers dans la GED)* | | | |
| | | | |
| **IIPS — Comptabilité et finance** | Comptable | Enregistre les mouvements financiers, importe les fichiers retour bancaires, prépare les bordereaux de paiement, valide et exécute les règlements aux prestataires et les remboursements aux assurés | Application web de gestion : Espace Gestionnaire (`comptabilite.html`, `paiements.html`, `bordereau-detail.html`, `remboursement-detail.html`) |
| *(Gère la comptabilité, les paiements et les remboursements)* | Trésorier | Effectue le rapprochement entre les fichiers de prélèvement émis et les retours bancaires reçus, calcule les taux de recouvrement | Application web de gestion : Espace Gestionnaire (`tresorerie.html`) |
| | Agent de recouvrement | Détecte les adhérents en impayé, lance les relances (N1 appel, N2 courrier, N3 mise en demeure), suit le contentieux, déclenche les suspensions si nécessaire | Application web de gestion : Espace Gestionnaire (`recouvrement.html`) |
| | | | |
| **IIPS — Ressources humaines** | Responsable RH | Vérifie les calculs de commissions des commerciaux (10% du contrat), valide les primes de transport (30 000F/mois si ≥10 ventes) et les préfinancements des chefs d'équipe | Application web de gestion : Espace Gestionnaire (`commission-detail.html`) |
| *(Gère les commissions et rémunérations des commerciaux)* | | | |
| | | | |
| **IIPS — Administration système** | Administrateur | Crée, modifie ou désactive les comptes utilisateurs, configure la matrice des permissions et rôles, paramètre les actes médicaux, tarifs, barèmes et l'organisation hiérarchique | Application web de gestion : Espace Gestionnaire (`administration.html`, `utilisateur-detail.html`, `configuration.html`) |
| *(Gère les accès, rôles, permissions et la configuration métier)* | | | |
| | | | |
| **IIPS — Médecin Conseil** | Médecin Conseil | Examine les dossiers patients signalés, rend des avis médicaux (conforme/non conforme/à compléter), vérifie les protocoles thérapeutiques, traite les alertes anti-fraude, vérifie les ordonnances | Application web de gestion : Espace Médecin (`dashboard.html`, `dossiers.html`, `avis.html`, `protocoles.html`, `alertes.html`, `ordonnances.html`, `messagerie.html`) |
| *(Garant de la conformité médicale des prestations)* | | | |
| | | | |
| **Prestataire de santé — Clinique** | Médecin / Infirmier | Vérifie l'éligibilité de l'assuré (contrat actif, carte valide, carence passée), soumet les demandes de PEC avec diagnostic CIM, saisit les prestations réalisées, soumet les factures | Application web de gestion : Espace Prestataire (`dashboard.html`, `demandes.html`, `saisie-prestation.html`, `prestations.html`) |
| *(Fournit les soins médicaux aux assurés du réseau IIPS)* | | | |
| | | | |
| **Prestataire de santé — Pharmacie** | Pharmacien | Vérifie les droits de l'adhérent et la validité de l'ordonnance, contrôle les quantités délivrables et les interactions médicamenteuses, saisit la dispensation, facture (70% IIPS / 30% assuré) | Application web de gestion : Espace Prestataire (`dashboard.html`, `saisie-prestation.html`, `prestations.html`) |
| *(Délivre les médicaments et facture à l'IIPS)* | | | |
| | | | |
| **Prestataire de santé — Opticien** | Opticien | Vérifie la couverture optique et le plafond lunetterie disponible, prépare et soumet un devis (montures, verres, lentilles) au Secrétariat IIPS pour validation, délivre les équipements | Application web de gestion : Espace Prestataire (`dashboard.html`, `saisie-prestation.html`, `prestations.html`) |
| *(Fournit les équipements optiques aux assurés)* | | | |
| | | | |
| **Prestataire — Suivi financier** | Responsable administratif | Consulte l'historique des paiements reçus de l'IIPS, vérifie les bordereaux de règlement, dépose et suit les réclamations, communique avec l'IIPS via messagerie sécurisée | Application web de gestion : Espace Prestataire (`suivi-paiements.html`, `bordereaux.html`, `reclamations.html`, `messagerie.html`) |
| *(Suit les paiements et communique avec l'IIPS)* | | | |
| | | | |
| **Société cliente** | Responsable RH entreprise | Consulte le tableau de bord de son entreprise (adhérents, primes, consommation), gère la liste des employés couverts (ajout/retrait), suit l'échéancier des primes, consulte les statistiques de consommation par type d'acte | Application web de gestion : Espace Société (`dashboard.html`, `contrats.html`, `adherents.html`, `primes.html`, `etats-prestations.html`, `reclamations.html`, `messagerie.html`) |
| *(Souscrit des contrats groupe pour ses employés et suit leur couverture)* | | | |
| | | | |
| **Assuré** | Adhérent / Ayant droit | Consulte sa carte numérique (QR code), vérifie ses garanties et plafonds restants, soumet des demandes de remboursement pour soins hors réseau, dépose des réclamations, communique avec le gestionnaire IIPS | Application mobile : Espace Assuré (`carte.html`, `garanties.html`, `prestations.html`, `remboursement.html`, `reclamation.html`, `messages.html`, `profil.html`) |
| *(Bénéficie de la couverture santé IIPS)* | | | |

---

# RÉCAPITULATIF GÉNÉRAL

| # | Parcours | Description | Acteurs principaux |
|---|---|---|---|
| P-01 | Prospection et acquisition | Du terrain au CRM | Commercial, Chef commercial, Marketing |
| P-02 | Souscription et activation | Création → 4 validations → adhérents créés | Commercial → Chef → Gestionnaire → Exploitation → Direction |
| P-03 | Vie du contrat | Création, activation, avenants, suspension, résiliation | Exploitation, Caisse, Secrétariat, Archives, Confection |
| P-04 | Prélèvement et recouvrement | Primes mensuelles, fichiers bancaires, impayés | Secrétariat, Comptabilité, Trésorerie, Recouvrement |
| P-05 | PEC consultation/analyses | Assuré chez le prestataire clinique | Assuré, Clinique, PEC Analyses |
| P-06 | PEC pharmacie | Dispensation médicaments | Assuré, Pharmacie |
| P-07 | PEC optique | Lunetterie via Secrétariat | Assuré, Opticien, Secrétariat |
| P-08 | Sinistres et règlement | Facturation → contrôle → paiement | Prestataire, Sinistres, Médecin Conseil, Comptabilité |
| P-09 | Remboursement direct | Soins hors réseau → remboursement assuré | Assuré, Gestionnaire, Comptabilité |
| P-10 | Commissions commerciales | Calcul et versement automatisés | Commercial, RH, Comptabilité |
| P-11 | Espace Société | Self-service entreprise cliente | Responsable RH entreprise |
| P-12 | Réclamation | Dépôt → traitement → résolution | Tous acteurs → CRM Gestionnaire |
| P-13 | Médecin Conseil | Contrôle et validation médicale | Médecin Conseil |
| P-14 | Administration et configuration | Utilisateurs, rôles, paramétrage, audit | Administrateur, Audit, Direction Générale |
| P-15 | Gestion du réseau de soins | Conventions, agréments, tarification prestataires | Réseau de Soins |

---

# STATISTIQUES DE COUVERTURE

| Métrique | Valeur |
|---|---|
| Parcours métier documentés | 15 |
| Acteurs distincts | 7 (IIPS, Clinique, Pharmacie, Opticien, Société, Assuré, Médecin Conseil) |
| Ressources identifiées | 28 profils métier |
| Outils / Interfaces | 5 espaces (Gestionnaire, Prestataire, Société, Médecin, Assuré) |
| Écrans v2 maquettés | 71 (login + 42 gestionnaire + 12 prestataire + 7 société + 9 médecin) |
| Écrans v1 (Assuré mobile) | 9 |
| **Total écrans** | **80** |
| Nb utilisateurs estimés | ~200+ internes IIPS + prestataires + sociétés + assurés illimités |
