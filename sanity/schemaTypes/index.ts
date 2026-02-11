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

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [personType, projectType, publicationType, postType, categoryType, blockContentType, partnerType, researchAreaType, aboutType, tagType],
}
