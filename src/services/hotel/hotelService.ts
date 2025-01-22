import { supabase } from '../../config/supabase';
import {Hotel} from '../../types';

class HotelService {
  
  async submitHotel(hotel: Hotel): Promise<void> {
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

      const { error: hotelError } = await supabase
        .from('hotels')
        .insert({
          id: hotel.id,
          name: hotel.hotel_name,
          created_at: new Date().toISOString()
        });

      if (hotelError) throw hotelError;
    } catch (error: any) {
      console.error('Error submitting order:', error);
      throw error;
    }
  }

  async deleteHotel(id: string): Promise<void> {
    try {
        console.log(id)
      const { error } = await supabase
        .from('hotels')
        .delete()
        .eq('id', id);

        console.log(error)

      if (error) throw error;
    } catch (error: any) {
      console.error('Error deleting order:', error);
      throw error;
    }
  }

  async getHotels(): Promise<Hotel[]> {
    try {
      const { data, error } = await supabase
        .from('hotels')
        .select('*');

      if (error) throw error;

      return (data || []).map(hotel => ({
        ...hotel,
        hotel_name:hotel.name,
        createdAt:hotel.created_at
      }));
    } catch (error: any) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  }
}

export const hotelService = new HotelService();