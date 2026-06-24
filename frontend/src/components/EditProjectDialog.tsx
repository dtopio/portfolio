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
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useAdmin } from '../context/AdminContext';
import { updateProject, isAxiosValidationError } from '../services/api';
import type { Project } from '../types';

function toForm(project: Project) {
  return {
    title: project.title,
    description: project.description,
    techStack: project.tech_stack.join(', '),
    tags: project.tags.join(', '),
    githubUrl: project.github_url ?? '',
    demoUrl: project.demo_url ?? '',
    featured: project.featured,
  };
}

export default function EditProjectDialog({
  project,
  onUpdated,
}: {
  project: Project;
  onUpdated: () => void;
}) {
  const { token } = useAdmin();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(() => toForm(project));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!token) return null;

  function handleOpenChange(value: boolean) {
    if (value) setForm(toForm(project));
    setOpen(value);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await updateProject(
        project.id,
        {
          title: form.title,
          description: form.description,
          tech_stack: form.techStack
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean),
          tags: form.tags
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean),
          github_url: form.githubUrl.trim() || null,
          demo_url: form.demoUrl.trim() || null,
          featured: form.featured,
        },
        token!
      );
      setOpen(false);
      onUpdated();
    } catch (err) {
      setError(
        isAxiosValidationError(err)
          ? err.response.data.message
          : 'Something went wrong updating the project.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon-sm" title="Edit project">
          <Pencil />
          <span className="sr-only">Edit project</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="edit-project-title">Title</Label>
            <Input
              id="edit-project-title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-project-description">Description</Label>
            <Textarea
              id="edit-project-description"
              rows={10}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-project-tech">Tech stack (comma-separated)</Label>
            <Input
              id="edit-project-tech"
              placeholder="Vue 3, Laravel, PostgreSQL"
              value={form.techStack}
              onChange={(e) => setForm({ ...form, techStack: e.target.value })}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-project-tags">Tags (comma-separated)</Label>
            <Input
              id="edit-project-tags"
              placeholder="Full-stack, Personal Project"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-project-github">GitHub URL</Label>
            <Input
              id="edit-project-github"
              type="url"
              value={form.githubUrl}
              onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-project-demo">Demo URL</Label>
            <Input
              id="edit-project-demo"
              type="url"
              value={form.demoUrl}
              onChange={(e) => setForm({ ...form, demoUrl: e.target.value })}
            />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="edit-project-featured"
              checked={form.featured}
              onCheckedChange={(checked) => setForm({ ...form, featured: checked === true })}
            />
            <Label htmlFor="edit-project-featured">Featured</Label>
          </div>

          {error && <p className="text-sm text-red-300">{error}</p>}

          <DialogFooter>
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Saving…' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
