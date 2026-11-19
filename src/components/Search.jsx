import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Search as SearchIcon, X } from 'lucide-react';
import { SERVICES } from '../data';
import { PRODUCTS, WORKS_GALLERY } from '../data/interiorGallery';

const SEARCH_ITEMS = [
  ...SERVICES.map((service) => ({
    title: service.title,
    detail: service.description,
    group: 'Service',
    to: '/services',
    text: `${service.title} ${service.description}`
  })),
  ...WORKS_GALLERY.map((entry) => ({
    title: entry.title,
    detail: `${entry.category} | ${entry.subcategory}`,
    group: 'Inspiration',
    to: `/works/${entry.id}`,
    text: `${entry.title} ${entry.category} ${entry.subcategory} ${entry.description}`
  })),
  ...PRODUCTS.map((product) => ({
    title: product.name,
    detail: product.category,
    group: 'Store',
    to: '/store',
    text: `${product.name} ${product.category}`
  }))
];

export default function Search({ open, setOpen }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const normalizedQuery = query.trim().toLowerCase();
  const results = normalizedQuery.length > 1
    ? SEARCH_ITEMS.filter((item) => item.text.toLowerCase().includes(normalizedQuery)).slice(0, 8)
    : [];

  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    inputRef.current?.focus();
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, setOpen]);

  const close = () => {
    setOpen(false);
    setQuery('');
  };

  return <AnimatePresence>
    {open && <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="site-search-title"
      initial={{ y: '-100%' }}
      animate={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
      className="fixed inset-0 z-90 overflow-y-auto bg-ivory px-6 pb-16 pt-24 md:px-16"
    >
      <button
        type="button"
        aria-label="Close search"
        onClick={close}
        className="absolute right-6 top-6 p-2 md:right-16"
      >
        <X />
      </button>
      <h2 id="site-search-title" className="sr-only">Search interiors, services, and catalogue references</h2>
      <label htmlFor="site-search" className="sr-only">Search</label>
      <div className="flex items-center gap-4 border-b border-charcoal">
        <SearchIcon aria-hidden="true" />
        <input
          ref={inputRef}
          id="site-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search interiors, services, or references"
          className="w-full bg-transparent py-4 text-xl outline-none md:text-2xl"
        />
      </div>

      <ul className="mt-8">
        {results.map((result) => <li key={`${result.group}-${result.title}`}>
          <Link
            to={result.to}
            onClick={close}
            className="flex flex-wrap items-baseline justify-between gap-2 border-b border-beige py-4"
          >
            <span className="display text-2xl md:text-3xl">{result.title}</span>
            <span className="text-sm text-earth">{result.group} / {result.detail}</span>
          </Link>
        </li>)}
        {normalizedQuery.length > 1 && results.length === 0 && (
          <li className="py-4 text-earth">No results found. Try an interior category or service name.</li>
        )}
      </ul>
    </motion.div>}
  </AnimatePresence>;
}
