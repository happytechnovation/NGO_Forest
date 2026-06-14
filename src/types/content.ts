/**
 * TypeScript interfaces for every JSON content file in src/data.
 * Editing a JSON file is type-checked against these shapes.
 */

export interface NavItem {
  label: string;
  to: string;
}

export interface SocialLink {
  platform: 'facebook' | 'instagram' | 'linkedin' | 'twitter' | 'youtube' | 'whatsapp';
  url: string;
}

export interface SiteConfig {
  brand: string;
  shortName: string;
  tagline: string;
  description: string;
  logo: string;
  nav: NavItem[];
  whatsapp: {
    number: string; // international format, digits only e.g. 919449851750
    message: string;
  };
  socials: SocialLink[];
  seo: {
    title: string;
    description: string;
  };
}

export interface ContactInfo {
  addresses: { label: string; value: string }[];
  phones: string[];
  emails: string[];
  hours?: string;
  mapEmbedUrl: string;
}

export interface Cta {
  label: string;
  to: string;
}

export interface HomeContent {
  hero: {
    eyebrow: string;
    heading: string;
    highlight: string;
    subheading: string;
    media: string; // image/video path in /resources
    primaryCta: Cta;
    secondaryCta: Cta;
  };
  intro: {
    eyebrow: string;
    heading: string;
    body: string[];
    image: string;
    points: string[];
  };
  vision: { icon: string; title: string; text: string };
  mission: { icon: string; title: string; text: string };
  values: { icon: string; title: string; text: string }[];
}

export interface ServiceItem {
  icon: string; // lucide icon name
  title: string;
  description: string;
}

export interface TeamMember {
  name: string;
  title: string;
  bio: string;
  photo: string;
  credentials?: string;
}

export interface ProjectItem {
  title: string;
  period: string;
  description: string;
  image: string;
  status: 'ongoing' | 'completed' | 'upcoming';
}

export interface PartnerItem {
  name: string;
  logo?: string;
  url?: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  image: string;
  body: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ImpactStat {
  icon: string;
  value: number;
  suffix: string;
  label: string;
}

export interface GetInvolvedItem {
  icon: string;
  title: string;
  blurb: string;
  cta: Cta;
}

export interface FieldStory {
  title: string;
  location: string;
  image: string;
  summary: string;
}

export interface CredentialItem {
  label: string;
  value: string;
  icon?: string;
  image?: string;
}

export interface DonateContent {
  heading: string;
  blurb: string;
  taxNote: string;
  methods: { label: string; value: string }[];
  cta: Cta;
}
