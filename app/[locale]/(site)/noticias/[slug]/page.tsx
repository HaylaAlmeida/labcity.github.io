import { setRequestLocale } from 'next-intl/server';
import NewsDetailClient from "./NewsDetailClient";
import { getNewsBySlug, getNewsSlugs } from "@/lib/data/news";

export async function generateStaticParams() {
    const slugs = await getNewsSlugs();
    return slugs.map((slug) => ({ slug }));
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string, locale: string }> }) {
    const { slug, locale } = await params;
    setRequestLocale(locale);
    const post = await getNewsBySlug(slug, locale);
    // @ts-ignore
    return <NewsDetailClient post={post} />;
}
