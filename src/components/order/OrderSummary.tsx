import React from 'react';
import { OrderItem } from '../../types';
import { formatCurrency } from '../../utils/date/dateHelpers';

interface OrderSummaryProps {
  items: OrderItem[];
  onSubmit: () => void;
  submitting?: boolean;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ 
  items, 
  onSubmit, 
  submitting = false 
}) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      <div className="space-y-2 mb-4">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between">
            <span>{item.name_en} x{item.quantity}</span>
            <span>{formatCurrency(item.price * item.quantity)}</span>
          </div>
        ))}
      </div>
      <div className="border-t pt-4">
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>
      <button
        onClick={onSubmit}
        disabled={items.length === 0 || submitting}
        className={`w-full mt-4 py-2 rounded text-white transition-colors ${
          items.length === 0 || submitting
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {submitting ? 'Submitting...' : 'Submit Order'}
      </button>
    </div>
  );
};