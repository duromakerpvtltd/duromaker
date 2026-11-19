import {Link} from 'react-router-dom';import {Instagram,Mail,Phone} from 'lucide-react';
import {CONTACT,INSTAGRAM_URL} from '../data';
export default function Footer(){return <footer className="bg-charcoal text-ivory px-6 md:px-16 pt-24 pb-10">
 <div className="grid md:grid-cols-3 gap-12"><div><img src="/duro-maker-logo.png" alt="Duro Maker Interiors" className="w-36 h-auto"/><p className="mt-4 text-beige max-w-xs">Turning empty spaces into experiences.</p></div>
 <div className="flex flex-col gap-2">{[['/','Home'],['/about','About'],['/works','Our Works'],['/store','Services'],['/contact','Contact']].map(([t,n])=><Link key={t} to={t} className="hover:text-beige">{n}</Link>)}</div>
 <div className="space-y-3 text-beige"><a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 hover:text-ivory"><Mail size={18}/>{CONTACT.email}</a><a href={`tel:${CONTACT.phone}`} className="flex items-center gap-3 hover:text-ivory"><Phone size={18}/>{CONTACT.phone}</a><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-ivory"><Instagram size={18}/>@duromaker.interior_studio</a></div></div>
 <p className="mt-20 text-xs text-beige">© {new Date().getFullYear()} DURO MAKER INTERIORS. All rights reserved.</p></footer>}
