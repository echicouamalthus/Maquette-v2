# Parcours Client — IIPS
## Description detaillee des processus metiers

**Projet** : Logiciel de Gestion Assurance Sante — IIPS
**Base** : CdC v3.0 + Maquette KOJIT
**Date** : 26/02/2026

---

# P-01 : PROSPECTION ET ACQUISITION CLIENT

## Contexte
Tout commence par l'acquisition de nouveaux clients. L'IIPS dispose d'un reseau de 60 commerciaux, encadres par 40 chefs commerciaux, repartis par regions et agences. Le processus demarre sur le terrain et se finalise dans le systeme.

## Acteurs impliques
| Acteur | Role dans ce parcours | Nb utilisateurs |
|---|---|---|
| **Commercial** | Prospecte sur le terrain, identifie les clients potentiels, collecte les premieres informations | 60 |
| **Chef commercial** | Supervise les commerciaux de son equipe, valide la qualite des prospects | 40 |
| **Marketing** | Definit les campagnes, analyse les ventes, propose des actions de fidelisation | 1 |

## Deroulement des actions

### Etape 1 — Prospection terrain
Le **commercial** identifie un prospect (particulier ou entreprise). Il collecte les informations de base : nom, prenom, telephone, situation familiale, employeur, besoin en assurance sante. Ces informations sont saisies dans le CRM du systeme.

> **Ecran** : `gestionnaire/crm.html` — Onglet "Prospects"
> Le commercial cree une fiche prospect avec le statut "Nouveau".

### Etape 2 — Qualification du prospect
Le commercial approfondit le contact : il presente les differentes garanties (Alpha 1, Alpha 2, Betha, Confort, Enseignant...), evalue le besoin du prospect et determine la formule adaptee. Il met a jour la fiche avec les details collectes.

> **Ecran** : `gestionnaire/prospect-detail.html`
> Fiche complete du prospect avec historique des echanges et documents collectes.

### Etape 3 — Conversion en souscription
Lorsque le prospect est pret a souscrire, le commercial convertit la fiche prospect en dossier de souscription. Le systeme rattache automatiquement le dossier au commercial, a son chef d'equipe et a son agence (codes hierarchiques Region/Agence/Chef/Commercial).

> **Ecran** : `gestionnaire/prospect-detail-qualifie.html`
> Prospect qualifie avec bouton "Convertir en souscription". Le statut passe de "Qualifie" a "Converti".

### Etape 4 — Campagnes marketing (en parallele)
Le service **Marketing** analyse les statistiques de vente par produit, region et commercial. Il lance des campagnes ciblees (SMS, e-mailing) pour generer de nouveaux prospects ou fideliser les clients existants.

> **Ecran** : `gestionnaire/crm.html` — Onglet "Opportunites"
> Suivi des opportunites commerciales et pipeline de vente.

---

# P-02 : SOUSCRIPTION ET CREATION DES ADHERENTS

## Contexte
La souscription est le point d'entree de tout nouvel adherent dans le systeme IIPS. Ce parcours couvre la collecte des informations, la constitution du dossier et sa validation a travers 4 niveaux hierarchiques. A l'issue de ce parcours, les adherents (principal + ayants droit) sont crees dans le systeme et le dossier est **valide**, pret a etre transforme en contrat actif (voir P-03).

Le processus suit un enchaînement strict : **Creation dossier → Validation N1 → N2 → N3 → N4 → Dossier valide**

Tout rejet a un niveau renvoie automatiquement le dossier au niveau precedent. Le commercial dispose de **90 jours maximum** pour corriger et resoumettre. Au-dela, le dossier est classe sans suite.

## Acteurs impliques

| Acteur | Role dans ce parcours | Nb utilisateurs |
|---|---|---|
| **Commercial** | Prospecte sur le terrain, cree le dossier de souscription, collecte les pieces et photos, uploade les documents. N'a acces qu'a ses propres dossiers (droits : ajout/lecture) | 60 |
| **Chef d'equipe** (Validation N1) | Premier filtre. Supervise les dossiers de ses commerciaux, verifie la completude avant transmission (droits : ajout/lecture/modification) | 40 |
| **Gestionnaire/Agence** (Validation N2) | Controle la conformite des informations et documents. Peut corriger le dossier si necessaire (droits : ajout/modification/suppression) | 6 |
| **Service Exploitation** (Validation N3) | Verification approfondie, controle anti-doublon, attribution du numero de police (droits : ajout/modification/lecture) | 2 |
| **Direction Production** (Validation N4) | Autorite finale. Apres sa validation, le dossier passe en statut "Valide — en attente de contrat" | 1 |

## Deroulement des actions

### Etape 1 — Arrivee du dossier
Le parcours de souscription demarre de deux manieres :
- **Conversion depuis le CRM (P-01)** : le prospect qualifie est converti en dossier de souscription. Le systeme pre-remplit les informations deja collectees (nom, telephone, employeur...).
- **Creation directe** : le commercial cree un dossier sans passer par le CRM (client qui se presente directement).

Dans les deux cas, le dossier est automatiquement **rattache** au commercial qui l'a cree, a son chef d'equipe et a son agence (codes hierarchiques Region → Agence → Chef → Commercial).

> **Ecran** : `gestionnaire/souscriptions.html`
> Liste de tous les dossiers de souscription. Le commercial ne voit que ses propres dossiers. Le chef d'equipe voit ceux de son equipe. Statuts visibles : "Brouillon", "En validation N1", "En validation N2", "Valide", "Rejete"...

### Etape 2 — Saisie du dossier par le commercial
Le **commercial** remplit le formulaire de souscription avec :

**Informations de l'adherent principal :**
- Nom, prenom, date de naissance, lieu de naissance
- Numero matricule (obligatoire si fonctionnaire)
- Adresse, telephone, email
- Employeur et fonction
- Photo d'identite

**Choix du type de contrat :**
- Fonctionnaire : Alpha 1, Alpha 2, Betha, Betha Classique, Enseignant
- Particulier : Confort Plus, Confort Classique
- Groupe : Groupe IIPS, Groupe Classic, Auto-gestion

Le systeme affiche immediatement la **prime mensuelle calculee** selon le bareme :
- Exemple Alpha 1 : 22 125F/mois (adherent < 55 ans, famille 7 personnes)
- Adherent 55-60 ans : 28 998F/mois (+33%)
- Adherent 60-65 ans : 36 078F/mois (+67%)

**Declaration des ayants droit :**
- Conjoint (avec date de naissance pour calcul surcotisation eventuelle)
- Enfants de moins de 20 ans (max 5 inclus dans la formule de base)
- Enfant supplementaire < 20 ans : +27% (5 795F pour Alpha 1)
- Enfant etudiant 20-26 ans : +31% (9 372F pour Alpha 1)
- Seconde epouse : +50% de la prime de base

