# Revues Vintage MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construire le site public "Revues Vintage" (Astro + Sanity + Cloudflare) permettant de consulter des revues de couture vintage, dater un patron par comparaison, et télécharger des patrons gratuits.

**Architecture:** Site statique Astro (SSG) qui interroge Sanity au moment du build via GROQ, transforme les documents en un catalogue JSON unifié filtrable côté client, et déploie sur Cloudflare Pages. Les scans complets de revues (lourds) sont stockés sur Cloudflare R2 ; les patrons gratuits (1-4 pages) et images légères restent en assets Sanity.

**Tech Stack:** Astro (TypeScript, `output: 'static'`), `@sanity/client`, Vitest pour les tests unitaires, aucun framework UI (îlots vanilla TS), Cloudflare Pages (hébergement), Cloudflare R2 (scans complets), Sanity (CMS, géré via MCP).

## Global Constraints

- Budget zéro : chaque service utilisé doit rester sur un palier gratuit (Sanity, Cloudflare Pages, Cloudflare R2) — aucune API payante, notamment aucune IA de vision payante.
- Aucune authentification visiteur : navigation et téléchargement sont 100% publics, sans compte.
- Un lien de téléchargement (Revue complète ou Patron gratuit) n'apparaît **que si** `statutDroits === 'domaine-public'`. Une Pochette de patron n'a **jamais** de fichier téléchargeable, quel que soit son statut.
- Le statut de droits est saisi manuellement par Aurélia, fiche par fiche ; aucune vérification légale automatisée n'est implémentée.
- Site en français uniquement au lancement.
- Aucune recherche plein texte au lancement — uniquement des filtres à facettes (catégorie, marque, décennie, caractéristiques de style).
- Trois flux d'entrée distincts sur le site : Consulter une revue vintage, Dater un patron, Ressources gratuites.

---

## Task 1: Scaffold du projet Astro

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `vitest.config.ts`, `.gitignore`
- Create: `src/pages/index.astro` (page temporaire, remplacée en Task 8)

**Interfaces:**
- Produces: scripts npm `dev`, `build`, `preview`, `test` utilisés par toutes les tâches suivantes.

- [ ] **Step 1: Initialiser le projet Astro**

```bash
cd /Users/aurelia/Documents/dev/revues-vintage
npm create astro@latest . -- --template minimal --typescript strict --no-install --no-git
```

- [ ] **Step 2: Installer les dépendances**

```bash
npm install
npm install @sanity/client
npm install -D vitest
```

- [ ] **Step 3: Ajouter les scripts npm**

Dans `package.json`, section `scripts` :

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "test": "vitest run"
  }
}
```

- [ ] **Step 4: Créer `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
  },
})
```

- [ ] **Step 5: Compléter `.gitignore`**

```
node_modules/
dist/
.astro/
.env
```

- [ ] **Step 6: Vérifier que le serveur de dev démarre**

Run: `npm run dev` puis `Ctrl+C` après confirmation du démarrage sans erreur.
Expected: `astro dev server started` sur `localhost:4321`, page minimale visible.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: scaffold Astro project with vitest"
```

---

## Task 2: Création du projet Sanity et configuration d'environnement

