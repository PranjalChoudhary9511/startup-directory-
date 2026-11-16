import { Hero } from "@/components/home/hero";
import { LogoMarquee } from "@/components/home/marquee";
import { PillarFolders } from "@/components/home/pillar-folders";
import { Beyond, BuildWall, Faq, LearningBox, PricingPreview, RoadmapCta } from "@/components/home/sections";

export default function Home() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <PillarFolders />
      <LearningBox />
      <Beyond />
      <PricingPreview />
      <BuildWall />
      <Faq />
      <RoadmapCta />
    </>
  );
}
