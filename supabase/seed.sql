-- supabase/seed.sql
-- Realistic placeholder data for photography/creative service template
-- Generic: no studio-specific branding. Swap via Supabase dashboard.

-- ── Site config ───────────────────────────────────────────────────────────
INSERT INTO site_config (site_name, tagline, phone, email, city, state, price_range, instagram_url)
VALUES (
  'Studio Name',
  'Timeless portraits for people who know their worth.',
  '(555) 000-0000',
  'hello@yourstudio.com',
  'Your City',
  'ST',
  '$$',
  'https://instagram.com/yourstudio'
);

-- ── Services ──────────────────────────────────────────────────────────────
INSERT INTO services (slug, title, short_description, starting_price, duration_minutes, active, display_order)
VALUES
  ('portrait',  'Portrait Session',   'A timeless portrait experience, tailored entirely to you.',           '$450',  90,  TRUE, 1),
  ('boudoir',   'Boudoir Experience', 'Private, empowering, and completely guided from start to finish.',    '$650',  120, TRUE, 2),
  ('wedding',   'Wedding Coverage',   'Full-day documentary coverage with a second photographer included.',  '$3500', 600, TRUE, 3),
  ('branding',  'Brand Story Session','60+ images for entrepreneurs and creatives. Content-forward.',        '$800',  180, TRUE, 4)
ON CONFLICT (slug) DO NOTHING;

-- ── Galleries ─────────────────────────────────────────────────────────────
INSERT INTO galleries (slug, title, description, cover_image_url, published, display_order)
VALUES
  ('natural-light',    'Natural Light',      'Soft, luminous work done entirely in window light.',    '/placeholder/gallery-1.jpg', TRUE, 1),
  ('golden-hour',      'Golden Hour',        'That last hour before sunset. Every time.',             '/placeholder/gallery-2.jpg', TRUE, 2),
  ('studio-editorial', 'Studio & Editorial', 'Clean backgrounds. Strong light. No distractions.',     '/placeholder/gallery-3.jpg', TRUE, 3)
ON CONFLICT (slug) DO NOTHING;

-- ── Testimonials ──────────────────────────────────────────────────────────
-- Truncate first so the seed is idempotent (no unique constraint on testimonials)
TRUNCATE testimonials RESTART IDENTITY CASCADE;
INSERT INTO testimonials (client_name, client_detail, quote, stars, active, display_order)
VALUES
  ('Sarah M.',    'Portrait Session',   'I walked in nervous and left feeling like myself again. The most beautiful images I have ever had taken of me.', 5, TRUE, 1),
  ('Jennifer K.', 'Boudoir Experience', 'Worth every single penny. I will treasure these forever. I almost didn''t do this — I am so glad I did.',        5, TRUE, 2),
  ('Rachel T.',   'Wedding Coverage',   'She has a gift for making everyone feel at ease. Our photos are everything we dreamed of.',                      5, TRUE, 3),
  ('Monica D.',   'Portrait Session',   'I''ve never felt more seen in my life. I cried when I saw the gallery. In the best way.',                        5, TRUE, 4),
  ('Claire B.',   'Brand Story Session','I needed photos that actually matched my brand. What I got was a whole visual language for my business.',         5, TRUE, 5)
;

-- ── Blog posts ────────────────────────────────────────────────────────────
INSERT INTO posts (slug, title, excerpt, content, published, published_at)
VALUES
  (
    'what-to-wear-portrait-session',
    'What to Wear to Your Portrait Session',
    'The right outfit makes a portrait. The wrong one works against it. Here''s our honest guide.',
    'Full article content goes here.',
    TRUE,
    NOW() - INTERVAL '14 days'
  ),
  (
    'how-to-prepare-boudoir',
    'How to Prepare for a Boudoir Session',
    'What to do, what to skip, and how to actually feel ready on the day.',
    'Full article content goes here.',
    TRUE,
    NOW() - INTERVAL '7 days'
  )
ON CONFLICT (slug) DO NOTHING;
