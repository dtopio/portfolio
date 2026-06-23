import Section from '../components/Section';
import EditProfileDialog from '../components/EditProfileDialog';
import type { Profile } from '../types';

const STACK = [
  'Vue 3',
  'React',
  'TypeScript',
  'Laravel',
  'Node.js',
  'Tailwind CSS',
  'PostgreSQL',
  'MongoDB',
];

const DEFAULT_BIO = `I'm a dual-degree Computer Science (Fort Hays State University, Kansas) and Information Technology Management (American University of Phnom Penh) graduate. As a Software Developer and Teaching Assistant at AUPP, I shipped end-to-end features on two large-scale platforms — Request Engine and a High School Student Information System — spanning UI/UX, REST API integration, database operations, and performance optimisation.

Outside of work, I'm into gaming, open-source, content creation on YouTube, and tinkering with my Arch Linux + Hyprland setup. I enjoy owning features end-to-end and applying best practices across the full development lifecycle.`;

export default function About({
  profile,
  onUpdated,
}: {
  profile: Profile | null;
  onUpdated: () => void;
}) {
  const paragraphs = (profile?.bio ?? DEFAULT_BIO).split(/\n{2,}/).filter(Boolean);

  return (
    <Section
      id="about"
      index={1}
      title="About"
      action={profile && <EditProfileDialog profile={profile} onUpdated={onUpdated} />}
    >
      <div className="grid gap-8 sm:grid-cols-3">
        <div className="space-y-4 text-text-muted sm:col-span-2">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <ul className="flex flex-wrap gap-2 self-start">
          {STACK.map((item) => (
            <li
              key={item}
              className="rounded-md bg-surface px-2.5 py-1 font-mono text-xs text-accent ring-1 ring-border"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
