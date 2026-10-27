import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { CTA, Eyebrow, PageIntro, SectionHeading } from '@/components/site';
import { Reveal, Stagger } from '@/components/Reveal';
import { FramedPhoto } from '@/components/Photo';
import { photos } from '@/content/photos';

const values = [
  { title: 'Clarity over complexity', copy: 'We make the complicated understandable. Clear thinking is not a simplification of the work. It is how good work starts.' },
  { title: 'Partnership over hand-off', copy: 'We work alongside the people who will own the outcome. The best delivery makes collaboration feel natural.' },
  { title: 'Progress with purpose', copy: 'Not every new technology is the right move. We focus on change that earns its place in your roadmap.' },
];
const commitments = [
  { title: 'Share what we learn', copy: 'Write-ups, workshops and open conversations, so good practice travels further than one engagement.' },
  { title: 'Grow local talent', copy: 'Pairing, mentoring and real responsibility for engineers early in their cloud careers.' },
  { title: 'Build to last', copy: 'Architectures that stay understandable and affordable long after the launch announcement.' },
];

export default function About() {
  return <>
    <PageIntro label="About" title="A different kind of cloud partner." description="Quanta is an engineering-led cloud partner for organisations ready to make infrastructure a source of momentum, not friction." />
    <section className="about-statement"><div className="container statement-layout"><img src="/assets/quanta-mark.webp" alt="" width={480} height={640} loading="lazy" decoding="async" className="statement-glyph" /><Reveal><Eyebrow>Our point of view</Eyebrow><h2>Cloud is infrastructure. Transformation is people.</h2><p>We believe lasting change is built at the intersection of sound engineering and the lived reality of the people who use it. That is why we ask good questions, explain our thinking and design for the organisation, not just the diagram.</p></Reveal></div></section>

    <section className="about-origin"><div className="container origin-layout"><FramedPhoto photo={photos.city} ratio={5 / 4} /><Reveal className="origin-copy"><Eyebrow>Our outlook</Eyebrow><h2 className="section-title">Grounded here. Built to connect.</h2><p>Quanta brings an African outlook to global cloud engineering: resourceful, connected and attentive to the realities that shape organisations across markets. We work with a broad view of what is possible, and a grounded view of what it takes to get there.</p><p>It is not a slogan. It is a way of working: curious about context, rigorous about the fundamentals and serious about building capability that lasts.</p></Reveal></div></section>

    <section className="section about-values"><div className="container"><Reveal className="values-heading"><div><Eyebrow>How we show up</Eyebrow><h2 className="section-title">A few things we won’t compromise.</h2></div></Reveal><Stagger className="values-grid">{values.map(({ title, copy }) => <article key={title} className="value-card"><h3>{title}</h3><p>{copy}</p></article>)}</Stagger></div></section>

    <section className="section commitments"><div className="container commitments-layout">
      <SectionHeading eyebrow="Beyond the engagement" title="What we owe the ecosystem." body="Good cloud practice should not stay locked inside one project. These are the commitments we hold ourselves to." />
      <Stagger className="commitment-list">{commitments.map(({ title, copy }) => <article key={title} className="commitment-row"><div><h3>{title}</h3><p>{copy}</p></div></article>)}</Stagger>
    </div></section>

    <section className="about-practice"><div className="container practice-layout"><Reveal><Eyebrow light>The Quanta approach</Eyebrow><h2 className="section-title">Thoughtful by design. Practical by nature.</h2></Reveal><Reveal className="practice-copy"><p>We are not here to make the cloud sound more complicated. We are here to help your teams make good decisions and carry them through.</p><Link href="/services" className="text-link text-link-light">Meet the practice <ArrowRight size={16} /></Link><br /><Link href="/careers" className="text-link text-link-light">Join the team <ArrowRight size={16} /></Link></Reveal></div></section>
    <CTA title="Let’s build a better way forward." text="Tell us what your organisation is working toward. We’ll meet you there." />
  </>;
}
