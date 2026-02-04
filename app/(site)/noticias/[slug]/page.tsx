import NewsDetailClient from "./NewsDetailClient";
import { getNewsBySlug } from "@/lib/data/news";

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getNewsBySlug(slug);
    // @ts-ignore
    return <NewsDetailClient post={post} />;
}
