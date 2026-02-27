import { Link } from '@/i18n/routing';
import { BackLink } from '@/components/ui/BackLink';
import { ArrowLeft } from 'lucide-react';
import { ResearchDetailed } from "@/components/sections/ResearchDetailed";
import { getResearchAreas } from "@/lib/data/research";
import { getProjects } from "@/lib/data/projects";
import { getTranslations } from "next-intl/server";
import { Metadata } from 'next';

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'MetadataResearch' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default async function LinhasDePesquisaPage({
    params
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'ResearchLinesPage' });
    const researchAreas = await getResearchAreas(locale);
    const projects = await getProjects(locale);

    return (
        <main className="min-h-screen bg-white dark:bg-slate-950 pt-32 pb-16 relative">

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <BackLink href="/" label={t('backHome')} />
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-4">{t('title')}</h1>
                        <p className="text-lg text-muted-foreground max-w-2xl">
                            {t('description')}
                        </p>
                    </div>
                </div>

                <ResearchDetailed researchAreas={researchAreas} projects={projects} />
            </div>
        </main>
    );
}
