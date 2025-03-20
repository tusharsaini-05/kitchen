import { MenuItem } from '../../types';
import { storageService } from '../storage';

class MenuService {
  async getMenuItems(): Promise<MenuItem[]> {
    return storageService.menu.getItems();
  }

  async addMenuItem(item: MenuItem): Promise<void> {
    return storageService.menu.saveItem(item);
  }

  async updateMenuItem(item: MenuItem): Promise<void> {
    return storageService.menu.saveItem(item);
  }

  async deleteMenuItem(id: number): Promise<void> {
    return storageService.menu.deleteItem(id);
  }
}

export const menuService = new MenuService();