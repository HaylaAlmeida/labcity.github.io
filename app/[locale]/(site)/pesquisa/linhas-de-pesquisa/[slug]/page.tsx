import { notFound } from 'next/navigation';
import { getResearchAreaBySlug, getResearchAreaSlug, getResearchAreas } from '@/lib/data/research';
import { getProjects, Project } from '@/lib/data/projects';
import { getPublicationsByResearchArea, Publication } from '@/lib/data/publications';
import { BookOpen, Layers } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { BackLink } from '@/components/ui/BackLink';
import Image from 'next/image';
import * as LucideIcons from 'lucide-react';
import { getAssetPath } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { SectionAccordion } from '@/components/ui/SectionAccordion';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateStaticParams() {
    const areas = await getResearchAreas();
    return areas.map(area => ({
        slug: getResearchAreaSlug(area)
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string, locale: string }> }): Promise<Metadata> {
    const { slug, locale } = await params;
    setRequestLocale(locale);
    const area = await getResearchAreaBySlug(slug, locale);
    if (!area) return {};
    return { title: `${area.title} | LabCity UFPA`, description: area.description };
}

export default async function ResearchLinePage({ params }: { params: Promise<{ slug: string, locale: string }> }) {
    const { slug, locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'ResearchLineSlugPage' });
    const area = await getResearchAreaBySlug(slug, locale);
    if (!area) return notFound();

    // Fetch related content
    const allProjects = await getProjects(locale);
    const relatedProjects = allProjects.filter(p =>
        p.researchAreas?.some(ra => ra.code.toLowerCase() === area.code.toLowerCase())
    );

    const relatedPublications = await getPublicationsByResearchArea(area.code, locale);

    const IconComponent = (LucideIcons as any)[area.icon as string] || LucideIcons.HelpCircle;

    return (
        <main className="min-h-screen bg-white dark:bg-slate-950 pt-32 pb-16">
            <div className="container mx-auto px-4 md:px-6">

                {/* Header */}
                <div className="mb-12">
                    <BackLink href="/pesquisa/linhas-de-pesquisa" label={t('backToList')} />

                    <div className="flex items-start gap-6">
                        <div className="p-4 bg-slate-100 dark:bg-slate-900 rounded-2xl shrink-0">
                            <IconComponent className="w-12 h-12 text-primary stroke-1" />
                        </div>
                        <div>
                            <span className="font-mono text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                                {t('tag')}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-4">
                                {area.title}
                            </h1>
                            <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
                                {area.description}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Left Column: Related Projects */}
                    <div className="lg:col-span-2 space-y-12">

                        <SectionAccordion
                            title={t('relatedProjects')}
                            count={relatedProjects.length}
                            icon={<Layers className="w-5 h-5 text-current" />}
                            defaultOpen={true}
                        >
                            {relatedProjects.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {relatedProjects.map(project => (
                                        <Link
                                            key={project.id}
                                            href={`/projetos/${project.slug}`}
                                            className="group block bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden hover:border-primary/50 transition-all"
                                        >
                                            <div className="relative h-48 w-full overflow-hidden">
                                                <Image
                                                    src={getAssetPath(project.image)}
                                                    alt={project.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                                <div className="absolute bottom-4 left-4 right-4">
                                                    <span className="inline-block px-2 py-1 bg-primary/90 text-[10px] font-bold text-white rounded mb-2 uppercase tracking-wide">
                                                        {project.category}
                                                    </span>
                                                    <h3 className="text-white font-bold leading-tight group-hover:text-primary-foreground transition-colors">
                                                        {project.title}
                                                    </h3>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground italic">{t('noProjects')}</p>
                            )}
                        </SectionAccordion>

                        <SectionAccordion
                            title={t('relatedPublications')}
                            count={relatedPublications.length}
                            icon={<BookOpen className="w-5 h-5 text-current" />}
                            defaultOpen={true}
                        >
                            {relatedPublications.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {relatedPublications.map(publication => (
                                        <Link
                                            key={publication.id}
                                            href={`/publicacoes/${publication.slug}`}
                                            className="block p-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-primary/50 transition-colors group"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-[10px] font-bold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/40 px-2 py-0.5 rounded-full uppercase">
                                                    {publication.year}
                                                </span>
                                                <span className="text-[10px] text-muted-foreground uppercase tracking-wider truncate max-w-[100px]">
                                                    {publication.type}
                                                </span>
                                            </div>
                                            <h4 className="text-sm font-bold text-foreground leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                                {publication.title}
                                            </h4>
                                            <p className="text-xs text-muted-foreground line-clamp-1">
                                                {publication.authors.join(', ')}
                                            </p>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground italic">{t('noPublications')}</p>
                            )}
                        </SectionAccordion>

                    </div>

                </div>
            </div>
        </main>
    );
}
