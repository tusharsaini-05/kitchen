import { User } from '../../types';
import { supabase } from '../../config/supabase';

class UserService {
  async getUsers(): Promise<User[]> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      console.error('Error fetching users:', error);
      throw new Error('Failed to fetch users');
    }
  }

  async createUser(email: string, password: string, role: string, name: string, hotelName: string): Promise<void> {
    try {
      // First create the auth user
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { role, name,hotelName }
      });


      if (authError) throw authError;
      if (!authData.user) throw new Error('Failed to create auth user');
      var id = "";
      const { data, error } = await supabase.auth.admin.listUsers();
      data.users.forEach((value, index) => {
        if(value.email == email){
          id = value.id;
        }
      });
      await supabase
        .from('users')
        .insert({
          name:name,
          user_id:id,
          email:email,
          role:role,
          hotel:hotelName,
          created_at:new Date().toISOString()
        })
      console.log(data);
      

      // The trigger will automatically create the user profile
    } catch (error: any) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async deleteUser(userId: string): Promise<void> {
    try {
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('auth_user_id')
        .eq('id', userId)
        .single();

      if (userError || !user) throw new Error('User not found');

      // Delete auth user (this will cascade to the profile due to foreign key)
      const { error: deleteError } = await supabase.auth.admin.deleteUser(
        user.auth_user_id
      );

      if (deleteError) throw deleteError;
    } catch (error: any) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
}

export const userService = new UserService();