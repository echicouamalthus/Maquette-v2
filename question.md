# Questions & Incohérences — Audit Maquette IIPS

---

## A. WORKFLOWS CASSÉS (Haute priorité)

### A1. Souscription validée → Aucune création de contrat
Quand la souscription SUB-2026-0202 est validée au Niveau 4 (Direction Production) dans `souscription-detail.html`, le bouton "Valider" affiche un simple toast mais **ne redirige pas** vers `contrat-nouveau.html` et ne génère aucun numéro CTR-xxxx.
- **Attendu :** Validation N4 → redirection vers la création du contrat (ou création automatique) avec référence CTR-xxxx
- **Actuel :** Toast "Souscription validée !" et rien d'autre

### A2. Prospect converti → Pas de lien vers souscription
Dans `prospect-detail.html`, le bouton "Créer une souscription" (statut qualifié) appelle `changeProspectStatus('converti')` et affiche un toast "Redirection vers nouvelle souscription..." mais **aucune redirection réelle** ne se produit vers `souscription-nouvelle.html`.
- **Attendu :** Clic → ouverture de `souscription-nouvelle.html` avec données prospect pré-remplies (société, contact, téléphone, email)
- **Actuel :** Toast uniquement, pas de navigation

### A3. Contrat activé → Pas de lien vers confection cartes
Quand un contrat est activé dans `contrat-detail.html`, il n'y a **aucun bouton** pour déclencher la confection des cartes. La page `confection-cartes.html` est complètement isolée.
- **Attendu :** Bouton "Demander confection cartes" sur contrat-detail après activation
- **Actuel :** Confection cartes accessible uniquement par la sidebar, sans lien contextuel

### A4. Contrat → Aucun lien vers sinistres associés
Dans `contrat-detail.html` (CTR-2026-1847), il n'y a **aucune section ou bouton** pour voir les sinistres liés à ce contrat.
- **Attendu :** Section "Sinistres" ou bouton "Voir les sinistres de ce contrat" filtrant par CTR-xxxx
- **Actuel :** Pas de lien contrat → sinistres

---

## B. ÉLÉMENTS MANQUANTS (Priorité moyenne)

### B1. Pas de bouton "Créer bordereau" dans les paiements
La page `paiements.html` affiche les bordereaux existants avec des boutons "Valider" et "Détail" mais **pas de bouton "Nouveau bordereau"** pour en initier un.
- **Question :** Les bordereaux sont-ils toujours soumis par les prestataires ? Ou le gestionnaire doit-il pouvoir en créer manuellement ?

### B2. PEC — Boutons d'approbation sans progression réelle
Dans `pec-detail.html`, les boutons "Accorder" et "Refuser" affichent des toasts mais **ne font pas progresser le workflow** (pas de passage au niveau suivant).
- **Attendu :** "Accorder" au Niveau 2 → passe au Niveau 3 (visuellement)
- **Actuel :** Toast uniquement

### B3. Préchargement données souscripteur
Dans `souscription-nouvelle.html`, le champ "Rechercher le souscripteur" ne pré-remplit **aucune donnée**. Quand un prospect est converti depuis le CRM, ses informations devraient être auto-remplies.

### B4. Description des types de contrats absente
Les types de contrats (ALPHA 1, ALPHA 2, BETHA, CONFORT, SOLIDARITÉ, etc.) sont utilisés partout mais **jamais décrits** (garanties, plafonds, tarifs). La page `configuration.html` (onglet Types) serait l'endroit logique.

---

## C. SIDEBARS INCOHÉRENTES (Priorité moyenne)

### C1. Trois structures de sidebar différentes
Les 40 pages gestionnaire utilisent 3 sidebars différentes :

| Structure | Nb items | Nb pages | Exemples |
|-----------|----------|----------|----------|
| Complète  | 16       | 27       | dashboard, contrats, comptabilite, crm, pec... |
| Réduite   | 11       | 5        | souscriptions, souscription-detail, souscription-nouvelle... |
| Minimale  | 8        | 9        | contrat-adherents, contrat-attestation, contrat-cartes, profil... |

- **Question :** Toutes les pages gestionnaire doivent-elles avoir la même sidebar complète (16 items) ?
- **Impact :** Les pages avec la sidebar minimale (8 items) n'ont pas accès à : PEC, Confection Cartes, Secrétariat, Comptabilité, Trésorerie, Recouvrement, GED, Administration

### C2. Pages avec sidebar minimale (8 items) — à aligner
- `contrat-adherents.html`
- `contrat-attestation.html`
- `contrat-cartes.html`
- `contrat-historique.html`
- `contrat-resiliation.html`
- `contrat-suspension.html`
- `profil.html`
- `sinistre-prestation.html`
- `souscription-workflow.html`

### C3. Pages avec sidebar réduite (11 items) — à aligner
- `souscriptions.html`
- `souscription-detail.html`
- `souscription-nouvelle.html`
- `souscription-avenant.html`
- `contrat-nouveau.html`

---

## D. PAGES ORPHELINES (Pas de lien entrant)

11 pages ne sont liées depuis aucune autre page :

