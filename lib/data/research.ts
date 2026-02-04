import { isSanityEnabled, sanityQuery } from '@/lib/cms/sanity';
import { researchAreas as localAreas } from '@/lib/content';

export type ResearchArea = {
    title: string;
    code: string;
    icon: string | any;
    description: string;
    order?: number;
};

const TAG = 'sanity:research';

export async function getResearchAreas(): Promise<ResearchArea[]> {
    if (!isSanityEnabled()) return localAreas;

    try {
        const query = `*[_type == "researchArea"] | order(order asc, title asc) {
      title,
      code,
      "icon": icon,
      description,
      order
    }`;

        const items = await sanityQuery<ResearchArea[]>(query, {}, { tags: [TAG], revalidate: 30 });
        return items.length ? items : localAreas;
    } catch (err) {
        console.error('[Sanity] getResearchAreas failed', err);
        return localAreas;
    }
}


export function getResearchAreaSlug(area: ResearchArea): string {
    return area.title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
}

export async function getResearchAreaBySlug(slug: string): Promise<ResearchArea | null> {
    const areas = await getResearchAreas();
    return areas.find(area => getResearchAreaSlug(area) === slug) || null;
}
