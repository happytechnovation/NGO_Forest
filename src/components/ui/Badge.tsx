import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Tone = 'leaf' | 'forest' | 'amber' | 'neutral';

const tones: Record<Tone, string> = {
  leaf: 'bg-leaf-100 text-leaf-700',
  forest: 'bg-forest-100 text-forest-700',
  amber: 'bg-amber-100 text-amber-700',
  neutral: 'bg-forest-50 text-muted',
};

export function Badge({
  children,
  tone = 'leaf',
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold capitalize',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
