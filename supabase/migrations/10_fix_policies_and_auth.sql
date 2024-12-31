-- Drop existing policies
DROP POLICY IF EXISTS "Users can view all profiles" ON public.users;
DROP POLICY IF EXISTS "Only admins can manage users" ON public.users;

-- Create updated policies
CREATE POLICY "Enable read access for authenticated users" ON public.users
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable admin management" ON public.users
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.uid() = id 
            AND (raw_user_meta_data->>'role')::text = 'admin'
        )
    );

-- Update orders policies
DROP POLICY IF EXISTS "Users can view orders" ON public.orders;
DROP POLICY IF EXISTS "Users can create orders" ON public.orders;
DROP POLICY IF EXISTS "Users can update orders" ON public.orders;

CREATE POLICY "Enable order read for authenticated" ON public.orders
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable order creation for order takers" ON public.orders
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.uid() = id 
            AND (raw_user_meta_data->>'role')::text IN ('admin', 'order_taker')
        )
    );

CREATE POLICY "Enable order updates for receivers" ON public.orders
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.uid() = id 
            AND (raw_user_meta_data->>'role')::text IN ('admin', 'order_receiver')
        )
    );

-- Create initial admin user if not exists
INSERT INTO auth.users (email, password, raw_user_meta_data)
VALUES (
    'admin@nexusoverall.com',
    crypt('Admin@123', gen_salt('bf')),
    '{"role": "admin", "name": "Admin User"}'::jsonb
) ON CONFLICT (email) DO NOTHING;