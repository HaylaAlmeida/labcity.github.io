import { isSanityEnabled, sanityQuery } from '@/lib/cms/sanity';
import { projects as localProjects } from '@/lib/content';

export interface Partner {
  id: string;
  name: string;
  logo: string;
  url?: string;
  category?: 'support' | 'funding' | 'partner';
}

export type Project = Omit<(typeof localProjects)[number], 'partners'> & {
  partners: (string | Partner)[];
  researchAreas?: { title: string; code: string }[];
  relatedProjects?: { title: string; slug: string }[];
};

const TAG = 'sanity:projects';

export async function getProjects(): Promise<Project[]> {
  if (!isSanityEnabled()) return localProjects;

  try {
    const query = `*[_type == "project" && defined(slug.current)]
      | order(order asc, title asc) {
        "id": coalesce(id, _id),
        "slug": slug.current,
        title,
        category,
        description,
        longDescription,
        "image": coalesce(image.asset->url, imageUrl),
        status,
        "partners": partners[]-> {
          name,
          "logo": logo.asset->url,
          url
        },
        "features": coalesce(features, []),
        "researchAreas": researchAreas[]-> {
          title,
          code
        },
        "relatedProjects": relatedProjects[]-> {
          title,
          "slug": slug.current
        }
      }`;

    const items = await sanityQuery<Project[]>(query, {}, { tags: [TAG], revalidate: 30 });
    console.log('[Sanity] Fetched Projects:', items.length);
    return items.length ? items : localProjects;
  } catch (err) {
    console.error('[Sanity] getProjects failed, falling back to local content', err);
    return localProjects;
  }
}

export async function getProjectSlugs(): Promise<string[]> {
  const items = await getProjects();
  return items.map((p) => p.slug);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!isSanityEnabled()) {
    return localProjects.find((p) => p.slug === slug) ?? null;
  }

  try {
    const query = `*[_type == "project" && slug.current == $slug][0] {
      "id": coalesce(id, _id),
      "slug": slug.current,
      title,
      category,
      description,
      longDescription,
      "image": coalesce(image.asset->url, imageUrl),
      status,
      "partners": partners[]-> {
        name,
        "logo": logo.asset->url,
        url
      },
      "features": coalesce(features, []),
      "researchAreas": researchAreas[]-> {
        title,
        code
      },
      "relatedProjects": relatedProjects[]-> {
        title,
        "slug": slug.current
      }
    }`;

    const item = await sanityQuery<Project | null>(query, { slug }, { tags: [TAG], revalidate: 30 });
    return item || (localProjects.find((p) => p.slug === slug) ?? null);
  } catch (err) {
    console.error('[Sanity] getProjectBySlug failed, falling back to local content', err);
    return localProjects.find((p) => p.slug === slug) ?? null;
  }
}
