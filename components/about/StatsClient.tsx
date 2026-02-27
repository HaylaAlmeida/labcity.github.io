"use client";

import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { useTranslations } from 'next-intl';

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
    const t = useTranslations('StatsSection');

    return (
        <div className="border-y border-slate-200 dark:border-slate-800 py-16 mb-24">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                    <div className="text-4xl md:text-5xl font-black text-primary tracking-tighter mb-2 flex justify-center items-center gap-1">
                        +<AnimatedCounter value={projectsCount} />
                    </div>
                    <div className="text-muted-foreground font-medium">{t('activeProjects')}</div>
                </div>
                <div className="text-center">
                    <div className="text-4xl md:text-5xl font-black text-primary tracking-tighter mb-2 flex justify-center items-center gap-1">
                        +<AnimatedCounter value={researchersCount} />
                    </div>
                    <div className="text-muted-foreground font-medium">{t('researchers')}</div>
                </div>
                <div className="text-center">
                    <div className="text-4xl md:text-5xl font-black text-primary tracking-tighter mb-2 flex justify-center items-center gap-1">
                        +<AnimatedCounter value={patentsCount} />
                    </div>
                    <div className="text-muted-foreground font-medium">{t('publications')}</div>
                </div>
                <div className="text-center">
                    <div className="text-4xl md:text-5xl font-black text-primary tracking-tighter mb-2 flex justify-center items-center gap-1">
                        +<AnimatedCounter value={partnersCount} />
                    </div>
                    <div className="text-muted-foreground font-medium">{t('partners')}</div>
                </div>
            </div>
        </div>
    );
}
