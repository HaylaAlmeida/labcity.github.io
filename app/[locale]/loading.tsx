'use client';

import { useTranslations } from 'next-intl';

export default function Loading() {
    const t = useTranslations('Navigation');

    return (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] w-full">
            <div className="flex flex-col items-center space-y-6">
                <div className="relative w-12 h-12">
                    {/* Subtle background ring */}
                    <div className="absolute inset-0 border-4 border-slate-100 dark:border-slate-800 rounded-full"></div>
                    {/* Spinning primary ring */}
                    <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
                </div>
                <div className="text-xs font-mono text-muted-foreground font-bold uppercase tracking-[0.2em] animate-pulse">
                    Loading...
                </div>
            </div>
        </div>
    );
}
