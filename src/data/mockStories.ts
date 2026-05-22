import type { StoryMoment } from '../types';

const stories: StoryMoment[] = [
  {
    id: 'story-1',
    userName: 'Andrei Pop',
    userAvatar:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80',
    trailName: 'Valea Jepilor',
    region: 'Bucegi',
    image:
      'https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=1200&q=80',
    caption: 'Am prins răsăritul fix pe creastă. Merită urcarea!',
    postedAt: 'Acum 1h',
    likes: 28,
    hasUnseen: true,
  },
  {
    id: 'story-2',
    userName: 'Maria Ionescu',
    userAvatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    trailName: 'Piatra Craiului',
    region: 'Brașov',
    image:
      'https://images.unsplash.com/photo-1464822759844-d150ad6d1d12?w=1200&q=80',
    caption: 'Pauză la belvedere și ceai cald. Traseul este superb.',
    postedAt: 'Acum 3h',
    likes: 43,
    hasUnseen: true,
  },
  {
    id: 'story-3',
    userName: 'Alex D.',
    userAvatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    trailName: 'Lacul Bâlea',
    region: 'Făgăraș',
    image:
      'https://images.unsplash.com/photo-1483721310020-03333e577078?w=1200&q=80',
    caption: 'Vânt puternic, dar panorama a fost genială.',
    postedAt: 'Ieri',
    likes: 19,
    hasUnseen: false,
  },
  {
    id: 'story-4',
    userName: 'Diana R.',
    userAvatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80',
    trailName: 'Cheile Nerei',
    region: 'Caraș-Severin',
    image:
      'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1200&q=80',
    caption: 'Apă turcoaz și traseu ușor. Perfect pentru weekend.',
    postedAt: 'Ieri',
    likes: 31,
    hasUnseen: false,
  },
];

export function getStoryMoments(): StoryMoment[] {
  return stories;
}
