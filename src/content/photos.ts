import type { Photo } from '@/components/Photo';

// Local images live in public/images as 640w and 1024w WebP; the rest are Unsplash photos (free licence).
export const photos = {
  dataCentre: { src: '/images/quanta-data-centre', alt: 'Server racks lining a softly lit data centre aisle' },
  digitalServices: { src: '/images/quanta-digital-services', alt: 'A team reviewing a cloud architecture on a large display' },
  engineeringTeam: { src: '/images/quanta-engineering-team', alt: 'Engineers sketching a system design on a whiteboard' },
  finance: { src: '/images/quanta-finance', alt: 'An analyst reviewing financial dashboards on a laptop' },

  engineerInDataCentre: { id: '1573164713988-8665fc963095', alt: 'An engineer with a tablet walking through a data centre' },
  padlock: { id: '1614064641938-3bbee52942c7', alt: 'A padlock resting on an illuminated keyboard' },
  serverRack: { id: '1558494949-ef010cbdcc31', alt: 'Cabling inside a server rack' },
  dashboards: { id: '1504868584819-f8e8b4b6d7e3', alt: 'A laptop showing operational dashboards' },
  pairing: { id: '1531482615713-2afd69097998', alt: 'Two engineers working through code together' },
  teamAtWork: { id: '1522071820081-009f0129c71c', alt: 'A team working on laptops around a shared table' },
  celebration: { id: '1600880292203-757bb62b4baf', alt: 'Colleagues celebrating a milestone with a high five' },
  planning: { id: '1454165804606-c3d57bc86b40', alt: 'Hands planning a project on paper beside a laptop' },
  city: { id: '1577948000111-9c970dfe3743', alt: 'A city skyline under a wide sky' },
  healthcare: { id: '1576091160550-2173dba999ef', alt: 'A clinician typing on a laptop beside a stethoscope' },
  publicSector: { id: '1562774053-701939374585', alt: 'A large public institution building behind a lawn' },
  education: { id: '1524178232363-1fb2b075b655', alt: 'Students attending a lecture' },
  energy: { id: '1497435334941-8c899ee9e8e9', alt: 'Rows of solar panels across a green field' },
  retail: { id: '1556742049-0cfed4f6a45d', alt: 'A customer paying by phone at a shop counter' },
  towers: { id: '1486406146926-c627a92ad1ab', alt: 'Glass office towers seen from street level' },
} satisfies Record<string, Photo>;
