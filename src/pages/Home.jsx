import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { AnimatePresence, motion } from 'framer-motion';
import { Lines, Img } from '../components/Reveal';
import { IMG, PROJECTS } from '../data';

const SERVICES = [
  'Residential Interiors',
  'Commercial Interiors',
  'Space Planning',
  'Custom Furniture Design',
  'Turnkey Interior Solutions'
];

const QUOTES = [
  ['They listened first, then designed a home that genuinely feels like us.', 'Ananya & Rohan, The Linen House (Bhubaneswar)'],
  ['Our team now argues over who gets the desk by the atrium courtyard.', 'Meera Shah, Atrium Offices (Cuttack)'],
  ['Every joinery detail was resolved before anything arrived at the site.', 'Kabir Rao, Villa Sorrel (Puri)']
];

export default function Home({ ready }) {
  const heroRef = useRef(null);
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    if (!ready || !heroRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from('.hero-img', {
        scale: 1.2,
        clipPath: 'inset(0 0 100% 0)',
        duration: 1.5,
        ease: 'power4.out'
      })
      .from('.hero-letter', {
        yPercent: 110,
        stagger: 0.1,
        duration: 1.1,
        ease: 'power4.out'
      }, '-=0.8')
      .from('.hero-sub', {
        opacity: 0,
        y: 20,
        duration: 0.9
      }, '-=0.5');
    }, heroRef);
    return () => ctx.revert();
  }, [ready]);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <section ref={heroRef} className="relative h-screen overflow-hidden text-ivory">
        <img
          className="hero-img absolute inset-0 w-full h-full object-cover"
          src={IMG.hero}
          alt="Duro Maker Interior space"
        />
        <div className="absolute inset-0 bg-charcoal/40" />

        <div className="relative h-full flex flex-col justify-end px-6 md:px-16 pb-20">
          <h1 className="display text-[16vw] md:text-[11vw] leading-none">
            <span className="mask block">
              <span className="hero-letter block">Spaces that</span>
            </span>
            <span className="mask block">
              <span className="hero-letter block italic md:ml-[12vw]">hold quiet</span>
            </span>
          </h1>

          <div className="hero-sub flex flex-col md:flex-row md:items-end justify-between gap-6 mt-8">
            <p className="max-w-md text-ivory/90 text-sm md:text-base leading-relaxed">
              DURO MAKER INTERIORS designs spaces where architecture, material, and light are resolved as one.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/works"
                className="border border-ivory/70 px-8 py-3 text-sm hover:bg-ivory hover:text-charcoal transition-colors duration-300"
              >
                Explore Projects
              </Link>
              <Link
                to="/contact"
                className="border border-ivory/70 bg-ivory text-charcoal px-8 py-3 text-sm hover:bg-transparent hover:text-ivory transition-colors duration-300"
              >
                Start a Project
              </Link>
            </div>
          </div>

          <div className="absolute right-6 md:right-16 bottom-6 w-px h-14 bg-ivory/30 overflow-hidden">
            <motion.div
              className="w-full h-6 bg-ivory"
              animate={{ y: [-24, 56] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </section>

      <section className="px-6 md:px-16 py-32 grid md:grid-cols-12 gap-10 items-center">
        <Lines
          className="display text-5xl md:text-7xl md:col-span-7 leading-tight"
          text="We shape rooms around the way people actually live, and build every piece to last."
        />
        <Img
          src={IMG.d}
          className="md:col-span-4 md:col-start-9 aspect-[3/4] rounded-xs"
          alt="Crafted interior detail"
        />
      </section>

      <section className="px-6 md:px-16 pb-32 space-y-28">
        <div className="flex justify-between items-baseline border-b border-earth/20 pb-4">
          <h2 className="display text-4xl">Featured spaces</h2>
          <Link to="/works" className="border-b border-charcoal pb-1 text-sm font-medium hover:text-earth transition-colors">
            View all projects →
          </Link>
        </div>

        {PROJECTS.slice(0, 3).map((p, i) => (
          <Link
            key={p.slug}
            to={`/works/${p.slug}`}
            className={`group block md:w-[68%] ${i % 2 ? 'md:ml-auto' : ''}`}
          >
            <div className="overflow-hidden aspect-[4/3] rounded-xs bg-cream/30">
              <img
                src={p.img}
                alt={p.title}
                className="w-full h-full object-cover transition duration-[1400ms] group-hover:scale-105"
              />
            </div>
            <div className="flex flex-wrap justify-between items-baseline mt-4 gap-2">
              <h3 className="display text-4xl group-hover:text-earth transition-colors">
                {p.title}
              </h3>
              <span className="text-xs uppercase tracking-wider text-earth font-mono">
                {p.location} · {p.category}
              </span>
            </div>
          </Link>
        ))}
      </section>

      <section className="bg-cream px-6 md:px-16 py-28">
        <h2 className="display text-5xl mb-12">Our expertise</h2>
        <div className="divide-y divide-earth/30">
          {SERVICES.map((s) => (
            <div
              key={s}
              className="group flex justify-between items-center py-7 hover:pl-6 transition-all duration-500 cursor-pointer"
            >
              <span className="display text-3xl md:text-5xl group-hover:text-earth transition-colors">
                {s}
              </span>
              <Link to="/contact" className="text-sm text-earth underline opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Discuss project →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="relative h-[85vh] overflow-hidden text-ivory flex items-center">
        <Img src={IMG.f} className="absolute inset-0" alt="Minimalist interior architecture" />
        <div className="absolute inset-0 bg-charcoal/50" />
        <Lines
          className="display relative px-6 md:px-16 text-5xl md:text-8xl max-w-5xl"
          text="Design is what remains when everything unnecessary has been removed."
        />
      </section>

      <section className="px-6 md:px-16 py-32 min-h-[60vh] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={quoteIndex}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.55 }}
          >
            <p className="display text-4xl md:text-7xl max-w-5xl leading-tight">
              “{QUOTES[quoteIndex][0]}”
            </p>
            <p className="mt-8 text-earth text-sm uppercase tracking-wider font-mono">
              — {QUOTES[quoteIndex][1]}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-3 mt-12">
          {QUOTES.map((_, i) => (
            <button
              key={i}
              aria-label={`Testimonial ${i + 1}`}
              onClick={() => setQuoteIndex(i)}
              className={`h-0.5 transition-all duration-300 cursor-pointer ${
                i === quoteIndex ? 'w-16 bg-charcoal' : 'w-8 bg-beige hover:bg-earth'
              }`}
            />
          ))}
        </div>
      </section>

      <section className="bg-charcoal text-ivory px-6 md:px-16 py-32 text-center">
        <Lines className="display text-6xl md:text-9xl" text="Let’s Create Something Beautiful." />
        <p className="mt-6 text-beige max-w-lg mx-auto text-sm md:text-base leading-relaxed">
          From full residential transformations to bespoke architectural fittings, let’s bring your vision to life.
        </p>
        <Link
          to="/contact"
          className="inline-block mt-10 border border-ivory/60 px-10 py-4 hover:bg-ivory hover:text-charcoal transition-colors duration-300 text-sm font-medium tracking-wide"
        >
          Contact Us
        </Link>
      </section>
    </>
  );
}
