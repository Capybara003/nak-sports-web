// User related types
export interface User {
  hash: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  isActive: boolean;
  createdAt: number;
}

export interface UserProfile extends User {
  dateOfBirth?: number;
  gender?: string;
  address?: string;
  city?: string;
  country?: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  language: string;
  notifications: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
}

// Auth related types
export interface AuthToken {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
  tokenType: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: AuthToken;
}

// Event and Booking types
export interface Event {
  hash: string;
  title: string;
  description?: string;
  startDate: number;
  endDate: number;
  location: string;
  sport: Sport;
  instructor: User;
  maxParticipants: number;
  currentParticipants: number;
  price: number;
  isActive: boolean;
}

export interface Sport {
  hash: string;
  name: string;
  icon: string;
  description?: string;
  category: string;
}

export interface Booking {
  hash: string;
  date: number;
  event: Event;
  userHash: string;
  isCourse: boolean;
  isSmallCourse: boolean;
  isLesson: boolean;
  isEquipmentRent: boolean;
  owner: User;
  parentOwner?: User;
  isFavorite: boolean;
  userVoucherHash?: string;
  deleted: boolean;
  sportIcon: string;
  isCanceled: boolean;
  price: number;
  courseStartDate?: number;
  courseEndDate?: number;
}

export interface BookingRequest {
  eventHash: string;
  date: number;
  userHash: string;
  isCourse: boolean;
  isSmallCourse: boolean;
  isLesson: boolean;
  isEquipmentRent: boolean;
  userVoucherHash?: string;
}

// Location and Map types
export interface MapLocation {
  hash: string;
  name: string;
  address: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  sport: Sport;
  rating: number;
  isOpen: boolean;
  distance?: number;
}

// Course types
export interface Course {
  hash: string;
  name: string;
  description: string;
  sport: Sport;
  instructor: User;
  startDate: number;
  endDate: number;
  sessions: number;
  price: number;
  maxParticipants: number;
  currentParticipants: number;
  level: string;
  isActive: boolean;
}

// Voucher types
export interface Voucher {
  hash: string;
  code: string;
  name: string;
  description: string;
  sport: Sport;
  instructor: User;
  price: number;
  originalPrice: number;
  discount: number;
  validFrom: number;
  validTo: number;
  isActive: boolean;
}

export interface UserVoucher {
  hash: string;
  voucher: Voucher;
  userHash: string;
  purchaseDate: number;
  expiryDate: number;
  isUsed: boolean;
  usedDate?: number;
}

// Payment types
export interface PaymentMethod {
  hash: string;
  type: string;
  brand: string;
  last4: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
  isActive: boolean;
}

// Notification types
export interface Notification {
  hash: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: number;
  data?: any;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Error types
export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

// Search and Filter types
export interface SearchFilters {
  sport?: string;
  location?: string;
  dateFrom?: number;
  dateTo?: number;
  priceMin?: number;
  priceMax?: number;
  level?: string;
  instructor?: string;
}

export interface SearchRequest {
  query?: string;
  filters: SearchFilters;
  page: number;
  limit: number;
} 