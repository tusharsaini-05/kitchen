import { useState, useEffect } from 'react';
import { Order } from '../types';
import { storage } from '../config/storage';
import { getMonthRange } from '../utils/date/dateHelpers';

export const useOrders = (initialDate: Date = new Date()) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(initialDate);

  const loadOrders = async (date: Date = selectedDate) => {
    try {
      setLoading(true);
      const { start, end } = getMonthRange(date);
      const fetchedOrders = await storage.orders.getOrders(start, end);
      setOrders(fetchedOrders);
      setError(null);
    } catch (err) {
      setError('Failed to load orders');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders(selectedDate);
  }, [selectedDate]);

  const addOrder = async (order: Order) => {
    try {
      await storage.orders.saveOrder(order);
      await loadOrders();
    } catch (err) {
      setError('Failed to add order');
      console.error(err);
    }
  };

  const updateOrderStatus = async (orderId: string, status: 'pending' | 'completed') => {
    try {
      await storage.orders.updateOrderStatus(orderId, status);
      await loadOrders();
    } catch (err) {
      setError('Failed to update order status');
      console.error(err);
    }
  };

  return {
    orders,
    loading,
    error,
    selectedDate,
    setSelectedDate,
    addOrder,
    updateOrderStatus,
    refreshOrders: loadOrders
  };
};