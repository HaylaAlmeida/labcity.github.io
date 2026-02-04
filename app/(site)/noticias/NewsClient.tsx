"use client";

import { useState } from 'react';
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, User, Search } from "lucide-react";
import { NewsPost } from "@/lib/data/news";

export default function NewsClient({ news }: { news: NewsPost[] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

    // Extract unique categories
    const categories = Array.from(new Set(news.map(item => item.category).filter(Boolean))) as string[];

    // Filter and Sort Logic
    const filteredNews = news
        .filter(item => {
            const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (item.excerpt && item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            const dateA = new Date(a.publishedAt).getTime();
            const dateB = new Date(b.publishedAt).getTime();
            return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
        });

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-16">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mb-16">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Voltar para Home
                    </Link>
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-4">
                                Nossas Notícias
                            </h1>
                            <p className="text-lg text-muted-foreground max-w-2xl">
                                Fique por dentro das últimas descobertas, eventos e parcerias do LabCity.
                            </p>
                        </div>
                    </div>
                    <div className="w-full flex flex-col md:flex-row gap-4 mt-8 items-center">
                        <div className="relative w-full md:w-auto">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Buscar notícias..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary/20 outline-none transition-all w-full md:w-96"
                            />

                        </div>

                        <div className="flex gap-2 w-full md:w-auto">
                            <select
                                className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-primary/20 flex-1 md:flex-none cursor-pointer"
                                value={selectedCategory || ""}
                                onChange={(e) => setSelectedCategory(e.target.value || null)}
                            >
                                <option value="">Todas as Categorias</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>

                            <select
                                className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-primary/20 flex-1 md:flex-none cursor-pointer"
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
                            >
                                <option value="newest">Mais recentes</option>
                                <option value="oldest">Mais antigas</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredNews.length > 0 ? (
                        filteredNews.map((item) => (
                            <Link
                                key={item.id}
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
                                    {item.category && (
                                        <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-950/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm border border-slate-200 dark:border-slate-800">
                                            {item.category}
                                        </div>
                                    )}
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

                                    <div className="text-primary font-bold text-sm flex items-center gap-2 group/btn border-t border-slate-100 dark:border-slate-800 pt-4 mt-auto">
                                        Ler artigo completo
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-24 text-slate-500">
                            Nenhuma notícia encontrada para os filtros selecionados.
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