| Page | Description | Lien attendu depuis |
|------|-------------|---------------------|
| `contrat-adherents.html` | G-014 Liste adhérents | `contrat-detail.html` (onglet ou bouton) |
| `contrat-attestation.html` | G-018 Attestations | `contrat-detail.html` (bouton) |
| `contrat-cartes.html` | G-015 Cartes du contrat | `contrat-detail.html` (onglet ou bouton) |
| `contrat-historique.html` | G-013 Historique contrat | `contrat-detail.html` (onglet ou bouton) |
| `contrat-resiliation.html` | G-017 Résiliation | `contrat-detail.html` (bouton) |
| `contrat-suspension.html` | G-016 Suspension | `contrat-detail.html` (bouton) |
| `sinistre-prestation.html` | G-031 Prestation sinistre | `sinistre-detail.html` (bouton/lien) |
| `souscription-workflow.html` | G-023 Workflow souscription | `souscription-detail.html` (onglet) |
| `alertes-fraudes.html` | G-034 Alertes fraudes | `sinistres.html` ou `dashboard.html` |
| `profil.html` | G-005 Profil utilisateur | `sidebar footer` (clic avatar) ou topbar |
| `prospect-detail-qualifie.html` | Variante prospect | `crm.html` (optionnel) |

---

## E. QUESTIONS MÉTIER À CLARIFIER

### E1. Changement de statut CRM — en ligne ou fiche uniquement ?
Le changement de statut prospect (Nouveau → Contacté → Qualifié → Converti/Perdu) fonctionne dans la fiche `prospect-detail.html` mais pas depuis la liste `crm.html`.
- **Question :** Faut-il pouvoir changer le statut directement depuis le tableau CRM (action rapide en ligne) ?

### E2. Accès commercial au module souscription
Le rôle `commercial` a bien `souscription` dans ses modules autorisés (roles.js). Il peut voir la liste et les détails.
- **Question :** Le commercial doit-il pouvoir uniquement **consulter** (lecture seule) ou aussi **créer/modifier** des souscriptions ?

