import { Link } from 'react-router-dom';
import { INSTAGRAM_URL, PROJECTS } from '../data';

export default function Works() {
  return <section className="px-6 pb-28 pt-40 md:px-16">
    <h1 className="display text-[14vw] md:text-[9vw]">Our work</h1>
    <p className="mt-5 max-w-xl">A completed project shared by DURO MAKER INTERIOR on Instagram.</p>
    <div className="mt-14 grid gap-8 md:grid-cols-2">
      {PROJECTS.map((project) => <article key={project.slug}>
        <Link to={`/works/${project.slug}`} className="group block">
          <div className="overflow-hidden">
            <img src={project.image} alt={`Interior project at ${project.location}`} className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-[1.02]"/>
          </div>
          <div className="mt-4 flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="display text-3xl">{project.title}</h2>
            <span className="text-sm text-earth">{project.date}</span>
          </div>
        </Link>
      </article>)}
    </div>
    <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="mt-12 inline-block border-b border-charcoal pb-1">See more work on Instagram</a>
  </section>;
}
