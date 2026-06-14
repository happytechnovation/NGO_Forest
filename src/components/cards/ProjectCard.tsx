import { CalendarRange } from 'lucide-react';
import type { ProjectItem } from '@/types/content';
import { Badge } from '@/components/ui/Badge';
import { LazyImage } from '@/components/ui/LazyImage';

export function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-forest-100 bg-surface shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
      <div className="relative aspect-[16/10] overflow-hidden">
        <LazyImage
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3">
          <Badge tone={project.status === 'completed' ? 'forest' : 'leaf'}>{project.status}</Badge>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-1.5 text-xs font-medium text-leaf-600">
          <CalendarRange size={14} />
          {project.period}
        </div>
        <h3 className="mt-2 text-base font-bold leading-snug text-forest-900">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>
      </div>
    </article>
  );
}
