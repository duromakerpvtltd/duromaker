import {useEffect,useState} from 'react';import {Link,NavLink} from 'react-router-dom';import {motion,AnimatePresence} from 'framer-motion';
const L=[['/','Home'],['/about','About'],['/works','Our Works'],['/store','Our Store'],['/contact','Contact']];
export default function Navbar(){const [s,setS]=useState(false);const [o,setO]=useState(false);
 useEffect(()=>{const f=()=>setS(scrollY>60);f();addEventListener('scroll',f);return()=>removeEventListener('scroll',f)},[]);
 return <header className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-16 transition-all duration-500 ${s?'py-4 bg-ivory/85 backdrop-blur text-charcoal':'py-8 mix-blend-difference text-ivory'}`}>
 <Link to="/" className="display text-2xl tracking-[.25em]" onClick={()=>setO(false)}>AURELIA</Link>
 <nav className="hidden md:flex gap-10 text-sm">{L.map(([t,n])=><NavLink key={t} to={t} className={({isActive})=>`relative after:absolute after:left-0 after:-bottom-1 after:h-px after:bg-current after:transition-all ${isActive?'after:w-full':'after:w-0 hover:after:w-full'}`}>{n}</NavLink>)}</nav>
 <button aria-label="Menu" className="md:hidden w-8 h-5 relative" onClick={()=>setO(!o)}><motion.span className="absolute left-0 w-full h-px bg-current" animate={{top:o?10:0,rotate:o?45:0}}/><motion.span className="absolute left-0 w-full h-px bg-current top-5" animate={{top:o?10:20,rotate:o?-45:0}}/></button>
 <AnimatePresence>{o&&<motion.div initial={{clipPath:'inset(0 0 100% 0)'}} animate={{clipPath:'inset(0 0 0% 0)'}} exit={{clipPath:'inset(0 0 100% 0)'}} className="fixed inset-0 -z-10 bg-charcoal text-ivory flex flex-col justify-center gap-6 px-8">
 {L.map(([t,n])=><Link key={t} to={t} onClick={()=>setO(false)} className="display text-6xl">{n}</Link>)}</motion.div>}</AnimatePresence></header>}
