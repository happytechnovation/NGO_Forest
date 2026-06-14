import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import { site, contact } from '@/data';
import { Container } from '@/components/ui/Container';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/FormField';

export function Footer() {
  return (
    <footer className="bg-forest-900 text-forest-50">
      {/* Newsletter band */}
      <Container className="border-b border-forest-700/60 py-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <h3 className="text-xl font-bold text-white">Stay rooted with us</h3>
            <p className="mt-1 text-sm text-forest-100/80">
              Get occasional updates on our forestry and conservation work.
            </p>
          </div>
          <form
            className="flex w-full max-w-md gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input type="email" placeholder="Your email address" aria-label="Email" required />
            <Button type="submit" variant="secondary">
              Subscribe
            </Button>
          </form>
        </div>
      </Container>

      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5">
            <img
              src={site.logo}
              alt={site.brand}
              className="h-12 w-12 rounded-full bg-white/95 p-0.5 shadow-soft"
            />
            <span className="font-display text-lg font-extrabold leading-none text-white">
              {site.shortName}
              <span className="block text-[10px] font-medium tracking-wide text-leaf-300">
                FOUNDATION
              </span>
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-forest-100/80">{site.description}</p>
          <SocialLinks className="mt-5" />
        </div>

        {/* Quick links */}
        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-leaf-300">
            Quick Links
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {site.nav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-forest-100/80 transition hover:text-leaf-300">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="lg:col-span-2">
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-leaf-300">
            Reach Us
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-forest-100/80">
            <li className="flex gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-leaf-400" />
              <span>{contact.addresses[0].value}</span>
            </li>
            <li className="flex gap-3">
              <Phone size={18} className="mt-0.5 shrink-0 text-leaf-400" />
              <span>
                {contact.phones.map((p, i) => (
                  <span key={p}>
                    <a href={`tel:${p.replace(/\s/g, '')}`} className="hover:text-leaf-300">
                      {p}
                    </a>
                    {i < contact.phones.length - 1 && ' · '}
                  </span>
                ))}
              </span>
            </li>
            <li className="flex gap-3">
              <Mail size={18} className="mt-0.5 shrink-0 text-leaf-400" />
              <span>
                {contact.emails.map((e, i) => (
                  <span key={e}>
                    <a href={`mailto:${e}`} className="hover:text-leaf-300">
                      {e}
                    </a>
                    {i < contact.emails.length - 1 && ' · '}
                  </span>
                ))}
              </span>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-forest-700/60 py-5">
        <Container className="flex flex-col items-center justify-between gap-2 text-xs text-forest-100/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.brand}. All rights reserved.
          </p>
          <p>Section 8 Non-Profit Company · Bengaluru, Karnataka</p>
        </Container>
      </div>
    </footer>
  );
}
