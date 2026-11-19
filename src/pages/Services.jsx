import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Plus } from 'lucide-react';
import InteriorImage from '../components/InteriorImage';
import { SERVICES } from '../data';
import { getInteriorImage } from '../data/interiorGallery';

const serviceHero = getInteriorImage(36601409);

export default function Services() {
  const [openService, setOpenService] = useState(null);
  const reduceMotion = useReducedMotion();

  return <>
    <section className="grid gap-10 px-6 pb-12 pt-40 md:grid-cols-12 md:items-end md:px-16">
      <div className="md:col-span-6">
        <h1 className="display text-[14vw] leading-none md:text-[9vw]">Our services</h1>
        <p className="mt-6 max-w-xl">Space planning, interior styling, and bespoke interiors.</p>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-earth">
          Photographs on this page are licensed references, not Duro Maker projects.
        </p>
      </div>
      <InteriorImage
        photo={serviceHero}
        alt={serviceHero.alt}
        loading="eager"
        fetchPriority="high"
        className="aspect-[4/3] w-full object-cover md:col-span-5 md:col-start-8"
      />
    </section>

    <section className="px-6 pb-24 md:px-16">
      {SERVICES.map((service) => {
        const isOpen = openService === service.id;

        return <article id={service.id} key={service.id} className="border-t border-beige">
          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls={`${service.id}-description`}
            onClick={() => setOpenService(isOpen ? null : service.id)}
            className="flex w-full items-center justify-between gap-6 py-6 text-left"
          >
            <span className="display text-3xl md:text-5xl">{service.title}</span>
            <motion.span
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
              aria-hidden="true"
            >
              <Plus />
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {isOpen && <motion.div
              id={`${service.id}-description`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.25 }}
              className="overflow-hidden"
            >
              <div className="grid gap-6 pb-7 md:grid-cols-2 md:items-center">
                <InteriorImage
                  photo={getInteriorImage(service.imageId)}
                  alt={getInteriorImage(service.imageId).alt}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover"
                />
                <p className="max-w-2xl text-earth">{service.description}</p>
              </div>
            </motion.div>}
          </AnimatePresence>
        </article>;
      })}
      <Link to="/contact" className="mt-10 inline-block border-b border-charcoal pb-1">
        Discuss a project
      </Link>
    </section>
  </>;
}
