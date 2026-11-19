import { Link } from 'react-router-dom';
import { SERVICES } from '../data';

export default function Store() {
  return <section className="px-6 pb-28 pt-40 md:px-16">
    <h1 className="display text-[14vw] md:text-[9vw]">Our services</h1>
    <p className="mt-5 max-w-xl">DURO MAKER INTERIOR offers space planning, interior styling, and bespoke interiors.</p>
    <div className="mt-14 grid gap-x-10 md:grid-cols-2">
      {SERVICES.map((service) => <article key={service.title} className="border-t border-earth/50 py-7">
        <h2 className="display text-3xl md:text-4xl">{service.title}</h2>
        <p className="mt-3 max-w-md text-earth">{service.description}</p>
      </article>)}
    </div>
    <Link to="/contact" className="mt-10 inline-block border-b border-charcoal pb-1">Discuss a project</Link>
  </section>;
}
