import { HeartHandshake, BadgeCheck } from 'lucide-react';
import { donate } from '@/data';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

export function Donate() {
  return (
    <section id="donate" className="section">
      <Container>
        <Reveal>
          <div className="grid items-center gap-8 overflow-hidden rounded-3xl bg-gradient-to-br from-forest-700 to-forest-900 p-8 text-white shadow-card md:grid-cols-2 md:p-12">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-leaf-200">
                <HeartHandshake size={16} /> Support Us
              </span>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{donate.heading}</h2>
              <p className="mt-4 leading-relaxed text-forest-100/90">{donate.blurb}</p>
              <p className="mt-4 flex items-start gap-2 text-sm text-leaf-200">
                <BadgeCheck size={18} className="mt-0.5 shrink-0" />
                {donate.taxNote}
              </p>
              <Button to={donate.cta.to} variant="secondary" size="lg" className="mt-7">
                {donate.cta.label}
              </Button>
            </div>

            <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-leaf-200">
                Ways to give
              </h3>
              <dl className="mt-4 space-y-4">
                {donate.methods.map((m) => (
                  <div key={m.label} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
                    <dt className="text-xs font-medium uppercase tracking-wide text-forest-100/70">
                      {m.label}
                    </dt>
                    <dd className="mt-1 font-semibold text-white">{m.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
