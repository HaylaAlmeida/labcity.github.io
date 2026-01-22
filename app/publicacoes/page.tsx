'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Users, ExternalLink, Calendar } from 'lucide-react';
import Link from 'next/link';
import { publications } from '@/lib/content';

// Helper para mapear tipo de publicação para label em português
const typeLabels: Record<string, string> = {
    journal: 'Periódico',
    conference: 'Conferência',
    book: 'Livro',
    thesis: 'Tese'
};

export default function PublicacoesPage() {
    // Ordenar por ano (mais recente primeiro)
    const sortedPublications = [...publications].sort((a, b) => b.year - a.year);

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-16">
            <div className="container mx-auto px-4 md:px-6">

                {/* Header */}
                <div className="mb-16">
                    <Link href="/#publicacoes" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Voltar para Home
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-4">
                        Nossas Publicações
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                        Produção científica do nosso grupo de pesquisa em periódicos e conferências de alto impacto internacional.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    {[
                        { label: 'Total de Publicações', value: publications.length },
                        { label: 'Periódicos', value: publications.filter(p => p.type === 'journal').length },
                        { label: 'Conferências', value: publications.filter(p => p.type === 'conference').length },
                        { label: 'Ano mais recente', value: Math.max(...publications.map(p => p.year)) }
                    ].map((stat, i) => (
                        <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-center">
                            <div className="text-2xl md:text-3xl font-black text-primary mb-1">{stat.value}</div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Publications Grid */}
                <div className="space-y-4">
                    {sortedPublications.map((pub, index) => (
                        <motion.div
                            key={pub.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Link
                                href={`/publicacoes/${pub.slug}`}
                                className="block p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-primary/50 hover:shadow-lg transition-all group"
                            >
                                <div className="flex flex-col lg:flex-row lg:items-start gap-4">

                                    {/* Left: Year Badge */}


                                    {/* Right: Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex-1 min-w-0">
                                            {/* Título • Ano */}
                                            <div className="flex items-center gap-2 mb-2">
                                                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 ">
                                                    {pub.title}
                                                </h3>
                                                <span className="text-sm text-muted-foreground shrink-0">
                                                    • {pub.year}
                                                </span>
                                            </div>

                                            {/* Autores */}
                                            <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                                                {pub.authors.join(', ')}
                                            </p>

                                            {/* Venue • Tipo */}
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <span className="font-medium text-foreground/80">{pub.venue}</span>
                                                <span>•</span>
                                                <span className="text-blue-600 dark:text-blue-400 font-bold">{typeLabels[pub.type]}</span>
                                            </div>
                                        </div>

                                        {/* Abstract Preview */}
                                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                                            {pub.abstract}
                                        </p>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2">
                                            {pub.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Arrow */}
                                    <div className="hidden lg:flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-primary group-hover:text-white transition-colors shrink-0 self-center">
                                        <ExternalLink className="w-4 h-4" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

            </div>
        </main>
    );
}
