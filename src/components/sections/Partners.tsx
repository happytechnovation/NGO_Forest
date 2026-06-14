import { partners } from '@/data';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

export function Partners() {
  return (
    <section className="section">
      <Container>
        <SectionHeading
          eyebrow="Collaboration"
          title="Our Partners"
          subtitle="We work alongside leading government bodies and institutions to amplify our impact."
        />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {partners.map((partner, i) => (
            <Reveal key={partner.name} delay={(i % 3) * 0.06}>
              <div className="flex h-full min-h-[150px] flex-col items-center justify-center gap-3 rounded-2xl border border-forest-100 bg-white px-5 py-6 text-center transition hover:-translate-y-1 hover:border-leaf-300 hover:shadow-card">
                {partner.logo ? (
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    loading="lazy"
                    className="h-20 w-auto max-w-[150px] object-contain"
                  />
                ) : (
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-forest-50 text-2xl font-extrabold text-forest-600">
                    TP
                  </span>
                )}
                <span className="text-xs font-semibold leading-snug text-forest-800">
                  {partner.name}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
