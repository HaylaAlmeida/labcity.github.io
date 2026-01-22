'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { User, ChevronRight, FileText, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useCallback } from 'react';
import Image from 'next/image';
import { coordinators, doctors, masters, undergraduates } from '@/lib/content';
import { getAssetPath } from '@/lib/utils';

export function Team() {
    // Combine all members for the carousel (or select highlights)
    // We keep coordinators separate as 'Featured' and carousel the rest
    const allMembers = [...doctors, ...masters, ...undergraduates];

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, [Autoplay({ delay: 4000, stopOnInteraction: false })]);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <section id="equipe" className="py-16 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
            <div className="container mx-auto px-4 md:px-6">

                {/* Header */}
                <div className="mb-12 space-y-2">
                    {/* Linha 1: Label + Link */}
                    <div className="flex justify-between items-center">
                        <span className="font-mono text-xs font-bold text-primary uppercase">CAPITAL HUMANO</span>
                    </div>
                    {/* Linha 2: Título */}

                    <div className="flex justify-between items-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                            Nossa Equipe
                        </h2>
                        <Link href="/equipe" className="flex items-center gap-2 font-mono text-xs font-bold text-primary hover:text-primary/80 transition-colors uppercase tracking-wider">
                            [ Ver Todos os Integrantes ] <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                {/* Coordinators Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {coordinators.map((coord) => (
                        <div
                            key={coord.id}
                            className="group bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-6 rounded-lg relative overflow-hidden hover:border-primary/50 transition-colors flex flex-col items-center text-center"
                        >
                            {/* Avatar */}
                            <div className="w-20 h-20 mb-4 bg-slate-100 dark:bg-slate-900 rounded-full border border-slate-200 dark:border-slate-800 shrink-0 overflow-hidden relative">
                                {coord.image ? (
                                    <Image
                                        src={getAssetPath(coord.image)}
                                        className="object-cover"
                                        alt={coord.name}
                                        fill
                                        sizes="80px"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                                        <User className="w-8 h-8" />
                                    </div>
                                )}
                            </div>

                            {/* Badge */}
                            <span className="font-mono text-[10px] font-bold text-white bg-primary px-2 py-0.5 rounded-full mb-2">COORDENAÇÃO</span>

                            {/* Info */}
                            <h4 className="font-bold text-sm text-foreground line-clamp-1 w-full" title={coord.name}>{coord.name}</h4>
                            <p className="font-mono text-[10px] text-slate-600 dark:text-slate-400 uppercase tracking-wide mt-1 mb-4">{coord.focus}</p>

                            {/* Lattes link */}
                            {coord.lattes && (
                                <Link
                                    href={coord.lattes}
                                    target="_blank"
                                    className="mt-auto inline-flex items-center gap-1 text-[10px] font-bold text-slate-400 hover:text-primary uppercase tracking-wider transition-colors"
                                >
                                    Lattes <FileText className="w-3 h-3" />
                                </Link>
                            )}
                        </div>
                    ))}
                </div>

                {/* Team Carousel */}
                <div className="overflow-hidden p-1 -m-1" ref={emblaRef}>
                    <div className="flex -ml-6"> {/* Negative margin to offset first item padding */}
                        {allMembers.map((member: any) => (
                            <div key={member.id} className="flex-[0_0_280px] min-w-0 pl-6"> {/* Padding for spacing */}
                                <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-6 flex flex-col items-center text-center h-full rounded-lg hover:border-primary/50 transition-colors group">
                                    <div className="w-20 h-20 mb-4 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shrink-0 relative">
                                        {member.image && member.image !== "/images/team/avatar-placeholder.jpg" ? (
                                            <Image
                                                src={getAssetPath(member.image)}
                                                alt={member.name}
                                                className="object-cover"
                                                fill
                                                sizes="80px"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                <User className="w-8 h-8" />
                                            </div>
                                        )}
                                    </div>
                                    <h4 className="font-bold text-sm text-foreground line-clamp-1 w-full" title={member.name}>{member.name}</h4>
                                    <p className="font-mono text-[10px] text-primary/70 uppercase tracking-wide mt-1 mb-4">{member.focus}</p>

                                    <Link href={member.lattes} target="_blank" className="mt-auto inline-flex items-center gap-1 text-[10px] font-bold text-slate-400 hover:text-primary uppercase tracking-wider transition-colors">
                                        Lattes <FileText className="w-3 h-3" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Carousel Controls */}
                <div className="flex justify-center gap-2 mt-6">
                    <button onClick={scrollPrev} className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                        <ChevronLeft className="w-5 h-5 text-foreground" />
                    </button>
                    <button onClick={scrollNext} className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                        <ChevronRight className="w-5 h-5 text-foreground" />
                    </button>
                </div>

            </div>
        </section>
    );
}
