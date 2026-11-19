import { Link, useParams } from 'react-router-dom';
import { PROJECTS } from '../data';

export default function Project() {
  const { slug } = useParams();
  const project = PROJECTS.find((item) => item.slug === slug);

  if (!project) return <section className="min-h-[100dvh] px-6 pt-40 md:px-16">
    <Link to="/works" className="underline">Back to our work</Link>
  </section>;

  return <>
    <section className="relative min-h-[80dvh] text-ivory">
      <img src={project.image} alt={`Interior project at ${project.location}`} className="absolute inset-0 h-full w-full object-cover"/>
      <div className="absolute inset-0 bg-charcoal/35"/>
      <h1 className="display absolute bottom-10 left-6 text-5xl md:bottom-14 md:left-16 md:text-8xl">{project.title}</h1>
    </section>
    <section className="px-6 py-20 md:px-16">
      <div className="grid gap-10 md:grid-cols-3">
        <div className="md:col-span-2">
          <h2 className="display text-4xl">Project details</h2>
          <p className="mt-5 max-w-xl">{project.description}</p>
        </div>
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between gap-4 border-b border-beige pb-2"><dt className="text-earth">Location</dt><dd>{project.location}</dd></div>
          <div className="flex justify-between gap-4 border-b border-beige pb-2"><dt className="text-earth">Shared</dt><dd>{project.date}</dd></div>
        </dl>
      </div>
      <a href={project.instagramUrl} target="_blank" rel="noreferrer" className="mt-10 inline-block border-b border-charcoal pb-1">View the original Instagram post</a>
      <p className="mt-10"><Link to="/works" className="underline">Back to our work</Link></p>
    </section>
  </>;
}
