export interface Dictionary {
  nav: {
    accueil: string
    revues: string
    daterUnPatron: string
    ressourcesGratuites: string
    soutenirLeProjet: string
    droitsAuteur: string
  }
  home: {
    heroTitle: string
    heroSubtitle: string
    presentationTexte: string
    kofiButtonLabel: string
    suivreTiktok: string
    suivreYoutube: string
    facon1Titre: string
    facon1Description: string
    facon1Libelle: string
    facon2Titre: string
    facon2Description: string
    facon2Libelle: string
    facon3Titre: string
    facon3Description: string
    facon3Libelle: string
    derniersAjouts: string
    searchLabel: string
    searchPlaceholder: string
    searchButton: string
  }
  catalog: {
    decennie: string
    typeActivite: string
    titreRevue: string
    categorie: string
    marque: string
    caracteristiqueStyle: string
    rechercherTitrePlaceholder: string
    trierPrefixe: string
    triRecent: string
    triTitreAsc: string
    triTitreDesc: string
    reinitialiser: string
    pagePrecedente: string
    pageSuivante: string
    pageIndicateur: (page: number, total: number) => string
    resultat: (count: number) => string
    emptyState: string
  }
  badges: {
    revue: string
    pochettePatron: string
    patronGratuit: string
  }
  card: {
    telecharger: string
    numero: (numero: string) => string
  }
  revueDetail: {
    telechargerLaRevueComplete: string
    lireEnLigne: string
    ouvrirLePdf: string
    editeurLabel: string
    numeroLabel: string
    periodiciteLabel: string
    langueLabel: string
    categoriesLabel: string
    typeActiviteLabel: string
    dateParutionLabel: string
    aProposTitre: string
  }
  patronGratuitDetail: {
    telechargerLePatron: string
    categoriesLabel: string
    typeActiviteLabel: string
    aProposTitre: string
    pageLabel: (page: number) => string
    voirDansLaRevue: (revueTitre: string) => string
  }
  pochettePatronDetail: {
    marqueLabel: string
    numeroPatronLabel: string
    categoriesLabel: string
    typeActiviteLabel: string
    caracteristiquesLabel: string
    dateLabel: string
    imageRectoAlt: string
    imageVersoAlt: string
  }
  detailPage: {
    retourAuxRevues: string
    retourAuxRessources: string
    retourAuxPatrons: string
    informationsLegales: string
    legalDomainePublic: string
    legalIncertain: string
    legalProtege: string
    partage: string
    copierLeLien: string
    lienCopie: string
    dateCertaine: string
    dateDeduite: string
  }
  pages: {
    daterUnPatronTitre: string
    daterUnPatronIntro: string
    ressourcesGratuitesTitre: string
    revuesTitre: string
    droitsAuteurTitre: string
    droitsAuteurParagraphe1: string
    droitsAuteurParagraphe2: string
    soutenirLeProjetTitre: string
    soutenirLeProjetParagraphe1: string
    soutenirLeProjetParagraphe2: string
    soutenirLeProjetParagraphe3: string
    soutenirLeProjetReseauxTitre: string
    soutenirLeProjetContribuerTitre: string
    soutenirLeProjetContribuerParagraphe: string
  }
  langSwitch: {
    label: string
  }
  cookieConsent: {
    message: string
    accept: string
    refuse: string
  }
}
