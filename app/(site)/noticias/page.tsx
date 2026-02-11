import { Suspense } from 'react';
import NewsClient from '@/app/(site)/noticias/NewsClient';
import { getAllNews } from "@/lib/data/news";

export default async function NoticiasPage() {
    const news = await getAllNews();
    return (
        <Suspense>
            <NewsClient news={news} />
        </Suspense>
    );
}
