import { Children, isValidElement, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const ease = [.2, .7, .2, 1] as const;

/** Layout wrapper kept from the old scroll animations; renders immediately so nothing flashes in. */
export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

/** Grid or list wrapper; each direct child gets a `stagger-item` cell so grid rows stretch evenly. */
export function Stagger({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={className}>
    {Children.map(children, (child) => isValidElement(child) ? <div className="stagger-item">{child}</div> : child)}
  </div>;
}

/** Numbered steps joined by a vertical line. */
export function Timeline({ steps, dark = false }: { steps: { title: string; copy: string; meta?: string }[]; dark?: boolean }) {
  return <ol className={`timeline ${dark ? 'timeline-dark' : ''}`}>
    <span className="timeline-track" aria-hidden="true" />
    {steps.map((step, i) => <li key={step.title}>
      <span className="timeline-dot">{i + 1}</span>
      <div>{step.meta && <span className="timeline-meta">{step.meta}</span>}<h3>{step.title}</h3><p>{step.copy}</p></div>
    </li>)}
  </ol>;
}

/** Accordion of questions; one answer open at a time. */
export function Faq({ items }: { items: [question: string, answer: string][] }) {
  const [open, setOpen] = useState<number | null>(0);
  return <div className="faq">{items.map(([question, answer], i) => {
    const expanded = open === i;
    return <div key={question} className={`faq-item ${expanded ? 'is-open' : ''}`}>
      <button type="button" className="faq-question" aria-expanded={expanded} onClick={() => setOpen(expanded ? null : i)}>
        <span>{question}</span><span className="faq-icon"><Plus size={18} style={{ rotate: expanded ? '45deg' : '0deg' }} /></span>
      </button>
      <AnimatePresence initial={false}>{expanded && <motion.div className="faq-answer" initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} transition={{ duration: .25, ease }}><p>{answer}</p></motion.div>}</AnimatePresence>
    </div>;
  })}</div>;
}
