/*
# Create farewell tree schema

## Overview
Sets up the database for an interactive farewell/tribute website where coworkers leave
messages as leaves on a tree. Includes site-wide editable content and a moderation workflow
(approved messages appear on the public tree).

## New Tables

### site_settings (single-row, site-wide editable content)
- `id` uuid primary key
- `honoree_name` text — name of the person being honored
- `honoree_role` text — their role/title
- `hero_title` text — main hero heading
- `hero_subtitle` text — hero subheading
- `footer_message` text — closing message in footer
- `hero_background_url` text — optional custom hero background image
- `updated_at` timestamptz — last update timestamp

### messages (farewell messages = "leaves")
- `id` uuid primary key
- `sender_name` text — name of the person leaving the message
- `sender_role` text — their team/role
- `message` text — the farewell message text
- `photo_url` text — optional Supabase Storage public URL
- `leaf_type` text — which leaf silhouette ('mint'|'bay'|'citrus'|'coffee'|'vanilla'|'basil')
- `position_x` float — saved canopy position (0-1 normalized), nullable
- `position_y` float — saved canopy position (0-1 normalized), nullable
- `is_approved` boolean — moderation flag (only approved render on public tree)
- `created_at` timestamptz — submission timestamp

## Security (RLS)

### messages
- anon + authenticated can INSERT new messages (must be is_approved=false, i.e. pending)
- anon + authenticated can SELECT only approved messages
- authenticated (admin) can do full CRUD on all rows (for moderation)

### site_settings
- anon + authenticated can SELECT (public read)
- authenticated (admin) can do full CRUD (to edit site content)

## Notes
1. site_settings is seeded with one default row.
2. Admin access is via Supabase Auth (email/password), no custom auth table.
3. Storage bucket 'farewell-photos' is created for image uploads.
*/

CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  honoree_name text NOT NULL DEFAULT '[NAME]',
  honoree_role text NOT NULL DEFAULT 'Flavor Application Technologist',
  hero_title text NOT NULL DEFAULT 'Our Flavor Tree for [NAME]',
  hero_subtitle text NOT NULL DEFAULT 'Every leaf is a taste we shared.',
  footer_message text NOT NULL DEFAULT 'Thank you for every flavor you brought to this team.',
  hero_background_url text,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_name text NOT NULL,
  sender_role text NOT NULL,
  message text NOT NULL,
  photo_url text,
  leaf_type text NOT NULL DEFAULT 'mint',
  position_x float,
  position_y float,
  is_approved boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- messages policies
DROP POLICY IF EXISTS "Public can submit messages" ON messages;
CREATE POLICY "Public can submit messages"
  ON messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (is_approved = false);

DROP POLICY IF EXISTS "Public can read approved messages" ON messages;
CREATE POLICY "Public can read approved messages"
  ON messages FOR SELECT
  TO anon, authenticated
  USING (is_approved = true);

DROP POLICY IF EXISTS "Admin select all messages" ON messages;
CREATE POLICY "Admin select all messages"
  ON messages FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Admin update messages" ON messages;
CREATE POLICY "Admin update messages"
  ON messages FOR UPDATE
  TO authenticated
  USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin delete messages" ON messages;
CREATE POLICY "Admin delete messages"
  ON messages FOR DELETE
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Admin insert messages" ON messages;
CREATE POLICY "Admin insert messages"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- site_settings policies
DROP POLICY IF EXISTS "Public can read site settings" ON site_settings;
CREATE POLICY "Public can read site settings"
  ON site_settings FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Admin can update site settings" ON site_settings;
CREATE POLICY "Admin can update site settings"
  ON site_settings FOR ALL
  TO authenticated
  USING (true) WITH CHECK (true);

-- Seed one default row if none exists
INSERT INTO site_settings (honoree_name, honoree_role, hero_title, hero_subtitle, footer_message)
SELECT '[NAME]', 'Flavor Application Technologist', 'Our Flavor Tree for [NAME]', 'Every leaf is a taste we shared.', 'Thank you for every flavor you brought to this team. Wishing you the sweetest next chapter.'
WHERE NOT EXISTS (SELECT 1 FROM site_settings);

-- Storage bucket for photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('farewell-photos', 'farewell-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies: public read, anyone can upload
DROP POLICY IF EXISTS "Public read photos" ON storage.objects;
CREATE POLICY "Public read photos"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'farewell-photos');

DROP POLICY IF EXISTS "Public upload photos" ON storage.objects;
CREATE POLICY "Public upload photos"
  ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'farewell-photos');

DROP POLICY IF EXISTS "Admin delete photos" ON storage.objects;
CREATE POLICY "Admin delete photos"
  ON storage.objects FOR DELETE
  TO anon, authenticated
  USING (bucket_id = 'farewell-photos');