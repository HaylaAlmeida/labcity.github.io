"use client";

import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

interface StatsClientProps {
    projectsCount: number;
    researchersCount: number;
    patentsCount: number; // or publications
    partnersCount: number;
}

export function StatsClient({
    projectsCount,
    researchersCount,
    patentsCount,
    partnersCount,
}: StatsClientProps) {
    return (
        <div className="border-y border-slate-200 dark:border-slate-800 py-16 mb-24">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                    <div className="text-4xl md:text-5xl font-black text-primary tracking-tighter mb-2 flex justify-center items-center gap-1">
                        +<AnimatedCounter value={projectsCount} />
                    </div>
                    <div className="text-muted-foreground font-medium">Projetos Ativos</div>
                </div>
                <div className="text-center">
                    <div className="text-4xl md:text-5xl font-black text-primary tracking-tighter mb-2 flex justify-center items-center gap-1">
                        +<AnimatedCounter value={researchersCount} />
                    </div>
                    <div className="text-muted-foreground font-medium">Pesquisadores</div>
                </div>
                <div className="text-center">
                    <div className="text-4xl md:text-5xl font-black text-primary tracking-tighter mb-2 flex justify-center items-center gap-1">
                        +<AnimatedCounter value={patentsCount} />
                    </div>
                    <div className="text-muted-foreground font-medium">Publicações</div>
                </div>
                <div className="text-center">
                    <div className="text-4xl md:text-5xl font-black text-primary tracking-tighter mb-2 flex justify-center items-center gap-1">
                        +<AnimatedCounter value={partnersCount} />
                    </div>
                    <div className="text-muted-foreground font-medium">Parceiros</div>
                </div>
            </div>
        </div>
    );
}
