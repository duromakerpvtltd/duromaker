import {useParams,Link} from 'react-router-dom';import {PROJECTS,IMG} from '../data';import {Img,Lines} from '../components/Reveal';
export default function Project(){const {slug}=useParams();const i=PROJECTS.findIndex(p=>p.slug===slug);const p=PROJECTS[i];
 if(!p)return <section className="pt-40 px-16 min-h-screen"><Link to="/works" className="underline">Back to works</Link></section>;
 const next=PROJECTS[(i+1)%PROJECTS.length];const gal=[IMG.b,IMG.c,IMG.d,IMG.e];
 return <>
 <section className="h-screen relative text-ivory"><img src={p.img} alt={p.title} className="absolute inset-0 w-full h-full object-cover"/><div className="absolute inset-0 bg-charcoal/30"/><h1 className="display absolute bottom-12 left-6 md:left-16 text-[14vw] md:text-[10vw]">{p.title}</h1></section>
 <section className="px-6 md:px-16 py-24 grid md:grid-cols-3 gap-12"><div className="md:col-span-2"><h2 className="display text-4xl mb-4">Overview</h2><p className="max-w-xl">{p.concept}</p><h2 className="display text-4xl mt-14 mb-4">Design concept</h2><p className="max-w-xl">Every surface was chosen to age well. Circulation is kept soft and indirect, so rooms reveal themselves slowly.</p></div>
 <dl className="space-y-3 text-sm">{[['Location',p.location],['Category',p.category],['Year',p.year]].map(([k,v])=><div key={k} className="flex justify-between border-b border-beige pb-2"><dt className="text-earth">{k}</dt><dd>{v}</dd></div>)}</dl></section>
 <section className="px-6 md:px-16 grid md:grid-cols-2 gap-6">{gal.map((g,k)=><Img key={k} src={g} className={`aspect-[4/5] ${k%2?'md:mt-24':''}`}/>)}</section>
 <section className="px-6 md:px-16 py-24"><h2 className="display text-4xl mb-8">Materials and finishes</h2><div className="flex flex-wrap gap-3">{p.materials.map(m=><span key={m} className="border border-earth px-5 py-2">{m}</span>)}</div></section>
 <Link to={`/works/${next.slug}`} className="block bg-charcoal text-ivory px-6 md:px-16 py-28"><p className="text-beige text-sm">Next project</p><Lines className="display text-6xl md:text-9xl mt-3" text={next.title}/></Link></>}
