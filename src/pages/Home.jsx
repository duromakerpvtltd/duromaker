import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { PROJECTS, SERVICES, INSTAGRAM_URL } from '../data';

export default function Home({ ready }) {
  const hero = useRef(null);
  const project = PROJECTS[0];

  useEffect(() => {
    if (!ready) return;
    const context = gsap.context(() => {
      gsap.timeline()
        .from('.hero-img', { scale: 1.08, opacity: 0, duration: 1.2, ease: 'power3.out' })
        .from('.hero-line', { yPercent: 110, stagger: 0.1, duration: 0.9, ease: 'power3.out' }, '-=.7')
        .from('.hero-sub', { opacity: 0, y: 16, duration: 0.7 }, '-=.4');
    }, hero);
    return () => context.revert();
  }, [ready]);

  return <>
    <section ref={hero} className="relative min-h-[100dvh] overflow-hidden text-ivory">
      <img className="hero-img absolute inset-0 h-full w-full object-cover" src={project.image} alt="Completed interior project in CDA Sector 6, Cuttack"/>
      <div className="absolute inset-0 bg-charcoal/45"/>
      <div className="relative flex min-h-[100dvh] flex-col justify-end px-6 pb-16 md:px-16 md:pb-20">
        <h1 className="display text-[9.5vw] md:text-[8vw]">
          <span className="mask block"><span className="hero-line block">Turning empty spaces</span></span>
          <span className="mask block"><span className="hero-line block italic">into experiences.</span></span>
        </h1>
        <div className="hero-sub mt-7 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <p className="max-w-sm">Space planning, interior styling, and bespoke interiors.</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/store" className="border border-ivory/70 px-6 py-3 transition hover:bg-ivory hover:text-charcoal">Explore services</Link>
            <Link to="/works" className="border border-ivory/70 px-6 py-3 transition hover:bg-ivory hover:text-charcoal">See our work</Link>
          </div>
        </div>
      </div>
    </section>

    <section className="px-6 py-24 md:px-16">
      <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="display text-5xl md:text-7xl">What we do</h2>
          <p className="mt-4 max-w-xl">Interior services from the DURO MAKER INTERIOR studio.</p>
        </div>
        <Link to="/store" className="border-b border-charcoal pb-1">View services</Link>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {SERVICES.map((service) => <article key={service.title} className="border-t border-earth/50 pt-5">
          <h3 className="display text-3xl">{service.title}</h3>
          <p className="mt-3 max-w-sm text-earth">{service.description}</p>
        </article>)}
      </div>
    </section>

    <section className="bg-cream px-6 py-20 md:px-16">
      <div className="grid items-center gap-8 md:grid-cols-12">
        <div className="md:col-span-5">
          <h2 className="display text-4xl md:text-6xl">Recent work in Cuttack</h2>
          <p className="mt-5 max-w-md">{project.description} The studio identifies the location as {project.location}.</p>
          <a href={project.instagramUrl} target="_blank" rel="noreferrer" className="mt-7 inline-block border-b border-charcoal pb-1">View this project on Instagram</a>
        </div>
        <a href={project.instagramUrl} target="_blank" rel="noreferrer" className="group block overflow-hidden md:col-span-6 md:col-start-7">
          <img src={project.image} alt="Interior project at CDA Sector 6, Cuttack" className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-[1.02]"/>
        </a>
      </div>
    </section>

    <section className="bg-charcoal px-6 py-24 text-ivory md:px-16">
      <div className="max-w-3xl">
        <h2 className="display text-5xl md:text-8xl">Let’s design your space.</h2>
        <p className="mt-6 max-w-xl text-beige">Contact DURO MAKER INTERIOR or send a direct message on Instagram to discuss a project.</p>
        <div className="mt-8 flex flex-wrap gap-6">
          <Link to="/contact" className="border border-ivory/60 px-7 py-3 transition hover:bg-ivory hover:text-charcoal">Contact the studio</Link>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="self-center border-b border-ivory/60 pb-1">Instagram</a>
        </div>
      </div>
    </section>
  </>;
}
