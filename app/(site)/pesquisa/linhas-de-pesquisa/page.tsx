import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ResearchDetailed } from "@/components/sections/ResearchDetailed";
import { getResearchAreas } from "@/lib/data/research";
import { getProjects } from "@/lib/data/projects";

export default async function LinhasDePesquisaPage() {
    const researchAreas = await getResearchAreas();
    const projects = await getProjects();

    return (
        <main className="min-h-screen bg-white dark:bg-slate-950 pt-32 pb-16 relative">

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Voltar para Home
                </Link>
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-4">Linhas de Pesquisa</h1>
                        <p className="text-lg text-muted-foreground max-w-2xl">
                            Descubra as áreas de atuação científica e tecnológica que impulsionam nossas inovações urbanas, desde IoT até diagnósticos médicos avançados.
                        </p>
                    </div>
                </div>

                <ResearchDetailed researchAreas={researchAreas} projects={projects} />
            </div>
        </main>
    );
}
