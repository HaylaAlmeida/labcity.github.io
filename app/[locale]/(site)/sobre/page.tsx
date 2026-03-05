import { Link } from '@/i18n/routing';
import { BackLink } from '@/components/ui/BackLink';
import { ArrowLeft, Target, Cpu, Users, Globe } from 'lucide-react';
import { StatsSection } from "@/components/about/StatsSection";
import { getTranslations , setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';

import { sanityQuery, isSanityEnabled } from '@/lib/cms/sanity';
import { GallerySection } from "@/components/about/GallerySection";

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'MetadataSobre' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

async function getAboutData() {
    if (!isSanityEnabled()) return null;
    const query = `*[_type == "about"][0] {
        gallery
    }`;
    return await sanityQuery<any>(query, {}, { tags: ['about'] });
}

export default async function SobrePage({
    params
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'SobrePage' });
    const aboutData = await getAboutData();

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-16">
            <div className="container mx-auto px-4 md:px-6">

                {/* Header Section - Standardized */}
                <div className="mb-16">
                    <BackLink href="/" label={t('backHome')} />
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-4">
                        {t('title')}
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                        {t('description')}
                    </p>
                </div>

                {/* Main Content */}
                <div
                    className="prose prose-slate dark:prose-invert max-w-none"
                >
                    {/* Mission & History Section - Clean Typography */}
                    {/* Mission & History Section - Clean Typography */}
                    {/* Mission & History Section - Balanced Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-24 pb-16 items-start">
                        {/* History - Vertical Timeline (Left) */}
                        <div className="flex flex-col justify-center">
                            <h2 className="text-3xl font-bold mb-8 text-foreground tracking-tight">{t('journeyTitle')}</h2>
                            <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-3 space-y-12 pb-2">
                                {/* Timeline Item 1 */}
                                <div className="relative pl-8">
                                    <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-800 border-4 border-white dark:border-slate-950 shadow-sm" />
                                    <h3 className="text-lg font-bold text-foreground mb-3">{t('journey1Title')}</h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                                        {t('journey1Desc')}
                                    </p>
                                </div>
                                {/* Timeline Item 2 */}
                                <div className="relative pl-8">
                                    <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-primary border-4 border-white dark:border-slate-950 shadow-sm" />
                                    <h3 className="text-lg font-bold text-foreground mb-3">{t('journey2Title')}</h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                                        {t('journey2Desc')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Gallery Slider (Right) */}
                        <div className="flex flex-col justify-center h-full">
                            <GallerySection images={aboutData?.gallery} />
                        </div>

                    </div>

                    {/* Impact Stats - Social Proof */}
                    <StatsSection />

                    {/* Features - Professional Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16 mb-24">
                        {/* Feature 1 */}
                        <div className="flex flex-col items-start">
                            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg mb-6">
                                <Cpu className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-foreground">{t('techTitle')}</h3>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {t('techDesc')}
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="flex flex-col items-start">
                            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg mb-6">
                                <Globe className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-foreground">{t('regionalTitle')}</h3>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {t('regionalDesc')}
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="flex flex-col items-start">
                            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg mb-6">
                                <Users className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-foreground">{t('talentTitle')}</h3>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {t('talentDesc')}
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="flex flex-col items-start">
                            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg mb-6">
                                <Target className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-foreground">{t('socialTitle')}</h3>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {t('socialDesc')}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
