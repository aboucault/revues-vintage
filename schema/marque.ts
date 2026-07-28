import { defineType, defineField } from 'sanity'

export const marque = defineType({
  name: 'marque',
  title: 'Marque',
  type: 'document',
  fields: [
    defineField({ name: 'nom', title: 'Nom', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'nom' },
      validation: (Rule) => Rule.required(),
    }),
  ],
})
