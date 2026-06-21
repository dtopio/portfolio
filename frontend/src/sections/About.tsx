import Section from '../components/Section';

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

export default function About() {
  return (
    <Section id="about" index={1} title="About">
      <div className="grid gap-8 sm:grid-cols-3">
        <p className="text-text-muted sm:col-span-2">
          I'm a dual-degree Computer Science (Fort Hays State University, Kansas) and
          Information Technology Management (American University of Phnom Penh)
          graduate. As a Software Developer and Teaching Assistant at AUPP, I shipped
          end-to-end features on two large-scale platforms — Request Engine and a
          High School Student Information System — spanning UI/UX, REST API
          integration, database operations, and performance optimisation.
          <br />
          <br />
          Outside of work, I'm into gaming, open-source, content creation on YouTube,
          and tinkering with my Arch Linux + Hyprland setup. I enjoy owning
          features end-to-end and applying best practices across the full
          development lifecycle.
        </p>

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
