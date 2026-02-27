import NewsDetailClient from "./NewsDetailClient";
import { getNewsBySlug } from "@/lib/data/news";

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string, locale: string }> }) {
    const { slug, locale } = await params;
    const post = await getNewsBySlug(slug, locale);
    // @ts-ignore
    return <NewsDetailClient post={post} />;
}
