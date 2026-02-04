"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, User, Tag, Share2, ArrowRight } from "lucide-react";
import { NewsPost } from "@/lib/data/news";
import { PortableText } from "@portabletext/react";

export default function NewsDetailClient({ post }: { post: NewsPost }) {
    if (!post) {
        return (
            <div className="min-h-screen pt-32 flex items-center justify-center">
                <p>Notícia não encontrada.</p>
            </div>
        )
    }

    return (
        <article className="min-h-screen bg-white dark:bg-slate-950 pt-32 pb-24">
            {/* Hero / Header */}
            <div className="container mx-auto px-4 md:px-6 mb-12">
                <Link
                    href="/noticias"
                    className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Voltar para Notícias
                </Link>

                <div className="max-w-4xl">
                    {post.category && (
                        <span className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-primary text-xs font-bold uppercase tracking-wider mb-6">
                            {post.category}
                        </span>
                    )}
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight mb-8 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 border-y border-slate-100 dark:border-slate-800 py-6">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(post.publishedAt).toLocaleDateString("pt-BR", { dateStyle: 'long' })}</span>
                        </div>
                        {post.author && (
                            <div className="flex items-center gap-2">
                                {post.author.image ? (
                                    <img src={post.author.image} alt={post.author.name} className="w-6 h-6 rounded-full object-cover" />
                                ) : (
                                    <User className="w-4 h-4" />
                                )}
                                <span className="font-medium text-foreground">{post.author.name}</span>
                            </div>
                        )}
                        <button className="ml-auto hover:text-primary transition-colors">
                            <Share2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Content (8 cols) */}
                <div className="lg:col-span-8">
                    {post.image && (
                        <div className="rounded-2xl overflow-hidden mb-12 bg-slate-100 dark:bg-slate-900 aspect-video">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
                        {post.body ? (
                            <PortableText value={post.body} />
                        ) : (
                            <p className="text-xl leading-relaxed text-slate-600 dark:text-slate-400">
                                {post.excerpt}
                                {/* Placeholder text for mock data */}
                                <br /><br />
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                        )}
                    </div>
                </div>

                {/* Sidebar (4 cols) - The "Web" */}
                <div className="lg:col-span-4 space-y-12">

                    {/* Author / Researcher Card */}
                    {post.author && (
                        <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Pesquisador Responsável</h3>
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-slate-200 overflow-hidden shrink-0">
                                    {post.author.image ? (
                                        <img src={post.author.image} alt={post.author.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="w-8 h-8 m-4 text-slate-400" />
                                    )}
                                </div>
                                <div>
                                    <div className="font-bold text-foreground text-lg">{post.author.name}</div>
                                    <div className="text-sm text-muted-foreground">{post.author.role || "Pesquisador LabCity"}</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Related Projects */}
                    {post.relatedProjects && post.relatedProjects.length > 0 && (
                        <div>
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                                <Tag className="w-3 h-3" /> Projetos Relacionados
                            </h3>
                            <div className="space-y-4">
                                {post.relatedProjects.map(project => (
                                    <Link
                                        key={project.slug}
                                        href={`/projetos/${project.slug}`}
                                        className="block group p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-primary transition-colors"
                                    >
                                        <div className="font-bold text-foreground group-hover:text-primary transition-colors mb-1">
                                            {project.title}
                                        </div>
                                        <div className="text-xs text-primary font-bold flex items-center gap-1">
                                            Ver projeto <ArrowRight className="w-3 h-3" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Related Publications */}
                    {post.relatedPublications && post.relatedPublications.length > 0 && (
                        <div>
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                                <Tag className="w-3 h-3" /> Publicações Relacionadas
                            </h3>
                            <div className="space-y-4">
                                {post.relatedPublications.map(pub => (
                                    <Link
                                        key={pub.slug}
                                        href={`/publicacoes`} // Ideally anchor to pub
                                        className="block group p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-primary transition-colors"
                                    >
                                        <div className="text-xs text-slate-500 mb-1">{pub.year} • {pub.venue}</div>
                                        <div className="font-bold text-foreground group-hover:text-primary transition-colors text-sm leading-relaxed">
                                            {pub.title}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
}
