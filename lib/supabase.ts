import { createClient, SupabaseClient } from "@supabase/supabase-js";

let supabase: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (supabase) return supabase;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }

  supabase = createClient(url, key);
  return supabase;
}

export interface Contact {
  phone: string;
  source: string | null;
  is_website_lead: boolean;
  first_seen_at: string;
  last_seen_at: string;
}

/** Get a contact by phone number */
export async function getContact(phone: string): Promise<Contact | null> {
  const sb = getSupabaseAdmin();
  const { data, error } = await sb
    .from("contacts")
    .select("*")
    .eq("phone", phone)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("getContact error:", error);
  }
  return data as Contact | null;
}

/** Touch contact: upsert with updated last_seen_at */
export async function touchContact(phone: string): Promise<void> {
  const sb = getSupabaseAdmin();
  const now = new Date().toISOString();

  const { error } = await sb.from("contacts").upsert(
    {
      phone,
      last_seen_at: now,
      updated_at: now,
    },
    { onConflict: "phone" }
  );

  if (error) console.error("touchContact error:", error);
}

/** Mark a contact as a website lead */
export async function upsertWebsiteLead(phone: string): Promise<void> {
  const sb = getSupabaseAdmin();
  const now = new Date().toISOString();

  const { error } = await sb.from("contacts").upsert(
    {
      phone,
      source: "ajar-expert.vercel.app",
      is_website_lead: true,
      last_seen_at: now,
      updated_at: now,
    },
    { onConflict: "phone" }
  );

  if (error) console.error("upsertWebsiteLead error:", error);
}

/** Log a message (inbound or outbound) */
export async function logMessage(
  phone: string,
  direction: "in" | "out",
  messageText: string,
  providerMessageId?: string
): Promise<void> {
  const sb = getSupabaseAdmin();

  const { error } = await sb.from("messages_log").insert({
    phone,
    direction,
    message_text: messageText,
    provider_message_id: providerMessageId ?? null,
  });

  if (error) console.error("logMessage error:", error);
}
