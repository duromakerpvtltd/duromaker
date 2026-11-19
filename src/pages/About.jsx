import { Link } from 'react-router-dom';
import { INSTAGRAM_URL, PROJECTS, SERVICES } from '../data';

export default function About() {
  const project = PROJECTS[0];

  return <>
    <section className="px-6 pb-16 pt-40 md:px-16">
      <h1 className="display max-w-5xl text-[13vw] md:text-[9vw]">Turning empty spaces into experiences.</h1>
      <p className="mt-8 max-w-2xl">DURO MAKER INTERIOR is an interior design studio offering space planning, interior styling, and bespoke interiors.</p>
    </section>
    <section className="grid gap-10 px-6 py-16 md:grid-cols-2 md:px-16">
      <img src={project.image} alt={`Completed interior project at ${project.location}`} className="aspect-[4/5] w-full object-cover"/>
      <div className="self-center">
        <h2 className="display text-4xl md:text-6xl">Design for your space</h2>
        <div className="mt-8 space-y-5">
          {SERVICES.map((service) => <div key={service.title} className="border-t border-earth/50 pt-4">
            <h3 className="display text-2xl">{service.title}</h3>
            <p className="mt-2 text-earth">{service.description}</p>
          </div>)}
        </div>
        <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="mt-8 inline-block border-b border-charcoal pb-1">Follow the studio on Instagram</a>
        <p className="mt-8"><Link to="/contact" className="underline">Contact the studio</Link></p>
      </div>
    </section>
  </>;
}
