import { Suspense } from 'react';
import NewsClient from '@/app/[locale]/(site)/noticias/NewsClient';
import { getAllNews } from "@/lib/data/news";
import { getTranslations , setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'MetadataNews' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default async function NoticiasPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const news = await getAllNews(locale);
    return (
        <Suspense>
            <NewsClient news={news} />
        </Suspense>
    );
}
