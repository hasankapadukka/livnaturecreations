export interface Category {
  id: string;
  name: string;
  image_url: string;
  product_count_display: string;
  created_at?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  image_url: string;
  category_id?: string;
  is_featured: boolean;
  description?: string;
  stock_status: 'instock' | 'outofstock';
  created_at?: string;
}

export interface Profile {
  id: string;
  full_name?: string;
  avatar_url?: string;
  is_admin: boolean;
  phone_number?: string;
  shipping_address?: string;
  city?: string;
  postal_code?: string;
  created_at?: string;
}

export interface Order {
  id: string;
  customer_id: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total_amount: number;
  shipping_address: string;
  city: string;
  postal_code: string;
  contact_phone: string;
  tracking_number?: string;
  created_at: string;
  payment_method?: string;
  items: OrderItem[];
}

export interface OrderItem {
  product_id: string;
  name: string;
  quantity: number;
  price: number;
  unit: string;
}

export interface ContactInquiry {
  id?: string;
  full_name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  created_at?: string;
}

export interface ExportInquiry {
  id?: string;
  full_name: string;
  company_name?: string;
  email: string;
  destination_country?: string;
  requirement_details: string;
  created_at?: string;
}
