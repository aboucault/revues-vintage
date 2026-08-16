import type { Dictionary } from './types'

export const fr: Dictionary = {
  nav: {
    accueil: 'Accueil',
    revues: 'Revues',
    daterUnPatron: 'Dater un patron',
    ressourcesGratuites: 'Ressources gratuites',
    soutenirLeProjet: 'Soutenir le projet',
    droitsAuteur: "Droits d'auteur",
  },
  home: {
    heroTitle: 'Explorez un siècle de mode à la française',
    heroSubtitle:
      'Revues d’époque, pochettes de patrons à dater et patrons gratuits à télécharger. Un patrimoine unique, accessible à tous.',
    presentationTexte:
      'Derrière ce site, il y a une seule personne : moi. Je passe des heures à rechercher, dater et cataloguer ces revues et patrons parfois vieux d’un siècle, pour qu’ils restent accessibles à celles et ceux qui aiment encore coudre à l’ancienne.',
    kofiButtonLabel: 'Soutenir sur Ko-fi',
    suivreTiktok: 'Suivre sur TikTok',
    suivreYoutube: 'Suivre sur YouTube',
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
    decennie: 'Décennie',
    typeActivite: "Type d'activité",
    titreRevue: 'Titre de revue',
    categorie: 'Type de vêtement',
    marque: 'Marque',
    caracteristiqueStyle: 'Caractéristique de style',
    rechercherTitrePlaceholder: 'Rechercher un titre...',
    trierPrefixe: 'Tri :',
    triRecent: 'Plus récents',
    triTitreAsc: 'Titre (A→Z)',
    triTitreDesc: 'Titre (Z→A)',
    reinitialiser: 'Réinitialiser les filtres',
    pagePrecedente: 'Précédent',
    pageSuivante: 'Suivant',
    pageIndicateur: (page: number, total: number) => `Page ${page} / ${total}`,
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
    numero: (numero: string) => `n°${numero}`,
  },
  revueDetail: {
    telechargerLaRevueComplete: 'Télécharger la revue complète',
    lireEnLigne: 'Lire en ligne',
    ouvrirLePdf: 'Ouvrir le PDF',
    editeurLabel: 'Éditeur',
    numeroLabel: 'Numéro',
    periodiciteLabel: 'Périodicité',
    langueLabel: 'Langue',
    categoriesLabel: 'Catégories',
    typeActiviteLabel: "Type d'activité",
    dateParutionLabel: 'Date de parution',
    aProposTitre: 'À propos de cette revue',
  },
  patronGratuitDetail: {
    telechargerLePatron: 'Télécharger le patron',
    categoriesLabel: 'Catégories',
    typeActiviteLabel: "Type d'activité",
    aProposTitre: 'À propos de ce patron',
    pageLabel: (page: number) => `Page ${page}`,
    voirDansLaRevue: (revueTitre: string) => `Voir dans « ${revueTitre} »`,
    lireTraductionInstructions: 'Voir la traduction anglaise des instructions',
  },
  pochettePatronDetail: {
    marqueLabel: 'Marque',
    numeroPatronLabel: 'Numéro de patron',
    categoriesLabel: 'Catégories',
    typeActiviteLabel: "Type d'activité",
    caracteristiquesLabel: 'Caractéristiques de style',
    dateLabel: 'Date',
    imageRectoAlt: 'Recto de la pochette',
    imageVersoAlt: 'Verso de la pochette',
  },
  detailPage: {
    retourAuxRevues: 'Retour aux revues',
    retourAuxRessources: 'Retour aux ressources gratuites',
    retourAuxPatrons: 'Retour à la recherche de patrons',
    informationsLegales: 'Informations légales',
    legalDomainePublic:
      'Ce document est libre de droits. Vous pouvez le consulter et le télécharger librement à des fins personnelles et non commerciales.',
    legalIncertain:
      "Le statut de droits de ce document n'est pas confirmé. Il est présenté ici à titre de référence uniquement.",
    legalProtege:
      "Ce document est protégé par le droit d'auteur. Il est présenté ici à titre de référence uniquement, sans contenu téléchargeable.",
    partage: 'Partage',
    partagerLabel: 'Partager',
    copierLeLien: 'Copier le lien',
    lienCopie: 'Lien copié !',
    dateCertaine: 'Date confirmée',
    dateDeduite: 'Date estimée',
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
    soutenirLeProjetTitre: 'Soutenir le projet',
    soutenirLeProjetParagraphe1:
      'Derrière chaque revue numérisée et chaque patron répertorié sur ce site, il y a des heures de travail : rechercher, dater, cataloguer des revues et des pochettes de patron parfois vieilles de près d’un siècle. Ce travail me demande du temps — des semaines, en réalité — mais aussi de l’argent : chaque revue, chaque patron ajouté à la bibliothèque a un coût, avant même d’être répertorié pour vous.',
    soutenirLeProjetParagraphe2:
      'Si ce site vous est utile, un don m’aide à continuer d’étoffer cette bibliothèque, et à terme, à me lancer dans la numérisation de patrons — pour que davantage de ces trésors de couture ne disparaissent pas dans un tiroir, mais restent accessibles à toutes celles et ceux qui aiment encore coudre à l’ancienne.',
    soutenirLeProjetParagraphe3: 'Chaque contribution, même petite, compte.',
    soutenirLeProjetReseauxTitre: 'Me suivre',
    soutenirLeProjetContribuerTitre: 'Contribuer avec vos documents',
    soutenirLeProjetContribuerParagraphe:
      'Vous avez des PDF de patrons, de revues ou de livres de cours de couture ? Chaque document que vous partagez enrichit le catalogue pour tout le monde.',
  },
  seo: {
    homeTitle: 'Revues vintage gratuites à consulter et patrons anciens à télécharger',
    homeDescription:
      'Revues de mode, couture, tricot et broderie du XXe siècle numérisées, patrons de couture gratuits à télécharger et pochettes de patrons anciens à dater. Une bibliothèque vintage gratuite, mise à jour régulièrement.',
    ressourcesGratuitesTitle: 'Patrons de couture vintage gratuits à télécharger',
    ressourcesGratuitesDescription:
      'Téléchargez gratuitement des patrons de couture, tricot, broderie et crochet issus de revues de mode vintage du domaine public. Tous les patrons sont libres de droits et téléchargeables immédiatement.',
    revuesTitle: 'Revues de mode vintage à consulter — certaines gratuites (domaine public)',
    revuesDescription:
      'Parcourez notre catalogue de revues de mode françaises numérisées, des années 1920 aux années 1960. Les revues du domaine public se feuillettent et se téléchargent gratuitement en PDF.',
    revuesIntro:
      'Certaines revues présentées ici sont dans le domaine public : vous pouvez les feuilleter en ligne et télécharger le PDF complet gratuitement. Repérez-les grâce au bouton « Télécharger la revue complète » sur leur page.',
    daterUnPatronDescription:
      'Comparez votre pochette de patron ancien à notre bibliothèque de référence pour estimer sa décennie, sa marque et son style.',
    droitsAuteurDescription:
      'Statut des droits des revues et patrons publiés sur Les Revues Vintage : domaine public, incertain ou protégé.',
    soutenirLeProjetDescription:
      'Soutenez la numérisation et le catalogage de revues et patrons de couture vintage en faisant un don sur Ko-fi.',
  },
  langSwitch: {
    label: 'English',
  },
  cookieConsent: {
    message:
      'Nous utilisons des cookies de mesure d’audience pour comprendre comment vous utilisez le site.',
    accept: 'Accepter',
    refuse: 'Refuser',
  },
}
