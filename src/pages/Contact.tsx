import { type FormEvent, type ChangeEvent, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, Copy, MessageSquareText, MapPin } from 'lucide-react';
import { Eyebrow, PageIntro, SectionHeading } from '@/components/site';
import { site } from '@/content/seo';
import { Faq, Reveal, Stagger } from '@/components/Reveal';
import { faqs } from '@/content/faqs';

const nextSteps = [
  { title: 'We read it properly', copy: 'A senior engineer reviews your note, not an automated triage queue.' },
  { title: 'A first conversation', copy: 'A short call to understand the context, the constraints and what “better” means to you.' },
  { title: 'A practical next step', copy: 'A short written summary with a suggested way forward, whether or not it involves us.' },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: '', organisation: '', email: '', topic: 'Cloud strategy', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const change = (key: keyof typeof form) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm({ ...form, [key]: event.target.value });
  const brief = `Name: ${form.name}\nOrganisation: ${form.organisation}\nEmail: ${form.email}\nTopic: ${form.topic}\n\n${form.message}`;
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(`Enquiry: ${form.topic} (${form.organisation})`)}&body=${encodeURIComponent(brief)}`;
  // There is no form backend: the enquiry is handed to the visitor's email app.
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true); window.location.href = mailto; };
  const copyBrief = async () => {
    try { await navigator.clipboard.writeText(brief); setCopied(true); window.setTimeout(() => setCopied(false), 2600); } catch { setCopied(false); }
  };
  return <>
    <PageIntro label="Contact" title="Let’s talk about what comes next." description="A first conversation can be practical and open-ended. Tell us what is changing, what is getting in the way, or simply where you would like to begin." />
    <section className="contact-main"><div className="container contact-layout"><Reveal className="contact-aside"><Eyebrow>A conversation, not a pitch</Eyebrow><h2>Bring the messy version.</h2><p>You do not need a finished brief. A useful starting point is the thing that is keeping your team up at night, or the opportunity you are not quite ready to scope yet.</p><div className="contact-callout"><MessageSquareText size={21} /><div><strong>What happens next?</strong><span>Share a little context and the form drafts an email to our team, ready for you to review and send. A senior engineer reads every enquiry.</span></div></div><address className="contact-callout"><MapPin size={21} /><div><strong>Where to find us</strong><span>{site.address.street}<br />{site.address.city}, {site.address.region} {site.address.postalCode}</span></div></address></Reveal>
      <Reveal className="contact-form-wrap"><AnimatePresence mode="wait">{!submitted ? <motion.form key="form" className="contact-form" onSubmit={submit} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}><label>Your name<input required value={form.name} onChange={change('name')} placeholder="How should we address you?" data-testid="input-name" /></label><label>Organisation<input required value={form.organisation} onChange={change('organisation')} placeholder="Where are you working?" data-testid="input-organisation" /></label><label>Work email<input required type="email" value={form.email} onChange={change('email')} placeholder="you@organisation.com" data-testid="input-email" /></label><label>What’s on your mind?<select value={form.topic} onChange={change('topic')} data-testid="select-topic"><option>Cloud strategy</option><option>Migration and modernisation</option><option>Security and resilience</option><option>Managed cloud services</option><option>Careers at Quanta</option><option>Something else</option></select></label><label className="message-field">A little context<textarea required rows={4} value={form.message} onChange={change('message')} placeholder="A sentence or two is plenty to start." data-testid="input-message" /></label><button type="submit" className="button-primary" data-testid="button-prepare-enquiry">Send enquiry <ArrowRight size={16} /></button><p className="form-privacy">Sending opens your email app with your enquiry addressed to <a href={`mailto:${site.email}`}>{site.email}</a>. Nothing is sent until you confirm it there.</p></motion.form> : <motion.div key="done" className="form-success" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}><div className="success-icon"><Check size={22} /></div><Eyebrow>Almost there</Eyebrow><h2>Your enquiry is ready to send.</h2><p>Your email app should have opened with the enquiry addressed to {site.email}. If it didn’t, <a href={mailto}>open it again</a> or copy the brief and email it to us directly.</p><button type="button" onClick={copyBrief} className="button-primary" data-testid="button-copy-enquiry">{copied ? 'Brief copied' : 'Copy enquiry brief'} {copied ? <Check size={16} /> : <Copy size={16} />}</button><button type="button" onClick={() => setSubmitted(false)} className="reset-form">Edit your details</button></motion.div>}</AnimatePresence></Reveal>
    </div></section>

    <section className="section next-steps"><div className="container">
      <SectionHeading eyebrow="After you get in touch" title="What happens next." light />
      <Stagger className="next-grid">{nextSteps.map(({ title, copy }, i) => <article key={title} className="next-card"><span className="next-no">{i + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</Stagger>
    </div></section>

    <section className="section faq-section"><div className="container faq-layout"><SectionHeading eyebrow="Good to know" title="A few common questions." /><Reveal><Faq items={faqs['/contact']} /></Reveal></div></section>

    <section className="contact-bottom"><Reveal className="container contact-bottom-inner"><Eyebrow>For the first conversation</Eyebrow><div className="contact-prompt"><span>What are you trying to make possible?</span><span>What is standing in the way?</span><span>What does “better” look like?</span></div></Reveal></section>
  </>;
}
