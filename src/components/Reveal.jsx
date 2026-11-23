import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import InteriorImage from './InteriorImage';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function Lines({ text = '', className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!text || !containerRef.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from('.reveal-word', {
        yPercent: 110,
        stagger: 0.03,
        duration: 0.9,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 92%',
          once: true,
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, [text]);

  const words = (text || '').split(' ');

  return (
    <h2 ref={containerRef} className={className}>
      {words.map((word, i) => (
        <span key={i} className="mask !inline-block mr-[0.25em]">
          <span className="reveal-word !inline-block">{word}</span>
        </span>
      ))}
    </h2>
  );
}

export function Img({ src, className = '', alt = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const imgEl = containerRef.current.querySelector('img');
    if (!imgEl) return;
    if (prefersReducedMotion()) {
      imgEl.style.height = '100%';
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        clipPath: 'inset(100% 0 0 0)',
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 92%',
          once: true,
        },
      });

      gsap.fromTo(
        imgEl,
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [src]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <InteriorImage
        photo={src}
        alt={alt}
        loading="lazy"
        className="w-full h-[114%] object-cover block"
      />
    </div>
  );
}
