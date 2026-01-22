import { notFound } from 'next/navigation';
import { projects } from '@/lib/content';
import { ArrowLeft, CheckCircle2, Users, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { getAssetPath } from '@/lib/utils';

// Generate static params for all known projects so they can be statically optimized
export function generateStaticParams() {
    return projects.map((project) => ({
        id: project.slug,
    }));
}

export default async function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const project = projects.find((p) => p.slug === resolvedParams.id);

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
                                <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
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
                        {project.features && (
                            <div className="mt-12">
                                <h3 className="text-xl font-bold text-foreground mb-6">Principais Funcionalidades</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {project.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800">
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

                        {/* Partners Box */}
                        {project.partners && (
                            <div className="p-6 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
                                <h3 className="flex items-center gap-2 font-bold text-foreground mb-4">
                                    <Users className="w-5 h-5 text-primary" /> Parcerias
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.partners.map((partner) => (
                                        <span key={partner} className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-100 rounded-full shadow-sm">
                                            {partner}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Call to Action */}
                        <div className="p-6 bg-primary border border-primary/20 rounded-xl">
                            <h3 className="font-bold text-white mb-2">Interessado nos resultados?</h3>
                            <p className="text-sm text-blue-50 dark:text-blue-100/90 mb-4">
                                Acesse os relatórios públicos ou entre em contato com nossa equipe.
                            </p>
                            <button className="w-full py-3 bg-white text-primary rounded-lg font-bold text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                                Entrar em Contato <ExternalLink className="w-4 h-4" />
                            </button>
                        </div>

                    </div>

                </div>
            </div>
        </main>
    );
}
