import { defineType, defineField } from 'sanity'

export const patronGratuit = defineType({
  name: 'patronGratuit',
  title: 'Patron gratuit',
  type: 'document',
  fields: [
    defineField({
      name: 'titre',
      title: 'Titre',
      type: 'object',
      fields: [
        defineField({ name: 'fr', title: 'Français', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'en', title: 'Anglais', type: 'string', validation: (Rule) => Rule.required() }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'titre.fr' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        defineField({ name: 'fr', title: 'Français', type: 'text' }),
        defineField({ name: 'en', title: 'Anglais', type: 'text' }),
      ],
    }),
    defineField({
      name: 'categories',
      title: 'Catégories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'categorie' }] }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({ name: 'revueSource', title: 'Revue source', type: 'reference', to: [{ type: 'revue' }] }),
    defineField({
      name: 'pages',
      title: 'Pages dans la revue source',
      type: 'array',
      of: [{ type: 'number' }],
      description:
        'Numéros de page du patron dans le scan de la revue source (ex. 13, ou 3 et 18 si le modèle continue plus loin dans le numéro). Renseigné seulement si "Revue source" est rempli.',
    }),
    defineField({
      name: 'fichierPatron',
      title: 'Fichier patron (PDF)',
      type: 'file',
      description: 'Optionnel si le patron est déjà couvert par "Revue source" + "Pages". Requis sinon.',
    }),
    defineField({
      name: 'couverture',
      title: 'Couverture (vignette)',
      type: 'image',
      description:
        'Générée automatiquement via `npm run generate-couverture -- <id>` à partir de la première page listée. Ne pas uploader manuellement sauf cas particulier.',
    }),
    defineField({
      name: 'statutDroits',
      title: 'Statut de droits',
      type: 'string',
      options: {
        list: [
          { title: 'Domaine public', value: 'domaine-public' },
          { title: 'Incertain', value: 'incertain' },
          { title: 'Protégé', value: 'protege' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  validation: (Rule) =>
    Rule.custom((doc) => {
      const hasFichier = Boolean((doc as any)?.fichierPatron?.asset)
      const pages = (doc as any)?.pages as number[] | undefined
      const hasRevueLink = Boolean((doc as any)?.revueSource) && Array.isArray(pages) && pages.length > 0
      if (!hasFichier && !hasRevueLink) {
        return 'Il faut soit un fichier PDF autonome, soit une revue source avec au moins une page.'
      }
      return true
    }),
})
