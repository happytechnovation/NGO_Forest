import { team } from '@/data';
import { Seo } from '@/components/Seo';
import { PageHeader } from '@/components/layout/PageHeader';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { TeamCard } from '@/components/cards/TeamCard';
import { CtaBand } from '@/components/sections/CtaBand';

export function TeamPage() {
  return (
    <>
      <Seo
        title="Our Team"
        description="Meet the retired senior IFS forest officers behind Treelands Foundation — leaders with decades of service in forestry, wildlife and biodiversity across India."
      />
      <PageHeader
        title="Our Team"
        subtitle="Retired senior IFS officers with over a century of combined experience in forestry, wildlife and biodiversity."
        image="/resources/media/forest-ridge.jpg"
      />
      <section className="section">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => (
              <Reveal key={member.name} delay={(i % 4) * 0.08}>
                <TeamCard member={member} expanded />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
