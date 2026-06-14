import { MapPin } from 'lucide-react';
import { stories } from '@/data';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { LazyImage } from '@/components/ui/LazyImage';

export function FieldStories() {
  return (
    <section className="section bg-forest-50">
      <Container>
        <SectionHeading
          eyebrow="Stories from the Field"
          title="Impact, where it matters most"
          subtitle="Real work, real communities. A glimpse into the landscapes and people we work with every day."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {stories.map((story, i) => (
            <Reveal key={story.title} delay={i * 0.1}>
              <article className="group relative h-80 overflow-hidden rounded-2xl shadow-soft">
                <LazyImage
                  src={story.image}
                  alt={story.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/55 to-forest-950/10" />
                <div className="absolute inset-x-0 bottom-0 p-6 pt-14 text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-leaf-300">
                    <MapPin size={14} />
                    {story.location}
                  </div>
                  <h3 className="mt-1.5 text-lg font-bold">{story.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/85">{story.summary}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
