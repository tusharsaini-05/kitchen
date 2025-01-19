-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL CONSTRAINT users_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('admin', 'order_taker', 'order_receiver')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    user_id UUID UNIQUE NOT NULL
);

-- Create menu_items table
CREATE TABLE IF NOT EXISTS public.menu_items (
    id SERIAL PRIMARY KEY,
    name_en TEXT NOT NULL,
    name_th TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    category TEXT NOT NULL CHECK (category IN ('main', 'appetizer', 'dessert', 'beverage')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create orders table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    items JSONB NOT NULL,
    total DECIMAL(10,2) NOT NULL CHECK (total >= 0),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed')),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    user_id UUID NOT NULL REFERENCES public.users(user_id)
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users Table Policies
CREATE POLICY "Users can view their own profile" ON public.users
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all users" ON public.users
    FOR ALL USING (auth.role() = 'admin');

-- Menu Items Table Policies
CREATE POLICY "Anyone can view menu items" ON public.menu_items
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage menu items" ON public.menu_items
    FOR ALL USING (EXISTS (
        SELECT 1 FROM public.users WHERE user_id = auth.uid() AND role = 'admin'
    ));

-- Orders policies
CREATE POLICY "Users can view their own orders" ON public.orders
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Order takers can create orders" ON public.orders
    FOR INSERT WITH CHECK (EXISTS (
        SELECT 1 FROM public.users 
        WHERE user_id = auth.uid() AND role IN ('admin', 'order_taker')
    ));
CREATE POLICY "Order receivers can update order status" ON public.orders
    FOR UPDATE USING (EXISTS (
        SELECT 1 FROM public.users 
        WHERE user_id = auth.uid() AND role IN ('admin', 'order_receiver')
    ));

-- Insert default menu items
INSERT INTO public.menu_items (name_en, name_th, price, category) VALUES
    ('Pad Thai', 'ผัดไทย', 80.00, 'main'),
    ('Green Curry', 'แกงเขียวหวาน', 100.00, 'main'),
    ('Som Tam', 'ส้มตำ', 60.00, 'appetizer'),
    ('Mango Sticky Rice', 'ข้าวเหนียวมะม่วง', 80.00, 'dessert'),
    ('Thai Iced Tea', 'ชาเย็น', 40.00, 'beverage');

