import { Order } from '../../types';
import { supabase } from '../../config/supabase';

class OrderService {
  async submitOrder(order: Order): Promise<void> {
    try {
      const { data: { user }, error: sessionError } = await supabase.auth.getUser();
      if (sessionError) throw new Error('Authentication error');
      if (!user) throw new Error('No active session');

      const { data: userProfile, error: userError } = await supabase
        .from('users')
        .select('id')
        .eq('email', user.email)
        .single();

      if (userError || !userProfile) {
        throw new Error('User profile not found');
      }

      const { error: orderError } = await supabase
        .from('orders')
        .insert({
          id: order.id,
          items: order.items,
          total: order.total,
          status: 'pending',
          user_id: order.userId,
          timestamp: new Date().toISOString()
        });

      if (orderError) throw orderError;
    } catch (error: any) {
      console.error('Error submitting order:', error);
      throw error;
    }
  }

  async getPendingOrders(): Promise<Order[]> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*, users(name)')
        .eq('status', 'pending')
        .order('timestamp', { ascending: true });
        
        
      if (error) throw error;

      return (data || []).map(order => ({
        ...order,
        userId: order.user_id,
        userName: order.users?.name
      }));
    } catch (error: any) {
      console.error('Error fetching pending orders:', error);
      throw error;
    }
  }

  async updateOrderStatus(orderId: string, status: 'pending' | 'completed'): Promise<void> {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId);

      if (error) throw error;
    } catch (error: any) {
      console.error('Error updating order status:', error);
      throw error;
    }
  }

  async deleteOrder(orderId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', orderId);

      if (error) throw error;
    } catch (error: any) {
      console.error('Error deleting order:', error);
      throw error;
    }
  }

  async getOrders(startDate: Date, endDate: Date): Promise<Order[]> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*, users(name)')
        .gte('timestamp', startDate.toISOString())
        .lte('timestamp', endDate.toISOString())
        .order('timestamp', { ascending: false });

      if (error) throw error;

      return (data || []).map(order => ({
        ...order,
        userId: order.user_id,
        userName: order.users?.name
      }));
    } catch (error: any) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  }
}

export const orderService = new OrderService();