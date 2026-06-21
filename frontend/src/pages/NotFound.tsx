import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center px-6 py-32 text-center">
      <p className="font-mono text-accent">404</p>
      <h1 className="mt-2 text-2xl font-semibold text-heading">Page not found</h1>
      <Link to="/" className="mt-6 text-sm text-accent hover:underline">
        ← Back home
      </Link>
    </div>
  );
}
