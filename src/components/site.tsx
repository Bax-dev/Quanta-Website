import { useEffect, useState, type ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDownRight, ArrowRight, ArrowUp, Mail, Menu, X, ChevronRight } from 'lucide-react';
import { Reveal, ScrollProgress, SplitWords } from '@/components/Reveal';
import { ParallaxPhoto, type Photo } from '@/components/Photo';
import { Seo } from '@/components/Seo';
import { site } from '@/content/seo';

const links = [
  { href: '/services', label: 'Services' },
  { href: '/industries', label: 'Industries' },
  { href: '/aws-partner', label: 'AWS partnership' },
  { href: '/how-we-work', label: 'How we work' },
  { href: '/about', label: 'About' },
  { href: '/insights', label: 'Insights' },
];

export function Header() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => setOpen(false), [location]);
  return <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
    <div className="header-inner">
      <Link href="/" className="brand-link" aria-label="Quanta home" data-testid="link-home">
        <img src="/assets/quanta-logo.png" className="brand-logo" alt="Quanta: Built for the Future" />
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map((item) => <Link key={item.href} href={item.href} className={`nav-link ${location === item.href ? 'active' : ''}`} data-testid={`link-nav-${item.href.slice(1)}`}>
          {item.label}{location === item.href && <motion.span layoutId="nav-underline" className="nav-underline" />}
        </Link>)}
      </nav>
      <Link href="/contact" className="header-cta" data-testid="link-nav-contact">Talk to our team <ArrowRight size={15} /></Link>
      <button className="mobile-menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} data-testid="button-mobile-menu">{open ? <X /> : <Menu />}</button>
    </div>
    <AnimatePresence>{open && <motion.nav className="mobile-nav" aria-label="Mobile navigation" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: .25 }}>
      {[...links, { href: '/careers', label: 'Careers' }].map((item, i) => <motion.div key={item.href} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .04 * i }}><Link href={item.href} className="mobile-nav-link" data-testid={`link-mobile-${item.href.slice(1)}`}>{item.label}<ChevronRight size={16} /></Link></motion.div>)}
      <Link href="/contact" className="mobile-contact">Start a conversation <ArrowRight size={16} /></Link>
    </motion.nav>}</AnimatePresence>
  </header>;
}

export function Footer() {
  return <footer className="site-footer">
    <div className="footer-top">
      <div className="footer-intro">
        <img src="/assets/quanta-mark-dark.png" alt="Quanta" className="footer-logo" />
        <p>Building cloud foundations<br />for what comes next.</p>
      </div>
      <div className="footer-column"><span className="footer-label">Explore</span><Link href="/services">Services</Link><Link href="/industries">Industries</Link><Link href="/aws-partner">AWS partnership</Link><Link href="/insights">Insights</Link></div>
      <div className="footer-column"><span className="footer-label">Company</span><Link href="/about">About Quanta</Link><Link href="/how-we-work">How we work</Link><Link href="/careers">Careers</Link><Link href="/contact">Talk to Quanta <ArrowRight size={14} /></Link></div>
      <div className="footer-note"><span className="eyebrow light">Built for the future</span><p>We help ambitious organisations make their next move in the cloud with clarity, care and deep engineering experience.</p><a href={`mailto:${site.email}`} className="footer-email" data-testid="link-footer-email"><Mail size={15} />{site.email}</a></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Quanta. All rights reserved.</span><span>Independent thinking. Enterprise-ready engineering.</span></div>
  </footer>;
}

export function SiteShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const reduced = useReducedMotion();
  return <div className="site-grain"><Seo /><ScrollProgress /><Header />
    <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo({ top: 0, behavior: 'instant' })}>
      <motion.main key={location} initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? undefined : { opacity: 0, y: -8 }} transition={{ duration: .32, ease: 'easeOut' }}>{children}</motion.main>
    </AnimatePresence>
    <Footer /><ScrollTop /></div>;
}

export function ScrollTop() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const update = () => setShown(window.scrollY > 500);
    window.addEventListener('scroll', update, { passive: true }); return () => window.removeEventListener('scroll', update);
  }, []);
  return <AnimatePresence>{shown && <motion.button type="button" className="scroll-top" aria-label="Scroll to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} data-testid="button-scroll-top" initial={{ opacity: 0, scale: .6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .6 }} whileHover={{ y: -3 }}><ArrowUp size={17} /></motion.button>}</AnimatePresence>;
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) { return <span className={`eyebrow ${light ? 'light' : ''}`}><span className="eyebrow-dot" />{children}</span>; }

export function PageIntro({ label, title, description, index, photo }: { label: string; title: ReactNode; description: string; index: string; photo?: Photo }) {
  return <section className={`page-intro ${photo ? 'page-intro-photo' : ''}`}>
    <div className="intro-orbits" aria-hidden="true"><span /><span /></div>
    <div className="container intro-layout">
      <div><Reveal from="none"><Eyebrow light>{label}</Eyebrow></Reveal><h1 className="display-title"><SplitWords>{title}</SplitWords></h1></div>
      <Reveal className="intro-aside" delay={.35}><p>{description}</p><span className="intro-index">Q / {index}</span></Reveal>
    </div>
    {photo && <div className="container intro-photo"><ParallaxPhoto photo={photo} ratio={21 / 8} sizes="100vw" priority /></div>}
  </section>;
}

function CloudPathMark() {
  return <svg className="cta-illustration" viewBox="0 0 220 160" fill="none" aria-hidden="true">
    <path d="M62 112h104a30 30 0 0 0 2-60 42 42 0 0 0-80-10 32 32 0 0 0-26 70z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M18 150c34 0 44-24 70-24s36-30 58-56" stroke="#9b1b22" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 7" />
    <circle cx="18" cy="150" r="5" fill="#9b1b22" />
    <circle cx="146" cy="70" r="7" fill="currentColor" />
    <circle cx="146" cy="70" r="14" stroke="currentColor" strokeOpacity=".35" />
  </svg>;
}

export function CTA({ title = 'Ready for a clearer path to cloud?', text = 'Bring us the challenge. We’ll bring the questions, the experience and a practical next step.', dark = true }: { title?: string; text?: string; dark?: boolean }) {
  return <section className={`cta-band ${dark ? 'cta-dark' : ''}`}><Reveal className="container cta-inner"><div><Eyebrow light={dark}>A good place to begin</Eyebrow><h2 className="section-title">{title}</h2><p>{text}</p></div><CloudPathMark /><Link href="/contact" className="round-link" aria-label="Contact Quanta" data-testid="link-cta-contact"><ArrowDownRight size={25} /></Link></Reveal></section>;
}

export function SectionHeading({ number, eyebrow, title, body, light = false }: { number: string; eyebrow: string; title: ReactNode; body?: string; light?: boolean }) {
  return <Reveal className={`section-heading ${light ? 'section-heading-light' : ''}`}><span className="section-number">{number}</span><div><Eyebrow light={light}>{eyebrow}</Eyebrow><h2 className="section-title">{title}</h2>{body && <p className="section-body">{body}</p>}</div></Reveal>;
}
