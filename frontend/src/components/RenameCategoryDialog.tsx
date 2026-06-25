import { useState } from 'react';
import type { FormEvent } from 'react';
import { Pencil } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAdmin } from '../context/AdminContext';
import { renameSkillCategory, isAxiosValidationError } from '../services/api';

export default function RenameCategoryDialog({
  category,
  count,
  onRenamed,
}: {
  category: string;
  count: number;
  onRenamed: () => void;
}) {
  const { token } = useAdmin();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(category);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!token) return null;

  function handleOpenChange(value: boolean) {
    if (value) setName(category);
    setOpen(value);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await renameSkillCategory(category, name.trim(), token!);
      setOpen(false);
      onRenamed();
    } catch (err) {
      setError(
        isAxiosValidationError(err)
          ? err.response.data.message
          : 'Something went wrong renaming the category.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon-xs" title="Rename category">
          <Pencil />
          <span className="sr-only">Rename category</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Rename "{category}"</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="rename-category-name">New name</Label>
            <Input
              id="rename-category-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              autoFocus
            />
            <p className="text-xs text-text-muted">
              Renames this category across all {count} skill{count === 1 ? '' : 's'} that use it.
            </p>
          </div>

          {error && <p className="text-sm text-red-300">{error}</p>}

          <DialogFooter>
            <Button type="submit" disabled={submitting || !name.trim()}>
              {submitting ? 'Saving…' : 'Rename'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
