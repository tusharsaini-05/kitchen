import { useState, useEffect } from 'react';
import { MenuItem } from '../types';
import { supabaseStorage } from '../services/storage/supabase';
export interface MenuIte {
  id: number;
  nameEn: string;
  nameTh: string;
  price: number;
  category: string;
}
export const useMenu = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMenuItems = async () => {
    try {
      setLoading(true);
      const menuItems = await supabaseStorage.menu.getItems();
      setItems(menuItems);
      setError(null);
    } catch (err) {
      setError('Failed to load menu items');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMenuItems();
  }, []);

  const addMenuItem = async (item: MenuItem) => {
    try {
      await supabaseStorage.menu.saveItem(item);
      await loadMenuItems();
    } catch (err) {
      setError('Failed to add menu item');
      console.error(err);
    }
  };

  const deleteMenuItem = async (id: number) => {
    try {
      await supabaseStorage.menu.deleteItem(id);
      await loadMenuItems();
    } catch (err) {
      setError('Failed to delete menu item');
      console.error(err);
    }
  };

  return {
    items,
    loading,
    error,
    addMenuItem,
    deleteMenuItem,
    refreshMenu: loadMenuItems
  };
};