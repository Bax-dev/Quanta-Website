import { Link } from 'wouter';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { CTA, Eyebrow, PageIntro, SectionHeading } from '@/components/site';
import { Faq, Reveal, Stagger, Timeline } from '@/components/Reveal';
import { FramedPhoto } from '@/components/Photo';
import { photos } from '@/content/photos';
import { faqs } from '@/content/faqs';

const serviceList = [
  { no: '01', title: 'Cloud strategy & foundations', tag: 'Start with solid ground', detail: 'A cloud environment should reflect the way your organisation works, not force you into someone else’s blueprint.', points: ['Cloud readiness and strategy', 'Landing zones and account design', 'Governance, identity and guardrails'] },
  { no: '02', title: 'Migration & transformation', tag: 'Move with a reason', detail: 'We bring the plan, sequencing and engineering discipline to move workloads without losing sight of the business case.', points: ['Portfolio discovery and planning', 'Workload migration and validation', 'Data and application transitions'] },
  { no: '03', title: 'Application modernisation', tag: 'Make change count', detail: 'Modernise at the pace that makes sense: from targeted replatforming through to cloud-native redesign.', points: ['Application assessment', 'Container and platform engineering', 'DevOps and delivery enablement'] },
  { no: '04', title: 'Security & resilience', tag: 'Confidence by design', detail: 'Create a security posture that is part of the architecture, visible to the people responsible and ready for change.', points: ['Cloud security posture', 'Identity and access patterns', 'Resilience and recovery planning'] },
  { no: '05', title: 'Managed cloud services', tag: 'Run it. Improve it.', detail: 'Reliable operations pair clear ownership with useful insight, so teams can spend less time firefighting and more time improving.', points: ['Cloud monitoring and operations', 'Cost and performance reviews', 'Continuous improvement'] },
  { no: '06', title: 'Cloud-native engineering', tag: 'Build for what is next', detail: 'Design and engineer platforms and services that give product teams room to ship, scale and adapt.', points: ['Platform architecture', 'Infrastructure as code', 'Observability and automation'] },
];
const deliverables = [
  { title: 'A roadmap you can defend', copy: 'Sequenced work with the reasoning, risks and dependencies written down, ready for a board or a sprint plan.' },
  { title: 'Architecture on record', copy: 'Diagrams and decision records that explain not only what was built, but why it was built that way.' },
  { title: 'Measurable foundations', copy: 'Dashboards, alerts and cost views in place from day one, so the platform tells you how it is doing.' },
  { title: 'A stronger team', copy: 'Runbooks, pairing and walkthroughs that leave your engineers confident to own what we built together.' },
];
const rhythm = [
  { title: 'Listen', copy: 'Understand the context before prescribing a solution.' },
  { title: 'Shape', copy: 'Turn the goal into a clear, sensible path of work.' },
  { title: 'Build', copy: 'Engineer with your teams, not around them.' },
  { title: 'Strengthen', copy: 'Learn from delivery and keep improving.' },
];

export default function Services() {
  return <>
    <PageIntro label="Services" title="Cloud capability, connected." description="One engineering practice across the cloud lifecycle. Bring us a defined brief or an early question. We will help you find the right place to begin." />
    <section className="services-page-intro"><Reveal className="container services-intro-layout"><p>Architecture, migration, modernisation and operations work better when they are not treated as separate problems. Our services connect the decisions that shape your cloud with the work that keeps it delivering.</p></Reveal></section>

    <section className="service-catalog"><div className="container">{serviceList.map(({ no, title, tag, detail, points }) => <Reveal key={no}><article className="service-detail" id={`service-${no}`} data-testid={`service-${no}`}><div className="service-detail-main"><div className="service-detail-kicker">{tag}</div><h2>{title}</h2><p className="service-description">{detail}</p><Stagger className="service-points">{points.map((point) => <span key={point}>{point}</span>)}</Stagger></div><Link href="/contact" className="service-arrow" aria-label={`Ask about ${title}`} data-testid={`link-service-${no}`}><ArrowUpRight size={21} /></Link></article></Reveal>)}</div></section>

    <section className="photo-split"><div className="container photo-split-layout">
      <FramedPhoto photo={photos.pairing} ratio={5 / 4} />
      <Reveal className="photo-split-copy"><Eyebrow>Working side by side</Eyebrow><h2 className="section-title">We build it with you, not for you.</h2><p>Our engineers join your stand-ups, work in your repositories and pair with your people. By the time we step back, the platform already has owners who understand it.</p><Link href="/how-we-work" className="text-link">Engagement models <ArrowRight size={16} /></Link></Reveal>
    </div></section>

    <section className="section deliverables"><div className="container">
      <SectionHeading eyebrow="What you walk away with" title="Outcomes you can hold on to." body="Whatever the scope, every engagement leaves behind more than infrastructure." />
      <Stagger className="deliverable-grid">{deliverables.map(({ title, copy }) => <article key={title} className="deliverable-card"><h3>{title}</h3><p>{copy}</p></article>)}</Stagger>
    </div></section>

    <section className="service-path"><div className="container rhythm-layout"><Reveal><Eyebrow>Our working rhythm</Eyebrow><h2 className="section-title">Four beats, every time.</h2></Reveal><Timeline steps={rhythm} /></div></section>

    <section className="section faq-section"><div className="container faq-layout"><SectionHeading eyebrow="Questions we hear" title="Before you ask." /><Reveal><Faq items={faqs['/services']} /></Reveal></div></section>

    <CTA title="Bring us the cloud question." text="Whether you are planning a first landing zone or untangling a complex estate, a useful conversation can start before the brief is perfect." />
  </>;
}
