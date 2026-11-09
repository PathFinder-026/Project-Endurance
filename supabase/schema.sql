-- =========================================================================
-- VILLAGE VOICE AI — MASTER DATABASE SCHEMA & MIGRATION (SUPABASE / POSTGRES)
-- Project: cfdtvtrohgtauhjravyl
-- Architecture: Multi-Tenant Zero-Commission Digital Operating System
-- =========================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. DROP EXISTING TABLES (IF RE-RUNNING CLEAN)
DROP TABLE IF EXISTS disputes CASCADE;
DROP TABLE IF EXISTS compliance_logs CASCADE;
DROP TABLE IF EXISTS village_tabs CASCADE;
DROP TABLE IF EXISTS reservations CASCADE;
DROP TABLE IF EXISTS dining_tables CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS modifier_options CASCADE;
DROP TABLE IF EXISTS modifier_groups CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS merchants CASCADE;

-- =========================================================================
-- 3. CORE MULTI-TENANT TABLES
-- =========================================================================

-- TABLE: MERCHANTS (The Tenant Root)
CREATE TABLE merchants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    business_name TEXT NOT NULL,
    trading_name TEXT NOT NULL,
    postcode TEXT NOT NULL,
    is_postcode_exclusive BOOLEAN DEFAULT TRUE,
    phone TEXT NOT NULL,
    currency TEXT DEFAULT 'GBP',
    currency_symbol TEXT DEFAULT '£',
    vat_number TEXT,
    operating_hours JSONB DEFAULT '{"mon": {"open": "11:00", "close": "23:00"}, "fri": {"open": "11:00", "close": "00:00"}, "sat": {"open": "11:00", "close": "00:00"}}'::jsonb,
    white_label_config JSONB DEFAULT '{"paletteId": "emerald", "primaryColor": "#10b981", "tagline": "Artisan Glasgow Sourdough & Kebabs"}'::jsonb,
    waba_phone_number_id TEXT,
    subscription_status TEXT DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- TABLE: CATEGORIES
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    sort_order INT DEFAULT 0,
    is_time_gated BOOLEAN DEFAULT FALSE,
    active_from TIME,
    active_to TIME,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- TABLE: PRODUCTS
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    brand TEXT DEFAULT 'The Braehead Slice',
    description TEXT,
    price NUMERIC(10,2) NOT NULL,
    stock INT DEFAULT 50,
    reorder_level INT DEFAULT 10,
    in_stock BOOLEAN DEFAULT TRUE,
    status TEXT DEFAULT 'active',
    image_url TEXT,
    dietary_tags TEXT[] DEFAULT '{}',
    is_age_restricted BOOLEAN DEFAULT FALSE,
    mup_units NUMERIC(5,2) DEFAULT 0.0,
    expiry_days INT DEFAULT 30,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- TABLE: MODIFIER GROUPS (Feature 9: Complex Pizza Engine)
CREATE TABLE modifier_groups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    min_select INT DEFAULT 0,
    max_select INT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- TABLE: MODIFIER OPTIONS
