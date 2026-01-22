'use client';

import { motion } from 'framer-motion';
import { BookOpen, ArrowRight, ChevronRight, Users } from 'lucide-react';
import Link from 'next/link';
import { publications } from '@/lib/content';

// Helper para mapear tipo de publicação para label em português
const typeLabels: Record<string, string> = {
    journal: 'Periódico',
    conference: 'Conferência',
    book: 'Livro',
    thesis: 'Tese'
};

export function Publications() {
    // Pegar as 5 publicações mais recentes (ordenadas por ano decrescente)
    const recentPublications = [...publications]
        .sort((a, b) => b.year - a.year)
        .slice(0, 5);

    return (
        <section id="publicacoes" className="py-16 bg-white dark:bg-slate-950">
            <div className="container mx-auto px-4 md:px-6">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <span className="font-mono  text-xs font-bold text-primary mb-2 block uppercase tracking-wider">
                            Produção Científica
                        </span>
                        <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4 tracking-tight">
                            Publicações Recentes
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Acompanhe o estado da arte da nossa pesquisa, com publicações recentes em conferências e periódicos sobre tecnologia e inovação urbana.
                        </p>
                    </div>
                    <Link href="/publicacoes" className="flex items-center gap-2 font-mono text-xs font-bold text-primary hover:text-primary/80 transition-colors uppercase tracking-wider">
                        [ Ver Todos as Publicações ] <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Publications Grid - bordas explícitas para garantir linhas visíveis */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
                    {recentPublications.map((pub, index) => (
                        <motion.div
                            key={pub.id}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="border-b border-r border-slate-200 dark:border-slate-800 last:border-b-0 md:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0"
                        >
                            <Link
                                href={`/publicacoes/${pub.slug}`}
                                className="block bg-white dark:bg-slate-950 p-6 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors group h-full"
                            >
                                {/* Year + Type Badge */}
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="font-mono text-xs font-bold text-primary">
                                        {pub.year}
                                    </span>
                                    <span className="font-mono text-[10px] font-bold text-white bg-primary px-2 py-0.5 rounded-full uppercase">
                                        {typeLabels[pub.type]}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-sm font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                                    {pub.title}
                                </h3>

                                {/* Authors */}
                                <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                                    {pub.authors.join(', ')}
                                </p>

                                {/* Venue */}
                                <p className="font-mono text-[10px] text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-4">
                                    {pub.venue}
                                </p>

                                {/* Link */}
                                <div className="flex items-center text-primary text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                                    Ver detalhes <span className="ml-1">&rarr;</span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}

                    {/* Card "Ver Todas" para preencher o grid */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="bg-slate-50 dark:bg-slate-900"
                    >
                        <Link
                            href="/publicacoes"
                            className="flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 p-6 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group h-full min-h-[200px]"
                        >
                            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-all shadow-xs shadow-primary/20">
                                <ArrowRight className="w-6 h-6 text-white" />
                            </div>
                            <span className="font-mono text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                                Ver Todos
                            </span>
                            <span className="text-sm text-muted-foreground mt-1">
                                {publications.length} publicações
                            </span>
                        </Link>
                    </motion.div>
                </div>

                {/* Mobile CTA
                <div className="mt-8 text-center md:hidden">
                    <Link
                        href="/publicacoes"
                        className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 uppercase tracking-wider"
                    >
                        Ver Todas as Publicações <ArrowRight className="w-4 h-4" />
                    </Link>
                </div> */}

            </div>
        </section>
    );
}
