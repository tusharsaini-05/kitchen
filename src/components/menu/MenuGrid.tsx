// import React from 'react';
// import { MenuItem as MenuItemType } from '../../types';
// import { MenuItem } from './MenuItem';
// import { Typography } from '@mui/material';

// interface MenuGridProps {
//   items: MenuItemType[];
//   onSelectItem: (item: MenuItemType) => void;
// }

// export const MenuGrid: React.FC<MenuGridProps> = ({ items, onSelectItem }) => {
//   const categories = {
//     main: 'Main Dishes',
//     appetizer: 'Appetizers',
//     dessert: 'Desserts & Snacks',
//     beverage: 'Beverages'
//   };

//   const itemsByCategory = items.reduce((acc, item) => {
//     if (!acc[item.category]) {
//       acc[item.category] = [];
//     }
//     acc[item.category].push(item);
//     return acc;
//   }, {} as Record<string, MenuItemType[]>);

//   return (
//     <div className="space-y-8">
//       {Object.entries(categories).map(([category, title]) => (
//         itemsByCategory[category]?.length > 0 && (
//           <div key={category}>
//             <Typography variant="h6" className="mb-4">{title}</Typography>
//             <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
//               {itemsByCategory[category].map((item) => (
//                 <MenuItem key={item.id} item={item} onSelect={onSelectItem} />
//               ))}
//             </div>
//           </div>
//         )
//       ))}
//     </div>
//   );
// };

import React, { useEffect, useState } from 'react';
import { MenuItem as MenuItemType } from '../../types';
import { MenuItem } from './MenuItem';
import { Typography, useTheme } from '@mui/material';
import { supabaseStorage } from '../../services/storage/supabase';
import { Category } from '@mui/icons-material';
interface MenuGridProps {
  items: MenuItemType[];
  onSelectItem: (item: MenuItemType) => void;
}
interface Categories {
  [key: string]: string; // Dynamic keys with string values
}

export const MenuGrid: React.FC<MenuGridProps> = ({ items, onSelectItem }) => {

  var categories:Categories = {
    
  };


  const theme = useTheme(); // Get the theme for dynamic styling
  const textColor = theme.palette.mode === 'dark' ? '#ffffff' : '#000000';

  items.forEach((item) =>{
    if(!(item.category in categories)){
      categories[item.category] = item.category;
    }
  })
  const itemsByCategory = items.reduce((acc, item) => {
    
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItemType[]>);

  return (
    <div className="space-y-8">
      {Object.entries(categories).map(
        ([category, title]) =>
          itemsByCategory[category]?.length > 0 && (
            <div key={category}>
              <Typography
                variant="h6"
                className="mb-4"
                style={{ color: textColor }} // Dynamic text color
              >
                {title}
              </Typography>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {itemsByCategory[category].map((item) => (
                  <MenuItem key={item.id} item={item} onSelect={onSelectItem} />
                ))}
              </div>
            </div>
          )
      )}
    </div>
  );
};
