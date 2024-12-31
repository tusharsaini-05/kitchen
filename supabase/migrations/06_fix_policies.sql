-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY IF EXISTS "Public can view users" ON public.users;
DROP POLICY IF EXISTS "Admins can manage all users" ON public.users;
DROP POLICY IF EXISTS "Anyone can view orders" ON public.orders;
DROP POLICY IF EXISTS "Order takers can create orders" ON public.orders;
DROP POLICY IF EXISTS "Order receivers can update orders" ON public.orders;

-- Create updated policies
CREATE POLICY "Public read access" ON public.users
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage users" ON public.users
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.uid() = id AND (raw_user_meta_data->>'role')::text = 'admin'
        )
    );

CREATE POLICY "Users can view orders" ON public.orders
    FOR SELECT USING (true);

CREATE POLICY "Users can create orders" ON public.orders
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.uid() = id AND (raw_user_meta_data->>'role')::text IN ('admin', 'order_taker')
        )
    );

CREATE POLICY "Users can update orders" ON public.orders
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.uid() = id AND (raw_user_meta_data->>'role')::text IN ('admin', 'order_receiver')
        )
    );