import { httpClient } from './httpClient';
import { Booking, BookingRequest, PaginatedResponse } from '../../types';
import { getUserHash } from './config';

export class BookingService {
  // Get user bookings
  static async getUserBookings(): Promise<Booking[]> {
    try {
      const userHash = getUserHash();
      if (!userHash) {
        throw new Error('User not authenticated');
      }

      const response = await httpClient.get<Booking[]>(`users/${userHash}/bookings`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch bookings');
    }
  }

  // Get user canceled bookings
  static async getUserCanceledBookings(): Promise<Booking[]> {
    try {
      const userHash = getUserHash();
      if (!userHash) {
        throw new Error('User not authenticated');
      }

      const response = await httpClient.get<Booking[]>(`users/${userHash}/bookings?canceled=true`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch canceled bookings');
    }
  }

  // Create new booking
  static async createBooking(request: BookingRequest): Promise<Booking> {
    try {
      const response = await httpClient.post<Booking>('bookings', request);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create booking');
    }
  }

  // Cancel booking
  static async cancelBooking(bookingHash: string): Promise<Booking> {
    try {
      const response = await httpClient.put<Booking>(`bookings/${bookingHash}/cancel`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to cancel booking');
    }
  }

  // Save booking as favorite
  static async saveFavorite(bookingHash: string, isFavorite: boolean): Promise<Booking> {
    try {
      const response = await httpClient.put<Booking>(`bookings/${bookingHash}/favorite`, {
        isFavorite
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update favorite status');
    }
  }

  // Get last booking
  static async getLastBooking(): Promise<Booking | null> {
    try {
      const userHash = getUserHash();
      if (!userHash) {
        throw new Error('User not authenticated');
      }

      const response = await httpClient.get<Booking>(`users/${userHash}/bookings/last`);
      return response.data;
    } catch (error: any) {
      // If no last booking, return null
      if (error.response?.status === 404) {
        return null;
      }
      throw new Error(error.response?.data?.message || 'Failed to fetch last booking');
    }
  }

  // Get upcoming bookings
  static async getUpcomingBookings(): Promise<Booking[]> {
    try {
      const userHash = getUserHash();
      if (!userHash) {
        throw new Error('User not authenticated');
      }

      const response = await httpClient.get<Booking[]>(`users/${userHash}/bookings?upcoming=true`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch upcoming bookings');
    }
  }

  // Get past bookings
  static async getPastBookings(): Promise<Booking[]> {
    try {
      const userHash = getUserHash();
      if (!userHash) {
        throw new Error('User not authenticated');
      }

      const response = await httpClient.get<Booking[]>(`users/${userHash}/bookings?past=true`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch past bookings');
    }
  }

  // Get booking by hash
  static async getBookingByHash(bookingHash: string): Promise<Booking> {
    try {
      const response = await httpClient.get<Booking>(`bookings/${bookingHash}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch booking');
    }
  }

  // Update booking
  static async updateBooking(bookingHash: string, updates: Partial<BookingRequest>): Promise<Booking> {
    try {
      const response = await httpClient.put<Booking>(`bookings/${bookingHash}`, updates);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update booking');
    }
  }
}

export default BookingService; 