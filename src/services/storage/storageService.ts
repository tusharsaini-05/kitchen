import { getStorage } from '../../config/supabase';
import { Order, MenuItem } from '../../types';
import { StorageProvider } from './types';

class StorageService implements StorageProvider {
  private storage = getStorage();

  users = {
    authenticate: async (email: string, password: string) => {
      return this.storage.users.authenticate(email, password);
    },
    create: async (userData: any) => {
      return this.storage.users.create(userData);
    }
  };

  orders = {
    getOrders: async (startDate: Date, endDate: Date) => {
      return this.storage.orders.getOrders(startDate, endDate);
    },
    saveOrder: async (order: Order) => {
      return this.storage.orders.saveOrder(order);
    },
    getPendingOrders: async () => {
      return this.storage.orders.getPendingOrders();
    },
    updateOrderStatus: async (orderId: string, status: 'pending' | 'completed') => {
      return this.storage.orders.updateOrderStatus(orderId, status);
    }
  };

  menu = {
    getItems: async () => {
      return this.storage.menu.getItems();
    },
    saveItem: async (item: MenuItem) => {
      return this.storage.menu.saveItem(item);
    },
    deleteItem: async (id: number) => {
      return this.storage.menu.deleteItem(id);
    }
  };
}

export const storageService = new StorageService();