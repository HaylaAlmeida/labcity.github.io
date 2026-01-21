'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Layers } from 'lucide-react';
import Link from 'next/link';
import { projects } from '@/lib/content';
import { getAssetPath } from '@/lib/utils';

export default function ProjectsPage() {
    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-16">
            <div className="container mx-auto px-4 md:px-6">

                {/* Header */}
                <div className="mb-16">
                    <Link href="/#projetos" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Voltar para Home
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-4">
                        Nossos Projetos
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                        Conheça em detalhes as iniciativas que estão transformando a Amazônia e o Brasil através da tecnologia.
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden hover:shadow-lg hover:border-primary/50 transition-all group flex flex-col"
                        >
                            <div className="h-48 bg-slate-200 dark:bg-slate-800 relative overflow-hidden">
                                {/* Image Placeholder or Actual Image */}
                                {project.image ? (
                                    <img src={getAssetPath(project.image)} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                                        <Layers className="w-12 h-12 opacity-50" />
                                    </div>
                                )}
                                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                                    {project.status}
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-1">
                                <span className="text-xs font-bold text-primary mb-2 uppercase tracking-wide">{project.category}</span>
                                <h3 className="text-xl font-bold text-foreground mb-3">{project.title}</h3>
                                <p className="text-sm text-muted-foreground mb-6 flex-1 line-clamp-3">
                                    {project.description}
                                </p>

                                <Link
                                    href={`/projetos/${project.slug}`}
                                    className="inline-flex items-center gap-2 text-sm font-bold text-foreground hover:text-primary transition-colors mt-auto"
                                >
                                    Ver Detalhes do Projeto <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </main>
    );
}
