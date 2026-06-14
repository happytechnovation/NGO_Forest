import { Icon } from '@/lib/icon';
import { cn } from '@/lib/cn';

type Tone = 'forest' | 'leaf' | 'bark' | 'light';

const tones: Record<Tone, string> = {
  forest: 'bg-forest-600 text-white',
  leaf: 'bg-leaf-100 text-leaf-700',
  bark: 'bg-bark/10 text-bark',
  light: 'bg-white text-forest-600 shadow-soft',
};

export function IconBadge({
  name,
  tone = 'leaf',
  size = 'md',
  className,
}: {
  name: string;
  tone?: Tone;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const box = size === 'lg' ? 'h-16 w-16' : size === 'sm' ? 'h-10 w-10' : 'h-14 w-14';
  const icon = size === 'lg' ? 30 : size === 'sm' ? 20 : 26;
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-2xl',
        box,
        tones[tone],
        className,
      )}
    >
      <Icon name={name} size={icon} strokeWidth={1.75} />
    </span>
  );
}
