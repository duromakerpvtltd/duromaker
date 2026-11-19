import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { PRODUCTS, WHATSAPP_URL } from '../data';

const CATEGORIES = ['All', 'Seating', 'Tables', 'Lighting', 'Decor'];

export default function Store() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortOption, setSortOption] = useState('featured');

  let list = activeCategory === 'All' ? [...PRODUCTS] : PRODUCTS.filter((p) => p.category === activeCategory);

  const getNumericPrice = (p) => +p.price.replace(/[^\d]/g, '');
  if (sortOption === 'low') list.sort((a, b) => getNumericPrice(a) - getNumericPrice(b));
  if (sortOption === 'high') list.sort((a, b) => getNumericPrice(b) - getNumericPrice(a));

  return (
    <section className="px-6 md:px-16 pt-40 pb-28">
      <h1 className="display text-[14vw] md:text-[9vw] leading-none">Our store</h1>
      <p className="mt-6 max-w-xl text-charcoal/80 text-lg">
        Bespoke furniture and architectural lighting pieces designed and commissioned for Duro Maker projects.
      </p>

      <div className="flex flex-wrap justify-between items-center gap-4 my-12 border-y border-earth/20 py-4">
        <div className="flex gap-6 flex-wrap">
          {CATEGORIES.map((x) => (
            <button
              key={x}
              onClick={() => setActiveCategory(x)}
              className={`text-sm tracking-wide transition-colors cursor-pointer ${
                activeCategory === x
                  ? 'underline underline-offset-8 font-semibold text-charcoal'
                  : 'text-earth hover:text-charcoal'
              }`}
            >
              {x}
            </button>
          ))}
        </div>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="bg-transparent text-sm border-b border-earth/30 pb-1 cursor-pointer focus:outline-hidden text-charcoal"
        >
          <option value="featured">Featured Order</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-16">
        <AnimatePresence>
          {list.map((p) => {
            const productEnquiryUrl = `${WHATSAPP_URL}%20I%20am%20interested%20in%20the%20${encodeURIComponent(
              p.name
            )}%20(${encodeURIComponent(p.price)}).`;

            return (
              <motion.article
                layout
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="group flex flex-col justify-between"
              >
                <div>
                  <div className="overflow-hidden aspect-[4/5] bg-cream/40 rounded-xs">
                    <img
                      src={p.img}
                      alt={p.name}
                      className="w-full h-full object-cover transition duration-1000 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex justify-between items-baseline mt-4">
                    <h2 className="display text-2xl group-hover:text-earth transition-colors">
                      {p.name}
                    </h2>
                    <span className="text-sm font-medium font-mono text-charcoal">{p.price}</span>
                  </div>
                  <p className="text-xs uppercase tracking-wider text-earth mt-1 font-mono">
                    {p.category}
                  </p>
                </div>

                <a
                  href={productEnquiryUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-wider border-b border-earth/40 pb-1 text-earth hover:text-charcoal hover:border-charcoal transition-colors self-start"
                >
                  <MessageSquare size={14} /> Enquire on WhatsApp
                </a>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
