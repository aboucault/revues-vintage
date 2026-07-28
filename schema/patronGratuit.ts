import { defineType, defineField } from 'sanity'

export const patronGratuit = defineType({
  name: 'patronGratuit',
  title: 'Patron gratuit',
  type: 'document',
  fields: [
    defineField({ name: 'titre', title: 'Titre', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'titre' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({
      name: 'categories',
      title: 'Catégories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'categorie' }] }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({ name: 'revueSource', title: 'Revue source', type: 'reference', to: [{ type: 'revue' }] }),
    defineField({
      name: 'fichierPatron',
      title: 'Fichier patron (PDF)',
      type: 'file',
      validation: (Rule) => Rule.required(),
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
})
