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
