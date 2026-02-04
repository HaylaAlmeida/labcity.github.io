import { notFound } from 'next/navigation';
import { getResearchAreaBySlug, getResearchAreaSlug, getResearchAreas } from '@/lib/data/research';
import { getProjects, Project } from '@/lib/data/projects';
import { getPublicationsByResearchArea, Publication } from '@/lib/data/publications';
import { ArrowLeft, BookOpen, Layers } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import * as LucideIcons from 'lucide-react';
import { getAssetPath } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { SectionAccordion } from '@/components/ui/SectionAccordion';

export async function generateStaticParams() {
    const areas = await getResearchAreas();
    return areas.map(area => ({
        slug: getResearchAreaSlug(area)
    }));
}

export default async function ResearchLinePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const area = await getResearchAreaBySlug(slug);
    if (!area) return notFound();

    // Fetch related content
    const allProjects = await getProjects();
    const relatedProjects = allProjects.filter(p =>
        p.researchAreas?.some(ra => ra.code.toLowerCase() === area.code.toLowerCase())
    );

    const relatedPublications = await getPublicationsByResearchArea(area.code);

    const IconComponent = (LucideIcons as any)[area.icon as string] || LucideIcons.HelpCircle;

    return (
        <main className="min-h-screen bg-white dark:bg-slate-950 pt-32 pb-16">
            <div className="container mx-auto px-4 md:px-6">

                {/* Header */}
                <div className="mb-12">
                    <Link
                        href="/pesquisa/linhas-de-pesquisa"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Voltar para Linhas de Pesquisa
                    </Link>

                    <div className="flex items-start gap-6">
                        <div className="p-4 bg-slate-100 dark:bg-slate-900 rounded-2xl shrink-0">
                            <IconComponent className="w-12 h-12 text-primary stroke-1" />
                        </div>
                        <div>
                            <span className="font-mono text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                                Linha de Pesquisa
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
                            title="Projetos Relacionados"
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
                                <p className="text-muted-foreground italic">Nenhum projeto vinculado a esta linha de pesquisa no momento.</p>
                            )}
                        </SectionAccordion>

                        <SectionAccordion
                            title="Publicações Relacionadas"
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
                                                <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase">
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
                                <p className="text-muted-foreground italic">Nenhuma publicação vinculada a esta linha de pesquisa no momento.</p>
                            )}
                        </SectionAccordion>

                    </div>

                </div>
            </div>
        </main>
    );
}
