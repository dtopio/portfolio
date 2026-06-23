import type { Project } from '../types';
import EditProjectDialog from './EditProjectDialog';

export default function ProjectCard({
  project,
  onUpdated,
}: {
  project: Project;
  onUpdated: () => void;
}) {
  return (
    <article className="group flex flex-col rounded-xl border border-border bg-linear-to-br from-surface to-surface/60 p-6 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-lg font-semibold text-heading">{project.title}</h3>
        <div className="flex items-center gap-2">
          {project.featured && (
            <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-mono text-accent">
              featured
            </span>
          )}
          <EditProjectDialog project={project} onUpdated={onUpdated} />
        </div>
      </div>

      <p className="mt-3 flex-1 text-sm text-text-muted">{project.description}</p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {project.tech_stack.map((tech) => (
          <li
            key={tech}
            className="rounded-md bg-bg px-2 py-1 font-mono text-xs text-accent ring-1 ring-border"
          >
            {tech}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex gap-4 text-sm">
        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noreferrer"
            className="text-text-muted transition hover:text-accent"
          >
            GitHub →
          </a>
        )}
        {project.demo_url && (
          <a
            href={project.demo_url}
            target="_blank"
            rel="noreferrer"
            className="text-text-muted transition hover:text-accent"
          >
            Live demo →
          </a>
        )}
      </div>
    </article>
  );
}
