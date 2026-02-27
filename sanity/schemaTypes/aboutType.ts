import { defineField, defineType } from 'sanity'

export const aboutType = defineType({
    name: 'about',
    title: 'Sobre (O que é o LabCity?)',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Título Interno',
            type: 'string',
            initialValue: 'Sobre o LabCity',
            readOnly: true,
        }),
        defineField({
            name: 'gallery',
            title: 'Galeria de Fotos',
            type: 'array',
            of: [
                {
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                    fields: [
                        {
                            name: 'caption',
                            type: 'localeString',
                            title: 'Legenda',
                        },
                        {
                            name: 'alt',
                            type: 'localeString',
                            title: 'Texto Alternativo',
                        }
                    ]
                }
            ],
            options: {
                layout: 'grid',
            }
        }),
    ],
})
