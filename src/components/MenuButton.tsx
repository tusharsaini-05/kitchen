import React from 'react';
import { MenuItem } from '../types';

interface MenuButtonProps {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
}

export const MenuButton: React.FC<MenuButtonProps> = ({ item, onAdd }) => {
  return (
    <button
      onClick={() => onAdd(item)}
      className="w-32 h-32 bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors"
    >
      <span className="text-sm font-medium text-gray-900">{item.name_en}</span>
      <span className="text-sm font-medium text-gray-900 mt-1">{item.name_th}</span>
      <span className="text-sm text-gray-500 mt-2">฿{item.price}</span>
    </button>
  );
};