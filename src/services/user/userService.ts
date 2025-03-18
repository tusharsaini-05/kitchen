import { User } from '../../types';
import { supabase } from '../../config/supabase';

class UserService {
  async getUsers(): Promise<User[]> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });
        console.log(data)

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
      

      // The trigger will automatically create the user profile
    } catch (error: any) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async deleteUser(userId: string): Promise<void> {
    try {
      // Delete all related orders first
      const { error: orderDeleteError } = await supabase
        .from("orders")
        .delete()
        .eq("user_id", userId);
  
      if (orderDeleteError) throw orderDeleteError;
  
      // Delete the user from the 'users' table
      const { error: userDeleteError } = await supabase
        .from("users")
        .delete()
        .eq("user_id", userId);
  
      if (userDeleteError) throw userDeleteError;
  
      // Delete the user from Supabase auth
      const { error: authDeleteError } = await supabase.auth.admin.deleteUser(userId);
      
      if (authDeleteError) throw authDeleteError;
  
    } catch (error: any) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }
  

}

export const userService = new UserService();