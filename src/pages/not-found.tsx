import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { Eyebrow } from '@/components/site';

export default function NotFound() {
  return <section className="not-found">
    <div className="container not-found-inner">
      <Eyebrow light>404</Eyebrow>
      <h1 className="display-title">Page not found</h1>
      <p>The page you were looking for has moved or never existed.</p>
      <div className="hero-actions"><Link href="/" className="button-primary">Back to home <ArrowRight size={16} /></Link><Link href="/contact" className="button-quiet">Contact us</Link></div>
    </div>
  </section>;
}
