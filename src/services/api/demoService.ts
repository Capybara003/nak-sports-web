import { User, Event, Sport, Booking, MapLocation } from '../../types';

// Mock data for demo purposes
const mockUsers: User[] = [
  {
    hash: 'user1',
    email: 'john.doe@email.com',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+1234567890',
    avatar: undefined,
    isActive: true,
    createdAt: Date.now() - 365 * 24 * 60 * 60 * 1000,
  }
];

const mockSports: Sport[] = [
  {
    hash: 'sport1',
    name: 'Surf',
    icon: '🏄‍♂️',
    description: 'Ride the waves with professional instructors',
    category: 'Water Sports'
  },
  {
    hash: 'sport2',
    name: 'Golf',
    icon: '⛳',
    description: 'Improve your golf game with expert coaching',
    category: 'Ball Sports'
  },
  {
    hash: 'sport3',
    name: 'Equitación',
    icon: '🐎',
    description: 'Horseback riding lessons in beautiful settings',
    category: 'Animal Sports'
  },
  {
    hash: 'sport4',
    name: 'Esquí',
    icon: '⛷️',
    description: 'Ski lessons for all skill levels',
    category: 'Winter Sports'
  }
];

const mockEvents: Event[] = [
  {
    hash: 'event1',
    title: 'Surf Lesson - Beginner',
    description: 'Learn the basics of surfing with our experienced instructors',
    startDate: Date.now() + 24 * 60 * 60 * 1000,
    endDate: Date.now() + 24 * 60 * 60 * 1000 + 90 * 60 * 1000,
    location: 'Playa del Carmen',
    sport: mockSports[0],
    instructor: mockUsers[0],
    maxParticipants: 6,
    currentParticipants: 3,
    price: 45.00,
    isActive: true
  },
  {
    hash: 'event2',
    title: 'Golf Clinic - All Levels',
    description: 'Improve your golf technique with personalized coaching',
    startDate: Date.now() + 2 * 24 * 60 * 60 * 1000,
    endDate: Date.now() + 2 * 24 * 60 * 60 * 1000 + 90 * 60 * 1000,
    location: 'Golf Club Riviera Maya',
    sport: mockSports[1],
    instructor: mockUsers[0],
    maxParticipants: 8,
    currentParticipants: 5,
    price: 65.00,
    isActive: true
  },
  {
    hash: 'event3',
    title: 'Horseback Riding - Scenic Trail',
    description: 'Explore beautiful trails on horseback with experienced guides',
    startDate: Date.now() + 3 * 24 * 60 * 60 * 1000,
    endDate: Date.now() + 3 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000,
    location: 'Rancho El Dorado',
    sport: mockSports[2],
    instructor: mockUsers[0],
    maxParticipants: 4,
    currentParticipants: 2,
    price: 55.00,
    isActive: true
  }
];

const mockBookings: Booking[] = [
  {
    hash: 'booking1',
    date: Date.now() + 24 * 60 * 60 * 1000,
    event: mockEvents[0],
    userHash: 'user1',
    isCourse: false,
    isSmallCourse: false,
    isLesson: true,
    isEquipmentRent: false,
    owner: mockUsers[0],
    parentOwner: undefined,
    isFavorite: true,
    userVoucherHash: undefined,
    deleted: false,
    sportIcon: '🏄‍♂️',
    isCanceled: false,
    price: 45.00,
    courseStartDate: undefined,
    courseEndDate: undefined
  },
  {
    hash: 'booking2',
    date: Date.now() + 2 * 24 * 60 * 60 * 1000,
    event: mockEvents[1],
    userHash: 'user1',
    isCourse: false,
    isSmallCourse: false,
    isLesson: true,
    isEquipmentRent: false,
    owner: mockUsers[0],
    parentOwner: undefined,
    isFavorite: false,
    userVoucherHash: undefined,
    deleted: false,
    sportIcon: '⛳',
    isCanceled: false,
    price: 65.00,
    courseStartDate: undefined,
    courseEndDate: undefined
  }
];

const mockLocations: MapLocation[] = [
  {
    hash: 'location1',
    name: 'Playa del Carmen Surf School',
    address: 'Calle 10 Norte, Playa del Carmen',
    city: 'Playa del Carmen',
    country: 'Mexico',
    latitude: 20.6296,
    longitude: -87.0739,
    sport: mockSports[0],
    rating: 4.8,
    isOpen: true,
    distance: 0.5
  },
  {
    hash: 'location2',
    name: 'Golf Club Riviera Maya',
    address: 'Carretera Cancún-Tulum Km 45',
    city: 'Riviera Maya',
    country: 'Mexico',
    latitude: 20.6296,
    longitude: -87.0739,
    sport: mockSports[1],
    rating: 4.6,
    isOpen: true,
    distance: 2.1
  },
  {
    hash: 'location3',
    name: 'Rancho El Dorado',
    address: 'Carretera Federal 307 Km 48',
    city: 'Riviera Maya',
    country: 'Mexico',
    latitude: 20.6296,
    longitude: -87.0739,
    sport: mockSports[2],
    rating: 4.9,
    isOpen: false,
    distance: 3.2
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class DemoService {
  static async getCurrentUser(): Promise<User> {
    await delay(500);
    return mockUsers[0];
  }

  static async getAllSports(): Promise<Sport[]> {
    await delay(300);
    return mockSports;
  }

  static async getAvailableEvents(): Promise<Event[]> {
    await delay(400);
    return mockEvents;
  }

  static async getEventsBySport(sportHash: string): Promise<Event[]> {
    await delay(300);
    return mockEvents.filter(event => event.sport.hash === sportHash);
  }

  static async getUpcomingBookings(): Promise<Booking[]> {
    await delay(400);
    return mockBookings.filter(booking => booking.date > Date.now());
  }

  static async getPastBookings(): Promise<Booking[]> {
    await delay(400);
    return mockBookings.filter(booking => booking.date < Date.now());
  }

  static async getAllLocations(): Promise<MapLocation[]> {
    await delay(300);
    return mockLocations;
  }

  static async getLocationsBySport(sportHash: string): Promise<MapLocation[]> {
    await delay(300);
    return mockLocations.filter(location => location.sport.hash === sportHash);
  }

  static async getPopularLocations(limit: number = 5): Promise<MapLocation[]> {
    await delay(300);
    return mockLocations.slice(0, limit);
  }

  static async login(credentials: { email: string; password: string }): Promise<any> {
    await delay(800);
    if (credentials.email === 'demo@nak.com' && credentials.password === 'demo123') {
      return {
        user: mockUsers[0],
        token: {
          accessToken: 'demo-access-token',
          refreshToken: 'demo-refresh-token',
          expiresIn: 3600,
          tokenType: 'Bearer'
        }
      };
    }
    throw new Error('Invalid credentials');
  }

  static async recoverPassword(email: string): Promise<void> {
    await delay(600);
    // Simulate success
    return;
  }
}

export default DemoService; 