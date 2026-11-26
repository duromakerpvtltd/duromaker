import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Img, Lines } from '../components/Reveal';
import InteriorImage from '../components/InteriorImage';
import { getInteriorImage } from '../data/interiorGallery';

gsap.registerPlugin(ScrollTrigger);

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
  const homeRef = useRef(null);
  const heroRef = useRef(null);
  const spacesRef = useRef(null);
  const collectionRef = useRef(null);
  const architectureRef = useRef(null);
  const materialFeatureRef = useRef(null);

  useEffect(() => {
    if (!ready || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const context = gsap.context(() => {
      // 1. Hero Load Reveal & Scroll Parallax
      const heroTl = gsap.timeline();
      heroTl
        .from('.hero-heading-line', {
          opacity: 0,
          y: 20,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power3.out',
        })
        .from(
          '.hero-summary',
          {
            opacity: 0,
            y: 16,
            duration: 0.5,
            ease: 'power3.out',
          },
          '-=0.25'
        );

      if (heroRef.current) {
        // Hero image subtle zoom and parallax on scroll
        gsap.to('.hero-img', {
          yPercent: 18,
          scale: 1.06,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });

        // Hero text fades out gracefully as you scroll away
        gsap.to('.hero-content', {
          y: -40,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: '65% top',
            scrub: true,
          },
        });
      }

      // 2. Spaces to Explore Scroll Animations
      if (spacesRef.current) {
        gsap.from('.spaces-header', {
          autoAlpha: 0,
          y: 28,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: spacesRef.current,
            start: 'top 85%',
            once: true,
          },
        });

        gsap.from('.space-card', {
          autoAlpha: 0,
          y: 40,
          duration: 0.8,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.spaces-grid',
            start: 'top 82%',
            once: true,
          },
        });

        const spaceImages = spacesRef.current.querySelectorAll('.space-image');
        spaceImages.forEach((img) => {
          gsap.fromTo(
            img,
            { yPercent: -6 },
            {
              yPercent: 6,
              ease: 'none',
              scrollTrigger: {
                trigger: img.parentElement,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            }
          );
        });
      }

      // 3. Collection Full-bleed Banner Parallax
      if (collectionRef.current) {
        const colImg = collectionRef.current.querySelector('.collection-img');
        if (colImg) {
          gsap.fromTo(
            colImg,
            { yPercent: -12, scale: 1.06 },
            {
              yPercent: 12,
              scale: 1.0,
              ease: 'none',
              scrollTrigger: {
                trigger: collectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            }
          );
        }

        gsap.from('.collection-content', {
          autoAlpha: 0,
          y: 35,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: collectionRef.current,
            start: 'top 75%',
            once: true,
          },
        });
      }

      // 4. Architecture Section Scroll Reveal & Parallax
      if (architectureRef.current) {
        gsap.from('.arch-wrap', {
          clipPath: 'inset(6% 0% 6% 0%)',
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: architectureRef.current,
            start: 'top 85%',
            once: true,
          },
        });

        const archImg = architectureRef.current.querySelector('.arch-img');
        if (archImg) {
          gsap.fromTo(
            archImg,
            { yPercent: -6 },
            {
              yPercent: 6,
              ease: 'none',
              scrollTrigger: {
                trigger: architectureRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            }
          );
        }

        gsap.from('.arch-caption', {
          autoAlpha: 0,
          y: 20,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: architectureRef.current,
            start: 'top 75%',
            once: true,
          },
        });
      }

      // 5. Material & Light Feature Section
      if (materialFeatureRef.current) {
        const section = materialFeatureRef.current;
        const copy = section.querySelector('[data-material-copy]');
        const imageWrap = section.querySelector('[data-material-image]');
        const image = imageWrap?.querySelector('img');

        if (copy && imageWrap && image) {
          gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top 78%',
              once: true,
            },
          })
            .from(copy, {
              autoAlpha: 0,
              y: 32,
              duration: 0.7,
              ease: 'power3.out',
            })
            .from(
              imageWrap,
              {
                clipPath: 'inset(100% 0 0 0)',
                duration: 0.9,
                ease: 'power3.out',
              },
              '-=0.2'
            );

          gsap.fromTo(
            image,
            { yPercent: -6 },
            {
              yPercent: 6,
              ease: 'none',
              scrollTrigger: {
                trigger: imageWrap,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            }
          );
        }
      }

      // Refresh ScrollTrigger calculations after all triggers are mounted
      ScrollTrigger.refresh();
    }, homeRef);

    return () => context.revert();
  }, [ready]);

  return (
    <div ref={homeRef}>
      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative min-h-dvh overflow-hidden text-ivory">
        <InteriorImage
          photo={heroImage}
          className="hero-img absolute inset-0 h-[115%] w-full object-cover -top-[7%]"
          alt={heroImage.alt}
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-charcoal/40" />
        <div className="hero-content relative flex min-h-dvh flex-col justify-end px-6 pb-16 md:px-16 md:pb-20">
          <h1 className="display max-w-5xl text-4xl leading-[1.05] md:text-7xl">
            <span className="mask block"><span className="hero-heading-line block">Interior design for</span></span>
            <span className="mask block"><span className="hero-heading-line block">homes and businesses</span></span>
            <span className="mask block"><span className="hero-heading-line block">in Odisha</span></span>
          </h1>
          <div className="hero-summary mt-7 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-base leading-relaxed md:text-lg">
              Space planning and styling for homes and commercial spaces across Odisha.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/services"
                className="border border-ivory bg-ivory px-6 py-3 text-sm text-charcoal transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ivory"
              >
                Our services
              </Link>
              <Link
                to="/works"
                className="border border-ivory/70 px-6 py-3 text-sm transition-colors hover:bg-ivory hover:text-charcoal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ivory"
              >
                Explore interiors
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="grid gap-10 px-6 py-24 md:grid-cols-12 md:items-center md:px-16 md:py-32">
        <div className="md:col-span-6">
          <Lines
            className="display text-5xl leading-tight md:text-6xl"
            text="Interiors shaped around everyday life"
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

      {/* Spaces to Explore Section */}
      <section ref={spacesRef} className="px-6 pb-28 md:px-16 md:pb-32">
        <div className="spaces-header">
          <h2 className="display mb-5 text-5xl md:text-6xl">Spaces to explore</h2>
          <p className="mb-12 max-w-xl leading-relaxed text-charcoal/75">
            These editorial photographs are inspiration references, not verified Duro Maker projects.
          </p>
        </div>
        <div className="spaces-grid grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-12">
          {spaces.map((space) => (
            <Link
              key={space.title}
              to={`/works?category=${encodeURIComponent(space.category)}`}
              className={`space-card group block ${space.className}`}
            >
              <div className={`overflow-hidden relative ${space.title === 'Bedrooms' ? 'aspect-4/5' : 'aspect-4/3'}`}>
                <InteriorImage
                  photo={space.image}
                  alt={space.image.alt}
                  className="space-image h-[116%] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 768px) 55vw, 100vw"
                />
              </div>
              <h3 className="display mt-4 text-3xl transition-colors group-hover:text-earth">{space.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Full-bleed Collection Banner */}
      <section ref={collectionRef} className="relative min-h-[70vh] overflow-hidden text-ivory md:min-h-[85vh]">
        <div className="absolute inset-0 h-full w-full overflow-hidden">
          <InteriorImage
            photo={collectionImage}
            alt={collectionImage.alt}
            className="collection-img absolute inset-0 h-[120%] w-full object-cover -top-[10%]"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-charcoal/35" />
        <div className="collection-content relative flex min-h-[70vh] flex-col justify-end px-6 py-16 md:min-h-[85vh] md:px-16 md:py-20">
          <h2 className="display max-w-4xl text-5xl md:text-7xl">A collection of considered interiors</h2>
          <p className="mt-5 max-w-lg leading-relaxed text-ivory/90">
            Explore forms, finishes, and room arrangements from editorial reference photography.
          </p>
        </div>
      </section>

      {/* Architecture Panorama Section */}
      <section ref={architectureRef} className="px-6 py-24 md:px-16 md:py-32">
        <div className="arch-wrap aspect-2/1 w-full overflow-hidden bg-cream">
          <InteriorImage
            photo={architectureImage}
            alt={architectureImage.alt}
            className="arch-img h-[116%] w-full object-cover block"
            sizes="100vw"
          />
        </div>
        <p className="arch-caption display mt-5 text-3xl md:text-4xl">Architecture, proportion, and light</p>
      </section>

      {/* Material & Light Feature Section */}
      <section ref={materialFeatureRef} className="grid gap-10 px-6 pb-24 md:grid-cols-12 md:items-center md:px-16 md:pb-32">
        <div data-material-copy className="md:col-span-5">
          <h2 className="display text-5xl md:text-6xl">Material and light shape the room</h2>
          <p className="mt-5 max-w-md leading-relaxed text-charcoal/75">
            Wood tones and lighting details can help set a direction before a design is finalised.
          </p>
        </div>
        <div data-material-image className="aspect-4/3 overflow-hidden md:col-span-6 md:col-start-7">
          <InteriorImage
            photo={detailImage}
            alt={detailImage.alt}
            loading="lazy"
            className="block h-[116%] w-full object-cover"
          />
        </div>
      </section>
    </div>
  );
}
