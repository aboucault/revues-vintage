import type { Dictionary } from './types'

export const fr: Dictionary = {
  nav: {
    accueil: 'Accueil',
    revues: 'Revues',
    daterUnPatron: 'Dater un patron',
    ressourcesGratuites: 'Ressources gratuites',
    droitsAuteur: "Droits d'auteur",
  },
  home: {
    heroTitle: 'Explorez un siècle de mode à la française',
    heroSubtitle:
      'Revues d’époque, pochettes de patrons à dater et patrons gratuits à télécharger. Un patrimoine unique, accessible à tous.',
    heroButton: 'Explorer le catalogue',
    facon1Titre: 'Revues d’époque',
    facon1Description: 'Feuilletez les magazines français numérisés, page par page.',
    facon1Libelle: 'Parcourir les revues',
    facon2Titre: 'Pochettes de patrons à dater',
    facon2Description: 'Identifiez un patron ancien en comparant la pochette, son éditeur et son style.',
    facon2Libelle: 'Rechercher une pochette',
    facon3Titre: 'Patrons gratuits',
    facon3Description: 'Téléchargez des patrons de couture, tricot, broderie ou crochet issus de revues anciennes.',
    facon3Libelle: 'Voir les patrons gratuits',
    derniersAjouts: 'Derniers ajouts',
    searchLabel: 'Que recherchez-vous ?',
    searchPlaceholder: 'Ex : robe portefeuille 1948, tricot...',
    searchButton: 'Rechercher',
  },
  catalog: {
    searchLabel: 'Rechercher',
    searchPlaceholder: 'Ex : robe portefeuille 1948',
    decennie: 'Décennie',
    titreRevue: 'Titre de revue',
    categorie: 'Catégorie',
    marque: 'Marque',
    caracteristiqueStyle: 'Caractéristique de style',
    trierPar: 'Trier par',
    triRecent: 'Plus récents',
    triTitreAsc: 'Titre (A→Z)',
    resultat: (count: number) => `${count} résultat${count > 1 ? 's' : ''}`,
    emptyState: 'Aucun résultat. Essayez de modifier vos filtres ou votre recherche.',
  },
  badges: {
    revue: 'Revue',
    pochettePatron: 'Pochette à dater',
    patronGratuit: 'Patron gratuit',
  },
  card: {
    telecharger: 'Télécharger',
  },
  revueDetail: {
    periodeEstimee: 'Période estimée :',
    apercuAlt: 'Aperçu de page',
    telechargerLaRevueComplete: 'Télécharger la revue complète',
  },
  patronGratuitDetail: {
    telechargerLePatron: 'Télécharger le patron',
  },
  pages: {
    daterUnPatronTitre: 'Dater un patron',
    daterUnPatronIntro: 'Comparez votre patron aux pochettes de référence ci-dessous pour estimer sa période.',
    ressourcesGratuitesTitre: 'Ressources gratuites',
    revuesTitre: 'Consulter une revue vintage',
    droitsAuteurTitre: "Droits d'auteur",
    droitsAuteurParagraphe1:
      "Les revues et patrons proposés en téléchargement complet sur ce site sont dans le domaine public. Les autres documents sont présentés à titre de référence (identification, datation) sans que leur contenu téléchargeable soit mis à disposition.",
    droitsAuteurParagraphe2:
      "Si vous pensez qu'un document publié ici ne devrait pas l'être, contactez-nous et il sera retiré sans délai.",
  },
  langSwitch: {
    label: 'English',
  },
}
