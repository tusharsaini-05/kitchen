import { StorageProvider } from '../types/storage';
import { defaultUsers, defaultMenuItems } from '../utils/defaultData';
import { LocalStorageHelper } from '../utils/storage/localStorageHelper';

class LocalStorageProvider implements StorageProvider {
  constructor() {
    this.initializeStorage();
  }

  private initializeStorage() {
    if (!LocalStorageHelper.getItem('initialized')) {
      LocalStorageHelper.setItem('menuItems', defaultMenuItems);
      LocalStorageHelper.setItem('users', defaultUsers);
      LocalStorageHelper.setItem('orders', []);
      LocalStorageHelper.setItem('initialized', true);
    }
  }

  users = {
    authenticate: async (email: string, password: string) => {
      const users = LocalStorageHelper.getItem('users') || [];
      const user = users.find((u: any) => u.email === email && u.password === password);
      
      if (!user) {
        return { data: null, error: new Error('Invalid credentials') };
      }

      const { password: _, ...userWithoutPassword } = user;
      return { data: { user: userWithoutPassword }, error: null };
    },

    create: async (userData: any) => {
      try {
        const users = LocalStorageHelper.getItem('users') || [];
        users.push(userData);
        LocalStorageHelper.setItem('users', users);
        return { error: null };
      } catch (error) {
        return { error };
      }
    }
  };

  menu = {
    getItems: async () => {
      return LocalStorageHelper.getItem('menuItems') || [];
    },

    saveItem: async (item: any) => {
      const items = await this.menu.getItems();
      const index = items.findIndex((i: any) => i.id === item.id);
      
      if (index >= 0) {
        items[index] = item;
      } else {
        items.push(item);
      }
      
      LocalStorageHelper.setItem('menuItems', items);
    },

    deleteItem: async (id: number) => {
      const items = await this.menu.getItems();
      const filtered = items.filter((item: any) => item.id !== id);
      LocalStorageHelper.setItem('menuItems', filtered);
    }
  };

  orders = {
    getOrders: async (startDate: Date, endDate: Date) => {
      const orders = LocalStorageHelper.getItem('orders') || [];
      return orders.filter((order: any) => {
        const orderDate = new Date(order.timestamp);
        return orderDate >= startDate && orderDate <= endDate;
      });
    },

    saveOrder: async (order: any) => {
      const orders = LocalStorageHelper.getItem('orders') || [];
      orders.push(order);
      LocalStorageHelper.setItem('orders', orders);
    },

    getPendingOrders: async () => {
      const orders = LocalStorageHelper.getItem('orders') || [];
      return orders.filter((order: any) => order.status === 'pending');
    },

    updateOrderStatus: async (orderId: string, status: 'pending' | 'completed') => {
      const orders = LocalStorageHelper.getItem('orders') || [];
      const updated = orders.map((order: any) =>
        order.id === orderId ? { ...order, status } : order
      );
      LocalStorageHelper.setItem('orders', updated);
    }
  };
}

export const storage = new LocalStorageProvider();