import { defineField, defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Projeto',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'ID (opcional)',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Titulo',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descricao curta',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'longDescription',
      title: 'Descricao completa',
      type: 'text',
      rows: 12,
    }),
    defineField({
      name: 'partnersLegacy',
      title: 'Parcerias (Texto Antigo)',
      type: 'array',
      of: [{ type: 'string' }],
      hidden: true,
    }),
    defineField({
      name: 'partners',
      title: 'Parcerias',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'partner' } }],
    }),
    defineField({
      name: 'features',
      title: 'Principais funcionalidades',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'order',
      title: 'Ordem',
      type: 'number',
      description: 'Ordenacao ascendente. Use para controlar destaques.',
    }),
    defineField({
      name: 'image',
      title: 'Imagem',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'imageUrl',
      title: 'Imagem (URL alternativa)',
      type: 'url',
    }),
    defineField({
      name: 'team',
      title: 'Equipe',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'person' }] }],
    }),
    defineField({
      name: 'researchAreas',
      title: 'Linhas de Pesquisa',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'researchArea' } }],
    }),
    defineField({
      name: 'relatedProjects',
      title: 'Projetos Relacionados',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'project' } }],
      description: 'Escolha projetos que tenham relação direta com este.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
    },
  },
})
