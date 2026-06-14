import { Container } from '@/components/ui/Container';

/** Reusable inner-page banner (below the fixed navbar). */
export function PageHeader({
  title,
  subtitle,
  image = '/resources/media/forest-deep.jpg',
}: {
  title: string;
  subtitle?: string;
  image?: string;
}) {
  return (
    <section className="relative flex min-h-[40vh] items-center overflow-hidden pt-20">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-forest-950/85 via-forest-900/70 to-forest-800/50" />
      <Container className="relative py-16 text-center">
        <h1 className="text-4xl font-extrabold text-white sm:text-5xl">{title}</h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-base text-forest-50/90">{subtitle}</p>
        )}
      </Container>
    </section>
  );
}
