import { DashboardStats } from '../../types';
import { supabase } from '../../config/supabase';

class StatsService {
  async getStats(startDate: Date, endDate: Date): Promise<DashboardStats> {
    try {
      // Get orders for the period
      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .gte('timestamp', startDate.toISOString())
        .lte('timestamp', endDate.toISOString());

      if (ordersError) throw ordersError;

      const totalOrders = orders?.length || 0;
      const totalRevenue = orders?.reduce((sum, order) => sum + Number(order.total), 0) || 0;
      const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

      // Calculate orders by category
      const categoryCount: Record<string, number> = {};
      orders?.forEach(order => {
        (order.items as any[]).forEach(item => {
          categoryCount[item.category] = (categoryCount[item.category] || 0) + item.quantity;
        });
      });

      // Calculate daily revenue
      const dailyRevenue: Record<string, number> = {};
      orders?.forEach(order => {
        const date = order.timestamp.split('T')[0];
        dailyRevenue[date] = (dailyRevenue[date] || 0) + Number(order.total);
      });

      return {
        totalOrders,
        totalRevenue,
        averageOrderValue,
        ordersByCategory: Object.entries(categoryCount).map(([category, count]) => ({
          category,
          count,
        })),
        revenueByDay: Object.entries(dailyRevenue).map(([date, revenue]) => ({
          date,
          revenue,
        })),
      };
    } catch (error) {
      console.error('Error fetching stats:', error);
      throw new Error('Failed to fetch dashboard statistics');
    }
  }
}

export const statsService = new StatsService();