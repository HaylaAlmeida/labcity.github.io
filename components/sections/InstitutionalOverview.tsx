
import { Link } from '@/i18n/routing';
import { ArrowLeft } from 'lucide-react';
import { StatsSection } from "@/components/about/StatsSection";
import { GallerySection } from "@/components/about/GallerySection";
import { InstitutionalManifesto } from "@/components/sections/InstitutionalManifesto";
import { useTranslations } from 'next-intl';

interface InstitutionalOverviewProps {
    gallery?: any[];
}

export function InstitutionalOverview({ gallery }: InstitutionalOverviewProps) {
    const t = useTranslations('Institutional');
    return (
        <section id="sobre" className="pt-32">
            <div className="container mx-auto px-4 md:px-6">
                {/* Header Section - Standardized */}
                <div className="mb-16">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> {t('backHome')}
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-4">
                        {t('title')}
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                        {t('description')}
                    </p>
                </div>

                {/* Main Content layout with Grid */}
                <div className="max-w-none">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-24 items-end">
                        {/* Manifesto (Left) */}
                        <InstitutionalManifesto />

                        {/* Gallery (Right) */}
                        <div className="w-full">
                            <GallerySection images={gallery} />
                        </div>
                    </div>

                    {/* Impact Stats - Full Width Below */}
                    <div className="mb-24">
                        <StatsSection />
                    </div>
                </div>
            </div>
        </section>
    );
}
