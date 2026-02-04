'use client';

import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { getResearchAreaSlug, ResearchArea } from '@/lib/data/research';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface ResearchProps {
    researchAreas: ResearchArea[];
}

export function Research({ researchAreas }: ResearchProps) {
    return (
        <section id="pesquisa" className="py-24 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
            <div className="container mx-auto px-4 md:px-6">

                <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <span className="font-mono text-xs font-bold text-primary mb-2 block uppercase tracking-wider">
                            Competências Centrais
                        </span>
                        <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4 tracking-tight">
                            Linhas de Pesquisa
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Conheça as principais áreas de atuação e frentes tecnológicas do nosso laboratório.
                        </p>
                    </div>
                    <Link href="/pesquisa/linhas-de-pesquisa" className="flex items-center gap-2 font-mono text-xs font-bold text-primary hover:text-primary/80 transition-colors uppercase tracking-wider">
                        [ Ver Todas as Linhas ] <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="flex flex-wrap border-t border-l border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
                    {researchAreas.map((area, index) => {
                        const IconComponent = (LucideIcons as any)[area.icon as string] || LucideIcons.HelpCircle;
                        const slug = getResearchAreaSlug(area);

                        return (
                            <Link
                                key={area.title}
                                href={`/pesquisa/linhas-de-pesquisa/${slug}`}
                                className="w-full sm:w-1/2 lg:w-1/4 bg-white dark:bg-slate-950 p-8 
                           border-r border-b border-slate-200 dark:border-slate-800 
                           hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors group relative block"
                            >
                                <span className="absolute top-4 right-4 font-mono text-[10px] text-slate-400 group-hover:text-primary">
                                    {area.code}
                                </span>

                                <IconComponent className="w-8 h-8 text-slate-700 dark:text-slate-300 mb-6 stroke-1 group-hover:text-primary" />

                                <h3 className="text-lg font-bold mb-3 text-foreground">{area.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {area.description}
                                </p>
                            </Link>
                        )
                    })}
                </div>

            </div>
        </section>
    );
}
