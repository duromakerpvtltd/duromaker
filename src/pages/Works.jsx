import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import InteriorImage from '../components/InteriorImage';
import Lightbox from '../components/Lightbox';
import { INSTAGRAM_URL } from '../data';
import { GALLERY_CATEGORIES, WORKS_GALLERY } from '../data/interiorGallery';

export default function Works() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const requestedCategory = searchParams.get('category');
  const [filter, setFilter] = useState(() => (
    GALLERY_CATEGORIES.includes(requestedCategory) ? requestedCategory : 'All'
  ));
  const reduceMotion = useReducedMotion();
  const images = filter === 'All'
    ? WORKS_GALLERY
    : WORKS_GALLERY.filter((entry) => entry.category === filter);

  useEffect(() => {
    setFilter(GALLERY_CATEGORIES.includes(requestedCategory) ? requestedCategory : 'All');
  }, [requestedCategory]);

  const selectCategory = (category) => {
    setFilter(category);
    const nextParams = new URLSearchParams(searchParams);
    if (category === 'All') {
      nextParams.delete('category');
    } else {
      nextParams.set('category', category);
    }
    setSearchParams(nextParams, { replace: true });
  };

  return <section className="px-6 pb-28 pt-40 md:px-16">
    <h1 className="display text-[14vw] leading-none md:text-[9vw]">Our works</h1>
    <p className="mt-6 max-w-2xl text-lg leading-relaxed text-charcoal/80">
      Browse interior design references for homes and commercial spaces. These Pexels photographs are inspiration, not verified Duro Maker projects.
    </p>

    <div role="group" aria-label="Filter inspiration photographs" className="my-12 flex flex-wrap gap-x-8 gap-y-3 border-b border-earth/20 pb-4">
      {['All', ...GALLERY_CATEGORIES].map((category) => (
        <button
          key={category}
          type="button"
          aria-pressed={filter === category}
          onClick={() => selectCategory(category)}
          className={`cursor-pointer border-b-2 pb-1 text-sm tracking-wide transition-colors ${
            filter === category
              ? 'border-charcoal font-semibold text-charcoal'
              : 'border-transparent text-earth hover:text-charcoal'
          }`}
        >
          {category}
        </button>
      ))}
    </div>

    {images.length > 0 ? (
      <motion.div layout={!reduceMotion} className="columns-1 gap-x-6 sm:columns-2 xl:columns-3">
        <AnimatePresence mode="popLayout">
          {images.map((entry, index) => (
            <motion.article
              layout={!reduceMotion}
              key={entry.id}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.35, delay: reduceMotion ? 0 : (index % 7) * 0.035 }}
              className="mb-8 break-inside-avoid"
            >
              <div className="group">
                <button
                  type="button"
                  aria-label={`View ${entry.title} in the full-screen gallery`}
                  onClick={() => setLightboxIndex(index)}
                  className="block w-full cursor-zoom-in text-left"
                >
                <div className={`relative overflow-hidden bg-cream ${entry.orientation === 'portrait' ? 'aspect-4/5' : entry.orientation === 'square' ? 'aspect-square' : 'aspect-5/4'}`}>
                  <InteriorImage
                    photo={entry}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(min-width: 1280px) 30vw, (min-width: 640px) 48vw, 100vw"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-charcoal/75 to-transparent px-5 pb-5 pt-16 text-ivory">
                    <h2 className="display text-2xl md:text-3xl">{entry.title}</h2>
                  </div>
                </div>
                </button>
                <div className="mt-3 flex flex-wrap items-baseline justify-between gap-2 text-sm">
                  <span className="text-earth">{entry.category}</span>
                  <span className="text-charcoal/65">{entry.subcategory}</span>
                </div>
                <Link
                  to={`/works/${entry.id}`}
                  className="mt-2 inline-block border-b border-charcoal/50 pb-1 text-sm hover:text-earth"
                >
                  Reference details
                </Link>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    ) : (
      <p className="py-16 text-earth">No photographs are available in this category.</p>
    )}

    <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-earth/20 pt-10 text-sm sm:flex-row sm:items-center">
      <p className="text-earth">Find more updates on Instagram.</p>
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noreferrer"
        className="border-b border-charcoal pb-1 font-medium transition-colors hover:text-earth"
      >
        @duromaker.interior_studio
      </a>
    </div>
    <Lightbox
      images={images}
      index={lightboxIndex}
      setIndex={setLightboxIndex}
      title={filter === 'All' ? 'Interior inspiration gallery' : filter}
    />
  </section>;
}
