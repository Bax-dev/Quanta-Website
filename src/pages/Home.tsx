import { Link } from 'wouter';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Faq } from '@/components/Reveal';
import { FramedPhoto } from '@/components/Photo';
import { InkOrbitSculpture } from '@/components/ui/ink-orbit-sculpture';
import { photos } from '@/content/photos';
import { faqs } from '@/content/faqs';

const capabilities = [
  { title: 'Cloud strategy & foundations', copy: 'Landing zones, account structure, identity and guardrails shaped around how your organisation actually works.' },
  { title: 'Migration & modernisation', copy: 'Replatform, refactor or rebuild workloads on a sequenced plan that protects continuity.' },
  { title: 'Security & resilience', copy: 'Identity, detection and recovery plans designed into the architecture, not bolted on after.' },
  { title: 'Managed cloud operations', copy: 'Monitoring, cost reviews and steady improvement once the platform is live.' },
];
const industries = ['Financial services', 'Healthcare', 'Public sector', 'Energy & utilities'];
const awsServices = ['Control Tower', 'Organizations', 'IAM Identity Center', 'EKS', 'Lambda', 'Aurora', 'DynamoDB', 'GuardDuty', 'Security Hub', 'CloudWatch'];
const engagement = [
  ['Discover', 'Weeks 1–2', 'We map the estate, the constraints and what success needs to look like.'],
  ['Design', 'Weeks 2–4', 'A target architecture and a sequenced roadmap, with the trade-offs written down.'],
  ['Deliver', 'Increments', 'Engineering in small, working slices alongside your team.'],
  ['Operate', 'Ongoing', 'Observability, cost reviews and steady improvement after go-live.'],
];
const homeFaqs = [...faqs['/services'], ...faqs['/how-we-work']].slice(0, 6);

export default function Home() {
  return <>
    <section className="home-hero">
      <div className="container hero-layout">
        <div className="hero-main"><div className="hero-copy">
          <h1 className="hero-title">AWS cloud, engineered for regulated work</h1>
          <p className="hero-deck">Quanta designs, migrates and runs AWS platforms for financial services, healthcare, public sector and energy teams. The engineers who design your platform are the ones who build it.</p>
          <div className="hero-actions"><Link href="/contact" className="button-primary" data-testid="link-hero-contact">Book a call <ArrowRight size={16} /></Link><Link href="/services" className="button-ghost" data-testid="link-hero-services">Our services</Link></div>
        </div><InkOrbitSculpture className="hero-scene" background="#0a0a0a" hud={false} /></div>
        <div className="hero-strip"><span className="hero-strip-label">Sectors we work in</span>{industries.map((name) => <span key={name}>{name}</span>)}</div>
      </div>
    </section>

    <section className="section home-intro"><div className="container">
      <div className="split-intro"><h2 className="display-heading">Cloud foundations,<br /><span className="muted">done properly.</span></h2><p className="section-body">Architecture, migration and operations work better when the same team owns all three. We stay with your platform from the first whiteboard session to the everyday work of running it well.</p></div>
      <div className="numbered-grid">{capabilities.map(({ title, copy }, i) => <Link key={title} href="/services" className="numbered-item" data-testid={`card-capability-${i + 1}`}><span className="numbered-index">0{i + 1}</span><h3>{title}</h3><p>{copy}</p></Link>)}</div>
    </div></section>

    <section className="section home-bento"><div className="container">
      <h2 className="display-heading">How we work with AWS</h2>
      <p className="section-body">An AWS Partner with direct access to AWS specialists and programmes, so every architecture we recommend is one we are ready to build, run and stand behind.</p>
      <div className="bento">
        <article className="bento-card bento-wide">
          <div className="pill-row"><span className="pill pill-a">AWS Partner</span><span className="pill pill-b">Well-Architected</span></div>
          <h3>From first sketch to steady state</h3>
          <p>Most engagements follow the same rhythm, so you always know what is happening next and why.</p>
          <ol className="bento-steps">{engagement.map(([title, meta, copy]) => <li key={title}><span>{meta}</span><strong>{title}</strong><p>{copy}</p></li>)}</ol>
        </article>
        <article className="bento-card">
          <div className="pill-row"><span className="pill pill-c">Industries</span></div>
          <h3>Regulated sectors</h3>
          <ul className="bento-list">{industries.map((name) => <li key={name}>{name}</li>)}</ul>
          <Link href="/industries" className="text-link">All industries <ArrowUpRight size={15} /></Link>
        </article>
        <div className="bento-stack">
          <article className="bento-card bento-small"><span className="bento-label">Services we use most</span><div className="tag-cloud">{awsServices.map((s) => <span key={s}>{s}</span>)}</div></article>
          <article className="bento-card bento-cta"><p>Have a cloud problem to talk through?</p><Link href="/contact" className="button-primary">Book a call <ArrowRight size={16} /></Link></article>
        </div>
      </div>
    </div></section>

    <section className="section home-split"><div className="container split-layout">
      <div><h2 className="display-heading caps">The people who design it build it.</h2><p className="lead">There is no hand-off between the architects who shape your platform and the engineers who deliver it.</p><p className="lead">Senior engineers on every engagement, decisions documented as they are made, and knowledge shared through pairing rather than handover documents.</p><Link href="/how-we-work" className="text-link">See how we work <ArrowRight size={16} /></Link></div>
      <FramedPhoto photo={photos.engineeringTeam} ratio={5 / 4} className="split-photo" />
    </div></section>

    <section className="section home-insights"><div className="container">
      <div className="insights-head"><div><h2 className="display-heading caps">Latest <span className="muted">insights.</span></h2><p className="section-body">Practical notes on AWS architecture, migration, security and running platforms well.</p></div><Link href="/insights" className="text-link">View all posts <ArrowUpRight size={15} /></Link></div>
      <Link href="/insights" className="insight-row"><FramedPhoto photo={photos.digitalServices} ratio={16 / 9} /><div><span className="bento-label">Perspective · 6 min read</span><h3>Modernise with intent, not momentum</h3><p>Cloud transformation asks more than “what can we move?” Better questions reveal where to begin, and what should change along the way.</p></div></Link>
    </div></section>

    <section className="section home-faq"><div className="container faq-layout">
      <div><h2 className="display-heading caps">Frequently asked questions</h2><p className="section-body">What to expect when you start working with us.</p><div className="faq-help"><strong>Still have questions?</strong><p>Can’t find what you’re looking for? Send us a note and an engineer will reply.</p><Link href="/contact" className="button-primary button-block">Get in touch</Link></div></div>
      <Faq items={homeFaqs} />
    </div></section>
  </>;
}
