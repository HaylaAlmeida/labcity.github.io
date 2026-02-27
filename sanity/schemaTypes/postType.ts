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
      type: 'localeString',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'type',
      title: 'Tipo',
      type: 'string',
      options: {
        list: [
          { title: 'Notícia Interna', value: 'internal' },
          { title: 'Deu na Mídia (Externo)', value: 'external' },
        ],
        layout: 'radio',
      },
      initialValue: 'internal',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'redirectUrl',
      title: 'Link de Redirecionamento (Externo)',
      type: 'url',
      description: 'Se preenchido, clicar na notícia levará para este link externo ao invés da página interna.',
      hidden: ({ parent }) => parent?.type !== 'external',
    }),
    defineField({
      name: 'source',
      title: 'Veículo / Fonte',
      type: 'string',
      description: 'Nome do veículo externo (ex: G1 Pará, Jornal O Liberal)',
      hidden: ({ parent }) => parent?.type !== 'external',
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
      name: 'relatedPosts',
      title: 'Notícias Relacionadas',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'post' } }],
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
          type: 'localeString',
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
      type: 'localeBlockContent',
    }),
  ],
  preview: {
    select: {
      title: 'title.pt',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author && `by ${author}` }
    },
  },
})
