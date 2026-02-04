import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Research } from "@/components/sections/Research";
import { NewsSection } from "@/components/sections/NewsSection";
import { Publications } from "@/components/sections/Publications";
import { ContactSection } from "@/components/sections/ContactSection";
import { getPublications } from "@/lib/data/publications";
import { getResearchAreas } from "@/lib/data/research";

export default async function Home() {
  const [publications, researchAreas] = await Promise.all([
    getPublications(),
    getResearchAreas(),
  ]);

  return (
    <div className="flex flex-col w-full overflow-hidden">
      <Hero />
      <About />
      <NewsSection />
      <Publications publications={publications} />
      <Research researchAreas={researchAreas} />
      <ContactSection />
    </div>
  );
}
