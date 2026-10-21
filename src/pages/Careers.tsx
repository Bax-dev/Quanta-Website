import { Link } from 'wouter';
import { ArrowRight, ArrowUpRight, BookOpen, Laptop, HeartHandshake, Sparkles } from 'lucide-react';
import { Art } from '@/components/Art';
import { CTA, Eyebrow, PageIntro, SectionHeading } from '@/components/site';
import { Reveal, Stagger, Timeline } from '@/components/Reveal';
import { ParallaxPhoto } from '@/components/Photo';
import { photos } from '@/content/photos';

const disciplines = [
  { art: 'bulb' as const, title: 'Cloud architecture', copy: 'Shape platforms with clients, weigh trade-offs and write the decisions down.' },
  { art: 'tool' as const, title: 'Platform engineering', copy: 'Build the landing zones, pipelines and tooling that teams rely on every day.' },
  { art: 'lock' as const, title: 'Security engineering', copy: 'Design guardrails, identity and detection that help people move safely.' },
  { art: 'trophy' as const, title: 'Delivery leadership', copy: 'Keep engagements clear, calm and honest for clients and engineers alike.' },
];
const perks = [
  { icon: BookOpen, title: 'Time to learn', copy: 'Protected learning time and support for AWS certifications.' },
  { icon: Laptop, title: 'Flexible working', copy: 'Remote-first, with time together when it genuinely helps.' },
  { icon: HeartHandshake, title: 'Real mentorship', copy: 'Pair with senior engineers on live work from your first week.' },
  { icon: Sparkles, title: 'Work that matters', copy: 'Platforms that keep banks, hospitals and public services running.' },
];
const hiring = [
  { title: 'Introduce yourself', copy: 'Send a short note about what you have built and what you want to learn next.' },
  { title: 'A conversation', copy: 'An informal chat with an engineer about your experience and our work.' },
  { title: 'A practical session', copy: 'Work through a realistic design problem together, no trick questions.' },
  { title: 'Meet the team', copy: 'Spend time with the people you would work alongside, then decide together.' },
];

export default function Careers() {
  return <>
    <PageIntro label="Careers" index="08" title={<>Build the cloud.<br /><em>Grow with it.</em></>} description="We are a team of engineers who like hard problems, clear thinking and helping each other get better. If that sounds like you, we would like to hear from you." photo={photos.pairing} />

    <section className="careers-collage"><div className="container collage-grid">
      <ParallaxPhoto photo={photos.teamAtWork} ratio={4 / 3} className="collage-a" />
      <ParallaxPhoto photo={photos.celebration} ratio={1} className="collage-b" />
      <ParallaxPhoto photo={photos.workshop} ratio={4 / 5} className="collage-c" caption="Q / CULTURE" />
    </div></section>

    <section className="section disciplines"><div className="container">
      <SectionHeading number="01" eyebrow="Disciplines we grow" title={<>Where you could<br /><em>fit in.</em></>} body="We do not always have open roles in every discipline, but we are always glad to meet good engineers." />
      <Stagger className="discipline-grid">{disciplines.map(({ art, title, copy }) => <article key={title} className="discipline-card hover-lift"><Art name={art} size={96} className="discipline-art" /><h3>{title}</h3><p>{copy}</p><ArrowUpRight size={18} className="discipline-arrow" /></article>)}</Stagger>
    </div></section>

    <section className="section perks"><div className="container">
      <SectionHeading number="02" eyebrow="Life at Quanta" title={<>Good engineers need<br /><em>room to grow.</em></>} light />
      <Stagger className="perk-grid">{perks.map(({ icon: Icon, title, copy }) => <article key={title} className="perk-card"><span className="icon-chip icon-chip-light"><Icon size={20} /></span><h3>{title}</h3><p>{copy}</p></article>)}</Stagger>
    </div></section>

    <section className="section hiring"><div className="container rhythm-layout"><Reveal><Eyebrow>How we hire</Eyebrow><h2 className="section-title">A process that<br /><em>respects your time.</em></h2><p className="section-body">Four steps, honest feedback at each one, and a decision within days rather than weeks.</p><Link href="/contact" className="button-primary">Introduce yourself <ArrowRight size={16} /></Link></Reveal><Timeline steps={hiring} /></div></section>

    <CTA title="Don’t see the perfect role?" text="Write to us anyway. Some of our best conversations started with a speculative note." />
  </>;
}
