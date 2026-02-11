import { isSanityEnabled, sanityQuery } from '@/lib/cms/sanity';

export interface NewsPost {
    id: string;
    title: string;
    slug: string;
    type?: 'internal' | 'external';
    redirectUrl?: string;
    source?: string;
    excerpt?: string;
    publishedAt: string;
    image?: string;
    category?: string;
    body?: any;
    author?: {
        name: string;
        role?: string;
        image?: string;
        id?: string;
    };
    relatedProjects?: Array<{
        title: string;
        slug: string;
        image?: string;
    }>;
    relatedPublications?: Array<{
        title: string;
        slug: string;
        year?: number;
        venue?: string;
    }>;
    relatedPosts?: Array<{
        title: string;
        slug: string;
        publishedAt?: string;
    }>;
}

const TAG = 'sanity:posts';

// Fallback data for when Sanity is not connected or empty
const localNews: NewsPost[] = [
    {
        id: '1',
        title: 'LabCity firma parceria estratégica com Secretaria de Meio Ambiente',
        slug: 'parceria-sema',
        type: 'internal',
        excerpt: 'Nova cooperação técnica visa implementar sensores de monitoramento de qualidade do ar em pontos críticos da cidade.',
        publishedAt: new Date().toISOString(),
        category: 'Parcerias',
        author: { name: 'Equipe LabCity' }
    },
    {
        id: '2',
        title: 'Pesquisadores publicam artigo sobre IoT na Amazônia',
        slug: 'artigo-iot-amazonia',
        type: 'internal',
        excerpt: 'Estudo detalha os desafios e soluções para redes de sensores em ambientes de floresta densa e alta umidade.',
        publishedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
        category: 'Publicações',
        author: { name: 'Dr. Renato Francês' }
    },
    {
        id: '3',
        title: 'Início do projeto de Gêmeos Digitais para Mobilidade Urbana',
        slug: 'gemeos-digitais-mobilidade',
        type: 'internal',
        excerpt: 'Projeto utilizará dados de tráfego em tempo real para simular cenários e otimizar o fluxo de veículos.',
        publishedAt: new Date(Date.now() - 86400000 * 12).toISOString(),
        category: 'Projetos',
        author: { name: 'Dra. Jasmine Araújo' }
    },
    {
        id: '4',
        title: 'Pesquisa do LabCity sobre cidades inteligentes é destaque no G1 Pará',
        slug: 'destaque-g1-para',
        type: 'external',
        redirectUrl: 'https://g1.globo.com/pa/para',
        source: 'G1 Pará',
        excerpt: 'Reportagem destaca os avanços do laboratório em tecnologias urbanas sustentáveis.',
        publishedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
        category: 'Destaque',
        author: { name: 'Equipe LabCity' }
    }
];

export async function getRecentNews(limit = 3): Promise<NewsPost[]> {
    if (!isSanityEnabled()) return localNews;

    try {
        const query = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...${limit}] {
      "id": coalesce(id, _id),
      title,
      "slug": slug.current,
      "type": coalesce(type, "internal"),
      redirectUrl,
      source,
      publishedAt,
      "excerpt": coalesce(description, pt::text(body)[0...160] + "..."),
      "image": mainImage.asset->url,
      "category": categories[0]->title,
      "author": author->{name, "image": image.asset->url}
    }`;

        const items = await sanityQuery<NewsPost[]>(query, {}, { tags: [TAG], revalidate: 30 });
        console.log('[Sanity] Fetched Recent News:', items.length);
        return items.length ? items : localNews;
    } catch (err) {
        console.error('[Sanity] getRecentNews failed, falling back to local content', err);
        return localNews;
    }
}

export async function getAllNews(): Promise<NewsPost[]> {
    if (!isSanityEnabled()) return localNews;

    try {
        const query = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
      "id": coalesce(id, _id),
      title,
      "slug": slug.current,
      "type": coalesce(type, "internal"),
      redirectUrl,
      source,
      publishedAt,
      "excerpt": coalesce(description, pt::text(body)[0...160] + "..."),
      "image": mainImage.asset->url,
      "category": categories[0]->title,
      "author": author->{name, "image": image.asset->url}
    }`;

        const items = await sanityQuery<NewsPost[]>(query, {}, { tags: [TAG], revalidate: 30 });
        console.log('[Sanity] Fetched All News:', items.length);
        return items.length ? items : localNews;
    } catch (err) {
        console.error('[Sanity] getAllNews failed, falling back to local content', err);
        return localNews;
    }
}

export async function getNewsBySlug(slug: string): Promise<NewsPost | null> {
    if (!isSanityEnabled()) {
        return localNews.find((p) => p.slug === slug) ?? null;
    }

    try {
        const query = `*[_type == "post" && slug.current == $slug][0] {
      "id": coalesce(id, _id),
      title,
      "slug": slug.current,
      "type": coalesce(type, "internal"),
      redirectUrl,
      source,
      publishedAt,
      "image": mainImage.asset->url,
      "category": categories[0]->title,
      "author": author->{
        name, 
        role, 
        "image": image.asset->url, 
        "id": coalesce(id, _id)
      },
      body,
      "relatedProjects": relatedProjects[]->{
        title, 
        "slug": slug.current,
        "image": image.asset->url
      },
      "relatedPublications": relatedPublications[]->{
        title, 
        "slug": slug.current,
        year,
        venue
      },
      "relatedPosts": relatedPosts[]->{
        title,
        "slug": slug.current,
        publishedAt
      }
    }`;

        const item = await sanityQuery<NewsPost | null>(query, { slug }, { tags: [TAG], revalidate: 30 });
        return item || (localNews.find((p) => p.slug === slug) ?? null);
    } catch (err) {
        console.error('[Sanity] getNewsBySlug failed, falling back to local content', err);
        return localNews.find((p) => p.slug === slug) ?? null;
    }
}
