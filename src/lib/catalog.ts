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
    imageUrl: '',
    telechargementUrl: p.statutDroits === 'domaine-public' ? p.fichierUrl : undefined,
  }))

  return [...revueEntries, ...pochetteEntries, ...patronGratuitEntries]
}
