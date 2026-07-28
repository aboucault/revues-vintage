import { defineType, defineField } from 'sanity'

export const pochettePatron = defineType({
  name: 'pochettePatron',
  title: 'Pochette de patron',
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
    defineField({ name: 'marque', title: 'Marque', type: 'reference', to: [{ type: 'marque' }] }),
    defineField({ name: 'numeroPatron', title: 'Numéro de patron', type: 'string' }),
    defineField({
      name: 'categories',
      title: 'Catégories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'categorie' }] }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({ name: 'decennie', title: 'Décennie', type: 'reference', to: [{ type: 'decennie' }] }),
    defineField({
      name: 'caracteristiquesStyle',
      title: 'Caractéristiques de style',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Ex: col claudine, silhouette trapèze, manches ballon',
    }),
    defineField({ name: 'imageRecto', title: 'Image recto', type: 'image', validation: (Rule) => Rule.required() }),
    defineField({ name: 'imageVerso', title: 'Image verso', type: 'image' }),
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
