import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import type { ComponentType } from 'react';
import { site } from '@/data';
import { cn } from '@/lib/cn';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

const iconFor: Record<string, ComponentType<{ size?: number | string }>> = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  twitter: Twitter,
  youtube: Youtube,
  whatsapp: WhatsAppIcon,
};

export function SocialLinks({ className, iconClassName }: { className?: string; iconClassName?: string }) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      {site.socials.map((s) => {
        const SocialIcon = iconFor[s.platform] ?? WhatsAppIcon;
        return (
          <a
            key={s.platform}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.platform}
            className={cn(
              'inline-flex h-10 w-10 items-center justify-center rounded-full bg-forest-700/60 text-white transition hover:bg-leaf-500',
              iconClassName,
            )}
          >
            <SocialIcon size={18} />
          </a>
        );
      })}
    </div>
  );
}
