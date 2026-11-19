import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PROJECTS, IMG } from '../data';
import { Img, Lines } from '../components/Reveal';
import Lightbox from '../components/Lightbox';

export default function Project() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const { slug } = useParams();
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  const project = PROJECTS[index];

  if (!project) {
    return (
      <section className="pt-40 px-6 md:px-16 min-h-screen flex flex-col justify-center items-start">
        <h1 className="display text-5xl">Project not found</h1>
        <p className="mt-4 text-earth">The project you are looking for does not exist or has been moved.</p>
        <Link to="/works" className="mt-8 border-b border-charcoal pb-1">
          ← Back to our projects
        </Link>
      </section>
    );
  }

  const nextProject = PROJECTS[(index + 1) % PROJECTS.length];
  const gallery = [project.img, ...[IMG.a, IMG.b, IMG.c, IMG.d, IMG.e, IMG.f]
    .filter((image) => image !== project.img)].slice(0, 5);

  return (
    <>
      <section className="relative flex min-h-[100dvh] items-end text-ivory">
        <img
          src={project.img}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/35" />
        <div className="relative px-6 md:px-16 pb-16 md:pb-20">
          <span className="text-xs uppercase tracking-widest text-beige font-mono">
            {project.category} · {project.year}
          </span>
          <h1 className="display text-[13vw] md:text-[9vw] leading-none mt-2">
            {project.title}
          </h1>
        </div>
      </section>

      <section className="px-6 md:px-16 py-24 grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          <h2 className="display text-4xl mb-4">Overview</h2>
          <p className="max-w-xl text-charcoal/85 leading-relaxed text-lg">
            {project.concept}
          </p>
          <h2 className="display text-4xl mt-14 mb-4">Design concept</h2>
          <p className="max-w-xl text-charcoal/80 leading-relaxed">
            Every surface was chosen to age gracefully with daily use. Natural light and spatial circulation were balanced to create rooms that reveal themselves gradually with a calm, tactile presence.
          </p>
        </div>

        <dl className="space-y-4 text-sm self-start bg-cream/50 p-6 border border-earth/20 rounded-xs">
          {[
            ['Location', project.location],
            ['Category', project.category],
            ['Year', project.year],
            ['Studio', 'DURO MAKER INTERIORS']
          ].map(([key, val]) => (
            <div key={key} className="flex justify-between border-b border-earth/20 pb-2 gap-4">
              <dt className="text-earth font-medium">{key}</dt>
              <dd className="font-medium text-charcoal">{val}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="px-6 md:px-16 grid md:grid-cols-2 gap-6">
        {gallery.map((imgSrc, k) => (
          <button
            key={k}
            type="button"
            aria-label={`View image ${k + 1} of ${project.title}`}
            onClick={() => setLightboxIndex(k)}
            className={`block w-full cursor-zoom-in text-left ${k % 2 ? 'md:mt-24' : ''}`}
          >
            <Img
              src={imgSrc}
              className="aspect-[4/5] rounded-xs"
              alt={`${project.title} interior detail ${k + 1}`}
            />
          </button>
        ))}
      </section>

      <section className="px-6 md:px-16 py-24">
        <h2 className="display text-4xl mb-8">Materials & finishes</h2>
        <div className="flex flex-wrap gap-3">
          {project.materials.map((material) => (
            <span
              key={material}
              className="border border-earth/40 px-5 py-2 text-sm rounded-full bg-cream/30 text-charcoal"
            >
              {material}
            </span>
          ))}
        </div>
      </section>

      <Link
        to={`/works/${nextProject.slug}`}
        className="block bg-charcoal text-ivory px-6 md:px-16 py-28 hover:bg-charcoal/95 transition-colors group"
      >
        <p className="text-beige text-xs uppercase tracking-widest font-mono">Next project →</p>
        <Lines className="display text-6xl md:text-9xl mt-4 group-hover:text-beige transition-colors" text={nextProject.title} />
      </Link>
      <Lightbox
        images={gallery}
        index={lightboxIndex}
        setIndex={setLightboxIndex}
        title={project.title}
      />
    </>
  );
}
