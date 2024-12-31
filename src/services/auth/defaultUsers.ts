import { User } from '../../types';

// In your main application file (e.g., main.tsx or App.tsx)
import { initDefaultUsers } from '../';

// Call this function in your main component or entry point
initDefaultUsers();

export interface UserWithPassword extends User {
  password: string;
}

export const defaultUsers: UserWithPassword[] = [
  {
    id: '1',
    email: 'admin@nexusoverall.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    email: 'ordertaker@nexusoverall.com',
    password: 'order123',
    name: 'Order Taker',
    role: 'order_taker',
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    email: 'receiver@nexusoverall.com',
    password: 'receive123',
    name: 'Order Receiver',
    role: 'order_receiver',
    created_at: new Date().toISOString()
  }
];