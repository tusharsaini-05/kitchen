export interface MenuItem {
  id: number;
  nameEn: string;
  nameTh: string;
  price: number;
  category: string;
}

export interface OrderItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  timestamp: string;
  status: 'pending' | 'completed';
  userId: string;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'order_taker' | 'order_receiver';
  name: string;
  created_at: string;
}

export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  ordersByCategory: { category: string; count: number }[];
  revenueByDay: { date: string; revenue: number }[];
}