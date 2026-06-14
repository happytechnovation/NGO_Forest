import { useMemo, useState } from 'react';
import { gallery } from '@/data';
import { Seo } from '@/components/Seo';
import { PageHeader } from '@/components/layout/PageHeader';
import { Container } from '@/components/ui/Container';
import { Lightbox } from '@/components/ui/Lightbox';
import { LazyImage } from '@/components/ui/LazyImage';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/cn';

export function GalleryPage() {
  const categories = useMemo(
    () => ['All', ...Array.from(new Set(gallery.map((g) => g.category)))],
    [],
  );
  const [active, setActive] = useState('All');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = useMemo(
    () => (active === 'All' ? gallery : gallery.filter((g) => g.category === active)),
    [active],
  );

  return (
    <>
      <Seo
        title="Gallery"
        description="Photos from Treelands Foundation's forestry, conservation and community projects across Karnataka — forests, landscapes and people."
      />
      <PageHeader
        title="Gallery"
        subtitle="Forests, landscapes, projects and the communities we serve."
        image="/resources/media/forest-hero.jpg"
      />
      <section className="section">
        <Container>
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition',
                  active === cat
                    ? 'bg-forest-600 text-white shadow-soft'
                    : 'bg-forest-50 text-forest-700 hover:bg-forest-100',
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
            {filtered.map((img, i) => {
              const globalIndex = gallery.indexOf(img);
              return (
                <Reveal key={img.src} delay={(i % 6) * 0.05}>
                  <button
                    onClick={() => setLightbox(globalIndex)}
                    className="group block w-full overflow-hidden rounded-2xl shadow-soft"
                  >
                    <LazyImage
                      src={img.src}
                      alt={img.alt}
                      className="w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </button>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <Lightbox
        images={gallery}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onNavigate={setLightbox}
      />
    </>
  );
}
