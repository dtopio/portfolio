import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ZoomIn } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { useFetch } from '../hooks/useFetch';
import { getProject } from '../services/api';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import EditProjectDialog from '../components/EditProjectDialog';
import ToggleProjectFeaturedButton from '../components/ToggleProjectFeaturedButton';
import UploadProjectImagesButton from '../components/UploadProjectImagesButton';
import DeleteProjectImageButton from '../components/DeleteProjectImageButton';
import ImageLightbox from '../components/ImageLightbox';
import { staggerContainer, fadeUpItem } from '../lib/motion';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const { token } = useAdmin();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const { data: project, loading, error, refetch } = useFetch(['project', id], () =>
    getProject(Number(id))
  );

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <Link to="/projects" className="text-sm text-accent hover:underline">
        ← Back to all projects
      </Link>

      {loading && (
        <div className="mt-10">
          <LoadingState label="Loading project…" />
        </div>
      )}
      {error && (
        <div className="mt-10">
          <ErrorState message={error} />
        </div>
      )}

      {!loading && !error && project && (
        <>
          <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-semibold text-heading sm:text-3xl">
                  {project.title}
                </h1>
                {project.featured && (
                  <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-mono text-accent">
                    featured
                  </span>
                )}
              </div>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-surface px-2.5 py-1 text-xs text-text-muted ring-1 ring-border"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
            {token && (
              <div className="flex items-center gap-2">
                <ToggleProjectFeaturedButton project={project} onUpdated={refetch} />
                <EditProjectDialog project={project} onUpdated={refetch} />
              </div>
            )}
          </div>

          <p className="mt-6 max-w-3xl whitespace-pre-line text-text-muted">
            {project.description}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.tech_stack.map((tech) => (
              <li
                key={tech}
                className="rounded-md bg-bg px-2 py-1 font-mono text-xs text-accent ring-1 ring-border"
              >
                {tech}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex gap-4 text-sm">
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

          <div className="mt-10 flex items-center justify-between gap-3">
            <h2 className="font-mono text-sm uppercase tracking-wide text-text-muted">
              Screenshots
            </h2>
            <UploadProjectImagesButton projectId={project.id} onUploaded={refetch} />
          </div>

          {project.images.length === 0 ? (
            <p className="mt-4 text-text-muted">No screenshots added yet.</p>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="mt-4 grid gap-4 sm:grid-cols-2"
            >
              {project.images.map((image, index) => (
                <motion.div
                  key={image.id}
                  variants={fadeUpItem}
                  className="group relative overflow-hidden rounded-xl border border-border bg-surface"
                >
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(index)}
                    className="block w-full cursor-pointer"
                  >
                    <img src={image.url} alt={`${project.title} screenshot`} className="w-full" />
                    <span className="absolute inset-0 flex items-center justify-center bg-bg/0 opacity-0 transition group-hover:bg-bg/30 group-hover:opacity-100">
                      <ZoomIn className="h-6 w-6 text-heading" />
                    </span>
                  </button>
                  <DeleteProjectImageButton imageId={image.id} onDeleted={refetch} />
                </motion.div>
              ))}
            </motion.div>
          )}

          <ImageLightbox
            images={project.images}
            index={lightboxIndex}
            onIndexChange={setLightboxIndex}
            onClose={() => setLightboxIndex(null)}
            alt={`${project.title} screenshot`}
          />
        </>
      )}
    </div>
  );
}
