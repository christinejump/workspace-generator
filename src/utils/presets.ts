import { PresetConfig } from '../lib/types';

export const presets: PresetConfig[] = [
  {
    name: 'Email reply',
    topic: 'Professional email response',
    input: 'Thank you for reaching out. I received your inquiry about the project timeline and would like to provide an update.',
    icon: 'Mail',
  },
  {
    name: 'Meeting notes',
    topic: 'Team meeting summary',
    input: 'Attendees: Sarah, John, Mike. Discussed Q4 roadmap, resource allocation, and upcoming product launch. Key decisions made regarding timeline adjustments.',
    icon: 'FileText',
  },
  {
    name: 'Social post',
    topic: 'Social media announcement',
    input: 'Excited to share our latest product feature that helps teams collaborate more effectively. Users have been asking for this!',
    icon: 'Share2',
  },
];
