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
      title: 'Nivel',
      type: 'string',
      options: {
        list: [
          { title: 'Coordenacao', value: 'coordinator' },
          { title: 'Doutor', value: 'doctor' },
          { title: 'Mestre', value: 'master' },
          { title: 'Bacharel', value: 'bachelor' },
          { title: 'Graduacao / IC', value: 'undergraduate' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Cargo (coordenacao)',
      type: 'string',
      description: 'Ex: Coordenador(a). Usado principalmente para coordenacao.',
    }),
    defineField({
      name: 'focus',
      title: 'Foco / Area',
      type: 'string',
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
      name: 'order',
      title: 'Ordem',
      type: 'number',
      description: 'Ordenacao ascendente. Use para manter cargos acima e depois alfabetico.',
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
      description: 'Use se voce nao quiser subir a imagem no Sanity.',
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
        coordinator: 'Coordenacao',
        doctor: 'Doutor',
        master: 'Mestre',
        bachelor: 'Bacharel',
        undergraduate: 'Graduacao / IC',
      }
      return {
        title: title || 'Sem nome',
        subtitle: subtitle ? labels[subtitle] || subtitle : undefined,
        media,
      }
    },
  },
})
