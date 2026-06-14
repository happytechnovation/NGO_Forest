import { services } from '@/data';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { IconBadge } from '@/components/ui/IconBadge';
import { Card } from '@/components/ui/Card';
import { Reveal } from '@/components/ui/Reveal';

export function Services() {
  return (
    <section id="services" className="section bg-forest-50">
      <Container>
        <SectionHeading
          eyebrow="What We Do"
          title="Our Services"
          subtitle="From free technical advice to full-scale forestry consultancy, we bring decades of expertise to every engagement."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={(i % 3) * 0.08}>
              <Card className="group h-full">
                <IconBadge name={service.icon} tone="leaf" size="lg" />
                <h3 className="mt-5 text-lg font-bold text-forest-900">{service.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{service.description}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
