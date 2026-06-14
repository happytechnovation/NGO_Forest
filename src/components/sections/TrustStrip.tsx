import { credentials } from '@/data';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/lib/icon';
import { Reveal } from '@/components/ui/Reveal';

export function TrustStrip() {
  return (
    <section className="section bg-leaf-pattern">
      <Container>
        <Reveal>
          <div className="rounded-3xl border border-forest-100 bg-surface p-8 shadow-soft">
            <p className="text-center text-sm font-semibold uppercase tracking-wider text-leaf-600">
              Registered, accountable &amp; transparent
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {credentials.map((c) => (
                <div key={c.label} className="flex flex-col items-center gap-3 text-center">
                  {c.image ? (
                    <img
                      src={c.image}
                      alt={c.label}
                      loading="lazy"
                      className="h-16 w-16 object-contain"
                    />
                  ) : (
                    <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-forest-600 text-white">
                      <Icon name={c.icon ?? 'ShieldCheck'} size={28} strokeWidth={1.75} />
                    </span>
                  )}
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wide text-muted">
                      {c.label}
                    </div>
                    <div className="mt-0.5 text-sm font-bold text-forest-900">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
