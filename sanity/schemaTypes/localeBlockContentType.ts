import { defineType, defineField } from 'sanity';

const supportedLanguages = [
    { id: 'pt', title: 'Português', isDefault: true },
    { id: 'en', title: 'English' }
];

export const localeBlockContentType = defineType({
    title: 'Localized Block Content',
    name: 'localeBlockContent',
    type: 'object',
    fieldsets: [
        {
            title: 'Translations',
            name: 'translations',
            options: { collapsible: true, collapsed: false }
        }
    ],
    fields: supportedLanguages.map(lang => (
        defineField({
            title: lang.title,
            name: lang.id,
            type: 'blockContent',
            fieldset: lang.isDefault ? undefined : 'translations',
        })
    ))
});
