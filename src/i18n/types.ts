export interface Dictionary {
  nav: {
    accueil: string
    revues: string
    daterUnPatron: string
    ressourcesGratuites: string
    droitsAuteur: string
  }
  home: {
    heroTitle: string
    heroSubtitle: string
    heroButton: string
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
    searchLabel: string
    searchPlaceholder: string
    decennie: string
    titreRevue: string
    categorie: string
    marque: string
    caracteristiqueStyle: string
    trierPar: string
    triRecent: string
    triTitreAsc: string
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
    dateParutionLabel: string
    aProposTitre: string
  }
  patronGratuitDetail: {
    telechargerLePatron: string
    categoriesLabel: string
    aProposTitre: string
  }
  pochettePatronDetail: {
    marqueLabel: string
    numeroPatronLabel: string
    categoriesLabel: string
    caracteristiquesLabel: string
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
  }
  pages: {
    daterUnPatronTitre: string
    daterUnPatronIntro: string
    ressourcesGratuitesTitre: string
    revuesTitre: string
    droitsAuteurTitre: string
    droitsAuteurParagraphe1: string
    droitsAuteurParagraphe2: string
  }
  langSwitch: {
    label: string
  }
}
