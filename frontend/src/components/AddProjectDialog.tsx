import { useState } from 'react';
import type { FormEvent } from 'react';
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
import { createProject, isAxiosValidationError } from '../services/api';

const EMPTY = {
  title: '',
  description: '',
  techStack: '',
  tags: '',
  githubUrl: '',
  demoUrl: '',
  featured: false,
};

export default function AddProjectDialog({ onCreated }: { onCreated: () => void }) {
  const { token } = useAdmin();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!token) return null;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await createProject(
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
      setForm(EMPTY);
      setOpen(false);
      onCreated();
    } catch (err) {
      setError(
        isAxiosValidationError(err)
          ? err.response.data.message
          : 'Something went wrong creating the project.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          + Add Project
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Project</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="project-title">Title</Label>
            <Input
              id="project-title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="project-description">Description</Label>
            <Textarea
              id="project-description"
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="project-tech">Tech stack (comma-separated)</Label>
            <Input
              id="project-tech"
              placeholder="Vue 3, Laravel, PostgreSQL"
              value={form.techStack}
              onChange={(e) => setForm({ ...form, techStack: e.target.value })}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="project-tags">Tags (comma-separated)</Label>
            <Input
              id="project-tags"
              placeholder="Full-stack, Personal Project"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="project-github">GitHub URL</Label>
            <Input
              id="project-github"
              type="url"
              value={form.githubUrl}
              onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="project-demo">Demo URL</Label>
            <Input
              id="project-demo"
              type="url"
              value={form.demoUrl}
              onChange={(e) => setForm({ ...form, demoUrl: e.target.value })}
            />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="project-featured"
              checked={form.featured}
              onCheckedChange={(checked) => setForm({ ...form, featured: checked === true })}
            />
            <Label htmlFor="project-featured">Featured</Label>
          </div>

          {error && <p className="text-sm text-red-300">{error}</p>}

          <DialogFooter>
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Saving…' : 'Save Project'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
