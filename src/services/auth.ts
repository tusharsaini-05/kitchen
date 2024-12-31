import { User } from '../types';
import { storage } from '../config/storage';

class AuthService {
  private currentUser: User | null = null;

  async signIn(email: string, password: string): Promise<User> {
    try {
      const { data, error } = await storage.users.authenticate(email, password);
      
      if (error || !data?.user) {
        throw new Error('Invalid credentials');
      }

      this.currentUser = data.user;
      return data.user;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  }

  async signOut() {
    this.currentUser = null;
  }

  async getCurrentUser(): Promise<User | null> {
    return this.currentUser;
  }
}

export const authService = new AuthService();