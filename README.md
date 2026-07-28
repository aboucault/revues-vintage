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
