import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Eyebrow } from '@/components/site';

export default function NotFound() {
  return <section className="not-found">
    <div className="intro-orbits" aria-hidden="true"><span /><span /></div>
    <div className="container not-found-inner">
      <motion.span className="not-found-code" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, ease: 'easeOut' }}>404</motion.span>
      <Eyebrow light>Route not found</Eyebrow>
      <h1 className="display-title">This path isn’t <em>provisioned.</em></h1>
      <p>The page you were looking for has moved or never existed. Let’s get you back onto a known-good route.</p>
      <div className="hero-actions"><Link href="/" className="button-primary">Back to home <ArrowRight size={16} /></Link><Link href="/contact" className="button-quiet">Talk to the team</Link></div>
    </div>
  </section>;
}
