import { useRef, type ImgHTMLAttributes } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

/** A local image in public/ (`src`) or an Unsplash photo (`id`, the part after `photo-`). */
export type Photo = { alt: string } & ({ src: string; id?: never } | { id: string; src?: never });

const WIDTHS = [480, 768, 1080, 1440, 1920];

function unsplashUrl(id: string, width: number, ratio: number) {
  const params = new URLSearchParams({ auto: 'format', fit: 'crop', q: '80', w: String(width), h: String(Math.round(width / ratio)) });
  return `https://images.unsplash.com/photo-${id}?${params}`;
}

type ImgProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'alt'> & {
  photo: Photo;
  /** Width / height used to crop Unsplash photos and reserve layout space. */
  ratio?: number;
  priority?: boolean;
};

/** Responsive, lazy-loaded image with reserved dimensions to avoid layout shift. */
export function Img({ photo, ratio = 4 / 3, priority = false, sizes = '(min-width: 980px) 50vw, 100vw', ...rest }: ImgProps) {
  const sources = photo.id
    ? { src: unsplashUrl(photo.id, 1080, ratio), srcSet: WIDTHS.map((w) => `${unsplashUrl(photo.id, w, ratio)} ${w}w`).join(', '), sizes }
    : { src: photo.src };
  return <img {...sources} alt={photo.alt} width={1440} height={Math.round(1440 / ratio)} loading={priority ? 'eager' : 'lazy'} decoding="async" fetchPriority={priority ? 'high' : 'auto'} {...rest} />;
}

/**
 * Framed photo that wipes into view, then drifts against the scroll for a
 * gentle parallax. The frame clips the overscanned image.
 */
export function ParallaxPhoto({ photo, ratio = 4 / 3, className = '', caption, sizes, priority }: { photo: Photo; ratio?: number; className?: string; caption?: string; sizes?: string; priority?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['-8%', '8%']);
  // The in-view trigger sits on the unclipped frame: Chrome treats a fully
  // clip-pathed element as not intersecting, so it would never reveal.
  return <motion.figure ref={ref} className={`photo-frame ${className}`} style={{ aspectRatio: ratio }} initial={reduced ? 'shown' : 'hidden'} whileInView="shown" viewport={{ once: true, amount: .25 }}>
    <motion.div className="photo-clip" variants={{ hidden: { clipPath: 'inset(0 0 100% 0)' }, shown: { clipPath: 'inset(0 0 0% 0)', transition: { duration: 1.1, ease: [.65, 0, .35, 1] } } }}>
      <motion.div className="photo-inner" style={{ y }}><Img photo={photo} ratio={ratio} sizes={sizes} priority={priority} /></motion.div>
    </motion.div>
    {caption && <figcaption>{caption}</figcaption>}
  </motion.figure>;
}
