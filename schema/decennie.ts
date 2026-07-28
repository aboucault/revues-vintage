import { defineType, defineField } from 'sanity'

export const decennie = defineType({
  name: 'decennie',
  title: 'Décennie',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'object',
      fields: [
        defineField({
          name: 'fr',
          title: 'Français',
          type: 'string',
          description: 'Ex: années 1950, 1960-1965',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'en',
          title: 'Anglais',
          type: 'string',
          description: 'Ex: 1950s, 1960-1965',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'anneeDebut', title: 'Année de début', type: 'number', validation: (Rule) => Rule.required() }),
    defineField({ name: 'anneeFin', title: 'Année de fin', type: 'number', validation: (Rule) => Rule.required() }),
  ],
})
