import { DocumentTextIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'redirectUrl',
      title: 'Link de Redirecionamento (Externo)',
      type: 'url',
      description: 'Se preenchido, clicar na notícia levará para este link externo ao invés da página interna.',
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: { type: 'person' },
    }),
    defineField({
      name: 'relatedProjects',
      title: 'Projetos Relacionados',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'project' } }],
    }),
    defineField({
      name: 'relatedPublications',
      title: 'Publicacoes Relacionadas',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'publication' } }],
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        })
      ]
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: { type: 'category' } })],
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author && `by ${author}` }
    },
  },
})
