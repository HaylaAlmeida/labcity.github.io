import { notFound } from 'next/navigation';
import { ArrowLeft, BookOpen, Users, ExternalLink, Calendar, Tag, FileText } from 'lucide-react';
import { BackLink } from '@/components/ui/BackLink';
import { getPublicationBySlug, getPublicationSlugs } from '@/lib/data/publications';
import { getTranslations } from 'next-intl/server';

// removed typeLabels as we will use translations

// Generate static params for all known publications so they can be statically optimized
export async function generateStaticParams() {
    const slugs = await getPublicationSlugs();
    return slugs.map((slug) => ({ id: slug }));
}

export default async function PublicationDetailsPage({ params }: { params: Promise<{ id: string, locale: string }> }) {
    const resolvedParams = await params;
    const publication = await getPublicationBySlug(resolvedParams.id, resolvedParams.locale);

    if (!publication) {
        return notFound();
    }
    const tNav = await getTranslations('Navigation');
    const t = await getTranslations('PublicationDetails');
    const tTypes = await getTranslations('PublicationsPage.types');

    return (
        <main className="min-h-screen bg-white dark:bg-slate-950 pt-24 pb-16">

            {/* Hero Header */}
            <div className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 pb-16 pt-12">
                <div className="container mx-auto px-4 md:px-6">
                    <BackLink href="/publicacoes" label={tNav('backToPublications')} />

                    <div className="max-w-4xl">
                        {/* Badges */}
                        <div className="flex items-center gap-3 mb-4 flex-wrap">
                            <span className="text-white bg-primary whitespace-nowrap text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                {publication.year}
                            </span>
                            <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${publication.type === 'journal'
                                ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                                : publication.type === 'conference'
                                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                                    : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
                                }`}>
                                {tTypes(publication.type)}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-6 tracking-tight leading-tight">
                            {publication.title}
                        </h1>

                        {/* Authors */}
                        <div className="flex items-start gap-3 text-lg text-muted-foreground mb-4">
                            <Users className="w-5 h-5 mt-1 shrink-0 text-primary" />
                            <span>{publication.authors.join(', ')}</span>
                        </div>

                        {/* Venue */}
                        <div className="flex items-center gap-3 text-lg text-foreground/80">
                            <BookOpen className="w-5 h-5 shrink-0 text-primary" />
                            <span className="font-semibold">{publication.venue}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 md:px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold text-foreground mb-6">{t('abstract')}</h2>
                        <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-loose">
                            <p className="text-lg">{publication.abstract}</p>
                        </div>

                        {/* Tags Section */}
                        <div className="mt-12">
                            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                                <Tag className="w-5 h-5 text-primary" /> {t('keywords')}
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {publication.tags.filter(Boolean).map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-sm font-semibold text-foreground rounded-full border border-slate-200 dark:border-slate-700"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / Metadata */}
                    <div className="space-y-8">

                        {/* DOI Box */}
                        <div className="p-6 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
                            <h3 className="flex items-center gap-2 font-bold text-foreground mb-4">
                                <FileText className="w-5 h-5 text-primary" /> {t('doi')}
                            </h3>
                            <a
                                href={publication.doi}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-primary hover:underline break-all"
                            >
                                {publication.doi}
                            </a>
                        </div>

                        {/* Metadata Box */}
                        <div className="p-6 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
                            <h3 className="flex items-center gap-2 font-bold text-foreground mb-4">
                                <Calendar className="w-5 h-5 text-primary" /> {t('info')}
                            </h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">{t('year')}</span>
                                    <span className="font-semibold text-foreground">{publication.year}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">{t('type')}</span>
                                    <span className="font-semibold text-foreground">{tTypes(publication.type)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">{t('authors')}</span>
                                    <span className="font-semibold text-foreground">{publication.authors.length}</span>
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="p-6 bg-primary border border-primary/20 rounded-xl">
                            <h3 className="font-bold text-white mb-2">{t('ctaTitle')}</h3>
                            <p className="text-sm text-blue-50 dark:text-blue-100/90 mb-4">
                                {t('ctaDesc')}
                            </p>

                            <a
                                href={publication.doi}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-3 bg-white text-primary rounded-lg font-bold text-sm hover:bg-slate-100 active:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                            >
                                {t('ctaBtn')} <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
