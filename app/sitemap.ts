import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://labcity.ufpa.br';

    // Definindo as rotas estáticas principais
    const routes = [
        '',
        '/equipe',
        '/projetos',
        '/publicacoes',
        '/noticias',
        '/pesquisa',
        '/pesquisa/linhas-de-pesquisa',
    ];

    const sitemapEntries: MetadataRoute.Sitemap = [];

    // Para cada rota, criamos a versão em português (padrão) e em inglês (alternativa)
    for (const route of routes) {
        sitemapEntries.push({
            url: `${baseUrl}/pt${route}`,
            lastModified: new Date(),
            changeFrequency: route === '' ? 'weekly' : 'monthly',
            priority: route === '' ? 1 : 0.8,
            alternates: {
                languages: {
                    pt: `${baseUrl}/pt${route}`,
                    en: `${baseUrl}/en${route}`,
                },
            },
        });

        // Adicionando explicitamente a rota em inglês no sitemap principal também
        sitemapEntries.push({
            url: `${baseUrl}/en${route}`,
            lastModified: new Date(),
            changeFrequency: route === '' ? 'weekly' : 'monthly',
            priority: route === '' ? 1 : 0.8,
            alternates: {
                languages: {
                    pt: `${baseUrl}/pt${route}`,
                    en: `${baseUrl}/en${route}`,
                },
            },
        });
    }

    return sitemapEntries;
}
