// lib/data.ts
import { createClient } from "@supabase/supabase-js";

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return null;
  }
  return createClient(url, key);
}

// ── Testimonials ──────────────────────────────────────────────────────────
export async function getTestimonials() {
  const client = getSupabaseClient();
  if (!client) return [];
  const { data } = await client
    .from("testimonials")
    .select("*")
    .eq("active", true)
    .order("display_order");
  return data ?? [];
}

// ── Galleries ─────────────────────────────────────────────────────────────
export async function getGalleries() {
  const client = getSupabaseClient();
  if (!client) return [];
  const { data } = await client
    .from("galleries")
    .select("*")
    .eq("published", true)
    .order("display_order");
  return data ?? [];
}

export async function getGalleryBySlug(slug: string) {
  const client = getSupabaseClient();
  if (!client) return null;
  const { data } = await client
    .from("galleries")
    .select("*, gallery_images(*)")
    .eq("slug", slug)
    .single();
  return data ?? null;
}

export async function getGallerySlugs(): Promise<string[]> {
  const client = getSupabaseClient();
  if (!client) return [];
  const { data } = await client
    .from("galleries")
    .select("slug")
    .eq("published", true);
  return data?.map((g: { slug: string }) => g.slug) ?? [];
}

// ── Blog ──────────────────────────────────────────────────────────────────
export async function getPosts() {
  const client = getSupabaseClient();
  if (!client) return [];
  const { data } = await client
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });
  return data ?? [];
}

export async function getPostBySlug(slug: string) {
  const client = getSupabaseClient();
  if (!client) return null;
  const { data } = await client
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();
  return data ?? null;
}

export async function getPostSlugs(): Promise<string[]> {
  const client = getSupabaseClient();
  if (!client) return [];
  const { data } = await client
    .from("posts")
    .select("slug")
    .eq("published", true);
  return data?.map((p: { slug: string }) => p.slug) ?? [];
}

// ── Services ──────────────────────────────────────────────────────────────
export async function getServices() {
  const client = getSupabaseClient();
  if (!client) return [];
  const { data } = await client
    .from("services")
    .select("*")
    .eq("active", true)
    .order("display_order");
  return data ?? [];
}

// ── Site config ────────────────────────────────────────────────────────────
export async function getSiteConfig() {
  const client = getSupabaseClient();
  if (!client) return null;
  const { data } = await client
    .from("site_config")
    .select("*")
    .single();
  return data ?? null;
}
