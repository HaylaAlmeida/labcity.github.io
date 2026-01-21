'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Cpu } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950 text-white border-b border-slate-800">

            {/* Background - Technical Grid (PRESERVED) */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50" />

                {/* Animated Data Nodes (PRESERVED) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="absolute inset-0"
                >
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_2px_rgba(59,130,246,0.5)]"
                            style={{
                                top: `${Math.random() * 80 + 10}%`,
                                left: `${Math.random() * 80 + 10}%`
                            }}
                            animate={{ opacity: [0.2, 1, 0.2] }}
                            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity }}
                        />
                    ))}
                </motion.div>
            </div>

            <div className="container relative z-20 px-4 md:px-6 flex flex-col items-start text-left max-w-5xl pt-32 md:pt-40">

                {/* Badge Node */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-2 mb-8"
                >
                    <div className="bg-blue-500/20 p-2 rounded-lg border border-blue-500/30">
                        <Cpu className="w-5 h-5 text-blue-400" />
                    </div>
                    <span className="text-xs md:text-sm font-mono text-blue-400 font-bold uppercase tracking-widest">
                        UFPA &bull; INCT IAmazônia &bull; CCAD-IA
                    </span>
                </motion.div>

                {/* Main Headline - Reference Style */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 text-white leading-[1.1] max-w-4xl"
                >
                    Inteligência Artificial<br />
                    para <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-300">Cidades Inteligentes</span>
                </motion.h1>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed font-light"
                >
                    Laboratório de pesquisa aplicada. Desenvolvemos soluções em IoT, Visão Computacional e Big Data para monitoramento e gestão urbana na Amazônia.
                </motion.p>

                {/* Buttons - Reference Style */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto"
                >
                    <Link
                        href="#projetos"
                        className="inline-flex items-center justify-center h-14 px-8 rounded bg-blue-500 hover:bg-blue-600 text-white font-extrabold transition-all shadow-lg hover:shadow-blue-500/25 text-sm tracking-wider uppercase"
                    >
                        Ver Projetos
                        <ArrowRight className="ml-2 w-4 h-4 stroke-[3]" />
                    </Link>
                    <Link
                        href="#sobre"
                        className="inline-flex items-center justify-center h-14 px-8 rounded border border-slate-700 hover:border-slate-600 bg-slate-900/50 hover:bg-slate-800 text-slate-300 hover:text-white transition-all text-sm tracking-wider uppercase font-bold"
                    >
                        Sobre Labcity
                    </Link>
                </motion.div>

                {/* Bottom Tech Stats (Preserved) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="mt-20 pt-8 border-t border-slate-800/50 w-full flex items-center gap-12"
                >
                    {/* Removed 10+ Projects */}

                    {/* Added glowing dot to decoration */}
                    <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_2px_rgba(59,130,246,0.5)] animate-pulse" />
                </motion.div>

            </div>
        </section>
    );
}