**Declaration des maladies chroniques** (le cas echeant) :
- Diabete : surcotisation 23 436F/mois
- Tension : 17 765F/mois
- Asthme : 17 528F/mois
- Epilepsie : 22 315F/mois
- Si non declaree et decouverte plus tard : surprime TPC retroactive

**Pieces justificatives uploadees :**
- Copie CNI adherent et conjoint
- Photos d'identite de tous les beneficiaires
- Bulletin de salaire ou attestation d'emploi
- Certificat de mariage (si conjoint)
- Extraits de naissance des enfants
- Certificat de scolarite (enfants etudiants 20-26 ans)

Le commercial soumet le dossier → statut passe a **"En validation N1"**.

> **Ecran** : `gestionnaire/souscription-nouvelle.html`
> Formulaire complet en plusieurs sections, calcul automatique de la prime, checklist de pieces, bouton "Soumettre".

### Etape 3 — Validation Niveau 1 : Chef d'equipe
Le **chef d'equipe** recoit une notification. Il ouvre le dossier et verifie :
- La completude des informations saisies (aucun champ obligatoire vide)
- La presence de toutes les pieces requises (checklist)
- La coherence des informations (age vs date de naissance, nombre d'enfants, etc.)
- La qualite des photos et documents uploades (lisibles, non expires)

**Si valide** → statut **"En validation N2"**, transmis au Gestionnaire.
**Si rejete** → statut **"Rejete N1"**, retour au commercial avec motif obligatoire. Delai : 90 jours.

> **Ecran** : `gestionnaire/souscription-workflow.html`
> Les 4 niveaux de validation. Le dossier est au niveau 1. Boutons "Valider" et "Rejeter" avec champ motif.

### Etape 4 — Validation Niveau 2 : Gestionnaire/Agence
Le **gestionnaire** effectue un controle approfondi :
- Conformite des documents (dates de validite, authenticite)
- Verification des informations declarees par rapport aux pieces
- Coherence du choix de contrat (un fonctionnaire ne peut pas souscrire un contrat Particulier)
- Verification des surcotisations appliquees (age, maladies chroniques)

Le gestionnaire peut **corriger** des informations mineures (il a les droits de modification).

**Si valide** → statut **"En validation N3"**, transmis au Service Exploitation.
**Si rejete** → statut **"Rejete N2"**, retour au Chef d'equipe (N1).

> **Ecran** : `gestionnaire/souscription-detail.html`
> Vue complete du dossier avec informations adherent, ayants droit, documents, historique des validations precedentes.

### Etape 5 — Validation Niveau 3 : Service Exploitation
Le **service Exploitation** effectue les verifications techniques :
- **Controle anti-doublon** : le souscripteur n'a pas deja un contrat actif (verification par nom + date naissance + matricule)
- **Verification des regles de tarification** : la prime calculee est conforme aux baremes en vigueur
- **Attribution du numero de police** : le systeme genere un numero unique
- **Verification complete** : derniere revue avant soumission a la Direction

Le dossier porte desormais un **numero de police**, mais les adherents ne sont pas encore actifs.

**Si valide** → statut **"En validation N4"**, transmis a la Direction Production.
**Si rejete** → statut **"Rejete N3"**, retour au Gestionnaire (N2).

> **Ecran** : `gestionnaire/souscription-workflow.html`
> Le dossier est au niveau 3. Le numero de police attribue est visible.

### Etape 6 — Validation Niveau 4 : Direction Production (validation finale)
La **Direction Production** est l'autorite finale. Elle verifie que :
- Toutes les validations precedentes sont conformes
- Le dossier est complet et coherent
- Les regles de tarification sont respectees
- Aucune alerte ou anomalie n'a ete signalee

**Si valide** → statut **"Valide — en attente de contrat"**. Les adherents (principal + ayants droit) sont crees dans le systeme mais **pas encore actifs**. Le dossier est pret pour la creation du contrat (P-03).
**Si rejete** → statut **"Rejete N4"**, retour au Service Exploitation (N3).

> **Ecran** : `gestionnaire/souscription-workflow.html`
> Le dossier est au niveau 4. Bouton "Validation finale". Apres validation, le statut change.

### Resume du flux de validation

```
COMMERCIAL              CHEF D'EQUIPE            GESTIONNAIRE
Cree le dossier ──────► Valide N1 ────────────► Valide N2
  (Brouillon)           (En validation N1)       (En validation N2)
      ▲                       │                        │
      └── Rejete N1 ◄────────┘                        │
                               ▲                       │
                               └── Rejete N2 ◄────────┘

EXPLOITATION              DIRECTION PRODUCTION
Valide N3 ──────────────► Valide N4 (finale)
(En validation N3)         (En validation N4)
      │                         │
      ▲                         ▼
      └── Rejete N3 ◄──────┘   DOSSIER VALIDE
                                (adherents crees, en attente de contrat)
                                      │
                                      ▼
                                Vers P-03 : Vie du contrat
```

---

# P-03 : VIE DU CONTRAT (CREATION, ACTIVATION ET MODIFICATIONS)

## Contexte
Ce parcours couvre tout le cycle de vie du contrat, depuis sa creation (a partir du dossier de souscription valide en P-02) jusqu'a sa resiliation eventuelle. Il comprend :
1. **Creation du contrat** a partir de la souscription validee
2. **Paiement des frais** de dossier (declencheur d'activation)
3. **Activation** du contrat et emission des cartes
4. **Modifications en cours de vie** : avenants, changement de formule
5. **Suspension et resiliation**

Le flux suit l'enchaînement : **Souscription validee (P-02) → Creation contrat → Paiement frais → Activation → Vie du contrat**

## Acteurs impliques

| Acteur | Role dans ce parcours | Nb utilisateurs |
|---|---|---|
| **Service Exploitation** | Cree le contrat a partir de la souscription validee. Configure les garanties, l'echeancier et les parametres contractuels | 2 |
| **Direction Production** | Verifie et valide la creation du contrat. Signature numerique de la police. Autorise aussi les suspensions et resiliations | 1 |
| **Caisse** | Encaisse les frais de dossier. C'est le paiement qui **declenche l'activation** du contrat | 4 |
| **Secretariat** | Edite la police d'assurance officielle et les fichiers de prelevement | 3 |
| **Service Confection des Cartes** | Produit et distribue les cartes d'assure physiques | 5 |
| **Archives** | Numerise et classe le dossier physique dans la GED | 5 |
| **Gestionnaire** | Traite les modifications contractuelles (avenants) en cours de vie | 6 |
| **Adherent** | Paye les frais, demande les modifications | Illimite |

## Deroulement des actions

### Etape 1 — Creation du contrat a partir de la souscription validee
Le dossier de souscription est **valide** (issu du P-02, statut "Valide — en attente de contrat"). Le **Service Exploitation** transforme maintenant ce dossier en contrat.

**Ce que fait le Service Exploitation :**
- Il ouvre l'ecran de creation de contrat
- Le systeme **pre-remplit automatiquement** toutes les informations de la souscription (adherent, ayants droit, type de contrat, prime calculee, n° de police attribue en P-02)
- Il verifie et complete les informations contractuelles :
  - Date de debut du contrat
  - Garanties detaillees selon la formule choisie (taux de remboursement : 80% pour Alpha/Confort Plus, 70% pour Betha/Enseignant, pharmacie toujours 70%)
  - Plafonds par categorie d'acte (lunetterie, dentaire, analyses — voir baremes)
  - Echeancier des primes mensuelles
  - Delais de carence applicables
  - Rattachement au reseau de soins

**Ce que fait la Direction Production :**
- Verifie la conformite du contrat cree
- Vise le contrat (signature numerique, verification DG selon le CdC)

Le contrat passe au statut **"Cree — en attente de paiement"**. Il existe dans le systeme mais n'est **pas encore actif** : l'adherent ne peut pas encore beneficier de prises en charge.

> **Ecran** : `gestionnaire/contrat-nouveau.html`
> Formulaire de creation du contrat, pre-rempli depuis la souscription. Sections : informations generales, adherent principal, ayants droit, garanties avec taux et plafonds, primes, echeancier. Bouton "Creer le contrat".

> **Ecran** : `gestionnaire/contrats.html`
> Le contrat apparait dans la liste avec le statut **"En attente de paiement"** (pas encore actif).

### Etape 2 — Paiement des frais de dossier (declencheur d'activation)
L'adherent est notifie que son contrat est cree et qu'il doit se presenter pour payer les frais de dossier. Il se rend a la **Caisse**. C'est ce paiement qui **declenche l'activation**. Sans paiement, le contrat reste en attente indefiniment.

Montants des frais selon le contrat :

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

Les frais sont **uniques et non remboursables**.

**Deroulement a la Caisse :**
1. Le caissier recherche le contrat (par n° police ou nom de l'adherent)
2. Le systeme affiche le montant des frais a payer
3. L'adherent paye (especes, cheque ou virement)
4. Le caissier enregistre l'encaissement et genere un recu
5. Le systeme **active automatiquement le contrat** → statut passe a **"Actif"**

> **Ecran** : `gestionnaire/encaissement-nouveau.html`
> Saisie de l'encaissement : recherche du contrat, type de frais, montant, mode de paiement, generation du recu.

### Etape 3 — Le contrat est actif : l'adherent est couvert
Des que le paiement est enregistre, le contrat passe au statut **"Actif"**. L'adherent et ses ayants droit sont desormais **couverts**. Le systeme enregistre :
- Date d'activation (= date du paiement)
- Date d'anniversaire du contrat (pour les futurs avenants)
- Echeancier des primes mensuelles (premier prelevement le mois suivant, voir P-04)

**Delais de carence** (le contrat est actif mais certaines garanties ne sont pas immediatement couvertes) :
- Accident : **0 jour** (couverture immediate)
- Maladie : **3 mois** apres activation
- Maladies chroniques : **6 mois** (si declarees, sinon surprime TPC retroactive)
- Maternite : **12 mois** apres activation

> **Ecran** : `gestionnaire/contrats.html`
> Le contrat apparait avec statut **"Actif"**, n° police, adherent, formule, prime mensuelle.

> **Ecran** : `gestionnaire/contrat-detail.html`
> Fiche complete du contrat : informations generales, adherent, ayants droit, garanties avec plafonds, primes, documents, historique.

### Etape 4 — Edition de la police d'assurance
Le **Secretariat** edite la police d'assurance officielle — le document contractuel remis a l'adherent qui atteste de sa couverture, ses garanties et ses conditions.

> **Ecran** : `gestionnaire/secretariat.html`
> Section "Polices a editer" — nouveaux contrats actives en attente d'edition.

> **Ecran** : `gestionnaire/contrat-attestation.html`
> Generation et impression de la police / attestation d'assurance au format PDF.

### Etape 5 — Confection et remise des cartes
Le **service Confection des Cartes** recoit la liste des nouveaux contrats actives. Pour chaque beneficiaire (adherent + ayants droit) :
1. **Planification** : ajout a la file de production
2. **Verification** : conformite des informations et photos avant impression
3. **Impression** : carte avec nom, photo, n° police, dates validite, type contrat
4. **Controle qualite** : verification visuelle
5. **Distribution** : remise a l'adherent

En attendant la carte physique, l'adherent peut deja utiliser sa **carte numerique** via l'espace Assure mobile.

> **Ecran** : `gestionnaire/confection-cartes.html`
> Planning de production : cartes en attente, en fabrication, produites, distribuees.

> **Ecran** : `gestionnaire/contrat-cartes.html`
> Depuis le detail contrat : liste des cartes emises, statut de chaque carte.

### Etape 6 — Archivage du dossier
Le service **Archives** recoit le dossier physique complet :
- Numerisation de toutes les pieces originales
- Classement automatique dans la GED (par n° police, nom, agence)
- Indexation par mots-cles pour recherche ulterieure

> **Ecran** : `gestionnaire/ged.html`
> Documents classes par dossier, recherche, telechargement.

### Resume du flux de creation du contrat

```
SOUSCRIPTION VALIDEE (P-02)
         |
         v
SERVICE EXPLOITATION ---------> DIRECTION PRODUCTION
Cree le contrat                  Verifie et valide
(contrat-nouveau.html)           (signature police)
         |                             |
         v                             v
    CONTRAT CREE <------------- CONTRAT VALIDE
    (En attente de paiement)
         |
         v
      CAISSE
    Encaisse frais de dossier
    (encaissement-nouveau.html)
         |
         v
    CONTRAT ACTIF --------+---------------+---------------+
         |                |               |               |
         v                v               v               v
    SECRETARIAT    CONFECTION CARTES   ARCHIVES    PREMIER PRELEVEMENT
    Edite police   Produit cartes      Classe      (voir P-04)
                                       dossier
```

---

### MODIFICATIONS EN COURS DE VIE DU CONTRAT

### Action 3a — Modification contractuelle (Avenant)
L'adherent demande une modification. Les avenants se font a la **date anniversaire** du contrat :
- **Ajout d'un enfant** : prime augmente de +27% (< 20 ans) ou +31% (etudiant 20-26 ans)
- **Retrait d'un enfant** : prime diminue
- **Ajout d'un conjoint** : prime augmente (+33% si 55-60 ans, +67% si 60-65 ans)
- **Ajout seconde epouse** : +50% de la prime de base
- **Changement d'age** de l'adherent/conjoint : recalcul automatique
- **Ajout garantie sante** supplementaire

Le **gestionnaire** saisit l'avenant. Le systeme recalcule la prime et affiche la comparaison avant/apres. Le contrat est mis a jour.

> **Ecran** : `gestionnaire/souscription-avenant.html`
> Formulaire de modification avec comparaison avant/apres, diff des changements, nouveau montant de prime.

> **Ecran** : `gestionnaire/contrat-adherents.html`
> Liste des beneficiaires mise a jour apres l'avenant.

### Action 3b — Changement de contrat (changement de formule)
L'adherent souhaite changer de formule (ex: passer de Betha a Alpha 1 pour une meilleure couverture) :
- Frais de changement : **7 500F** (a payer a la Caisse)
- Un **nouveau numero de police** est attribue automatiquement apres paiement
- L'ancien contrat est cloture
- De nouvelles cartes sont emises

> **Ecrans** : `gestionnaire/contrat-detail.html` → `gestionnaire/encaissement-nouveau.html`
> Initiation du changement depuis le contrat, puis encaissement des frais a la Caisse.

### Action 3c — Suspension de contrat
En cas d'impaye persistant ou sur demande de l'adherent :
- Duree maximale : **3 mois**
- Renouvelable **une seule fois par an**
- Pendant la suspension : toutes les cartes sont **bloquees** (aucune prise en charge possible)
- Seule la **Direction Production** peut autoriser la suspension
- A l'issue : soit reactivation (apres regularisation), soit resiliation

> **Ecran** : `gestionnaire/contrat-suspension.html`
> Formulaire : motif, date debut, duree, confirmation du blocage des cartes.

### Action 3d — Resiliation definitive
La resiliation met fin **definitivement** au contrat :
- Decidee par la **Direction Production** uniquement
- Les cartes sont **bloquees et archivees**
- Le dossier est cloture et transfere aux Archives
- Aucune prestation ne peut plus etre servie
- Le systeme genere une attestation de radiation

> **Ecran** : `gestionnaire/contrat-resiliation.html`
> Formulaire de resiliation avec motif, date d'effet, confirmation.

### Action 3e — Reedition de cartes
En cas de perte, vol ou usure :
- Cout : **3 000F par carte** (a payer a la Caisse)
- Le service Confection des Cartes produit les nouvelles cartes
- L'ancienne carte est desactivee dans le systeme

### Action 3f — Edition d'attestations
A tout moment, le systeme peut generer :
- **Attestation d'assurance** : preuve de couverture active
- **Attestation de radiation** : confirmation de fin de contrat

> **Ecran** : `gestionnaire/contrat-attestation.html`
> Generation PDF de l'attestation selectionnee.

### Tracabilite
Toutes les actions (creation, avenants, suspensions, resiliations, paiements) sont **horodatees** et conservees dans l'historique du contrat. Ce journal est non modifiable (exigence d'audit).

> **Ecran** : `gestionnaire/contrat-historique.html`
> Journal chronologique de toutes les actions sur le contrat, avec utilisateur, date et detail.

---

# P-04 : PRELEVEMENT DES PRIMES ET RECOUVREMENT

## Contexte
Chaque mois, les primes des adherents doivent etre prelevees. Pour les fonctionnaires, le prelevement se fait a la source via le Tresor Public ou les banques (SGBCI et autres). Pour les particuliers, le paiement peut etre en especes ou par virement. Le service Recouvrement gere les impayes.

## Acteurs impliques
| Acteur | Role dans ce parcours | Nb utilisateurs |
|---|---|---|
| **Secretariat** | Edite les polices, genere les fichiers de prelevement (Tresor, SGBCI, Espece) | 3 |
| **Comptabilite** | Enregistre les mouvements financiers, importe les retours bancaires | 5 |
| **Tresorerie** | Effectue le rapprochement entre fichiers emis et retours recus | 1 |
| **Service Recouvrement** | Detecte les impayes, lance les relances, suit le contentieux | 1 |
| **Caisse** | Encaisse les paiements en especes et les regularisations | 4 |

## Deroulement des actions

### Etape 1 — Edition des polices et fichiers de prelevement
Chaque mois, le **Secretariat** prepare les fichiers de prelevement :
- **Fichier Tresor** : pour les fonctionnaires payes par le Tresor Public
- **Fichier SGBCI** : pour les adherents preleves par la banque SGBCI
- **Fichier Espece** : pour les adherents qui paient en especes
- **Fichier Banques** : pour les autres etablissements bancaires

Chaque fichier contient la liste des adherents, numeros de police, et montants a prelever.

> **Ecran** : `gestionnaire/secretariat.html`
> Tableau de bord secretariat : generation et suivi des fichiers de prelevement.

### Etape 2 — Envoi et retour des fichiers
Les fichiers sont transmis aux organismes payeurs. Apres traitement, les organismes renvoient un fichier retour indiquant pour chaque adherent si le prelevement a reussi ou echoue.

### Etape 3 — Importation des retours
La **Comptabilite** et le **Recouvrement** importent les fichiers retour dans le systeme :
- Retour Tresor
- Retour SGBCI
- Retour Espece
- Retour Banques

> **Ecran** : `gestionnaire/comptabilite.html`
> Importation des fichiers retour, ecritures comptables automatiques.

### Etape 4 — Rapprochement
La **Tresorerie** effectue le rapprochement entre les montants emis et les montants effectivement preleves :
- Statut **Succes** : le prelevement a ete effectue, prime encaissee
- Statut **Echec** : le prelevement a echoue → l'adherent est en impaye

Le systeme calcule un **taux de rapprochement** (succes vs echec).

> **Ecran** : `gestionnaire/tresorerie.html`
> Tableau de rapprochement avec taux de succes/echec par type de fichier.

### Etape 5 — Traitement des impayes
Le **service Recouvrement** prend en charge les adherents en impaye :
- **Relance N1** : appel telephonique ou SMS amiable
- **Relance N2** : courrier de relance officiel
- **Relance N3** : mise en demeure
- Si paiement recu → la **Caisse** enregistre l'encaissement → regularisation
- Si non-paiement → **suspension du contrat** (3 mois max) puis **resiliation** si persistant

> **Ecran** : `gestionnaire/recouvrement.html`
> Liste des impayes par anciennete, montants dus, historique des relances, actions.

### Etape 6 — Encaissement suite a relance
Lorsque l'adherent regularise sa situation, la **Caisse** enregistre l'encaissement.

> **Ecran** : `gestionnaire/encaissement-nouveau.html`
> Saisie encaissement avec reference au dossier de recouvrement.

---

# P-05 : PRISE EN CHARGE (PEC) — CONSULTATION ET ANALYSES

## Contexte
Lorsqu'un assure a besoin de soins, il se rend chez un prestataire du reseau IIPS (clinique, laboratoire). Le prestataire verifie ses droits et demande une prise en charge. Le service PEC de l'IIPS autorise ou refuse la prise en charge selon les droits, plafonds et garanties de l'assure.

## Acteurs impliques
| Acteur | Role dans ce parcours | Nb utilisateurs |
|---|---|---|
| **Assure** | Se presente chez le prestataire avec sa carte | Illimite |
| **Prestataire Clinique** | Verifie l'eligibilite, demande la PEC, realise les soins | Plusieurs |
| **PEC Analyses** | Verifie les droits, controle les plafonds, valide ou rejette | 10 |
| **PEC Hospitalisation** | Idem pour les demandes d'hospitalisation | 5 |

## Deroulement des actions

### Etape 1 — Presentation de l'assure
L'**assure** se presente chez un prestataire de sante du reseau IIPS. Il presente sa carte d'assure (physique ou numerique via l'application mobile).

> **Ecran Assure** : `assure/carte.html`
> Carte numerique avec QR code, nom, numero, date validite.

> **Ecran Assure** : `assure/garanties.html`
> L'assure peut consulter ses garanties et plafonds restants avant de se rendre chez le prestataire.

### Etape 2 — Verification d'eligibilite par le prestataire
Le **prestataire** saisit le numero de carte ou scanne le QR code. Le systeme verifie en temps reel :
- Le contrat est-il **actif** ? (pas suspendu, pas resilie)
- L'assure est-il bien **beneficiaire** du contrat ?
- La carte est-elle **valide** ? (date d'expiration)
- Les **delais de carence** sont-ils passes ?

> **Ecran Prestataire** : `prestataire/dashboard.html`
> Tableau de bord avec verification rapide des droits.

### Etape 3 — Demande de prise en charge
Si l'assure est eligible, le prestataire soumet une **demande de PEC** :
- Nature des actes prevus (consultation, analyses, radio, hospitalisation...)
- Montant estimatif
- Diagnostic presomptif (code CIM obligatoire)

> **Ecran Prestataire** : `prestataire/demandes.html`
> Formulaire de demande de PEC avec selection des actes.

### Etape 4 — Traitement de la PEC par l'IIPS
Le service **PEC Analyses** (ou **PEC Hospitalisation** selon le cas) recoit la demande et effectue les controles :
- **Plafonds** : le plafond annuel de l'assure n'est pas depasse (ex: 75 000F lunetterie pour Alpha, 50 000F pour Betha)
- **Compatibilite** : l'acte est compatible avec l'age, le sexe et le statut du beneficiaire
- **Frequence** : l'acte n'a pas deja ete realise recemment (delai minimum entre actes)
- **Coherence** : l'acte correspond a une specialite autorisee
- **Anti-fraude** : le systeme verifie les anomalies (scoring dynamique)

Decision :
- **Validation** : PEC accordee avec montant autorise
- **Rejet** : PEC refusee avec motif
- **Demande de complement** : pieces manquantes

> **Ecran Gestionnaire** : `gestionnaire/pec.html`
> Liste des demandes de PEC avec filtres (En attente, Validee, Rejetee).

> **Ecran Gestionnaire** : `gestionnaire/pec-detail.html`
> Detail de la PEC : informations assure, actes demandes, plafonds, decision.

### Etape 5 — Realisation des soins
Une fois la PEC validee, le prestataire realise les soins. L'assure beneficie de la prise en charge selon le taux de son contrat :
- Alpha 1 / Confort Plus : **80%** (pharmacie 70%)
- Betha / Confort Classique / Enseignant : **70%**

Le reste a charge est paye directement par l'assure au prestataire.

---

# P-06 : PRISE EN CHARGE — PHARMACIE

## Contexte
Le parcours pharmacie a ses specificites : verification d'ordonnance, controle des quantites delivrables, duree de traitement, et interactions medicamenteuses.

## Acteurs impliques
| Acteur | Role dans ce parcours | Nb utilisateurs |
|---|---|---|
| **Assure** | Se presente avec ordonnance et carte | Illimite |
| **Prestataire Pharmacie** | Verifie droits, delivre medicaments, facture | Plusieurs |

## Deroulement des actions

### Etape 1 — Presentation et verification
L'assure se presente en pharmacie avec son ordonnance et sa carte. Le **pharmacien** verifie :
- Droits de l'adherent (contrat actif, carte valide)
- Validite de l'ordonnance
- Plafonds pharmaceutiques disponibles

> **Ecran Pharmacie** : `pharmacie/verification-ordonnance.html`
> Verification de l'ordonnance, droits adherent, plafonds.

### Etape 2 — Dispensation des medicaments
Le pharmacien saisit les medicaments delivres. Le systeme controle automatiquement :
- **Quantite maximale delivrable** par medicament
- **Duree maximale de traitement**
- **Restriction par age ou sexe** (certains medicaments sont restreints)
- **Interactions medicamenteuses** (base d'interactions parametrable)
- **Frequence** : nombre maximum par jour/mois/an

> **Ecran Pharmacie** : `pharmacie/saisie-dispensation.html`
> Saisie des medicaments, quantites, controles automatiques.

### Etape 3 — Facturation
La facture est generee automatiquement :
- Part IIPS : 70% (tous contrats pour la pharmacie)
- Part assure : 30% (payee sur place)

> **Ecran Pharmacie** : `pharmacie/dispensations.html`
> Historique des dispensations realisees avec montants.

---

# P-07 : PRISE EN CHARGE — OPTIQUE (LUNETTERIE)

## Contexte
Le parcours optique est particulier : il passe par le **Secretariat** de l'IIPS (et non le service PEC) pour le traitement des PEC lunetterie. Les plafonds sont specifiques par type de contrat.

## Acteurs impliques
| Acteur | Role dans ce parcours | Nb utilisateurs |
|---|---|---|
| **Assure** | Se presente avec prescription ophtalmologique | Illimite |
| **Prestataire Opticien** | Verifie couverture, soumet devis, delivre | Plusieurs |
| **Secretariat** | Traite les PEC lunetterie (specificite IIPS) | 3 |

## Deroulement des actions

### Etape 1 — Verification de la couverture optique
L'assure se presente chez l'opticien avec sa prescription. L'**opticien** verifie :
- Droits de l'adherent
- Plafond lunetterie disponible :
  - IIPS / Alpha / Confort Plus : **75 000F**
  - Betha / Betha CL / Confort CL / Syleg / Solidarite 1 : **50 000F**
  - Solidarite 2 / Enseignant : **40 000F**

> **Ecran Opticien** : `opticien/verification-prescription.html`
> Verification couverture et plafond disponible.

### Etape 2 — Soumission du devis
L'opticien prepare un devis (montures, verres, lentilles) et le soumet au systeme pour validation.

> **Ecran Opticien** : `opticien/saisie-prestation.html`
> Saisie du devis detaille.

### Etape 3 — Traitement par le Secretariat
C'est le **Secretariat** (et non le service PEC) qui traite les demandes de PEC lunetterie. Il verifie la conformite du devis et le plafond disponible, puis valide ou rejette.

> **Ecran Gestionnaire** : `gestionnaire/secretariat.html`
> Section "PEC Lunetterie" — traitement des demandes optiques.

### Etape 4 — Delivrance et facturation
Apres validation, l'opticien delivre les equipements. La facturation suit le meme schema (taux du contrat applique).

> **Ecran Opticien** : `opticien/prestations.html`
> Historique des prestations optiques.

---

# P-08 : TRAITEMENT DES SINISTRES ET REGLEMENT

## Contexte
Apres la realisation des soins, le prestataire soumet ses factures a l'IIPS. Le service Gestion des Sinistres verifie la conformite, le Medecin Conseil valide medicalement, puis la Comptabilite procede au reglement via des bordereaux de paiement.

## Acteurs impliques
| Acteur | Role dans ce parcours | Nb utilisateurs |
|---|---|---|
| **Prestataire** (tous types) | Soumet ses factures et justificatifs | Plusieurs |
| **Service Gestion des Sinistres** | Enregistre, verifie, corrige les factures | 6 |
| **Medecin Conseil** | Valide la conformite medicale des actes factures | 1 |
| **Comptabilite** | Prepare et execute les paiements | 5 |

## Deroulement des actions

### Etape 1 — Soumission des factures par le prestataire
Le **prestataire** transmet electroniquement ses factures et pieces justificatives pour les soins realises au cours de la periode.

> **Ecran Prestataire** : `prestataire/saisie-prestation.html`
> Saisie de la prestation avec upload des justificatifs.

> **Ecran Prestataire** : `prestataire/prestations.html`
> Liste des prestations soumises avec statuts.

### Etape 2 — Enregistrement et verification
Le **service Gestion des Sinistres** recoit les factures et effectue :
- Enregistrement dans le systeme (creation du sinistre)
- Verification de la conformite : les actes factures correspondent-ils a la PEC accordee ?
- Correction des erreurs si necessaire (montants, codes actes)
- Controle anti-fraude : le systeme genere un score de risque et des alertes automatiques

> **Ecran Gestionnaire** : `gestionnaire/sinistres.html`
> Liste des sinistres avec montants, prestataires, statuts, scores de risque.

> **Ecran Gestionnaire** : `gestionnaire/sinistre-detail.html`
> Detail du sinistre : actes, montants, taux de remboursement, part IIPS/adherent.

> **Ecran Gestionnaire** : `gestionnaire/sinistre-prestation.html`
> Detail des actes factures, verification ligne par ligne.

### Etape 3 — Controle anti-fraude
Le systeme analyse automatiquement les factures pour detecter :
- Facturations excessives ou repetitives
- Actes incompatibles avec l'age/sexe du patient
- Depassements de plafonds
- Patterns suspects (meme prestataire, meme acte, frequence anormale)

> **Ecran Gestionnaire** : `gestionnaire/alertes-fraudes.html`
> Tableau des alertes fraudes avec scoring, investigations en cours.

### Etape 4 — Validation medicale par le Medecin Conseil
Le **Medecin Conseil** examine les dossiers signales ou les sinistres importants :
- Les actes factures sont-ils medicalement justifies ?
- Le traitement est-il conforme aux protocoles therapeutiques ?
- Y a-t-il des abus ou surprescriptions ?

Il rend un avis : **Conforme**, **Non conforme**, **A completer**.

> **Ecran Medecin** : `medecin/avis.html`
> Interface de validation medicale avec avis et commentaires.

> **Ecran Medecin** : `medecin/dossiers.html`
> Liste des dossiers a examiner.

> **Ecran Medecin** : `medecin/protocoles.html`
> Protocoles therapeutiques de reference pour verification.

### Etape 5 — Regularisation (si necessaire)
Si des erreurs sont detectees apres le traitement initial, le gestionnaire procede a une regularisation : ajustement des montants, correction d'actes, remboursement complementaire ou trop-percu.

> **Ecran Gestionnaire** : `gestionnaire/sinistre-regularisation.html`
> Formulaire de regularisation avec motif et montant ajuste.

### Etape 6 — Preparation du bordereau de paiement
Les sinistres valides sont regroupes en **bordereaux** par prestataire. Chaque bordereau contient la liste des sinistres, les montants a regler, et les references.

> **Ecran Gestionnaire** : `gestionnaire/paiements.html`
> Liste des bordereaux par prestataire, montants, statuts.

> **Ecran Gestionnaire** : `gestionnaire/bordereau-detail.html`
> Detail du bordereau : sinistres inclus, montant total, validation.

### Etape 7 — Reglement
La **Comptabilite** valide le bordereau et procede au reglement :
- Emission de cheque ou virement
- Enregistrement comptable
- Le prestataire est notifie du paiement

> **Ecran Gestionnaire** : `gestionnaire/comptabilite.html`
> Ecritures comptables, validation des paiements.

### Etape 8 — Suivi par le prestataire
Le prestataire consulte ses paiements depuis son espace.

> **Ecran Prestataire** : `prestataire/suivi-paiements.html`
> Historique des paiements recus, rapprochement avec factures.

> **Ecran Prestataire** : `prestataire/bordereaux.html`
> Bordereaux recus avec detail.

---

# P-09 : REMBOURSEMENT DIRECT A L'ASSURE

## Contexte
Lorsque l'assure a paye ses soins de sa poche (prestataire hors reseau ou urgence), il peut demander un remboursement directement aupres de l'IIPS via son espace mobile.

## Acteurs impliques
| Acteur | Role dans ce parcours | Nb utilisateurs |
|---|---|---|
| **Assure** | Soumet sa demande de remboursement avec justificatifs | Illimite |
| **Gestionnaire** | Traite la demande, verifie les pieces, calcule le remboursement | 6 |
| **Comptabilite** | Execute le remboursement | 5 |

## Deroulement des actions

### Etape 1 — Soumission par l'assure
L'**assure** se connecte a son espace mobile et soumet une demande de remboursement :
- Upload des factures acquittees
- Upload de l'ordonnance
- Type d'acte realise
- Montant paye

> **Ecran Assure** : `assure/remboursement.html`
> Formulaire de demande de remboursement avec upload.

### Etape 2 — Suivi par l'assure
L'assure peut suivre l'avancement de sa demande.

> **Ecran Assure** : `assure/prestations.html`
> Liste des demandes avec statuts (En cours, Rembourse, Rejete).

> **Ecran Assure** : `assure/messages.html`
> Messagerie avec le gestionnaire pour questions ou complements.

### Etape 3 — Traitement par le gestionnaire
Le **gestionnaire** recoit la demande et effectue :
- Verification des pieces justificatives
- Controle de la conformite des actes
- Calcul du remboursement selon le taux du contrat (80% ou 70%)
- Deduction de la part deja couverte si applicable

> **Ecran Gestionnaire** : `gestionnaire/sinistres.html`
> Le sinistre apparait avec source "Assure".

> **Ecran Gestionnaire** : `gestionnaire/sinistre-detail.html`
> Traitement : verification, calcul, validation.

### Etape 4 — Versement
La **Comptabilite** execute le remboursement (virement ou cheque) a l'assure.

> **Ecran Gestionnaire** : `gestionnaire/remboursement-detail.html`
> Detail du remboursement avec montant, mode de paiement, date.

---

# P-10 : COMMISSIONS DES COMMERCIAUX

## Contexte
Les commerciaux et chefs d'equipe sont remuneres par commissions et primes. Le calcul est automatise, et les RH gerent le versement.

## Acteurs impliques
| Acteur | Role dans ce parcours | Nb utilisateurs |
|---|---|---|
| **Commercial** | Realise les ventes | 60 |
| **Chef commercial** | Supervise et beneficie de prefinancement | 40 |
| **RH** | Gere les commissions et le versement | 1 |
| **Comptabilite** | Execute les paiements | 5 |

## Deroulement des actions

### Etape 1 — Calcul automatique des commissions
A chaque contrat valide et active, le systeme calcule :
- **Commission standard** : 10% du montant du contrat pour le commercial
- **Prime de transport** : 30 000F des que le commercial atteint 10 ventes validees dans le mois
- **Prefinancement** (chefs d'equipe) : 40 000F a 150 000F pour missions commerciales — remboursable si objectifs non atteints

### Etape 2 — Validation et versement
Les **RH** verifient les calculs et valident. La **Comptabilite** execute les paiements.

> **Ecran Gestionnaire** : `gestionnaire/commission-detail.html`
> Detail des commissions par commercial : ventes, montants, primes.

---

# P-11 : ESPACE SOCIETE — SUIVI PAR L'ENTREPRISE CLIENTE

## Contexte
Les entreprises clientes (ex: SOTRA, administrations) disposent d'un espace dedie pour suivre les contrats de leurs employes, les primes a payer, et les statistiques de consommation. C'est un outil de transparence et de self-service.

## Acteurs impliques
| Acteur | Role dans ce parcours | Nb utilisateurs |
|---|---|---|
| **Responsable RH de l'entreprise** | Consulte, gere les adherents, suit les primes | Plusieurs |

## Deroulement des actions

### Etape 1 — Connexion et tableau de bord
Le responsable se connecte a l'espace Societe et visualise la situation globale : nombre d'adherents, contrats actifs, primes a jour/en retard, consommation globale.

> **Ecran Societe** : `societe/dashboard.html`
> Dashboard avec KPIs : adherents, primes, consommation, alertes.

### Etape 2 — Consultation des contrats
Il consulte la liste des contrats groupe de son entreprise, avec les details de chaque formule.

> **Ecran Societe** : `societe/contrats.html`
> Liste des contrats avec 3 onglets (Actifs, En attente, Historique).

### Etape 3 — Gestion des adherents
Il visualise la liste de ses employes couverts. Il peut demander l'ajout ou le retrait d'un adherent (qui sera traite par le gestionnaire IIPS).

> **Ecran Societe** : `societe/adherents.html`
> Liste des adherents avec modale d'ajout/retrait.

### Etape 4 — Suivi des primes
Il consulte l'echeancier des primes a payer et l'historique des paiements.

> **Ecran Societe** : `societe/primes.html`
> Echeancier, montants dus, paiements effectues.

### Etape 5 — Statistiques de consommation
Il visualise les statistiques de consommation de ses employes par type d'acte (consultations, pharmacie, hospit, optique...).

> **Ecran Societe** : `societe/etats-prestations.html`
> Graphiques et tableaux de consommation par categorie.

### Etape 6 — Reclamations et messagerie
Il peut deposer des reclamations et communiquer avec l'IIPS.

> **Ecran Societe** : `societe/reclamations.html`
> Depot et suivi des reclamations.

> **Ecran Societe** : `societe/messagerie.html`
> Messagerie securisee avec le gestionnaire IIPS.

---

# P-12 : RECLAMATION — PROCESSUS COMPLET

## Contexte
Tout acteur externe (assure, prestataire, societe) peut deposer une reclamation. Le CRM de l'IIPS centralise toutes les reclamations et assure leur suivi jusqu'a resolution.

## Acteurs impliques
| Acteur | Role dans ce parcours | Nb utilisateurs |
|---|---|---|
| **Assure** | Depose une reclamation depuis son espace mobile | Illimite |
| **Prestataire** | Depose une reclamation depuis son espace | Plusieurs |
| **Societe** | Depose une reclamation depuis son espace | Plusieurs |
| **Gestionnaire CRM** | Recoit, traite, resout les reclamations | 6 |

## Deroulement des actions

### Etape 1 — Depot de la reclamation
L'acteur soumet sa reclamation via son espace :

> **Ecran Assure** : `assure/reclamation.html`
> Formulaire mobile de depot de reclamation.

> **Ecran Prestataire** : `prestataire/reclamations.html`
> Depot de reclamation prestataire.

> **Ecran Societe** : `societe/reclamations.html`
> Depot de reclamation societe.

### Etape 2 — Reception et traitement
Le **gestionnaire CRM** recoit la reclamation dans le systeme. Il l'analyse, la categorise (delai, erreur, litige...) et l'attribue a un responsable.

> **Ecran Gestionnaire** : `gestionnaire/crm.html` — Onglet "Reclamations"
> Liste des reclamations avec priorites, categories, statuts, responsables.

### Etape 3 — Resolution et notification
Le gestionnaire traite la reclamation, apporte une reponse ou une action corrective, et notifie le plaignant. La reclamation est cloturee.

> **Ecran Gestionnaire** : `gestionnaire/crm.html` — Onglet "Calendrier"
> Planification des suivis et relances.

---

# P-13 : MEDECIN CONSEIL — CONTROLE ET VALIDATION MEDICALE

## Contexte
Le Medecin Conseil est le garant de la conformite medicale de toutes les prestations servies. Il intervient sur les sinistres importants, les dossiers signales, et les alertes anti-fraude.

## Acteurs impliques
| Acteur | Role dans ce parcours | Nb utilisateurs |
|---|---|---|
| **Medecin Conseil** | Analyse, valide, alerte sur la conformite medicale | 1 |

## Deroulement des actions

### Etape 1 — Consultation du tableau de bord
Le Medecin Conseil visualise les dossiers en attente de son avis, les statistiques et les alertes.

> **Ecran Medecin** : `medecin/dashboard.html`
> KPIs : dossiers a valider, avis rendus, alertes actives.

### Etape 2 — Examen des dossiers
Il consulte la liste des dossiers patients necessitant son expertise.

> **Ecran Medecin** : `medecin/dossiers.html`
> Liste des dossiers avec filtres (urgence, type, prestataire).

### Etape 3 — Avis medical
Pour chaque dossier, il rend un avis motive :
- **Conforme** : les actes sont medicalement justifies
- **Non conforme** : les actes ne sont pas justifies (rejet)
- **A completer** : pieces ou informations manquantes

> **Ecran Medecin** : `medecin/avis.html`
> Interface de validation avec commentaires et decision.

### Etape 4 — Verification des protocoles
Il compare les actes factures aux protocoles therapeutiques de reference.

> **Ecran Medecin** : `medecin/protocoles.html`
> Protocoles par pathologie, actes autorises, durees.

### Etape 5 — Gestion des alertes
Il traite les alertes remontees par le systeme anti-fraude : depassements, incoherences, patterns suspects.

> **Ecran Medecin** : `medecin/alertes.html`
> Liste des alertes avec niveau de gravite et actions.

### Etape 6 — Verification des ordonnances
Il verifie les ordonnances liees aux factures signalees.

> **Ecran Medecin** : `medecin/ordonnances.html`
> Ordonnances numerisees, controle de conformite.

### Etape 7 — Communication
Il echange avec les gestionnaires et prestataires via la messagerie interne.

> **Ecran Medecin** : `medecin/messagerie.html`
> Messagerie securisee.

---

# P-14 : ADMINISTRATION, CONFIGURATION ET AUDIT

## Contexte
L'administrateur gere les acces au systeme, les roles, et la configuration metier. L'auditeur controle la tracabilite de toutes les actions. La configuration couvre les parametrages metier (actes, tarifs, baremes, organisation).

## Acteurs impliques
| Acteur | Role dans ce parcours | Nb utilisateurs |
|---|---|---|
| **Administrateur** | Gere les comptes, roles, securite | 2 |
| **Audit et Controle** | Controle la tracabilite et la conformite | 1 |
| **Direction Generale** | Supervise, prend les decisions strategiques | 2 |

## Deroulement des actions

### Action 14a — Gestion des utilisateurs
L'**administrateur** cree, modifie ou desactive les comptes utilisateurs. Chaque compte est rattache a un profil (parmi les 23 profils du CdC) avec des droits specifiques.

> **Ecran** : `gestionnaire/administration.html` — Onglet "Utilisateurs"
> Liste des comptes avec roles, statuts (actif/inactif), derniere connexion.

> **Ecran** : `gestionnaire/utilisateur-detail.html`
> Creation/modification avec attribution de role, service, droits.

### Action 14b — Gestion des roles et permissions
L'administrateur configure la matrice des permissions : qui a acces a quoi. Le systeme interdit l'**auto-validation** (separation des taches) : un utilisateur ne peut pas valider ses propres actions.

> **Ecran** : `gestionnaire/administration.html` — Onglet "Roles"
> Matrice des permissions par profil et par module.

### Action 14c — Audit et tracabilite
L'**auditeur** consulte le journal d'audit : toutes les actions sont horodatees dans un journal **non modifiable** (creation, modification, validation, suppression, connexion...).

> **Ecran** : `gestionnaire/administration.html` — Onglet "Audit"
> Journal chronologique avec filtre par utilisateur, action, date.

### Action 14d — Configuration des actes medicaux
Parametrage des actes avec controles :
- Restrictions par age (min/max), sexe, type de beneficiaire
- Compatibilite entre actes
- Frequence autorisee (nb max par jour/mois/an)
- Specialites autorisees
- Lien obligatoire avec diagnostic CIM

> **Ecran** : `gestionnaire/configuration.html` — Onglet "Actes"
> Liste des actes parametrables avec regles associees.

### Action 14e — Configuration des tarifs et baremes
Parametrage des tarifs par type de contrat :
- Taux de remboursement (80%, 70%)
- Plafonds par acte et par an
- Surcotisations pour maladies chroniques
- Baremes lunetterie/dentaire/analyses

> **Ecran** : `gestionnaire/configuration.html` — Onglet "Tarifs"
> Grille tarifaire par contrat.

> **Ecran** : `gestionnaire/configuration.html` — Onglet "Baremes"
> Plafonds par type de contrat et categorie d'acte.

### Action 14f — Configuration de l'organisation
Parametrage de la hierarchie commerciale :
- Regions → Agences → Chefs d'equipe → Commerciaux
- Codes hierarchiques pour le rattachement des dossiers

> **Ecran** : `gestionnaire/configuration.html` — Onglet "Organisation"
> Arborescence organisationnelle.

### Action 14g — Reporting et pilotage
La **Direction Generale** consulte les rapports consolides de toutes les directions.

> **Ecran** : `gestionnaire/reporting.html`
> Tableaux de bord dynamiques, exports Excel/PDF/CSV.

> **Ecran** : `gestionnaire/dashboard.html`
> KPIs consolides : adhesions, sinistralite, chiffre d'affaires, delais.

---

# RECAPITULATIF GENERAL

| # | Parcours | Description | Acteurs principaux |
|---|---|---|---|
| P-01 | Prospection et acquisition | Du terrain au CRM | Commercial, Chef commercial, Marketing |
| P-02 | Souscription et activation | Creation → 4 validations → carte | Commercial → Direction Production |
| P-03 | Vie du contrat | Avenants, suspension, resiliation | Adherent, Gestionnaire, Direction |
| P-04 | Prelevement et recouvrement | Primes, fichiers bancaires, impayes | Secretariat, Tresorerie, Recouvrement |
| P-05 | PEC consultation/analyses | Assure chez le prestataire clinique | Assure, Clinique, PEC Analyses |
| P-06 | PEC pharmacie | Dispensation medicaments | Assure, Pharmacie |
| P-07 | PEC optique | Lunetterie via Secretariat | Assure, Opticien, Secretariat |
| P-08 | Sinistres et reglement | Facturation → controle → paiement | Prestataire, Sinistres, Medecin, Comptabilite |
| P-09 | Remboursement direct | Soins hors reseau, remboursement assure | Assure, Gestionnaire |
| P-10 | Commissions commerciales | Calcul et versement des commissions | Commercial, RH, Comptabilite |
| P-11 | Espace Societe | Self-service entreprise cliente | Societe (DRH) |
| P-12 | Reclamation | Depot → traitement → resolution | Tous acteurs → CRM |
| P-13 | Medecin Conseil | Controle et validation medicale | Medecin Conseil |
| P-14 | Administration et configuration | Utilisateurs, roles, parametrage, audit | Administrateur, Audit, DG |
