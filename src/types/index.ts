export type Difficulty = 'easy' | 'moderate' | 'hard' | 'expert';

export type CrowdLevel = 'low' | 'moderate' | 'high';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

export type WeatherIcon = 'sun' | 'cloud' | 'rain' | 'snow' | 'wind';

export interface Weather {
  temp: number;
  condition: string;
  icon: WeatherIcon;
  humidity: number;
  windSpeed: number;
}

export interface Trail {
  id: string;
  title: string;
  difficulty: Difficulty;
  duration: string;
  distance: string;
  elevation: string;
  elevationGainM: number;
  crowdLevel: CrowdLevel;
  location: string;
  region: string;
  images: string[];
  description: string;
  reviews: Review[];
  rating: number;
  reviewCount: number;
  weather: Weather;
  coordinates: Coordinates;
  tags: string[];
}

export interface Glamping {
  id: string;
  name: string;
  location: string;
  region: string;
  amenities: string[];
  images: string[];
  reviews: Review[];
  rating: number;
  reviewCount: number;
  price: number;
  description: string;
  nearbyTrails: string[];
  coordinates: Coordinates;
}

export interface GroupTrip {
  id: string;
  name: string;
  trailId: string;
  date: string;
  endDate?: string;
  participants: string[];
  status: 'planning' | 'confirmed' | 'completed';
}

export interface Reservation {
  id: string;
  glampingId: string;
  glampingName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  total: number;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export type NotificationType =
  | 'weather'
  | 'restriction'
  | 'reservation'
  | 'recommendation';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  date: string;
  read: boolean;
  trailId?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  age?: number;
  avatar: string;
  bio: string;
  location: string;
  favorites: { trails: string[]; glamping: string[] };
  reservations: Reservation[];
  notifications: AppNotification[];
  groupTrips: GroupTrip[];
  preferences: {
    difficulty: Difficulty[];
    units: 'metric' | 'imperial';
    emailNotifications: boolean;
    pushNotifications: boolean;
    weatherAlerts: boolean;
  };
}

export interface TrailFilters {
  difficulty: Difficulty[];
  search: string;
}

export interface GlampingFilters {
  priceMin: number;
  priceMax: number;
  search: string;
}
