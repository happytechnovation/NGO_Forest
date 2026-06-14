/**
 * Typed, central access to all JSON content.
 * Components import from here, e.g. `import { services, site } from '@/data'`.
 */
import siteRaw from './site.config.json';
import contactRaw from './contact.json';
import homeRaw from './home.json';
import servicesRaw from './services.json';
import teamRaw from './team.json';
import projectsRaw from './projects.json';
import partnersRaw from './partners.json';
import galleryRaw from './gallery.json';
import blogsRaw from './blogs.json';
import faqRaw from './faq.json';
import impactRaw from './impact.json';
import getInvolvedRaw from './getInvolved.json';
import storiesRaw from './stories.json';
import credentialsRaw from './credentials.json';
import donateRaw from './donate.json';
import { dynamicGalleryImages } from '@/lib/galleryImages';

import type {
  SiteConfig,
  ContactInfo,
  HomeContent,
  ServiceItem,
  TeamMember,
  ProjectItem,
  PartnerItem,
  GalleryImage,
  BlogPost,
  FaqItem,
  ImpactStat,
  GetInvolvedItem,
  FieldStory,
  CredentialItem,
  DonateContent,
} from '@/types/content';

export const site = siteRaw as SiteConfig;
export const contact = contactRaw as ContactInfo;
export const home = homeRaw as HomeContent;
export const services = servicesRaw as ServiceItem[];
export const team = teamRaw as TeamMember[];
export const projects = projectsRaw as ProjectItem[];
export const partners = partnersRaw as PartnerItem[];
// Curated entries from gallery.json, plus any images dropped into src/assets/gallery/<Category>/
export const gallery = [...(galleryRaw as GalleryImage[]), ...dynamicGalleryImages];
export const blogs = blogsRaw as BlogPost[];
export const faq = faqRaw as FaqItem[];
export const impact = impactRaw as ImpactStat[];
export const getInvolved = getInvolvedRaw as GetInvolvedItem[];
export const stories = storiesRaw as FieldStory[];
export const credentials = credentialsRaw as CredentialItem[];
export const donate = donateRaw as DonateContent;
