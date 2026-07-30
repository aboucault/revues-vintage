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
