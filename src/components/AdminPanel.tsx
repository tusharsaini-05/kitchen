import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { MenuItem } from '../types';
import { menuService } from '../services/menu';

export const AdminPanel: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    nameEn: '',
    nameTh: '',
    price: 0,
    category: 'main'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.nameEn || !newItem.nameTh || !newItem.price) return;

    await menuService.addMenuItem({
      ...newItem,
      id: Date.now(),
      nameEn: newItem.nameEn,
      nameTh: newItem.nameTh,
      price: Number(newItem.price),
      category: newItem.category || 'main'
    } as MenuItem);

    setNewItem({
      nameEn: '',
      nameTh: '',
      price: 0,
      category: 'main'
    });
    setShowForm(false);
    window.location.reload();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Menu Management</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center gap-2"
        >
          <PlusCircle size={20} />
          Add New Item
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name (English)
              </label>
              <input
                type="text"
                value={newItem.nameEn}
                onChange={(e) => setNewItem({ ...newItem, nameEn: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name (Thai)
              </label>
              <input
                type="text"
                value={newItem.nameTh}
                onChange={(e) => setNewItem({ ...newItem, nameTh: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price (THB)
              </label>
              <input
                type="number"
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                min="0"
                step="1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="main">Main Dishes</option>
                <option value="appetizer">Appetizers</option>
                <option value="dessert">Desserts</option>
                <option value="beverage">Beverages</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save Item
            </button>
          </div>
        </form>
      )}
    </div>
  );
};