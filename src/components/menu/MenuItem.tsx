import React from 'react';
import { MenuItem as MenuItemType } from '../../types';
import { formatCurrency } from '../../utils/date/dateHelpers';

interface MenuItemProps {
  item: MenuItemType;
  onSelect: (item: MenuItemType) => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({ item, onSelect }) => (
  <div
    onClick={() => onSelect(item)}
    className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-md transition-shadow"
  >
    <h3 className="font-medium">{item.name_en}</h3>
    <p className="text-sm text-gray-600">{item.name_th}</p>
    <p className="mt-2 text-blue-600 font-semibold">{formatCurrency(item.price)}</p>
  </div>
);