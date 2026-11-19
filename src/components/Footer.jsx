import { Link } from 'react-router-dom';
import { Instagram, Mail, Phone, MessageSquare } from 'lucide-react';
import { CONTACT_EMAIL, CONTACT_PHONE, INSTAGRAM_URL, LOCATION, WHATSAPP_URL } from '../data';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-ivory px-6 md:px-16 pt-24 pb-12">
      <div className="grid md:grid-cols-3 gap-12 pb-16 border-b border-ivory/10">
        <div>
          <Link to="/">
            <img
              src="/duro-maker-logo.png"
              alt="Duro Maker Interiors"
              className="w-36 h-auto brightness-0 invert"
            />
          </Link>
          <p className="mt-4 text-beige max-w-xs text-sm leading-relaxed">
            Interior architecture, space planning, and bespoke furniture crafted for everyday living.
          </p>
          <p className="mt-2 text-earth text-xs">
            Serving {LOCATION}
          </p>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <span className="text-xs uppercase tracking-wider text-earth font-medium mb-1">Navigation</span>
          {[
            ['/', 'Home'],
            ['/about', 'About Us'],
            ['/services', 'Services'],
            ['/works', 'Our Works'],
            ['/store', 'Our Store'],
            ['/contact', 'Contact Us'],
          ].map(([to, name]) => (
            <Link key={to} to={to} className="hover:text-beige transition-colors">
              {name}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3 text-sm text-beige">
          <span className="text-xs uppercase tracking-wider text-earth font-medium mb-1">Get in touch</span>
          <a
            href={`tel:${CONTACT_PHONE}`}
            className="inline-flex items-center gap-3 hover:text-ivory transition-colors"
          >
            <Phone size={17} className="text-earth shrink-0" />
            {CONTACT_PHONE}
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center gap-3 hover:text-ivory transition-colors"
          >
            <Mail size={17} className="text-earth shrink-0" />
            {CONTACT_EMAIL}
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 hover:text-ivory transition-colors"
          >
            <MessageSquare size={17} className="text-earth shrink-0" />
            Chat on WhatsApp
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 hover:text-ivory transition-colors"
          >
            <Instagram size={17} className="text-earth shrink-0" />
            @duromaker.interior_studio
          </a>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-earth">
        <p>© {currentYear} DURO MAKER INTERIORS. All rights reserved.</p>
        <p>Bespoke Interiors & Turnkey Solutions</p>
      </div>
    </footer>
  );
}
