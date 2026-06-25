import { useAdmin } from '../context/AdminContext';

export default function PreviewBanner() {
  const { previewMode, setPreviewMode } = useAdmin();

  if (!previewMode) return null;

  return (
    <div className="flex items-center justify-center gap-3 bg-accent px-4 py-2 text-sm font-medium text-bg">
      Previewing as a visitor — admin controls are hidden.
      <button
        type="button"
        onClick={() => setPreviewMode(false)}
        className="rounded-md bg-bg/20 px-2 py-0.5 text-xs font-semibold hover:bg-bg/30"
      >
        Exit Preview
      </button>
    </div>
  );
}
