import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, Network, Shield, Compass, ServerCog, Settings2, Lock, RefreshCcw, Zap, PiggyBank, Leaf } from 'lucide-react';
import { CTA, Eyebrow, PageIntro, SectionHeading } from '@/components/site';
import { Reveal, Stagger, Timeline } from '@/components/Reveal';
import { ParallaxPhoto } from '@/components/Photo';
import { photos } from '@/content/photos';

const pillars = [
  { icon: Compass, title: 'A partner in the planning', copy: 'We connect cloud decisions to operating context, helping teams understand trade-offs before implementation begins.' },
  { icon: Network, title: 'Deep platform capability', copy: 'From network foundations and identity to applications and data, our engineering lens spans the AWS environment.' },
  { icon: Shield, title: 'Designed for responsible scale', copy: 'Well-architected thinking, practical security and resilient design are part of the conversation from day one.' },
  { icon: ServerCog, title: 'Built to keep improving', copy: 'A cloud platform is never “finished”. We help organisations build the habits and operations for continuous progress.' },
];
const wellArchitected = [
  { icon: Settings2, title: 'Operational excellence', copy: 'Run and monitor systems well, and improve the processes behind them.' },
  { icon: Lock, title: 'Security', copy: 'Protect data, systems and assets with layered, automated controls.' },
  { icon: RefreshCcw, title: 'Reliability', copy: 'Recover from failure quickly and meet demand without drama.' },
  { icon: Zap, title: 'Performance efficiency', copy: 'Use computing resources efficiently as requirements change.' },
  { icon: PiggyBank, title: 'Cost optimisation', copy: 'Deliver value at the lowest sensible price point, visibly.' },
  { icon: Leaf, title: 'Sustainability', copy: 'Reduce the environmental impact of the workloads you run.' },
];
const toolbox = [
  { area: 'Foundations', services: ['AWS Control Tower', 'AWS Organizations', 'IAM Identity Center', 'Amazon VPC'] },
  { area: 'Compute & containers', services: ['Amazon EC2', 'Amazon ECS', 'Amazon EKS', 'AWS Lambda'] },
  { area: 'Data', services: ['Amazon S3', 'Amazon RDS', 'Amazon Aurora', 'Amazon DynamoDB'] },
  { area: 'Security', services: ['Amazon GuardDuty', 'AWS Security Hub', 'AWS KMS', 'AWS WAF'] },
  { area: 'Operations', services: ['Amazon CloudWatch', 'AWS Systems Manager', 'AWS Backup', 'Cost Explorer'] },
];
const journey = [
  { title: 'Assess', copy: 'Context, workloads, opportunities.' },
  { title: 'Design', copy: 'A target architecture with a reason behind it.' },
  { title: 'Deliver', copy: 'Migration and engineering in workable increments.' },
  { title: 'Operate', copy: 'Learn, optimise and make capability stick.' },
];

export default function AwsPartner() {
  return <>
    <PageIntro label="AWS PARTNER" index="02" title={<>AWS expertise.<br /><em>Independent thinking.</em></>} description="Quanta brings AWS capability and a direct, thoughtful engineering approach to the work of cloud transformation." photo={photos.engineerInDataCentre} />
    <section className="aws-partner-note"><div className="container aws-note-layout"><Reveal className="aws-logo-lockup" from="scale"><div className="aws-badge-mark"><span>aws</span><motion.i initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: .9, delay: .3 }} /></div></Reveal><Reveal className="aws-note-copy" from="left"><Eyebrow>Partnership, in practice</Eyebrow><h2>Technology is stronger when it serves a clear purpose.</h2><p>As an AWS Partner, Quanta works with organisations to design, migrate, secure and operate on AWS. The partnership gives us a shared platform and ecosystem; the work itself starts with your priorities, your people and the outcomes you need.</p><Link href="/contact" className="text-link">Discuss your AWS plans <ArrowRight size={16} /></Link></Reveal></div></section>

    <section className="aws-capabilities"><div className="container"><div className="aws-cap-head"><Reveal><Eyebrow>How we bring AWS to work</Eyebrow><h2 className="section-title">Capability you can<br /><em>put to work.</em></h2></Reveal><Reveal className="aws-cap-description" from="left">Cloud choices shape how teams deliver, protect and evolve technology. Our role is to make those choices clear and engineer them with care.</Reveal></div><Stagger className="aws-pillars">{pillars.map(({ icon: Icon, title, copy }, i) => <article key={title} className="aws-pillar hover-lift"><div className="pillar-head"><span>0{i + 1} / 04</span><Icon size={21} /></div><h3>{title}</h3><p>{copy}</p></article>)}</Stagger></div></section>

    <section className="section well-architected"><div className="container">
      <SectionHeading number="02" eyebrow="The AWS Well-Architected Framework" title={<>Six pillars,<br /><em>one conversation.</em></>} body="We use the Well-Architected Framework as a shared language with your team: a way to weigh trade-offs openly instead of discovering them in production." light />
      <Stagger className="wa-grid">{wellArchitected.map(({ icon: Icon, title, copy }, i) => <article key={title} className="wa-card"><span className="wa-no">0{i + 1}</span><Icon size={24} /><h3>{title}</h3><p>{copy}</p></article>)}</Stagger>
    </div></section>

    <section className="section toolbox"><div className="container toolbox-layout">
      <div className="toolbox-intro"><SectionHeading number="03" eyebrow="The toolbox" title={<>Services we<br /><em>know well.</em></>} body="A sample of the AWS services that show up most often in our work. The right mix always depends on the problem." /><ParallaxPhoto photo={photos.networkCables} ratio={4 / 3} /></div>
      <Stagger className="toolbox-list">{toolbox.map(({ area, services }) => <div key={area} className="toolbox-row"><span className="toolbox-area">{area}</span><div className="toolbox-chips">{services.map((s) => <span key={s}>{s}</span>)}</div></div>)}</Stagger>
    </div></section>

    <section className="aws-trust"><div className="container trust-layout"><Reveal><Eyebrow light>Trust is engineered</Eyebrow><h2 className="section-title">Clear guardrails.<br /><em>Room to move.</em></h2></Reveal><Stagger className="trust-points"><p><BadgeCheck size={18} />Security built into the design conversation</p><p><BadgeCheck size={18} />Well-architected decisions, explained plainly</p><p><BadgeCheck size={18} />Delivery that leaves knowledge with your teams</p><p><BadgeCheck size={18} />A pragmatic view of cost, risk and complexity</p></Stagger></div></section>
    <section className="aws-journey"><div className="container journey-layout"><Reveal><span className="font-mono">AWS / QUANTA</span><h2 className="section-title">From first sketch<br />to steady state.</h2></Reveal><Timeline steps={journey} /></div></section>
    <CTA title="Make AWS work for your organisation." text="Start with a candid conversation about what you need the cloud to do." />
  </>;
}
