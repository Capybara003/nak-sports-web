import { httpClient } from './httpClient';
import { Sport, Event, Course } from '../../types';

export class SportService {
  // Get all sports
  static async getAllSports(): Promise<Sport[]> {
    try {
      const response = await httpClient.get<Sport[]>('sports');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch sports');
    }
  }

  // Get sport by hash
  static async getSportByHash(sportHash: string): Promise<Sport> {
    try {
      const response = await httpClient.get<Sport>(`sports/${sportHash}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch sport');
    }
  }

  // Get sports by category
  static async getSportsByCategory(category: string): Promise<Sport[]> {
    try {
      const response = await httpClient.get<Sport[]>(`sports/category/${encodeURIComponent(category)}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch sports by category');
    }
  }

  // Get popular sports
  static async getPopularSports(limit: number = 10): Promise<Sport[]> {
    try {
      const response = await httpClient.get<Sport[]>(`sports/popular?limit=${limit}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch popular sports');
    }
  }

  // Search sports
  static async searchSports(query: string): Promise<Sport[]> {
    try {
      const response = await httpClient.get<Sport[]>(`sports/search?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to search sports');
    }
  }

  // Get sport categories
  static async getSportCategories(): Promise<string[]> {
    try {
      const response = await httpClient.get<string[]>('sports/categories');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch sport categories');
    }
  }

  // Get events for a specific sport
  static async getSportEvents(sportHash: string, filters?: {
    dateFrom?: number;
    dateTo?: number;
    location?: string;
    level?: string;
    priceMin?: number;
    priceMax?: number;
  }): Promise<Event[]> {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters) {
        if (filters.dateFrom) queryParams.append('dateFrom', filters.dateFrom.toString());
        if (filters.dateTo) queryParams.append('dateTo', filters.dateTo.toString());
        if (filters.location) queryParams.append('location', filters.location);
        if (filters.level) queryParams.append('level', filters.level);
        if (filters.priceMin) queryParams.append('priceMin', filters.priceMin.toString());
        if (filters.priceMax) queryParams.append('priceMax', filters.priceMax.toString());
      }

      const url = `sports/${sportHash}/events?${queryParams.toString()}`;
      const response = await httpClient.get<Event[]>(url);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch sport events');
    }
  }

  // Get courses for a specific sport
  static async getSportCourses(sportHash: string, filters?: {
    level?: string;
    instructor?: string;
    priceMin?: number;
    priceMax?: number;
  }): Promise<Course[]> {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters) {
        if (filters.level) queryParams.append('level', filters.level);
        if (filters.instructor) queryParams.append('instructor', filters.instructor);
        if (filters.priceMin) queryParams.append('priceMin', filters.priceMin.toString());
        if (filters.priceMax) queryParams.append('priceMax', filters.priceMax.toString());
      }

      const url = `sports/${sportHash}/courses?${queryParams.toString()}`;
      const response = await httpClient.get<Course[]>(url);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch sport courses');
    }
  }

  // Get sport instructors
  static async getSportInstructors(sportHash: string): Promise<any[]> {
    try {
      const response = await httpClient.get<any[]>(`sports/${sportHash}/instructors`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch sport instructors');
    }
  }

  // Get sport locations
  static async getSportLocations(sportHash: string): Promise<any[]> {
    try {
      const response = await httpClient.get<any[]>(`sports/${sportHash}/locations`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch sport locations');
    }
  }

  // Get sport statistics
  static async getSportStatistics(sportHash: string): Promise<{
    totalEvents: number;
    totalCourses: number;
    totalInstructors: number;
    totalLocations: number;
    averageRating: number;
    totalBookings: number;
  }> {
    try {
      const response = await httpClient.get<{
        totalEvents: number;
        totalCourses: number;
        totalInstructors: number;
        totalLocations: number;
        averageRating: number;
        totalBookings: number;
      }>(`sports/${sportHash}/statistics`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch sport statistics');
    }
  }

  // Get user's favorite sports
  static async getUserFavoriteSports(): Promise<Sport[]> {
    try {
      const response = await httpClient.get<Sport[]>('sports/favorites');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch favorite sports');
    }
  }

  // Add sport to favorites
  static async addSportToFavorites(sportHash: string): Promise<void> {
    try {
      await httpClient.post(`sports/${sportHash}/favorite`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to add sport to favorites');
    }
  }

  // Remove sport from favorites
  static async removeSportFromFavorites(sportHash: string): Promise<void> {
    try {
      await httpClient.delete(`sports/${sportHash}/favorite`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to remove sport from favorites');
    }
  }
}

export default SportService; 