import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

export function CtaBand() {
  return (
    <section className="relative overflow-hidden">
      <img
        src="/resources/media/forest-deep.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-forest-950/80" />
      <Container className="relative py-20 text-center">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-3xl font-bold text-white sm:text-4xl">
            Join us in building a green, prosperous and sustainable future
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-forest-50/90">
            Partner with us, seek our consultancy, or volunteer — every action helps grow a greener
            tomorrow.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button to="/get-involved" size="lg">
              Get Involved <ArrowRight size={18} />
            </Button>
            <Button
              to="/contact"
              size="lg"
              variant="outline"
              className="border-white/70 text-white hover:bg-white/10"
            >
              Contact Us
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
