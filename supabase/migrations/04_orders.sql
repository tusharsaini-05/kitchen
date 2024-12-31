-- Create orders table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    items JSONB NOT NULL,
    total DECIMAL(10,2) NOT NULL CHECK (total >= 0),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed')),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    user_id UUID NOT NULL REFERENCES public.users(id)
);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view orders" ON public.orders
    FOR SELECT USING (true);

CREATE POLICY "Order takers can create orders" ON public.orders
    FOR INSERT WITH CHECK (EXISTS (
        SELECT 1 FROM public.users 
        WHERE auth_id = auth.uid() AND role IN ('admin', 'order_taker')
    ));

CREATE POLICY "Order receivers can update orders" ON public.orders
    FOR UPDATE USING (EXISTS (
        SELECT 1 FROM public.users 
        WHERE auth_id = auth.uid() AND role IN ('admin', 'order_receiver')
    ));