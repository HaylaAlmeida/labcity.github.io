import { defineType, defineField } from 'sanity';

const supportedLanguages = [
    { id: 'pt', title: 'Português', isDefault: true },
    { id: 'en', title: 'English' }
];

export const localeStringType = defineType({
    title: 'Localized String',
    name: 'localeString',
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
            type: 'string',
            fieldset: lang.isDefault ? undefined : 'translations',
        })
    ))
});
