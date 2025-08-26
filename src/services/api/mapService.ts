import { httpClient } from './httpClient';
import { MapLocation, Sport } from '../../types';

export class MapService {
  // Get all locations
  static async getAllLocations(): Promise<MapLocation[]> {
    try {
      const response = await httpClient.get<MapLocation[]>('locations');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch locations');
    }
  }

  // Get locations by sport
  static async getLocationsBySport(sportHash: string): Promise<MapLocation[]> {
    try {
      const response = await httpClient.get<MapLocation[]>(`sports/${sportHash}/locations`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch locations for sport');
    }
  }

  // Get locations near coordinates
  static async getLocationsNearby(latitude: number, longitude: number, radius: number = 10): Promise<MapLocation[]> {
    try {
      const response = await httpClient.get<MapLocation[]>(`locations/nearby?lat=${latitude}&lng=${longitude}&radius=${radius}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch nearby locations');
    }
  }

  // Get location by hash
  static async getLocationByHash(locationHash: string): Promise<MapLocation> {
    try {
      const response = await httpClient.get<MapLocation>(`locations/${locationHash}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch location');
    }
  }

  // Search locations
  static async searchLocations(query: string): Promise<MapLocation[]> {
    try {
      const response = await httpClient.get<MapLocation[]>(`locations/search?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to search locations');
    }
  }

  // Get locations by city
  static async getLocationsByCity(city: string): Promise<MapLocation[]> {
    try {
      const response = await httpClient.get<MapLocation[]>(`locations/city/${encodeURIComponent(city)}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch locations by city');
    }
  }

  // Get popular locations
  static async getPopularLocations(limit: number = 10): Promise<MapLocation[]> {
    try {
      const response = await httpClient.get<MapLocation[]>(`locations/popular?limit=${limit}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch popular locations');
    }
  }

  // Get locations with availability
  static async getLocationsWithAvailability(date: number): Promise<MapLocation[]> {
    try {
      const response = await httpClient.get<MapLocation[]>(`locations/availability?date=${date}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch locations with availability');
    }
  }

  // Get location details with events
  static async getLocationWithEvents(locationHash: string, date?: number): Promise<MapLocation & { events: any[] }> {
    try {
      const params = date ? `?date=${date}` : '';
      const response = await httpClient.get<MapLocation & { events: any[] }>(`locations/${locationHash}/events${params}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch location with events');
    }
  }

  // Get user's favorite locations
  static async getUserFavoriteLocations(): Promise<MapLocation[]> {
    try {
      const response = await httpClient.get<MapLocation[]>('locations/favorites');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch favorite locations');
    }
  }

  // Add location to favorites
  static async addLocationToFavorites(locationHash: string): Promise<void> {
    try {
      await httpClient.post(`locations/${locationHash}/favorite`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to add location to favorites');
    }
  }

  // Remove location from favorites
  static async removeLocationFromFavorites(locationHash: string): Promise<void> {
    try {
      await httpClient.delete(`locations/${locationHash}/favorite`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to remove location from favorites');
    }
  }
}

export default MapService; 