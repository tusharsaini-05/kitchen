import { MenuItem, User } from '../types';

export const defaultMenuItems: MenuItem[] = [
  {
    id: 1,
    nameEn: 'Pad Thai',
    nameTh: 'ผัดไทย',
    price: 80,
    category: 'main'
  },
  {
    id: 2,
    nameEn: 'Green Curry',
    nameTh: 'แกงเขียวหวาน',
    price: 100,
    category: 'main'
  },
  {
    id: 3,
    nameEn: 'Som Tam',
    nameTh: 'ส้มตำ',
    price: 60,
    category: 'appetizer'
  },
  {
    id: 4,
    nameEn: 'Mango Sticky Rice',
    nameTh: 'ข้าวเหนียวมะม่วง',
    price: 80,
    category: 'dessert'
  }
];

export const defaultUsers = [
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