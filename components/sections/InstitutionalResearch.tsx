'use client';

import Link from 'next/link';
import { ArrowRight, Brain, Cpu, Database, Network, HelpCircle } from 'lucide-react';
import type { ResearchArea } from '@/lib/data/research';
import * as LucideIcons from 'lucide-react';

interface InstitutionalResearchProps {
    researchAreas: ResearchArea[];
}

export function InstitutionalResearch({ researchAreas }: InstitutionalResearchProps) {
    return (
        <section id="pesquisa" className="py-24 bg-slate-50 dark:bg-slate-900/50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Linhas de Pesquisa</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl">
                            Nossa atuação científica abrange áreas estratégicas para o desenvolvimento de cidades inteligentes.
                        </p>
                    </div>
                    <Link href="/pesquisa/linhas-de-pesquisa" className="inline-flex items-center gap-2 font-bold text-primary hover:underline">
                        Ver todas as linhas <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 content-center">
                    {researchAreas.slice(0, 3).map((area) => {
                        const IconComponent = (LucideIcons as any)[area.icon as string] || HelpCircle;

                        return (
                            <div key={area.title} className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-colors group">
                                <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl inline-block group-hover:bg-primary/10 group-hover:text-primary transition-colors text-slate-600 dark:text-slate-400">
                                    <IconComponent className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{area.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-4">
                                    {area.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
