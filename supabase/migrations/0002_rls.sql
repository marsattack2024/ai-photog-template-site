-- 0002_rls.sql
-- Row Level Security policies for all tables

-- Enable RLS on all tables
ALTER TABLE site_config   ENABLE ROW LEVEL SECURITY;
ALTER TABLE services      ENABLE ROW LEVEL SECURITY;
ALTER TABLE galleries     ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts         ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials  ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries     ENABLE ROW LEVEL SECURITY;

-- Public read: published/active content
CREATE POLICY "public_read_site_config"   ON site_config   FOR SELECT USING (TRUE);
CREATE POLICY "public_read_services"      ON services      FOR SELECT USING (active = TRUE);
CREATE POLICY "public_read_galleries"     ON galleries     FOR SELECT USING (published = TRUE);
CREATE POLICY "public_read_gallery_images" ON gallery_images FOR SELECT USING (TRUE);
CREATE POLICY "public_read_posts"         ON posts         FOR SELECT USING (published = TRUE);
CREATE POLICY "public_read_testimonials"  ON testimonials  FOR SELECT USING (active = TRUE);

-- Public insert: inquiries only (contact form)
CREATE POLICY "public_insert_inquiries"   ON inquiries     FOR INSERT WITH CHECK (TRUE);

-- Authenticated write: all tables (for future admin UI)
CREATE POLICY "auth_write_all" ON site_config    FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "auth_write_services" ON services  FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "auth_write_galleries" ON galleries FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "auth_write_gallery_images" ON gallery_images FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "auth_write_posts" ON posts         FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "auth_write_testimonials" ON testimonials FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "auth_write_inquiries" ON inquiries FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);
