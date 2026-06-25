import { Eye, EyeOff } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export default function PreviewToggleButton() {
  const { realToken, previewMode, setPreviewMode } = useAdmin();

  if (!realToken) return null;

  return (
    <button
      type="button"
      onClick={() => setPreviewMode(!previewMode)}
      title={previewMode ? 'Exit public preview' : 'Preview as a visitor'}
      aria-label={previewMode ? 'Exit public preview' : 'Preview as a visitor'}
      className={
        previewMode
          ? 'flex items-center text-accent transition hover:text-accent-dark'
          : 'flex items-center text-text-muted/40 transition hover:text-accent'
      }
    >
      {previewMode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
    </button>
  );
}
