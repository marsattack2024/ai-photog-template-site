-- 0001_schema.sql
-- Template schema for photography/creative service studios
-- Idempotent: all tables use IF NOT EXISTS

-- ── Site configuration ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS site_config (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_name     TEXT NOT NULL,
  tagline       TEXT,
  phone         TEXT,
  email         TEXT,
  city          TEXT,
  state         TEXT,
  price_range   TEXT DEFAULT '$',
  instagram_url TEXT,
  social_links  JSONB DEFAULT '{}',
  seo_defaults  JSONB DEFAULT '{}',
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── Services ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS services (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug              TEXT UNIQUE NOT NULL,
  title             TEXT NOT NULL,
  short_description TEXT,
  description       TEXT,
  starting_price    TEXT,
  duration_minutes  INT,
  features          TEXT[] DEFAULT '{}',
  cover_image_url   TEXT,
  active            BOOLEAN DEFAULT TRUE,
  display_order     INT DEFAULT 0,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

-- ── Galleries ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS galleries (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            TEXT UNIQUE NOT NULL,
  title           TEXT NOT NULL,
  description     TEXT,
  cover_image_url TEXT,
  category        TEXT,
  published       BOOLEAN DEFAULT TRUE,
  display_order   INT DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── Gallery images ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS gallery_images (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gallery_id    UUID REFERENCES galleries(id) ON DELETE CASCADE,
  image_url     TEXT NOT NULL,
  alt_text      TEXT,
  display_order INT DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── Blog posts ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS posts (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug           TEXT UNIQUE NOT NULL,
  title          TEXT NOT NULL,
  excerpt        TEXT,
  content        TEXT NOT NULL DEFAULT '',
  featured_image TEXT,
  category       TEXT,
  published      BOOLEAN DEFAULT FALSE,
  published_at   TIMESTAMPTZ,
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);

-- ── Testimonials ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS testimonials (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name   TEXT NOT NULL,
  client_detail TEXT,
  quote         TEXT NOT NULL,
  stars         INT DEFAULT 5 CHECK (stars BETWEEN 1 AND 5),
  photo_url     TEXT,
  service_type  TEXT,
  active        BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── Inquiries (contact form submissions) ──────────────────────────────────
CREATE TABLE IF NOT EXISTS inquiries (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name             TEXT NOT NULL,
  email            TEXT NOT NULL,
  phone            TEXT,
  service_interest TEXT,
  message          TEXT NOT NULL,
  source_page      TEXT DEFAULT 'contact_form',
  status           TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ── Triggers: updated_at ──────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
DECLARE t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY['site_config','services','galleries','posts'] LOOP
    EXECUTE format(
      'DROP TRIGGER IF EXISTS trg_%s_updated_at ON %s;
       CREATE TRIGGER trg_%s_updated_at
       BEFORE UPDATE ON %s
       FOR EACH ROW EXECUTE FUNCTION set_updated_at();',
      t, t, t, t
    );
  END LOOP;
END $$;
