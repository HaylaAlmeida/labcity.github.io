
import { Link } from '@/i18n/routing';
import { BackLink } from '@/components/ui/BackLink';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getPartners } from '@/lib/data/partners';
import { getAssetPath } from '@/lib/utils';
import Image from 'next/image';

export default async function ParceriasPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const partners = await getPartners();

    const funding = partners.filter(p => p.category === 'funding');
    const support = partners.filter(p => p.category === 'support');
    const collaborators = partners.filter(p => p.category === 'partner' || !p.category);
    const tNav = await getTranslations('Navigation');

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-16">
            <div className="container mx-auto px-4 md:px-6">

                {/* Header Section */}
                <div className="mb-16">
                    <BackLink href="/" label={tNav('backHome')} />
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-4">
                        Colaborações e Parcerias
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                        Construindo o futuro através da cooperação institucional.
                    </p>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-16">

                    {/* Fomento - Only show if has items */}
                    {funding.length > 0 && (
                        <section>
                            <h2 className="font-mono text-sm font-bold text-muted-foreground uppercase tracking-widest mb-8 border-b border-slate-200 dark:border-slate-800 pb-2">
                                &gt; Fomento
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                {funding.map(partner => (
                                    <PartnerCard key={partner.id} partner={partner} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Apoio Institucional */}
                    {support.length > 0 && (
                        <section>
                            <h2 className="font-mono text-sm font-bold text-muted-foreground uppercase tracking-widest mb-8 border-b border-slate-200 dark:border-slate-800 pb-2">
                                &gt; Apoio Institucional
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                {support.map(partner => (
                                    <PartnerCard key={partner.id} partner={partner} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Parceiros  */}
                    {collaborators.length > 0 && (
                        <section>
                            <h2 className="font-mono text-sm font-bold text-muted-foreground uppercase tracking-widest mb-8 border-b border-slate-200 dark:border-slate-800 pb-2">
                                &gt; Parceiros & Colaboradores
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                {collaborators.map(partner => (
                                    <PartnerCard key={partner.id} partner={partner} />
                                ))}
                            </div>
                        </section>
                    )}

                </div>
            </div>
        </main>
    );
}

function PartnerCard({ partner }: { partner: any }) {
    const CardContent = (
        <div className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-xl flex flex-col items-center justify-center gap-6 hover:shadow-lg hover:border-primary/50 transition-all h-full">
            <div className="relative w-32 h-20 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
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
