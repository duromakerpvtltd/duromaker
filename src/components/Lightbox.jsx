import { useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import InteriorImage from './InteriorImage';

export default function Lightbox({ images, index, setIndex, title }) {
  const reduceMotion = useReducedMotion();

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

  const image = index === null ? null : images[index];

  return <AnimatePresence>
    {index !== null && <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} image gallery`}
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.2 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setIndex(null);
      }}
      className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-charcoal/95 p-5 text-ivory"
    >
      <InteriorImage
        photo={image}
        alt={image.alt}
        className="max-h-[72vh] max-w-[92vw] object-contain"
        loading="eager"
      />
      <div className="mt-4 max-w-3xl text-center">
        <p className="display text-2xl md:text-3xl">{image.title}</p>
        <p className="mt-2 text-sm leading-relaxed text-ivory/75">{image.detailedDescription}</p>
        <p className="mt-2 text-xs text-ivory/60">
          Inspiration photograph from Pexels. Not a verified Duro Maker project.
        </p>
        <a
          href={image.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-block border-b border-ivory/70 pb-1 text-sm hover:text-beige"
        >
          View source and photo details
        </a>
      </div>
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
