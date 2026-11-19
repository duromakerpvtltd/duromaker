import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function Lightbox({ images, index, setIndex, title }) {
  useEffect(() => {
    if (index === null) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIndex(null);
      if (event.key === 'ArrowRight') setIndex((current) => (current + 1) % images.length);
      if (event.key === 'ArrowLeft') setIndex((current) => (current - 1 + images.length) % images.length);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [images.length, index, setIndex]);

  return <AnimatePresence>
    {index !== null && <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} image gallery`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setIndex(null);
      }}
      className="fixed inset-0 z-[80] grid place-items-center bg-charcoal/95 p-5"
    >
      <img
        src={images[index]}
        alt={`${title}, image ${index + 1} of ${images.length}`}
        className="max-h-[85vh] max-w-[92vw] object-contain"
      />
      <button type="button" aria-label="Close gallery" onClick={() => setIndex(null)} className="absolute right-5 top-5 text-ivory">
        <X />
      </button>
      {images.length > 1 && <>
        <button type="button" aria-label="Previous image" onClick={() => setIndex((index - 1 + images.length) % images.length)} className="absolute left-3 top-1/2 text-ivory">
          <ChevronLeft size={36} />
        </button>
        <button type="button" aria-label="Next image" onClick={() => setIndex((index + 1) % images.length)} className="absolute right-3 top-1/2 text-ivory">
          <ChevronRight size={36} />
        </button>
      </>}
    </motion.div>}
  </AnimatePresence>;
}
