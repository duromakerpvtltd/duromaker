import {useState} from 'react';import {Link} from 'react-router-dom';import {motion,AnimatePresence} from 'framer-motion';import {PROJECTS,CATS} from '../data';
export default function Works(){const [f,setF]=useState('All');const [m,setM]=useState({x:0,y:0,on:false});
 const list=f==='All'?PROJECTS:PROJECTS.filter(p=>p.category===f);
 return <section className="px-6 md:px-16 pt-40 pb-28" onMouseMove={e=>setM(s=>({...s,x:e.clientX,y:e.clientY}))}>
 <h1 className="display text-[14vw] md:text-[9vw]">Our works</h1>
 <div className="flex flex-wrap gap-x-8 gap-y-2 my-12">{['All',...CATS].map(c=><button key={c} onClick={()=>setF(c)} className={`pb-1 border-b ${f===c?'border-charcoal':'border-transparent text-earth'}`}>{c}</button>)}</div>
 <motion.div layout className="grid md:grid-cols-2 gap-x-8 gap-y-16"><AnimatePresence>{list.map((p,i)=><motion.div layout key={p.slug} initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:.6,delay:i*.07}} className={i%3===0?'md:col-span-2':''}>
  <Link to={`/works/${p.slug}`} className="group block" onMouseEnter={()=>setM(s=>({...s,on:true}))} onMouseLeave={()=>setM(s=>({...s,on:false}))}><div className={`overflow-hidden ${i%3===0?'aspect-[21/9]':'aspect-[4/5]'}`}><img src={p.img} alt={p.title} className="w-full h-full object-cover transition duration-[1400ms] group-hover:scale-105"/></div>
  <div className="flex justify-between mt-3"><h3 className="display text-3xl">{p.title}</h3><span className="text-sm text-earth">{p.location}, {p.category}, {p.year}</span></div></Link></motion.div>)}</AnimatePresence></motion.div>
 <motion.div className="pointer-events-none fixed z-40 left-0 top-0 rounded-full bg-ivory text-charcoal text-xs w-20 h-20 grid place-items-center" animate={{x:m.x-40,y:m.y-40,scale:m.on?1:0}} transition={{type:'spring',stiffness:300,damping:28}}>View</motion.div></section>}
