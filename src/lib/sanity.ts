import { createClient } from '@sanity/client'
import type { Locale } from '../i18n'

export const sanityClient = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID,
  dataset: import.meta.env.SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token: import.meta.env.SANITY_READ_TOKEN,
  // Le site se reconstruit à chaque publication (webhook Sanity → Cloudflare Pages),
  // donc chaque build doit lire l'API en direct plutôt que le CDN mis en cache.
  useCdn: false,
})

export type StatutDroits = 'domaine-public' | 'incertain' | 'protege'

export interface RevueDoc {
  _id: string
  _createdAt: string
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
  _createdAt: string
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
  _createdAt: string
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
  _createdAt,
  titre,
  "slug": slug.current,
  editeur,
  numero,
  "decennieLabel": decennie->label[$locale],
  "categories": categories[]->nom[$locale],
  statutDroits,
  "couvertureUrl": couverture.asset->url,
  "apercuPagesUrls": coalesce(apercuPages[].asset->url, []),
  "urlScanComplet": urlScanComplet.asset->url
}`

export async function fetchRevues(locale: Locale): Promise<RevueDoc[]> {
  return sanityClient.fetch(REVUE_QUERY, { locale })
}

const POCHETTE_QUERY = `*[_type == "pochettePatron"]{
  _id,
  _createdAt,
  titre,
  "slug": slug.current,
  "marqueNom": marque->nom,
  numeroPatron,
  "categories": categories[]->nom[$locale],
  "decennieLabel": decennie->label[$locale],
  "caracteristiquesStyle": coalesce(caracteristiquesStyle, []),
  "imageRectoUrl": imageRecto.asset->url,
  "imageVersoUrl": imageVerso.asset->url
}`

export async function fetchPochettesPatron(locale: Locale): Promise<PochettePatronDoc[]> {
  return sanityClient.fetch(POCHETTE_QUERY, { locale })
}

const PATRON_GRATUIT_QUERY = `*[_type == "patronGratuit"]{
  _id,
  _createdAt,
  titre,
  "slug": slug.current,
  "description": description[$locale],
  "categories": categories[]->nom[$locale],
  "revueSourceSlug": revueSource->slug.current,
  "fichierUrl": fichierPatron.asset->url,
  statutDroits
}`

export async function fetchPatronsGratuits(locale: Locale): Promise<PatronGratuitDoc[]> {
  return sanityClient.fetch(PATRON_GRATUIT_QUERY, { locale })
}
