import { useEffect, useRef, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, Instagram, MessageSquare, MapPin } from 'lucide-react';

import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import InteriorImage from './components/InteriorImage';
import Home from './pages/Home';
import About from './pages/About';
import Works from './pages/Works';
import Project from './pages/Project';
import Services from './pages/Services';
import Store from './pages/Store';
import { CONTACT_EMAIL, CONTACT_PHONE, INSTAGRAM_URL, LOCATION, WHATSAPP_URL } from './data';
import { getInteriorImage } from './data/interiorGallery';

gsap.registerPlugin(ScrollTrigger);

const Page = ({ children }) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.main
      id="main"
      tabIndex="-1"
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  );
};

function Contact() {
  const contactImage = getInteriorImage(14598479);

  return (
    <section className="min-h-screen px-6 pb-28 pt-40 md:px-16">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-6">
          <h1 className="display text-[14vw] leading-none md:text-[9vw]">Start a project</h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-charcoal/80">
            Tell us about your space, your vision, and your timeline. We design, plan, and craft spaces tailored to the way you live.
          </p>

          <div className="mt-14 grid gap-10 md:grid-cols-2">
            <div className="flex flex-col gap-6">
              <div className="border-t border-earth/30 pt-6">
                <span className="text-xs font-medium uppercase tracking-wider text-earth">Direct Call</span>
                <div className="mt-2">
                  <a
                    href={`tel:${CONTACT_PHONE}`}
                    className="display text-3xl transition-colors hover:text-earth md:text-4xl"
                  >
                    {CONTACT_PHONE}
                  </a>
                </div>
              </div>

              <div className="border-t border-earth/30 pt-6">
                <span className="text-xs font-medium uppercase tracking-wider text-earth">Email</span>
                <div className="mt-2">
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="display break-all text-2xl transition-colors hover:text-earth md:text-3xl"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="border-t border-earth/30 pt-6">
                <span className="text-xs font-medium uppercase tracking-wider text-earth">Instant Messaging</span>
                <div className="mt-3 flex flex-wrap gap-4">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 border border-charcoal px-5 py-3 text-sm transition-colors hover:bg-charcoal hover:text-ivory"
                  >
                    <MessageSquare size={16} /> WhatsApp Us
                  </a>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 border border-charcoal px-5 py-3 text-sm transition-colors hover:bg-charcoal hover:text-ivory"
                  >
                    <Instagram size={16} /> Instagram DM
                  </a>
                </div>
              </div>

              <div className="border-t border-earth/30 pt-6">
                <span className="text-xs font-medium uppercase tracking-wider text-earth">Location</span>
                <p className="mt-2 inline-flex items-center gap-2 text-lg">
                  <MapPin size={18} className="text-earth" /> {LOCATION}
                </p>
              </div>
            </div>
          </div>
        </div>

        <figure className="md:col-span-5 md:col-start-8">
          <InteriorImage
            photo={contactImage}
            alt={contactImage.alt}
            className="aspect-[4/5] w-full object-cover"
            sizes="(min-width: 768px) 40vw, 100vw"
          />
          <figcaption className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-earth">
            <span>Interior inspiration, not a Duro Maker project.</span>
            <a href={contactImage.sourceUrl} target="_blank" rel="noreferrer" className="border-b border-earth/50 pb-1">
              Photo source
            </a>
            <a href={contactImage.licenseUrl} target="_blank" rel="noreferrer" className="border-b border-earth/50 pb-1">
              Pexels License
            </a>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export default function App() {
  const loc = useLocation();
  const [ready, setReady] = useState(false);
  const lenisRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const lenis = new Lenis({ lerp: 0.09 });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      if (lenisRef.current) {
        lenisRef.current.resize();
      }
    }, 700);

    return () => clearTimeout(timer);
  }, [loc.pathname]);

  return (
    <>
      {!ready && <Preloader onDone={() => setReady(true)} />}
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ivory focus:p-3">
        Skip to content
      </a>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={loc}>
          <Route path="/" element={<Page><Home ready={ready} /></Page>} />
          <Route path="/about" element={<Page><About /></Page>} />
          <Route path="/services" element={<Page><Services /></Page>} />
          <Route path="/works" element={<Page><Works /></Page>} />
          <Route path="/works/:slug" element={<Page><Project /></Page>} />
          <Route path="/store" element={<Page><Store /></Page>} />
          <Route path="/contact" element={<Page><Contact /></Page>} />
          <Route path="*" element={<Page><Home ready={ready} /></Page>} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
}
