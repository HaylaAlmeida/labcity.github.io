import { notFound } from 'next/navigation';
import { contactInfo } from '@/lib/content';
import { ArrowLeft, CheckCircle2, Users, ExternalLink } from 'lucide-react';
import { CopyEmailCTA } from '@/components/ui/CopyEmailCTA';
import Link from 'next/link';
import { getAssetPath } from '@/lib/utils';
import { getProjectBySlug, getProjectSlugs } from '@/lib/data/projects';
import { getPublicationsByProject } from '@/lib/data/publications';
import { getResearchAreaSlug } from '@/lib/data/research';
import * as LucideIcons from 'lucide-react';

// Generate static params for all known projects so they can be statically optimized
export async function generateStaticParams() {
    const slugs = await getProjectSlugs();
    return slugs.map((slug) => ({ id: slug }));
}

export default async function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const project = await getProjectBySlug(resolvedParams.id);
    const relatedPublications = project ? await getPublicationsByProject(project.slug) : [];

    if (!project) {
        return notFound();
    }

    return (
        <main className="min-h-screen bg-white dark:bg-slate-950 pt-24 pb-16">

            {/* Hero Header */}
            <div className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 pb-16 pt-12">
                <div className="container mx-auto px-4 md:px-6">
                    <Link href="/projetos" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Voltar para Projetos
                    </Link>

                    <div className="flex flex-col md:flex-row gap-12 items-start">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-white bg-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    {project.category}
                                </span>
                                <span className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    {project.status}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 tracking-tight">
                                {project.title}
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                                {project.description}
                            </p>
                        </div>

                        {/* Hero Image (Right Side) */}
                        <div className="w-full md:w-1/3 aspect-video bg-slate-200 dark:bg-slate-800 rounded-xl overflow-hidden shadow-2xl rotate-0 hover:rotate-1 transition-transform duration-500">
                            {project.image && <img src={getAssetPath(project.image)} alt={project.title} className="w-full h-full object-cover" />}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 md:px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

                    {/* Main Description */}
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold text-foreground mb-6">Sobre o Projeto</h2>
                        <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-loose">
                            {/* Rendering the long description paragraphs */}
                            {project.longDescription?.split('\n').map((paragraph, i) => (
                                <p key={i} className="mb-4">{paragraph}</p>
                            ))}
                        </div>

                        {/* Features List */}
                        {project.features && project.features.length > 0 && (
                            <div className="mt-12">
                                <h3 className="text-xl font-bold text-foreground mb-6">Principais Funcionalidades</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {project.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800">
                                            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                            <span className="text-sm font-medium text-foreground">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar / Metadata */}
                    <div className="space-y-8">

                        {/* Research Areas */}
                        {project.researchAreas && project.researchAreas.length > 0 && (
                            <div className="p-6 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
                                <h3 className="flex items-center gap-2 font-bold text-foreground mb-4">
                                    <LucideIcons.Microscope className="w-5 h-5 text-primary" /> Linhas de Pesquisa
                                </h3>
                                <div className="flex flex-col gap-2">
                                    {project.researchAreas.map((area, idx) => (
                                        <Link
                                            key={idx}
                                            href={`/pesquisa/linhas-de-pesquisa/${getResearchAreaSlug(area as any)}`}
                                            className="group flex items-center justify-between p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-primary/50 transition-colors"
                                        >
                                            <span className="text-sm font-medium text-slate-700 dark:text-slate-200 group-hover:text-primary transition-colors">
                                                {area.title}
                                            </span>
                                            <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 dark:bg-slate-900 px-1.5 py-0.5 rounded">
                                                {area.code}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Partners Box */}
                        {project.partners && project.partners.length > 0 && (
                            <div className="p-6 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
                                <h3 className="flex items-center gap-2 font-bold text-foreground mb-4">
                                    <Users className="w-5 h-5 text-primary" /> Parcerias
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.partners.map((partner: any, idx: number) => {
                                        const name = typeof partner === 'string' ? partner : partner?.name;
                                        if (!name) return null;
                                        return (
                                            <span
                                                key={`${name}-${idx}`}
                                                className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-100 rounded-full shadow-sm"
                                            >
                                                {name}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Related Projects */}
                        {project.relatedProjects && project.relatedProjects.length > 0 && (
                            <div className="p-6 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
                                <h3 className="flex items-center gap-2 font-bold text-foreground mb-4">
                                    <LucideIcons.Layers className="w-5 h-5 text-primary" /> Projetos Relacionados
                                </h3>
                                <div className="space-y-3">
                                    {project.relatedProjects.map((p, idx) => (
                                        <Link
                                            key={idx}
                                            href={`/projetos/${p.slug}`}
                                            className="block p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-primary/50 transition-colors group"
                                        >
                                            <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                                                {p.title}
                                            </h4>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Related Publications */}
                        {relatedPublications.length > 0 && (
                            <div className="p-6 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
                                <h3 className="flex items-center gap-2 font-bold text-foreground mb-4">
                                    <LucideIcons.BookOpen className="w-5 h-5 text-primary" /> Publicações
                                </h3>
                                <div className="space-y-4">
                                    {relatedPublications.slice(0, 3).map((pub) => (
                                        <Link
                                            key={pub.id}
                                            href={`/publicacoes/${pub.slug}`}
                                            className="block group"
                                        >
                                            <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug mb-1">
                                                {pub.title}
                                            </h4>
                                            <p className="text-xs text-muted-foreground line-clamp-1">
                                                {pub.authors.join(', ')}
                                            </p>
                                        </Link>
                                    ))}
                                    {relatedPublications.length > 3 && (
                                        <Link href="/publicacoes" className="text-xs font-bold text-primary hover:underline block mt-2">
                                            Ver mais...
                                        </Link>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Call to Action */}
                        <div className="p-6 bg-primary border border-primary/20 rounded-xl">
                            <h3 className="font-bold text-white mb-2">Interessado nos resultados?</h3>
                            <p className="text-sm text-blue-50 dark:text-blue-100/90 mb-4">
                                Acesse os relatórios públicos ou entre em contato com nossa equipe.
                            </p>
                            <CopyEmailCTA email={contactInfo.email} />
                        </div>

                    </div>

                </div>
            </div>
        </main>
    );
}
