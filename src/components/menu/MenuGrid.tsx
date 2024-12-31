import React from 'react';
import { MenuItem as MenuItemType } from '../../types';
import { MenuItem } from './MenuItem';
import { Typography } from '@mui/material';

interface MenuGridProps {
  items: MenuItemType[];
  onSelectItem: (item: MenuItemType) => void;
}

export const MenuGrid: React.FC<MenuGridProps> = ({ items, onSelectItem }) => {
  const categories = {
    main: 'Main Dishes',
    appetizer: 'Appetizers',
    dessert: 'Desserts & Snacks',
    beverage: 'Beverages'
  };

  const itemsByCategory = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItemType[]>);

  return (
    <div className="space-y-8">
      {Object.entries(categories).map(([category, title]) => (
        itemsByCategory[category]?.length > 0 && (
          <div key={category}>
            <Typography variant="h6" className="mb-4">{title}</Typography>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {itemsByCategory[category].map((item) => (
                <MenuItem key={item.id} item={item} onSelect={onSelectItem} />
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  );
};