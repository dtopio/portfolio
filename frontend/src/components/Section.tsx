import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SectionProps {
  id: string;
  index: number;
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
}

export default function Section({ id, index, title, subtitle, action, children }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-5xl px-6 py-20"
    >
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-sm text-accent">{String(index).padStart(2, '0')}</span>
        <span className="h-px max-w-10 flex-1 bg-linear-to-r from-accent/60 to-transparent" />
        <h2 className="text-2xl font-semibold text-heading sm:text-3xl">{title}</h2>
      </div>

      {(subtitle || action) && (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          {subtitle ? <p className="text-text-muted">{subtitle}</p> : <span />}
          {action}
        </div>
      )}

      <div className="mt-10">{children}</div>
    </motion.section>
  );
}
