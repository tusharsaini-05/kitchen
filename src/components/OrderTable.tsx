import React from 'react';
import { Trash2 } from 'lucide-react';
import { OrderItem } from '../types';

interface OrderTableProps {
  items: OrderItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

export const OrderTable: React.FC<OrderTableProps> = ({ items, onUpdateQuantity, onRemove }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Item</th>
            <th className="text-center py-2">Qty</th>
            <th className="text-right py-2">Price</th>
            <th className="text-right py-2">Total</th>
            <th className="w-10"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="py-2">
                <div>
                  <div>{item.name_en}</div>
                  <div className="text-sm text-gray-500">{item.name_th}</div>
                </div>
              </td>
              <td className="text-center">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value))}
                  className="w-16 text-center border rounded"
                />
              </td>
              <td className="text-right">฿{item.price}</td>
              <td className="text-right">฿{item.price * item.quantity}</td>
              <td>
                <button
                  onClick={() => onRemove(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="font-bold">
            <td colSpan={3} className="text-right py-2">Total:</td>
            <td className="text-right py-2">฿{total}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};