### E3. Modèle de création des bordereaux
La page paiements n'a pas de bouton "Créer bordereau".
- **Question :** Les bordereaux sont-ils exclusivement soumis par les prestataires (via l'espace Prestataire) ou le gestionnaire doit-il aussi pouvoir en créer ?

### E4. Workflow PEC — combien de niveaux ?
`pec-detail.html` affiche "Niveau 2/4" dans le badge mais les boutons ne montrent pas les 4 niveaux.
- **Question :** La PEC suit-elle le même workflow 4 niveaux que la souscription ? Quels sont les acteurs à chaque niveau ?

### E5. Lien secrétariat ↔ production
Le secrétariat gère l'édition des polices (secretariat.html, onglet "Édition polices") et la page `contrat-attestation.html` gère la génération d'attestations.
- **Question :** Ces deux fonctions doivent-elles être regroupées ou rester séparées ?

---

## F. INCOHÉRENCES TECHNIQUES

### F1. Styles inline restants
Plusieurs pages ont encore des blocs `<style>` inline (convention = CSS externe) :
- ~~`secretariat.html`~~ ✅ Corrigé → `secretariat.css`
- ~~`confection-cartes.html`~~ ✅ Corrigé → `confection-cartes.css`
- Restent potentiellement d'autres pages à vérifier

### F2. Redirection silencieuse par rôle
~~Le système de protection d'accès redirige silencieusement vers la homePage du rôle quand le module n'est pas autorisé.~~ ✅ Corrigé → toast d'avertissement au lieu de redirection

### F3. Topbar role-switcher absent sur certaines pages
Les pages avec la sidebar minimale (8 items) n'ont pas le composant `topbar__role-indicator` avec le sélecteur de rôle. L'utilisateur ne peut pas changer de rôle depuis ces pages.

---

## G. RÔLES DUPLIQUÉS (`roles.js`) (Priorité moyenne)

22+ rôles définis dans `roles.js`. Plusieurs sont redondants (mêmes modules d'accès ou quasi-identiques).

### G1. Doublons exacts — modules 100% identiques

| Rôle A | Rôle B | Modules identiques |
|--------|--------|--------------------|
| `commercial` | `superviseur` | `dashboard, souscription, crm` |
| `ged` | `archives` | `dashboard, ged` |
| `pec_hospitalisation` | `pec_analyses` | `dashboard, pec, sinistre` |

- **Recommandation :** Fusionner chaque paire en un seul rôle (garder le plus générique) ou différencier leurs modules.

### G2. Quasi-doublons — 1 seul module de différence

| Rôle A | Rôle B | Différence unique |
|--------|--------|-------------------|
| `superviseur` | `chef_commercial` | `chef_commercial` = superviseur + **reporting** |
| `caisse` | `comptabilite_role` | `comptabilite_role` = caisse + **reporting** |
| `direction_generale` | `direction_production` | `direction_generale` = direction_production + **administration** |

- **Question :** Cette différence d'un seul module justifie-t-elle deux rôles distincts ?

### G3. Rôle englobant — `directeur` ⊂ `direction_generale`

Le rôle `directeur` (modules : `dashboard, souscription, reporting, administration`) est un **sous-ensemble strict** de `direction_generale` (11 modules).
- **Question :** `directeur` est-il encore pertinent ou doit-il être remplacé par `direction_generale` ?

### G4. Super-rôle `gestionnaire` — accès à TOUS les modules

Le rôle `gestionnaire` a accès aux 16 modules (tous). Il englobe donc **tous les autres rôles**.
- **Question :** Ce super-rôle est-il volontaire (compte de test / développement) ou doit-il être restreint à un périmètre métier précis ?

### G5. Fusions recommandées

| Fusion proposée | Rôle à garder | Rôle à supprimer | Justification |
|----------------|---------------|-------------------|---------------|
| `superviseur` + `chef_commercial` | `chef_commercial` | `superviseur` | Même fonction (supervision commerciale), ajouter `reporting` |
| `ged` + `archives` | `ged` | `archives` | Modules identiques, description à élargir "GED et Archives" |
| `pec_hospitalisation` + `pec_analyses` | `pec` (nouveau) | les deux | Modules identiques, fusionner en "PEC Hospitalisation, Analyses & Radio" |
| `directeur` → `direction_generale` | `direction_generale` | `directeur` | `directeur` est un sous-ensemble strict de DG |

---

## H. PERMISSIONS PRESTATAIRES ABSENTES (Priorité haute)

3 types de prestataires existent avec des portails séparés (Clinique, Pharmacie, Opticien), mais **aucun rôle prestataire n'est défini dans `roles.js`**. L'accès repose uniquement sur le choix d'espace au login — pas de contrôle de permissions.

### H1. Aucun rôle prestataire dans `roles.js`

`roles.js` définit 22+ rôles **tous internes IIPS** (gestionnaire, commercial, etc.). Les prestataires n'ont aucune entrée.
- **Impact :** Pas de `canAccessModule()` pour les prestataires, pas de persona, pas de contrôle d'accès par module.
- **Attendu :** 3 rôles prestataires avec modules spécifiques à chaque type.

### H2. Pages et fonctionnalités par type de prestataire

| Fonctionnalité | Clinique (12 pages) | Pharmacie (8 pages) | Opticien (8 pages) |
|---|---|---|---|
| **Dashboard** | `dashboard.html` | `dashboard.html` | `dashboard.html` |
| **Vérification** | Éligibilité assuré | Validité ordonnance | Couverture optique |
| **Saisie** | `saisie-prestation.html` (7 types d'actes) | `saisie-dispensation.html` (médicaments) | `saisie-prestation.html` (équipements) |
| **Suivi prestations** | `prestations.html` + `prestation-detail.html` | `dispensations.html` | `prestations.html` |
| **Historique patient** | `historique-patient.html` | — | — |
| **Analyses** | `analyses.html` | — | — |
| **Hospitalisation** | `hospitalisation.html` | — | — |
| **Vérif. spécifique** | — | `verification-ordonnance.html` | `verification-prescription.html` |
| **Bordereaux** | `bordereaux.html` | `bordereaux.html` | `bordereaux.html` |
| **Suivi paiements** | `suivi-paiements.html` | `suivi-paiements.html` | `suivi-paiements.html` |
| **Demandes** | `demandes.html` | — | — |
| **Réclamations** | `reclamations.html` | `reclamations.html` | `reclamations.html` |
| **Messagerie** | `messagerie.html` | `messagerie.html` | `messagerie.html` |

### H3. Différences métier clés entre types

| Aspect | Clinique | Pharmacie | Opticien |
|---|---|---|---|
| **Workflow principal** | Consultation → PEC → Prestation | Ordonnance → Dispensation → Facture | Prescription → Devis → Équipement |
| **Contrôles spécifiques** | Éligibilité, plafonds garanties | Interactions médicamenteuses, quantités max | Plafond optique par contrat |
| **Répartition paiement** | Variable selon contrat | Fixe 70% IIPS / 30% Assuré | Variable selon contrat |
| **Acteur PEC côté IIPS** | PEC Hospitalisation / PEC Analyses | PEC Analyses | Secrétariat (pas PEC) |
| **Thème CSS** | Bleu ciel `#0284C7` | Émeraude `#059669` | Indigo `#4F46E5` |

### H4. Recommandation — 3 rôles à ajouter dans `roles.js`

| Rôle proposé | Modules | Pages exclusives |
|---|---|---|
| `prestataire_clinique` | `dashboard, prestations, analyses, hospitalisation, historique, bordereaux, paiements, demandes, reclamations, messagerie` | historique-patient, analyses, hospitalisation, demandes |
| `prestataire_pharmacie` | `dashboard, dispensation, verification-ordonnance, bordereaux, paiements, reclamations, messagerie` | verification-ordonnance, saisie-dispensation, dispensations |
| `prestataire_opticien` | `dashboard, prestations, verification-prescription, bordereaux, paiements, reclamations, messagerie` | verification-prescription, saisie-équipement |

- **Question :** Faut-il 3 rôles distincts ou 1 rôle `prestataire` unique avec un attribut `type` qui filtre les pages accessibles ?
