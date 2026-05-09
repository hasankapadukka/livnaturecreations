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
  price: string;
  weight: string;
  image_url: string;
  category_id?: string;
  is_featured: boolean;
  description?: string;
  created_at?: string;
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
