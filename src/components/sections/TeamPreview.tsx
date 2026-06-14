import { ArrowRight } from 'lucide-react';
import { team } from '@/data';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { TeamCard } from '@/components/cards/TeamCard';

export function TeamPreview() {
  return (
    <section className="section">
      <Container>
        <SectionHeading
          eyebrow="Our People"
          title="Led by India's most experienced foresters"
          subtitle="A team of retired senior IFS officers with over a century of combined service in forestry and wildlife."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, i) => (
            <Reveal key={member.name} delay={(i % 4) * 0.08}>
              <TeamCard member={member} />
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button to="/team" variant="outline">
            Meet the full team <ArrowRight size={18} />
          </Button>
        </div>
      </Container>
    </section>
  );
}
