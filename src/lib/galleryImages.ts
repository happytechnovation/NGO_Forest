import type { GalleryImage } from '@/types/content';

/**
 * Drop-in gallery images: any image placed in src/assets/gallery/<Category>/<name>.<ext>
 * is picked up automatically (after `npm run dev` reload or `npm run build`) and
 * appears in the Gallery page under a category named after its folder.
 */
const modules = import.meta.glob<string>(
  '/src/assets/gallery/**/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}',
  { eager: true, query: '?url', import: 'default' },
);

function humanize(segment: string) {
  return segment
    .replace(/\.[^./]+$/, '')
    .replace(/[-_]+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export const dynamicGalleryImages: GalleryImage[] = Object.entries(modules)
  .map(([path, url]) => {
    const parts = path.split('/');
    const fileName = parts[parts.length - 1];
    const category = parts[parts.length - 2] || 'Gallery';
    return {
      src: url,
      alt: humanize(fileName),
      category: humanize(category),
    };
  })
  .sort((a, b) => a.src.localeCompare(b.src));
