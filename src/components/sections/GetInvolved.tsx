import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getInvolved } from '@/data';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { IconBadge } from '@/components/ui/IconBadge';
import { Reveal } from '@/components/ui/Reveal';

export function GetInvolved() {
  return (
    <section className="section bg-forest-900">
      <Container>
        <SectionHeading
          light
          eyebrow="Join the Movement"
          title="Get Involved"
          subtitle="Whether you're a company, a landowner, or a citizen who cares — there's a way for you to help grow a greener future."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {getInvolved.map((item, i) => (
            <Reveal key={item.title} delay={(i % 4) * 0.08}>
              <Link
                to={item.cta.to}
                className="group flex h-full flex-col rounded-2xl border border-forest-700 bg-forest-800/60 p-6 transition hover:border-leaf-500 hover:bg-forest-800"
              >
                <IconBadge name={item.icon} tone="leaf" size="lg" />
                <h3 className="mt-5 text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-forest-100/80">
                  {item.blurb}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-leaf-300">
                  {item.cta.label}
                  <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
