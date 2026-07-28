import { defineType, defineField } from 'sanity'

export const categorie = defineType({
  name: 'categorie',
  title: 'Catégorie',
  type: 'document',
  fields: [
    defineField({
      name: 'nom',
      title: 'Nom',
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
      options: { source: 'nom.fr' },
      validation: (Rule) => Rule.required(),
    }),
  ],
})
