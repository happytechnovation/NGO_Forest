import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { home } from '@/data';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export function Hero() {
  const { hero } = home;
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background media */}
      <img
        src={hero.media}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Layered overlay: darker on the left where the text sits, for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-forest-950/90 via-forest-950/70 to-forest-900/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-forest-950/30" />

      <Container className="relative z-10 py-32">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-leaf-200 ring-1 ring-white/20 backdrop-blur"
          >
            {hero.eyebrow}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            {hero.heading}{' '}
            <span className="text-leaf-400">{hero.highlight}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-forest-50/90 sm:text-lg"
          >
            {hero.subheading}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Button to={hero.primaryCta.to} size="lg">
              {hero.primaryCta.label} <ArrowRight size={18} />
            </Button>
            <Button
              to={hero.secondaryCta.to}
              size="lg"
              variant="outline"
              className="border-white/70 text-white hover:bg-white/10"
            >
              {hero.secondaryCta.label}
            </Button>
          </motion.div>
        </div>
      </Container>

      <a
        href="#impact"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/70 transition hover:text-white"
        aria-label="Scroll down"
      >
        <ChevronDown size={30} className="animate-float" />
      </a>
    </section>
  );
}
