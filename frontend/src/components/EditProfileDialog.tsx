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
import { useAdmin } from '../context/AdminContext';
import { updateProfile, uploadCv, isAxiosValidationError } from '../services/api';
import type { Profile } from '../types';

function formatUploadedAt(value: string): string {
  return new Date(value).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

function toForm(profile: Profile) {
  return {
    bio: profile.bio,
    location: profile.location ?? '',
    tagline: profile.tagline ?? '',
    summary: profile.summary ?? '',
    stack: profile.stack.join(', '),
  };
}

export default function EditProfileDialog({
  profile,
  onUpdated,
}: {
  profile: Profile;
  onUpdated: () => void;
}) {
  const { token } = useAdmin();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(() => toForm(profile));
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!token) return null;

  function handleOpenChange(value: boolean) {
    if (value) {
      setForm(toForm(profile));
      setCvFile(null);
    }
    setOpen(value);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await updateProfile(
        {
          bio: form.bio,
          location: form.location.trim() || null,
          tagline: form.tagline.trim() || null,
          summary: form.summary.trim() || null,
          stack: form.stack
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean),
        },
        token!
      );
      if (cvFile) {
        await uploadCv(cvFile, token!);
      }
      setOpen(false);
      onUpdated();
    } catch (err) {
      setError(
        isAxiosValidationError(err)
          ? err.response.data.message
          : 'Something went wrong updating the profile.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="edit-profile-location">Location</Label>
            <Input
              id="edit-profile-location"
              placeholder="Phnom Penh, Cambodia"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
            <p className="text-xs text-text-muted">Shown in the badge at the top of the page.</p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-profile-tagline">Tagline</Label>
            <Input
              id="edit-profile-tagline"
              placeholder="Front-End Developer · Full-Stack Experience"
              value={form.tagline}
              onChange={(e) => setForm({ ...form, tagline: e.target.value })}
            />
            <p className="text-xs text-text-muted">
              Shown right under your name at the top of the page.
            </p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-profile-summary">Summary</Label>
            <Textarea
              id="edit-profile-summary"
              rows={6}
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
            />
            <p className="text-xs text-text-muted">
              Wrap words in **double asterisks** to highlight them in accent color, e.g. "I
              specialise in **Vue** and **React**". Shown below the tagline.
            </p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-profile-bio">Bio</Label>
            <Textarea
              id="edit-profile-bio"
              rows={16}
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              required
            />
            <p className="text-xs text-text-muted">
              Separate paragraphs with a blank line. Shown in the About section.
            </p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-profile-stack">Tech stack (comma-separated)</Label>
            <Input
              id="edit-profile-stack"
              placeholder="Vue 3, React, TypeScript, Laravel, Node.js"
              value={form.stack}
              onChange={(e) => setForm({ ...form, stack: e.target.value })}
            />
            <p className="text-xs text-text-muted">
              Shown as badges next to the bio in the About section.
            </p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-profile-cv">CV (PDF)</Label>
            <Input
              id="edit-profile-cv"
              type="file"
              accept="application/pdf"
              onChange={(e) => setCvFile(e.target.files?.[0] ?? null)}
            />
            <p className="text-xs text-text-muted">
              {profile.has_cv
                ? `Current file: ${profile.cv_filename}${
                    profile.cv_uploaded_at
                      ? ` (uploaded ${formatUploadedAt(profile.cv_uploaded_at)})`
                      : ''
                  }. Choose a new file to replace it.`
                : 'No CV uploaded yet.'}
            </p>
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
