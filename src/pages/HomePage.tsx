import { Seo } from '@/components/Seo';
import { Hero } from '@/components/sections/Hero';
import { ImpactStats } from '@/components/sections/ImpactStats';
import { AboutTeaser } from '@/components/sections/AboutTeaser';
import { VisionMission } from '@/components/sections/VisionMission';
import { Values } from '@/components/sections/Values';
import { Services } from '@/components/sections/Services';
import { GetInvolved } from '@/components/sections/GetInvolved';
import { Projects } from '@/components/sections/Projects';
import { FieldStories } from '@/components/sections/FieldStories';
import { TeamPreview } from '@/components/sections/TeamPreview';
import { TrustStrip } from '@/components/sections/TrustStrip';
import { Partners } from '@/components/sections/Partners';
import { Donate } from '@/components/sections/Donate';
import { Faq } from '@/components/sections/Faq';
import { CtaBand } from '@/components/sections/CtaBand';

export function HomePage() {
  return (
    <>
      <Seo
        title="Treelands Foundation | Forestry & Environment NGO in Bengaluru, Karnataka"
        description="A Bengaluru-based Section 8 non-profit led by retired senior IFS forest officers — forestry consultancy, agroforestry, tree valuation, CSR projects, biodiversity conservation and climate action across Karnataka."
      />
      <Hero />
      <ImpactStats />
      <AboutTeaser />
      <VisionMission />
      <Values />
      <Services />
      <GetInvolved />
      <Projects limit={4} />
      <FieldStories />
      <TeamPreview />
      <TrustStrip />
      <Partners />
      <Donate />
      <Faq />
      <CtaBand />
    </>
  );
}
