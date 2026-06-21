import { useState } from 'react';
import type { FormEvent } from 'react';
import Section from '../components/Section';
import { isAxiosValidationError, postContact } from '../services/api';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');
    setFieldErrors({});

    const formEl = event.currentTarget;
    const form = new FormData(formEl);
    const payload = {
      name: String(form.get('name') ?? ''),
      email: String(form.get('email') ?? ''),
      message: String(form.get('message') ?? ''),
    };

    try {
      const message = await postContact(payload);
      setStatus('success');
      setFeedback(message);
      formEl.reset();
    } catch (error) {
      setStatus('error');
      if (isAxiosValidationError(error)) {
        setFieldErrors(error.response.data.errors);
        setFeedback(error.response.data.message);
      } else {
        setFeedback('Something went wrong sending your message. Please try again.');
      }
    }
  }

  return (
    <Section id="contact" index={5} title="Contact" subtitle="Have a project in mind? Let's talk.">
      <form onSubmit={handleSubmit} className="mx-auto max-w-lg space-y-4 text-left">
        <div>
          <label htmlFor="name" className="text-sm text-text-muted">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-heading outline-none focus:border-accent"
          />
          {fieldErrors.name && (
            <p className="mt-1 text-xs text-red-300">{fieldErrors.name[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="text-sm text-text-muted">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-heading outline-none focus:border-accent"
          />
          {fieldErrors.email && (
            <p className="mt-1 text-xs text-red-300">{fieldErrors.email[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="text-sm text-text-muted">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-heading outline-none focus:border-accent"
          />
          {fieldErrors.message && (
            <p className="mt-1 text-xs text-red-300">{fieldErrors.message[0]}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-bg transition hover:bg-accent-dark disabled:opacity-60"
        >
          {status === 'submitting' ? 'Sending…' : 'Send Message'}
        </button>

        {status === 'success' && (
          <p className="text-sm text-accent">{feedback}</p>
        )}
        {status === 'error' && Object.keys(fieldErrors).length === 0 && (
          <p className="text-sm text-red-300">{feedback}</p>
        )}
      </form>
    </Section>
  );
}
