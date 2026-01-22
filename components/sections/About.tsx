'use client';

import { motion } from 'framer-motion';
import { Target, Cpu, Users, Globe } from 'lucide-react';

export function About() {
    return (
        <section id="sobre" className="py-16 bg-white dark:bg-slate-950 relative overflow-hidden">
            {/* Tech Grid Background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000000_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">

                    {/* Header Block */}
                    <div className="lg:col-span-4">
                        <span className="font-mono text-xs font-bold text-primary mb-4 block uppercase tracking-widest">
              // Manifesto_Labcity
                        </span>
                        <h2 className="text-3xl font-bold mb-6 text-foreground tracking-tight leading-tight">
                            Ciência de Dados aplicada à <br />
                            <span className="text-primary">Realidade Urbana</span>
                        </h2>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-8 border-l-2 border-primary/20 pl-4">
                            Nascido na Universidade Federal do Pará. Focado no desenvolvimento de tecnologias disruptivas para a Amazônia. Interceção entre IA, IoT e Políticas Públicas.
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                                <span className="block text-2xl font-bold text-primary mb-1">2024</span>
                                <span className="text-[10px] font-mono text-muted-foreground uppercase">Fundação</span>
                            </div>
                            <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                                <span className="block text-2xl font-bold text-primary mb-1">Guamá</span>
                                <span className="text-[10px] font-mono text-muted-foreground uppercase">Campus</span>
                            </div>
                        </div>
                    </div>

                    {/* Mission Grid Block */}
                    <div className="lg:col-span-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
                            {[
                                {
                                    icon: Target,
                                    title: "Objetivo",
                                    desc: "Criar soluções reais para saúde, mobilidade, energia e governança digital."
                                },
                                {
                                    icon: Cpu,
                                    title: "Stack Tecnológico",
                                    desc: "Deep Learning, Visão Computacional, Redes IoT, Análise de Big Data."
                                },
                                {
                                    icon: Users,
                                    title: "Capital Humano",
                                    desc: "Formação de pesquisadores de alta performance adaptados ao ecossistema local."
                                },
                                {
                                    icon: Globe,
                                    title: "Contexto Regional",
                                    desc: "Soluções desenhadas para os desafios climáticos e logísticos da Amazônia."
                                }
                            ].map((item, i) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white dark:bg-slate-950 p-8 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <item.icon className="w-5 h-5 text-primary" />
                                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">{item.title}</span>
                                    </div>
                                    <p className="text-foreground text-sm font-medium leading-relaxed">
                                        {item.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
