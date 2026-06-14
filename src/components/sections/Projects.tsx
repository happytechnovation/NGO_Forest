import { ArrowRight } from 'lucide-react';
import { projects } from '@/data';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { ProjectCard } from '@/components/cards/ProjectCard';

export function Projects({ limit }: { limit?: number }) {
  const list = limit ? projects.slice(0, limit) : projects;
  return (
    <section className="section">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="On the Ground"
            title="Our Projects"
            subtitle="Long-term programmes restoring biodiversity and supporting communities across Karnataka."
            className="md:mb-0"
          />
          <Button to="/gallery" variant="outline" className="shrink-0">
            View gallery <ArrowRight size={18} />
          </Button>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((project, i) => (
            <Reveal key={project.title} delay={(i % 4) * 0.08}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
