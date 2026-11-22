import { supabase, requireSupabase } from "./supabase";
import { defaultSiteData } from "./defaults";
import type {
  FeaturedCollection,
  FeaturedInput,
  Product,
  ProductInput,
  SiteData,
  SiteSettings,
} from "./types";

function normalizeSettings(row: Record<string, unknown>): SiteSettings {
  const merged = { ...defaultSiteData.settings, ...row } as SiteSettings;
  if (!Array.isArray(merged.about_stats)) {
    merged.about_stats = defaultSiteData.settings.about_stats;
  }
  if (typeof merged.tiktok_url !== "string") {
    merged.tiktok_url = "";
  }
  return merged;
}

function normalizeProduct(row: Record<string, unknown>): Product {
  return {
    ...(row as unknown as Product),
    description: (row.description as string) ?? "",
    price: Number(row.price ?? 0),
    category: (row.category as string) ?? "",
    image_url: (row.image_url as string | null) ?? null,
    is_signature: Boolean(row.is_signature),
    sort_order: Number(row.sort_order ?? 0),
  };
}

function normalizeFeatured(row: Record<string, unknown>): FeaturedCollection {
  return {
    ...(row as unknown as FeaturedCollection),
    description: (row.description as string) ?? "",
    image_url: (row.image_url as string | null) ?? null,
    link: (row.link as string) ?? "/all-items",
    sort_order: Number(row.sort_order ?? 0),
  };
}

export async function fetchSiteData(): Promise<SiteData> {
  if (!supabase) return defaultSiteData;

  const [settingsRes, productsRes, featuredRes] = await Promise.all([
    supabase.from("site_settings").select("*").eq("id", 1).maybeSingle(),
    supabase
      .from("products")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true }),
    supabase
      .from("featured_collections")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true }),
  ]);

  if (settingsRes.error) throw settingsRes.error;
  if (productsRes.error) throw productsRes.error;
  if (featuredRes.error) throw featuredRes.error;

  return {
    settings: settingsRes.data
      ? normalizeSettings(settingsRes.data as Record<string, unknown>)
      : defaultSiteData.settings,
    products: (productsRes.data ?? []).map((row) =>
      normalizeProduct(row as Record<string, unknown>),
    ),
    featured: (featuredRes.data ?? []).map((row) =>
      normalizeFeatured(row as Record<string, unknown>),
    ),
  };
}

export async function saveSettings(
  settings: SiteSettings,
): Promise<SiteSettings> {
  const client = requireSupabase();
  const { data, error } = await client
    .from("site_settings")
    .upsert({ ...settings, id: 1, updated_at: new Date().toISOString() })
    .select()
    .single();

  if (error) throw error;
  return normalizeSettings(data as Record<string, unknown>);
}

export async function createProduct(input: ProductInput): Promise<Product> {
  const client = requireSupabase();
  const { data, error } = await client
    .from("products")
    .insert(input)
    .select()
    .single();

  if (error) throw error;
  return data as Product;
}

export async function updateProduct(
  id: string,
  input: ProductInput,
): Promise<Product> {
  const client = requireSupabase();
  const { data, error } = await client
    .from("products")
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Product;
}

export async function deleteProduct(id: string): Promise<void> {
  const client = requireSupabase();
  const { error } = await client.from("products").delete().eq("id", id);
  if (error) throw error;
}

export async function createFeatured(
  input: FeaturedInput,
): Promise<FeaturedCollection> {
  const client = requireSupabase();
  const { data, error } = await client
    .from("featured_collections")
    .insert(input)
    .select()
    .single();

  if (error) throw error;
  return data as FeaturedCollection;
}

export async function updateFeatured(
  id: string,
  input: FeaturedInput,
): Promise<FeaturedCollection> {
  const client = requireSupabase();
  const { data, error } = await client
    .from("featured_collections")
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as FeaturedCollection;
}

export async function deleteFeatured(id: string): Promise<void> {
  const client = requireSupabase();
  const { error } = await client
    .from("featured_collections")
    .delete()
    .eq("id", id);
  if (error) throw error;
}

/** Upload an image to the public `site-images` bucket and return its URL. */
export async function uploadImage(
  file: File,
  folder: "products" | "featured" | "site",
): Promise<string> {
  const client = requireSupabase();
  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${folder}/${crypto.randomUUID()}.${extension}`;

  const { error } = await client.storage
    .from("site-images")
    .upload(path, file, { cacheControl: "3600", upsert: false });

  if (error) throw error;

  const { data } = client.storage.from("site-images").getPublicUrl(path);
  return data.publicUrl;
}
