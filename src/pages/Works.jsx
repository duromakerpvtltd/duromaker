import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CATS, INSTAGRAM_URL, PROJECTS } from '../data';

export default function Works() {
  const [filter, setFilter] = useState('All');
  const projects = filter === 'All'
    ? PROJECTS
    : PROJECTS.filter((project) => project.category === filter);

  return <section className="px-6 pb-28 pt-40 md:px-16">
    <h1 className="display text-[14vw] leading-none md:text-[9vw]">Our works</h1>
    <p className="mt-6 max-w-xl text-lg leading-relaxed text-charcoal/80">
      Explore residential and commercial concepts from across Odisha.
    </p>

    <div role="group" aria-label="Filter projects" className="my-12 flex flex-wrap gap-x-8 gap-y-3 border-b border-earth/20 pb-4">
      {['All', ...CATS].map((category) => (
        <button
          key={category}
          type="button"
          aria-pressed={filter === category}
          onClick={() => setFilter(category)}
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

    <motion.div layout className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2">
      <AnimatePresence mode="popLayout">
        {projects.map((project, index) => (
          <motion.article
            layout
            key={project.slug}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={index % 3 === 0 ? 'md:col-span-2' : ''}
          >
            <Link to={`/works/${project.slug}`} className="group block">
              <div className={`overflow-hidden bg-cream/40 ${index % 3 === 0 ? 'aspect-[21/9]' : 'aspect-[4/5]'}`}>
                <img
                  src={project.img}
                  alt={`${project.title} interior`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-4 flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="display text-3xl transition-colors group-hover:text-earth">{project.title}</h2>
                <span className="text-sm text-earth">
                  {project.location} / {project.category} / {project.year}
                </span>
              </div>
            </Link>
          </motion.article>
        ))}
      </AnimatePresence>
    </motion.div>

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
  </section>;
}
