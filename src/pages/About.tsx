import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, Handshake, Lightbulb, MoveUpRight, BookOpen, Users, Sprout } from 'lucide-react';
import { CTA, Eyebrow, PageIntro, SectionHeading } from '@/components/site';
import { Reveal, Stagger } from '@/components/Reveal';
import { ParallaxPhoto } from '@/components/Photo';
import { photos } from '@/content/photos';

const values = [
  { icon: Lightbulb, title: 'Clarity over complexity', copy: 'We make the complicated understandable. Clear thinking is not a simplification of the work. It is how good work starts.' },
  { icon: Handshake, title: 'Partnership over hand-off', copy: 'We work alongside the people who will own the outcome. The best delivery makes collaboration feel natural.' },
  { icon: Compass, title: 'Progress with purpose', copy: 'Not every new technology is the right move. We focus on change that earns its place in your roadmap.' },
];
const commitments = [
  { icon: BookOpen, title: 'Share what we learn', copy: 'Write-ups, workshops and open conversations, so good practice travels further than one engagement.' },
  { icon: Users, title: 'Grow local talent', copy: 'Pairing, mentoring and real responsibility for engineers early in their cloud careers.' },
  { icon: Sprout, title: 'Build to last', copy: 'Architectures that stay understandable and affordable long after the launch announcement.' },
];

export default function About() {
  return <>
    <PageIntro label="ABOUT QUANTA" index="03" title={<>A different kind<br />of cloud <em>partner.</em></>} description="Quanta is an engineering-led cloud partner for organisations ready to make infrastructure a source of momentum, not friction." />
    <section className="about-statement"><div className="container statement-layout"><motion.img src="/assets/quanta-mark.png" alt="Quanta: Built for the Future" className="statement-glyph" initial={{ opacity: 0, scale: .7, rotate: -8 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: 'easeOut' }} /><Reveal from="left"><Eyebrow>Our point of view</Eyebrow><h2>Cloud is infrastructure.<br />Transformation is <em>people.</em></h2><p>We believe lasting change is built at the intersection of sound engineering and the lived reality of the people who use it. That is why we ask good questions, explain our thinking and design for the organisation, not just the diagram.</p></Reveal></div></section>

    <section className="about-collage"><div className="container collage-grid">
      <ParallaxPhoto photo={photos.teamAtWork} ratio={4 / 3} className="collage-a" />
      <ParallaxPhoto photo={photos.workshop} ratio={1} className="collage-b" />
      <ParallaxPhoto photo={photos.engineeringTeam} ratio={4 / 5} className="collage-c" caption="Q / TEAM" />
    </div></section>

    <section className="about-origin"><div className="container origin-layout"><ParallaxPhoto photo={photos.city} ratio={5 / 4} caption="LOCAL INSIGHT / GLOBAL SYSTEMS" /><Reveal className="origin-copy" from="left"><Eyebrow>Our outlook</Eyebrow><h2 className="section-title">Grounded here.<br /><em>Built to connect.</em></h2><p>Quanta brings an African outlook to global cloud engineering: resourceful, connected and attentive to the realities that shape organisations across markets. We work with a broad view of what is possible, and a grounded view of what it takes to get there.</p><p>It is not a slogan. It is a way of working: curious about context, rigorous about the fundamentals and serious about building capability that lasts.</p></Reveal></div></section>

    <section className="section about-values"><div className="container"><Reveal className="values-heading"><div><Eyebrow>How we show up</Eyebrow><h2 className="section-title">A few things we<br /><em>won’t compromise.</em></h2></div></Reveal><Stagger className="values-grid">{values.map(({ icon: Icon, title, copy }, i) => <article key={title} className="value-card"><span className="value-no">0{i + 1}</span><Icon size={24} /><h3>{title}</h3><p>{copy}</p></article>)}</Stagger></div></section>

    <section className="section commitments"><div className="container commitments-layout">
      <SectionHeading number="04" eyebrow="Beyond the engagement" title={<>What we owe<br />the <em>ecosystem.</em></>} body="Good cloud practice should not stay locked inside one project. These are the commitments we hold ourselves to." />
      <Stagger className="commitment-list">{commitments.map(({ icon: Icon, title, copy }) => <article key={title} className="commitment-row hover-lift"><span className="icon-chip"><Icon size={20} /></span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</Stagger>
    </div></section>

    <section className="about-practice"><div className="container practice-layout"><Reveal><Eyebrow light>The Quanta approach</Eyebrow><h2 className="section-title">Thoughtful by design.<br /><em>Practical by nature.</em></h2></Reveal><Reveal className="practice-copy" delay={.15}><p>We are not here to make the cloud sound more complicated. We are here to help your teams make good decisions and carry them through.</p><Link href="/services" className="text-link text-link-light">Meet the practice <ArrowRight size={16} /></Link><br /><Link href="/careers" className="text-link text-link-light">Join the team <ArrowRight size={16} /></Link></Reveal><div className="practice-index"><motion.span animate={{ x: [0, 6, 0], y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}><MoveUpRight size={30} /></motion.span><span>Q / APPROACH</span></div></div></section>
    <CTA title="Let’s build a better way forward." text="Tell us what your organisation is working toward. We’ll meet you there." />
  </>;
}
