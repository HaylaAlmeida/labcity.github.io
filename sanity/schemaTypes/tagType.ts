import { defineField, defineType } from 'sanity'
import { TagIcon } from '@sanity/icons'

export const tagType = defineType({
    name: 'tag',
    title: 'Tag / Tecnologia',
    type: 'document',
    icon: TagIcon,
    fields: [
        defineField({
            name: 'title',
            title: 'Nome',
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
    ],
    preview: {
        select: { title: 'title' },
    },
})
