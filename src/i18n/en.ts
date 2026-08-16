import type { Dictionary } from './types'

export const en: Dictionary = {
  nav: {
    accueil: 'Home',
    revues: 'Magazines',
    daterUnPatron: 'Date a Pattern',
    ressourcesGratuites: 'Free Resources',
    soutenirLeProjet: 'Support the project',
    droitsAuteur: 'Copyright',
  },
  home: {
    heroTitle: 'Explore a century of French fashion',
    heroSubtitle:
      'Vintage magazines, pattern envelopes to date, and free patterns to download. A unique heritage, accessible to everyone.',
    presentationTexte:
      'Behind this site, there’s just one person: me. I spend hours researching, dating, and cataloguing these magazines and patterns, some of them nearly a century old, so they stay accessible to everyone who still loves sewing the old-fashioned way.',
    kofiButtonLabel: 'Support on Ko-fi',
    suivreTiktok: 'Follow on TikTok',
    suivreYoutube: 'Follow on YouTube',
    facon1Titre: 'Vintage Magazines',
    facon1Description: 'Browse digitized French magazines, page by page.',
    facon1Libelle: 'Browse the magazines',
    facon2Titre: 'Date a Pattern',
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
    decennie: 'Decade',
    typeActivite: 'Activity type',
    titreRevue: 'Magazine title',
    categorie: 'Clothing type',
    marque: 'Brand',
    caracteristiqueStyle: 'Style feature',
    rechercherTitrePlaceholder: 'Search a title...',
    trierPrefixe: 'Sort:',
    triRecent: 'Most recent',
    triTitreAsc: 'Title (A→Z)',
    triTitreDesc: 'Title (Z→A)',
    reinitialiser: 'Reset filters',
    pagePrecedente: 'Previous',
    pageSuivante: 'Next',
    pageIndicateur: (page: number, total: number) => `Page ${page} of ${total}`,
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
    numero: (numero: string) => `No. ${numero}`,
  },
  revueDetail: {
    telechargerLaRevueComplete: 'Download the full magazine',
    lireEnLigne: 'Read online',
    ouvrirLePdf: 'Open the PDF',
    editeurLabel: 'Publisher',
    numeroLabel: 'Issue number',
    periodiciteLabel: 'Frequency',
    langueLabel: 'Language',
    categoriesLabel: 'Categories',
    typeActiviteLabel: 'Activity type',
    dateParutionLabel: 'Publication date',
    aProposTitre: 'About this magazine',
  },
  patronGratuitDetail: {
    telechargerLePatron: 'Download the pattern',
    categoriesLabel: 'Categories',
    typeActiviteLabel: 'Activity type',
    aProposTitre: 'About this pattern',
    pageLabel: (page: number) => `Page ${page}`,
    voirDansLaRevue: (revueTitre: string) => `See it in "${revueTitre}"`,
    lireTraductionInstructions: 'Read the English translation of the instructions',
  },
  pochettePatronDetail: {
    marqueLabel: 'Brand',
    numeroPatronLabel: 'Pattern number',
    categoriesLabel: 'Categories',
    typeActiviteLabel: 'Activity type',
    caracteristiquesLabel: 'Style features',
    dateLabel: 'Date',
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
    partagerLabel: 'Share',
    copierLeLien: 'Copy link',
    lienCopie: 'Link copied!',
    dateCertaine: 'Confirmed date',
    dateDeduite: 'Estimated date',
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
    soutenirLeProjetTitre: 'Support the project',
    soutenirLeProjetParagraphe1:
      'Behind every digitized magazine and every pattern catalogued on this site lies hours of work: researching, dating, and cataloguing magazines and pattern envelopes that are sometimes nearly a century old. This work takes time — weeks, in fact — but also money: every magazine, every pattern added to the library comes at a cost, even before it’s catalogued for you.',
    soutenirLeProjetParagraphe2:
      'If this site is useful to you, a donation helps me keep growing this library, and eventually take on digitizing patterns myself — so more of these sewing treasures don’t stay hidden in a drawer, but remain accessible to everyone who still loves sewing the old-fashioned way.',
    soutenirLeProjetParagraphe3: 'Every contribution, however small, makes a difference.',
    soutenirLeProjetReseauxTitre: 'Follow me',
    soutenirLeProjetContribuerTitre: 'Contribute your documents',
    soutenirLeProjetContribuerParagraphe:
      'Have PDFs of patterns, magazines, or sewing course books? Every document you share enriches the catalog for everyone.',
  },
  seo: {
    homeTitle: 'Free Vintage Magazines to Browse & Vintage Sewing Patterns to Download',
    homeDescription:
      'Digitized 20th-century French fashion, sewing, knitting and embroidery magazines, free vintage sewing patterns to download, and vintage pattern envelopes to date. A free vintage library, updated regularly.',
    ressourcesGratuitesTitle: 'Free Vintage Sewing Patterns to Download',
    ressourcesGratuitesDescription:
      'Download free sewing, knitting, embroidery and crochet patterns sourced from public-domain vintage fashion magazines. Every pattern is rights-free and available for immediate download.',
    revuesTitle: 'Browse Vintage Fashion Magazines — Some Free (Public Domain)',
    revuesDescription:
      'Browse our catalog of digitized French fashion magazines, from the 1920s to the 1960s. Public-domain issues can be read and downloaded for free as a PDF.',
    revuesIntro:
      'Some magazines featured here are in the public domain: you can read them online and download the full PDF for free. Look for the "Download the full magazine" button on their page.',
    daterUnPatronDescription:
      'Compare your vintage pattern envelope to our reference library to estimate its decade, brand, and style.',
    droitsAuteurDescription:
      'Rights status of the magazines and patterns published on Revues Vintage: public domain, uncertain, or copyrighted.',
    soutenirLeProjetDescription:
      'Support the digitization and cataloguing of vintage magazines and sewing patterns with a donation on Ko-fi.',
  },
  langSwitch: {
    label: 'Français',
  },
  cookieConsent: {
    message: 'We use audience measurement cookies to understand how you use the site.',
    accept: 'Accept',
    refuse: 'Decline',
  },
}
