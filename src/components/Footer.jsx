import {Link} from 'react-router-dom';import {Instagram,Linkedin,Mail} from 'lucide-react';
export default function Footer(){return <footer className="bg-charcoal text-ivory px-6 md:px-16 pt-24 pb-10">
 <div className="grid md:grid-cols-3 gap-12"><div><img src="/duro-maker-logo.png" alt="Duro Maker Interiors" className="w-36 h-auto"/><p className="mt-4 text-beige max-w-xs">Interior architecture and furniture, designed end to end.</p></div>
 <div className="flex flex-col gap-2">{[['/','Home'],['/about','About'],['/works','Our Works'],['/store','Our Store'],['/contact','Contact']].map(([t,n])=><Link key={t} to={t} className="hover:text-beige">{n}</Link>)}</div>
 <div className="space-y-2 text-beige"><p>12 Studio Lane, Bhubaneswar</p><p>studio@aurelia.design</p><p>+91 00000 00000</p><div className="flex gap-4 pt-3 text-ivory"><Instagram size={18}/><Linkedin size={18}/><Mail size={18}/></div></div></div>
 <p className="mt-20 text-xs text-beige">© {new Date().getFullYear()} DURO MAKER INTERIORS. All rights reserved.</p></footer>}
