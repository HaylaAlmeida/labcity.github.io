import { isSanityEnabled, sanityQuery } from '@/lib/cms/sanity';
import { getLocale } from 'next-intl/server';

export interface Partner {
    id: string;
    name: string;
    logo: string;
    url?: string;
    category?: 'support' | 'funding' | 'partner';
}

const TAG = 'sanity:partners';

// Local fallback data
const localPartners: Partner[] = [
    {
        id: '1',
        name: 'CNPq',
        logo: '/images/cnpq-logo.png', // Ensure these paths exist or use placeholders
        category: 'funding',
        url: 'https://www.gov.br/cnpq/pt-br'
    },
    {
        id: '2',
        name: 'CAPES',
        logo: '/images/capes-logo.png',
        category: 'funding',
        url: 'https://www.gov.br/capes/pt-br'
    },
    {
        id: '3',
        name: 'UFPA',
        logo: '/images/ufpa-logo.png',
        category: 'support',
        url: 'https://portal.ufpa.br/'
    }
];

export async function getPartners(localeParam?: string): Promise<Partner[]> {
    if (!isSanityEnabled()) return localPartners;

    try {
        const locale = localeParam || await getLocale();
        const query = `*[_type == "partner"] | order(name.pt asc) {
            "id": coalesce(id, _id),
            "name": coalesce(name[$lang], name.pt, ''),
            "logo": logo.asset->url,
            url,
            category
        }`;

        const items = await sanityQuery<Partner[]>(query, { lang: locale }, { tags: [TAG] });
        console.log('[Sanity] Fetched Partners:', items.length);
        return items.length ? items : localPartners;
    } catch (err) {
        console.error('[Sanity] getPartners failed, falling back to local content', err);
        return localPartners;
    }
}
