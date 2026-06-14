import { Link } from 'react-router-dom';
import { CalendarDays, ArrowRight } from 'lucide-react';
import { blogs } from '@/data';
import { Seo } from '@/components/Seo';
import { PageHeader } from '@/components/layout/PageHeader';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { formatDate } from '@/lib/date';

export function BlogsPage() {
  return (
    <>
      <Seo
        title="Blogs & Updates"
        description="Stories, case studies and insights from Treelands Foundation's work in forestry, agroforestry and conservation across Karnataka."
      />
      <PageHeader
        title="Blogs & Updates"
        subtitle="Stories, case studies and insights from our work in forestry and conservation."
        image="/resources/media/forest-deep.jpg"
      />
      <section className="section">
        <Container>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 0.08}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-forest-100 bg-surface shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
                  <Link to={`/blogs/${post.slug}`} className="block aspect-[16/10] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-leaf-600">
                      <CalendarDays size={14} /> {formatDate(post.date)}
                    </div>
                    <h3 className="mt-2 text-lg font-bold leading-snug text-forest-900">
                      <Link to={`/blogs/${post.slug}`} className="hover:text-leaf-600">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{post.excerpt}</p>
                    <Link
                      to={`/blogs/${post.slug}`}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-leaf-600"
                    >
                      Read more <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
