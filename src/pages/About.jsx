import { Lines, Img } from '../components/Reveal';
import { IMG } from '../data';

const STEPS = [
  ['Listen', 'We start with how you live and work, not with a mood board.'],
  ['Plan', 'Space planning and a design concept, tested in drawings and models.'],
  ['Detail', 'Materials, joinery and lighting resolved before anything is built.'],
  ['Deliver', 'We manage the build and hand over a finished, furnished space.']
];

const TEAM = [
  ['Isha Verma', 'Principal Designer', IMG.portraitA],
  ['Arjun Nair', 'Architect', IMG.portraitB],
  ['Sana Qureshi', 'Furniture & Styling Lead', IMG.portraitC]
];

export default function About() {
  return (
    <>
      <section className="min-h-[70vh] px-6 md:px-16 pt-40 pb-16 flex flex-col justify-end">
        <Lines className="display text-[15vw] md:text-[11vw]" text="Made with patience." />
      </section>

      <section className="px-6 md:px-16 py-24 grid md:grid-cols-2 gap-16 items-center">
        <Img src={IMG.e} className="aspect-[4/5] rounded-xs" alt="Duro Maker craft and practice" />
        <div className="space-y-6 max-w-lg">
          <h2 className="display text-5xl">Our story</h2>
          <p className="text-charcoal/85 leading-relaxed">
            DURO MAKER INTERIORS was founded on one clear belief: a space should be conceived, designed, and executed with seamless care. We bring together architects, interior designers, and master craftsmen to craft residences and commercial spaces across Odisha.
          </p>
          <p className="text-earth text-sm leading-relaxed">
            From initial spatial flow and bespoke joinery to tactile materials and subtle illumination, we focus on durability, comfort, and timeless warmth.
          </p>
        </div>
      </section>

      <section className="bg-cream px-6 md:px-16 py-28">
        <h2 className="display text-5xl mb-14">How we work</h2>
        <div className="grid md:grid-cols-4 gap-10">
          {STEPS.map(([title, desc], i) => (
            <div key={title} className="border-t border-earth pt-5">
              <span className="text-xs uppercase tracking-wider text-earth font-mono">Step {i + 1}</span>
              <h3 className="display text-3xl mt-2">{title}</h3>
              <p className="mt-3 text-sm text-charcoal/80 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-16 py-28">
        <h2 className="display text-5xl mb-14">The studio team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {TEAM.map(([name, role, photo]) => (
            <div key={name} className="group">
              <Img src={photo} className="aspect-[3/4] object-top rounded-xs" alt={name} />
              <h3 className="display text-3xl mt-4">{name}</h3>
              <p className="text-earth text-sm mt-1">{role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-charcoal text-ivory px-6 md:px-16 py-24 grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          ['120+', 'Projects delivered'],
          ['14', 'Years of practice'],
          ['9', 'Design accolades'],
          ['35+', 'Makers & partners']
        ].map(([stat, label]) => (
          <div key={label}>
            <div className="display text-6xl text-beige">{stat}</div>
            <p className="text-earth text-sm mt-1">{label}</p>
          </div>
        ))}
      </section>
    </>
  );
}
