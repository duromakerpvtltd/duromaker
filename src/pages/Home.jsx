import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { Img, Lines } from '../components/Reveal';
import { IMG, INSTAGRAM_URL, PROJECTS, SERVICES } from '../data';

export default function Home({ ready }) {
  const heroRef = useRef(null);

  useEffect(() => {
    if (!ready || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const context = gsap.context(() => {
      const timeline = gsap.timeline();
      timeline
        .fromTo('.hero-img', { scale: 1.12 }, { scale: 1, duration: 1.5, ease: 'power4.out' })
        .from('.hero-heading-line', { yPercent: 110, stagger: 0.1, duration: 1, ease: 'power4.out' }, '-=1')
        .from('.hero-summary', { opacity: 0, y: 18, duration: 0.7, ease: 'power2.out' }, '-=0.5');
    }, heroRef);

    return () => context.revert();
  }, [ready]);

  return <>
    <section ref={heroRef} className="relative min-h-[100dvh] overflow-hidden text-ivory">
      <img
        className="hero-img absolute inset-0 h-full w-full object-cover"
        src={IMG.hero}
        alt="Interior design reference photograph"
      />
      <div className="absolute inset-0 bg-charcoal/40" />
      <div className="relative flex min-h-[100dvh] flex-col justify-end px-6 pb-16 md:px-16 md:pb-20">
        <h1 className="display text-[8.5vw] leading-[1.05] md:text-[8vw]">
          <span className="mask block"><span className="hero-heading-line block">Turning empty spaces</span></span>
          <span className="mask block md:ml-[10vw]"><span className="hero-heading-line block">into experiences.</span></span>
        </h1>
        <div className="hero-summary mt-7 flex flex-col gap-5 md:ml-[10vw] md:flex-row md:items-end md:justify-between">
          <p className="max-w-sm text-sm leading-relaxed md:text-base">
            Space planning, interior styling, and bespoke interiors.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/services" className="border border-ivory/70 px-6 py-3 text-sm transition-colors hover:bg-ivory hover:text-charcoal">
              Our services
            </Link>
            <Link to="/works" className="border border-ivory/70 px-6 py-3 text-sm transition-colors hover:bg-ivory hover:text-charcoal">
              View projects
            </Link>
          </div>
        </div>
      </div>
    </section>

    <section className="grid gap-10 px-6 py-24 md:grid-cols-12 md:items-center md:px-16 md:py-32">
      <div className="md:col-span-6">
        <Lines
          className="display text-5xl leading-tight md:text-6xl"
          text="Interior design shaped around everyday life."
        />
        <p className="mt-6 max-w-lg leading-relaxed text-charcoal/80">
          Explore residential and commercial concepts from across Odisha.
        </p>
      </div>
      <Img
        src={IMG.d}
        className="aspect-[4/5] md:col-span-5 md:col-start-8"
        alt="Interior design reference photograph"
      />
    </section>

    <section className="px-6 pb-28 md:px-16 md:pb-32">
      <h2 className="display mb-10 text-5xl md:text-6xl">Selected projects</h2>
      <div className="grid gap-x-8 gap-y-14 md:grid-cols-12">
        {PROJECTS.slice(0, 3).map((project, index) => (
          <Link
            key={project.slug}
            to={`/works/${project.slug}`}
            className={`group block ${index === 0 ? 'md:col-span-7' : 'md:col-span-5'} ${index === 1 ? 'md:mt-24' : ''}`}
          >
            <div className={`overflow-hidden ${index === 0 ? 'aspect-[4/3]' : 'aspect-[4/5]'}`}>
              <img
                src={project.img}
                alt={`${project.title} interior`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="mt-4 flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="display text-3xl transition-colors group-hover:text-earth">{project.title}</h3>
              <span className="text-sm text-earth">{project.location}</span>
            </div>
          </Link>
        ))}
      </div>
      <Link to="/works" className="mt-10 inline-block border-b border-charcoal pb-1">
        View all projects
      </Link>
    </section>

    <section className="bg-cream px-6 py-24 md:px-16 md:py-28">
      <h2 className="display mb-10 text-5xl md:text-6xl">Our services</h2>
      <div>
        {SERVICES.map((service) => (
          <Link
            key={service.id}
            to="/services"
            className="group flex items-center justify-between gap-5 border-t border-earth/30 py-6 transition-colors hover:text-earth"
          >
            <span className="display text-2xl md:text-4xl">{service.title}</span>
            <span aria-hidden="true" className="text-lg transition-transform group-hover:translate-x-1">→</span>
          </Link>
        ))}
      </div>
    </section>

    <section className="bg-charcoal px-6 py-24 text-ivory md:px-16 md:py-32">
      <Lines className="display max-w-5xl text-5xl md:text-8xl" text="Let’s talk about your space." />
      <div className="mt-10 flex flex-wrap gap-6">
        <Link to="/contact" className="border border-ivory/70 px-7 py-3 transition-colors hover:bg-ivory hover:text-charcoal">
          Contact us
        </Link>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer"
          className="border-b border-ivory/70 py-3 transition-colors hover:text-beige"
        >
          Follow on Instagram
        </a>
      </div>
    </section>
  </>;
}
