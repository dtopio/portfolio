import type { Experience } from '../types';

const TYPE_LABEL: Record<string, string> = {
  work: 'Work',
  teaching: 'Teaching',
  education: 'Education',
};

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export default function TimelineItem({ experience }: { experience: Experience }) {
  return (
    <div className="relative rounded-lg border-l-2 border-border py-2 pl-6 transition hover:border-accent/60">
      <span className="absolute -left-1.75 top-3.5 h-3 w-3 rounded-full bg-accent shadow-[0_0_0_4px_rgba(45,212,191,0.15)]" />

      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-base font-semibold text-heading">{experience.title}</h3>
        <span className="font-mono text-xs text-text-muted">
          {formatDate(experience.start_date)} —{' '}
          {experience.end_date ? formatDate(experience.end_date) : 'Present'}
        </span>
      </div>

      <p className="mt-1 text-sm text-accent">
        {experience.organization}
        {experience.location ? ` · ${experience.location}` : ''}
      </p>

      <p className="mt-1 text-xs font-mono uppercase tracking-wide text-text-muted">
        {TYPE_LABEL[experience.type] ?? experience.type}
      </p>

      {experience.description && (
        <p className="mt-2 text-sm text-text-muted">{experience.description}</p>
      )}
    </div>
  );
}
