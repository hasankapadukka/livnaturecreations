-- Initial Schema for Liv Nature Creations

-- 1. Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    image_url TEXT,
    product_count_display TEXT, -- e.g., "12 Products"
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Products Table
CREATE TABLE IF NOT EXISTS products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    price TEXT NOT NULL, -- e.g., "LKR 850.00"
    weight TEXT, -- e.g., "250g"
    image_url TEXT,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    is_featured BOOLEAN DEFAULT false,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Contact Inquiries Table
CREATE TABLE IF NOT EXISTS contact_inquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Export Inquiries Table
CREATE TABLE IF NOT EXISTS export_inquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    company_name TEXT,
    email TEXT NOT NULL,
    destination_country TEXT,
    requirement_details TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Newsletter Subscriptions Table
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE export_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Public Access Policies (Select only for products/categories)
CREATE POLICY "Public can view categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public can view products" ON products FOR SELECT USING (true);

-- Submission Policies (Insert only for forms)
CREATE POLICY "Public can submit contact inquiries" ON contact_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can submit export inquiries" ON export_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can subscribe to newsletter" ON newsletter_subscriptions FOR INSERT WITH CHECK (true);
