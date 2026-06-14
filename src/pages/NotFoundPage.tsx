import { TreePine } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export function NotFoundPage() {
  return (
    <section className="flex min-h-[70vh] items-center bg-leaf-pattern pt-20">
      <Container className="text-center">
        <TreePine size={64} className="mx-auto text-leaf-500" />
        <h1 className="mt-6 text-5xl font-extrabold text-forest-900">404</h1>
        <p className="mt-3 text-lg text-muted">
          This trail leads nowhere — the page you're looking for can't be found.
        </p>
        <Button to="/" className="mt-8">
          Back to home
        </Button>
      </Container>
    </section>
  );
}
