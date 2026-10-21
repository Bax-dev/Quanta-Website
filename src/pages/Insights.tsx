import { useMemo, useState } from 'react';
import { Link } from 'wouter';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Clock3, Compass, Layers3, ShieldCheck, Activity } from 'lucide-react';
import { CTA, Eyebrow, PageIntro, SectionHeading } from '@/components/site';
import { Reveal, Stagger } from '@/components/Reveal';
import { Img, ParallaxPhoto, type Photo } from '@/components/Photo';
import { photos } from '@/content/photos';

const articles: { category: string; time: string; title: string; summary: string; date: string; photo: Photo }[] = [
  { category: 'Perspective', time: '6 min read', title: 'Modernise with intent, not momentum.', summary: 'Cloud transformation asks more than “what can we move?” Better questions reveal where to begin, and what should change along the way.', date: 'FIELD NOTE  /  01', photo: photos.planning },
  { category: 'Architecture', time: '8 min read', title: 'A landing zone is a beginning, not a destination.', summary: 'Foundations do not have to become a finished monument. Design for the teams, workloads and decisions that arrive next.', date: 'ENGINEERING  /  02', photo: photos.serverRack },
  { category: 'Security', time: '5 min read', title: 'Security guardrails should help people move.', summary: 'The most useful controls are clear enough to follow and thoughtful enough to support real delivery.', date: 'PERSPECTIVE  /  03', photo: photos.padlock },
  { category: 'Operations', time: '7 min read', title: 'What changes after the migration plan?', summary: 'The first weeks of cloud operations can set the tone for years. Here is what teams should be looking for.', date: 'FIELD NOTE  /  04', photo: photos.dashboards },
  { category: 'Perspective', time: '4 min read', title: 'Cost visibility is a design conversation.', summary: 'Cloud economics work best when they are connected to architecture, ownership and product decisions.', date: 'PERSPECTIVE  /  05', photo: photos.finance },
  { category: 'Architecture', time: '9 min read', title: 'Platform thinking starts with a team question.', summary: 'Before choosing the tools, get specific about the friction a platform should remove.', date: 'ENGINEERING  /  06', photo: photos.teamAtWork },
];
const filters = ['All', 'Perspective', 'Architecture', 'Security', 'Operations'];
const topics = [
  { icon: Compass, title: 'Perspective', copy: 'Where cloud strategy meets the realities of organisations.' },
  { icon: Layers3, title: 'Architecture', copy: 'Patterns, trade-offs and the reasoning behind them.' },
  { icon: ShieldCheck, title: 'Security', copy: 'Guardrails that protect without slowing teams down.' },
  { icon: Activity, title: 'Operations', copy: 'Running well, measuring honestly and improving steadily.' },
];

export default function Insights() {
  const [filter, setFilter] = useState('All');
  const filtered = useMemo(() => filter === 'All' ? articles : articles.filter((a) => a.category === filter), [filter]);
  return <>
    <PageIntro label="Ideas in practice" index="06" title={<>A clearer view<br />of cloud <em>change.</em></>} description="Practical perspectives on the questions that shape cloud decisions, from architecture and security to migration and the work of running well." />
    <section className="insights-featured"><div className="container featured-layout"><ParallaxPhoto photo={photos.digitalServices} ratio={4 / 3} caption="Q / FIELD NOTE 001" /><Reveal className="featured-story" from="left"><Eyebrow>Featured perspective</Eyebrow><span className="article-meta">PERSPECTIVE &nbsp;·&nbsp; 6 MIN READ</span><h2>Modernise with intent, not momentum.</h2><p>When the cloud conversation starts with “what should we move?”, it can miss the more useful question: what does your organisation need to do differently?</p><a href="#all-insights" className="text-link">Explore the journal <ArrowRight size={16} /></a></Reveal></div></section>

    <section className="section topics"><div className="container">
      <SectionHeading number="01" eyebrow="What we write about" title={<>Four lenses on<br /><em>cloud work.</em></>} />
      <Stagger className="topic-grid">{topics.map(({ icon: Icon, title, copy }) => <button key={title} type="button" className="topic-card hover-lift" onClick={() => { setFilter(title); document.getElementById('all-insights')?.scrollIntoView({ behavior: 'smooth' }); }}><Icon size={22} /><h3>{title}</h3><p>{copy}</p><span className="text-link">Read {title.toLowerCase()} <ArrowRight size={14} /></span></button>)}</Stagger>
    </div></section>

    <section id="all-insights" className="insights-list"><div className="container"><div className="insights-toolbar"><Reveal><Eyebrow>Quanta journal</Eyebrow><h2 className="section-title">Notes for the work<br /><em>ahead.</em></h2></Reveal><div className="filter-group" aria-label="Filter articles">{filters.map((item) => <button key={item} type="button" className={`filter-chip ${filter === item ? 'selected' : ''}`} onClick={() => setFilter(item)} aria-pressed={filter === item} data-testid={`button-filter-${item.toLowerCase()}`}>{item}</button>)}</div></div>
      <motion.div layout className="article-grid"><AnimatePresence mode="popLayout">{filtered.map((article, i) => <motion.article layout key={article.title} initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .96 }} transition={{ duration: .35 }} className="article-card" data-testid={`card-insight-${i}`}><div className="article-card-image"><Img photo={article.photo} ratio={16 / 10} sizes="(min-width: 980px) 33vw, 100vw" /></div><div className="article-card-top"><span>{article.date}</span><ArrowUpRight size={17} /></div><div className="article-card-meta"><span>{article.category}</span><span><Clock3 size={13} />{article.time}</span></div><h3>{article.title}</h3><p>{article.summary}</p><Link href="/contact" className="text-link">Discuss this idea <ArrowRight size={14} /></Link></motion.article>)}</AnimatePresence></motion.div>
      <p className="insights-note">Ideas are written to open a conversation, not close one. If something here resonates, we would be glad to hear what you are seeing.</p></div></section>

    <section className="suggest-band"><Reveal className="container suggest-layout"><div><Eyebrow light>Got a question we should tackle?</Eyebrow><h2 className="section-title">Suggest the next <em>field note.</em></h2></div><Link href="/contact" className="button-primary">Send us a topic <ArrowRight size={16} /></Link></Reveal></section>
    <CTA title="Have a question worth exploring?" text="We like the conversations that begin with a good question." dark={false} />
  </>;
}
