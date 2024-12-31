import React from 'react';
import { OrderItem } from '../types';

interface ReceiptProps {
  items: OrderItem[];
  timestamp: string;
  orderId: string;
}

export const Receipt = React.forwardRef<HTMLDivElement, ReceiptProps>(
  ({ items, timestamp, orderId }, ref) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
      <div ref={ref} className="bg-white p-8 max-w-md mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Kitchen Order Receipt</h1>
          <p className="text-gray-600">Order #{orderId}</p>
          <p className="text-gray-600">{new Date(timestamp).toLocaleString()}</p>
        </div>

        <div className="border-t border-b py-4 my-4">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between py-1">
              <div>
                <span className="font-medium">{item.nameEn}</span>
                <span className="text-gray-600 ml-2">x{item.quantity}</span>
              </div>
              <span>฿{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="text-right text-xl font-bold">
          Total: ฿{total.toFixed(2)}
        </div>

        <div className="text-center mt-8 text-gray-600">
          <p>Thank you for your order!</p>
        </div>
      </div>
    );
  }
);