import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { CheckCircle2, AlertCircle, Send, Loader2 } from 'lucide-react';
import { FormField, Input, Textarea } from '@/components/ui/FormField';
import { Button } from '@/components/ui/Button';
import { emailConfig, isEmailConfigured } from '@/lib/emailConfig';

type Status = 'idle' | 'sending' | 'success' | 'error';

const subjects = ['General enquiry', 'CSR partnership', 'Consultancy', 'Volunteering', 'Donation'];

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    // Fallback: if EmailJS isn't configured, open a pre-filled email instead.
    if (!isEmailConfigured) {
      const data = new FormData(form);
      const body = `Name: ${data.get('user_name')}\nEmail: ${data.get('user_email')}\nPhone: ${data.get(
        'user_phone',
      )}\nSubject: ${data.get('subject')}\n\n${data.get('message')}`;
      window.location.href = `mailto:${emailConfig.toEmail}?subject=${encodeURIComponent(
        `Website enquiry: ${data.get('subject')}`,
      )}&body=${encodeURIComponent(body)}`;
      return;
    }

    try {
      setStatus('sending');
      await emailjs.sendForm(
        emailConfig.serviceId!,
        emailConfig.templateId!,
        form,
        emailConfig.publicKey!,
      );
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-forest-100 bg-leaf-50 p-10 text-center shadow-soft">
        <CheckCircle2 size={56} className="text-leaf-600" />
        <h3 className="mt-4 text-2xl font-bold text-forest-900">Thank you!</h3>
        <p className="mt-2 text-muted">
          Your message has reached us. Our team will get back to you soon.
        </p>
        <Button className="mt-6" onClick={() => setStatus('idle')}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="rounded-3xl border border-forest-100 bg-surface p-7 shadow-soft sm:p-8"
    >
      <h3 className="text-xl font-bold text-forest-900">Send us a message</h3>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <FormField label="Full name" htmlFor="user_name" required>
          <Input id="user_name" name="user_name" placeholder="Your name" required />
        </FormField>
        <FormField label="Email" htmlFor="user_email" required>
          <Input id="user_email" name="user_email" type="email" placeholder="you@example.com" required />
        </FormField>
        <FormField label="Phone" htmlFor="user_phone">
          <Input id="user_phone" name="user_phone" placeholder="Optional" />
        </FormField>
        <FormField label="Subject" htmlFor="subject" required>
          <select
            id="subject"
            name="subject"
            required
            defaultValue=""
            className="w-full rounded-xl border border-forest-200 bg-white px-4 py-3 text-sm text-forest-900 focus:border-leaf-500 focus:outline-none focus:ring-2 focus:ring-leaf-200"
          >
            <option value="" disabled>
              Choose a topic
            </option>
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </FormField>
      </div>
      <div className="mt-4">
        <FormField label="Message" htmlFor="message" required>
          <Textarea id="message" name="message" rows={5} placeholder="How can we help?" required />
        </FormField>
      </div>

      {status === 'error' && (
        <p className="mt-4 flex items-center gap-2 text-sm text-red-600">
          <AlertCircle size={16} /> Something went wrong. Please try again or email us directly.
        </p>
      )}

      <Button type="submit" size="lg" className="mt-6 w-full" disabled={status === 'sending'}>
        {status === 'sending' ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Sending…
          </>
        ) : (
          <>
            <Send size={18} /> Send message
          </>
        )}
      </Button>

      {!isEmailConfigured && (
        <p className="mt-3 text-center text-xs text-muted">
          Submitting will open your email app. (Connect EmailJS in <code>.env</code> to send directly.)
        </p>
      )}
    </form>
  );
}
