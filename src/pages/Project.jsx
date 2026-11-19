import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import InteriorImage from '../components/InteriorImage';
import Lightbox from '../components/Lightbox';
import { WORKS_GALLERY } from '../data/interiorGallery';

export default function Project() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const { slug } = useParams();
  const index = WORKS_GALLERY.findIndex((entry) => entry.id === slug);
  const reference = WORKS_GALLERY[index];

  if (!reference) {
    return (
      <section className="flex min-h-screen flex-col items-start justify-center px-6 pt-40 md:px-16">
        <h1 className="display text-5xl">Reference not found</h1>
        <p className="mt-4 max-w-xl text-earth">This inspiration image may have been removed from the gallery.</p>
        <Link to="/works" className="mt-8 border-b border-charcoal pb-1">
          Back to the inspiration gallery
        </Link>
      </section>
    );
  }

  const relatedImages = WORKS_GALLERY
    .filter((entry) => entry.category === reference.category)
    .slice(0, 6);
  const nextReference = WORKS_GALLERY[(index + 1) % WORKS_GALLERY.length];

  return (
    <>
      <section className="relative flex min-h-[85dvh] items-end overflow-hidden text-ivory">
        <InteriorImage
          photo={reference}
          alt={reference.alt}
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-charcoal/40" />
        <div className="relative px-6 pb-16 md:px-16 md:pb-20">
          <p className="mb-4 text-sm text-ivory/90">Inspiration reference / {reference.category}</p>
          <h1 className="display max-w-6xl text-[12vw] leading-[1.02] md:text-[8vw]">
            {reference.title}
          </h1>
        </div>
      </section>

      <section className="grid gap-12 px-6 py-24 md:grid-cols-12 md:px-16">
        <div className="md:col-span-7">
          <h2 className="display mb-5 text-4xl">About this reference</h2>
          <p className="max-w-2xl text-lg leading-relaxed text-charcoal/85">
            {reference.detailedDescription}
          </p>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-earth">
            This is third-party inspiration photography, not a verified Duro Maker client project or product.
          </p>
        </div>

        <dl className="self-start border-t border-earth/30 pt-5 text-sm md:col-span-4 md:col-start-9">
          <div className="flex justify-between gap-4 border-b border-earth/20 py-3">
            <dt className="text-earth">Category</dt>
            <dd className="text-right font-medium text-charcoal">{reference.category}</dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-earth/20 py-3">
            <dt className="text-earth">Reference type</dt>
            <dd className="text-right font-medium text-charcoal">Inspiration</dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-earth/20 py-3">
            <dt className="text-earth">Image source</dt>
            <dd className="text-right font-medium text-charcoal">{reference.source}</dd>
          </div>
          <div className="flex flex-col gap-3 pt-5">
            <a href={reference.sourceUrl} target="_blank" rel="noreferrer" className="w-fit border-b border-charcoal pb-1">
              View original photo
            </a>
            <a href={reference.licenseUrl} target="_blank" rel="noreferrer" className="w-fit border-b border-charcoal pb-1">
              Read Pexels License
            </a>
          </div>
        </dl>
      </section>

      <section className="px-6 pb-24 md:px-16">
        <h2 className="display mb-8 text-4xl">More {reference.category.toLowerCase()}</h2>
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {relatedImages.map((entry, galleryIndex) => (
            <button
              key={entry.id}
              type="button"
              aria-label={`View ${entry.title} in the gallery`}
              onClick={() => setLightboxIndex(galleryIndex)}
              className="group cursor-zoom-in text-left"
            >
              <div className={`overflow-hidden ${entry.orientation === 'portrait' ? 'aspect-[4/5]' : entry.orientation === 'square' ? 'aspect-square' : 'aspect-[5/4]'}`}>
                <InteriorImage
                  photo={entry}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <span className="mt-3 block text-sm text-earth">{entry.category}</span>
              <span className="display mt-1 block text-2xl">{entry.title}</span>
            </button>
          ))}
        </div>
      </section>

      <Link
        to={`/works/${nextReference.id}`}
        className="block bg-charcoal px-6 py-20 text-ivory transition-colors hover:bg-charcoal/95 md:px-16 md:py-28"
      >
        <p className="text-sm text-beige">Next inspiration reference</p>
        <span className="display mt-4 block text-5xl md:text-7xl">{nextReference.title}</span>
      </Link>
      <Lightbox
        images={relatedImages}
        index={lightboxIndex}
        setIndex={setLightboxIndex}
        title={reference.category}
      />
    </>
  );
}
