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

export async function getProjects(lang: string = 'pt'): Promise<Project[]> {
  if (!isSanityEnabled()) return localProjects;

  try {
    const query = `*[_type == "project" && defined(slug.current)]
      | order(order asc, title.pt asc) {
        "id": coalesce(id, _id),
        "slug": slug.current,
        "title": coalesce(title[$lang], title.pt, ""),
        "category": coalesce(category[$lang], category.pt, ""),
        "description": coalesce(description[$lang], description.pt, ""),
        "longDescription": coalesce(longDescription[$lang], longDescription.pt, ""),
        "image": coalesce(image.asset->url, imageUrl),
        "status": coalesce(status[$lang], status.pt, ""),
        "partners": partners[]-> {
          "name": coalesce(name[$lang], name.pt, ""),
          "logo": logo.asset->url,
          url
        },
        "features": coalesce(features[], []),
        "researchAreas": researchAreas[]-> {
          "title": coalesce(title[$lang], title.pt, ""),
          code
        },
        "relatedProjects": relatedProjects[]-> {
          "title": coalesce(title[$lang], title.pt, ""),
          "slug": slug.current
        }
      }`;

    const items = await sanityQuery<Project[]>(query, { lang }, { tags: [TAG] });
    console.log('[Sanity] Fetched Projects:', items.length);

    const mappedItems = items.map(item => ({
      ...item,
      features: Array.isArray(item.features)
        ? item.features.map((f: any) => typeof f === 'string' ? f : (f[lang] || f.pt || ''))
        : []
    }));

    return mappedItems.length ? mappedItems : localProjects;
  } catch (err) {
    console.error('[Sanity] getProjects failed, falling back to local content', err);
    return localProjects;
  }
}

export async function getProjectSlugs(): Promise<string[]> {
  const items = await getProjects('pt');
  return items.map((p) => p.slug);
}

export async function getProjectBySlug(slug: string, lang: string = 'pt'): Promise<Project | null> {
  if (!isSanityEnabled()) {
    return localProjects.find((p) => p.slug === slug) ?? null;
  }

  try {
    const query = `*[_type == "project" && slug.current == $slug][0] {
      "id": coalesce(id, _id),
      "slug": slug.current,
      "title": coalesce(title[$lang], title.pt, ""),
      "category": coalesce(category[$lang], category.pt, ""),
      "description": coalesce(description[$lang], description.pt, ""),
      "longDescription": coalesce(longDescription[$lang], longDescription.pt, ""),
      "image": coalesce(image.asset->url, imageUrl),
      "status": coalesce(status[$lang], status.pt, ""),
      "partners": partners[]-> {
        "name": coalesce(name[$lang], name.pt, ""),
        "logo": logo.asset->url,
        url
      },
      "features": coalesce(features[], []),
      "researchAreas": researchAreas[]-> {
        "title": coalesce(title[$lang], title.pt, ""),
        code
      },
      "relatedProjects": relatedProjects[]-> {
        "title": coalesce(title[$lang], title.pt, ""),
        "slug": slug.current
      }
    }`;

    const item = await sanityQuery<Project | null>(query, { slug, lang }, { tags: [TAG] });

    if (item && Array.isArray(item.features)) {
      item.features = item.features.map((f: any) => typeof f === 'string' ? f : (f[lang] || f.pt || ''));
    }

    return item || (localProjects.find((p) => p.slug === slug) ?? null);
  } catch (err) {
    console.error('[Sanity] getProjectBySlug failed, falling back to local content', err);
    return localProjects.find((p) => p.slug === slug) ?? null;
  }
}
