import { ArrowRight, Cpu } from 'lucide-react';
import Link from 'next/link';
import { HeroAnimations } from './HeroAnimations';

export function Hero() {
    return (
        <section
            className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-slate-950 text-white border-b border-slate-800">

            {/* Background - Technical Grid */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50" />

                {/* Animated Data Nodes (client-only, non-blocking) */}
                <HeroAnimations />
            </div>

            <div
                className="container relative z-20 px-4 md:px-6 flex flex-col items-start text-left max-w-8xl pt-32 md:pt-40">

                {/* Badge Node */}
                <div
                    className="flex items-center gap-2 mb-8 hero-fade-in"
                    style={{ animationDelay: '0s' }}
                >
                    <div className="bg-blue-500/20 p-2 rounded-lg border border-blue-500/30">
                        <Cpu className="w-5 h-5 text-blue-400" />
                    </div>
                    <span className="text-xs md:text-sm font-mono text-blue-400 font-bold uppercase tracking-widest">
                        UFPA &bull; INCT IAmazônia &bull; CCAD-IA
                    </span>
                </div>

                {/* Main Headline — LCP Element (server-rendered, CSS animation) */}
                <h1
                    className="text-4xl md:text-5xl lg:text-8xl font-black tracking-tighter mb-8 text-white leading-[1.1] max-w-7xl hero-fade-in"
                    style={{ animationDelay: '0.2s' }}
                >
                    Inteligência Artificial para{" "}
                    <span className="text-blue-400 md:bg-gradient-to-r md:from-primary md:to-blue-300 md:bg-clip-text md:text-transparent selection:bg-blue-500/30">
                        Cidades Inteligentes
                    </span>
                </h1>

                {/* Description */}
                <p
                    className="text-sm md:text-lg lg:text-xl text-slate-400 max-w-5xl mb-12 leading-relaxed font-light hero-fade-in"
                    style={{ animationDelay: '0.4s' }}
                >
                    Laboratório de Inteligência Artificial aplicada a Cidades Inteligentes. Desenvolvemos soluções em IoT, Visão Computacional e Big Data para monitoramento e gestão urbana na Amazônia.
                </p>

                {/* Buttons */}
                <div
                    className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto hero-fade-in"
                    style={{ animationDelay: '0.6s' }}
                >
                    <Link
                        href="/projetos"
                        className="inline-flex items-center justify-center h-14 px-8 rounded bg-blue-500 hover:bg-blue-600 text-white font-extrabold transition-all shadow-lg hover:shadow-blue-500/25 text-sm tracking-wider uppercase"
                    >
                        Ver Projetos
                        <ArrowRight className="ml-2 w-4 h-4 stroke-[3]" />
                    </Link>
                    <Link
                        href="/institucional#sobre"
                        className="inline-flex items-center justify-center h-14 px-8 rounded border border-slate-700 hover:border-slate-600 bg-slate-900/50 hover:bg-slate-800 text-slate-300 hover:text-white transition-all text-sm tracking-wider uppercase font-bold"
                    >
                        Sobre Labcity
                    </Link>
                </div>

                {/* Bottom indicator */}
                <div
                    className="mt-20 pt-8 border-t border-slate-800/50 w-full flex items-center gap-12 hero-fade-in"
                    style={{ animationDelay: '0.8s' }}
                >
                    <div
                        className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_2px_rgba(59,130,246,0.5)] animate-pulse" />
                </div>

            </div>
        </section>
    );
}
