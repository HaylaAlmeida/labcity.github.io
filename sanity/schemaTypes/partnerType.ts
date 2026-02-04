import { defineField, defineType } from 'sanity'

export const partnerType = defineType({
    name: 'partner',
    title: 'Parceiro',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Nome',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'logo',
            title: 'Logo',
            type: 'image',
            options: { hotspot: true },
            validation: (Rule) => Rule.required(),
            fields: [
                defineField({
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative text',
                })
            ]
        }),
        defineField({
            name: 'url',
            title: 'Site / URL',
            type: 'url',
        }),
        defineField({
            name: 'category',
            title: 'Categoria',
            type: 'string',
            options: {
                list: [
                    { title: 'Apoio', value: 'support' },
                    { title: 'Fomento', value: 'funding' },
                    { title: 'Parceiro', value: 'partner' },
                ],
            }
        }),
    ],
    preview: {
        select: {
            title: 'name',
            media: 'logo',
        },
    },
})
