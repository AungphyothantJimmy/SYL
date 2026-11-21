-- ============================================================================
-- Shwe Yadanar Lin — Supabase schema
--
-- Run this entire file once in the Supabase SQL Editor
-- (Dashboard → SQL Editor → New query → paste → Run).
-- It is safe to run again: it only creates what is missing and seeds the
-- current website content without overwriting your edits.
-- ============================================================================

create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------------------
-- Tables
-- ----------------------------------------------------------------------------

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null default '',
  price numeric(12, 2) not null default 0,
  category text not null default '',
  image_url text,
  is_signature boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.featured_collections (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  image_url text,
  link text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id integer primary key default 1 check (id = 1),
  store_name text not null default 'Shwe Yadanar Lin',

  hero_title text not null default '',
  hero_subtitle text not null default '',
  hero_image_url text,
  hero_cta_text text not null default 'Shop Collection',
  hero_secondary_text text not null default 'Learn More',

  signature_heading text not null default 'Signature Items',
  signature_subheading text not null default '',

  featured_heading text not null default 'Featured Collections',
  featured_subheading text not null default '',

  about_title text not null default '',
  about_body text not null default '',
  about_image_url text,
  about_stats jsonb not null default '[]'::jsonb,

  store_history_title text not null default 'Our Story',
  store_history_body text not null default '',
  store_history_image_url text,

  footer_description text not null default '',
  footer_logo_url text,
  contact_address text not null default '',
  contact_phone text not null default '',
  contact_email text not null default '',
  contact_hours text not null default '',
  facebook_url text not null default '',
  instagram_url text not null default '',

  updated_at timestamptz not null default now()
);

create index if not exists products_sort_order_idx
  on public.products (sort_order);
create index if not exists featured_sort_order_idx
  on public.featured_collections (sort_order);

-- ----------------------------------------------------------------------------
-- Row Level Security
--   • Anyone (anon) can read the public website content.
--   • Only signed-in admin users can create/update/delete.
-- ----------------------------------------------------------------------------

alter table public.products enable row level security;
alter table public.featured_collections enable row level security;
alter table public.site_settings enable row level security;

drop policy if exists "products_public_read" on public.products;
create policy "products_public_read" on public.products
  for select using (true);

drop policy if exists "products_admin_write" on public.products;
create policy "products_admin_write" on public.products
  for all to authenticated using (true) with check (true);

drop policy if exists "featured_public_read" on public.featured_collections;
create policy "featured_public_read" on public.featured_collections
  for select using (true);

drop policy if exists "featured_admin_write" on public.featured_collections;
create policy "featured_admin_write" on public.featured_collections
  for all to authenticated using (true) with check (true);

drop policy if exists "settings_public_read" on public.site_settings;
create policy "settings_public_read" on public.site_settings
  for select using (true);

drop policy if exists "settings_admin_write" on public.site_settings;
create policy "settings_admin_write" on public.site_settings
  for all to authenticated using (true) with check (true);

-- ----------------------------------------------------------------------------
-- Storage bucket for uploaded images
-- ----------------------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do update set public = true;

drop policy if exists "site_images_public_read" on storage.objects;
create policy "site_images_public_read" on storage.objects
  for select using (bucket_id = 'site-images');

drop policy if exists "site_images_admin_insert" on storage.objects;
create policy "site_images_admin_insert" on storage.objects
  for insert to authenticated with check (bucket_id = 'site-images');

drop policy if exists "site_images_admin_update" on storage.objects;
create policy "site_images_admin_update" on storage.objects
  for update to authenticated using (bucket_id = 'site-images');

drop policy if exists "site_images_admin_delete" on storage.objects;
create policy "site_images_admin_delete" on storage.objects
  for delete to authenticated using (bucket_id = 'site-images');

-- Ensure new columns exist before seeding (for databases created earlier).
alter table public.site_settings
  add column if not exists store_history_title text not null default 'Our Story',
  add column if not exists store_history_body text not null default '',
  add column if not exists store_history_image_url text;

-- ----------------------------------------------------------------------------
-- Seed: current site content (only runs when the tables are empty)
-- ----------------------------------------------------------------------------

