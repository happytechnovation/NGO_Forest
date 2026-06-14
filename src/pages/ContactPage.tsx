import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { contact } from '@/data';
import { Seo } from '@/components/Seo';
import { PageHeader } from '@/components/layout/PageHeader';
import { Container } from '@/components/ui/Container';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { ContactForm } from '@/components/sections/ContactForm';

export function ContactPage() {
  return (
    <>
      <Seo
        title="Contact Us"
        description="Get in touch with Treelands Foundation, Malleshwaram, Bengaluru 560003. Phone 080-23464866. Free technical advice, consultancy and CSR partnerships."
      />
      <PageHeader
        title="Contact Us"
        subtitle="Have a project, a question, or want to partner with us? We'd love to hear from you."
        image="/resources/media/forest-ridge.jpg"
      />

      <section className="section">
        <Container className="grid gap-12 lg:grid-cols-2">
          {/* Info */}
          <div>
            <span className="eyebrow">
              <span className="h-px w-6 bg-current" /> Reach Out
            </span>
            <h2 className="mt-3 text-3xl font-bold text-forest-900">Let's grow something together</h2>
            <p className="mt-3 leading-relaxed text-muted">
              Our team is happy to offer free technical advice, discuss consultancy, or explore a
              CSR partnership.
            </p>

            <ul className="mt-8 space-y-5">
              {contact.addresses.map((a) => (
                <li key={a.value} className="flex gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-leaf-100 text-leaf-700">
                    <MapPin size={20} />
                  </span>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                      {a.label}
                    </div>
                    <p className="text-sm text-forest-800">{a.value}</p>
                  </div>
                </li>
              ))}
              <li className="flex gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-leaf-100 text-leaf-700">
                  <Phone size={20} />
                </span>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted">Phone</div>
                  {contact.phones.map((p) => (
                    <a
                      key={p}
                      href={`tel:${p.replace(/\s/g, '')}`}
                      className="block text-sm text-forest-800 hover:text-leaf-600"
                    >
                      {p}
                    </a>
                  ))}
                </div>
              </li>
              <li className="flex gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-leaf-100 text-leaf-700">
                  <Mail size={20} />
                </span>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted">Email</div>
                  {contact.emails.map((e) => (
                    <a
                      key={e}
                      href={`mailto:${e}`}
                      className="block text-sm text-forest-800 hover:text-leaf-600"
                    >
                      {e}
                    </a>
                  ))}
                </div>
              </li>
              {contact.hours && (
                <li className="flex gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-leaf-100 text-leaf-700">
                    <Clock size={20} />
                  </span>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                      Office Hours
                    </div>
                    <p className="text-sm text-forest-800">{contact.hours}</p>
                  </div>
                </li>
              )}
            </ul>

            <div className="mt-8">
              <p className="text-sm font-semibold text-forest-800">Follow us</p>
              <SocialLinks className="mt-3" iconClassName="bg-forest-600" />
            </div>
          </div>

          {/* Form */}
          <div id="contact-form" className="scroll-mt-28">
            <ContactForm />
          </div>
        </Container>
      </section>

      {/* Map */}
      <section className="pb-16">
        <Container>
          <div className="overflow-hidden rounded-3xl border border-forest-100 shadow-soft">
            <iframe
              title="Treelands Foundation location"
              src={contact.mapEmbedUrl}
              className="h-80 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Container>
      </section>
    </>
  );
}
