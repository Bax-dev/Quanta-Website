// Page metadata shared by the app (runtime head updates) and vite.config.ts
// (static per-route HTML, sitemap.xml and robots.txt). Keep this file free of
// browser APIs and the '@' alias so the build can import it.

import { faqs } from './faqs';

export const site = {
  name: 'Quanta',
  legalName: 'Quantum Transformation Tech LLC',
  tagline: 'Built for the Future',
  /** Production origin; SITE_URL overrides it at build time. */
  url: 'https://quantatechnologies.org',
  email: 'support@quantatechnologies.org',
  address: {
    street: '1002 Coleridge Ct, Apt G',
    city: 'Baltimore',
    region: 'MD',
    postalCode: '21229',
    country: 'US',
  },
  locale: 'en_GB',
  themeColor: '#0a0a0a',
  logo: '/android-chrome-512x512.png',
  image: '/og-image.jpg',
  imageAlt: 'Quanta: AWS cloud, engineered for regulated work',
  imageWidth: 1200,
  imageHeight: 630,
  imageType: 'image/jpeg',
};

export type PageMeta = {
  path: string;
  /** Short label used in breadcrumbs. */
  label: string;
  title: string;
  description: string;
  priority: number;
  changefreq: 'weekly' | 'monthly' | 'yearly';
};

export const pages: PageMeta[] = [
  {
    path: '/',
    label: 'Home',
    title: 'Quanta | AWS Migration, Security & Managed Cloud',
    description: 'Quanta designs, migrates and runs AWS platforms for financial services, healthcare, public sector and energy teams. The engineers who design your platform build it.',
    priority: 1,
    changefreq: 'weekly',
  },
  {
    path: '/services',
    label: 'Services',
    title: 'AWS Cloud Services: Migration, Security & Operations | Quanta',
    description: 'One engineering practice across the cloud lifecycle: AWS cloud strategy and landing zones, migration and modernisation, security and resilience, and managed cloud operations.',
    priority: 0.9,
    changefreq: 'monthly',
  },
  {
    path: '/industries',
    label: 'Industries',
    title: 'AWS for Finance, Healthcare, Public Sector & Energy | Quanta',
    description: 'Secure, compliant AWS platforms for financial services, healthcare, public sector and energy. One engineering discipline, adapted to the regulation and risk of your sector.',
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    path: '/aws-partner',
    label: 'AWS partnership',
    title: 'AWS Consulting Partner | Quanta',
    description: 'Quanta is an AWS partner bringing AWS capability and independent, engineering-led thinking to cloud transformation, from Control Tower to EKS and Lambda.',
    priority: 0.9,
    changefreq: 'monthly',
  },
  {
    path: '/how-we-work',
    label: 'How we work',
    title: 'How We Work: Cloud Engagement Models & Delivery | Quanta',
    description: 'Three ways to engage with Quanta and one consistent way of working: discover, design, deliver, then operate and improve, with your team in the room throughout.',
    priority: 0.7,
    changefreq: 'monthly',
  },
  {
    path: '/about',
    label: 'About',
    title: 'About Quanta | Engineering-Led AWS Cloud Partner',
    description: 'Quanta is an engineering-led AWS partner based in Baltimore, MD. Senior engineers design, build and run cloud platforms for regulated organisations.',
    priority: 0.7,
    changefreq: 'monthly',
  },
  {
    path: '/insights',
    label: 'Insights',
    title: 'Cloud Insights: AWS Architecture & Security | Quanta',
    description: 'Practical perspectives on the questions that shape cloud decisions, from AWS architecture and security to migration, modernisation and running platforms well.',
    priority: 0.6,
    changefreq: 'weekly',
  },
  {
    path: '/careers',
    label: 'Careers',
    title: 'Careers in Cloud Engineering | Quanta',
    description: 'Join a team of AWS cloud engineers who like hard problems, clear thinking and helping each other get better. See open roles and how we work at Quanta.',
    priority: 0.5,
    changefreq: 'monthly',
  },
  {
    path: '/contact',
    label: 'Contact',
    title: 'Contact Quanta | Talk to an AWS Cloud Expert',
    description: 'Talk to Quanta about AWS cloud strategy, migration, security or managed operations. Tell us what you are facing; a senior engineer reads every enquiry.',
    priority: 0.8,
    changefreq: 'yearly',
  },
];

export const notFound = {
  title: 'Page not found | Quanta',
  description: 'The page you were looking for has moved or no longer exists.',
};

export function pageFor(path: string): PageMeta | undefined {
  const clean = path.replace(/\/+$/, '') || '/';
  return pages.find((p) => p.path === clean);
}

