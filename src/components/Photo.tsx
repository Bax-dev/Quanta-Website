import type { ImgHTMLAttributes } from 'react';

/**
 * A local image (`src`: path in public/ without extension, served as
 * `<src>-640.webp` and `<src>-1024.webp`) or an Unsplash photo (`id`, the
 * part after `photo-`).
 */
export type Photo = { alt: string } & ({ src: string; id?: never } | { id: string; src?: never });

const WIDTHS = [480, 768, 1080, 1440, 1920];
const LOCAL_WIDTHS = [640, 1024];

function unsplashUrl(id: string, width: number, ratio: number) {
  const params = new URLSearchParams({ auto: 'format', fit: 'crop', q: '72', w: String(width), h: String(Math.round(width / ratio)) });
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
    : { src: `${photo.src}-1024.webp`, srcSet: LOCAL_WIDTHS.map((w) => `${photo.src}-${w}.webp ${w}w`).join(', '), sizes };
  return <img {...sources} alt={photo.alt} width={1440} height={Math.round(1440 / ratio)} loading={priority ? 'eager' : 'lazy'} decoding="async" fetchPriority={priority ? 'high' : 'auto'} {...rest} />;
}

/** Photo cropped to a fixed aspect ratio. */
export function FramedPhoto({ photo, ratio = 4 / 3, className = '', sizes, priority }: { photo: Photo; ratio?: number; className?: string; sizes?: string; priority?: boolean }) {
  return <figure className={`photo-frame ${className}`} style={{ aspectRatio: ratio }}>
    <Img photo={photo} ratio={ratio} sizes={sizes} priority={priority} />
  </figure>;
}
