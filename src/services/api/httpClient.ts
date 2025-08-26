import axios, { AxiosInstance, AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import { API_BASE_URL, buildHeaders, getRefreshToken } from './config';

class HttpClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add headers to each request
        const isAnonymous = config.headers?.['ANONYMOUS'] === 'true';
        const headers = buildHeaders(isAnonymous);
        
        // Merge headers safely
        if (config.headers) {
          Object.keys(headers).forEach(key => {
            (config.headers as any)[key] = headers[key];
          });
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor for handling 401 errors and token refresh
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config;
        
        if (error.response?.status === 401 && originalRequest && !originalRequest.headers?.['ANONYMOUS']) {
          try {
            // Try to refresh the token
            const refreshToken = getRefreshToken();
            if (refreshToken) {
              const response = await this.post('auth/token', {
                refresh_token: refreshToken
              }, { headers: { 'ANONYMOUS': 'true' } });
              
              if (response.data) {
                // Store new tokens
                localStorage.setItem('authToken', response.data.accessToken);
                if (response.data.refreshToken) {
                  localStorage.setItem('refreshToken', response.data.refreshToken);
                }
                
                // Retry the original request
                const newHeaders = buildHeaders();
                Object.keys(newHeaders).forEach(key => {
                  if (originalRequest.headers) {
                    (originalRequest.headers as any)[key] = newHeaders[key];
                  }
                });
                return this.client(originalRequest);
              }
            }
          } catch (refreshError) {
            // If refresh fails, clear tokens and redirect to login
            localStorage.removeItem('authToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('userHash');
            window.location.href = '/login';
          }
        }
        
        return Promise.reject(error);
      }
    );
  }

  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.get<T>(url, config);
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.post<T>(url, data, config);
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.put<T>(url, data, config);
  }

  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.patch<T>(url, data, config);
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.delete<T>(url, config);
  }
}

// Export singleton instance
export const httpClient = new HttpClient();
export default httpClient; 