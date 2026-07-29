import type { Dictionary } from './types'

export const en: Dictionary = {
  nav: {
    accueil: 'Home',
    revues: 'Magazines',
    daterUnPatron: 'Date a Pattern',
    ressourcesGratuites: 'Free Resources',
    droitsAuteur: 'Copyright',
  },
  home: {
    heroTitle: 'Explore a century of French fashion',
    heroSubtitle:
      'Vintage magazines, pattern envelopes to date, and free patterns to download. A unique heritage, accessible to everyone.',
    heroButton: 'Explore the catalog',
    facon1Titre: 'Vintage Magazines',
    facon1Description: 'Browse digitized French magazines, page by page.',
    facon1Libelle: 'Browse the magazines',
    facon2Titre: 'Pattern Envelopes to Date',
    facon2Description: 'Identify a vintage pattern by comparing its envelope, publisher, and style.',
    facon2Libelle: 'Search pattern envelopes',
    facon3Titre: 'Free Patterns',
    facon3Description: 'Download sewing, knitting, embroidery, or crochet patterns from vintage magazines.',
    facon3Libelle: 'See the free patterns',
    derniersAjouts: 'Latest additions',
    searchLabel: 'What are you looking for?',
    searchPlaceholder: 'E.g. wrap dress 1948, knitting...',
    searchButton: 'Search',
  },
  catalog: {
    searchLabel: 'Search',
    searchPlaceholder: 'E.g. wrap dress 1948',
    decennie: 'Decade',
    titreRevue: 'Magazine title',
    categorie: 'Category',
    marque: 'Brand',
    caracteristiqueStyle: 'Style feature',
    trierPar: 'Sort by',
    triRecent: 'Most recent',
    triTitreAsc: 'Title (A→Z)',
    resultat: (count: number) => `${count} result${count > 1 ? 's' : ''}`,
    emptyState: 'No results. Try adjusting your filters or your search.',
  },
  badges: {
    revue: 'Magazine',
    pochettePatron: 'Pattern to date',
    patronGratuit: 'Free pattern',
  },
  card: {
    telecharger: 'Download',
  },
  revueDetail: {
    telechargerLaRevueComplete: 'Download the full magazine',
    lireEnLigne: 'Read online',
    ouvrirLePdf: 'Open the PDF',
    editeurLabel: 'Publisher',
    numeroLabel: 'Issue number',
    categoriesLabel: 'Categories',
    dateParutionLabel: 'Publication date',
  },
  patronGratuitDetail: {
    telechargerLePatron: 'Download the pattern',
    categoriesLabel: 'Categories',
    aProposTitre: 'About this pattern',
  },
  pochettePatronDetail: {
    marqueLabel: 'Brand',
    numeroPatronLabel: 'Pattern number',
    categoriesLabel: 'Categories',
    caracteristiquesLabel: 'Style features',
    imageRectoAlt: 'Envelope front',
    imageVersoAlt: 'Envelope back',
  },
  detailPage: {
    retourAuxRevues: 'Back to magazines',
    retourAuxRessources: 'Back to free resources',
    retourAuxPatrons: 'Back to pattern search',
    informationsLegales: 'Legal information',
    legalDomainePublic:
      'This document is in the public domain. You can view and download it freely for personal, non-commercial use.',
    legalIncertain:
      "This document's rights status is unconfirmed. It is presented here for reference purposes only.",
    legalProtege:
      'This document is copyright protected. It is presented here for reference purposes only, with no downloadable content.',
    partage: 'Share',
    copierLeLien: 'Copy link',
    lienCopie: 'Link copied!',
  },
  pages: {
    daterUnPatronTitre: 'Date a Pattern',
    daterUnPatronIntro: 'Compare your pattern to the reference envelopes below to estimate its period.',
    ressourcesGratuitesTitre: 'Free Resources',
    revuesTitre: 'Browse a Vintage Magazine',
    droitsAuteurTitre: 'Copyright',
    droitsAuteurParagraphe1:
      'The magazines and patterns offered as full downloads on this site are in the public domain. Other documents are presented for reference purposes (identification, dating) without their downloadable content being made available.',
    droitsAuteurParagraphe2:
      'If you believe a document published here should not be, please contact us and it will be removed promptly.',
  },
  langSwitch: {
    label: 'Français',
  },
}
