import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { ProjectImage } from '../types';

export default function ImageLightbox({
  images,
  index,
  onIndexChange,
  onClose,
  alt,
}: {
  images: ProjectImage[];
  index: number | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
  alt: string;
}) {
  if (index === null) return null;
  const image = images[index];

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] w-auto max-w-[95vw] border-none bg-transparent p-0 shadow-none ring-0 sm:max-w-[95vw]">
        <div className="relative flex items-center justify-center">
          {images.length > 1 && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-bg/60 hover:bg-bg/80"
              onClick={() => onIndexChange((index - 1 + images.length) % images.length)}
            >
              <ChevronLeft />
              <span className="sr-only">Previous screenshot</span>
            </Button>
          )}
          <img
            src={image.url}
            alt={alt}
            className="max-h-[85vh] max-w-full rounded-lg object-contain"
          />
          {images.length > 1 && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-bg/60 hover:bg-bg/80"
              onClick={() => onIndexChange((index + 1) % images.length)}
            >
              <ChevronRight />
              <span className="sr-only">Next screenshot</span>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
