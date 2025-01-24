import { useState, useEffect } from 'react';
import { Order } from '../types';
import { orderService } from '../services/order/orderService';
import { HotelProps } from '../types';
import { hotelAtomName } from '../atoms/atom';
import { useRecoilValue } from 'recoil';

export const usePendingOrders = (atomValue:string) => {
  //console.log(atomValue)
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPendingOrders = async () => {
    try {
      setLoading(true);
      const pendingOrders = await orderService.getPendingOrders(atomValue);
      setOrders(pendingOrders);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to load pending orders');
      console.error('Error loading pending orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPendingOrders();
    // Poll for new orders every 30 seconds
    const interval = setInterval(loadPendingOrders, 30000);
    return () => clearInterval(interval);
  }, []);

  const markAsCompleted = async (orderId: string) => {
    try {
      await orderService.updateOrderStatus(orderId, 'completed');
      await loadPendingOrders(); // Refresh the orders list
    } catch (err: any) {
      setError(err.message || 'Failed to update order status');
      console.error('Error updating order status:', err);
    }
  };

  return {
    orders,
    loading,
    error,
    markAsCompleted,
    refreshOrders: loadPendingOrders
  };
};