import { home } from '@/data';
import { Container } from '@/components/ui/Container';
import { IconBadge } from '@/components/ui/IconBadge';
import { Reveal } from '@/components/ui/Reveal';

export function VisionMission() {
  const cards = [home.vision, home.mission];
  return (
    <section className="section bg-leaf-pattern">
      <Container className="grid gap-6 md:grid-cols-2">
        {cards.map((card, i) => (
          <Reveal key={card.title} delay={i * 0.1}>
            <div className="h-full rounded-3xl border border-forest-100 bg-surface p-8 shadow-soft">
              <IconBadge name={card.icon} tone="forest" size="lg" />
              <h3 className="mt-5 text-2xl font-bold text-forest-900">{card.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{card.text}</p>
            </div>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}
