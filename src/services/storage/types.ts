import { User, Order, MenuItem } from '../../types';

export interface StorageProvider {
  users: {
    authenticate: (email: string, password: string) => Promise<{ data: { user: User }, error: any }>;
    create: (userData: any) => Promise<{ error: any }>;
  };
  orders: {
    getOrders: (startDate: Date, endDate: Date) => Promise<Order[]>;
    saveOrder: (order: Order) => Promise<void>;
    getPendingOrders: () => Promise<Order[]>;
    updateOrderStatus: (orderId: string, status: 'pending' | 'completed') => Promise<void>;
  };
  menu: {
    getItems: () => Promise<MenuItem[]>;
    saveItem: (item: MenuItem) => Promise<void>;
    deleteItem: (id: number) => Promise<void>;
  };
}