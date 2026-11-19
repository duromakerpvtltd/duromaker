import {useState} from 'react';import {motion,AnimatePresence} from 'framer-motion';import {PRODUCTS} from '../data';
const C=['All','Seating','Tables','Lighting','Decor'];
export default function Store(){const [c,setC]=useState('All');const [s,setS]=useState('featured');
 let l=c==='All'?[...PRODUCTS]:PRODUCTS.filter(p=>p.category===c);const n=p=>+p.price.replace(/[^\d]/g,'');if(s==='low')l.sort((a,b)=>n(a)-n(b));if(s==='high')l.sort((a,b)=>n(b)-n(a));
 return <section className="px-6 md:px-16 pt-40 pb-28"><h1 className="display text-[14vw] md:text-[9vw]">Our store</h1>
 <div className="flex flex-wrap justify-between gap-4 my-12 border-y border-beige py-4"><div className="flex gap-6 flex-wrap">{C.map(x=><button key={x} onClick={()=>setC(x)} className={c===x?'underline underline-offset-8':'text-earth'}>{x}</button>)}</div>
 <select value={s} onChange={e=>setS(e.target.value)} className="bg-transparent"><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></div>
 <motion.div layout className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-14"><AnimatePresence>{l.map(p=><motion.article layout key={p.id} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="group"><div className="overflow-hidden aspect-[4/5] bg-cream"><img src={p.img} alt={p.name} className="w-full h-full object-cover transition duration-1000 group-hover:scale-105"/></div>
 <div className="flex justify-between mt-3"><h3 className="display text-2xl">{p.name}</h3><span>{p.price}</span></div><p className="text-sm text-earth">{p.category}</p></motion.article>)}</AnimatePresence></motion.div></section>}
