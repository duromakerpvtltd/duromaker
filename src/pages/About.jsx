import { Link } from 'react-router-dom';
import { Img, Lines } from '../components/Reveal';
import InteriorImage from '../components/InteriorImage';
import { ABOUT_GALLERY } from '../data/interiorGallery';

const heroImage = ABOUT_GALLERY[0];
const processImages = ABOUT_GALLERY.slice(1);

export default function About() {
  return (
    <>
      <section className="relative flex min-h-[78dvh] items-end overflow-hidden text-ivory">
        <InteriorImage
          photo={heroImage}
          alt={heroImage.alt}
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-charcoal/45" />
        <div className="relative px-6 pb-16 md:px-16 md:pb-20">
          <Lines className="display max-w-5xl text-[13vw] md:text-[9vw]" text="Design starts with how you live." />
        </div>
      </section>

      <section className="grid gap-8 px-6 py-24 md:grid-cols-12 md:px-16 md:py-32">
        <h2 className="display text-5xl md:col-span-5 md:text-6xl">About Duro Maker</h2>
        <div className="space-y-5 leading-relaxed text-charcoal/80 md:col-span-6 md:col-start-7">
          <p>
            DURO MAKER INTERIORS helps clients think through residential and commercial spaces, from layout and storage to materials and lighting.
          </p>
          <p>
            A considered design begins with the needs of the people who use the space. The details follow from the brief, the site, and the choices made together.
          </p>
        </div>
      </section>

      <section className="bg-cream px-6 py-24 md:px-16 md:py-28">
        <h2 className="display mb-5 text-5xl md:text-6xl">Ideas take shape in the details.</h2>
        <p className="mb-12 max-w-2xl leading-relaxed text-charcoal/75">
          These Pexels photographs illustrate planning, material selection, craft, and finishing. They do not depict Duro Maker staff or completed projects.
        </p>
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
          {processImages.map((photo) => (
            <figure key={photo.id} className="mb-8 break-inside-avoid">
              <Img
                src={photo}
                alt={photo.alt}
                className={`w-full ${photo.orientation === 'portrait' ? 'aspect-4/5' : photo.orientation === 'square' ? 'aspect-square' : 'aspect-5/4'}`}
              />
              <figcaption className="mt-3">
                <span className="display text-2xl">{photo.title}</span>
                <span className="mt-1 block text-sm text-earth">{photo.subcategory} reference</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="grid gap-10 px-6 py-24 md:grid-cols-12 md:items-center md:px-16 md:py-32">
        <div className="md:col-span-7">
          <Lines className="display text-5xl md:text-6xl" text="A space, shaped around you." />
          <p className="mt-6 max-w-xl leading-relaxed text-charcoal/80">
            Share what you are planning, where the space is, and what matters most. We can start the conversation from there.
          </p>
        </div>
        <Link to="/contact" className="w-fit border-b border-charcoal pb-1 md:col-span-3 md:col-start-10">
          Contact Duro Maker
        </Link>
      </section>
    </>
  );
}
