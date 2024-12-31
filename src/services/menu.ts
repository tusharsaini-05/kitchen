import { MenuItem } from '../types';
import { storage } from '../config/storage';

class MenuService {
  async getMenuItems(): Promise<MenuItem[]> {
    return storage.menu.getItems();
  }

  async addMenuItem(item: MenuItem): Promise<void> {
    return storage.menu.saveItem(item);
  }

  async updateMenuItem(item: MenuItem): Promise<void> {
    return storage.menu.saveItem(item);
  }

  async deleteMenuItem(id: number): Promise<void> {
    return storage.menu.deleteItem(id);
  }
}

export const menuService = new MenuService();