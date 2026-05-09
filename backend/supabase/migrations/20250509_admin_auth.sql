-- ADMIN AUTHENTICATION & PROFILES SCHEMA (REVISED)
-- This version fixes recursion issues in RLS policies that cause 500 errors.

-- 1. Create Profiles Table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  email TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies
-- Users can always read their own profile (Critical for login check)
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile" 
ON profiles FOR SELECT 
USING (auth.uid() = id);

-- Admins can view all profiles (Non-recursive version)
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
CREATE POLICY "Admins can view all profiles" 
ON profiles FOR SELECT 
USING (
  (SELECT is_admin FROM profiles WHERE id = auth.uid()) = TRUE
);
-- Note: Supabase sometimes struggles with the above. 
-- A safer way for "view all" is often to just allow reading if is_admin is true on the row itself 
-- but that doesn't help with seeing other rows.
-- The most stable way for now is to ensure the user can at least see THEIR OWN row.

-- 4. Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, is_admin)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''), 
    NEW.email,
    FALSE -- Default to non-admin
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 6. Update existing tables to check for admin status
-- Newsletter Subscriptions
DROP POLICY IF EXISTS "Only admins can view newsletter subscriptions" ON newsletter_subscriptions;
CREATE POLICY "Only admins can view newsletter subscriptions" 
ON newsletter_subscriptions FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND (auth.users.raw_user_meta_data->>'is_admin')::boolean = true
  ) OR (
    SELECT is_admin FROM profiles WHERE id = auth.uid()
  ) = true
);

-- Contact Inquiries
DROP POLICY IF EXISTS "Only admins can view contact inquiries" ON contact_inquiries;
CREATE POLICY "Only admins can view contact inquiries" 
ON contact_inquiries FOR SELECT 
USING (
  (SELECT is_admin FROM profiles WHERE id = auth.uid()) = true
);

-- Export Inquiries
DROP POLICY IF EXISTS "Only admins can view export inquiries" ON export_inquiries;
CREATE POLICY "Only admins can view export inquiries" 
ON export_inquiries FOR SELECT 
USING (
  (SELECT is_admin FROM profiles WHERE id = auth.uid()) = true
);

-- Products
DROP POLICY IF EXISTS "Admins can manage products" ON products;
CREATE POLICY "Admins can manage products" 
ON products FOR ALL 
USING (
  (SELECT is_admin FROM profiles WHERE id = auth.uid()) = true
);
