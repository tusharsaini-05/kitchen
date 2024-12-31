-- Create Order Taker user
INSERT INTO auth.users (email, password, raw_user_meta_data)
VALUES (
    'ordertaker@nexusoverall.com',
    crypt('OrderTaker@123', gen_salt('bf')),
    '{"role": "order_taker", "name": "Order Taker"}'::jsonb
) ON CONFLICT (email) DO NOTHING;

-- Create Order Receiver user
INSERT INTO auth.users (email, password, raw_user_meta_data)
VALUES (
    'receiver@nexusoverall.com',
    crypt('Receiver@123', gen_salt('bf')),
    '{"role": "order_receiver", "name": "Order Receiver"}'::jsonb
) ON CONFLICT (email) DO NOTHING;