import { useState } from 'react';
import { Popover } from 'radix-ui';
import { ChevronDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const MAX_RESULTS = 10;

export default function FilterCombobox({
  value,
  onValueChange,
  options,
  placeholder = 'Filter…',
  allLabel = 'All',
  className,
}: {
  value: string | null;
  onValueChange: (value: string | null) => void;
  options: string[];
  placeholder?: string;
  allLabel?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = options.filter((option) =>
    option.toLowerCase().includes(search.trim().toLowerCase())
  );
  const visible = filtered.slice(0, MAX_RESULTS);

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) setSearch('');
  }

  function handleSelect(next: string | null) {
    onValueChange(next);
    handleOpenChange(false);
  }

  return (
    <Popover.Root open={open} onOpenChange={handleOpenChange}>
      <Popover.Trigger asChild>
        <button
          type="button"
          className={cn(
            'flex h-8 items-center justify-between gap-1.5 rounded-lg border border-input bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap text-heading transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
            className
          )}
        >
          <span className={cn('truncate', !value && 'text-muted-foreground')}>
            {value ?? placeholder}
          </span>
          <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="start"
          sideOffset={4}
          className="z-50 w-(--radix-popover-trigger-width) min-w-48 overflow-hidden rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95"
        >
          <div className="flex items-center gap-2 border-b border-border px-2.5 py-2">
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <input
              autoFocus
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search…"
              className="w-full bg-transparent text-sm text-heading outline-none placeholder:text-muted-foreground"
            />
          </div>
          <div className="max-h-64 overflow-y-auto p-1">
            <button
              type="button"
              onClick={() => handleSelect(null)}
              className={cn(
                'block w-full rounded-md px-2 py-1.5 text-left text-sm hover:bg-accent/10',
                value === null && 'text-accent'
              )}
            >
              {allLabel}
            </button>
            {visible.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleSelect(option)}
                className={cn(
                  'block w-full truncate rounded-md px-2 py-1.5 text-left text-sm hover:bg-accent/10',
                  value === option && 'text-accent'
                )}
              >
                {option}
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="px-2 py-1.5 text-sm text-muted-foreground">No matches.</p>
            )}
            {filtered.length > MAX_RESULTS && (
              <p className="px-2 py-1.5 text-xs text-muted-foreground">
                Showing first {MAX_RESULTS} of {filtered.length} — keep typing to narrow down.
              </p>
            )}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
