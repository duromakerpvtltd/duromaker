import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import InteriorImage from '../components/InteriorImage';
import { CONTACT_EMAIL } from '../data';
import { getInteriorImage, PRODUCTS } from '../data/interiorGallery';

const CATEGORIES = ['All', ...new Set(PRODUCTS.map((product) => product.category))];

export default function Store() {
  const [activeCategory, setActiveCategory] = useState('All');
  const reduceMotion = useReducedMotion();
  const products = activeCategory === 'All'
    ? PRODUCTS
    : PRODUCTS.filter((product) => product.category === activeCategory);

  return (
    <section className="px-6 pb-28 pt-40 md:px-16">
      <h1 className="display text-[14vw] leading-none md:text-[9vw]">Our store</h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-charcoal/80">
        Browse image references for kitchens, storage, furniture, lighting, and interior details.
      </p>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-earth">
        These photographs do not represent stocked products, verified finishes, prices, or availability.
      </p>

      <div role="group" aria-label="Filter catalogue references" className="my-12 flex flex-wrap gap-x-6 gap-y-3 border-y border-earth/20 py-4">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={activeCategory === category}
            onClick={() => setActiveCategory(category)}
            className={`cursor-pointer border-b-2 pb-1 text-sm tracking-wide transition-colors ${
              activeCategory === category
                ? 'border-charcoal font-semibold text-charcoal'
                : 'border-transparent text-earth hover:text-charcoal'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {products.length > 0 ? (
        <motion.div layout={!reduceMotion} className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {products.map((product) => {
              const image = getInteriorImage(product.imageId);
              const enquiryUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Enquiry: ${product.name}`)}&body=${encodeURIComponent(`Hello DURO MAKER INTERIORS,\n\nI would like to discuss this design reference: ${product.name}.\n\nPlease contact me to talk through a similar design.`)}`;

              return (
                <motion.article
                  layout={!reduceMotion}
                  key={product.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.35 }}
                  className="group flex flex-col"
                >
                  <div className={`overflow-hidden bg-cream ${image.orientation === 'portrait' ? 'aspect-[4/5]' : image.orientation === 'square' ? 'aspect-square' : 'aspect-[4/3]'}`}>
                    <InteriorImage
                      photo={image}
                      alt={image.alt}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 48vw, 100vw"
                    />
                  </div>
                  <div className="mt-4 flex-1">
                    <p className="text-sm text-earth">{product.category}</p>
                    <h2 className="display mt-2 text-3xl">{product.name}</h2>
                    <p className="mt-3 leading-relaxed text-charcoal/80">{product.description}</p>
                    <p className="mt-3 text-sm leading-relaxed text-earth">{product.finishNote}</p>
                    <div className="mt-3 flex flex-wrap gap-4 text-xs">
                      <a href={image.sourceUrl} target="_blank" rel="noreferrer" className="border-b border-earth/50 pb-1 hover:text-charcoal">
                        Photo source
                      </a>
                      <a href={image.licenseUrl} target="_blank" rel="noreferrer" className="border-b border-earth/50 pb-1 hover:text-charcoal">
                        Pexels License
                      </a>
                    </div>
                  </div>
                  <a
                    href={enquiryUrl}
                    className="mt-5 inline-flex w-fit items-center gap-2 border-b border-charcoal pb-1 text-sm font-medium transition-colors hover:text-earth"
                  >
                    <MessageSquare size={15} aria-hidden="true" />
                    Enquire about a similar design
                  </a>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      ) : (
        <p className="py-16 text-earth">No references are available in this category.</p>
      )}
    </section>
  );
}
