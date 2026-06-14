import { home } from '@/data';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { IconBadge } from '@/components/ui/IconBadge';
import { Card } from '@/components/ui/Card';
import { Reveal } from '@/components/ui/Reveal';

export function Values() {
  return (
    <section className="section">
      <Container>
        <SectionHeading
          eyebrow="What Drives Us"
          title="Our Core Values"
          subtitle="The principles that guide every project we undertake."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {home.values.map((value, i) => (
            <Reveal key={value.title} delay={i * 0.1}>
              <Card className="h-full text-center">
                <IconBadge name={value.icon} tone="leaf" size="lg" className="mx-auto" />
                <h3 className="mt-5 text-xl font-bold text-forest-900">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{value.text}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
