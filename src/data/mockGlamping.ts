import type { Glamping, Review } from '../types';

function glampingReviews(locationName: string): Review[] {
  return [
    {
      id: `gr-${locationName}-1`,
      author: 'Maria D.',
      avatar: 'https://i.pravatar.cc/150?u=maria',
      rating: 5,
      date: '2025-04-20',
      comment: `Experiență minunată la ${locationName}. Recomand cu căldură!`,
    },
    {
      id: `gr-${locationName}-2`,
      author: 'Andrei P.',
      avatar: 'https://i.pravatar.cc/150?u=andrei',
      rating: 4,
      date: '2025-03-10',
      comment: 'Cazare confortabilă, peisaje superbe. Ideal după o zi lungă pe traseu.',
    },
  ];
}

export const glampingLocations: Glamping[] = [
  {
    id: 'glamp-1',
    name: 'Domuri Bucegi — Refugiu Verde',
    location: 'Bușteni, Prahova',
    region: 'Bucegi',
    amenities: ['Wi-Fi', 'Ciubăr', 'Bucătărie', 'Foc de tabără', 'Animale acceptate'],
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80',
    ],
    reviews: glampingReviews('Domuri Bucegi'),
    rating: 4.9,
    reviewCount: 156,
    price: 520,
    description:
      'Domuri geodezice la poalele Bucegilor, cu vedere spre creste. Ciubăr privat și terasă pentru seri sub stele.',
    nearbyTrails: ['trail-1', 'trail-3'],
    coordinates: { lat: 45.405, lng: 25.542 },
  },
  {
    id: 'glamp-2',
    name: 'Iurte Maramureșene',
    location: 'Brebu, Maramureș',
    region: 'Maramureș',
    amenities: ['Vedere munte', 'Mic dejun', 'Tradițional', 'Foc de tabără'],
    images: [
      'https://images.unsplash.com/photo-1478131143081-80f7f84b84e7?w=800&q=80',
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80',
    ],
    reviews: glampingReviews('Iurte Maramureș'),
    rating: 4.7,
    reviewCount: 203,
    price: 380,
    description:
      'Iurte autentice în sat tradițional maramureșean. Liniște, mâncare locală și acces ușor spre trasee montane.',
    nearbyTrails: [],
    coordinates: { lat: 47.78, lng: 24.12 },
  },
  {
    id: 'glamp-3',
    name: 'Cabane A-Frame — Brașov',
    location: 'Poiana Mărului, Brașov',
    region: 'Piatra Craiului',
    amenities: ['Saună', 'Vedere munte', 'Bucătărie', 'Încălzire'],
    images: [
      'https://images.unsplash.com/photo-1449158743715-e967b676d9b8?w=800&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
    ],
    reviews: glampingReviews('Cabane Brașov'),
    rating: 4.8,
    reviewCount: 94,
    price: 650,
    description:
      'Cabane moderne A-frame cu vedere spre Piatra Craiului. Bază ideală pentru drumeții și relaxare.',
    nearbyTrails: ['trail-4'],
    coordinates: { lat: 45.45, lng: 25.28 },
  },
  {
    id: 'glamp-4',
    name: 'Colțul Pădurii — Apuseni',
    location: 'Garda de Sus, Alba',
    region: 'Apuseni',
    amenities: ['Eco', 'Hamace', 'Energie solară', 'Liniște'],
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
    ],
    reviews: glampingReviews('Apuseni'),
    rating: 4.6,
    reviewCount: 178,
    price: 320,
    description:
      'Corturi luxury înconjurate de pădure de fag. La câteva minute de traseele din zona Padiș.',
    nearbyTrails: ['trail-2'],
    coordinates: { lat: 46.548, lng: 22.81 },
  },
  {
    id: 'glamp-5',
    name: 'Delta Retreat — Dunăre',
    location: 'Sulina, Tulcea',
    region: 'Delta Dunării',
    amenities: ['Vedere apă', 'Barcă', 'Terasă', 'Grătar', 'Parcare'],
    images: [
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80',
      'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80',
    ],
    reviews: glampingReviews('Delta Retreat'),
    rating: 4.5,
    reviewCount: 267,
    price: 420,
    description:
      'Corturi pe malul Dunării, în inima Deltei. Observare păsări, plimbări cu barca și apusuri memorabile.',
    nearbyTrails: ['trail-6'],
    coordinates: { lat: 45.155, lng: 29.653 },
  },
  {
    id: 'glamp-6',
    name: 'Lacul Bucura — Retezat',
    location: 'Câmpușel, Hunedoara',
    region: 'Retezat',
    amenities: ['Acces lac', 'Cort montan', 'Sobă', 'Deck privat'],
    images: [
      'https://images.unsplash.com/photo-1478131143081-80f7f84b84e7?w=800&q=80',
      'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80',
    ],
    reviews: glampingReviews('Retezat'),
    rating: 4.9,
    reviewCount: 312,
    price: 480,
    description:
      'Safari tents lângă zona montană a Retezatului. Punct de plecare spre trasee alpine și lacuri glaciare.',
    nearbyTrails: [],
    coordinates: { lat: 45.32, lng: 22.88 },
  },
];

export function getGlampingById(id: string): Glamping | undefined {
  return glampingLocations.find((g) => g.id === id);
}

export function getRecommendedGlamping(limit = 3): Glamping[] {
  return [...glampingLocations].sort((a, b) => b.rating - a.rating).slice(0, limit);
}
