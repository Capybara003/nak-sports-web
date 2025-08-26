import { httpClient } from './httpClient';
import { User, UserProfile, UserPreferences, PaymentMethod, Notification } from '../../types';
import { getUserHash } from './config';

export class UserService {
  // Get current user profile
  static async getCurrentUser(): Promise<UserProfile> {
    try {
      const userHash = getUserHash();
      if (!userHash) {
        throw new Error('User not authenticated');
      }

      const response = await httpClient.get<UserProfile>(`users/${userHash}/profile`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user profile');
    }
  }

  // Update user profile
  static async updateProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    try {
      const userHash = getUserHash();
      if (!userHash) {
        throw new Error('User not authenticated');
      }

      const response = await httpClient.put<UserProfile>(`users/${userHash}/profile`, updates);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update user profile');
    }
  }

  // Update user preferences
  static async updatePreferences(preferences: Partial<UserPreferences>): Promise<UserPreferences> {
    try {
      const userHash = getUserHash();
      if (!userHash) {
        throw new Error('User not authenticated');
      }

      const response = await httpClient.put<UserPreferences>(`users/${userHash}/preferences`, preferences);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update user preferences');
    }
  }

  // Change password
  static async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    try {
      const userHash = getUserHash();
      if (!userHash) {
        throw new Error('User not authenticated');
      }

      await httpClient.put(`users/${userHash}/password`, {
        currentPassword,
        newPassword
      });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to change password');
    }
  }

  // Get user payment methods
  static async getPaymentMethods(): Promise<PaymentMethod[]> {
    try {
      const userHash = getUserHash();
      if (!userHash) {
        throw new Error('User not authenticated');
      }

      const response = await httpClient.get<PaymentMethod[]>(`users/${userHash}/payment-methods`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch payment methods');
    }
  }

  // Add payment method
  static async addPaymentMethod(paymentMethod: Partial<PaymentMethod>): Promise<PaymentMethod> {
    try {
      const userHash = getUserHash();
      if (!userHash) {
        throw new Error('User not authenticated');
      }

      const response = await httpClient.post<PaymentMethod>(`users/${userHash}/payment-methods`, paymentMethod);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to add payment method');
    }
  }

  // Remove payment method
  static async removePaymentMethod(paymentMethodHash: string): Promise<void> {
    try {
      const userHash = getUserHash();
      if (!userHash) {
        throw new Error('User not authenticated');
      }

      await httpClient.delete(`users/${userHash}/payment-methods/${paymentMethodHash}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to remove payment method');
    }
  }

  // Set default payment method
  static async setDefaultPaymentMethod(paymentMethodHash: string): Promise<void> {
    try {
      const userHash = getUserHash();
      if (!userHash) {
        throw new Error('User not authenticated');
      }

      await httpClient.put(`users/${userHash}/payment-methods/${paymentMethodHash}/default`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to set default payment method');
    }
  }

  // Get user notifications
  static async getNotifications(): Promise<Notification[]> {
    try {
      const userHash = getUserHash();
      if (!userHash) {
        throw new Error('User not authenticated');
      }

      const response = await httpClient.get<Notification[]>(`users/${userHash}/notifications`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch notifications');
    }
  }

  // Mark notification as read
  static async markNotificationAsRead(notificationHash: string): Promise<void> {
    try {
      const userHash = getUserHash();
      if (!userHash) {
        throw new Error('User not authenticated');
      }

      await httpClient.put(`users/${userHash}/notifications/${notificationHash}/read`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to mark notification as read');
    }
  }

  // Mark all notifications as read
  static async markAllNotificationsAsRead(): Promise<void> {
    try {
      const userHash = getUserHash();
      if (!userHash) {
        throw new Error('User not authenticated');
      }

      await httpClient.put(`users/${userHash}/notifications/read-all`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to mark all notifications as read');
    }
  }

  // Delete notification
  static async deleteNotification(notificationHash: string): Promise<void> {
    try {
      const userHash = getUserHash();
      if (!userHash) {
        throw new Error('User not authenticated');
      }

      await httpClient.delete(`users/${userHash}/notifications/${notificationHash}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to delete notification');
    }
  }

  // Get notification count
  static async getNotificationCount(): Promise<{ unread: number; total: number }> {
    try {
      const userHash = getUserHash();
      if (!userHash) {
        throw new Error('User not authenticated');
      }

      const response = await httpClient.get<{ unread: number; total: number }>(`users/${userHash}/notifications/count`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch notification count');
    }
  }

  // Upload profile picture
  static async uploadProfilePicture(file: File): Promise<{ avatarUrl: string }> {
    try {
      const userHash = getUserHash();
      if (!userHash) {
        throw new Error('User not authenticated');
      }

      const formData = new FormData();
      formData.append('avatar', file);

      const response = await httpClient.post<{ avatarUrl: string }>(`users/${userHash}/avatar`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to upload profile picture');
    }
  }
}

export default UserService; 