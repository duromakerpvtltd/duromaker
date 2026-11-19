import {useEffect,useState} from 'react';import {Routes,Route,useLocation} from 'react-router-dom';import {AnimatePresence,motion} from 'framer-motion';
import Lenis from 'lenis';import gsap from 'gsap';import {ScrollTrigger} from 'gsap/ScrollTrigger';
import Preloader from './components/Preloader';import Navbar from './components/Navbar';import Footer from './components/Footer';
import Home from './pages/Home';import About from './pages/About';import Works from './pages/Works';import Project from './pages/Project';import Store from './pages/Store';
gsap.registerPlugin(ScrollTrigger);
const Page=({children})=><motion.main initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:.7,ease:[.22,1,.36,1]}}>{children}</motion.main>;
export default function App(){
 const loc=useLocation();const [ready,setReady]=useState(false);
 useEffect(()=>{const l=new Lenis({lerp:.09});l.on('scroll',ScrollTrigger.update);
  const t=time=>l.raf(time*1000);gsap.ticker.add(t);gsap.ticker.lagSmoothing(0);return()=>{gsap.ticker.remove(t);l.destroy()}},[]);
 useEffect(()=>{window.scrollTo(0,0);setTimeout(()=>ScrollTrigger.refresh(),600)},[loc.pathname]);
 return <>{!ready&&<Preloader onDone={()=>setReady(true)}/>}<Navbar/>
 <AnimatePresence mode="wait"><Routes location={loc} key={loc.pathname}>
  <Route path="/" element={<Page><Home ready={ready}/></Page>}/><Route path="/about" element={<Page><About/></Page>}/>
  <Route path="/works" element={<Page><Works/></Page>}/><Route path="/works/:slug" element={<Page><Project/></Page>}/>
  <Route path="/store" element={<Page><Store/></Page>}/><Route path="/contact" element={<Page><Contact/></Page>}/></Routes></AnimatePresence><Footer/></>}
const Contact=()=><section className="min-h-screen px-6 md:px-16 pt-40"><h1 className="display text-[14vw] md:text-[9vw]">Start a project</h1><p className="mt-8 max-w-md">Tell us about the space, the timeline and the feeling you want. We reply within two working days.</p><a href="mailto:studio@aurelia.design" className="display text-4xl mt-10 inline-block border-b border-charcoal">studio@aurelia.design</a></section>;
