import { useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdmin } from '../context/AdminContext';
import { uploadProjectImages } from '../services/api';

export default function UploadProjectImagesButton({
  projectId,
  onUploaded,
}: {
  projectId: number;
  onUploaded: () => void;
}) {
  const { token } = useAdmin();
  const inputRef = useRef<HTMLInputElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!token) return null;

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) return;

    setSubmitting(true);
    setError(null);
    try {
      await uploadProjectImages(projectId, files, token!);
      onUploaded();
    } catch {
      setError('Something went wrong uploading the screenshots.');
    } finally {
      setSubmitting(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  return (
    <div className="space-y-1.5">
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={submitting}
        onClick={() => inputRef.current?.click()}
      >
        <Upload className="h-4 w-4" />
        {submitting ? 'Uploading…' : 'Upload Screenshots'}
      </Button>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        multiple
        className="hidden"
        onChange={handleChange}
      />
      {error && <p className="text-sm text-red-300">{error}</p>}
    </div>
  );
}
