export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          role: 'admin' | 'order_taker' | 'order_receiver';
          name: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          role: 'admin' | 'order_taker' | 'order_receiver';
          name: string;
          created_at?: string;
        };
        Update: {
          email?: string;
          role?: 'admin' | 'order_taker' | 'order_receiver';
          name?: string;
        };
      };
      menu_items: {
        Row: {
          id: number;
          nameEn: string;
          nameTh: string;
          price: number;
          category: string;
          created_at: string;
        };
        Insert: {
          nameEn: string;
          nameTh: string;
          price: number;
          category: string;
          created_at?: string;
        };
        Update: {
          nameEn?: string;
          nameTh?: string;
          price?: number;
          category?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          items: {
            id: number;
            nameEn: string;
            nameTh: string;
            price: number;
            quantity: number;
            category: string;
          }[];
          total: number;
          status: 'pending' | 'completed';
          timestamp: string;
          user_id: string; // Changed from userId to user_id
        };
        Insert: {
          items: {
            id: number;
            nameEn: string;
            nameTh: string;
            price: number;
            quantity: number;
            category: string;
          }[];
          total: number;
          status?: 'pending' | 'completed';
          timestamp?: string;
          user_id: string; // Changed from userId to user_id
        };
        Update: {
          status?: 'pending' | 'completed';
        };
      };
    };
  };
}