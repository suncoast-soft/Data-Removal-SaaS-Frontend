import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Frontend App')
    .items([
      S.documentTypeListItem('page').title('Pages'),
      S.listItem()
        .title('Blog')
        .child(
          S.list()
            .title('Blog Management')
            .items([
              S.documentTypeListItem('blogCategory').title('Categories'),
              S.documentTypeListItem('blogPost').title('Blog Posts')
            ])
        ),

      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() !== 'settings' &&
          !['page', 'blogPost', 'blogCategory'].includes(item.getId()!)
      ),

      S.divider(),
      S.documentTypeListItem('settings')
        .title('Global Settings')
        .child(
          S.editor()
            .id('settings')
            .schemaType('settings')
            .documentId('settings')
        )
    ])
