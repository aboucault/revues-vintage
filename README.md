# Revues Vintage

Site public pour consulter des revues de couture/tricot/broderie/crochet vintage, dater des patrons anciens et accéder à des ressources gratuites (patrons de couture, tricot, broderie, crochet).

Stack prévue : Astro + Sanity (contenu) + Cloudflare Pages (hébergement) + Cloudflare R2 (stockage des scans complets).

Projet en phase de conception — voir la note de référence dans le vault Obsidian.

## Configuration

Copier `.env.example` en `.env` et renseigner :

- `SANITY_PROJECT_ID` — identifiant du projet Sanity « Revues Vintage » (organisation Carto).
- `SANITY_DATASET` — `production`.
- `SANITY_READ_TOKEN` — jeton de lecture utilisé au build pour interroger Sanity.

Le fichier `.env` n'est jamais commité (voir `.gitignore`).

## Cloudflare R2 — scans complets de revues

Le bucket R2 doit être créé une fois, depuis un compte authentifié (Wrangler n'est pas authentifié dans l'environnement d'exécution automatisé) :

```bash
wrangler login
wrangler r2 bucket create revues-vintage-scans
```

Puis activer l'accès public au bucket (domaine personnalisé ou URL publique `r2.dev`) depuis le dashboard Cloudflare : R2 → `revues-vintage-scans` → Settings → Public access.

### Upload d'un scan complet de revue

```bash
wrangler r2 object put revues-vintage-scans/<nom-fichier>.pdf --file=<chemin-local>.pdf
```

L'URL publique résultante est renseignée dans le champ `urlScanComplet` du document `revue` correspondant.

## Déploiement Cloudflare Pages

Le compte Cloudflare (et la connexion du dépôt GitHub) sont gérés par Aurélia directement dans le dashboard Cloudflare Pages :

- Dépôt : `aboucault/revues-vintage`, branche `master`
- Commande de build : `npm run build`
- Répertoire de sortie : `dist`
- Variables d'environnement à renseigner dans Cloudflare Pages (Settings → Environment variables) :
  - `SANITY_PROJECT_ID` = `u6nnkwb0`
  - `SANITY_DATASET` = `production`
  - `SANITY_READ_TOKEN` = (le jeton de lecture, voir `.env` local — à ne jamais commiter)

## Ajouter du contenu (procédure pour Hubert)

Quand Aurélia transmet des images et informations pour une nouvelle Revue, Pochette de patron ou Patron gratuit :

1. Identifier le type de document (Revue / Pochette de patron / Patron gratuit) selon la description d'Aurélia.
2. Vérifier que les référentiels nécessaires existent déjà (catégorie, marque, décennie) ; en créer de nouveaux via `mcp__Sanity__create_documents` si besoin.
3. Uploader les images légères (couverture, aperçus, recto/verso) directement en assets Sanity (`mcp__Sanity__create_documents` ou `mcp__Sanity__generate_image` pour des visuels de test).
4. Pour une Revue ou un Patron gratuit destiné au téléchargement :
   - Confirmer avec Aurélia le statut de droits (`domaine-public` uniquement si elle le confirme explicitement).
   - Si domaine public et fichier lourd (scan complet de revue) : uploader sur Cloudflare R2 (voir procédure ci-dessus), renseigner l'URL publique dans `urlScanComplet`.
   - Si domaine public et fichier léger (patron gratuit, 1-4 pages) : le fichier doit être un vrai asset Sanity dans `fichierPatron`. **Limite connue** : le jeu d'outils MCP actuel ne permet pas d'uploader un fichier binaire arbitraire (seulement des images via `generate_image`) — un vrai PDF doit être ajouté manuellement via Sanity Studio tant qu'un outil d'upload de fichier n'est pas disponible.
5. Créer le document via `mcp__Sanity__create_documents` avec tous les champs renseignés.
6. Publier le document via `mcp__Sanity__publish_documents`.
7. Envoyer à Aurélia un lien de prévisualisation si elle souhaite vérifier avant publication définitive.
