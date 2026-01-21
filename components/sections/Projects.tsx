'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight, LayoutGrid, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { projects } from '@/lib/content';

export function Projects() {
    // Mapping the array from lib/content to the specific layout slots
    // [0] = INCT (Large item)
    // [1] = Brasil++ (Small item 1)
    // [2] = Mina do Futuro (Small item 2)
    const [inct, brasil, mina] = projects;

    return (
        <section id="projetos" className="py-24 bg-slate-50 dark:bg-slate-900 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <span className="font-mono text-xs font-bold text-primary mb-2 block uppercase tracking-wider">
                            Portfólio de Inovação
                        </span>
                        <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4 tracking-tight">
                            Projetos em Destaque
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Conheça as iniciativas que estão transformando a Amazônia e o Brasil através da Inteligência Artificial e IoT.
                        </p>
                    </div>
                    <Link href="/projetos" className="flex items-center gap-2 font-mono text-xs font-bold text-primary hover:text-primary/80 transition-colors uppercase tracking-wider ml-4">
                        [ Ver Todos os Projetos ] <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[600px]">

                    {/* Featured Project (Left - Large) */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-7 h-[500px] lg:h-full relative rounded-3xl overflow-hidden group border border-slate-200 dark:border-slate-800 bg-slate-950"
                    >
                        <Image
                            src={inct.image || ""}
                            alt={inct.title}
                            fill
                            className="object-cover opacity-50 group-hover:opacity-30 transition-opacity duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-8 md:p-12 flex flex-col justify-end">
                            <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                                <div className="flex justify-between items-start">
                                    <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest border border-white/20 px-2 py-1 rounded-full">{inct.category}</span>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2">{inct.title}</h3>
                                    <p className="text-sm text-slate-300 line-clamp-2 mb-4">
                                        {inct.description}
                                    </p>
                                    <Link href={`/projetos/${inct.slug}`} className="text-xs font-bold text-white/80 hover:text-white uppercase tracking-wider flex items-center gap-1">
                                        Saiba mais <ArrowUpRight className="w-3 h-3" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Secondary Projects (Right - Stacked) */}
                    <div className="lg:col-span-5 flex flex-col gap-6 h-full">

                        {/* Brasil++ */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="flex-1 relative rounded-3xl overflow-hidden group border border-slate-200 dark:border-slate-800 h-[300px] lg:h-auto bg-slate-950"
                        >
                            <Image
                                src={brasil.image || ""}
                                alt={brasil.title}
                                fill
                                className="object-cover opacity-50 group-hover:opacity-30 transition-opacity duration-500"
                            />
                            <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                                <div className="flex justify-between items-start">
                                    <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest border border-white/20 px-2 py-1 rounded-full">{brasil.category}</span>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2">{brasil.title}</h3>
                                    <p className="text-sm text-slate-300 line-clamp-2 mb-4">
                                        {brasil.description}
                                    </p>
                                    <Link href={`/projetos/${brasil.slug}`} className="text-xs font-bold text-white/80 hover:text-white uppercase tracking-wider flex items-center gap-1">
                                        Saiba mais <ArrowUpRight className="w-3 h-3" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>

                        {/* Mina do Futuro */}
                        <div className="flex gap-4 h-[250px] lg:h-[250px]">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="flex-1 relative rounded-3xl overflow-hidden group border border-slate-200 dark:border-slate-800 bg-slate-950 w-[70%]"
                            >
                                <Image
                                    src={mina.image || ""}
                                    alt={mina.title}
                                    fill
                                    className="object-cover opacity-50 group-hover:opacity-30 transition-opacity duration-500"
                                />
                                <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                                    <div className="flex justify-between items-start">
                                        <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest border border-white/20 px-2 py-1 rounded-full">{mina.category}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-1">{mina.title}</h3>
                                        <p className="text-[12px] text-slate-300 line-clamp-2 mb-2">
                                            {mina.description}
                                        </p>
                                        <Link href={`/projetos/${mina.slug}`} className="text-[10px] font-bold text-white/80 hover:text-white uppercase tracking-wider flex items-center gap-1">
                                            Saiba mais <ArrowUpRight className="w-3 h-3" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>

                            {/* 'View All' Box (30%) */}
                            <Link href="/projetos" className="w-[30%] bg-slate-200 dark:bg-slate-800 rounded-3xl flex flex-col items-center justify-center p-2 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors group cursor-pointer text-center">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all">
                                    <ArrowRight className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                                </div>
                                <span className="font-mono text-xs font-bold text-primary uppercase tracking-wider">
                                    Ver Todos
                                </span>
                                <span className="text-sm text-muted-foreground mt-1">
                                    {projects.length} projetos
                                </span>
                            </Link>
                        </div>

                    </div>
                </div>


            </div>
        </section>
    );
}
