import { httpClient } from './httpClient';
import { LoginRequest, LoginResponse, AuthToken, User } from '../../types';

export class AuthService {
  // Login user
  static async login(request: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await httpClient.post<LoginResponse>('auth/login', request, {
        headers: { 'ANONYMOUS': 'true' }
      });
      
      // Store tokens and user data
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token.accessToken);
        if (response.data.token.refreshToken) {
          localStorage.setItem('refreshToken', response.data.token.refreshToken);
        }
        localStorage.setItem('userHash', response.data.user.hash);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }

  // Refresh token
  static async refreshToken(): Promise<AuthToken> {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await httpClient.post<AuthToken>('auth/token', {
        refresh_token: refreshToken
      }, {
        headers: { 'ANONYMOUS': 'true' }
      });

      // Update stored tokens
      localStorage.setItem('authToken', response.data.accessToken);
      if (response.data.refreshToken) {
        localStorage.setItem('refreshToken', response.data.refreshToken);
      }

      return response.data;
    } catch (error: any) {
      // Clear tokens on refresh failure
      this.logout();
      throw new Error('Token refresh failed');
    }
  }

  // Recover password
  static async recoverPassword(email: string): Promise<void> {
    try {
      await httpClient.post('auth/recover-password', { email }, {
        headers: { 'ANONYMOUS': 'true' }
      });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Password recovery failed');
    }
  }

  // Logout user
  static logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userHash');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token;
  }

  // Get current user
  static getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  }

  // Get auth token
  static getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Check if token is expired
  static isTokenExpired(): boolean {
    const token = localStorage.getItem('authToken');
    if (!token) return true;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }
}

export default AuthService; 