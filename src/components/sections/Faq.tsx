import { faq } from '@/data';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Accordion } from '@/components/ui/Accordion';
import { Reveal } from '@/components/ui/Reveal';

export function Faq() {
  return (
    <section className="section bg-forest-50">
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow="Good to Know"
          title="Frequently Asked Questions"
          subtitle="Common questions about tree planting and how we can help."
        />
        <Reveal className="mt-10">
          <Accordion items={faq} />
        </Reveal>
      </Container>
    </section>
  );
}
