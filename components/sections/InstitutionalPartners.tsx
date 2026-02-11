'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { getAssetPath } from '@/lib/utils';
import type { Partner } from '@/lib/data/partners';

export function InstitutionalPartners({ partners }: { partners: Partner[] }) {
    const displayPartners = partners;

    return (
        <section id="parcerias" className="py-24">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Colaborações e Parcerias</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl">
                            Construímos o futuro através de uma rede sólida de cooperação institucional.
                        </p>
                    </div>
                    {/* Optional: Link to a full list if needed, or this section replaces the page entirely */}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    {displayPartners.map(partner => (
                        <PartnerCard key={partner.id} partner={partner} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function PartnerCard({ partner }: { partner: any }) {
    const CardContent = (
        <div className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-xl flex flex-col items-center justify-center gap-6 hover:shadow-lg hover:border-primary/50 transition-all h-full min-h-[180px]">
            <div className="relative w-32 h-20 transition-all">
                <Image
                    src={getAssetPath(partner.logo)}
                    alt={partner.name}
                    fill
                    className="object-contain"
                />
            </div>
            <span className="font-bold text-sm text-center text-foreground group-hover:text-primary transition-colors">
                {partner.name}
            </span>
        </div>
    );

    if (partner.url) {
        return (
            <Link href={partner.url} target="_blank" className="block h-full">
                {CardContent}
            </Link>
        );
    }

    return CardContent;
}
