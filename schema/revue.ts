import { defineType, defineField } from 'sanity'

export const revue = defineType({
  name: 'revue',
  title: 'Revue',
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
    defineField({ name: 'editeur', title: 'Éditeur', type: 'string' }),
    defineField({ name: 'numero', title: 'Numéro', type: 'string' }),
    defineField({
      name: 'dateParution',
      title: 'Date de parution exacte',
      type: 'date',
      description: 'Optionnel : si connue, remplace l\'affichage de la décennie dans le titre (la décennie reste affichée en cartouche).',
    }),
    defineField({ name: 'decennie', title: 'Décennie', type: 'reference', to: [{ type: 'decennie' }] }),
    defineField({
      name: 'categories',
      title: 'Catégories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'categorie' }] }],
      validation: (Rule) => Rule.required().min(1),
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
    defineField({ name: 'couverture', title: 'Couverture', type: 'image' }),
    defineField({ name: 'apercuPages', title: 'Aperçu de pages', type: 'array', of: [{ type: 'image' }] }),
    defineField({
      name: 'urlScanComplet',
      title: 'Scan complet',
      type: 'file',
      description: 'Le lien de lecture n\'est affiché publiquement que si statutDroits = domaine-public',
    }),
  ],
})
