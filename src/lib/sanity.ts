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
export type PrecisionDate = 'certaine' | 'deduite'

const ACTIVITE_LABELS: Record<Locale, Record<string, string>> = {
  fr: { couture: 'Couture', tricot: 'Tricot', crochet: 'Crochet', broderie: 'Broderie', mode: 'Mode' },
  en: { couture: 'Sewing', tricot: 'Knitting', crochet: 'Crochet', broderie: 'Embroidery', mode: 'Fashion' },
}

export function localizeTypeActivite(keys: string[], locale: Locale): string[] {
  return keys.map((key) => ACTIVITE_LABELS[locale][key] ?? key)
}

export interface RevueDoc {
  _id: string
  _createdAt: string
  titre: string
  slug: string
  editeur?: string
  numero?: string
  periodicite?: string
  langue?: string
  description?: string
  annee?: number
  dateParution?: string
  precisionDate?: PrecisionDate
  decennieLabel?: string
  categories: string[]
  typeActivite: string[]
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
  typeActivite: string[]
  decennieLabel?: string
  annee?: number
  dateParution?: string
  precisionDate?: PrecisionDate
  caracteristiquesStyle: string[]
  imageRectoUrl: string
  imageVersoUrl?: string
  statutDroits: StatutDroits
}

export interface PatronGratuitDoc {
  _id: string
  _createdAt: string
  titre: string
  slug: string
  description?: string
  categories: string[]
  typeActivite: string[]
  revueSourceSlug?: string
  revueSourceTitre?: string
  revueSourceStatutDroits?: StatutDroits
  revueSourceCouvertureUrl?: string
  revueSourceNumero?: string
  revueSourceAnnee?: number
  revueSourceDateParution?: string
  revueSourceDecennieLabel?: string
  fichierUrl?: string
  pages?: number[]
  couverturesUrls: string[]
  statutDroits: StatutDroits
  traductionInstructionsEn?: string
}

const REVUE_QUERY = `*[_type == "revue"]{
  _id,
  _createdAt,
  titre,
  "slug": slug.current,
  editeur,
  numero,
  "periodicite": periodicite[$locale],
  "langue": langue[$locale],
  "description": description[$locale],
  annee,
  dateParution,
  precisionDate,
  "decennieLabel": decennie->label[$locale],
  "categories": categories[]->nom[$locale],
  "typeActivite": coalesce(typeActivite, []),
  statutDroits,
  "couvertureUrl": couverture.asset->url,
  "apercuPagesUrls": coalesce(apercuPages[].asset->url, []),
  "urlScanComplet": urlScanComplet.asset->url
}`

export async function fetchRevues(locale: Locale): Promise<RevueDoc[]> {
  const docs = await sanityClient.fetch<RevueDoc[]>(REVUE_QUERY, { locale })
  return docs.map((doc) => ({ ...doc, typeActivite: localizeTypeActivite(doc.typeActivite, locale) }))
}

const POCHETTE_QUERY = `*[_type == "pochettePatron"]{
  _id,
  _createdAt,
  titre,
  "slug": slug.current,
  "marqueNom": marque->nom,
  numeroPatron,
  "categories": categories[]->nom[$locale],
  "typeActivite": coalesce(typeActivite, []),
  "decennieLabel": decennie->label[$locale],
  annee,
  dateParution,
  precisionDate,
  "caracteristiquesStyle": coalesce(caracteristiquesStyle, []),
  "imageRectoUrl": imageRecto.asset->url,
  "imageVersoUrl": imageVerso.asset->url,
  statutDroits
}`

export async function fetchPochettesPatron(locale: Locale): Promise<PochettePatronDoc[]> {
  const docs = await sanityClient.fetch<PochettePatronDoc[]>(POCHETTE_QUERY, { locale })
  return docs.map((doc) => ({ ...doc, typeActivite: localizeTypeActivite(doc.typeActivite, locale) }))
}

const PATRON_GRATUIT_QUERY = `*[_type == "patronGratuit"]{
  _id,
  _createdAt,
  "titre": titre[$locale],
  "slug": slug.current,
  "description": description[$locale],
  "categories": categories[]->nom[$locale],
  "typeActivite": coalesce(typeActivite, []),
  "revueSourceSlug": revueSource->slug.current,
  "revueSourceTitre": revueSource->titre,
  "revueSourceStatutDroits": revueSource->statutDroits,
  "revueSourceCouvertureUrl": revueSource->couverture.asset->url,
  "revueSourceNumero": revueSource->numero,
  "revueSourceAnnee": revueSource->annee,
  "revueSourceDateParution": revueSource->dateParution,
  "revueSourceDecennieLabel": revueSource->decennie->label[$locale],
  "fichierUrl": fichierPatron.asset->url,
  pages,
  "couverturesUrls": coalesce(couvertures[].asset->url, []),
  statutDroits,
  "traductionInstructionsEn": traductionInstructions.en
}`

export async function fetchPatronsGratuits(locale: Locale): Promise<PatronGratuitDoc[]> {
  const docs = await sanityClient.fetch<PatronGratuitDoc[]>(PATRON_GRATUIT_QUERY, { locale })
  return docs.map((doc) => ({ ...doc, typeActivite: localizeTypeActivite(doc.typeActivite, locale) }))
}
