import { useEffect, useState, type ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Menu, X, ChevronRight } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { FramedPhoto, type Photo } from '@/components/Photo';
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
  useEffect(() => { setOpen(false); }, [location]);
  return <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
    <div className="header-inner">
      <Link href="/" className="brand-link" aria-label="Quanta home" data-testid="link-home">
        <img src="/assets/quanta-logo.webp" className="brand-logo" alt="Quanta: Built for the Future" width={320} height={143} />
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map((item) => <Link key={item.href} href={item.href} className={`nav-link ${location === item.href ? 'active' : ''}`} data-testid={`link-nav-${item.href.slice(1)}`}>
          {item.label}
        </Link>)}
      </nav>
      <Link href="/contact" className="header-cta" data-testid="link-nav-contact">Book a call</Link>
      <button className="mobile-menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} data-testid="button-mobile-menu">{open ? <X /> : <Menu />}</button>
    </div>
    <AnimatePresence>{open && <motion.nav className="mobile-nav" aria-label="Mobile navigation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .15 }}>
      {[...links, { href: '/careers', label: 'Careers' }].map((item) => <Link key={item.href} href={item.href} className="mobile-nav-link" data-testid={`link-mobile-${item.href.slice(1)}`}>{item.label}<ChevronRight size={16} /></Link>)}
      <Link href="/contact" className="mobile-contact">Contact us</Link>
    </motion.nav>}</AnimatePresence>
  </header>;
}

export function Footer() {
  return <footer className="site-footer">
    <div className="footer-top">
      <div className="footer-column"><span className="footer-label">Office</span><address className="footer-address"><strong>{site.address.city}</strong>{site.address.street}<br />{site.address.city}, {site.address.region} {site.address.postalCode}</address><a href={`mailto:${site.email}`} className="footer-email" data-testid="link-footer-email">{site.email}</a></div>
      <div className="footer-column"><span className="footer-label">Explore</span><Link href="/services">Services</Link><Link href="/industries">Industries</Link><Link href="/aws-partner">AWS partnership</Link><Link href="/insights">Insights</Link></div>
      <div className="footer-column"><span className="footer-label">Company</span><Link href="/about">About</Link><Link href="/how-we-work">How we work</Link><Link href="/careers">Careers</Link><Link href="/contact">Contact</Link></div>
      <div className="footer-column"><span className="footer-label">Copyright</span><span>© {new Date().getFullYear()} Quanta.</span><span>All rights reserved.</span></div>
    </div>
  </footer>;
}

export function SiteShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [location]);
  return <><Seo /><Header /><main>{children}</main><Footer /></>;
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) { return <span className={`eyebrow ${light ? 'light' : ''}`}>{children}</span>; }

export function PageIntro({ label, title, description, photo }: { label: string; title: ReactNode; description: string; photo?: Photo }) {
  return <section className={`page-intro ${photo ? 'page-intro-photo' : ''}`}>
    <div className="container intro-layout">
      <div><Eyebrow light>{label}</Eyebrow><h1 className="display-title">{title}</h1></div>
      <div className="intro-aside"><p>{description}</p></div>
    </div>
    {photo && <div className="container intro-photo"><FramedPhoto photo={photo} ratio={21 / 8} sizes="100vw" priority /></div>}
  </section>;
}

export function CTA({ title = 'Ready for a clearer path to cloud?', text = 'Bring us the challenge. We’ll bring the questions, the experience and a practical next step.', dark = true }: { title?: string; text?: string; dark?: boolean }) {
  return <section className={`cta-band ${dark ? 'cta-dark' : ''}`}><Reveal className="container cta-inner"><div><h2 className="section-title">{title}</h2><p>{text}</p></div><Link href="/contact" className="button-primary" data-testid="link-cta-contact">Contact us <ArrowRight size={16} /></Link></Reveal></section>;
}

export function SectionHeading({ eyebrow, title, body, light = false }: { eyebrow: string; title: ReactNode; body?: string; light?: boolean }) {
  return <Reveal className={`section-heading ${light ? 'section-heading-light' : ''}`}><Eyebrow light={light}>{eyebrow}</Eyebrow><h2 className="section-title">{title}</h2>{body && <p className="section-body">{body}</p>}</Reveal>;
}
