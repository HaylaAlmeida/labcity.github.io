import Link from "next/link";
import { ArrowRight, Calendar, User, ChevronRight } from "lucide-react";
import { getRecentNews } from "@/lib/data/news";

export async function NewsSection() {
    const news = await getRecentNews(3);

    return (
        <section className="py-24 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
            <div className="container mx-auto px-4 md:px-6">
                <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <span className="font-mono text-xs font-bold text-primary mb-2 block uppercase tracking-wider">
                            Atualizações
                        </span>
                        <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4 tracking-tight">
                            Notícias Recentes
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Acompanhe as últimas novidades, parcerias e avanços do laboratório.
                        </p>
                    </div>
                    <Link href="/noticias" className="flex items-center gap-2 font-mono text-xs font-bold text-primary hover:text-primary/80 transition-colors uppercase tracking-wider">
                        [ Ver Todas as Notícias ] <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {news.map((item) => (
                        <Link
                            key={item.id}
                            href={item.redirectUrl || `/noticias/${item.slug}`}
                            target={item.redirectUrl ? "_blank" : undefined}
                            className="group flex flex-col h-full bg-slate-50 dark:bg-slate-900/50 rounded-2xl overflow-hidden hover:shadow-lg transition-all border border-slate-100 dark:border-slate-800"
                        >
                            {/* Image */}
                            <div className="h-48 overflow-hidden bg-slate-200 dark:bg-slate-800 relative">
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
                                        {new Date(item.publishedAt).toLocaleDateString('pt-BR')}
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

                                <div className="text-primary font-bold text-sm flex items-center gap-2 group/btn">
                                    Ler artigo
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-8 md:hidden text-center">
                    <Link
                        href="/noticias"
                        className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors uppercase tracking-wide group"
                    >
                        Ver todas as notícias
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
