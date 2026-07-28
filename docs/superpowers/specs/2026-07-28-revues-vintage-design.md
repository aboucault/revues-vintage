# Revues Vintage — Design

Date : 2026-07-28
Statut : approuvé par Aurélia, en attente de relecture finale avant plan d'implémentation.

## 1. Contexte & objectifs

Aurélia pratique la couture vintage depuis 5 ans et possède une collection importante de revues et patrons anciens (mélange d'époques, du début du XXe siècle aux années 1980-90, partiellement numérisée). L'objectif est de rendre cette collection accessible via un site web public, sans compte utilisateur requis, hébergé sur le nom de domaine qu'elle possède déjà chez Cloudflare.

Le site sert trois usages distincts :

1. **Consulter une revue vintage** — parcourir des magazines de couture/tricot/broderie/crochet.
2. **Dater un patron** — comparer un patron qu'on possède à une base de référence (pochettes de patrons) pour estimer sa période.
3. **Accéder à des ressources gratuites** — télécharger des patrons libres de droits (couture, tricot, broderie, crochet), en 1 à 4 pages avec tracé, mesures et instructions.

Contrainte majeure : **budget zéro**. Toutes les décisions techniques sont prises pour rester sur des paliers gratuits, y compris en cas de croissance de trafic.

## 2. Architecture d'ensemble

- **Frontend** : site statique [Astro](https://astro.build), hébergé gratuitement sur Cloudflare Pages, branché sur le domaine Cloudflare existant d'Aurélia.
- **CMS** : [Sanity](https://www.sanity.io), alimenté exclusivement via l'intégration MCP de Claude (Hubert) — Aurélia envoie des images et informations en conversation, Hubert crée et publie les fiches. Pas de back-office à apprendre pour elle.
- **Reconstruction du site** : un webhook Sanity déclenche un rebuild Cloudflare Pages à chaque publication de contenu.
- **Stockage lourd** : les scans complets des revues (multi-pages, haute résolution) sont stockés sur Cloudflare R2, référencés par URL depuis Sanity — sortie de données gratuite sur R2, ce qui évite les coûts de bande passante d'un site public riche en images. Sanity ne garde que les métadonnées et les images légères (couvertures, aperçus, pochettes).
- **Recherche** : un index JSON généré à chaque build à partir des données Sanity, chargé et filtré côté client en JavaScript. Pas de service de recherche payant, pas de backend applicatif.

Diagramme simplifié :

```
Aurélia → (images + infos) → Hubert (Claude, via MCP)
                                   │
                     ┌─────────────┴──────────────┐
                     ▼                            ▼
                  Sanity                    Cloudflare R2
        (métadonnées + images légères        (scans complets HD
      + patrons gratuits, taxonomies)         de revues uniquement)
                     │
                     ▼ (webhook → rebuild)
              Cloudflare Pages (Astro, statique)
                     │
                     ▼
              Visiteur (sans compte, navigation libre)
```

## 3. Modèle de contenu (schéma Sanity)

Trois types de documents principaux, plus des référentiels partagés.

### Revue

Magazine vintage complet.

- Titre, éditeur, numéro
- Période estimée (décennie ou fourchette d'années)
- Catégorie(s) : couture / tricot / broderie / crochet / mode
- Statut de droits : domaine public / incertain / protégé
- Couverture (image)
- Aperçu de pages (galerie d'images)
- Lien vers le scan complet sur Cloudflare R2 — **uniquement rempli si statut = domaine public**

### Pochette de patron

Référence visuelle pour dater un patron, **sans contenu téléchargeable**.

- Marque (Vogue, Burda, Simplicity, etc.), numéro de patron
- Catégorie (couture / tricot / broderie / crochet)
- Période estimée
- Caractéristiques de style : type de col, silhouette, longueur, manches, etc. — ce sont les critères de recherche de l'outil de datation
- Images de la pochette (recto/verso)
- Statut de droits (informatif, mais aucun bouton de téléchargement n'existe pour ce type de document — seule l'image de la pochette est montrée à des fins d'identification)

### Patron gratuit

Patron réellement utilisable et téléchargeable (1 à 4 pages : tracé, mesures, instructions).

- Titre / description
- Catégorie (couture / tricot / broderie / crochet)
- Fichier téléchargeable (PDF, 1 à 4 pages — hébergé directement en asset Sanity, poids trop faible pour justifier Cloudflare R2)
- Revue source (référence optionnelle vers une Revue, si le patron en est issu)
- Statut de droits : domaine public / incertain / protégé — **le téléchargement n'apparaît que si domaine public**

### Référentiels partagés

- Catégories : couture, tricot, broderie, crochet, mode
- Décennies / périodes
- Marques / éditeurs

Ces référentiels garantissent un vocabulaire cohérent d'une fiche à l'autre et alimentent directement les facettes de recherche.

## 4. Flux d'ajout de contenu

1. Aurélia envoie à Hubert les images (photos/scans) et les informations qu'elle connaît déjà (marque, période approximative, catégorie, statut de droits).
2. Hubert crée la fiche Sanity correspondante via MCP : upload des images, remplissage des champs, rattachement aux référentiels.
3. Pour une Revue ou un Patron gratuit destiné au téléchargement (statut confirmé domaine public), le fichier haute résolution est envoyé séparément vers Cloudflare R2, et le lien est inséré dans la fiche Sanity.
4. Aurélia n'a pas besoin d'ouvrir Sanity Studio ; un lien de prévisualisation peut lui être fourni sur demande avant publication.
5. Le statut de droits repose entièrement sur le jugement d'Aurélia — Hubert applique ce qu'elle indique, sans vérification juridique automatisée.

## 5. Recherche & datation par critères

Un même mécanisme technique (index JSON généré au build + filtres JavaScript côté client) sert les trois flux, avec des facettes différentes selon le type de contenu :

- **Consulter une revue vintage** : filtres par catégorie, éditeur, décennie.
- **Dater un patron** : filtres par catégorie et caractéristiques de style (col, silhouette, longueur, manches...) sur les Pochettes de patron, pour faire remonter les fiches les plus proches et leur fourchette de dates estimée.
- **Ressources gratuites** : filtres par catégorie sur les Patrons gratuits, avec téléchargement direct.

Aucune recherche plein texte n'est nécessaire au lancement ; elle pourra être ajoutée plus tard (ex. Pagefind) sans remettre en cause l'architecture.

## 6. Gestion des droits d'auteur

- Champ « statut de droits » présent sur chaque fiche (Revue, Pochette de patron, Patron gratuit).
- Règle d'affichage automatique et systématique : un lien de téléchargement n'apparaît **que si** statut = domaine public. Sinon la fiche reste consultable (photos, infos) sans lien de téléchargement.
- Le statut est déterminé par Aurélia, fiche par fiche ; aucune vérification légale automatisée n'est effectuée par Hubert.
- Une page « Droits d'auteur / Mentions légales » sera prévue, expliquant la politique du site (téléchargement complet réservé au domaine public, retrait sur simple signalement en cas d'erreur) et fournissant un canal de contact.

## 7. Évolutivité — soumission publique future

Non construite au lancement, mais l'architecture l'anticipe nativement :

- Le mécanisme brouillon/publié de Sanity permet d'accueillir des soumissions tierces comme documents en attente de validation, sans changement de modèle.
- Le jour venu, un formulaire public enverrait les soumissions vers un point d'entrée gratuit (ex. Cloudflare Worker) créant un brouillon Sanity plutôt qu'un document publié.
- Aurélia validerait chaque soumission avant publication — le contrôle qu'elle souhaite garder est respecté par construction, sans travail supplémentaire à prévoir maintenant.

## 8. Hors périmètre (V1)

- Soumission publique de contenu (prévue en 7, mais non implémentée).
- Recherche plein texte / mots-clés libres.
- Datation par IA (upload photo + comparaison automatique) — jugée trop peu fiable et disproportionnée vu la contrainte de budget zéro ; peut être reconsidérée plus tard en s'appuyant sur un modèle tournant côté client (ex. `transformers.js`) si le besoin se confirme.
- Comptes utilisateurs / connexion — le site reste intégralement accessible sans identification.
- Multilingue — le site est conçu en français uniquement au lancement (à confirmer si besoin contraire).

## 9. Points de vigilance / risques

- **Quotas du plan gratuit Sanity** (nombre de documents, volume d'assets) à vérifier une fois le volume réel de fiches connu — atténué par le fait que les fichiers lourds (scans complets, PDF) sont hébergés à part sur Cloudflare R2, pas dans Sanity.
- **Statut de droits d'auteur** : dépend entièrement du jugement d'Aurélia sur chaque document ; Hubert n'effectue aucune vérification juridique et ne doit jamais présumer un statut par défaut.
- **Volume de contenu à ingérer** : la collection étant partiellement numérisée et de taille importante, le flux d'ajout (section 4) sera sollicité en continu sur la durée — à garder simple et sans friction pour rester soutenable.
