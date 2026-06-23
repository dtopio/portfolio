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
import { updateProfile, isAxiosValidationError } from '../services/api';
import type { Profile } from '../types';

function toForm(profile: Profile) {
  return {
    bio: profile.bio,
    location: profile.location ?? '',
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
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!token) return null;

  function handleOpenChange(value: boolean) {
    if (value) setForm(toForm(profile));
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
        },
        token!
      );
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
          Edit Bio & Location
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Bio & Location</DialogTitle>
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
            <Label htmlFor="edit-profile-bio">Bio</Label>
            <Textarea
              id="edit-profile-bio"
              rows={10}
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              required
            />
            <p className="text-xs text-text-muted">
              Separate paragraphs with a blank line. Shown in the About section.
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
