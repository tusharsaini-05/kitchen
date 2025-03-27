import React from 'react';
import { OrderItem } from '../../types';
import { formatCurrency } from '../../utils/date/dateHelpers';

interface OrderListProps {
  items: OrderItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

export const OrderList: React.FC<OrderListProps> = ({
  items,
  onUpdateQuantity,
  onRemove,
}) => (
  <div className="space-y-4">
    {items.map((item) => (
      <div key={item.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
        <div>
          <p className="font-medium">{item.name_en}</p>
          <p className="text-sm text-gray-600">{item.name_th}</p>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value))}
            className="w-16 text-center border rounded p-1"
          />
          <p className="min-w-[80px] text-right">{formatCurrency(item.price * item.quantity)}</p>
          <button
            onClick={() => onRemove(item.id)}
            className="text-red-500 hover:text-red-700 p-1"
          >
            Remove
          </button>
        </div>
      </div>
    ))}
  </div>
);