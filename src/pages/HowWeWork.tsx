import { Link } from 'wouter';
import { ArrowRight, Check } from 'lucide-react';
import { CTA, Eyebrow, PageIntro, SectionHeading } from '@/components/site';
import { Faq, Reveal, Stagger, Timeline } from '@/components/Reveal';
import { FramedPhoto } from '@/components/Photo';
import { photos } from '@/content/photos';
import { faqs } from '@/content/faqs';

const models = [
  { name: 'Advisory sprint', fit: 'When you need clarity first', copy: 'A focused, time-boxed engagement to assess where you are and shape where to go next.', includes: ['Current-state review', 'Target architecture', 'Prioritised roadmap', 'Executive readout'] },
  { name: 'Delivery partnership', fit: 'When it is time to build', copy: 'A blended team of Quanta and your engineers delivering the roadmap in working increments.', includes: ['Embedded engineers', 'Fortnightly demos', 'Decision records', 'Knowledge transfer'], featured: true },
  { name: 'Managed operations', fit: 'When it needs to run well', copy: 'Ongoing operation and improvement of your AWS environment, with clear service levels.', includes: ['Monitoring and response', 'Patching and backups', 'Monthly cost reviews', 'Improvement backlog'] },
];
const phases = [
  { meta: 'Phase 01', title: 'Discover', copy: 'Interviews, workload discovery and a candid look at constraints, risks and opportunities.' },
  { meta: 'Phase 02', title: 'Define', copy: 'Target architecture, guardrails and a sequenced plan that the whole team agrees on.' },
  { meta: 'Phase 03', title: 'Build foundations', copy: 'Accounts, networking, identity and pipelines: the ground everything else stands on.' },
  { meta: 'Phase 04', title: 'Migrate & modernise', copy: 'Workloads move in waves, each one validated before the next begins.' },
  { meta: 'Phase 05', title: 'Hand over & improve', copy: 'Runbooks, training and a backlog of improvements your team is ready to own.' },
];
const promises = ['A named lead engineer from day one', 'Weekly written progress, in plain language', 'No surprises on scope or cost', 'Everything we build is yours to keep', 'Honest advice, even when it means less work for us'];

export default function HowWeWork() {
  return <>
    <PageIntro label="How we work" title="Clear steps. Shared ownership." description="Three ways to engage, one consistent way of working. Here is what to expect from the first call to the day you take the keys." photo={photos.planning} />

    <section className="section models"><div className="container">
      <SectionHeading eyebrow="Engagement models" title="Pick the shape that fits." body="Each model stands on its own, and they connect naturally as your needs change." />
      <Stagger className="model-grid">{models.map(({ name, fit, copy, includes, featured }) => <article key={name} className={`model-card ${featured ? 'model-featured' : ''}`}>{featured && <span className="model-badge">Most common</span>}<span className="model-fit">{fit}</span><h3>{name}</h3><p>{copy}</p><ul>{includes.map((x) => <li key={x}><Check size={14} />{x}</li>)}</ul><Link href="/contact" className="text-link">Ask about this <ArrowRight size={14} /></Link></article>)}</Stagger>
    </div></section>

    <section className="section phases"><div className="container phases-layout">
      <div className="phases-intro"><SectionHeading eyebrow="The journey" title="Five phases, no mysteries." body="Not every engagement uses every phase, but the order rarely changes." light /></div>
      <Timeline steps={phases} dark />
    </div></section>

    <section className="section promises"><div className="container promises-layout">
      <FramedPhoto photo={photos.celebration} ratio={4 / 5} />
      <div><Reveal><Eyebrow>What you can count on</Eyebrow><h2 className="section-title">Our side of the bargain.</h2></Reveal><Stagger className="promise-list">{promises.map((p) => <div key={p} className="promise-row"><p>{p}</p><Check size={18} /></div>)}</Stagger></div>
    </div></section>

    <section className="section faq-section"><div className="container faq-layout"><SectionHeading eyebrow="Practicalities" title="Questions about working together." /><Reveal><Faq items={faqs['/how-we-work']} /></Reveal></div></section>
    <CTA title="Not sure where to start?" text="That is a perfectly good place to start. Tell us what you are facing and we will suggest the right shape of help." />
  </>;
}