**Files:**
- Create: `.env` (non commité), `.env.example`
- Modify: `README.md` (documenter les variables d'environnement requises)

**Interfaces:**
- Produces: variables d'environnement `SANITY_PROJECT_ID`, `SANITY_DATASET` consommées par `src/lib/sanity.ts` (Task 5).

- [ ] **Step 1: Créer le projet Sanity via MCP**

Utiliser l'outil MCP Sanity (`mcp__Sanity__create_project`) pour créer un nouveau projet nommé "Revues Vintage", puis `mcp__Sanity__create_dataset` pour créer un dataset `production` (public, lecture seule pour les visiteurs).

- [ ] **Step 2: Récupérer l'identifiant du projet**

Utiliser `mcp__Sanity__list_projects` ou la sortie de l'étape précédente pour noter le `projectId`.

- [ ] **Step 3: Créer `.env.example`**

```
SANITY_PROJECT_ID=
SANITY_DATASET=production
```

- [ ] **Step 4: Créer `.env` (local, non commité)**

```
SANITY_PROJECT_ID=<projectId noté à l'étape 2>
SANITY_DATASET=production
```

- [ ] **Step 5: Documenter dans le README**

Ajouter dans `README.md` une section "Configuration" listant les deux variables d'environnement requises et leur rôle.

- [ ] **Step 6: Vérifier l'accès au projet**

Utiliser `mcp__Sanity__whoami` puis `mcp__Sanity__get_schema` (schéma vide attendu à ce stade) pour confirmer que le projet est accessible.
Expected: la commande répond sans erreur d'authentification.

- [ ] **Step 7: Commit**

```bash
git add .env.example README.md
git commit -m "chore: configure Sanity project environment variables"
```

---

## Task 3: Schéma Sanity — référentiels (Catégorie, Marque, Décennie)

**Files:**
- Create: `schema/categorie.ts`, `schema/marque.ts`, `schema/decennie.ts`

**Interfaces:**
- Produces: types de document Sanity `categorie`, `marque`, `decennie` consommés par les schémas Revue/Pochette/Patron gratuit (Task 4) et par les requêtes GROQ (Task 5).

- [ ] **Step 1: Créer `schema/categorie.ts`**

```ts
import { defineType, defineField } from 'sanity'

export const categorie = defineType({
  name: 'categorie',
  title: 'Catégorie',
  type: 'document',
  fields: [
    defineField({ name: 'nom', title: 'Nom', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'nom' },
      validation: (Rule) => Rule.required(),
    }),
  ],
})
```

- [ ] **Step 2: Créer `schema/marque.ts`**

```ts
import { defineType, defineField } from 'sanity'

export const marque = defineType({
  name: 'marque',
  title: 'Marque',
  type: 'document',
  fields: [
    defineField({ name: 'nom', title: 'Nom', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'nom' },
      validation: (Rule) => Rule.required(),
    }),
  ],
})
```

- [ ] **Step 3: Créer `schema/decennie.ts`**

```ts
import { defineType, defineField } from 'sanity'

export const decennie = defineType({
  name: 'decennie',
  title: 'Décennie',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Ex: années 1950, 1960-1965',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'anneeDebut', title: 'Année de début', type: 'number', validation: (Rule) => Rule.required() }),
    defineField({ name: 'anneeFin', title: 'Année de fin', type: 'number', validation: (Rule) => Rule.required() }),
  ],
})
```

- [ ] **Step 4: Commit**

```bash
git add schema/categorie.ts schema/marque.ts schema/decennie.ts
git commit -m "feat: add Sanity reference schemas (categorie, marque, decennie)"
```

---

## Task 4: Schéma Sanity — Revue, Pochette de patron, Patron gratuit

**Files:**
- Create: `schema/revue.ts`, `schema/pochettePatron.ts`, `schema/patronGratuit.ts`, `schema/index.ts`

**Interfaces:**
- Consumes: types `categorie`, `marque`, `decennie` (Task 3)
- Produces: types de document `revue`, `pochettePatron`, `patronGratuit` consommés par les requêtes GROQ (Task 5)

- [ ] **Step 1: Créer `schema/revue.ts`**

```ts
import { defineType, defineField } from 'sanity'

export const revue = defineType({
  name: 'revue',
  title: 'Revue',
  type: 'document',
  fields: [
    defineField({ name: 'titre', title: 'Titre', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'titre' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'editeur', title: 'Éditeur', type: 'string' }),
    defineField({ name: 'numero', title: 'Numéro', type: 'string' }),
    defineField({ name: 'decennie', title: 'Décennie', type: 'reference', to: [{ type: 'decennie' }] }),
    defineField({
      name: 'categories',
      title: 'Catégories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'categorie' }] }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'statutDroits',
      title: 'Statut de droits',
      type: 'string',
      options: {
        list: [
          { title: 'Domaine public', value: 'domaine-public' },
          { title: 'Incertain', value: 'incertain' },
          { title: 'Protégé', value: 'protege' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'couverture', title: 'Couverture', type: 'image' }),
    defineField({ name: 'apercuPages', title: 'Aperçu de pages', type: 'array', of: [{ type: 'image' }] }),
    defineField({
      name: 'urlScanComplet',
      title: 'URL du scan complet (Cloudflare R2)',
      type: 'url',
      description: 'Renseigné uniquement si statutDroits = domaine-public',
    }),
  ],
})
```

- [ ] **Step 2: Créer `schema/pochettePatron.ts`**

```ts
import { defineType, defineField } from 'sanity'

export const pochettePatron = defineType({
  name: 'pochettePatron',
  title: 'Pochette de patron',
  type: 'document',
  fields: [
    defineField({ name: 'titre', title: 'Titre', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'titre' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'marque', title: 'Marque', type: 'reference', to: [{ type: 'marque' }] }),
    defineField({ name: 'numeroPatron', title: 'Numéro de patron', type: 'string' }),
    defineField({
      name: 'categories',
      title: 'Catégories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'categorie' }] }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({ name: 'decennie', title: 'Décennie', type: 'reference', to: [{ type: 'decennie' }] }),
    defineField({
      name: 'caracteristiquesStyle',
      title: 'Caractéristiques de style',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Ex: col claudine, silhouette trapèze, manches ballon',
    }),
    defineField({ name: 'imageRecto', title: 'Image recto', type: 'image', validation: (Rule) => Rule.required() }),
    defineField({ name: 'imageVerso', title: 'Image verso', type: 'image' }),
    defineField({
      name: 'statutDroits',
      title: 'Statut de droits',
      type: 'string',
      options: {
        list: [
          { title: 'Domaine public', value: 'domaine-public' },
          { title: 'Incertain', value: 'incertain' },
          { title: 'Protégé', value: 'protege' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
})
```

- [ ] **Step 3: Créer `schema/patronGratuit.ts`**

```ts
import { defineType, defineField } from 'sanity'

export const patronGratuit = defineType({
  name: 'patronGratuit',
  title: 'Patron gratuit',
  type: 'document',
  fields: [
    defineField({ name: 'titre', title: 'Titre', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'titre' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({
      name: 'categories',
      title: 'Catégories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'categorie' }] }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({ name: 'revueSource', title: 'Revue source', type: 'reference', to: [{ type: 'revue' }] }),
    defineField({
      name: 'fichierPatron',
      title: 'Fichier patron (PDF)',
      type: 'file',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'statutDroits',
      title: 'Statut de droits',
      type: 'string',
      options: {
        list: [
          { title: 'Domaine public', value: 'domaine-public' },
          { title: 'Incertain', value: 'incertain' },
          { title: 'Protégé', value: 'protege' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
})
```

- [ ] **Step 4: Créer `schema/index.ts`**

```ts
import { categorie } from './categorie'
import { marque } from './marque'
import { decennie } from './decennie'
import { revue } from './revue'
import { pochettePatron } from './pochettePatron'
import { patronGratuit } from './patronGratuit'

export const schemaTypes = [categorie, marque, decennie, revue, pochettePatron, patronGratuit]
```

- [ ] **Step 5: Déployer le schéma vers Sanity**

Utiliser l'outil MCP `mcp__Sanity__deploy_schema` en pointant vers `schema/index.ts`.

- [ ] **Step 6: Vérifier le déploiement**

Utiliser `mcp__Sanity__get_schema` et confirmer que les 6 types (`categorie`, `marque`, `decennie`, `revue`, `pochettePatron`, `patronGratuit`) apparaissent.

- [ ] **Step 7: Commit**

```bash
git add schema/revue.ts schema/pochettePatron.ts schema/patronGratuit.ts schema/index.ts
git commit -m "feat: add Sanity document schemas (revue, pochettePatron, patronGratuit)"
```

---

## Task 5: Client Sanity et requêtes GROQ typées

**Files:**
- Create: `src/lib/sanity.ts`
- Test: `src/lib/sanity.test.ts`

**Interfaces:**
- Consumes: `SANITY_PROJECT_ID`, `SANITY_DATASET` (Task 2), schéma déployé (Task 4)
- Produces: `fetchRevues(): Promise<RevueDoc[]>`, `fetchPochettesPatron(): Promise<PochettePatronDoc[]>`, `fetchPatronsGratuits(): Promise<PatronGratuitDoc[]>`, types `RevueDoc`, `PochettePatronDoc`, `PatronGratuitDoc`, `StatutDroits`

- [ ] **Step 1: Écrire le test qui échoue**

```ts
// src/lib/sanity.test.ts
import { describe, expect, it, vi } from 'vitest'

const fetchMock = vi.fn()

vi.mock('@sanity/client', () => ({
  createClient: () => ({ fetch: fetchMock }),
}))

describe('fetchRevues', () => {
  it('interroge Sanity avec la requête GROQ des revues et retourne le résultat', async () => {
    const { fetchRevues } = await import('./sanity')
    fetchMock.mockResolvedValueOnce([{ _id: '1', titre: 'Modes & Travaux 1958' }])

    const result = await fetchRevues()

    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('_type == "revue"'))
    expect(result).toEqual([{ _id: '1', titre: 'Modes & Travaux 1958' }])
  })
})
```

- [ ] **Step 2: Lancer le test et vérifier qu'il échoue**

Run: `npx vitest run src/lib/sanity.test.ts`
Expected: FAIL — `Cannot find module './sanity'`

- [ ] **Step 3: Implémenter `src/lib/sanity.ts`**

```ts
import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID,
  dataset: import.meta.env.SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

export type StatutDroits = 'domaine-public' | 'incertain' | 'protege'

export interface RevueDoc {
  _id: string
  titre: string
  slug: string
  editeur?: string
  numero?: string
  decennieLabel?: string
  categories: string[]
  statutDroits: StatutDroits
  couvertureUrl?: string
  apercuPagesUrls: string[]
  urlScanComplet?: string
}

export interface PochettePatronDoc {
  _id: string
  titre: string
  slug: string
  marqueNom?: string
  numeroPatron?: string
  categories: string[]
  decennieLabel?: string
  caracteristiquesStyle: string[]
  imageRectoUrl: string
  imageVersoUrl?: string
}

export interface PatronGratuitDoc {
  _id: string
  titre: string
  slug: string
  description?: string
  categories: string[]
  revueSourceSlug?: string
  fichierUrl?: string
  statutDroits: StatutDroits
}

const REVUE_QUERY = `*[_type == "revue"]{
  _id,
  titre,
  "slug": slug.current,
  editeur,
  numero,
  "decennieLabel": decennie->label,
  "categories": categories[]->nom,
  statutDroits,
  "couvertureUrl": couverture.asset->url,
  "apercuPagesUrls": apercuPages[].asset->url,
  urlScanComplet
}`

export async function fetchRevues(): Promise<RevueDoc[]> {
  return sanityClient.fetch(REVUE_QUERY)
}

const POCHETTE_QUERY = `*[_type == "pochettePatron"]{
  _id,
  titre,
  "slug": slug.current,
  "marqueNom": marque->nom,
  numeroPatron,
  "categories": categories[]->nom,
  "decennieLabel": decennie->label,
  caracteristiquesStyle,
  "imageRectoUrl": imageRecto.asset->url,
  "imageVersoUrl": imageVerso.asset->url
}`

export async function fetchPochettesPatron(): Promise<PochettePatronDoc[]> {
  return sanityClient.fetch(POCHETTE_QUERY)
}

const PATRON_GRATUIT_QUERY = `*[_type == "patronGratuit"]{
  _id,
  titre,
  "slug": slug.current,
  description,
  "categories": categories[]->nom,
  "revueSourceSlug": revueSource->slug.current,
  "fichierUrl": fichierPatron.asset->url,
  statutDroits
}`

export async function fetchPatronsGratuits(): Promise<PatronGratuitDoc[]> {
  return sanityClient.fetch(PATRON_GRATUIT_QUERY)
}
```

- [ ] **Step 4: Lancer le test et vérifier qu'il passe**

Run: `npx vitest run src/lib/sanity.test.ts`
Expected: PASS

- [ ] **Step 5: Ajouter les tests pour `fetchPochettesPatron` et `fetchPatronsGratuits`**

```ts
describe('fetchPochettesPatron', () => {
  it('interroge Sanity avec la requête GROQ des pochettes de patron', async () => {
    const { fetchPochettesPatron } = await import('./sanity')
    fetchMock.mockResolvedValueOnce([{ _id: '2', titre: 'Vogue 1234' }])

    const result = await fetchPochettesPatron()

    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('_type == "pochettePatron"'))
    expect(result).toEqual([{ _id: '2', titre: 'Vogue 1234' }])
  })
})

describe('fetchPatronsGratuits', () => {
  it('interroge Sanity avec la requête GROQ des patrons gratuits', async () => {
    const { fetchPatronsGratuits } = await import('./sanity')
    fetchMock.mockResolvedValueOnce([{ _id: '3', titre: 'Robe à smocks' }])

    const result = await fetchPatronsGratuits()

    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('_type == "patronGratuit"'))
    expect(result).toEqual([{ _id: '3', titre: 'Robe à smocks' }])
  })
})
```

- [ ] **Step 6: Lancer tous les tests du fichier et vérifier qu'ils passent**

Run: `npx vitest run src/lib/sanity.test.ts`
Expected: PASS (3 tests)

- [ ] **Step 7: Commit**

```bash
git add src/lib/sanity.ts src/lib/sanity.test.ts
git commit -m "feat: add typed Sanity client and GROQ queries"
```

---

## Task 6: Constructeur de catalogue unifié

**Files:**
- Create: `src/lib/catalog.ts`
- Test: `src/lib/catalog.test.ts`

**Interfaces:**
- Consumes: `RevueDoc`, `PochettePatronDoc`, `PatronGratuitDoc` (Task 5)
- Produces: `CatalogEntry`, `CatalogEntryType`, `buildCatalog(revues: RevueDoc[], pochettes: PochettePatronDoc[], patronsGratuits: PatronGratuitDoc[]): CatalogEntry[]` — consommé par les pages (Tasks 10-12)

- [ ] **Step 1: Écrire le test qui échoue — règle de droits d'auteur sur les Revues**

```ts
// src/lib/catalog.test.ts
import { describe, expect, it } from 'vitest'
import { buildCatalog } from './catalog'
import type { RevueDoc } from './sanity'

const baseRevue: RevueDoc = {
  _id: 'r1',
  titre: 'Modes & Travaux 1958',
  slug: 'modes-travaux-1958',
  categories: ['couture'],
  statutDroits: 'domaine-public',
  apercuPagesUrls: [],
  urlScanComplet: 'https://r2.example.com/scan.pdf',
}

describe('buildCatalog — revues', () => {
  it("expose l'URL de téléchargement quand le statut est domaine public", () => {
    const [entry] = buildCatalog([baseRevue], [], [])
    expect(entry.telechargementUrl).toBe('https://r2.example.com/scan.pdf')
  })

  it('masque l’URL de téléchargement quand le statut n’est pas domaine public', () => {
    const revueProtegee: RevueDoc = { ...baseRevue, statutDroits: 'protege' }
    const [entry] = buildCatalog([revueProtegee], [], [])
    expect(entry.telechargementUrl).toBeUndefined()
  })
})
```

- [ ] **Step 2: Lancer le test et vérifier qu'il échoue**

Run: `npx vitest run src/lib/catalog.test.ts`
Expected: FAIL — `Cannot find module './catalog'`

- [ ] **Step 3: Implémenter `src/lib/catalog.ts`**

```ts
import type { PatronGratuitDoc, PochettePatronDoc, RevueDoc } from './sanity'

export type CatalogEntryType = 'revue' | 'pochette-patron' | 'patron-gratuit'

export interface CatalogEntry {
  id: string
  type: CatalogEntryType
  titre: string
  slug: string
  categories: string[]
  decennieLabel?: string
  marqueNom?: string
  caracteristiquesStyle: string[]
  imageUrl: string
  telechargementUrl?: string
}

export function buildCatalog(
  revues: RevueDoc[],
  pochettes: PochettePatronDoc[],
  patronsGratuits: PatronGratuitDoc[]
): CatalogEntry[] {
  const revueEntries: CatalogEntry[] = revues.map((r) => ({
    id: r._id,
    type: 'revue',
    titre: r.titre,
    slug: r.slug,
    categories: r.categories,
    decennieLabel: r.decennieLabel,
    caracteristiquesStyle: [],
    imageUrl: r.couvertureUrl ?? '',
    telechargementUrl: r.statutDroits === 'domaine-public' ? r.urlScanComplet : undefined,
  }))

  const pochetteEntries: CatalogEntry[] = pochettes.map((p) => ({
    id: p._id,
    type: 'pochette-patron',
    titre: p.titre,
    slug: p.slug,
    categories: p.categories,
    decennieLabel: p.decennieLabel,
    marqueNom: p.marqueNom,
    caracteristiquesStyle: p.caracteristiquesStyle,
    imageUrl: p.imageRectoUrl,
    telechargementUrl: undefined,
  }))

  const patronGratuitEntries: CatalogEntry[] = patronsGratuits.map((p) => ({
    id: p._id,
    type: 'patron-gratuit',
    titre: p.titre,
    slug: p.slug,
    categories: p.categories,
    caracteristiquesStyle: [],
    imageUrl: '',
    telechargementUrl: p.statutDroits === 'domaine-public' ? p.fichierUrl : undefined,
  }))

  return [...revueEntries, ...pochetteEntries, ...patronGratuitEntries]
}
```

- [ ] **Step 4: Lancer le test et vérifier qu'il passe**

Run: `npx vitest run src/lib/catalog.test.ts`
Expected: PASS

- [ ] **Step 5: Ajouter les tests pour Pochette de patron et Patron gratuit**

```ts
import type { PatronGratuitDoc, PochettePatronDoc } from './sanity'

describe('buildCatalog — pochettes de patron', () => {
  it("n'expose jamais d'URL de téléchargement, quel que soit le statut", () => {
    const pochette: PochettePatronDoc = {
      _id: 'p1',
      titre: 'Vogue 1234',
      slug: 'vogue-1234',
      categories: ['couture'],
      caracteristiquesStyle: ['col claudine'],
      imageRectoUrl: 'https://cdn.sanity.io/recto.jpg',
    }
    const [entry] = buildCatalog([], [pochette], [])
    expect(entry.telechargementUrl).toBeUndefined()
    expect(entry.type).toBe('pochette-patron')
  })
})

describe('buildCatalog — patrons gratuits', () => {
  it("expose l'URL de téléchargement quand le statut est domaine public", () => {
    const patron: PatronGratuitDoc = {
      _id: 'g1',
      titre: 'Robe à smocks',
      slug: 'robe-a-smocks',
      categories: ['couture'],
      statutDroits: 'domaine-public',
      fichierUrl: 'https://cdn.sanity.io/patron.pdf',
    }
    const [entry] = buildCatalog([], [], [patron])
    expect(entry.telechargementUrl).toBe('https://cdn.sanity.io/patron.pdf')
  })

  it("masque l'URL de téléchargement quand le statut est incertain", () => {
    const patron: PatronGratuitDoc = {
      _id: 'g2',
      titre: 'Robe à smocks',
      slug: 'robe-a-smocks',
      categories: ['couture'],
      statutDroits: 'incertain',
      fichierUrl: 'https://cdn.sanity.io/patron.pdf',
    }
    const [entry] = buildCatalog([], [], [patron])
    expect(entry.telechargementUrl).toBeUndefined()
  })
})
```

- [ ] **Step 6: Lancer tous les tests du fichier et vérifier qu'ils passent**

Run: `npx vitest run src/lib/catalog.test.ts`
Expected: PASS (5 tests)

- [ ] **Step 7: Commit**

```bash
git add src/lib/catalog.ts src/lib/catalog.test.ts
git commit -m "feat: add unified catalog builder with copyright download rule"
```

---

## Task 7: Logique de filtrage à facettes

**Files:**
- Create: `src/lib/filter.ts`
- Test: `src/lib/filter.test.ts`

**Interfaces:**
- Consumes: `CatalogEntry`, `CatalogEntryType` (Task 6)
- Produces: `FilterCriteria`, `filterCatalog(entries: CatalogEntry[], criteria: FilterCriteria): CatalogEntry[]` — consommé par `CatalogBrowser.astro` (Task 9)

- [ ] **Step 1: Écrire le test qui échoue**

```ts
// src/lib/filter.test.ts
import { describe, expect, it } from 'vitest'
import { filterCatalog } from './filter'
import type { CatalogEntry } from './catalog'

const entries: CatalogEntry[] = [
  {
    id: '1',
    type: 'revue',
    titre: 'Modes & Travaux 1958',
    slug: 'modes-travaux-1958',
    categories: ['couture'],
    decennieLabel: '1950s',
    caracteristiquesStyle: [],
    imageUrl: '',
  },
  {
    id: '2',
    type: 'pochette-patron',
    titre: 'Vogue 1234',
    slug: 'vogue-1234',
    categories: ['couture'],
    marqueNom: 'Vogue',
    decennieLabel: '1960s',
    caracteristiquesStyle: ['col claudine'],
    imageUrl: '',
  },
]

describe('filterCatalog', () => {
  it('retourne toutes les entrées sans critère', () => {
    expect(filterCatalog(entries, {})).toHaveLength(2)
  })
})
```

- [ ] **Step 2: Lancer le test et vérifier qu'il échoue**

Run: `npx vitest run src/lib/filter.test.ts`
Expected: FAIL — `Cannot find module './filter'`

- [ ] **Step 3: Implémenter `src/lib/filter.ts`**

```ts
import type { CatalogEntry, CatalogEntryType } from './catalog'

export interface FilterCriteria {
  type?: CatalogEntryType
  categorie?: string
  marqueNom?: string
  decennieLabel?: string
  caracteristiqueStyle?: string
}

export function filterCatalog(entries: CatalogEntry[], criteria: FilterCriteria): CatalogEntry[] {
  return entries.filter((entry) => {
    if (criteria.type && entry.type !== criteria.type) return false
    if (criteria.categorie && !entry.categories.includes(criteria.categorie)) return false
    if (criteria.marqueNom && entry.marqueNom !== criteria.marqueNom) return false
    if (criteria.decennieLabel && entry.decennieLabel !== criteria.decennieLabel) return false
    if (criteria.caracteristiqueStyle && !entry.caracteristiquesStyle.includes(criteria.caracteristiqueStyle))
      return false
    return true
  })
}
```

- [ ] **Step 4: Lancer le test et vérifier qu'il passe**

Run: `npx vitest run src/lib/filter.test.ts`
Expected: PASS

- [ ] **Step 5: Ajouter les tests de filtrage combiné et cas vide**

```ts
describe('filterCatalog — filtres', () => {
  it('filtre par type', () => {
    expect(filterCatalog(entries, { type: 'pochette-patron' })).toEqual([entries[1]])
  })

  it('filtre par catégorie', () => {
    expect(filterCatalog(entries, { categorie: 'couture' })).toHaveLength(2)
  })

  it('filtre par décennie et marque combinées', () => {
    expect(filterCatalog(entries, { decennieLabel: '1960s', marqueNom: 'Vogue' })).toEqual([entries[1]])
  })

  it('filtre par caractéristique de style', () => {
    expect(filterCatalog(entries, { caracteristiqueStyle: 'col claudine' })).toEqual([entries[1]])
  })

  it('retourne un tableau vide quand rien ne correspond', () => {
    expect(filterCatalog(entries, { marqueNom: 'Butterick' })).toEqual([])
  })
})
```

- [ ] **Step 6: Lancer tous les tests du fichier et vérifier qu'ils passent**

Run: `npx vitest run src/lib/filter.test.ts`
Expected: PASS (6 tests)

- [ ] **Step 7: Commit**

```bash
git add src/lib/filter.ts src/lib/filter.test.ts
git commit -m "feat: add facet filtering logic for the catalog"
```

---

## Task 8: Layout, page d'accueil, page droits d'auteur

**Files:**
- Create: `src/layouts/Layout.astro`
- Modify: `src/pages/index.astro`
- Create: `src/pages/droits-auteur.astro`

**Interfaces:**
- Produces: `Layout.astro` (prop `title: string`) réutilisé par toutes les pages (Tasks 10-12)

- [ ] **Step 1: Créer `src/layouts/Layout.astro`**

```astro
---
interface Props {
  title: string
}
const { title } = Astro.props
---
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title} — Revues Vintage</title>
  </head>
  <body>
    <nav>
      <a href="/">Accueil</a>
      <a href="/revues">Consulter une revue vintage</a>
      <a href="/dater-un-patron">Dater un patron</a>
      <a href="/ressources-gratuites">Ressources gratuites</a>
      <a href="/droits-auteur">Droits d'auteur</a>
    </nav>
    <main>
      <slot />
    </main>
  </body>
</html>
```

- [ ] **Step 2: Remplacer `src/pages/index.astro`**

```astro
---
import Layout from '../layouts/Layout.astro'
---
<Layout title="Accueil">
  <h1>Revues Vintage</h1>
  <p>Une collection de revues et patrons de couture, tricot, broderie et crochet vintage.</p>
  <ul>
    <li><a href="/revues">Consulter une revue vintage</a></li>
    <li><a href="/dater-un-patron">Dater un patron</a></li>
    <li><a href="/ressources-gratuites">Accéder aux ressources gratuites</a></li>
  </ul>
</Layout>
```

- [ ] **Step 3: Créer `src/pages/droits-auteur.astro`**

```astro
---
import Layout from '../layouts/Layout.astro'
---
<Layout title="Droits d'auteur">
  <h1>Droits d'auteur</h1>
  <p>
    Les revues et patrons proposés en téléchargement complet sur ce site sont dans le domaine public.
    Les autres documents sont présentés à titre de référence (identification, datation) sans que leur
    contenu téléchargeable soit mis à disposition.
  </p>
  <p>
    Si vous pensez qu'un document publié ici ne devrait pas l'être, contactez-nous et il sera retiré
    sans délai.
  </p>
</Layout>
```

- [ ] **Step 4: Vérifier le build**

Run: `npm run build`
Expected: build réussi, `dist/index.html` et `dist/droits-auteur/index.html` générés.

- [ ] **Step 5: Commit**

```bash
git add src/layouts/Layout.astro src/pages/index.astro src/pages/droits-auteur.astro
git commit -m "feat: add layout, homepage and copyright page"
```

---

## Task 9: Composant CatalogBrowser (facettes + résultats)

**Files:**
- Create: `src/components/CatalogBrowser.astro`

**Interfaces:**
- Consumes: `CatalogEntry` (Task 6), `filterCatalog`/`FilterCriteria` (Task 7)
- Produces: composant `CatalogBrowser` (props `entries: CatalogEntry[]`, `showMarqueFilter?: boolean`, `showCaracteristiquesFilter?: boolean`) consommé par les pages (Tasks 10-12)

- [ ] **Step 1: Créer `src/components/CatalogBrowser.astro`**

```astro
---
import type { CatalogEntry } from '../lib/catalog'

interface Props {
  entries: CatalogEntry[]
  showMarqueFilter?: boolean
  showCaracteristiquesFilter?: boolean
}

const { entries, showMarqueFilter = false, showCaracteristiquesFilter = false } = Astro.props

const categories = [...new Set(entries.flatMap((e) => e.categories))].sort()
const decennies = [...new Set(entries.map((e) => e.decennieLabel).filter((v): v is string => Boolean(v)))].sort()
const marques = showMarqueFilter
  ? [...new Set(entries.map((e) => e.marqueNom).filter((v): v is string => Boolean(v)))].sort()
  : []
const caracteristiques = showCaracteristiquesFilter
  ? [...new Set(entries.flatMap((e) => e.caracteristiquesStyle))].sort()
  : []
---
<div class="catalog-browser">
  <form id="filter-form">
    <label>
      Catégorie
      <select name="categorie">
        <option value="">Toutes</option>
        {categories.map((c) => <option value={c}>{c}</option>)}
      </select>
    </label>
    <label>
      Décennie
      <select name="decennieLabel">
        <option value="">Toutes</option>
        {decennies.map((d) => <option value={d}>{d}</option>)}
      </select>
    </label>
    {showMarqueFilter && (
      <label>
        Marque
        <select name="marqueNom">
          <option value="">Toutes</option>
          {marques.map((m) => <option value={m}>{m}</option>)}
        </select>
      </label>
    )}
    {showCaracteristiquesFilter && (
      <label>
        Caractéristique de style
        <select name="caracteristiqueStyle">
          <option value="">Toutes</option>
          {caracteristiques.map((c) => <option value={c}>{c}</option>)}
        </select>
      </label>
    )}
  </form>
  <ul id="results-list"></ul>
</div>

<script type="application/json" id="catalog-data" set:html={JSON.stringify(entries)} />

<script>
  import { filterCatalog } from '../lib/filter'
  import type { CatalogEntry } from '../lib/catalog'

  const dataEl = document.getElementById('catalog-data') as HTMLScriptElement
  const entries: CatalogEntry[] = JSON.parse(dataEl.textContent ?? '[]')
  const form = document.getElementById('filter-form') as HTMLFormElement
  const resultsList = document.getElementById('results-list') as HTMLUListElement

  function render(list: CatalogEntry[]) {
    resultsList.innerHTML = list
      .map(
        (entry) => `
      <li>
        <a href="/${entry.type}/${entry.slug}">
          ${entry.imageUrl ? `<img src="${entry.imageUrl}" alt="${entry.titre}" width="120" />` : ''}
          <span>${entry.titre}</span>
        </a>
        ${entry.telechargementUrl ? `<a href="${entry.telechargementUrl}" download>Télécharger</a>` : ''}
      </li>`
      )
      .join('')
  }

  function applyFilters() {
    const formData = new FormData(form)
    render(
      filterCatalog(entries, {
        categorie: (formData.get('categorie') as string) || undefined,
        decennieLabel: (formData.get('decennieLabel') as string) || undefined,
        marqueNom: (formData.get('marqueNom') as string) || undefined,
        caracteristiqueStyle: (formData.get('caracteristiqueStyle') as string) || undefined,
      })
    )
  }

  form.addEventListener('change', applyFilters)
  render(entries)
</script>
```

- [ ] **Step 2: Vérification manuelle**

Ce composant n'a pas de test automatisé (logique DOM). Vérification différée à la Task 13 (contenu de test end-to-end), où le rendu et le filtrage seront contrôlés visuellement via `npm run dev`.

- [ ] **Step 3: Commit**

```bash
git add src/components/CatalogBrowser.astro
git commit -m "feat: add CatalogBrowser component with facet filters"
```

---

## Task 10: Pages "Consulter une revue vintage"

**Files:**
- Create: `src/pages/revues/index.astro`
- Create: `src/pages/revues/[slug].astro`

**Interfaces:**
- Consumes: `fetchRevues` (Task 5), `buildCatalog` (Task 6), `CatalogBrowser` (Task 9), `Layout` (Task 8)

- [ ] **Step 1: Créer `src/pages/revues/index.astro`**

```astro
---
import Layout from '../../layouts/Layout.astro'
import CatalogBrowser from '../../components/CatalogBrowser.astro'
import { fetchRevues } from '../../lib/sanity'
import { buildCatalog } from '../../lib/catalog'

const revues = await fetchRevues()
const entries = buildCatalog(revues, [], [])
---
<Layout title="Consulter une revue vintage">
  <h1>Consulter une revue vintage</h1>
  <CatalogBrowser entries={entries} />
</Layout>
```

- [ ] **Step 2: Créer `src/pages/revues/[slug].astro`**

```astro
---
import Layout from '../../layouts/Layout.astro'
import { fetchRevues } from '../../lib/sanity'
import type { RevueDoc } from '../../lib/sanity'

export async function getStaticPaths() {
  const revues = await fetchRevues()
  return revues.map((revue) => ({ params: { slug: revue.slug }, props: { revue } }))
}

interface Props {
  revue: RevueDoc
}

const { revue } = Astro.props as Props
---
<Layout title={revue.titre}>
  <h1>{revue.titre}</h1>
  <p>{revue.editeur} — {revue.numero}</p>
  {revue.decennieLabel && <p>Période estimée : {revue.decennieLabel}</p>}
  {revue.couvertureUrl && <img src={revue.couvertureUrl} alt={revue.titre} width="300" />}
  <div>
    {revue.apercuPagesUrls.map((url) => (
      <img src={url} alt="Aperçu de page" width="300" />
    ))}
  </div>
  {revue.statutDroits === 'domaine-public' && revue.urlScanComplet && (
    <a href={revue.urlScanComplet} download>Télécharger la revue complète</a>
  )}
</Layout>
```

- [ ] **Step 3: Vérifier le build**

Run: `npm run build`
Expected: build réussi (les pages de détail se génèrent même sans documents en base — tableau vide toléré).

- [ ] **Step 4: Commit**

```bash
git add src/pages/revues
git commit -m "feat: add revue listing and detail pages"
```

---

## Task 11: Page "Dater un patron"

**Files:**
- Create: `src/pages/dater-un-patron/index.astro`

**Interfaces:**
- Consumes: `fetchPochettesPatron` (Task 5), `buildCatalog` (Task 6), `CatalogBrowser` (Task 9), `Layout` (Task 8)

- [ ] **Step 1: Créer `src/pages/dater-un-patron/index.astro`**

```astro
---
import Layout from '../../layouts/Layout.astro'
import CatalogBrowser from '../../components/CatalogBrowser.astro'
import { fetchPochettesPatron } from '../../lib/sanity'
import { buildCatalog } from '../../lib/catalog'

const pochettes = await fetchPochettesPatron()
const entries = buildCatalog([], pochettes, [])
---
<Layout title="Dater un patron">
  <h1>Dater un patron</h1>
  <p>Comparez votre patron aux pochettes de référence ci-dessous pour estimer sa période.</p>
  <CatalogBrowser entries={entries} showMarqueFilter showCaracteristiquesFilter />
</Layout>
```

*Note de portée : aucune page de détail individuelle n'est prévue pour les Pochettes de patron en V1 — la liste filtrée (image + titre + caractéristiques) suffit à l'usage de comparaison décrit dans la spec. Une page de détail pourra être ajoutée plus tard si le besoin se confirme.*

- [ ] **Step 2: Vérifier le build**

Run: `npm run build`
Expected: build réussi.

- [ ] **Step 3: Commit**

```bash
git add src/pages/dater-un-patron
git commit -m "feat: add pattern dating page"
```

---

## Task 12: Pages "Ressources gratuites"

**Files:**
- Create: `src/pages/ressources-gratuites/index.astro`
- Create: `src/pages/ressources-gratuites/[slug].astro`

**Interfaces:**
- Consumes: `fetchPatronsGratuits` (Task 5), `buildCatalog` (Task 6), `CatalogBrowser` (Task 9), `Layout` (Task 8)

- [ ] **Step 1: Créer `src/pages/ressources-gratuites/index.astro`**

```astro
---
import Layout from '../../layouts/Layout.astro'
import CatalogBrowser from '../../components/CatalogBrowser.astro'
import { fetchPatronsGratuits } from '../../lib/sanity'
import { buildCatalog } from '../../lib/catalog'

const patronsGratuits = await fetchPatronsGratuits()
const entries = buildCatalog([], [], patronsGratuits)
---
<Layout title="Ressources gratuites">
  <h1>Ressources gratuites</h1>
  <CatalogBrowser entries={entries} />
</Layout>
```

- [ ] **Step 2: Créer `src/pages/ressources-gratuites/[slug].astro`**

```astro
---
import Layout from '../../layouts/Layout.astro'
import { fetchPatronsGratuits } from '../../lib/sanity'
import type { PatronGratuitDoc } from '../../lib/sanity'

export async function getStaticPaths() {
  const patronsGratuits = await fetchPatronsGratuits()
  return patronsGratuits.map((patron) => ({ params: { slug: patron.slug }, props: { patron } }))
}

interface Props {
  patron: PatronGratuitDoc
}

const { patron } = Astro.props as Props
---
<Layout title={patron.titre}>
  <h1>{patron.titre}</h1>
  {patron.description && <p>{patron.description}</p>}
  {patron.statutDroits === 'domaine-public' && patron.fichierUrl && (
    <a href={patron.fichierUrl} download>Télécharger le patron</a>
  )}
</Layout>
```

- [ ] **Step 3: Vérifier le build**

Run: `npm run build`
Expected: build réussi.

- [ ] **Step 4: Commit**

```bash
git add src/pages/ressources-gratuites
git commit -m "feat: add free pattern listing and detail pages"
```

---

## Task 13: Contenu de test end-to-end

**Files:** aucun fichier de code — validation fonctionnelle du pipeline complet.

**Interfaces:**
- Consumes: tout ce qui précède (Tasks 1-12)

- [ ] **Step 1: Créer un référentiel de test**

Via MCP (`mcp__Sanity__create_documents`), créer une `categorie` ("couture"), une `decennie` ("années 1950", 1950-1959), une `marque` ("Vogue").

- [ ] **Step 2: Créer une Revue de test**

Créer un document `revue` avec `statutDroits: "domaine-public"`, une image de couverture, et un `urlScanComplet` fictif (ex. URL d'exemple), rattaché à la catégorie et à la décennie créées.

- [ ] **Step 3: Créer une Pochette de patron de test**

Créer un document `pochettePatron` avec une image recto, rattachée à la marque, la catégorie et la décennie, avec 2-3 `caracteristiquesStyle`.

- [ ] **Step 4: Créer un Patron gratuit de test**

Créer un document `patronGratuit` avec `statutDroits: "domaine-public"` et un fichier PDF de test.

- [ ] **Step 5: Vérifier le rendu en local**

Run: `npm run dev`

Naviguer sur `/revues`, `/dater-un-patron`, `/ressources-gratuites` et vérifier que chaque document de test apparaît, que les filtres à facettes fonctionnent, et que le lien de téléchargement n'apparaît que sur la Revue et le Patron gratuit (jamais sur la Pochette de patron).

- [ ] **Step 6: Vérifier le build de production**

Run: `npm run build && npm run preview`
Expected: build réussi, pages de détail (`/revues/<slug>`, `/ressources-gratuites/<slug>`) accessibles et correctement remplies.

- [ ] **Step 7: Nettoyer ou conserver le contenu de test**

Décider avec Aurélia si ce contenu de test reste en ligne (marqué clairement comme exemple) ou doit être supprimé avant la mise en production réelle.

---

## Task 14: Cloudflare R2 pour les scans complets de revues

**Files:**
- Modify: `README.md` (documenter le workflow d'upload)

**Interfaces:**
- Produces: bucket R2 dont les URLs publiques alimentent le champ `urlScanComplet` des documents `revue` (Task 4)

- [ ] **Step 1: Vérifier l'accès Wrangler**

Run: `wrangler whoami`

Si authentifié, passer à l'étape 2. Sinon, transmettre à Aurélia les étapes du dashboard Cloudflare : R2 → Create bucket → nom `revues-vintage-scans` → activer l'accès public (domaine personnalisé ou `r2.dev` public bucket URL).

- [ ] **Step 2: Créer le bucket (si Wrangler authentifié)**

```bash
wrangler r2 bucket create revues-vintage-scans
```

- [ ] **Step 3: Documenter le workflow d'upload dans le README**

```markdown
## Upload d'un scan complet de revue sur R2

wrangler r2 object put revues-vintage-scans/<nom-fichier>.pdf --file=<chemin-local>.pdf

L'URL publique résultante est renseignée dans le champ `urlScanComplet` du document `revue` correspondant.
```

- [ ] **Step 4: Tester l'upload avec le fichier de test (Task 13)**

Run: `wrangler r2 object put revues-vintage-scans/test-scan.pdf --file=<chemin-vers-un-pdf-de-test>`
Expected: upload réussi, URL publique accessible depuis un navigateur.

- [ ] **Step 5: Commit**

```bash
git add README.md
git commit -m "docs: document Cloudflare R2 upload workflow"
```

---

## Task 15: Déploiement Cloudflare Pages

**Files:**
- Modify: `README.md` (documenter la configuration de déploiement)

**Interfaces:** aucune — tâche de configuration d'infrastructure.

- [ ] **Step 1: Documenter la configuration de build dans le README**

```markdown
## Déploiement Cloudflare Pages

- Dépôt : `aboucault/revues-vintage`, branche `master`
- Commande de build : `npm run build`
- Répertoire de sortie : `dist`
- Variables d'environnement à renseigner dans Cloudflare Pages :
  - `SANITY_PROJECT_ID`
  - `SANITY_DATASET` (valeur : `production`)
```

- [ ] **Step 2: Transmettre à Aurélia**

Puisque la connexion du dépôt GitHub à Cloudflare Pages nécessite son compte Cloudflare, transmettre ces informations pour qu'elle configure elle-même le projet dans le dashboard Cloudflare Pages (Aurélia a déjà indiqué vouloir faire cette étape elle-même).

- [ ] **Step 3: Vérifier le premier déploiement**

Une fois Aurélia confirme la configuration terminée, vérifier que l'URL Cloudflare Pages générée affiche correctement les pages `/`, `/revues`, `/dater-un-patron`, `/ressources-gratuites`.

- [ ] **Step 4: Commit**

```bash
git add README.md
git commit -m "docs: document Cloudflare Pages deployment configuration"
```

---

## Task 16: Webhook Sanity → rebuild Cloudflare Pages

**Files:** aucun fichier de code — configuration entre services.

**Interfaces:** aucune — tâche de configuration d'infrastructure.

- [ ] **Step 1: Récupérer le deploy hook Cloudflare Pages**

Une fois le projet Cloudflare Pages créé (Task 15), Aurélia génère un "Deploy Hook" URL depuis les paramètres du projet Cloudflare Pages.

- [ ] **Step 2: Configurer le webhook Sanity**

Configurer un webhook Sanity (déclenché sur publication de document, tous types) pointant vers l'URL du deploy hook Cloudflare Pages.

- [ ] **Step 3: Tester le déclenchement**

Publier ou modifier un document de test (Task 13) et vérifier dans le dashboard Cloudflare Pages qu'un nouveau déploiement démarre automatiquement.
Expected: nouveau build déclenché dans les secondes suivant la publication.

---

## Task 17: Procédure d'ingestion de contenu

**Files:**
- Modify: `README.md` (section "Ajouter du contenu")

**Interfaces:** aucune — documentation de procédure pour Hubert (Claude), pas de code.

- [ ] **Step 1: Documenter la procédure dans le README**

```markdown
## Ajouter du contenu (procédure pour Hubert)

Quand Aurélia transmet des images et informations pour une nouvelle Revue, Pochette de patron ou Patron gratuit :

1. Identifier le type de document (Revue / Pochette de patron / Patron gratuit) selon la description d'Aurélia.
2. Vérifier que les référentiels nécessaires existent déjà (catégorie, marque, décennie) ; en créer de nouveaux via `mcp__Sanity__create_documents` si besoin.
3. Uploader les images légères (couverture, aperçus, recto/verso) directement en assets Sanity.
4. Pour une Revue ou un Patron gratuit destiné au téléchargement :
   - Confirmer avec Aurélia le statut de droits (`domaine-public` uniquement si elle le confirme explicitement).
   - Si domaine public et fichier lourd (scan complet de revue) : uploader sur Cloudflare R2 (voir procédure Task 14), renseigner l'URL publique dans `urlScanComplet`.
   - Si domaine public et fichier léger (patron gratuit, 1-4 pages) : uploader directement comme asset Sanity dans `fichierPatron`.
5. Créer le document via `mcp__Sanity__create_documents` avec tous les champs renseignés.
6. Publier le document.
7. Envoyer à Aurélia un lien de prévisualisation si elle souhaite vérifier avant publication définitive.
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: document the content ingestion procedure for Hubert"
```

---

## Self-Review Notes

- **Couverture de la spec** : sections 2 (architecture), 3 (modèle de contenu), 4 (flux d'ajout), 5 (recherche/datation), 6 (droits d'auteur), et la préparation de la section 7 (évolutivité — schéma Sanity déjà compatible brouillon/publié nativement, aucune tâche dédiée nécessaire au lancement) sont toutes couvertes par au moins une tâche.
- **Cohérence des types** : `CatalogEntry`, `FilterCriteria`, `RevueDoc`, `PochettePatronDoc`, `PatronGratuitDoc` utilisent les mêmes noms de champs dans toutes les tâches qui les consomment (vérifié entre Tasks 5, 6, 7, 9, 10, 11, 12).
- **Règle de droits d'auteur** : testée explicitement dans Task 6 pour les trois types de documents (y compris le cas "Pochette de patron ne doit jamais avoir de téléchargement").
- **Portée** : la Task 11 documente explicitement l'absence de page de détail pour les Pochettes de patron en V1, en cohérence avec la section "Hors périmètre" de la spec.
