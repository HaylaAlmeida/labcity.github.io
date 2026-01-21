'use client';

import { motion } from 'framer-motion';
import { Leaf, Activity, GraduationCap, Wifi } from 'lucide-react';

import { researchAreas } from '@/lib/content';

export function Research() {
    return (
        <section id="pesquisa" className="py-16 bg-white dark:bg-slate-950">
            <div className="container mx-auto px-4 md:px-6">

                <div className="mb-12 text-left">
                    <span className="font-mono text-xs font-bold text-primary mb-2 block uppercase">Competências Centrais</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                        Linhas de Pesquisa
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
                    {researchAreas.map((area, index) => (
                        <motion.div
                            key={area.title}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white dark:bg-slate-950 p-8 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors group relative"
                        >
                            <span className="absolute top-4 right-4 font-mono text-[10px] text-slate-400 group-hover:text-primary transition-colors">
                                {area.code}
                            </span>

                            <area.icon className="w-8 h-8 text-slate-700 dark:text-slate-300 mb-6 stroke-1 group-hover:text-primary transition-colors" />

                            <h3 className="text-lg font-bold mb-3 text-foreground">{area.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                                {area.description}
                            </p>

                            <div className="flex items-center text-primary text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                                Ver detalhes <span className="ml-1">&rarr;</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
