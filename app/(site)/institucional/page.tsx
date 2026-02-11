import { InstitutionalOverview } from "@/components/sections/InstitutionalOverview";
import { InstitutionalResearch } from "@/components/sections/InstitutionalResearch";
import { InstitutionalHistory } from "@/components/sections/InstitutionalHistory";
import { InstitutionalPartners } from "@/components/sections/InstitutionalPartners";
import { getPartners } from "@/lib/data/partners";
import { getResearchAreas } from "@/lib/data/research";
import { sanityQuery, isSanityEnabled } from '@/lib/cms/sanity';
import { ContactSection } from "@/components/sections/ContactSection";

async function getAboutData() {
    if (!isSanityEnabled()) return null;
    const query = `*[_type == "about"][0] {
        gallery
    }`;
    return await sanityQuery<any>(query, {}, { tags: ['about'], revalidate: 30 });
}

export default async function InstitutionalPage() {
    const partners = await getPartners();
    const researchAreas = await getResearchAreas();
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
