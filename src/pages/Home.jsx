import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { Img, Lines } from '../components/Reveal';
import InteriorImage from '../components/InteriorImage';
import { INSTAGRAM_URL, SERVICES } from '../data';
import { getInteriorImage } from '../data/interiorGallery';

const heroImage = getInteriorImage(7148846);
const livingImage = getInteriorImage(8082242);
const kitchenImage = getInteriorImage(35443238);
const bedroomImage = getInteriorImage(34574606);
const wardrobeImage = getInteriorImage(6670657);
const collectionImage = getInteriorImage(36601414);
const architectureImage = getInteriorImage(7148841);
const detailImage = getInteriorImage(9329002);

const spaces = [
  { title: 'Modular kitchens', category: 'Kitchens', image: kitchenImage, className: 'md:col-span-6' },
  { title: 'Bedrooms', category: 'Bedrooms', image: bedroomImage, className: 'md:col-span-5 md:col-start-8 md:mt-24' },
  { title: 'Wardrobes', category: 'Wardrobes', image: wardrobeImage, className: 'md:col-span-6 md:col-start-4' },
];

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
    <section ref={heroRef} className="relative min-h-dvh overflow-hidden text-ivory">
      <InteriorImage
        photo={heroImage}
        className="hero-img absolute inset-0 h-full w-full object-cover"
        alt={heroImage.alt}
        loading="eager"
        fetchPriority="high"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-charcoal/40" />
      <div className="relative flex min-h-dvh flex-col justify-end px-6 pb-16 md:px-16 md:pb-20">
        <h1 className="display text-[8.5vw] leading-[1.05] md:text-[8vw]">
          <span className="mask block"><span className="hero-heading-line block">Turning empty spaces</span></span>
          <span className="mask block md:ml-[10vw]"><span className="hero-heading-line block">into experiences.</span></span>
        </h1>
        <div className="hero-summary mt-7 flex flex-col gap-5 md:ml-[10vw] md:flex-row md:items-end md:justify-between">
          <p className="max-w-sm text-sm leading-relaxed md:text-base">
            Licensed interior references, with space planning and styling for your brief.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/services" className="border border-ivory/70 px-6 py-3 text-sm transition-colors hover:bg-ivory hover:text-charcoal">
              Our services
            </Link>
            <Link to="/works" className="border border-ivory/70 px-6 py-3 text-sm transition-colors hover:bg-ivory hover:text-charcoal">
              Explore interiors
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
          Browse room ideas for homes and commercial spaces, then tell us what fits your brief.
        </p>
      </div>
      <Img
        src={livingImage}
        className="aspect-4/5 md:col-span-5 md:col-start-8"
        alt={livingImage.alt}
      />
    </section>

    <section className="px-6 pb-28 md:px-16 md:pb-32">
      <h2 className="display mb-5 text-5xl md:text-6xl">Spaces to explore</h2>
      <p className="mb-12 max-w-xl leading-relaxed text-charcoal/75">
        These editorial photographs are inspiration references, not verified Duro Maker projects.
      </p>
      <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-12">
        {spaces.map((space) => (
          <Link
            key={space.title}
            to={`/works?category=${encodeURIComponent(space.category)}`}
            className={`group block ${space.className}`}
          >
            <div className={`overflow-hidden ${space.title === 'Bedrooms' ? 'aspect-4/5' : 'aspect-4/3'}`}>
              <InteriorImage
                photo={space.image}
                alt={space.image.alt}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(min-width: 768px) 55vw, 100vw"
              />
            </div>
            <h3 className="display mt-4 text-3xl transition-colors group-hover:text-earth">{space.title}</h3>
          </Link>
        ))}
      </div>
    </section>

    <section className="relative min-h-[70vh] overflow-hidden text-ivory md:min-h-[85vh]">
      <InteriorImage
        photo={collectionImage}
        alt={collectionImage.alt}
        className="absolute inset-0 h-full w-full object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-charcoal/35" />
      <div className="relative flex min-h-[70vh] flex-col justify-end px-6 py-16 md:min-h-[85vh] md:px-16 md:py-20">
        <h2 className="display max-w-4xl text-5xl md:text-7xl">A collection of considered interiors.</h2>
        <p className="mt-5 max-w-lg leading-relaxed">
          Explore forms, finishes, and room arrangements from editorial reference photography.
        </p>
      </div>
    </section>

    <section className="px-6 py-24 md:px-16 md:py-32">
      <InteriorImage
        photo={architectureImage}
        alt={architectureImage.alt}
        className="aspect-2/1 w-full object-cover"
        sizes="100vw"
      />
      <p className="display mt-5 text-3xl md:text-4xl">Architecture, proportion, and light.</p>
    </section>

    <section className="grid gap-10 px-6 pb-24 md:grid-cols-12 md:items-center md:px-16 md:pb-32">
      <div className="md:col-span-5">
        <Lines className="display text-5xl md:text-6xl" text="The details shape the room." />
        <p className="mt-5 max-w-md leading-relaxed text-charcoal/75">
          Wood tones and lighting details can help set a direction before a design is finalised.
        </p>
      </div>
      <Img
        src={detailImage}
        className="aspect-4/3 md:col-span-6 md:col-start-7"
        alt={detailImage.alt}
      />
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
