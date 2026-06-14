import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export function Card({
  children,
  className,
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-forest-100 bg-surface p-6 shadow-soft',
        hover && 'transition-all duration-300 hover:-translate-y-1 hover:shadow-card',
        className,
      )}
    >
      {children}
    </div>
  );
}
