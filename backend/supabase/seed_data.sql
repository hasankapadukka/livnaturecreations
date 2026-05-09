-- SEED DATA FOR LIV NATURE CREATIONS
-- Copy and paste this into your Supabase SQL Editor AFTER running the initial_schema.sql

-- 1. Clear existing data (Optional, be careful!)
-- DELETE FROM products;
-- DELETE FROM categories;

-- 2. Insert Categories
-- Note: We use fixed UUIDs here for easy reference in the products insert
INSERT INTO categories (id, name, image_url, product_count_display) VALUES
('a1b2c3d4-e5f6-4a1b-8c2d-3e4f5a6b7c8d', 'Pulses & Legumes', 'https://images.unsplash.com/photo-1515942400420-2b98fed1f515?auto=format&fit=crop&w=800&q=80', '15+ Products'),
('b2c3d4e5-f6a1-4b2c-9d3e-4f5a6b7c8d9e', 'Spices & Herbs', 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=800&q=80', '25+ Products'),
('c3d4e5f6-a1b2-4c3d-0e4f-5a6b7c8d9e0f', 'Grains & Rice', 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80', '10+ Products'),
('d4e5f6a1-b2c3-4d4e-1f5a-6b7c8d9e0f1a', 'Specialty Foods', 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=800&q=80', '8+ Products')
ON CONFLICT (id) DO NOTHING;

-- 3. Insert Products
INSERT INTO products (name, category_id, price, weight, image_url, is_featured) VALUES
('Premium Red Lentils', 'a1b2c3d4-e5f6-4a1b-8c2d-3e4f5a6b7c8d', 'LKR 450.00', '1kg', 'https://images.unsplash.com/photo-1585915900263-f5a05f44a39a?auto=format&fit=crop&w=800&q=80', true),
('Ceylon Cinnamon Sticks', 'b2c3d4e5-f6a1-4b2c-9d3e-4f5a6b7c8d9e', 'LKR 1,200.00', '250g', 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=800&q=80', true),
('Traditional Basmati Rice', 'c3d4e5f6-a1b2-4c3d-0e4f-5a6b7c8d9e0f', 'LKR 650.00', '5kg', 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80', true),
('Organic Chia Seeds', 'd4e5f6a1-b2c3-4d4e-1f5a-6b7c8d9e0f1a', 'LKR 950.00', '500g', 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=800&q=80', true),
('Whole Green Gram', 'a1b2c3d4-e5f6-4a1b-8c2d-3e4f5a6b7c8d', 'LKR 380.00', '1kg', 'https://images.unsplash.com/photo-1515942400420-2b98fed1f515?auto=format&fit=crop&w=800&q=80', false),
('Black Pepper Powder', 'b2c3d4e5-f6a1-4b2c-9d3e-4f5a6b7c8d9e', 'LKR 850.00', '500g', 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=800&q=80', false);
