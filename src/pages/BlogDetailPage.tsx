import { Link, useParams } from 'react-router-dom';
import { CalendarDays, User, ArrowLeft } from 'lucide-react';
import { blogs } from '@/data';
import { Seo } from '@/components/Seo';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { NotFoundPage } from './NotFoundPage';
import { formatDate } from '@/lib/date';

export function BlogDetailPage() {
  const { slug } = useParams();
  const post = blogs.find((p) => p.slug === slug);

  if (!post) return <NotFoundPage />;

  return (
    <article>
      <Seo
        title={post.title}
        description={post.excerpt}
        image={`https://treelands.happytechnovation.com${post.image}`}
      />
      {/* Header */}
      <header className="relative flex min-h-[50vh] items-end overflow-hidden pt-20">
        <img src={post.image} alt={post.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/50 to-forest-900/30" />
        <Container className="relative py-12">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-leaf-300 hover:text-white"
          >
            <ArrowLeft size={16} /> Back to blogs
          </Link>
          <h1 className="mt-4 max-w-3xl text-3xl font-extrabold text-white sm:text-4xl">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-forest-50/90">
            <span className="flex items-center gap-1.5">
              <CalendarDays size={16} /> {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <User size={16} /> {post.author}
            </span>
          </div>
        </Container>
      </header>

      {/* Body */}
      <section className="section">
        <Container className="max-w-3xl">
          {post.body.map((para) => (
            <p key={para.slice(0, 24)} className="mb-5 text-base leading-relaxed text-forest-800">
              {para}
            </p>
          ))}

          <div className="mt-10 rounded-2xl bg-forest-50 p-6 text-center">
            <p className="font-semibold text-forest-900">Want to know more about our work?</p>
            <Button to="/contact" className="mt-4">
              Get in touch
            </Button>
          </div>
        </Container>
      </section>
    </article>
  );
}
