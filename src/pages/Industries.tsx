import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { CTA, PageIntro, SectionHeading } from '@/components/site';
import { Reveal, Stagger } from '@/components/Reveal';
import { FramedPhoto } from '@/components/Photo';
import { photos } from '@/content/photos';

const sectors = [
  { title: 'Financial services', photo: photos.finance, lead: 'Resilience and auditability are not optional extras.', copy: 'Banks, lenders, insurers and fintechs need platforms that keep money moving and regulators satisfied. We design for availability, traceability and change control from the first account boundary.', focus: ['Regulated landing zones', 'Core system migration', 'Fraud and data platforms'] },
  { title: 'Healthcare', photo: photos.healthcare, lead: 'Sensitive data deserves careful engineering.', copy: 'From patient records to clinical tools, healthcare systems carry high stakes. We build secure, well-governed foundations that let care teams rely on technology rather than work around it.', focus: ['Data protection by design', 'Clinical system hosting', 'Disaster recovery'] },
  { title: 'Public sector', photo: photos.publicSector, lead: 'Services citizens can depend on.', copy: 'Public organisations need value for money, transparency and services that stay up when demand spikes. We help modernise legacy estates in steps that protect continuity.', focus: ['Legacy modernisation', 'Cost transparency', 'Accessible digital services'] },
  { title: 'Education', photo: photos.education, lead: 'Learning platforms that scale with the term.', copy: 'Universities and education providers see sharp peaks around enrolment and exams. We engineer elastic platforms and sensible identity models for students, staff and partners.', focus: ['Elastic learning platforms', 'Identity at scale', 'Research computing'] },
  { title: 'Energy & utilities', photo: photos.energy, lead: 'Data from the field, decisions in the cloud.', copy: 'Distributed assets generate constant data. We build platforms that collect, secure and analyse it, so operators can plan maintenance and respond faster.', focus: ['IoT data pipelines', 'Operational analytics', 'Hybrid connectivity'] },
  { title: 'Retail & commerce', photo: photos.retail, lead: 'Ready for the busiest day of the year.', copy: 'Commerce runs on speed and trust at checkout. We help retailers scale for peaks, connect channels and keep payments secure without slowing the experience.', focus: ['Peak-ready architecture', 'Payments security', 'Customer data platforms'] },
];
const threads = [
  { title: 'Regulation', copy: 'Controls mapped to the rules you answer to, with evidence ready for audit.' },
  { title: 'Security', copy: 'Identity, encryption and monitoring designed in, not bolted on.' },
  { title: 'Continuity', copy: 'Migrations sequenced so the business keeps running throughout.' },
  { title: 'Cost', copy: 'Spend made visible and attributable from the first month.' },
];

export default function Industries() {
  return <>
    <PageIntro label="Industries" title="Context changes. Standards don’t." description="Every sector carries its own regulation, risk and rhythm. We bring one consistent engineering discipline and adapt it to the world you operate in." photo={photos.towers} />

    <section className="sector-list"><div className="container">{sectors.map(({ title, photo, lead, copy, focus }, i) => <article key={title} className={`sector-row ${i % 2 ? 'sector-row-flip' : ''}`}>
      <FramedPhoto photo={photo} ratio={4 / 3} />
      <Reveal className="sector-copy"><span className="sector-kicker">{title}</span><h2>{lead}</h2><p>{copy}</p><Stagger className="service-points">{focus.map((f) => <span key={f}>{f}</span>)}</Stagger><Link href="/contact" className="text-link">Talk about {title.toLowerCase()} <ArrowRight size={16} /></Link></Reveal>
    </article>)}</div></section>

    <section className="section threads"><div className="container">
      <SectionHeading eyebrow="Common threads" title="What every sector asks of us." body="Different industries, recurring questions. These four come up in almost every first conversation." light />
      <Stagger className="thread-grid">{threads.map(({ title, copy }) => <article key={title} className="thread-card"><h3>{title}</h3><p>{copy}</p></article>)}</Stagger>
    </div></section>

    <CTA title="Your sector, your constraints." text="Tell us what makes your context different. That is usually where the most useful engineering starts." dark={false} />
  </>;
}
