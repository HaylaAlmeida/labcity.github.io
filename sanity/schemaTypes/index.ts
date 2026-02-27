import { type SchemaTypeDefinition } from 'sanity'

import { personType } from './personType'
import { projectType } from './projectType'
import { publicationType } from './publicationType'
import { postType } from './postType'
import { partnerType } from './partnerType'
import { researchAreaType } from './researchAreaType'
import { aboutType } from './aboutType'
import { tagType } from './tagType'

import { categoryType } from './categoryType'
import { blockContentType } from './blockContentType'
import { localeStringType } from './localeStringType'
import { localeTextType } from './localeTextType'
import { localeBlockContentType } from './localeBlockContentType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    localeStringType,
    localeTextType,
    localeBlockContentType,
    personType,
    projectType,
    publicationType,
    postType,
    categoryType,
    blockContentType,
    partnerType,
    researchAreaType,
    aboutType,
    tagType
  ],
}
