import { Children, Fragment, isValidElement, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useScroll, useSpring, useTransform, type Variants } from 'framer-motion';
import { Plus } from 'lucide-react';

const ease = [.2, .7, .2, 1] as const;
const offsets = { up: { y: 28 }, down: { y: -28 }, left: { x: 36 }, right: { x: -36 }, scale: { scale: .94 }, none: {} };
type From = keyof typeof offsets;

/** Fades content in as it scrolls into view. `from` picks the direction it travels in from. */
export function Reveal({ children, className = '', from = 'up', delay = 0 }: { children: ReactNode; className?: string; from?: From; delay?: number }) {
  return <motion.div className={className} initial={{ opacity: 0, ...offsets[from] }} whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .8, ease, delay }}>{children}</motion.div>;
}

const staggerParent: Variants = { hidden: {}, shown: { transition: { staggerChildren: .09 } } };
const staggerChild: Variants = { hidden: { opacity: 0, y: 26 }, shown: { opacity: 1, y: 0, transition: { duration: .7, ease } } };

/** Grid or list whose direct children animate in one after another. */
export function Stagger({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <motion.div className={className} variants={staggerParent} initial="hidden" whileInView="shown" viewport={{ once: true, amount: .12 }}>
    {Children.map(children, (child) => isValidElement(child) ? <motion.div className="stagger-item" variants={staggerChild}>{child}</motion.div> : child)}
  </motion.div>;
}

/**
 * Headline whose words rise into place one by one. Accepts plain text plus
 * <br/> and <em> children so existing title markup keeps working.
 */
export function SplitWords({ children }: { children: ReactNode }) {
  let index = 0;
  const word = (text: string, key: string) => <span className="split-word" key={key}><motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: .85, ease, delay: .08 + index++ * .06 }}>{text}</motion.span></span>;
  const words = (text: string, prefix: string) => text.split(/(\s+)/).map((part, i) => /^\s+$/.test(part) || !part ? part : word(part, `${prefix}-${i}`));
  const walk = (node: ReactNode, prefix: string): ReactNode => {
    if (typeof node === 'string') return words(node, prefix);
    if (Array.isArray(node)) return node.map((n, i) => walk(n, `${prefix}.${i}`));
    if (isValidElement<{ children?: ReactNode }>(node)) {
      if (node.type === 'br') return <br key={prefix} />;
      if (node.type === 'em') return <em key={prefix}>{walk(node.props.children, prefix)}</em>;
      if (node.type === Fragment) return walk(node.props.children, prefix);
    }
    return node;
  };
  return <>{walk(children, 'w')}</>;
}

/** Thin bar at the top of the window that fills as the page is scrolled. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: .001 });
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}

/** Numbered steps joined by a line that draws itself as the section scrolls past. */
export function Timeline({ steps, dark = false }: { steps: { title: string; copy: string; meta?: string }[]; dark?: boolean }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 55%'] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return <ol ref={ref} className={`timeline ${dark ? 'timeline-dark' : ''}`}>
    <span className="timeline-track" aria-hidden="true"><motion.span className="timeline-fill" style={{ scaleY }} /></span>
    {steps.map((step, i) => <motion.li key={step.title} initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .6 }} transition={{ duration: .6, ease }}>
      <span className="timeline-dot">{String(i + 1).padStart(2, '0')}</span>
      <div>{step.meta && <span className="timeline-meta">{step.meta}</span>}<h3>{step.title}</h3><p>{step.copy}</p></div>
    </motion.li>)}
  </ol>;
}

/** Accordion of questions; one answer open at a time, animated open and closed. */
export function Faq({ items }: { items: [question: string, answer: string][] }) {
  const [open, setOpen] = useState<number | null>(0);
  return <div className="faq">{items.map(([question, answer], i) => {
    const expanded = open === i;
    return <div key={question} className={`faq-item ${expanded ? 'is-open' : ''}`}>
      <button type="button" className="faq-question" aria-expanded={expanded} onClick={() => setOpen(expanded ? null : i)}>
        <span className="faq-no">{String(i + 1).padStart(2, '0')}</span><span>{question}</span><motion.span className="faq-icon" animate={{ rotate: expanded ? 45 : 0 }}><Plus size={18} /></motion.span>
      </button>
      <AnimatePresence initial={false}>{expanded && <motion.div className="faq-answer" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .4, ease }}><p>{answer}</p></motion.div>}</AnimatePresence>
    </div>;
  })}</div>;
}
