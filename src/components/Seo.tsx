import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { notFound, pageFor, site, structuredData } from '@/content/seo';

/** Finds (or creates) the head element matching `attrs`, sets `prop`, or removes it when `value` is null. */
function upsert(tag: 'meta' | 'link' | 'script', attrs: Record<string, string>, prop: string, value: string | null) {
  const selector = tag + Object.entries(attrs).map(([k, v]) => `[${k}="${v}"]`).join('');
  let el = document.head.querySelector(selector);
  if (value === null) { el?.remove(); return; }
  if (!el) {
    el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
    document.head.appendChild(el);
  }
  if (prop === 'textContent') el.textContent = value;
  else el.setAttribute(prop, value);
}

/** Keeps the head tags written at build time in step with client-side navigation. */
export function Seo() {
  const [location] = useLocation();
  useEffect(() => {
    const page = pageFor(location);
    const { title, description } = page ?? notFound;
    // Canonical URLs always point at production, even on preview hosts.
    const origin = site.url;
    const url = page ? origin + page.path : null;
    const image = origin + site.image;
    document.title = title;
    upsert('meta', { name: 'description' }, 'content', description);
    upsert('meta', { name: 'robots' }, 'content', page ? 'index, follow, max-image-preview:large' : 'noindex, follow');
    upsert('link', { rel: 'canonical' }, 'href', url);
    upsert('meta', { property: 'og:title' }, 'content', title);
    upsert('meta', { property: 'og:description' }, 'content', description);
    upsert('meta', { property: 'og:url' }, 'content', url);
    upsert('meta', { property: 'og:image' }, 'content', image);
    upsert('meta', { name: 'twitter:title' }, 'content', title);
    upsert('meta', { name: 'twitter:description' }, 'content', description);
    upsert('meta', { name: 'twitter:image' }, 'content', image);
    upsert('script', { type: 'application/ld+json', id: 'structured-data' }, 'textContent', page ? JSON.stringify(structuredData(page, origin)) : null);
  }, [location]);
  return null;
}
