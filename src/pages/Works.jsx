import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS, CATS, INSTAGRAM_URL } from '../data';

export default function Works() {
  const [filter, setFilter] = useState('All');
  const [mouse, setMouse] = useState({ x: 0, y: 0, on: false });

  const list = filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section
      className="px-6 md:px-16 pt-40 pb-28 relative"
      onMouseMove={(e) => setMouse((s) => ({ ...s, x: e.clientX, y: e.clientY }))}
    >
      <h1 className="display text-[14vw] md:text-[9vw] leading-none">Our works</h1>
      <p className="mt-6 max-w-xl text-charcoal/80 text-lg">
        A curated selection of residential and commercial spaces designed, detailed, and executed across Odisha.
      </p>

      <div className="flex flex-wrap gap-x-8 gap-y-3 my-12 border-b border-earth/20 pb-4">
        {['All', ...CATS].map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`pb-1 text-sm tracking-wide transition-colors cursor-pointer border-b-2 ${
              filter === c
                ? 'border-charcoal text-charcoal font-semibold'
                : 'border-transparent text-earth hover:text-charcoal'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <motion.div layout className="grid md:grid-cols-2 gap-x-8 gap-y-16">
        <AnimatePresence>
          {list.map((p, i) => (
            <motion.div
              layout
              key={p.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={i % 3 === 0 ? 'md:col-span-2' : ''}
            >
              <Link
                to={`/works/${p.slug}`}
                className="group block"
                onMouseEnter={() => setMouse((s) => ({ ...s, on: true }))}
                onMouseLeave={() => setMouse((s) => ({ ...s, on: false }))}
              >
                <div
                  className={`overflow-hidden rounded-xs bg-cream/40 ${
                    i % 3 === 0 ? 'aspect-[21/9]' : 'aspect-[4/3]'
                  }`}
                >
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover transition duration-[1200ms] group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-wrap justify-between items-baseline mt-4 gap-2">
                  <h2 className="display text-3xl group-hover:text-earth transition-colors">
                    {p.title}
                  </h2>
                  <span className="text-xs uppercase tracking-wider text-earth font-mono">
                    {p.location} · {p.category} · {p.year}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <div className="mt-20 pt-10 border-t border-earth/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-sm">
        <p className="text-earth">Looking for recent site photography & stories?</p>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer"
          className="border-b border-charcoal pb-1 font-medium hover:text-earth transition-colors"
        >
          Follow @duromaker.interior_studio on Instagram →
        </a>
      </div>

      <motion.div
        className="pointer-events-none hidden md:grid fixed z-50 left-0 top-0 rounded-full bg-ivory text-charcoal text-xs font-semibold w-20 h-20 place-items-center shadow-lg border border-earth/20"
        animate={{
          x: mouse.x - 40,
          y: mouse.y - 40,
          scale: mouse.on ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      >
        View
      </motion.div>
    </section>
  );
}
