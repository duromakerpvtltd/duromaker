import {useEffect,useState} from 'react';import {motion} from 'framer-motion';
export default function Preloader({onDone}){const [n,setN]=useState(0);const [out,setOut]=useState(false);
 useEffect(()=>{const i=setInterval(()=>setN(v=>{if(v>=100){clearInterval(i);setOut(true);setTimeout(onDone,900);return 100}return v+2}),30);return()=>clearInterval(i)},[]);
 return <motion.div className="fixed inset-0 z-[100] bg-charcoal text-ivory flex flex-col items-center justify-center" animate={out?{y:'-100%'}:{y:0}} transition={{duration:.9,ease:[.76,0,.24,1]}}>
 <div className="display text-5xl tracking-[.3em]">AURELIA</div><div className="mt-6 text-sm tabular-nums">{n}%</div>
 <div className="absolute bottom-0 left-0 h-px bg-beige" style={{width:n+'%'}}/></motion.div>}