insert into public.site_settings (
  id, store_name,
  hero_title, hero_subtitle, hero_image_url, hero_cta_text, hero_secondary_text,
  signature_heading, signature_subheading,
  featured_heading, featured_subheading,
  about_title, about_body, about_image_url, about_stats,
  store_history_title, store_history_body, store_history_image_url,
  footer_description, footer_logo_url,
  contact_address, contact_phone, contact_email, contact_hours,
  facebook_url, instagram_url
)
values (
  1,
  'Shwe Yadanar Lin',
  $t$Timeless
Elegance in Every
Piece$t$,
  'Discover our exquisite collection of handcrafted jewelry...',
  'images/syl1.jpg',
  'Shop Collection',
  'Learn More',
  'Signature Items',
  'Our most loved pieces, crafted with timeless beauty',
  'Featured Collections',
  $t$Explore our carefully curated collections, each piece designed to celebrate life's most precious moments$t$,
  'Crafting Beauty with Passion',
  $t$As a recent founder and dedicated crafter, I create jewelry that reflects individuality and timeless elegance. Each piece is thoughtfully designed and handcrafted, blending artistic vision with precision.

Every gemstone is handpicked for its sparkle and character. Every setting is crafted with care, making each piece as unique as the person who wears it.$t$,
  'images/nla.png',
  '[{"label":"Quality Materials","color":"green"},{"label":"Customer Delight","color":"blue"},{"label":"500+ Designs","color":"yellow"}]'::jsonb,
  'Our Story',
  $t$Founded with a passion for timeless beauty, our store began as a small workshop dedicated to crafting jewelry that celebrates life's most precious moments. Over the years we have grown, but our commitment to quality, craftsmanship, and personal service remains the same.

Every piece in our collection carries the story of the hands that made it and the moments it will witness.$t$,
  'images/nla.png',
  $t$Creating modern elegance since 2022. Your trusted destination for beautifully crafted jewelry designed to shine for a lifetime.$t$,
  'images/logo.jpg',
  '123 Luxury Avenue, Diamond District, New York, NY 10036',
  '+95 9 775 815814',
  'info@jewelrystore.com',
  $t$Mon - Sat: 10:00 AM - 7:00 PM
Sunday: 12:00 PM - 5:00 PM$t$,
  'https://web.facebook.com/profile.php?id=100063796764466',
  'https://www.instagram.com/syl__jewelry/'
)
on conflict (id) do nothing;

insert into public.products (
  name, description, price, category, image_url, is_signature, sort_order
)
select * from (values
  ('item 1',  '', 0::numeric, 'Signature', 'images/s1.jpg',  true, 1),
  ('item 2',  '', 0::numeric, 'Signature', 'images/s2.jpg',  true, 2),
  ('item 3',  '', 0::numeric, 'Signature', 'images/s3.jpg',  true, 3),
  ('item 4',  '', 0::numeric, 'Signature', 'images/s4.jpg',  true, 4),
  ('item 5',  '', 0::numeric, 'Signature', 'images/s5.jpg',  true, 5),
  ('item 6',  '', 0::numeric, 'Signature', 'images/s6.jpg',  true, 6),
  ('item 7',  '', 0::numeric, 'Signature', 'images/s7.jpg',  true, 7),
  ('item 8',  '', 0::numeric, 'Signature', 'images/s8.jpg',  true, 8),
  ('item 9',  '', 0::numeric, 'Signature', 'images/s9.jpg',  true, 9),
  ('item 10', '', 0::numeric, 'Signature', 'images/s10.jpg', true, 10),
  ('item 11', '', 0::numeric, 'Signature', 'images/s11.jpg', true, 11),
  ('item 12', '', 0::numeric, 'Signature', 'images/s12.jpg', true, 12)
) as seed(name, description, price, category, image_url, is_signature, sort_order)
where not exists (select 1 from public.products);

insert into public.featured_collections (
  title, description, image_url, link, sort_order
)
select * from (values
  ('Diamond Rings',  'Brilliant cuts that capture eternal love',        'images/f1.png', '', 1),
  ('Necklaces',      'Luxurious designs for every occasion',            'images/f2.png', '', 2),
  ('Jade Earrings',  'Classic beauty with modern sophistication',       'images/f3.png', '', 3)
) as seed(title, description, image_url, link, sort_order)
where not exists (select 1 from public.featured_collections);

-- ----------------------------------------------------------------------------
-- Migrations for databases created with an older version of this file
-- (safe to run again)
-- ----------------------------------------------------------------------------

alter table public.featured_collections
  alter column link set default '';

alter table public.site_settings
  add column if not exists store_history_title text not null default 'Our Story',
  add column if not exists store_history_body text not null default '',
  add column if not exists store_history_image_url text;
