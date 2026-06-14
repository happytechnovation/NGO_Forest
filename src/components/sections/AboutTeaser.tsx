import { Check, ArrowRight } from 'lucide-react';
import { home } from '@/data';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { LazyImage } from '@/components/ui/LazyImage';

export function AboutTeaser() {
  const { intro } = home;
  return (
    <section className="section">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <div className="relative">
            <LazyImage
              src={intro.image}
              alt="Our work in the field"
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-card"
            />
            <div className="absolute -bottom-6 -right-2 hidden rounded-2xl bg-leaf-500 px-6 py-5 text-white shadow-card sm:block">
              <div className="text-3xl font-extrabold leading-none">100+</div>
              <div className="text-xs">years combined experience</div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <span className="eyebrow">
            <span className="h-px w-6 bg-current" />
            {intro.eyebrow}
          </span>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-forest-900 sm:text-4xl">
            {intro.heading}
          </h2>
          {intro.body.map((p) => (
            <p key={p.slice(0, 24)} className="mt-4 text-base leading-relaxed text-muted">
              {p}
            </p>
          ))}
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {intro.points.map((point) => (
              <li key={point} className="flex items-center gap-2.5 text-sm font-medium text-forest-800">
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-leaf-100 text-leaf-700">
                  <Check size={14} strokeWidth={3} />
                </span>
                {point}
              </li>
            ))}
          </ul>
          <Button to="/about" className="mt-8">
            Learn more about us <ArrowRight size={18} />
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
