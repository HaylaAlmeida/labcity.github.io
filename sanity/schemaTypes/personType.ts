import { defineField, defineType } from 'sanity'

export const personType = defineType({
  name: 'person',
  title: 'Pessoa',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'ID (opcional)',
      type: 'string',
      description: 'Identificador externo (se voce quiser manter um ID proprio).',
    }),
    defineField({
      name: 'name',
      title: 'Nome',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'level',
      title: 'Função',
      type: 'string',
      options: {
        list: [
          { title: 'Coordenação', value: 'coordinator' },
          { title: 'Pesquisador', value: 'researcher' },
          { title: 'Doutorado', value: 'phd' },
          { title: 'Mestrado', value: 'masters' },
          { title: 'Graduado', value: 'graduates' },
          { title: 'Iniciação Científica', value: 'ic' },
          { title: 'Bolsista de Desenvolvimento', value: 'dev_fellow' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Cargo (coordenação)',
      type: 'string',
      description: 'Ex: Coordenador(a). Usado principalmente para coordenação.',
    }),
    defineField({
      name: 'focus',
      title: 'Foco / Área',
      type: 'localeString',
    }),
    defineField({
      name: 'lattes',
      title: 'Lattes',
      type: 'url',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn',
      type: 'url',
    }),
    defineField({
      name: 'specialties',
      title: 'Especialidades',
      type: 'array',
      of: [{ type: 'localeString' }],
      description: 'Opcional. Lista de especialidades do membro.',
    }),
    defineField({
      name: 'bio',
      title: 'Breve Descrição',
      type: 'localeText',
      description: 'Opcional. Uma breve descrição sobre o membro.',
    }),
    defineField({
      name: 'order',
      title: 'Ordem',
      type: 'number',
      description: 'Ordenação ascendente. Use para manter cargos acima e depois alfabético.',
    }),
    defineField({
      name: 'image',
      title: 'Foto',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'imageUrl',
      title: 'Foto (URL alternativa)',
      type: 'url',
      description: 'Use se você não quiser subir a imagem no Sanity.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'level',
      media: 'image',
    },
    prepare(selection) {
      const { title, subtitle, media } = selection as { title?: string; subtitle?: string; media?: any }
      const labels: Record<string, string> = {
        coordinator: 'Coordenação',
        researcher: 'Pesquisador',
        phd: 'Doutorado',
        masters: 'Mestrado',
        graduates: 'Graduado',
        ic: 'Iniciação Científica',
        dev_fellow: 'Bolsista de Desenvolvimento',
      }
      return {
        title: title || 'Sem nome',
        subtitle: subtitle ? labels[subtitle] || subtitle : undefined,
        media,
      }
    },
  },
})
