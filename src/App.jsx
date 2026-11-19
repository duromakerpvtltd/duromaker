import { useEffect, useRef, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, Instagram, MessageSquare, MapPin } from 'lucide-react';

import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Works from './pages/Works';
import Project from './pages/Project';
import Store from './pages/Store';
import { CONTACT_EMAIL, CONTACT_PHONE, INSTAGRAM_URL, LOCATION, WHATSAPP_URL } from './data';

gsap.registerPlugin(ScrollTrigger);

const Page = ({ children }) => (
  <motion.main
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.main>
);

function Contact() {
  return (
    <section className="min-h-screen px-6 pb-28 pt-40 md:px-16">
      <h1 className="display text-[14vw] md:text-[9vw] leading-none">Start a project</h1>
      <p className="mt-8 max-w-xl text-lg text-charcoal/80 leading-relaxed">
        Tell us about your space, your vision, and your timeline. We design, plan, and craft spaces tailored to the way you live.
      </p>

      <div className="mt-14 grid gap-10 md:grid-cols-2 max-w-4xl">
        <div className="flex flex-col gap-6">
          <div className="border-t border-earth/30 pt-6">
            <span className="text-xs uppercase tracking-wider text-earth font-medium">Direct Call</span>
            <div className="mt-2">
              <a
                href={`tel:${CONTACT_PHONE}`}
                className="display text-3xl md:text-4xl hover:text-earth transition-colors"
              >
                {CONTACT_PHONE}
              </a>
            </div>
          </div>

          <div className="border-t border-earth/30 pt-6">
            <span className="text-xs uppercase tracking-wider text-earth font-medium">Email</span>
            <div className="mt-2">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="display break-all text-2xl md:text-3xl hover:text-earth transition-colors"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="border-t border-earth/30 pt-6">
            <span className="text-xs uppercase tracking-wider text-earth font-medium">Instant Messaging</span>
            <div className="mt-3 flex flex-wrap gap-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-charcoal px-5 py-3 text-sm hover:bg-charcoal hover:text-ivory transition-colors"
              >
                <MessageSquare size={16} /> WhatsApp Us
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-charcoal px-5 py-3 text-sm hover:bg-charcoal hover:text-ivory transition-colors"
              >
                <Instagram size={16} /> Instagram DM
              </a>
            </div>
          </div>

          <div className="border-t border-earth/30 pt-6">
            <span className="text-xs uppercase tracking-wider text-earth font-medium">Location</span>
            <p className="mt-2 inline-flex items-center gap-2 text-lg">
              <MapPin size={18} className="text-earth" /> {LOCATION}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const loc = useLocation();
  const [ready, setReady] = useState(false);
  const lenisRef = useRef(null);

  useEffect(() => {
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
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={loc} key={loc.pathname}>
          <Route path="/" element={<Page><Home ready={ready} /></Page>} />
          <Route path="/about" element={<Page><About /></Page>} />
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
