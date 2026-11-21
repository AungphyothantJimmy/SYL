export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string | null;
  is_signature: boolean;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
};

export type FeaturedCollection = {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  link: string;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
};

export type Stat = {
  label: string;
  color: string;
};

export type SiteSettings = {
  id: number;
  store_name: string;

  hero_title: string;
  hero_subtitle: string;
  hero_image_url: string | null;
  hero_cta_text: string;
  hero_secondary_text: string;

  signature_heading: string;
  signature_subheading: string;

  featured_heading: string;
  featured_subheading: string;

  about_title: string;
  about_body: string;
  about_image_url: string | null;
  about_stats: Stat[];

  store_history_title: string;
  store_history_body: string;
  store_history_image_url: string | null;

  footer_description: string;
  footer_logo_url: string | null;
  contact_address: string;
  contact_phone: string;
  contact_email: string;
  contact_hours: string;
  facebook_url: string;
  instagram_url: string;

  updated_at?: string;
};

export type SiteData = {
  settings: SiteSettings;
  products: Product[];
  featured: FeaturedCollection[];
};

export type ProductInput = Omit<Product, "id" | "created_at" | "updated_at">;
export type FeaturedInput = Omit<
  FeaturedCollection,
  "id" | "created_at" | "updated_at"
>;
