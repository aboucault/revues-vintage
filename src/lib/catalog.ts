import type { PatronGratuitDoc, PochettePatronDoc, RevueDoc } from './sanity'

export type CatalogEntryType = 'revue' | 'pochette-patron' | 'patron-gratuit'

export interface CatalogEntry {
  id: string
  createdAt: string
  type: CatalogEntryType
  titre: string
  slug: string
  categories: string[]
  decennieLabel?: string
  marqueNom?: string
  caracteristiquesStyle: string[]
  imageUrl: string
  telechargementUrl?: string
  dateParution?: string
  numero?: string
  annee?: number
}

export function buildCatalog(
  revues: RevueDoc[],
  pochettes: PochettePatronDoc[],
  patronsGratuits: PatronGratuitDoc[]
): CatalogEntry[] {
  const revueEntries: CatalogEntry[] = revues.map((r) => ({
    id: r._id,
    createdAt: r._createdAt,
    type: 'revue',
    titre: r.titre,
    slug: r.slug,
    categories: r.categories,
    decennieLabel: r.decennieLabel,
    caracteristiquesStyle: [],
    imageUrl: r.couvertureUrl ?? '',
    telechargementUrl: r.statutDroits === 'domaine-public' ? r.urlScanComplet : undefined,
    dateParution: r.dateParution,
    numero: r.numero,
    annee: r.annee,
  }))

  const pochetteEntries: CatalogEntry[] = pochettes.map((p) => ({
    id: p._id,
    createdAt: p._createdAt,
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
    createdAt: p._createdAt,
    type: 'patron-gratuit',
    titre: p.titre,
    slug: p.slug,
    categories: p.categories,
    caracteristiquesStyle: [],
    imageUrl: p.couvertureUrl ?? '',
    telechargementUrl: p.statutDroits === 'domaine-public' ? p.fichierUrl : undefined,
  }))

  return [...revueEntries, ...pochetteEntries, ...patronGratuitEntries]
}

// Les dossiers de pages ne reprennent pas le type au singulier ("revue", "patron-gratuit")
// mais leurs propres noms de route.
export function getEntryPath(entry: CatalogEntry): string | undefined {
  if (entry.type === 'revue') return `/revues/${entry.slug}`
  if (entry.type === 'patron-gratuit') return `/ressources-gratuites/${entry.slug}`
  if (entry.type === 'pochette-patron') return `/patrons/${entry.slug}`
  return undefined
}
