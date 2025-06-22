import { TagIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const contactType = defineType({
  name: 'contact',
  title: 'Página de Contacto',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
