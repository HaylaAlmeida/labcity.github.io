import { defineField, defineType } from 'sanity'

export const publicationType = defineType({
  name: 'publication',
  title: 'Publicacao',
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
      name: 'year',
      title: 'Ano',
      type: 'number',
      validation: (Rule) => Rule.required().min(1900).max(new Date().getFullYear() + 1),
    }),
    defineField({
      name: 'type',
      title: 'Tipo',
      type: 'string',
      options: {
        list: [
          { title: 'Artigo Científico', value: 'article' },
          { title: 'Trabalho de Conclusão de Curso', value: 'tcc' },
          { title: 'Dissertação de Mestrado', value: 'masters_thesis' },
          { title: 'Tese de Doutorado', value: 'doctoral_thesis' },
          { title: 'Registro de Software', value: 'software' },
          { title: 'Patente', value: 'patent' },
          { title: 'Livro', value: 'book' },
          { title: 'Conferência', value: 'conference' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'venue',
      title: 'Veiculo (periodico/conferencia)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'doi',
      title: 'DOI / URL',
      type: 'url',
    }),
    defineField({
      name: 'abstract',
      title: 'Resumo',
      type: 'text',
      rows: 8,
    }),
    defineField({
      name: 'tags',
      title: 'Tecnologias / Tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
    }),
    defineField({
      name: 'authors',
      title: 'Autores (referencias)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'person' }] }],
      description: 'Preferencial: selecione pessoas cadastradas.',
    }),
    defineField({
      name: 'authorsText',
      title: 'Autores (texto alternativo)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Use se voce ainda nao cadastrou as pessoas no CMS.',
    }),
    defineField({
      name: 'researchAreas',
      title: 'Linhas de Pesquisa',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'researchArea' }] }],
    }),
    defineField({
      name: 'relatedProjects',
      title: 'Projetos Relacionados',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      year: 'year',
      type: 'type',
    },
    prepare(selection) {
      const { title, year, type } = selection as { title?: string; year?: number; type?: string }
      const labels: Record<string, string> = {
        article: 'Artigo Científico',
        tcc: 'TCC',
        masters_thesis: 'Mestrado',
        doctoral_thesis: 'Doutorado',
        software: 'Software',
        patent: 'Patente',
        book: 'Livro',
        conference: 'Conferência',
      }
      return {
        title: title || 'Sem titulo',
        subtitle: [year, type ? labels[type] || type : null].filter(Boolean).join(' • '),
      }
    },
  },
})
