import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { CTA, Eyebrow, PageIntro, SectionHeading } from '@/components/site';
import { Reveal, Stagger, Timeline } from '@/components/Reveal';
import { photos } from '@/content/photos';

const disciplines = [
  { title: 'Cloud architecture', copy: 'Shape platforms with clients, weigh trade-offs and write the decisions down.' },
  { title: 'Platform engineering', copy: 'Build the landing zones, pipelines and tooling that teams rely on every day.' },
  { title: 'Security engineering', copy: 'Design guardrails, identity and detection that help people move safely.' },
  { title: 'Delivery leadership', copy: 'Keep engagements clear, calm and honest for clients and engineers alike.' },
];
const perks = [
  { title: 'Time to learn', copy: 'Protected learning time and support for AWS certifications.' },
  { title: 'Flexible working', copy: 'Remote-first, with time together when it genuinely helps.' },
  { title: 'Real mentorship', copy: 'Pair with senior engineers on live work from your first week.' },
  { title: 'Work that matters', copy: 'Platforms that keep banks, hospitals and public services running.' },
];
const hiring = [
  { title: 'Introduce yourself', copy: 'Send a short note about what you have built and what you want to learn next.' },
  { title: 'A conversation', copy: 'An informal chat with an engineer about your experience and our work.' },
  { title: 'A practical session', copy: 'Work through a realistic design problem together, no trick questions.' },
  { title: 'Meet the team', copy: 'Spend time with the people you would work alongside, then decide together.' },
];

export default function Careers() {
  return <>
    <PageIntro label="Careers" title="Build the cloud. Grow with it." description="We are a team of engineers who like hard problems, clear thinking and helping each other get better. If that sounds like you, we would like to hear from you." photo={photos.pairing} />

    <section className="section disciplines"><div className="container">
      <SectionHeading eyebrow="Disciplines we grow" title="Where you could fit in." body="We do not always have open roles in every discipline, but we are always glad to meet good engineers." />
      <Stagger className="discipline-grid">{disciplines.map(({ title, copy }) => <article key={title} className="discipline-card"><h3>{title}</h3><p>{copy}</p></article>)}</Stagger>
    </div></section>

    <section className="section perks"><div className="container">
      <SectionHeading eyebrow="Life at Quanta" title="Good engineers need room to grow." light />
      <Stagger className="perk-grid">{perks.map(({ title, copy }) => <article key={title} className="perk-card"><h3>{title}</h3><p>{copy}</p></article>)}</Stagger>
    </div></section>

    <section className="section hiring"><div className="container rhythm-layout"><Reveal><Eyebrow>How we hire</Eyebrow><h2 className="section-title">A process that respects your time.</h2><p className="section-body">Four steps, honest feedback at each one, and a decision within days rather than weeks.</p><Link href="/contact" className="button-primary">Introduce yourself <ArrowRight size={16} /></Link></Reveal><Timeline steps={hiring} /></div></section>

    <CTA title="Don’t see the perfect role?" text="Write to us anyway. Some of our best conversations started with a speculative note." />
  </>;
}
