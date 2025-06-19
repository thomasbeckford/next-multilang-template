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
      type: 'object',
      fields: [
        { name: 'es', title: 'Español', type: 'string' },
        { name: 'en', title: 'Inglés', type: 'string' },
      ],
    }),

    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'object',
      fields: [
        { name: 'es', title: 'Español', type: 'text' },
        { name: 'en', title: 'Inglés', type: 'text' },
      ],
    }),
  ],
})
