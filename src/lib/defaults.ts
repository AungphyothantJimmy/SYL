import type {
  FeaturedCollection,
  Product,
  SiteData,
  SiteSettings,
} from "./types";

/** Resolve a file in /public/images against the configured Vite base path. */
export const asset = (file: string) =>
  `${import.meta.env.BASE_URL}images/${file}`;

export const defaultSettings: SiteSettings = {
  id: 1,
  store_name: "Shwe Yadanar Lin",

  hero_title: "Timeless Elegance in Every Piece",
  hero_subtitle:
    "Discover our exquisite collection of handcrafted jewelry...",
  hero_image_url: asset("syl1.jpg"),
  hero_cta_text: "Shop Collection",
  hero_secondary_text: "Learn More",

  signature_heading: "Signature Items",
  signature_subheading:
    "Our most loved pieces, crafted with timeless beauty",

  featured_heading: "Featured Collections",
  featured_subheading:
    "Explore our carefully curated collections, each piece designed to celebrate life's most precious moments",

  about_title: "Crafting Beauty with Passion",
  about_body:
    "As a recent founder and dedicated crafter, I create jewelry that reflects individuality and timeless elegance. Each piece is thoughtfully designed and handcrafted, blending artistic vision with precision.\n\nEvery gemstone is handpicked for its sparkle and character. Every setting is crafted with care, making each piece as unique as the person who wears it.",
  about_image_url: asset("nla.png"),
  about_stats: [
    { label: "Quality Materials", color: "green" },
    { label: "Customer Delight", color: "blue" },
    { label: "500+ Designs", color: "yellow" },
  ],

  store_history_title: "Our Story",
  store_history_body:
    "Founded with a passion for timeless beauty, our store began as a small workshop dedicated to crafting jewelry that celebrates life's most precious moments. Over the years we have grown, but our commitment to quality, craftsmanship, and personal service remains the same.\n\nEvery piece in our collection carries the story of the hands that made it and the moments it will witness.",
  store_history_image_url: asset("nla.png"),

  footer_description:
    "Creating modern elegance since 2022. Your trusted destination for beautifully crafted jewelry designed to shine for a lifetime.",
  footer_logo_url: asset("logo.jpg"),
  contact_address: "123 Luxury Avenue, Diamond District, New York, NY 10036",
  contact_phone: "+95 9 775 815814",
  contact_email: "info@jewelrystore.com",
  contact_hours: "Mon - Sat: 10:00 AM - 7:00 PM\nSunday: 12:00 PM - 5:00 PM",
  facebook_url: "https://web.facebook.com/profile.php?id=100063796764466",
  instagram_url: "https://www.instagram.com/syl__jewelry/",
};

export const defaultFeatured: FeaturedCollection[] = [
  {
    id: "default-f1",
    title: "Diamond Rings",
    description: "Brilliant cuts that capture eternal love",
    image_url: asset("f1.png"),
    link: "/all-items",
    sort_order: 1,
  },
  {
    id: "default-f2",
    title: "Necklaces",
    description: "Luxurious designs for every occasion",
    image_url: asset("f2.png"),
    link: "/all-items",
    sort_order: 2,
  },
  {
    id: "default-f3",
    title: "Jade Earrings",
    description: "Classic beauty with modern sophistication",
    image_url: asset("f3.png"),
    link: "/all-items",
    sort_order: 3,
  },
];

export const defaultProducts: Product[] = Array.from({ length: 12 }).map(
  (_, index) => ({
    id: `default-s${index + 1}`,
    name: `item ${index + 1}`,
    description: "",
    price: 0,
    category: "Signature",
    image_url: asset(`s${index + 1}.jpg`),
    is_signature: true,
    sort_order: index + 1,
  }),
);

export const defaultSiteData: SiteData = {
  settings: defaultSettings,
  products: defaultProducts,
  featured: defaultFeatured,
};
