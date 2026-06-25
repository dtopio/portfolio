import { useState } from 'react';
import type { MouseEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Inbox } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import AdminUnlock from './AdminUnlock';
import PreviewToggleButton from './PreviewToggleButton';

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { token } = useAdmin();
  const location = useLocation();
  const navigate = useNavigate();

  function handleHashClick(event: MouseEvent<HTMLAnchorElement>, hash: string) {
    if (location.pathname === '/') return;
    event.preventDefault();
    navigate(`/${hash}`);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-bg/70 backdrop-blur-md">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a
          href="#top"
          onClick={(event) => handleHashClick(event, '#top')}
          className="text-gradient font-mono text-lg font-semibold"
        >
          danil<span className="text-accent">.</span>top
        </a>

        <ul className="hidden items-center gap-6 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(event) => handleHashClick(event, link.href)}
                className="group relative text-sm text-text-muted transition hover:text-accent"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
          {token && (
            <li>
              <Link
                to="/inbox"
                title="Inbox"
                aria-label="Inbox"
                className="flex items-center text-text-muted transition hover:text-accent"
              >
                <Inbox className="h-4 w-4" />
              </Link>
            </li>
          )}
          <li className="flex items-center">
            <PreviewToggleButton />
          </li>
          <li className="flex items-center">
            <AdminUnlock />
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="text-sm text-heading md:hidden"
          aria-label="Toggle navigation"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </nav>

      {open && (
        <ul className="flex flex-col gap-1 border-t border-border px-6 py-3 md:hidden">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(event) => {
                  handleHashClick(event, link.href);
                  setOpen(false);
                }}
                className="block py-2 text-sm text-text-muted transition hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
          {token && (
            <li>
              <Link
                to="/inbox"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 py-2 text-sm text-text-muted transition hover:text-accent"
              >
                <Inbox className="h-4 w-4" />
                Inbox
              </Link>
            </li>
          )}
          <li className="flex items-center gap-2 py-2">
            <PreviewToggleButton />
          </li>
          <li className="py-2">
            <AdminUnlock />
          </li>
        </ul>
      )}
    </header>
  );
}
