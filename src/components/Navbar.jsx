import {useEffect,useState} from 'react';import {Link,NavLink} from 'react-router-dom';import {motion,AnimatePresence} from 'framer-motion';
import {INSTAGRAM_URL} from '../data';
const L=[['/','Home'],['/about','About'],['/works','Our Works'],['/store','Services'],['/contact','Contact']];
export default function Navbar(){const [s,setS]=useState(false);const [o,setO]=useState(false);
 useEffect(()=>{const f=()=>setS(scrollY>60);f();addEventListener('scroll',f);return()=>removeEventListener('scroll',f)},[]);
 return <header className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-16 transition-all duration-500 ${s?'py-4 bg-ivory/85 backdrop-blur text-charcoal':'py-4 md:py-5 bg-charcoal/20 text-ivory'}`}>
 <Link to="/" className="shrink-0" onClick={()=>setO(false)}><img src="/duro-maker-logo.png" alt="Duro Maker Interiors" className={`w-auto transition-all ${s?'h-14':'h-16 md:h-20'}`}/></Link>
 <nav className="hidden md:flex gap-8 text-sm">{L.map(([t,n])=><NavLink key={t} to={t} className={({isActive})=>`relative after:absolute after:left-0 after:-bottom-1 after:h-px after:bg-current after:transition-all ${isActive?'after:w-full':'after:w-0 hover:after:w-full'}`}>{n}</NavLink>)}<a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="hover:opacity-70">Instagram</a></nav>
 <button aria-label="Menu" className="md:hidden w-8 h-5 relative" onClick={()=>setO(!o)}><motion.span className="absolute left-0 w-full h-px bg-current" animate={{top:o?10:0,rotate:o?45:0}}/><motion.span className="absolute left-0 w-full h-px bg-current top-5" animate={{top:o?10:20,rotate:o?-45:0}}/></button>
 <AnimatePresence>{o&&<motion.div initial={{clipPath:'inset(0 0 100% 0)'}} animate={{clipPath:'inset(0 0 0% 0)'}} exit={{clipPath:'inset(0 0 100% 0)'}} className="fixed inset-0 -z-10 bg-charcoal text-ivory flex flex-col justify-center gap-6 px-8">
 {L.map(([t,n])=><Link key={t} to={t} onClick={()=>setO(false)} className="display text-6xl">{n}</Link>)}<a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" onClick={()=>setO(false)} className="display text-6xl">Instagram</a></motion.div>}</AnimatePresence></header>}
