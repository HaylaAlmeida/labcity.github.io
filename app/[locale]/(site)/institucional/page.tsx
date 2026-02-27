import { InstitutionalOverview } from "@/components/sections/InstitutionalOverview";
import { InstitutionalResearch } from "@/components/sections/InstitutionalResearch";
import { InstitutionalHistory } from "@/components/sections/InstitutionalHistory";
import { InstitutionalPartners } from "@/components/sections/InstitutionalPartners";
import { getPartners } from "@/lib/data/partners";
import { getResearchAreas } from "@/lib/data/research";
import { sanityQuery, isSanityEnabled } from '@/lib/cms/sanity';
import { ContactSection } from "@/components/sections/ContactSection";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'MetadataInstitutional' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

async function getAboutData() {
    if (!isSanityEnabled()) return null;
    const query = `*[_type == "about"][0] {
        gallery
    }`;
    return await sanityQuery<any>(query, {}, { tags: ['about'], revalidate: 30 });
}

export default async function InstitutionalPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const partners = await getPartners();
    const researchAreas = await getResearchAreas(locale);
    const aboutData = await getAboutData();

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Sections */}
            <InstitutionalOverview gallery={aboutData?.gallery} />
            <InstitutionalResearch researchAreas={researchAreas} />
            <InstitutionalPartners partners={partners} />
            <InstitutionalHistory />
            <ContactSection />
        </main>
    );
}
