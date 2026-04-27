import api from './api';
import { mockUsers } from './mockData';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'teacher' | 'student';
  department?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      // Try to call the backend API
      const response = await api.post<AuthResponse>('/auth/login', credentials);
      return response.data;
    } catch (error) {
      // Fallback to mock data if backend is unavailable
      const user = mockUsers.find(
        (u) => u.email === credentials.email && u.password === credentials.password
      );

      if (user) {
        const { password, ...userWithoutPassword } = user;
        return {
          user: {
            id: userWithoutPassword.id,
            name: userWithoutPassword.name,
            email: userWithoutPassword.email,
            role: userWithoutPassword.role as 'admin' | 'teacher' | 'student',
            department: userWithoutPassword.department,
          },
          token: 'mock-token-' + user.id,
        };
      }

      throw new Error('Invalid email or password');
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: (): User | null => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  },

  saveAuthData: (user: User, token: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  },
};
