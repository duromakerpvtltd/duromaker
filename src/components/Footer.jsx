import { Link } from 'react-router-dom';
import { Instagram, Mail, Phone, MessageSquare } from 'lucide-react';
import { CONTACT_EMAIL, CONTACT_PHONE, INSTAGRAM_URL, LOCATION, MAP_URL, WHATSAPP_URL } from '../data';

const FOOTER_LINKS = [
  ['/', 'Home'],
  ['/about', 'About Us'],
  ['/services', 'Services'],
  ['/works', 'Our Works'],
  ['/store', 'Our Store'],
  ['/contact', 'Contact Us'],
];

const LEGAL_LINKS = [
  ['/privacy', 'Privacy Policy'],
  ['/terms', 'Terms of Use'],
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal px-6 pt-12 pb-6 text-ivory md:px-16 md:pt-14">
      <div className="mx-auto max-w-350">
        <div className="grid gap-9 border-b border-ivory/10 pb-8 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <Link to="/" aria-label="Duro Maker Interiors home" className="inline-block">
              <img
                src="/duro-maker-logo.png"
                alt="Duro Maker Interiors"
                className="w-36 h-auto brightness-0 invert"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-beige">
              Interior architecture, space planning, and bespoke furniture crafted for everyday living.
            </p>
            <a
              href={MAP_URL}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${LOCATION} in Google Maps`}
              className="mt-2 inline-block max-w-sm text-xs leading-relaxed text-earth transition-colors hover:text-ivory"
            >
              {LOCATION}
            </a>
          </div>

          <nav aria-label="Footer navigation" className="md:col-span-4">
            <h2 className="mb-4 text-xs font-medium text-earth">Explore</h2>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              {FOOTER_LINKS.map(([to, name]) => (
                <Link key={to} to={to} className="transition-colors hover:text-beige">
                  {name}
                </Link>
              ))}
            </div>
          </nav>

          <div className="md:col-span-4">
            <h2 className="mb-4 text-xs font-medium text-earth">Get in touch</h2>
            <div className="grid gap-y-3 text-sm text-beige">
              <a
                href={`tel:${CONTACT_PHONE}`}
                className="inline-flex items-center gap-3 transition-colors hover:text-ivory"
              >
                <Phone size={16} className="shrink-0 text-earth" />
                {CONTACT_PHONE}
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center gap-3 transition-colors hover:text-ivory"
              >
                <Mail size={16} className="shrink-0 text-earth" />
                {CONTACT_EMAIL}
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 transition-colors hover:text-ivory"
              >
                <MessageSquare size={16} className="shrink-0 text-earth" />
                Chat on WhatsApp
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 transition-colors hover:text-ivory"
              >
                <Instagram size={16} className="shrink-0 text-earth" />
                @duromaker.interior_studio
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-5 text-xs text-earth sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} DURO MAKER INTERIORS. All rights reserved.</p>
          <nav aria-label="Legal" className="flex flex-wrap gap-4">
            {LEGAL_LINKS.map(([to, name]) => (
              <Link key={to} to={to} className="transition-colors hover:text-ivory">{name}</Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
