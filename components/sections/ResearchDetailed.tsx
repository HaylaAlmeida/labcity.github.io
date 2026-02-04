'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import * as LucideIcons from 'lucide-react';
import type { ResearchArea } from '@/lib/data/research';
import { getResearchAreaSlug } from '@/lib/data/research';
import type { Project } from '@/lib/data/projects';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5
        }
    }
};

interface ResearchDetailedProps {
    researchAreas: ResearchArea[];
    projects: Project[];
}

export function ResearchDetailed({ researchAreas, projects }: ResearchDetailedProps) {
    return (
        <section className="py-8">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
                {researchAreas.map((area) => {
                    // Filter projects that reference this research area
                    const relatedProjects = projects.filter(p =>
                        p.researchAreas?.some(ra => ra.title === area.title || ra.code === area.code)
                    );

                    const slug = getResearchAreaSlug(area);

                    // Dynamically get icon
                    const IconComponent = (LucideIcons as any)[area.icon as string] || LucideIcons.HelpCircle;

                    return (
                        <motion.div
                            key={area.title}
                            variants={itemVariants}
                            className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 hover:shadow-2xl hover:border-primary/50 transition-all duration-500 flex flex-col h-full overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-primary/0 group-hover:from-primary/5 group-hover:to-blue-500/5 transition-colors duration-500" />

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700/50 group-hover:bg-primary group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300">
                                        <IconComponent className="w-8 h-8 text-slate-600 dark:text-slate-400 group-hover:text-white transition-colors duration-300" />
                                    </div>
                                    <span className="font-mono text-[10px] font-bold text-slate-400 dark:text-slate-600 border border-slate-100 dark:border-slate-800 px-2 py-1 rounded-md uppercase tracking-wider group-hover:border-primary/30 group-hover:text-primary transition-colors">
                                        {area.code}
                                    </span>
                                </div>

                                <Link href={`/pesquisa/linhas-de-pesquisa/${slug}`} className="block before:absolute before:inset-0 before:z-0 outline-none">
                                    <h3 className="text-2xl font-black mb-3 text-foreground group-hover:text-primary transition-colors tracking-tight">
                                        {area.title}
                                    </h3>
                                </Link>

                                <p className="text-muted-foreground leading-relaxed mb-8 flex-grow pointer-events-none">
                                    {area.description}
                                </p>

                                {relatedProjects.length > 0 && (
                                    <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800/50 relative z-10">
                                        <h4 className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-600 mb-4">
                                            <LucideIcons.Layers className="w-3 h-3" />
                                            Projetos em Destaque
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {relatedProjects.map(project => (
                                                <Link
                                                    key={project.id}
                                                    href={`/projetos/${project.slug}`}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-400 hover:border-primary/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-primary transition-all duration-300"
                                                >
                                                    {project.title}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </section >
    );
}
