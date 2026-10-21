import { Link } from 'wouter';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Art } from '@/components/Art';
import { NetworkScene } from '@/components/NetworkScene';
import { CTA, Eyebrow, SectionHeading } from '@/components/site';
import { Reveal, SplitWords, Stagger, Timeline } from '@/components/Reveal';
import { Img, ParallaxPhoto } from '@/components/Photo';
import { photos } from '@/content/photos';

const capabilities = [
  { number: '01', art: 'cube' as const, title: 'Cloud strategy & foundations', copy: 'Make the first move a sound one. We shape cloud environments around your operating reality and the outcomes that matter.' },
  { number: '02', art: 'rocket' as const, title: 'Migration & modernisation', copy: 'Move with purpose. Replatform, refactor or reimagine workloads with a path that protects continuity and opens new options.' },
  { number: '03', art: 'shield' as const, title: 'Security & resilience', copy: 'Build trust into the architecture, from identity and guardrails to recovery plans your teams can actually use.' },
  { number: '04', art: 'setting' as const, title: 'Managed cloud operations', copy: 'Keep improving after go-live with thoughtful operations, observability and an engineering partner in your corner.' },
];
const principles = [
  ['01', 'Start with the real problem', 'Technology is a means, not the brief. We make room for the context behind the ask.'],
  ['02', 'Design for the people who run it', 'Good architecture is understandable, operable and ready to evolve.'],
  ['03', 'Leave capability behind', 'Our work should make your teams stronger, not more dependent on us.'],
];
const industries = [
  { title: 'Financial services', photo: photos.finance, copy: 'Resilient, auditable platforms for regulated money movement.' },
  { title: 'Healthcare', photo: photos.healthcare, copy: 'Secure foundations for sensitive records and clinical systems.' },
  { title: 'Public sector', photo: photos.publicSector, copy: 'Dependable digital services that citizens can trust.' },
  { title: 'Energy & utilities', photo: photos.energy, copy: 'Data and operations platforms for distributed assets.' },
];
const engagement = [
  { meta: 'Weeks 1–2', title: 'Discover', copy: 'We map the estate, the constraints and what success needs to look like for the people involved.' },
  { meta: 'Weeks 2–4', title: 'Design', copy: 'A target architecture and a sequenced roadmap, with the trade-offs written down plainly.' },
  { meta: 'Increments', title: 'Deliver', copy: 'Engineering in small, working slices alongside your team, with progress you can see.' },
  { meta: 'Ongoing', title: 'Operate & improve', copy: 'Observability, cost reviews and steady improvement once the platform is live.' },
];
const awsServices = ['Amazon EC2', 'Amazon EKS', 'AWS Lambda', 'Amazon S3', 'Amazon Aurora', 'Amazon CloudFront', 'AWS Control Tower', 'AWS Organizations', 'IAM Identity Center', 'Amazon GuardDuty', 'AWS Security Hub', 'Amazon CloudWatch', 'AWS Systems Manager', 'Amazon DynamoDB'];

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const artY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 120]);
  const copyOpacity = useTransform(scrollYProgress, [0, .8], [1, reduced ? 1 : .2]);
  return <>
    <section className="home-hero" ref={heroRef}>
      <div className="hero-grid"></div><div className="hero-orbit hero-orbit-one"></div><div className="hero-orbit hero-orbit-two"></div>
      <div className="container hero-layout">
        <motion.div className="hero-copy" style={{ opacity: copyOpacity }}><Reveal from="none"><Eyebrow light>Cloud engineering for the long view</Eyebrow></Reveal>
          <h1 className="hero-title"><SplitWords>Build what<br />comes <em>next.</em></SplitWords></h1>
          <Reveal delay={.4}><p className="hero-deck">Quanta helps ambitious organisations modernise their cloud foundations with expert AWS engineering and a clear path from complexity to capability.</p></Reveal>
          <Reveal delay={.55}><div className="hero-actions"><Link href="/contact" className="button-primary" data-testid="link-hero-contact">Talk through your next move <ArrowRight size={16} /></Link><Link href="/services" className="button-quiet" data-testid="link-hero-services">Explore our services <ArrowUpRight size={16} /></Link></div></Reveal>
          <Reveal delay={.7}><div className="hero-caption"><span>Independent perspective.</span><span>Enterprise-ready delivery.</span></div></Reveal>
        </motion.div>
        <motion.div className="hero-art" style={{ y: artY }} initial={{ opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: 'easeOut' }}><div className="scene-kicker"><span className="live-dot" /> Systems in motion <span className="scene-coordinate">03°08′N / 101°41′E</span></div><NetworkScene /><div className="scene-caption"><span>INFRASTRUCTURE, RECONNECTED</span><span className="scene-caption-line"></span><span>Q-01</span></div></motion.div>
      </div>
      <div className="hero-bottom-bar"><span>Built for the future.</span><span>Cloud / Platform / Security / Operations</span><span>Scroll to explore ↓</span></div>
    </section>

    <Reveal className="intro-strip container">
      <img src="/assets/quanta-q.png" alt="Quanta" className="strip-mark" /><p className="strip-copy">Cloud transformation is not a destination. It is the capacity to <strong>keep moving with confidence.</strong></p><span className="strip-aside">A partner for the work ahead</span>
    </Reveal>

    <section className="section services-preview"><div className="container"><SectionHeading number="01" eyebrow="What we do" title={<>Complexity, made<br /><em>workable.</em></>} body="Practical cloud expertise, connected across the lifecycle, from the first architecture conversation to the everyday work of running well." />
      <Stagger className="capability-grid">{capabilities.map(({ number, art, title, copy }) => <article key={number} className="capability-card hover-lift" data-testid={`card-capability-${number}`}><div className="capability-top"><span>{number} / 04</span></div><Art name={art} size={104} className="capability-art" /><h3>{title}</h3><p>{copy}</p><Link href="/services" className="text-link">Explore capability <ArrowRight size={15} /></Link></article>)}</Stagger>
      <div className="service-bottom"><span className="font-mono">ONE CONNECTED PRACTICE</span><Link href="/services" className="text-link">All services <ArrowRight size={16} /></Link></div>
    </div></section>

    <section className="photo-story"><div className="container photo-story-layout">
      <div className="photo-story-images">
        <ParallaxPhoto photo={photos.engineeringTeam} ratio={4 / 5} className="photo-tall" />
        <ParallaxPhoto photo={photos.dataCentre} ratio={1} className="photo-offset" caption="FOUNDATIONS / 02" />
      </div>
      <Reveal className="photo-story-copy" from="left"><Eyebrow>Engineers in the room</Eyebrow><h2 className="section-title">The people who design it <em>help build it.</em></h2><p>There is no hand-off between the architects who shape your platform and the engineers who deliver it. The same team sits with yours from the first whiteboard session to the first production release, and stays close after it.</p><ul className="tick-list"><li>Senior engineers on every engagement</li><li>Decisions documented as they are made</li><li>Knowledge shared through pairing, not handovers</li></ul><Link href="/how-we-work" className="text-link">See how we work <ArrowRight size={16} /></Link></Reveal>
    </div></section>

    <section className="partner-callout"><div className="container partner-layout"><Reveal className="partner-copy"><Eyebrow>AWS partnership</Eyebrow><h2 className="section-title">Backed by AWS.<br /><em>Accountable to you.</em></h2><p>As an AWS Partner, we pair validated AWS expertise with direct access to AWS specialists and programmes, so every architecture we recommend is one we are ready to build, run and stand behind.</p><Link href="/aws-partner" className="text-link">Explore our AWS partnership <ArrowRight size={16} /></Link></Reveal><div className="partner-aside"><span>What we deliver</span><span>Well-Architected reviews</span><span>Migration</span><span>Modernisation</span><span>Managed operations</span></div></div></section>

    <section className="service-marquee" aria-label="AWS services we work with"><div className="marquee-track marquee-reverse">{[0, 1].map((n) => <span key={n} aria-hidden={n === 1}>{awsServices.map((s) => <b key={s}>{s}<i>✦</i></b>)}</span>)}</div></section>

    <section className="section industries-preview"><div className="container">
      <div className="split-head"><SectionHeading number="02" eyebrow="Where we work" title={<>Different sectors.<br /><em>Same discipline.</em></>} /><Reveal from="left"><p className="section-body">Every industry carries its own regulation, risk and pace. We bring a consistent engineering standard and adapt it to the context in front of us.</p><Link href="/industries" className="text-link">All industries <ArrowRight size={16} /></Link></Reveal></div>
      <Stagger className="industry-cards">{industries.map(({ title, photo, copy }) => <Link key={title} href="/industries" className="industry-card"><div className="industry-card-image"><Img photo={photo} ratio={3 / 4} sizes="(min-width: 980px) 25vw, 50vw" /></div><div className="industry-card-body"><h3>{title}</h3><p>{copy}</p><ArrowUpRight size={18} /></div></Link>)}</Stagger>
    </div></section>

    <section className="section principles-section"><div className="container principles-layout"><SectionHeading number="03" eyebrow="How we think" title={<>Good cloud work<br />is <em>human work.</em></>} body="The best technical answer is the one your organisation can understand, own and build on."/><Stagger className="principle-list">{principles.map(([number, title, copy]) => <article key={number} className="principle-row"><span className="font-mono">{number}</span><div><h3>{title}</h3><p>{copy}</p></div><ArrowUpRight size={18} /></article>)}</Stagger></div></section>

    <section className="section engagement-section"><div className="container engagement-layout">
      <SectionHeading number="04" eyebrow="An engagement, step by step" title={<>From first call<br />to <em>steady state.</em></>} body="Every engagement is shaped to fit, but most follow a familiar rhythm. You always know what is happening next and why." light />
      <Timeline steps={engagement} dark />
    </div></section>

    <section className="insight-feature"><div className="container insight-layout"><ParallaxPhoto photo={photos.digitalServices} ratio={1} caption="FIELD NOTE / 001" /><Reveal className="insight-copy" from="left"><Eyebrow>Ideas in practice</Eyebrow><span className="article-meta">PERSPECTIVE&nbsp;&nbsp; / &nbsp;&nbsp;6 MIN READ</span><h2 className="section-title">Modernise with intent, not momentum.</h2><p>Cloud transformation asks more than “what can we move?” Better questions reveal where to begin, and what should change along the way.</p><Link href="/insights" className="text-link">Read our latest insights <ArrowRight size={16} /></Link></Reveal></div></section>

    <section className="signal-band"><div className="marquee-track">{Array.from({ length: 4 }).map((_, i) => <span key={i}>A clearer cloud future <i>·</i> Architecture with intent <i>·</i> Partnership that compounds <i>·</i></span>)}</div></section>
    <CTA />
  </>;
}
