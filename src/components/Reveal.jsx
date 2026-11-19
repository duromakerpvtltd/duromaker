import {useEffect,useRef} from 'react';import gsap from 'gsap';import {ScrollTrigger} from 'gsap/ScrollTrigger';gsap.registerPlugin(ScrollTrigger);
export function Lines({text,className=''}){const r=useRef();
 useEffect(()=>{const c=gsap.context(()=>gsap.from('.w',{yPercent:110,stagger:.04,duration:1,ease:'power4.out',scrollTrigger:{trigger:r.current,start:'top 85%'}}),r);return()=>c.revert()},[]);
 return <h2 ref={r} className={className}>{text.split(' ').map((w,i)=><span key={i} className="mask inline-block mr-[.25em]"><span className="w inline-block">{w}</span></span>)}</h2>}
export function Img({src,className='',alt=''}){const r=useRef();
 useEffect(()=>{const c=gsap.context(()=>{gsap.from(r.current,{clipPath:'inset(100% 0 0 0)',duration:1.4,ease:'power4.out',scrollTrigger:{trigger:r.current,start:'top 85%'}});
  gsap.fromTo(r.current.querySelector('img'),{yPercent:-8},{yPercent:8,ease:'none',scrollTrigger:{trigger:r.current,scrub:true}})},r);return()=>c.revert()},[]);
 return <div ref={r} className={`overflow-hidden ${className}`}><img src={src} alt={alt} loading="lazy" className="w-full h-[116%] object-cover"/></div>}
