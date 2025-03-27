import { MenuItem } from '../../types';
import { supabaseStorage } from '../storage/supabase';

class MenuService {
  async getMenuItems(): Promise<MenuItem[]> {
    return supabaseStorage.menu.getItems();
  }

  async addMenuItem(item: MenuItem): Promise<void> {
    return supabaseStorage.menu.saveItem(item);
  }

  async updateMenuItem(item: MenuItem): Promise<void> {
    return supabaseStorage.menu.saveItem(item);
  }

  async deleteMenuItem(id: number): Promise<void> {
    return supabaseStorage.menu.deleteItem(id);
  }
}

export const menuService = new MenuService();