import { User } from '../../types';
import { supabase } from '../../config/supabase';

class AuthService {
  async signIn(email: string, password: string): Promise<User> {
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('No user data returned');

      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (profileError) throw new Error('User profile not found');
      if (!profile) throw new Error('No profile data returned');

      return {
        id: profile.id,
        email: profile.email,
        name: profile.name,
        role: profile.role,
        created_at: profile.created_at,
        user_id:profile.user_id,
        hotel:profile.hotel
      };
    } catch (error: any) {
      console.error('Sign in error:', error);
      throw new Error(error.message || 'Authentication failed');
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return null;

      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('email', session.user.email)
        .single();

      if (profileError || !profile) return null;

      return {
        id: profile.id,
        email: profile.email,
        name: profile.name,
        role: profile.role,
        created_at: profile.created_at,
        user_id:profile.user_id,
        hotel:profile.hotel
      };
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }

  async signOut(): Promise<void> {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      console.error('Sign out error:', error);
      throw new Error(error.message || 'Failed to sign out');
    }
  }
}

export const authService = new AuthService();