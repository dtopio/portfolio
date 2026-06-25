import { useFetch } from '../hooks/useFetch';
import { CV_DOWNLOAD_URL, getProfile } from '../services/api';

export default function Footer() {
  const year = new Date().getFullYear();
  const { data: profile } = useFetch(['profile'], getProfile);

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-8 text-sm text-text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {year} Danil Top. Built with React &amp; Laravel.</p>

        <div className="flex flex-wrap items-center gap-4">
          <a href="https://github.com/dtopio" target="_blank" rel="noreferrer" className="hover:text-accent">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/danil-top-b07b1540a" target="_blank" rel="noreferrer" className="hover:text-accent">
            LinkedIn
          </a>
          <a href="mailto:topdanil.dev@gmail.com" className="hover:text-accent">
            Email
          </a>
          {profile?.has_cv && (
            <a href={CV_DOWNLOAD_URL} download className="hover:text-accent">
              Download CV
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
