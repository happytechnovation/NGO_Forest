import { impact } from '@/data';
import { Container } from '@/components/ui/Container';
import { IconBadge } from '@/components/ui/IconBadge';
import { CountUp } from '@/components/ui/CountUp';
import { Reveal } from '@/components/ui/Reveal';

export function ImpactStats() {
  return (
    <section id="impact" className="relative z-20 -mt-16">
      <Container>
        <div className="grid gap-4 rounded-3xl bg-forest-800 p-6 shadow-card sm:grid-cols-2 sm:p-8 lg:grid-cols-4">
          {impact.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <div className="flex items-center gap-4 rounded-2xl p-3 text-white">
                <IconBadge name={stat.icon} tone="leaf" />
                <div>
                  <div className="text-3xl font-extrabold leading-none text-white">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="mt-1 text-xs leading-snug text-forest-100/80">{stat.label}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
