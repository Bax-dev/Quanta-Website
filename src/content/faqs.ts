// Questions and answers shown on each page's FAQ and published as FAQPage
// structured data. Keyed by route; imported by vite.config.ts via seo.ts, so
// keep it free of browser APIs and the '@' alias.

export const faqs: Record<string, [string, string][]> = {
  '/services': [
    ['Do we need a fully formed brief before we talk?', 'No. Many engagements start with a single question or a stubborn problem. Part of our job is helping you shape the brief.'],
    ['Can you work alongside our existing engineers or another supplier?', 'Yes. We regularly embed with in-house teams and work next to other partners. Clear ownership matters more than who is on the badge.'],
    ['How do you price engagements?', 'It depends on the shape of the work. Whatever the model, scope and cost are agreed in plain terms before anything starts.'],
    ['What happens once the project ends?', 'You keep everything: code, documentation and runbooks. Some clients move to managed operations with us; others run it themselves with our support on call.'],
  ],
  '/how-we-work': [
    ['How quickly can an engagement start?', 'It depends on scope and team availability. We will give you a realistic start date in the first conversation rather than an optimistic one.'],
    ['Do you work remotely or on site?', 'Both. Most delivery is remote-first, with on-site sessions for discovery, workshops and key milestones.'],
    ['Which model is right for us?', 'If you are unsure, start with an advisory sprint. It is designed to answer exactly that question.'],
    ['Can we switch models later?', 'Yes. Many clients begin with advisory work, move into delivery and then into managed operations as the platform matures.'],
  ],
  '/contact': [
    ['Is the first conversation free?', 'Yes. The first conversation is about understanding your situation. There is no obligation attached to it.'],
    ['Who will we be speaking with?', 'An engineer who does the work, not a sales intermediary. If a specialist would help, we bring them in early.'],
    ['Can we share architecture details under NDA?', 'Of course. We are happy to sign a mutual NDA before any detailed technical discussion.'],
  ],
};
