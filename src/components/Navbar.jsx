import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Search as SearchIcon, X } from 'lucide-react';
import { CONTACT_EMAIL, CONTACT_PHONE, WHATSAPP_URL } from '../data';
import SearchDialog from './Search';

const NAV_LINKS = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/services', 'Services'],
  ['/works', 'Our Works'],
  ['/store', 'Our Store'],
  ['/contact', 'Contact'],
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const loc = useLocation();

  const isDarkHero = loc.pathname === '/' || (loc.pathname.startsWith('/works/') && loc.pathname.split('/').filter(Boolean).length === 2);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
  }, [loc.pathname]);

  const isLightNav = !scrolled && isDarkHero;

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 flex items-center justify-between px-6 md:px-16 transition-[background-color,color,border-color] duration-200 ${
          scrolled
            ? 'py-3 md:py-4 bg-ivory/95 backdrop-blur-md text-charcoal border-b border-earth/20 shadow-xs'
            : isLightNav
            ? 'py-4 md:py-6 bg-charcoal/20 text-ivory'
            : 'py-4 md:py-6 bg-ivory/85 backdrop-blur-sm text-charcoal border-b border-earth/15'
        }`}
      >
        <Link
          to="/"
          className="shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
          onClick={() => setOpen(false)}
        >
          <img
            src="/duro-maker-logo.png"
            alt="Duro Maker Interiors"
            className={`w-auto transition-[filter] duration-200 ${
              isLightNav ? 'brightness-0 invert' : ''
            } ${scrolled ? 'h-12 md:h-14' : 'h-14 md:h-18'}`}
          />
        </Link>

        <nav aria-label="Main" className="hidden md:flex items-center gap-10 text-sm font-medium">
          {NAV_LINKS.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `relative pb-1 transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:origin-left after:bg-current after:transition-transform after:duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current ${
                  isActive
                    ? 'font-semibold after:scale-x-100'
                    : 'after:scale-x-0 hover:opacity-75 hover:after:scale-x-100'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Search projects, services, and products"
          onClick={() => setSearchOpen(true)}
          className={`ml-auto mr-4 p-2 transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current md:ml-8 md:mr-0 ${
            isLightNav && !open ? 'text-ivory' : 'text-charcoal'
          }`}
        >
          <SearchIcon size={20} />
        </button>

        <button
          aria-label={open ? 'Close Menu' : 'Open Menu'}
          className={`md:hidden w-9 h-7 relative flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current ${
            isLightNav && !open ? 'text-ivory' : 'text-charcoal'
          }`}
          onClick={() => setOpen(!open)}
        >
          <motion.span
            className="absolute left-0 w-full h-0.5 bg-current rounded-full"
            animate={{ top: open ? 13 : 4, rotate: open ? 45 : 0 }}
            transition={{ duration: 0.18 }}
          />
          <motion.span
            className="absolute left-0 w-full h-0.5 bg-current rounded-full"
            animate={{ top: open ? 13 : 20, rotate: open ? -45 : 0 }}
            transition={{ duration: 0.18 }}
          />
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-charcoal text-ivory flex flex-col justify-between p-8 md:p-16 overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-ivory/15 pb-6">
              <Link to="/" onClick={() => setOpen(false)}>
                <img
                  src="/duro-maker-logo.png"
                  alt="Duro Maker Interiors"
                  className="h-12 w-auto brightness-0 invert"
                />
              </Link>
              <button
                aria-label="Close Menu"
                className="p-2 text-ivory hover:opacity-75"
                onClick={() => setOpen(false)}
              >
                <X size={28} />
              </button>
            </div>

            <nav className="flex flex-col gap-6 my-auto py-10">
              {NAV_LINKS.map(([to, label]) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setOpen(false)}
                  className="display text-4xl sm:text-5xl hover:text-beige transition-colors"
                >
                  {label}
                </Link>
              ))}
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setSearchOpen(true);
                }}
                className="display text-left text-4xl hover:text-beige transition-colors sm:text-5xl"
              >
                Search
              </button>
            </nav>

            <div className="border-t border-ivory/15 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-beige">
              <div className="flex flex-col gap-2">
                <a href={`tel:${CONTACT_PHONE}`} className="inline-flex items-center gap-2 hover:text-ivory">
                  <Phone size={16} /> {CONTACT_PHONE}
                </a>
                <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center gap-2 hover:text-ivory">
                  <Mail size={16} /> {CONTACT_EMAIL}
                </a>
              </div>
              <div className="flex gap-4">
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="underline hover:text-ivory">
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <SearchDialog open={searchOpen} setOpen={setSearchOpen} />
    </>
  );
}
