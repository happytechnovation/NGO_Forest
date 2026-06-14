import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { site } from '@/data';

export function WhatsAppFab() {
  const href = `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(
    site.whatsapp.message,
  )}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-5 right-5 z-50 inline-flex items-center justify-center"
    >
      <span className="absolute inline-flex h-14 w-14 animate-pulse-ring rounded-full bg-[#25D366]/60" />
      <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-card transition group-hover:scale-105">
        <WhatsAppIcon size={30} />
      </span>
    </a>
  );
}
