import { motion } from 'framer-motion';
import { CV_DOWNLOAD_URL } from '../services/api';
import type { Profile } from '../types';

const DEFAULT_TAGLINE = 'Front-End Developer · Full-Stack Experience';

const DEFAULT_SUMMARY =
  'I specialise in **Vue**, **React** and **TypeScript**, with hands-on full-stack experience using **Laravel** and **Node.js** backends — from UI/UX and REST API integration to database design and performance tuning.';

function renderHighlighted(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <span key={index} className="font-mono text-accent">
          {part.slice(2, -2)}
        </span>
      );
    }
    return part;
  });
}

export default function Hero({ profile }: { profile: Profile | null }) {
  return (
    <section id="top" className="mx-auto max-w-5xl px-6 pt-24 pb-20 text-center sm:pt-32">
      <motion.p
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 font-mono text-sm text-accent"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        </span>
        {profile?.location ?? 'Phnom Penh, Cambodia'}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-gradient mt-5 text-4xl font-bold sm:text-6xl"
      >
        Danil Top
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-3 text-lg text-text-muted sm:text-xl"
      >
        {profile?.tagline ?? DEFAULT_TAGLINE}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mx-auto mt-4 max-w-xl text-text-muted"
      >
        {renderHighlighted(profile?.summary ?? DEFAULT_SUMMARY)}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-4"
      >
        <a
          href="#projects"
          className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-bg shadow-lg shadow-accent/25 transition hover:bg-accent-dark hover:shadow-accent/40"
        >
          View Projects
        </a>
        {profile?.has_cv && (
          <a
            href={CV_DOWNLOAD_URL}
            download
            className="rounded-lg border border-border bg-surface/60 px-5 py-2.5 text-sm font-medium text-heading transition hover:border-accent hover:text-accent"
          >
            Download CV
          </a>
        )}
        <a
          href="#contact"
          className="rounded-lg border border-border bg-surface/60 px-5 py-2.5 text-sm font-medium text-heading transition hover:border-accent hover:text-accent"
        >
          Contact Me
        </a>
      </motion.div>
    </section>
  );
}
