import type { TeamMember } from '@/types/content';
import { LazyImage } from '@/components/ui/LazyImage';

export function TeamCard({ member, expanded = false }: { member: TeamMember; expanded?: boolean }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-forest-100 bg-surface shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
      <div className="relative aspect-[4/5] overflow-hidden bg-forest-50">
        <LazyImage
          src={member.photo}
          alt={member.name}
          className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-950/85 to-transparent p-4">
          <h3 className="text-base font-bold leading-tight text-white">{member.name}</h3>
          <p className="text-xs font-medium text-leaf-300">{member.title}</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        {member.credentials && (
          <p className="text-xs font-semibold uppercase tracking-wide text-leaf-600">
            {member.credentials}
          </p>
        )}
        <p
          className={
            'mt-2 text-sm leading-relaxed text-muted ' + (expanded ? '' : 'line-clamp-4')
          }
        >
          {member.bio}
        </p>
      </div>
    </article>
  );
}
