/**
 * Curated icon registry. Maps a lucide icon NAME (string, stored in JSON)
 * to its component. Only the icons listed here are bundled, keeping the build small.
 *
 * To use a new icon in JSON: import it below and add it to the `registry`.
 */
import {
  Leaf,
  Eye,
  Target,
  Users,
  Scale,
  Sprout,
  Building2,
  TreePine,
  ClipboardCheck,
  Calculator,
  GraduationCap,
  FolderKanban,
  MapPin,
  Handshake,
  HandHeart,
  Gift,
  ShieldCheck,
  FileText,
  Award,
  Landmark,
  Briefcase,
  Lightbulb,
  type LucideIcon,
  type LucideProps,
} from 'lucide-react';

const registry: Record<string, LucideIcon> = {
  Leaf,
  Eye,
  Target,
  Users,
  Scale,
  Sprout,
  Building2,
  TreePine,
  ClipboardCheck,
  Calculator,
  GraduationCap,
  FolderKanban,
  MapPin,
  Handshake,
  HandHeart,
  Gift,
  ShieldCheck,
  FileText,
  Award,
  Landmark,
  Briefcase,
  Lightbulb,
};

interface IconProps extends LucideProps {
  name: string;
}

export function Icon({ name, ...props }: IconProps) {
  const LucideIcon = registry[name] ?? Leaf; // Leaf fallback so a typo never crashes
  return <LucideIcon {...props} />;
}
