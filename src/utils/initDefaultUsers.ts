import { authService } from '../services/auth';

const defaultUsers = [
  {
    email: 'admin@nexusoverall.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin' as const,
  },
  {
    email: 'ordertaker@nexusoverall.com',
    password: 'order123',
    name: 'Order Taker',
    role: 'order_taker' as const,
  },
  {
    email: 'receiver@nexusoverall.com',
    password: 'receive123',
    name: 'Order Receiver',
    role: 'order_receiver' as const,
  },
];

let initialized = false;

export const initDefaultUsers = async () => {
  if (initialized) return;
  initialized = true;

  for (const user of defaultUsers) {
    try {
      await authService.createUser(
        user.email,
        user.password,
        user.role,
        user.name
      );
    } catch (error: any) {
      // Silently handle user already exists error
      if (error?.message?.includes('already exists')) {
        continue;
      }
      console.error(`Error creating user ${user.email}:`, error);
    }
  }
};