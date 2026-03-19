import { isSanityEnabled, sanityQuery } from '@/lib/cms/sanity';
import { researchAreas as localAreas } from '@/lib/content';

export type ResearchArea = {
    title: string;
    baseTitle: string;
    code: string;
    icon: string | any;
    description: string;
    order?: number;
};

const TAG = 'researchArea';

export async function getResearchAreas(lang: string = 'pt'): Promise<ResearchArea[]> {
    if (!isSanityEnabled()) return localAreas;

    try {
        const query = `*[_type == "researchArea"] | order(order asc, title.pt asc, title asc) {
      "title": coalesce(title[$lang], title.pt, title, ""),
      "baseTitle": coalesce(title.pt, title, ""),
      code,
      "icon": icon,
      "description": coalesce(description[$lang], description.pt, description, ""),
      order
    }`;

        const items = await sanityQuery<ResearchArea[]>(query, { lang }, { tags: [TAG] });
        return items.length ? items : localAreas;
    } catch (err) {
        console.error('[Sanity] getResearchAreas failed', err);
        return localAreas;
    }
}


export function getResearchAreaSlug(area: ResearchArea): string {
    return (area.baseTitle || area.title || 'area')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
}

export async function getResearchAreaBySlug(slug: string, lang: string = 'pt'): Promise<ResearchArea | null> {
    const areas = await getResearchAreas(lang);
    return areas.find(area => getResearchAreaSlug(area) === slug) || null;
}
