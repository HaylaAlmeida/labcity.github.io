import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('LabCity')
    .items([
      S.documentTypeListItem('person').title('Pessoas'),
      S.documentTypeListItem('project').title('Projetos'),
      S.documentTypeListItem('publication').title('Publicacoes'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['person', 'project', 'publication'].includes(item.getId()!),
      ),
    ])
