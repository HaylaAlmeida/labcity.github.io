import { defineField, defineType } from 'sanity'

export const researchAreaType = defineType({
    name: 'researchArea',
    title: 'Linha de Pesquisa',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Título',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'code',
            title: 'Código',
            type: 'string',
            description: 'Ex: RES-AMB, RES-SAU',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'icon',
            title: 'Ícone (Lucide ID)',
            type: 'string',
            description: 'Nome do ícone Lucide (ex: Leaf, Activity)',
        }),
        defineField({
            name: 'description',
            title: 'Descrição',
            type: 'text',
            rows: 4,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'projects',
            title: 'Projetos Relacionados',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'project' } }],
        }),
        defineField({
            name: 'order',
            title: 'Ordem',
            type: 'number',
        }),
    ],
})
