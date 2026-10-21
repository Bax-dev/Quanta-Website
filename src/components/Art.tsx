// 3D illustrations in public/illustrations/3d, from 3dicons.co (CC0, "premium" style).
export type ArtName = 'bulb' | 'chart' | 'cube' | 'flash' | 'lock' | 'puzzle' | 'rocket' | 'setting' | 'shield' | 'target' | 'tool' | 'trophy';

/** Decorative 3D illustration; the card title beside it carries the meaning, so alt is empty. */
export function Art({ name, size = 96, className = '' }: { name: ArtName; size?: number; className?: string }) {
  return <img src={`/illustrations/3d/${name}.webp`} alt="" width={size} height={size} loading="lazy" decoding="async" className={`art-3d ${className}`} />;
}
