import { lazy, Suspense, useEffect, useRef, useState } from 'react';
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

// Route-based code splitting for optimal bundle size (Check 33: Bundle Size)
const About = lazy(() => import('./pages/About'));
const Works = lazy(() => import('./pages/Works'));
const Project = lazy(() => import('./pages/Project'));
const Services = lazy(() => import('./pages/Services'));
const Store = lazy(() => import('./pages/Store'));

function PageFallback() {
  return (
    <div
      role="status"
      aria-label="Loading page content"
      aria-busy="true"
      className="grid min-h-[50vh] place-items-center px-6 py-32 text-center"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-charcoal/20 border-t-charcoal" />
        <span className="text-xs uppercase tracking-widest text-earth">Loading...</span>
      </div>
    </div>
  );
}
import { CONTACT_EMAIL, CONTACT_PHONE, INSTAGRAM_URL, LOCATION, MAP_EMBED_URL, MAP_URL, WHATSAPP_URL } from './data';
import { getInteriorImage, WORKS_GALLERY } from './data/interiorGallery';

gsap.registerPlugin(ScrollTrigger);

const SITE_NAME = 'DURO MAKER INTERIORS';
const SITE_URL = import.meta.env.VITE_SITE_URL;
const PAGE_METADATA = {
  '/': {
    title: 'Interior Design in Odisha',
    description: 'Space planning, bespoke interiors, and turnkey solutions across Bhubaneswar, Cuttack, and Odisha.',
  },
  '/about': {
    title: 'About Our Interior Design Studio',
    description: 'Learn about DURO MAKER INTERIORS and our approach to residential and commercial spaces in Odisha.',
  },
  '/services': {
    title: 'Interior Design Services',
    description: 'Explore space planning, interior styling, and bespoke interior design services from DURO MAKER INTERIORS.',
  },
  '/works': {
    title: 'Interior Design Inspiration Gallery',
    description: 'Browse interior design inspiration for homes and commercial spaces. Images are references, not verified Duro Maker projects.',
  },
  '/store': {
    title: 'Interior Design Reference Store',
    description: 'Browse kitchen, storage, furniture, lighting, and interior-detail references from DURO MAKER INTERIORS.',
  },
  '/contact': {
    title: 'Contact Our Interior Design Studio',
    description: 'Contact DURO MAKER INTERIORS in Cuttack, Odisha to discuss your residential or commercial interior project.',
  },
  '/privacy': {
    title: 'Privacy Policy',
    description: 'Read how DURO MAKER INTERIORS handles website information and optional analytics.',
  },
  '/terms': {
    title: 'Terms of Use',
    description: 'Terms governing use of the DURO MAKER INTERIORS website.',
  },
};

