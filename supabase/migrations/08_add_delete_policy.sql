-- Add delete policy for orders
CREATE POLICY "Enable delete for admin users" ON public.orders
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );