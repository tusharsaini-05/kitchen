import { User, Order, MenuItem } from './index';

export interface StorageProvider {
  users: {
    authenticate: (email: string, password: string) => Promise<{ data: { user: User } | null, error: Error | null }>;
    create: (userData: any) => Promise<{ error: Error | null }>;
  };
  menu: {
    getItems: () => Promise<MenuItem[]>;
    saveItem: (item: MenuItem) => Promise<void>;
    deleteItem: (id: number) => Promise<void>;
  };
  orders: {
    getOrders: (startDate: Date, endDate: Date) => Promise<Order[]>;
    saveOrder: (order: Order) => Promise<void>;
    getPendingOrders: () => Promise<Order[]>;
    updateOrderStatus: (orderId: string, status: 'pending' | 'completed') => Promise<void>;
  };
}