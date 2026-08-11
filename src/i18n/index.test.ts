import { describe, expect, it } from 'vitest'
import { useTranslations, getLocaleFromUrl, switchLocalePath } from './index'

describe('useTranslations', () => {
  it('retourne le dictionnaire français pour la locale fr', () => {
    const t = useTranslations('fr')
    expect(t.nav.accueil).toBe('Accueil')
    expect(t.badges.pochettePatron).toBe('Pochette à dater')
  })

  it('retourne le dictionnaire anglais pour la locale en', () => {
    const t = useTranslations('en')
    expect(t.nav.accueil).toBe('Home')
    expect(t.badges.pochettePatron).toBe('Pattern to date')
  })

  it('expose les nouvelles clés de la page de détail générique', () => {
    const t = useTranslations('fr')
    expect(t.detailPage.retourAuxRevues).toBe('Retour aux revues')
    expect(t.detailPage.partage).toBe('Partage')
    expect(t.pochettePatronDetail.marqueLabel).toBe('Marque')
  })

  it('expose les nouvelles clés du catalogue restylé', () => {
    const t = useTranslations('fr')
    expect(t.catalog.reinitialiser).toBe('Réinitialiser les filtres')
    expect(t.catalog.pageIndicateur(2, 5)).toBe('Page 2 / 5')
    expect(t.card.numero('39')).toBe('n°39')

    const en = useTranslations('en')
    expect(en.catalog.reinitialiser).toBe('Reset filters')
    expect(en.catalog.pageIndicateur(2, 5)).toBe('Page 2 of 5')
    expect(en.card.numero('39')).toBe('No. 39')
  })

  it('expose les nouvelles clés de la page Soutenir le projet', () => {
    const t = useTranslations('fr')
    expect(t.nav.soutenirLeProjet).toBe('Soutenir le projet')
    expect(t.pages.soutenirLeProjetTitre).toBe('Soutenir le projet')
    expect(t.pages.soutenirLeProjetParagraphe1).toContain('Derrière chaque revue numérisée')
    expect(t.pages.soutenirLeProjetParagraphe2).toContain('un don m’aide à continuer')
    expect(t.pages.soutenirLeProjetParagraphe3).toBe('Chaque contribution, même petite, compte.')
    expect(t.pages.soutenirLeProjetReseauxTitre).toBe('Me suivre')

    const en = useTranslations('en')
    expect(en.nav.soutenirLeProjet).toBe('Support the project')
    expect(en.pages.soutenirLeProjetTitre).toBe('Support the project')
    expect(en.pages.soutenirLeProjetParagraphe1).toContain('Behind every digitized magazine')
    expect(en.pages.soutenirLeProjetParagraphe2).toContain('a donation helps me keep growing')
    expect(en.pages.soutenirLeProjetParagraphe3).toBe('Every contribution, however small, makes a difference.')
    expect(en.pages.soutenirLeProjetReseauxTitre).toBe('Follow me')
  })

  it('expose les nouvelles clés de la section Contribuer', () => {
    const t = useTranslations('fr')
    expect(t.pages.soutenirLeProjetContribuerTitre).toBe('Contribuer avec vos documents')
    expect(t.pages.soutenirLeProjetContribuerParagraphe).toContain('PDF de patrons')

    const en = useTranslations('en')
    expect(en.pages.soutenirLeProjetContribuerTitre).toBe('Contribute your documents')
    expect(en.pages.soutenirLeProjetContribuerParagraphe).toContain('PDFs of patterns')
  })

  it('expose la clé du bouton Ko-fi sur la home', () => {
    const t = useTranslations('fr')
    expect(t.home.presentationTexte).toContain('Derrière ce site')
    expect(t.home.kofiButtonLabel).toBe('Soutenir sur Ko-fi')
    expect(t.home).not.toHaveProperty('heroButton')
    expect(t.home).not.toHaveProperty('presentationLien')

    const en = useTranslations('en')
    expect(en.home.presentationTexte).toContain('Behind this site')
    expect(en.home.kofiButtonLabel).toBe('Support on Ko-fi')
    expect(en.home).not.toHaveProperty('heroButton')
    expect(en.home).not.toHaveProperty('presentationLien')
  })

  it('expose les libellés des icônes sociales sur la home', () => {
    const t = useTranslations('fr')
    expect(t.home.suivreTiktok).toBe('Suivre sur TikTok')
    expect(t.home.suivreYoutube).toBe('Suivre sur YouTube')

    const en = useTranslations('en')
    expect(en.home.suivreTiktok).toBe('Follow on TikTok')
    expect(en.home.suivreYoutube).toBe('Follow on YouTube')
  })

  it('expose les nouvelles clés du lecteur de patron gratuit lié à une revue', () => {
    const t = useTranslations('fr')
    expect(t.patronGratuitDetail.pageLabel(13)).toBe('Page 13')
    expect(t.patronGratuitDetail.voirDansLaRevue('Le Petit Écho de la Mode')).toBe(
      'Voir dans « Le Petit Écho de la Mode »',
    )

    const en = useTranslations('en')
    expect(en.patronGratuitDetail.pageLabel(13)).toBe('Page 13')
    expect(en.patronGratuitDetail.voirDansLaRevue('Le Petit Écho de la Mode')).toBe(
      'See it in "Le Petit Écho de la Mode"',
    )
  })

  it('expose la clé du bandeau de traduction des instructions', () => {
    const t = useTranslations('fr')
    expect(t.patronGratuitDetail.lireTraductionInstructions).toBe(
      'Voir la traduction anglaise des instructions',
    )

    const en = useTranslations('en')
    expect(en.patronGratuitDetail.lireTraductionInstructions).toBe(
      'Read the English translation of the instructions',
    )
  })

  it('expose les clés de la bannière de consentement cookies', () => {
    const t = useTranslations('fr')
    expect(t.cookieConsent.message).toBe(
      'Nous utilisons des cookies de mesure d’audience pour comprendre comment vous utilisez le site.',
    )
    expect(t.cookieConsent.accept).toBe('Accepter')
    expect(t.cookieConsent.refuse).toBe('Refuser')

    const en = useTranslations('en')
    expect(en.cookieConsent.message).toBe(
      'We use audience measurement cookies to understand how you use the site.',
    )
    expect(en.cookieConsent.accept).toBe('Accept')
    expect(en.cookieConsent.refuse).toBe('Decline')
  })

  it('expose le libellé du bouton de partage natif', () => {
    const t = useTranslations('fr')
    expect(t.detailPage.partagerLabel).toBe('Partager')

    const en = useTranslations('en')
    expect(en.detailPage.partagerLabel).toBe('Share')
  })
})

describe('getLocaleFromUrl', () => {
  it('détecte la locale anglaise sur un chemin préfixé /en/', () => {
    expect(getLocaleFromUrl('/en/revues')).toBe('en')
  })

  it('détecte la locale anglaise sur la racine /en', () => {
    expect(getLocaleFromUrl('/en')).toBe('en')
  })

  it('retourne la locale française par défaut', () => {
    expect(getLocaleFromUrl('/revues')).toBe('fr')
    expect(getLocaleFromUrl('/')).toBe('fr')
  })
})

describe('switchLocalePath', () => {
  it('ajoute le préfixe /en pour basculer vers l’anglais', () => {
    expect(switchLocalePath('/revues', 'en')).toBe('/en/revues')
  })

  it('retire le préfixe /en pour basculer vers le français', () => {
    expect(switchLocalePath('/en/revues', 'fr')).toBe('/revues')
  })

  it('gère la racine dans les deux sens', () => {
    expect(switchLocalePath('/', 'en')).toBe('/en')
    expect(switchLocalePath('/en', 'fr')).toBe('/')
  })
})
