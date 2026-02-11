"use client";

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from "next/link";
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Calendar, User, Search, ExternalLink } from "lucide-react";
import { NewsPost } from "@/lib/data/news";

const tabs = [
    { id: 'noticias', label: 'Notícias', filter: (n: NewsPost) => !n.type || n.type === 'internal' },
    { id: 'midia', label: 'Deu na Mídia', filter: (n: NewsPost) => n.type === 'external' },
];

export default function NewsClient({ news }: { news: NewsPost[] }) {
    const searchParams = useSearchParams();
    const initialTab = searchParams.get('tab') === 'midia' ? 'midia' : 'noticias';

    const [activeTab, setActiveTab] = useState(initialTab);
    const [filterState, setFilterState] = useState<Record<string, { search: string; category: string | null; sort: 'newest' | 'oldest' }>>({
        noticias: { search: '', category: null, sort: 'newest' },
        midia: { search: '', category: null, sort: 'newest' },
    });

    const currentTab = tabs.find(t => t.id === activeTab)!;
    const currentFilters = filterState[activeTab];

    const updateFilter = (key: 'search' | 'category' | 'sort', value: string | null) => {
        setFilterState(prev => ({
            ...prev,
            [activeTab]: { ...prev[activeTab], [key]: value },
        }));
    };

    // Scope to current tab
    const scopedNews = news.filter(currentTab.filter);
    const categories = Array.from(new Set(scopedNews.map(item => item.category).filter(Boolean))) as string[];

    // Apply filters
    const filteredNews = scopedNews
        .filter(item => {
            const q = (currentFilters.search || '').toLowerCase();
            const matchesSearch = !q ||
                item.title.toLowerCase().includes(q) ||
                (item.excerpt && item.excerpt.toLowerCase().includes(q));
            const matchesCategory = currentFilters.category ? item.category === currentFilters.category : true;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            const dateA = new Date(a.publishedAt).getTime();
            const dateB = new Date(b.publishedAt).getTime();
            return currentFilters.sort === 'newest' ? dateB - dateA : dateA - dateB;
        });

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-16">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mb-12">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Voltar para Home
                    </Link>
                    <div className="mb-8">
                        <span className="font-mono text-xs font-bold text-primary mb-2 block uppercase tracking-wider">
                            Sala de Imprensa
                        </span>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-4">
                            {activeTab === 'noticias' ? 'Nossas Notícias' : 'Deu na Mídia'}
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl">
                            {activeTab === 'noticias'
                                ? 'Fique por dentro das últimas descobertas, eventos e parcerias do LabCity.'
                                : 'Cobertura da mídia sobre as atividades e pesquisas do nosso laboratório.'
                            }
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b border-slate-200 dark:border-slate-800 mb-8">
                        {tabs.map(tab => {
                            const count = news.filter(tab.filter).length;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`relative px-4 py-3 text-sm font-bold transition-colors ${activeTab === tab.id
                                            ? 'text-primary'
                                            : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    {tab.label}
                                    <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab.id
                                            ? 'bg-primary/10 text-primary'
                                            : 'bg-slate-100 dark:bg-slate-800 text-muted-foreground'
                                        }`}>
                                        {count}
                                    </span>
                                    {activeTab === tab.id && (
                                        <motion.div
                                            layoutId="newsActiveTab"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Search and Filters */}
                    <div className="w-full flex flex-col md:flex-row gap-4 mb-12 items-center">
                        <div className="relative w-full md:w-auto">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Buscar notícias..."
                                value={currentFilters.search}
                                onChange={(e) => updateFilter('search', e.target.value)}
                                className="pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary/20 outline-none transition-all w-full md:w-96"
                            />
                        </div>

                        <div className="flex gap-2 w-full md:w-auto">
                            {categories.length > 0 && (
                                <select
                                    className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-primary/20 flex-1 md:flex-none cursor-pointer"
                                    value={currentFilters.category || ""}
                                    onChange={(e) => updateFilter('category', e.target.value || null)}
                                >
                                    <option value="">Todas as Categorias</option>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            )}

                            <select
                                className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-primary/20 flex-1 md:flex-none cursor-pointer"
                                value={currentFilters.sort}
                                onChange={(e) => updateFilter('sort', e.target.value)}
                            >
                                <option value="newest">Mais recentes</option>
                                <option value="oldest">Mais antigas</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {filteredNews.length > 0 ? (
                            filteredNews.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Link
                                        href={item.redirectUrl || `/noticias/${item.slug}`}
                                        target={item.redirectUrl ? "_blank" : undefined}
                                        className="group flex flex-col h-full bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-200 dark:border-slate-800 hover:-translate-y-1"
                                    >
                                        {/* Image */}
                                        <div className="h-56 overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
                                            {item.image ? (
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-400">
                                                    <span className="text-4xl opacity-20 font-black">LAB</span>
                                                </div>
                                            )}
                                            <div className="absolute top-4 left-4 flex gap-2">
                                                {item.category && (
                                                    <div className="bg-white/90 dark:bg-slate-950/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm border border-slate-200 dark:border-slate-800">
                                                        {item.category}
                                                    </div>
                                                )}
                                                {item.source && (
                                                    <div className="bg-amber-50/90 dark:bg-amber-900/40 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-amber-700 dark:text-amber-300 shadow-sm border border-amber-200 dark:border-amber-800">
                                                        {item.source}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 p-6 md:p-8 flex flex-col">
                                            <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-4">
                                                <span className="flex items-center gap-1.5">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    {new Date(item.publishedAt).toLocaleDateString("pt-BR")}
                                                </span>
                                                {item.author && (
                                                    <span className="flex items-center gap-1.5">
                                                        <User className="w-3.5 h-3.5" />
                                                        {item.author.name}
                                                    </span>
                                                )}
                                            </div>

                                            <h3 className="text-xl font-bold text-foreground mb-3 leading-tight group-hover:text-primary transition-colors">
                                                {item.title}
                                            </h3>

                                            <p className="text-slate-600 dark:text-slate-400 line-clamp-3 mb-6 text-sm leading-relaxed flex-1">
                                                {item.excerpt}
                                            </p>

                                            <div className="text-primary font-bold text-sm flex items-center gap-2 border-t border-slate-100 dark:border-slate-800 pt-4 mt-auto">
                                                {item.type === 'external' ? (
                                                    <>
                                                        Ler na fonte <ExternalLink className="w-4 h-4" />
                                                    </>
                                                ) : (
                                                    <>
                                                        Ler artigo completo <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-24 text-slate-500">
                                Nenhuma notícia encontrada para os filtros selecionados.
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </main>
    );
}
