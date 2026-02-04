import NewsClient from '@/app/(site)/noticias/NewsClient';
import { getAllNews } from "@/lib/data/news";

export default async function NoticiasPage() {
    const news = await getAllNews();
    return <NewsClient news={news} />;
}
