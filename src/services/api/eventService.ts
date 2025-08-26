import { httpClient } from './httpClient';
import { Event, Sport, PaginatedResponse, SearchRequest, SearchFilters } from '../../types';

export class EventService {
  // Get all available events
  static async getAvailableEvents(filters?: SearchFilters): Promise<Event[]> {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters) {
        if (filters.sport) queryParams.append('sport', filters.sport);
        if (filters.location) queryParams.append('location', filters.location);
        if (filters.dateFrom) queryParams.append('dateFrom', filters.dateFrom.toString());
        if (filters.dateTo) queryParams.append('dateTo', filters.dateTo.toString());
        if (filters.priceMin) queryParams.append('priceMin', filters.priceMin.toString());
        if (filters.priceMax) queryParams.append('priceMax', filters.priceMax.toString());
        if (filters.level) queryParams.append('level', filters.level);
        if (filters.instructor) queryParams.append('instructor', filters.instructor);
      }

      const url = `events?${queryParams.toString()}`;
      const response = await httpClient.get<Event[]>(url);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch events');
    }
  }

  // Get event by hash
  static async getEventByHash(eventHash: string): Promise<Event> {
    try {
      const response = await httpClient.get<Event>(`events/${eventHash}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch event');
    }
  }

  // Search events
  static async searchEvents(searchRequest: SearchRequest): Promise<PaginatedResponse<Event>> {
    try {
      const response = await httpClient.post<PaginatedResponse<Event>>('events/search', searchRequest);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to search events');
    }
  }

  // Get events by sport
  static async getEventsBySport(sportHash: string): Promise<Event[]> {
    try {
      const response = await httpClient.get<Event[]>(`sports/${sportHash}/events`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch events for sport');
    }
  }

  // Get events by instructor
  static async getEventsByInstructor(instructorHash: string): Promise<Event[]> {
    try {
      const response = await httpClient.get<Event[]>(`users/${instructorHash}/events`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch events for instructor');
    }
  }

  // Get upcoming events
  static async getUpcomingEvents(limit: number = 10): Promise<Event[]> {
    try {
      const response = await httpClient.get<Event[]>(`events/upcoming?limit=${limit}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch upcoming events');
    }
  }

  // Get featured events
  static async getFeaturedEvents(): Promise<Event[]> {
    try {
      const response = await httpClient.get<Event[]>('events/featured');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch featured events');
    }
  }

  // Get events by date range
  static async getEventsByDateRange(startDate: number, endDate: number): Promise<Event[]> {
    try {
      const response = await httpClient.get<Event[]>(`events?startDate=${startDate}&endDate=${endDate}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch events by date range');
    }
  }

  // Get events near location
  static async getEventsNearLocation(latitude: number, longitude: number, radius: number = 10): Promise<Event[]> {
    try {
      const response = await httpClient.get<Event[]>(`events/nearby?lat=${latitude}&lng=${longitude}&radius=${radius}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch nearby events');
    }
  }
}

export default EventService; 