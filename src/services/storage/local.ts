import { Order, MenuItem, User } from '../../types';
import { StorageError } from './errors';
import { StorageProvider } from './types';
import { defaultMenuItems } from '../../utils/defaultData';

class LocalStorage implements StorageProvider {
  private getItem<T>(key: string): T[] {
    try {
      const data = localStorage.getItem(key);
      if (!data) {
        if (key === 'menuItems') {
          this.setItem(key, defaultMenuItems);
          return defaultMenuItems as unknown as T[];
        }
        return [];
      }
      return JSON.parse(data);
    } catch (error) {
      throw new StorageError('Failed to read from localStorage', error);
    }
  }

  private setItem(key: string, value: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      throw new StorageError('Failed to write to localStorage', error);
    }
  }

  users = {
    authenticate: async (email: string, password: string) => {
      const users = this.getItem<User & { password: string }>('users');
      const user = users.find(u => u.email === email && u.password === password);
      if (!user) {
        return { data: null, error: new StorageError('Invalid credentials') };
      }
      const { password: _, ...userWithoutPassword } = user;
      return { data: { user: userWithoutPassword }, error: null };
    },

    create: async (userData: any) => {
      const users = this.getItem<User>('users');
      users.push(userData);
      this.setItem('users', users);
      return { error: null };
    }
  };

  orders = {
    getOrders: async (startDate: Date, endDate: Date): Promise<Order[]> => {
      const orders = this.getItem<Order>('orders');
      return orders.filter(order => {
        const orderDate = new Date(order.timestamp);
        return orderDate >= startDate && orderDate <= endDate;
      });
    },

    saveOrder: async (order: Order): Promise<void> => {
      const orders = this.getItem<Order>('orders');
      orders.push(order);
      this.setItem('orders', orders);
    },

    getPendingOrders: async (): Promise<Order[]> => {
      const orders = this.getItem<Order>('orders');
      return orders.filter(order => order.status === 'pending');
    },

    updateOrderStatus: async (orderId: string, status: 'pending' | 'completed'): Promise<void> => {
      const orders = this.getItem<Order>('orders');
      const updatedOrders = orders.map(order =>
        order.id === orderId ? { ...order, status } : order
      );
      this.setItem('orders', updatedOrders);
    }
  };

  menu = {
    getItems: async (): Promise<MenuItem[]> => {
      return this.getItem<MenuItem>('menuItems');
    },

    saveItem: async (item: MenuItem): Promise<void> => {
      const items = this.getItem<MenuItem>('menuItems');
      const existingIndex = items.findIndex(i => i.id === item.id);
      
      if (existingIndex >= 0) {
        items[existingIndex] = item;
      } else {
        items.push(item);
      }
      
      this.setItem('menuItems', items);
    },

    deleteItem: async (id: number): Promise<void> => {
      const items = this.getItem<MenuItem>('menuItems');
      const updatedItems = items.filter(item => item.id !== id);
      this.setItem('menuItems', updatedItems);
    }
  };
}

export const localStorage = new LocalStorage();