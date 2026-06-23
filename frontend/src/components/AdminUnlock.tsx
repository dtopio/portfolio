import { useState } from 'react';
import { Lock, Unlock } from 'lucide-react';
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

export default function AdminUnlock() {
  const { token, setToken } = useAdmin();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  if (token) {
    return (
      <button
        type="button"
        onClick={() => setToken(null)}
        className="text-text-muted/40 transition hover:text-accent"
        title="Lock admin mode"
        aria-label="Lock admin mode"
      >
        <Unlock className="h-4 w-4" />
      </button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="text-text-muted/40 transition hover:text-accent"
          title="Admin"
          aria-label="Admin"
        >
          <Lock className="h-4 w-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Unlock admin mode</DialogTitle>
        </DialogHeader>

        <div className="space-y-1.5">
          <Label htmlFor="admin-token">Admin token</Label>
          <Input
            id="admin-token"
            type="password"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            autoFocus
          />
        </div>

        <DialogFooter>
          <Button
            disabled={!value.trim()}
            onClick={() => {
              setToken(value.trim());
              setValue('');
              setOpen(false);
            }}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
