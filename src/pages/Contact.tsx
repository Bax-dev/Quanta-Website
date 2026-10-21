import { type FormEvent, type ChangeEvent, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, Copy, MessageSquareText } from 'lucide-react';
import { Eyebrow, PageIntro, SectionHeading } from '@/components/site';
import { Faq, Reveal, Stagger } from '@/components/Reveal';
import { ParallaxPhoto } from '@/components/Photo';
import { photos } from '@/content/photos';

const nextSteps = [
  { title: 'We read it properly', copy: 'A senior engineer reviews your note, not an automated triage queue.' },
  { title: 'A first conversation', copy: 'A short call to understand the context, the constraints and what “better” means to you.' },
  { title: 'A practical next step', copy: 'A short written summary with a suggested way forward, whether or not it involves us.' },
];
const faqs: [string, string][] = [
  ['Is the first conversation free?', 'Yes. The first conversation is about understanding your situation. There is no obligation attached to it.'],
  ['Who will we be speaking with?', 'An engineer who does the work, not a sales intermediary. If a specialist would help, we bring them in early.'],
  ['Can we share architecture details under NDA?', 'Of course. We are happy to sign a mutual NDA before any detailed technical discussion.'],
];

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: '', organisation: '', email: '', topic: 'Cloud strategy', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const change = (key: keyof typeof form) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm({ ...form, [key]: event.target.value });
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true); };
  const copyBrief = async () => {
    const brief = `Quanta enquiry\nName: ${form.name}\nOrganisation: ${form.organisation}\nEmail: ${form.email}\nTopic: ${form.topic}\n\n${form.message}`;
    try { await navigator.clipboard.writeText(brief); setCopied(true); window.setTimeout(() => setCopied(false), 2600); } catch { setCopied(false); }
  };
  return <>
    <PageIntro label="Contact" index="07" title={<>Let’s talk about<br />what comes <em>next.</em></>} description="A first conversation can be practical and open-ended. Tell us what is changing, what is getting in the way, or simply where you would like to begin." />
    <section className="contact-main"><div className="container contact-layout"><Reveal className="contact-aside"><Eyebrow>A conversation, not a pitch</Eyebrow><h2>Bring the messy version.</h2><p>You do not need a finished brief. A useful starting point is the thing that is keeping your team up at night, or the opportunity you are not quite ready to scope yet.</p><ParallaxPhoto photo={photos.engineeringTeam} ratio={16 / 10} className="contact-photo" /><div className="contact-callout"><MessageSquareText size={21} /><div><strong>What happens next?</strong><span>Share a little context. The form prepares a clear enquiry brief for you to send through your established Quanta contact channel.</span></div></div><div className="contact-aside-index">Q / FIRST CONVERSATION</div></Reveal>
      <Reveal className="contact-form-wrap" from="left" delay={.1}><AnimatePresence mode="wait">{!submitted ? <motion.form key="form" className="contact-form" onSubmit={submit} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}><span className="form-kicker">START WITH THE BASICS</span><label>Your name<input required value={form.name} onChange={change('name')} placeholder="How should we address you?" data-testid="input-name" /></label><label>Organisation<input required value={form.organisation} onChange={change('organisation')} placeholder="Where are you working?" data-testid="input-organisation" /></label><label>Work email<input required type="email" value={form.email} onChange={change('email')} placeholder="you@organisation.com" data-testid="input-email" /></label><label>What’s on your mind?<select value={form.topic} onChange={change('topic')} data-testid="select-topic"><option>Cloud strategy</option><option>Migration and modernisation</option><option>Security and resilience</option><option>Managed cloud services</option><option>Careers at Quanta</option><option>Something else</option></select></label><label className="message-field">A little context<textarea required rows={4} value={form.message} onChange={change('message')} placeholder="A sentence or two is plenty to start." data-testid="input-message" /></label><button type="submit" className="button-primary" data-testid="button-prepare-enquiry">Prepare my enquiry <ArrowRight size={16} /></button><p className="form-privacy">Your details stay in this browser until you choose to share them. This demo form does not send data to a server.</p></motion.form> : <motion.div key="done" className="form-success" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}><motion.div className="success-icon" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 18, delay: .15 }}><Check size={22} /></motion.div><Eyebrow>Enquiry prepared</Eyebrow><h2>Your next step,<br /><em>ready to send.</em></h2><p>Quanta’s live enquiry service is not connected here. Copy your brief and send it through your existing Quanta contact channel.</p><button type="button" onClick={copyBrief} className="button-primary" data-testid="button-copy-enquiry">{copied ? 'Brief copied' : 'Copy enquiry brief'} {copied ? <Check size={16} /> : <Copy size={16} />}</button><button type="button" onClick={() => setSubmitted(false)} className="reset-form">Edit your details</button></motion.div>}</AnimatePresence></Reveal>
    </div></section>

    <section className="section next-steps"><div className="container">
      <SectionHeading number="01" eyebrow="After you get in touch" title={<>What happens<br /><em>next.</em></>} light />
      <Stagger className="next-grid">{nextSteps.map(({ title, copy }, i) => <article key={title} className="next-card"><span className="next-no">0{i + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</Stagger>
    </div></section>

    <section className="section faq-section"><div className="container faq-layout"><SectionHeading number="02" eyebrow="Good to know" title={<>A few common<br /><em>questions.</em></>} /><Reveal><Faq items={faqs} /></Reveal></div></section>

    <section className="contact-bottom"><Reveal className="container contact-bottom-inner"><Eyebrow>For the first conversation</Eyebrow><div className="contact-prompt"><span>What are you trying to make possible?</span><span>What is standing in the way?</span><span>What does “better” look like?</span></div><span className="font-mono">START WITH WHAT MATTERS</span></Reveal></section>
  </>;
}
