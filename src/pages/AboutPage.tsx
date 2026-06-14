import { home } from '@/data';
import { Seo } from '@/components/Seo';
import { PageHeader } from '@/components/layout/PageHeader';
import { Container } from '@/components/ui/Container';
import { IconBadge } from '@/components/ui/IconBadge';
import { Reveal } from '@/components/ui/Reveal';
import { VisionMission } from '@/components/sections/VisionMission';
import { Values } from '@/components/sections/Values';
import { TrustStrip } from '@/components/sections/TrustStrip';
import { CtaBand } from '@/components/sections/CtaBand';

const areasOfWork = [
  { icon: 'TreePine', title: 'Forestry Development', text: 'Forestry development projects implemented through partnerships with government and communities.' },
  { icon: 'Briefcase', title: 'Consultancy & Research', text: 'Planning, research and forest-product marketing consultancy for institutions.' },
  { icon: 'Lightbulb', title: 'Entrepreneur Incubation', text: 'Incubating and networking local entrepreneurs in the natural-resource economy.' },
  { icon: 'Users', title: 'Skill Building', text: 'Skill building and employment creation through natural-resource management.' },
  { icon: 'Landmark', title: 'Government Liaison', text: 'Liaising with government on forestry, wildlife and environmental issues.' },
  { icon: 'Leaf', title: 'Conservation', text: 'Conserving and expanding the natural resource base without a profit motive.' },
];

export function AboutPage() {
  const { intro } = home;
  return (
    <>
      <Seo
        title="About Us"
        description="Treelands Foundation is a Section 8 non-profit run by retired senior IFS forest officers with 100+ years of combined experience in forestry, wildlife, biodiversity and climate change."
      />
      <PageHeader
        title="About Treelands Foundation"
        subtitle="Your friend, philosopher and guide on sustainable natural resources, climate change and eco-friendly living."
      />

      {/* Intro */}
      <section className="section">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <img
              src={intro.image}
              alt="Our areas of work"
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-card"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <span className="eyebrow">
              <span className="h-px w-6 bg-current" /> Who We Are
            </span>
            <h2 className="mt-3 text-3xl font-bold text-forest-900 sm:text-4xl">{intro.heading}</h2>
            {intro.body.map((p) => (
              <p key={p.slice(0, 20)} className="mt-4 leading-relaxed text-muted">
                {p}
              </p>
            ))}
            <blockquote className="mt-6 rounded-2xl border-l-4 border-leaf-500 bg-leaf-50 p-5 text-forest-800">
              "All living beings are our fellow travellers on this planet earth! They have as much
              right to live in peace and happiness as we human beings do!"
            </blockquote>
          </Reveal>
        </Container>
      </section>

      <VisionMission />

      {/* Areas of work */}
      <section className="section">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">
              <span className="h-px w-6 bg-current" /> What We Focus On
            </span>
            <h2 className="mt-3 text-3xl font-bold text-forest-900 sm:text-4xl">Our Areas of Work</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {areasOfWork.map((area, i) => (
              <Reveal key={area.title} delay={(i % 3) * 0.08}>
                <div className="flex h-full gap-4 rounded-2xl border border-forest-100 bg-surface p-6 shadow-soft">
                  <IconBadge name={area.icon} tone="leaf" />
                  <div>
                    <h3 className="font-bold text-forest-900">{area.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{area.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <Values />
      <TrustStrip />
      <CtaBand />
    </>
  );
}
