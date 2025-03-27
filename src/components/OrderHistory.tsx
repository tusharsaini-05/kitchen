import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Order } from '../types';
import { storageService } from '../services/storage';

export const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  useEffect(() => {
    fetchOrders();
  }, [selectedMonth]);

  const fetchOrders = async () => {
    const startOfMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1);
    const endOfMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0);

    try {
      const data = await storageService.orders.getOrders(startOfMonth, endOfMonth);
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const downloadOrders = () => {
    const csv = [
      ['Order ID', 'Date', 'Items', 'Total'],
      ...orders.map(order => [
        order.id,
        format(new Date(order.timestamp), 'yyyy-MM-dd HH:mm:ss'),
        order.items.map(item => `${item.name_en} x${item.quantity}`).join(', '),
        order.total
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders-${format(selectedMonth, 'yyyy-MM')}.csv`;
    a.click();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Order History</h2>
        <div className="flex gap-4">
          <input
            type="month"
            value={format(selectedMonth, 'yyyy-MM')}
            onChange={(e) => setSelectedMonth(new Date(e.target.value))}
            className="border rounded px-2 py-1"
          />
          <button
            onClick={downloadOrders}
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
          >
            Download CSV
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Order ID</th>
              <th className="text-left py-2">Date</th>
              <th className="text-left py-2">Items</th>
              <th className="text-right py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="py-2">{order.id}</td>
                <td>{format(new Date(order.timestamp), 'yyyy-MM-dd HH:mm:ss')}</td>
                <td>{order.items.map(item => `${item.name_en} x${item.quantity}`).join(', ')}</td>
                <td className="text-right">${order.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};