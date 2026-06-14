import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getInvolved } from '@/data';
import { Seo } from '@/components/Seo';
import { PageHeader } from '@/components/layout/PageHeader';
import { Container } from '@/components/ui/Container';
import { IconBadge } from '@/components/ui/IconBadge';
import { Reveal } from '@/components/ui/Reveal';
import { Donate } from '@/components/sections/Donate';

export function GetInvolvedPage() {
  return (
    <>
      <Seo
        title="Get Involved"
        description="Partner with us on CSR projects, request forestry consultancy, volunteer, or donate (80G tax-exempt) to support Treelands Foundation's conservation work."
      />
      <PageHeader
        title="Get Involved"
        subtitle="There are many ways to help us grow a greener, more sustainable future. Find the one that's right for you."
        image="/resources/gallery/forest-1.webp"
      />

      <section className="section">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2">
            {getInvolved.map((item, i) => (
              <Reveal key={item.title} delay={(i % 2) * 0.08}>
                <Link
                  to={item.cta.to}
                  className="group flex h-full gap-5 rounded-2xl border border-forest-100 bg-surface p-7 shadow-soft transition hover:-translate-y-1 hover:shadow-card"
                >
                  <IconBadge name={item.icon} tone="leaf" size="lg" />
                  <div>
                    <h3 className="text-xl font-bold text-forest-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{item.blurb}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-leaf-600">
                      {item.cta.label}
                      <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <Donate />
    </>
  );
}
