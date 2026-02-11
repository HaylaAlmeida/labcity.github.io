import { isSanityEnabled, sanityQuery } from '@/lib/cms/sanity';
import { publications as localPublications, type Publication as LocalPublication } from '@/lib/content';

export type Publication = LocalPublication & {
  researchAreas?: { title: string; code: string }[];
};

const TAG = 'sanity:publications';

export async function getPublications(): Promise<Publication[]> {
  if (!isSanityEnabled()) return localPublications;

  try {
    const query = `*[_type == "publication" && defined(slug.current)]
      | order(year desc, title asc) {
        "id": coalesce(id, _id),
        "slug": slug.current,
        title,
        "authors": coalesce(authors[]->name, authorsText, []),
        venue,
        year,
        type,
        doi,
        abstract,
        "tags": coalesce(tags[]->title, []),
        "researchAreas": researchAreas[]-> {
            title,
            code
        }
      }`;

    const items = await sanityQuery<Publication[]>(query, {}, { tags: [TAG], revalidate: 30 });
    console.log('[Sanity] Fetched Publications:', items.length);
    return items.length ? items : localPublications;
  } catch (err) {
    console.error('[Sanity] getPublications failed, falling back to local content', err);
    return localPublications;
  }
}

export async function getPublicationsByResearchArea(areaCode: string): Promise<Publication[]> {
  const allPubs = await getPublications();
  // Filter by tags or linked research areas match the area code (case-insensitive)
  return allPubs.filter(pub =>
    pub.tags?.some(tag => tag.toLowerCase() === areaCode.toLowerCase()) ||
    pub.researchAreas?.some(area => area.code.toLowerCase() === areaCode.toLowerCase())
  );
}

export async function getPublicationsByProject(projectSlug: string): Promise<Publication[]> {
  if (!isSanityEnabled()) return [];

  try {
    const query = `*[_type == "publication" && references(*[_type == "project" && slug.current == $projectSlug]._id)] {
            "id": coalesce(id, _id),
            "slug": slug.current,
            title,
            "authors": coalesce(authors[]->name, authorsText, []),
            venue,
            year,
            type,
            doi,
            abstract,
            "tags": coalesce(tags[]->title, []),
            "researchAreas": researchAreas[]-> {
                title,
                code
            }
        }`;
    return await sanityQuery<Publication[]>(query, { projectSlug }, { tags: [TAG], revalidate: 30 });
  } catch (err) {
    console.error('[Sanity] getPublicationsByProject failed', err);
    return [];
  }
}

export async function getPublicationSlugs(): Promise<string[]> {
  const pubs = await getPublications();
  return pubs.map((p) => p.slug);
}

export async function getPublicationBySlug(slug: string): Promise<Publication | null> {
  if (!isSanityEnabled()) {
    return localPublications.find((p) => p.slug === slug) ?? null;
  }

  try {
    const query = `*[_type == "publication" && slug.current == $slug][0] {
      "id": coalesce(id, _id),
      "slug": slug.current,
      title,
      "authors": coalesce(authors[]->name, authorsText, []),
      venue,
      year,
      type,
      doi,
      abstract,
      "tags": coalesce(tags[]->title, [])
    }`;

    const item = await sanityQuery<Publication | null>(query, { slug }, { tags: [TAG], revalidate: 30 });
    return item || (localPublications.find((p) => p.slug === slug) ?? null);
  } catch (err) {
    console.error('[Sanity] getPublicationBySlug failed, falling back to local content', err);
    return localPublications.find((p) => p.slug === slug) ?? null;
  }
}