CREATE TABLE modifier_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_id UUID NOT NULL REFERENCES modifier_groups(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    price_delta NUMERIC(10,2) DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- TABLE: CUSTOMERS (CRM, Address Memory, Loyalty Streaks)
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
    phone TEXT NOT NULL,
    full_name TEXT NOT NULL,
    saved_address TEXT,
    dietary_tags TEXT[] DEFAULT '{}',
    streak_count INT DEFAULT 1,
    risk_score INT DEFAULT 0,
    tier TEXT DEFAULT 'Regular',
    total_orders INT DEFAULT 1,
    total_spend NUMERIC(10,2) DEFAULT 0.00,
    last_order_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- TABLE: ORDERS (The Core Live Ops & KDS Engine)
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number SERIAL,
    merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    delivery_address TEXT NOT NULL,
    delivery_type TEXT DEFAULT 'Delivery',
    status TEXT DEFAULT 'pending',
    stage TEXT DEFAULT 'pending',
    subtotal NUMERIC(10,2) NOT NULL,
    delivery_fee NUMERIC(10,2) DEFAULT 2.50,
    surcharge NUMERIC(10,2) DEFAULT 0.00,
    amount NUMERIC(10,2) NOT NULL,
    commission_saved NUMERIC(10,2) DEFAULT 0.00,
    payment_status TEXT DEFAULT 'paid',
    payment_method TEXT DEFAULT 'stripe',
    payment_intent_id TEXT,
    driver_name TEXT DEFAULT 'Michael Campbell',
    driver_eta TEXT DEFAULT '6 mins away',
    customer_notes TEXT,
    soft_accept_countdown INT DEFAULT 60,
    soft_accepted BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- TABLE: ORDER ITEMS
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    qty INT DEFAULT 1,
    unit_price NUMERIC(10,2) NOT NULL,
    total_price NUMERIC(10,2) NOT NULL,
    modifiers TEXT,
    modifiers_json JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- TABLE: DINING TABLES (The Host Floor Plan)
CREATE TABLE dining_tables (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
    code TEXT NOT NULL,
    name TEXT NOT NULL,
    seats INT DEFAULT 4,
    zone TEXT DEFAULT 'Main Floor',
    status TEXT DEFAULT 'Available',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- TABLE: RESERVATIONS
CREATE TABLE reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    table_id UUID REFERENCES dining_tables(id) ON DELETE SET NULL,
    booking_time TIMESTAMPTZ NOT NULL,
    party_size INT DEFAULT 2,
    deposit_amount NUMERIC(10,2) DEFAULT 5.00,
    status TEXT DEFAULT 'Confirmed',
    source TEXT DEFAULT 'WhatsApp',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- TABLE: VILLAGE TABS (Feature 15: Smart Digital Ledger)
CREATE TABLE village_tabs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
    customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    balance NUMERIC(10,2) DEFAULT 0.00,
    weekly_limit NUMERIC(10,2) DEFAULT 100.00,
    auto_bill_day TEXT DEFAULT 'Friday 18:00',
    status TEXT DEFAULT 'active',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- TABLE: COMPLIANCE LOGS (Features 48 & 49: Age Verification & MUP Audit)
CREATE TABLE compliance_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
    log_type TEXT NOT NULL,
    customer_phone_masked TEXT NOT NULL,
    reason TEXT NOT NULL,
    driver_id TEXT,
    gps_coordinates TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- TABLE: DISPUTES (Features 17 & 47: Photo Arbitration)
CREATE TABLE disputes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
    order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    issue TEXT NOT NULL,
    amount NUMERIC(10,2) NOT NULL,
    photo_url TEXT,
    status TEXT DEFAULT 'Pending Review',
    manager_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================

ALTER TABLE merchants ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE modifier_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE modifier_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE dining_tables ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE village_tabs ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE disputes ENABLE ROW LEVEL SECURITY;

-- Allow access for development and testing
CREATE POLICY "Public full access to merchants" ON merchants FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access to categories" ON categories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access to products" ON products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access to modifier_groups" ON modifier_groups FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access to modifier_options" ON modifier_options FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access to customers" ON customers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access to orders" ON orders FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access to order_items" ON order_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access to dining_tables" ON dining_tables FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access to reservations" ON reservations FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access to village_tabs" ON village_tabs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access to compliance_logs" ON compliance_logs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access to disputes" ON disputes FOR ALL USING (true) WITH CHECK (true);

-- =========================================================================
-- 5. REALTIME WEBSOCKET SUBSCRIPTIONS
-- =========================================================================

DO $$
BEGIN
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE orders;
  EXCEPTION WHEN OTHERS THEN NULL;
  END;
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE order_items;
  EXCEPTION WHEN OTHERS THEN NULL;
  END;
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE products;
  EXCEPTION WHEN OTHERS THEN NULL;
  END;
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE customers;
  EXCEPTION WHEN OTHERS THEN NULL;
  END;
END $$;

-- =========================================================================
-- 6. SEED INITIAL DATA (All UUIDs strictly follow hexadecimal 0-9 and a-f)
-- =========================================================================

-- Seed 1: The Master Merchant (UUID prefix: 'a0')
INSERT INTO merchants (id, business_name, trading_name, postcode, is_postcode_exclusive, phone, currency, currency_symbol, vat_number)
VALUES (
    'a0000000-0000-0000-0000-000000000001',
    'The Braehead Slice Ltd',
    'The Braehead Slice',
    'G51 4BN',
    TRUE,
    '+447777154301',
    'GBP',
    '£',
    'GB 349 9281 04'
) ON CONFLICT (id) DO NOTHING;

-- Seed 2: Categories (UUID prefix: 'b0')
INSERT INTO categories (id, merchant_id, name, sort_order)
VALUES 
    ('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'Pizzas', 1),
    ('b0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'Sides & Starters', 2),
    ('b0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'Kebabs & Burgers', 3),
    ('b0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000001', 'Desserts', 4),
    ('b0000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000001', 'Drinks & Beverages', 5)
ON CONFLICT (id) DO NOTHING;

-- Seed 3: Products (UUID prefix: 'c0')
INSERT INTO products (id, merchant_id, category_id, name, brand, price, stock, reorder_level, in_stock, status, image_url, description, dietary_tags, is_age_restricted)
VALUES 
    (
        'c0000000-0000-0000-0000-000000000001',
        'a0000000-0000-0000-0000-000000000001',
        'b0000000-0000-0000-0000-000000000001',
        'The Braehead Special Pizza 12"',
        'The Braehead Slice',
        14.50,
        63,
        10,
        TRUE,
        'active',
        'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=150&auto=format&fit=crop&q=80',
        'Fresh mozzarella, smoked pepperoni, garlic oil and basil on artisan sourdough.',
        ARRAY['None'],
        FALSE
    ),
    (
        'c0000000-0000-0000-0000-000000000002',
        'a0000000-0000-0000-0000-000000000001',
        'b0000000-0000-0000-0000-000000000001',
        'Classic Margherita Pizza 12"',
        'The Braehead Slice',
        10.99,
        80,
        12,
        TRUE,
        'active',
        'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=150&auto=format&fit=crop&q=80',
        'San Marzano tomato base, creamy fior di latte, extra virgin olive oil.',
        ARRAY['Vegetarian'],
        FALSE
    ),
    (
        'c0000000-0000-0000-0000-000000000003',
        'a0000000-0000-0000-0000-000000000001',
        'b0000000-0000-0000-0000-000000000002',
        'Garlic Bread with Cheese',
        'The Braehead Slice',
        5.50,
        90,
        15,
        TRUE,
        'active',
        'https://images.unsplash.com/photo-1619895092538-128341789043?w=150&auto=format&fit=crop&q=80',
        'Crusty artisan baguette brushed with roasted garlic herb butter and melted mozzarella.',
        ARRAY['Vegetarian'],
        FALSE
    ),
    (
        'c0000000-0000-0000-0000-000000000004',
        'a0000000-0000-0000-0000-000000000001',
        'b0000000-0000-0000-0000-000000000003',
        'Glasgow Munchy Box',
        'The Braehead Slice',
        19.99,
        35,
        5,
        TRUE,
        'active',
        'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=150&auto=format&fit=crop&q=80',
        'Doner meat, chicken pakora, onion rings, seasoned chips, naan bread and dips.',
        ARRAY['Halal'],
        FALSE
    ),
    (
        'c0000000-0000-0000-0000-000000000005',
        'a0000000-0000-0000-0000-000000000001',
        'b0000000-0000-0000-0000-000000000005',
        'Barr Irn-Bru Can 330ml ("Ginger")',
        'A.G. Barr',
        1.80,
        120,
        24,
        TRUE,
        'active',
        'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=150&auto=format&fit=crop&q=80',
        'Scotland''s iconic sparkling orange refreshment served ice-cold.',
        ARRAY['Vegetarian', 'Vegan', 'Halal'],
        FALSE
    )
ON CONFLICT (id) DO NOTHING;

-- Seed 4: Customers (UUID prefix: 'd0')
INSERT INTO customers (id, merchant_id, phone, full_name, saved_address, dietary_tags, streak_count, risk_score, tier, total_orders, total_spend)
VALUES 
    (
        'd0000000-0000-0000-0000-000000000001',
        'a0000000-0000-0000-0000-000000000001',
        '+447789123456',
        'Akash Sharma',
        '12 Braehead Road, Glasgow, G51 4BN',
        ARRAY['Halal'],
        4,
        0,
        'VIP Premium',
        14,
        342.80
    ),
    (
        'd0000000-0000-0000-0000-000000000002',
        'a0000000-0000-0000-0000-000000000001',
        '+447700900142',
        'Sarah Jenkins',
        '88 Paisley Road West, Glasgow, G51 1LE',
        ARRAY['Vegetarian'],
        2,
        0,
        'Regular',
        6,
        112.50
    )
ON CONFLICT (id) DO NOTHING;

-- Seed 5: Orders (UUID prefix: 'e0')
INSERT INTO orders (id, merchant_id, customer_id, customer_name, phone, delivery_address, delivery_type, status, stage, subtotal, delivery_fee, amount, commission_saved, payment_status, driver_name, driver_eta)
VALUES 
    (
        'e0000000-0000-0000-0000-000000000104',
        'a0000000-0000-0000-0000-000000000001',
        'd0000000-0000-0000-0000-000000000001',
        'Akash Sharma',
        '447789123456',
        '12 Braehead Road, Glasgow, G51 4BN',
        'Delivery',
        'pending',
        'pending',
        37.46,
        2.50,
        39.96,
        11.98,
        'paid',
        'Michael Campbell',
        '6 mins away'
    )
ON CONFLICT (id) DO NOTHING;

-- Seed 6: Order Items
INSERT INTO order_items (id, order_id, product_id, name, qty, unit_price, total_price, modifiers, modifiers_json)
VALUES 
    (
        gen_random_uuid(),
        'e0000000-0000-0000-0000-000000000104',
        'c0000000-0000-0000-0000-000000000001',
        'The Braehead Special Pizza 12"',
        1,
        14.50,
        14.50,
        'WELL-DONE • CUT IN 4 • HOT HONEY DRIZZLE',
        '{"type": "whole", "size": "12", "crust": "Sourdough Classic", "doneness": "well_done", "cut": "cut_in_4"}'::jsonb
    ),
    (
        gen_random_uuid(),
        'e0000000-0000-0000-0000-000000000104',
        'c0000000-0000-0000-0000-000000000004',
        'Glasgow Munchy Box',
        1,
        19.99,
        19.99,
        'HALAL • EXTRA GARLIC RELISH',
        '{"preference": "extra_sauce"}'::jsonb
    ),
    (
        gen_random_uuid(),
        'e0000000-0000-0000-0000-000000000104',
        'c0000000-0000-0000-0000-000000000005',
        'Barr Irn-Bru Can 330ml ("Ginger")',
        2,
        1.80,
        3.60,
        'CHILLED',
        '{}'::jsonb
    );

-- Seed 7: Dining Tables
INSERT INTO dining_tables (id, merchant_id, code, name, seats, zone, status)
VALUES 
    (gen_random_uuid(), 'a0000000-0000-0000-0000-000000000001', 'T1', 'Stone Oven Window Booth', 4, 'Front Dining', 'Available'),
    (gen_random_uuid(), 'a0000000-0000-0000-0000-000000000001', 'T2', 'Highland Snug Table', 2, 'Cozy Snug', 'Occupied'),
    (gen_random_uuid(), 'a0000000-0000-0000-0000-000000000001', 'T3', 'Center Floor Quad', 4, 'Main Hall', 'Available'),
    (gen_random_uuid(), 'a0000000-0000-0000-0000-000000000001', 'T4', 'Family Party Table', 8, 'Terrace Room', 'Available');

-- Seed 8: Compliance Logs
INSERT INTO compliance_logs (id, merchant_id, log_type, customer_phone_masked, reason, driver_id, gps_coordinates)
VALUES 
    (gen_random_uuid(), 'a0000000-0000-0000-0000-000000000001', 'age_refusal', '+44 77** *** 123', 'Age-verification refusal: Recipient failed challenge 25 check for craft beer.', 'Driver #04', '55.8642 N, 4.2518 W'),
    (gen_random_uuid(), 'a0000000-0000-0000-0000-000000000001', 'mup_intervention', '+44 77** *** 984', 'MUP alcohol unit floor verified (Scotland 65p/unit regulation)', 'System Bot', '55.8580 N, 4.2440 W');
