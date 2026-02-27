"use client";

import { useState } from "react";
import { Link } from '@/i18n/routing';
import { ArrowLeft, Calendar, User, Share2, Clock, CheckCircle, BookOpen, FolderOpen, Newspaper } from "lucide-react";
import { NewsPost } from "@/lib/data/news";
import { PortableText } from "@portabletext/react";
import { useTranslations, useLocale } from "next-intl";

function estimateReadTime(body: any): number {
    if (!body) return 2;
    const text = JSON.stringify(body);
    const words = text.split(/\s+/).length;
    return Math.max(1, Math.round(words / 200));
}

export default function NewsDetailClient({ post }: { post: NewsPost }) {
    const [copied, setCopied] = useState(false);
    const t = useTranslations("NewsDetails");
    const locale = useLocale();

    if (!post) {
        return (
            <div className="min-h-screen pt-32 flex items-center justify-center">
                <p>{t('notFound')}</p>
            </div>
        );
    }

    const readTime = estimateReadTime(post.body);
    const hasRelated = (post.relatedProjects && post.relatedProjects.length > 0) ||
        (post.relatedPublications && post.relatedPublications.length > 0) ||
        (post.relatedPosts && post.relatedPosts.length > 0);

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Fallback
        }
    };

    return (
        <article className="min-h-screen bg-white dark:bg-slate-950 pt-32 pb-24">
            {/* Breadcrumbs */}
            <div className="container mx-auto px-4 md:px-6 mb-8">
                <div className="max-w-4xl mx-auto">
                    <nav className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Link href="/" className="hover:text-primary transition-colors">{t('breadcrumbHome')}</Link>
                        <span>/</span>
                        <Link href="/noticias" className="hover:text-primary transition-colors">{t('breadcrumbNews')}</Link>
                        <span>/</span>
                        <span className="text-foreground font-medium truncate max-w-[200px] md:max-w-md">{post.title}</span>
                    </nav>
                </div>
            </div>

            {/* Hero / Header */}
            <div className="container mx-auto px-4 md:px-6 mb-12">
                <div className="max-w-4xl mx-auto">
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
                            <span>{new Date(post.publishedAt).toLocaleDateString(locale, { dateStyle: 'long' })}</span>
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
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{t('readTime', { min: readTime })}</span>
                        </div>
                        <button
                            onClick={handleShare}
                            className="ml-auto flex items-center gap-2 hover:text-primary transition-colors"
                        >
                            {copied ? (
                                <><CheckCircle className="w-4 h-4 text-green-500" /> <span className="text-green-500 text-xs">{t('linkCopied')}</span></>
                            ) : (
                                <Share2 className="w-4 h-4" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content — single column, max-w-4xl */}
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Hero Image */}
                    {post.image && (
                        <div className="rounded-2xl overflow-hidden mb-12 bg-slate-100 dark:bg-slate-900 aspect-video">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    {/* Article Body */}
                    <div className="prose prose-lg prose-slate dark:prose-invert max-w-none mb-16">
                        {post.body ? (
                            <PortableText value={post.body} />
                        ) : (
                            <p className="text-xl leading-relaxed text-slate-600 dark:text-slate-400">
                                {post.excerpt}
                            </p>
                        )}
                    </div>

                    {/* Author Card */}
                    {post.author && (
                        <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 mb-16">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-slate-200 overflow-hidden shrink-0">
                                    {post.author.image ? (
                                        <img src={post.author.image} alt={post.author.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="w-8 h-8 m-4 text-slate-400" />
                                    )}
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{t('writtenBy')}</div>
                                    <div className="font-bold text-foreground text-lg">{post.author.name}</div>
                                    <div className="text-sm text-muted-foreground">{post.author.role || t('researcher')}</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Related Items — bullet point hyperlinks */}
                    {hasRelated && (
                        <div className="border-t border-slate-200 dark:border-slate-800 pt-12 space-y-10">
                            {/* Related Projects */}
                            {post.relatedProjects && post.relatedProjects.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <FolderOpen className="w-4 h-4 text-primary" />
                                        {t('relatedProjects')}
                                    </h3>
                                    <ul className="space-y-2 pl-1">
                                        {post.relatedProjects.map(project => (
                                            <li key={project.slug} className="flex items-start gap-2">
                                                <span className="text-primary mt-1.5 text-xs">●</span>
                                                <Link
                                                    href={`/projetos/${project.slug}`}
                                                    className="text-foreground hover:text-primary transition-colors font-medium"
                                                >
                                                    {project.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Related Publications */}
                            {post.relatedPublications && post.relatedPublications.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <BookOpen className="w-4 h-4 text-primary" />
                                        {t('relatedPublications')}
                                    </h3>
                                    <ul className="space-y-2 pl-1">
                                        {post.relatedPublications.map(pub => (
                                            <li key={pub.slug} className="flex items-start gap-2">
                                                <span className="text-primary mt-1.5 text-xs">●</span>
                                                <Link
                                                    href={`/publicacoes/${pub.slug}`}
                                                    className="text-foreground hover:text-primary transition-colors"
                                                >
                                                    <span className="font-medium">{pub.title}</span>
                                                    {pub.year && <span className="text-muted-foreground text-sm ml-2">({pub.year})</span>}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Related News */}
                            {post.relatedPosts && post.relatedPosts.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <Newspaper className="w-4 h-4 text-primary" />
                                        {t('relatedNews')}
                                    </h3>
                                    <ul className="space-y-2 pl-1">
                                        {post.relatedPosts.map(related => (
                                            <li key={related.slug} className="flex items-start gap-2">
                                                <span className="text-primary mt-1.5 text-xs">●</span>
                                                <Link
                                                    href={`/noticias/${related.slug}`}
                                                    className="text-foreground hover:text-primary transition-colors"
                                                >
                                                    <span className="font-medium">{related.title}</span>
                                                    {related.publishedAt && (
                                                        <span className="text-muted-foreground text-sm ml-2">
                                                            ({new Date(related.publishedAt).toLocaleDateString(locale)})
                                                        </span>
                                                    )}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
}