const abs = (origin: string, path: string) => origin.replace(/\/$/, '') + path;

/** schema.org graph for a page; `origin` is the site's absolute origin. */
export function structuredData(page: PageMeta, origin: string) {
  const org = abs(origin, '/#organization');
  const url = abs(origin, page.path);
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'ProfessionalService',
      '@id': org,
      name: site.name,
      legalName: site.legalName,
      slogan: site.tagline,
      url: abs(origin, '/'),
      logo: { '@type': 'ImageObject', url: abs(origin, site.logo), width: 512, height: 512 },
      image: abs(origin, site.image),
      description: pages[0].description,
      email: site.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.address.street,
        addressLocality: site.address.city,
        addressRegion: site.address.region,
        postalCode: site.address.postalCode,
        addressCountry: site.address.country,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: site.email,
        url: abs(origin, '/contact'),
        availableLanguage: ['English'],
      },
      knowsAbout: ['Amazon Web Services', 'Cloud migration', 'Cloud security', 'Managed cloud services', 'AWS Control Tower', 'Amazon EKS', 'Serverless'],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Cloud services',
        itemListElement: ['Cloud strategy & foundations', 'Migration & modernisation', 'Security & resilience', 'Managed cloud operations'].map((name) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name, provider: { '@id': org } },
        })),
      },
    },
    {
      '@type': 'WebSite',
      '@id': abs(origin, '/#website'),
      url: abs(origin, '/'),
      name: site.name,
      publisher: { '@id': org },
      inLanguage: 'en-GB',
    },
    {
      '@type': page.path === '/about' ? 'AboutPage' : page.path === '/contact' ? 'ContactPage' : 'WebPage',
      '@id': url + '#webpage',
      url,
      name: page.title,
      description: page.description,
      isPartOf: { '@id': abs(origin, '/#website') },
      about: { '@id': org },
      primaryImageOfPage: abs(origin, site.image),
      ...(page.path !== '/' && { breadcrumb: { '@id': url + '#breadcrumb' } }),
      inLanguage: 'en-GB',
    },
  ];
  if (page.path !== '/') {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': url + '#breadcrumb',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: abs(origin, '/') },
        { '@type': 'ListItem', position: 2, name: page.label, item: url },
      ],
    });
  }
  const questions = faqs[page.path];
  if (questions) {
    graph.push({
      '@type': 'FAQPage',
      '@id': url + '#faq',
      isPartOf: { '@id': url + '#webpage' },
      mainEntity: questions.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })),
    });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}

export const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * Page-specific head tags as HTML. With no `origin` (a build without SITE_URL)
 * the tags that need absolute URLs are left out.
 */
export function renderHead(page: PageMeta | undefined, origin?: string) {
  const meta = page ?? notFound;
  const url = origin && page ? abs(origin, page.path) : undefined;
  const image = origin ? abs(origin, site.image) : undefined;
  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<meta name="robots" content="${page ? 'index, follow, max-image-preview:large' : 'noindex, follow'}" />`,
    url && `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${site.name}" />`,
    `<meta property="og:locale" content="${site.locale}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    url && `<meta property="og:url" content="${url}" />`,
    image && `<meta property="og:image" content="${image}" />`,
    image && `<meta property="og:image:type" content="${site.imageType}" />`,
    image && `<meta property="og:image:width" content="${site.imageWidth}" />`,
    image && `<meta property="og:image:height" content="${site.imageHeight}" />`,
    image && `<meta property="og:image:alt" content="${esc(site.imageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    image && `<meta name="twitter:image" content="${image}" />`,
    image && `<meta name="twitter:image:alt" content="${esc(site.imageAlt)}" />`,
    origin && page && `<script type="application/ld+json" id="structured-data">${JSON.stringify(structuredData(page, origin)).replace(/</g, '\\u003c')}</script>`,
  ];
  return tags.filter(Boolean).join('\n    ');
}

/**
 * Plain HTML written into #root for each route, so crawlers that do not run
 * JavaScript still find a heading, the page summary and links to every page.
 * React replaces it on mount.
 */
export function renderBody(page: PageMeta | undefined) {
  const meta = page ?? notFound;
  const heading = page ? (page.path === '/' ? 'AWS cloud, engineered for regulated work' : page.label) : 'Page not found';
  const nav = pages.map((p) => `<li><a href="${p.path}">${esc(p.label)}</a></li>`).join('');
  return `<div class="seo-fallback"><h1>${esc(heading)}</h1><p>${esc(meta.description)}</p><nav aria-label="Pages"><ul>${nav}</ul></nav><p><a href="mailto:${site.email}">${site.email}</a></p></div>`;
}
