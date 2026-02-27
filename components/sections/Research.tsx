'use client';

import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { getResearchAreaSlug, ResearchArea } from '@/lib/data/research';

import { Link } from '@/i18n/routing';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ResearchProps {
    researchAreas: ResearchArea[];
}

export function Research({ researchAreas }: ResearchProps) {
    const t = useTranslations('ResearchLinesSection');
    return (
        <section id="pesquisa" className="py-24 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
            <div className="container mx-auto px-4 md:px-6">

                <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <span className="font-mono text-xs font-bold text-primary mb-2 block uppercase tracking-wider">
                            {t('tag')}
                        </span>
                        <h2 className="text-2xl md:text-5xl font-black text-foreground mb-4 tracking-tight">
                            {t('title')}
                        </h2>
                        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                            {t('description')}
                        </p>
                    </div>
                    <Link href="/pesquisa/linhas-de-pesquisa" className="flex items-center gap-2 font-mono text-xs font-bold text-primary hover:text-primary/80 transition-colors uppercase tracking-wider">
                        {t('viewAll')} <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="flex flex-wrap border-t border-l border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
                    {researchAreas.slice(0, 3).map((area, index) => {
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
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="w-full sm:w-1/2 lg:w-1/4 border-r border-b border-slate-200 dark:border-slate-800"
                    >
                        <Link
                            href="/pesquisa/linhas-de-pesquisa"
                            className="flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 p-6 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group h-full min-h-[200px]"
                        >
                            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-all shadow-xs shadow-primary/20">
                                <ArrowRight className="w-6 h-6 text-white" />
                            </div>
                            <span className="font-mono text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                                {t('viewAllBtn')}
                            </span>
                            <span className="text-sm text-muted-foreground mt-1">
                                {researchAreas.length} {t('itemsCount')}
                            </span>
                        </Link>
                    </motion.div>
                </div>


            </div>
        </section>
    );
}
