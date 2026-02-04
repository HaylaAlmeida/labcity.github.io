import Link from 'next/link';
import { ArrowLeft, Target, Cpu, Users, Globe } from 'lucide-react';
import { StatsSection } from "@/components/about/StatsSection";

import { sanityQuery, isSanityEnabled } from '@/lib/cms/sanity';
import { GallerySection } from "@/components/about/GallerySection";

async function getAboutData() {
    if (!isSanityEnabled()) return null;
    const query = `*[_type == "about"][0] {
        gallery
    }`;
    return await sanityQuery<any>(query, {}, { tags: ['about'], revalidate: 30 });
}

export default async function SobrePage() {
    const aboutData = await getAboutData();

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-16">
            <div className="container mx-auto px-4 md:px-6">

                {/* Header Section - Standardized */}
                <div className="mb-16">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Voltar para Home
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-4">
                        O que é o LabCity?
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                        Somos um laboratório de inovação da Universidade Federal do Pará (UFPA) dedicado a transformar cidades através da tecnologia.
                    </p>
                </div>

                {/* Main Content */}
                <div
                    className="prose prose-slate dark:prose-invert max-w-none"
                >
                    {/* Mission & History Section - Clean Typography */}
                    {/* Mission & History Section - Clean Typography */}
                    {/* Mission & History Section - Balanced Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-24 pb-16 items-start">
                        {/* History - Vertical Timeline (Left) */}
                        <div className="flex flex-col justify-center">
                            <h2 className="text-3xl font-bold mb-8 text-foreground tracking-tight">Nossa Jornada</h2>
                            <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-3 space-y-12 pb-2">
                                {/* Timeline Item 1 */}
                                <div className="relative pl-8">
                                    <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-800 border-4 border-white dark:border-slate-950 shadow-sm" />
                                    <h3 className="text-lg font-bold text-foreground mb-3">Fundação</h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                                        O LabCity foi fundado com a missão clara de transformar a realidade urbana da Amazônia através da tecnologia aplicada.
                                    </p>
                                </div>
                                {/* Timeline Item 2 */}
                                <div className="relative pl-8">
                                    <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-primary border-4 border-white dark:border-slate-950 shadow-sm" />
                                    <h3 className="text-lg font-bold text-foreground mb-3">Expansão e Inovação</h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                                        Desde nossa concepção na UFPA, expandimos nossa atuação integrando Inteligência Artificial, IoT e parcerias estratégicas para gestão pública eficiente.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Gallery Slider (Right) */}
                        <div className="flex flex-col justify-center h-full">
                            <GallerySection images={aboutData?.gallery} />
                        </div>

                    </div>

                    {/* Impact Stats - Social Proof */}
                    <StatsSection />

                    {/* Features - Professional Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16 mb-24">
                        {/* Feature 1 */}
                        <div className="flex flex-col items-start">
                            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg mb-6">
                                <Cpu className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-foreground">Tecnologia de Ponta</h3>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Trabalhamos na interseção entre Inteligência Artificial, Internet das Coisas (IoT) e Ciência de Dados para criar sistemas urbanos inteligentes e responsivos.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="flex flex-col items-start">
                            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg mb-6">
                                <Globe className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-foreground">Foco Regional</h3>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Nossas pesquisas não são apenas teóricas; elas são aplicadas para resolver problemas reais de Belém e da região Amazônica, como mobilidade, saneamento e monitoramento ambiental.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="flex flex-col items-start">
                            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg mb-6">
                                <Users className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-foreground">Formação de Talentos</h3>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Mais do que código, desenvolvemos pessoas. O LabCity é um celeiro de novos pesquisadores, preparando estudantes para os desafios do mercado global de tecnologia.
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="flex flex-col items-start">
                            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg mb-6">
                                <Target className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-foreground">Impacto Social</h3>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Acreditamos que a cidade inteligente deve ser uma cidade para todos. Nossos projetos visam democratizar o acesso aos serviços urbanos e promover a inclusão digital.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