function getPageMetadata(pathname) {
  const projectMatch = pathname.match(/^\/works\/([^/]+)$/);
  if (projectMatch) {
    const slug = projectMatch[1];
    const reference = WORKS_GALLERY.find((entry) => entry.id === slug);
    if (reference) {
      return {
        title: `${reference.title} | Interior Inspiration`,
        description: reference.detailedDescription,
      };
    }

    return {
      title: 'Interior Reference Not Found',
      description: 'This interior inspiration reference is no longer available.',
    };
  }

  if (PAGE_METADATA[pathname]) return PAGE_METADATA[pathname];

  return {
    title: 'Page Not Found',
    description: 'The requested page could not be found on DURO MAKER INTERIORS.',
  };
}

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
                <div className="mt-4 flex flex-wrap gap-4">
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="inline-flex items-center gap-2 border border-charcoal px-5 py-3 text-sm transition-colors hover:bg-charcoal hover:text-ivory"
                  >
                    <Mail size={16} /> Email Us
                  </a>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 border border-charcoal px-5 py-3 text-sm transition-colors hover:bg-charcoal hover:text-ivory"
                  >
                    <MessageSquare size={16} /> Message Us
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="border-t border-earth/30 pt-6">
                <span className="text-xs font-medium uppercase tracking-wider text-earth">Connect on Instagram</span>
                <div className="mt-3 flex flex-wrap gap-4">
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
                <a
                  href={MAP_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${LOCATION} in Google Maps`}
                  className="mt-2 inline-flex items-center gap-2 text-lg transition-colors hover:text-earth"
                >
                  <MapPin size={18} className="text-earth" /> {LOCATION}
                </a>
                <iframe
                  src={MAP_EMBED_URL}
                  title={`Map to ${LOCATION}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="mt-4 aspect-video w-full border-0"
                />
              </div>
            </div>
          </div>
        </div>

        <figure className="md:col-span-5 md:col-start-8">
          <InteriorImage
            photo={contactImage}
            alt={contactImage.alt}
            className="aspect-4/5 w-full object-cover"
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

function NotFound() {
  return (
    <section className="grid min-h-dvh place-items-center px-6 py-32 text-center md:px-16">
      <div>
        <p className="text-xs font-medium uppercase tracking-widest text-earth">404</p>
        <h1 className="display mt-4 text-6xl md:text-8xl">Page not found</h1>
        <p className="mx-auto mt-5 max-w-lg leading-relaxed text-charcoal/75">
          The page may have moved or the address may be incorrect.
        </p>
        <a
          href="/"
          className="mt-8 inline-block border border-charcoal px-6 py-3 text-sm transition-colors hover:bg-charcoal hover:text-ivory"
        >
          Return home
        </a>
      </div>
    </section>
  );
}

function PrivacyPolicy() {
  return (
    <article className="min-h-screen px-6 pb-28 pt-40 md:px-16">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-widest text-earth">Privacy</p>
        <h1 className="display mt-4 text-6xl md:text-7xl">Privacy Policy</h1>
        <div className="mt-10 space-y-8 leading-relaxed text-charcoal/80">
          <section>
            <h2 className="display text-3xl text-charcoal">Information you share</h2>
            <p className="mt-3">
              When you contact us by phone, email, WhatsApp, Instagram, or a linked map service, that provider receives the information you choose to send. We use this information only to respond to project enquiries.
            </p>
          </section>
          <section>
            <h2 className="display text-3xl text-charcoal">Analytics and cookies</h2>
            <p className="mt-3">
              Optional analytics is disabled unless you choose “Allow analytics” in the privacy prompt. With consent, providers may process usage information such as pages visited, approximate region, device type, and referral source.
            </p>
          </section>
          <section>
            <h2 className="display text-3xl text-charcoal">Third-party services</h2>
            <p className="mt-3">
              Maps, social platforms, and analytics providers operate under their own privacy terms. We do not sell personal information.
            </p>
          </section>
          <section>
            <h2 className="display text-3xl text-charcoal">Your choices</h2>
            <p className="mt-3">
              You may contact us to request correction or deletion of information you previously supplied by email or messaging. Clearing your browser storage removes your analytics preference.
            </p>
          </section>
          <section>
            <h2 className="display text-3xl text-charcoal">Contact</h2>
            <p className="mt-3">
              <a className="border-b border-charcoal pb-1" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}

function TermsOfUse() {
  return (
    <article className="min-h-screen px-6 pb-28 pt-40 md:px-16">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-widest text-earth">Terms</p>
        <h1 className="display mt-4 text-6xl md:text-7xl">Terms of Use</h1>
        <div className="mt-10 space-y-8 leading-relaxed text-charcoal/80">
          <section>
            <h2 className="display text-3xl text-charcoal">Website content</h2>
            <p className="mt-3">
              This website presents general interior-design information and editorial reference photography. It does not constitute a quotation, contractual specification, or confirmation that any shown item is available or was completed by DURO MAKER INTERIORS.
            </p>
          </section>
          <section>
            <h2 className="display text-3xl text-charcoal">Project scope</h2>
            <p className="mt-3">
              Pricing, deliverables, timelines, materials, warranties, and responsibilities are confirmed only through a separately agreed project proposal or contract.
            </p>
          </section>
          <section>
            <h2 className="display text-3xl text-charcoal">Photography and trademarks</h2>
            <p className="mt-3">
              Third-party photographs remain subject to their respective licenses and provider terms. You may not reuse website images or branding without the relevant permission.
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}

export default function App() {
  const loc = useLocation();
  const [ready, setReady] = useState(false);
  const lenisRef = useRef(null);

  useEffect(() => {
    const metadata = getPageMetadata(loc.pathname);
    const fullTitle = `${metadata.title} | ${SITE_NAME}`;
    document.title = fullTitle;

    document.querySelector('meta[name="description"]')?.setAttribute('content', metadata.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', fullTitle);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', metadata.description);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', fullTitle);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', metadata.description);

    const baseOrigin = SITE_URL || (typeof window !== 'undefined' ? window.location.origin : 'https://duromaker.vercel.app');
    try {
      const canonicalUrl = new URL(loc.pathname, baseOrigin).href;
      document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonicalUrl);

      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = canonicalUrl;
    } catch {
      // Ignore URL parsing errors
    }
  }, [loc.pathname]);

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
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:bg-ivory focus:p-3">
        Skip to content
      </a>
      <Navbar />
      <AnimatePresence mode="wait">
        <Suspense fallback={<PageFallback />}>
          <Routes location={loc}>
            <Route path="/" element={<Page><Home ready={ready} /></Page>} />
            <Route path="/about" element={<Page><About /></Page>} />
            <Route path="/services" element={<Page><Services /></Page>} />
            <Route path="/works" element={<Page><Works /></Page>} />
            <Route path="/works/:slug" element={<Page><Project /></Page>} />
            <Route path="/store" element={<Page><Store /></Page>} />
            <Route path="/contact" element={<Page><Contact /></Page>} />
            <Route path="/privacy" element={<Page><PrivacyPolicy /></Page>} />
            <Route path="/terms" element={<Page><TermsOfUse /></Page>} />
            <Route path="*" element={<Page><NotFound /></Page>} />
          </Routes>
        </Suspense>
      </AnimatePresence>
      <Footer />
    </>
  );
}
