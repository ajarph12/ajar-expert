-- ================================================
-- Ajar Expert WhatsApp AI Auto-Reply — Database Schema
-- Run this in Supabase SQL Editor
-- ================================================

-- Contacts table: tracks all WhatsApp contacts
CREATE TABLE IF NOT EXISTS contacts (
  phone         TEXT PRIMARY KEY,
  source        TEXT,
  is_website_lead BOOLEAN NOT NULL DEFAULT FALSE,
  first_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_seen_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Messages log: audit trail for all inbound and outbound messages
CREATE TABLE IF NOT EXISTS messages_log (
  id                  BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  phone               TEXT NOT NULL,
  direction           TEXT NOT NULL CHECK (direction IN ('in', 'out')),
  message_text        TEXT,
  provider_message_id TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_contacts_source ON contacts (source);
CREATE INDEX IF NOT EXISTS idx_contacts_website_lead ON contacts (is_website_lead) WHERE is_website_lead = TRUE;
CREATE INDEX IF NOT EXISTS idx_messages_log_phone ON messages_log (phone);
CREATE INDEX IF NOT EXISTS idx_messages_log_created_at ON messages_log (created_at DESC);

-- Enable RLS (optional but recommended)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages_log ENABLE ROW LEVEL SECURITY;

-- Service role policy: allow full access for service role key
CREATE POLICY "Service role full access" ON contacts
  FOR ALL USING (TRUE) WITH CHECK (TRUE);

CREATE POLICY "Service role full access" ON messages_log
  FOR ALL USING (TRUE) WITH CHECK (TRUE);
