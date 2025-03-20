import { Category } from '@mui/icons-material';
import { supabase } from '../../config/supabase';
import { Order, MenuItem } from '../../types';
import { StorageError } from './errors';
import { StorageProvider } from './types';

class SupabaseStorage implements StorageProvider {
  users = {
    authenticate: async (email: string, password: string) => {
      if (!supabase) {
        throw new StorageError('Supabase client not initialized');
      }
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });
      
      if (authError) throw authError;
      
      // Get user profile data
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authData.user.id)
        .single();
        
      if (profileError) throw profileError;
      
      return { data: { user: profile }, error: null };
    },

    create: async (userData: any) => {
      if (!supabase) {
        throw new StorageError('Supabase client not initialized');
      }
      
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
      });
      
      if (authError) throw authError;
      
      // Create user profile
      const { error: profileError } = await supabase.from('users').insert({
        id: authData.user?.id,
        email: userData.email,
        name: userData.name,
        role: userData.role,
        created_at: new Date().toISOString()
      });
      
      if (profileError) throw profileError;
      
      return { error: null };
    }
  };

  orders = {
    getOrders: async (startDate: Date, endDate: Date): Promise<Order[]> => {
      if (!supabase) {
        throw new StorageError('Supabase client not initialized');
      }
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .gte('timestamp', startDate.toISOString())
        .lte('timestamp', endDate.toISOString());

      if (error) throw error;
      return data || [];
    },

    saveOrder: async (order: Order): Promise<void> => {
      if (!supabase) {
        throw new StorageError('Supabase client not initialized');
      }
      const { error } = await supabase.from('orders').insert({
        ...order,
        user_id: order.userId // Map to correct column name
      });
      if (error) throw error;
    },

    getPendingOrders: async (): Promise<Order[]> => {
      if (!supabase) {
        throw new StorageError('Supabase client not initialized');
      }
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('status', 'pending')
        .order('timestamp', { ascending: true });

      if (error) throw error;
      return data || [];
    },

    updateOrderStatus: async (orderId: string, status: 'pending' | 'completed'): Promise<void> => {
      if (!supabase) {
        throw new StorageError('Supabase client not initialized');
      }
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId);

      if (error) throw error;
    }
  };

  menu = {
    getItems: async (): Promise<MenuItem[]> => {
      if (!supabase) {
        throw new StorageError('Supabase client not initialized');
      }
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .order('category', { ascending: true });

      if (error) throw error;
      return data || [];
    },

    saveItem: async (item: MenuItem): Promise<void> => {
      if (!supabase) {
        throw new StorageError('Supabase client not initialized');
      }
      const { error } = await supabase.from('menu_items').insert({
          name_en:item.name_en,
          name_th:item.name_th,
          price:item.price,
          category:item.category,
        created_at: new Date().toISOString()
      });
      if (error) throw error;
    },

    deleteItem: async (id: number): Promise<void> => {
      if (!supabase) {
        throw new StorageError('Supabase client not initialized');
      }
      const { error } = await supabase
        .from('menu_items')
        .delete()
        .eq('id', id);

      if (error) throw error;
    }
  };
}

export const supabaseStorage = new SupabaseStorage();