# Interactive Tree Farewell Website — Full Build Prompt

Copy this entire document as the prompt/spec for your developer or AI coding
assistant (Claude Code, Cursor, v0, etc.). Fill in the `[PLACEHOLDERS]` before
sending.

---

## 1. Project Overview

Build a farewell/tribute website for **[NAME]**, a **Flavor Application
Technologist**, leaving the company after **[X years]**. The centerpiece is a
large interactive tree where every leaf is a farewell message or piece of
advice left by a coworker, with an optional photo attached. The theme should
feel like a warm herb/flavor garden — natural, organic, calm — not corporate.

**Tech stack:**
- Frontend: React (Vite) + TailwindCSS + Framer Motion (or GSAP) for
  animation
- Backend/DB: Supabase (Postgres + Storage + Auth for the admin page)
- Hosting: Vercel or Netlify
- Sound: Howler.js (or native `<audio>`) for optional ambient sound

---

## 2. Visual Direction

- **Background:** soft gradient sky, warm late-afternoon tones — pale peach
  → soft gold → dusty blue at the top. Subtle "dappled light" texture
  (blurred soft-focus light circles) drifting slowly behind the tree canopy
  to suggest sunlight through leaves.
- **Tree:** large SVG tree, centered, trunk in warm brown (#6B4A34) with
  visible bark texture (subtle noise/gradient, not photographic). Canopy
  made of clusters of individually-placed leaf shapes rather than one solid
  blob, so leaves can be added/removed dynamically.
- **Leaf variety:** rotate through 4–6 leaf silhouettes evoking flavor/herb
  ingredients — mint leaf, bay leaf, citrus blossom petal, coffee bean,
  vanilla pod, basil leaf — so the tree visually reads as "made of the
  ingredients she worked with."
- **Color palette:**
  - Background: `#FDF6EC` (cream), `#F6E7D8` (warm sand), `#EAD9C4`
  - Tree trunk: `#6B4A34`, `#8A5E42`
  - Leaves (rotate randomly across a set): `#7C9070` sage, `#9CAF88` olive,
    `#D98E4A` amber, `#C1440E` burnt orange, `#4E6E58` deep green
  - Accent/CTA: `#E07A3F` warm terracotta
  - Text: `#3B2E27` dark warm brown (never pure black)
- **Typography:** a warm serif or rounded display font for headings (e.g.
  "Fraunces" or "Caveat" for handwritten touches), clean sans-serif (e.g.
  "Inter" or "Nunito") for body text and message content.

---

## 3. Page Structure (Public Page)

### 3.1 Hero / Landing section
- Full-viewport intro before the tree is shown.
- Large heading: `"Our Flavor Tree for [NAME]"` (editable via admin).
- Subheading: short tribute line, e.g. `"Every leaf is a taste we shared."`
  (editable via admin).
- CTA button: **"Enter the Garden"** — smooth-scrolls or fades into the
  tree section.
- Soft ambient background audio prompt: a small floating button (see
  Section 6 — Sound) so autoplay is never forced.

### 3.2 The Tree section (main interactive area)
- Centered large SVG tree, responsive (scales down gracefully on mobile;
  consider switching to a vertical/scrollable "tree trunk with leaf
  clusters" layout under ~480px).
- Ground area beneath the tree can show soft grass/flower SVG decoration.
- A **leaf counter** near the top: `"🌿 [count] messages and counting"`.
- **"Add Your Leaf"** button — fixed/floating, always visible (bottom-right
  on desktop, bottom-center sticky bar on mobile).

### 3.3 Footer section
- Closing message (editable via admin), e.g. `"Thank you for every flavor
  you brought to this team. Wishing you the sweetest next chapter."`
- Optional: names/logos of the team, date, small credit line.

---

## 4. Buttons & Interactions

| Element | Action | Behavior |
|---|---|---|
| **"Enter the Garden"** (hero CTA) | Click | Smooth scroll/fade transition into tree section; hero fades out with slight zoom |
| **Leaf (on tree)** | Hover | Leaf gently scales up (1.08x), brightens slightly, subtle rustle/wiggle rotation (±3°), cursor becomes pointer |
| **Leaf (on tree)** | Click | Leaf "detaches" and floats to center as a card (see 4.1), background dims slightly (dark overlay 30–40% opacity) |
| **Message card (opened leaf)** | Click outside / X button | Card fades + shrinks back down, leaf returns to tree position, overlay clears |
| **"Add Your Leaf"** button | Click | Opens a modal/side panel form (Section 5) |
| **Sound toggle** (small icon, corner) | Click | Toggles ambient sound on/off, icon animates between muted/unmuted state |
| **Leaf filter/search** (optional, if message count > ~20) | Click/type | Filter leaves by name; matching leaves glow, others dim to 40% opacity |

### 4.1 Message card (on leaf click)
- Card design: soft rounded card, paper-like texture, small leaf-shape
  accent icon matching the clicked leaf's type.
- Contents: sender's **name**, **role** (e.g. "Packaging Team"), the
  **message/advice text**, and **photo** if one was uploaded (rounded
  corners, soft shadow, max-height so long portraits don't dominate).
- Close via `✕` button top-right or click on the dimmed overlay.

---

## 5. "Add Your Leaf" Form (public submission)

Modal or slide-in panel, triggered by the floating button.

**Fields:**
1. `Name` (text, required)
2. `Role / Team` (text, required) — e.g. "R&D, Sensory Team"
3. `Message` (textarea, required, ~300 char limit shown as a live counter)
4. `Photo` (optional image upload — drag & drop + file picker, preview
   thumbnail before submit, client-side resize/compress before upload)
5. `Leaf type` (optional — let the user pick which leaf silhouette
   represents their message, from the 4–6 available shapes; otherwise
   assign randomly)

**Submit button:** `"Add to the Tree"` — on success, show a short
confirmation animation (a small leaf flies from the form toward the tree
and lands in a semi-random open position on the canopy), then close modal.

**Validation:** required fields inline-validated; image size/type checked
client-side before upload (max ~5MB, jpg/png/webp).

---

## 6. Animation Details

- **Ambient background:** very slow drifting light-bokeh circles behind the
  tree (CSS animation, 40–60s loop, low opacity, no performance cost).
- **Leaf idle motion:** each leaf has a tiny continuous sway (CSS
  `@keyframes`, randomized delay/duration per leaf via inline style so they
  don't all move in sync) — amplitude ~2–4px, rotation ±2°.
- **New leaf entrance:** when a message is added, the new leaf should
  animate in — fade + drop-in with a slight bounce (spring easing), landing
  in an available slot in the canopy.
- **Leaf-to-card transition:** on click, animate the leaf scaling up and
  morphing/fading into the card (Framer Motion `layoutId` shared-element
  transition works well here).
- **Page load:** tree "grows" in on first load — trunk draws in (SVG stroke
  animation), then leaves fade/pop in with a slight stagger (50–100ms
  between each).
- **Scroll-triggered:** hero fades/parallax out as user scrolls into the
  tree section.
- Keep all animations under ~400ms for interactions (feels responsive) and
  respect `prefers-reduced-motion` (disable non-essential motion for those
  users).

---

## 7. Sound (optional, off by default)

- One ambient loop: soft nature/garden ambience (birds, light wind) at low
  volume, OR a gentle warm instrumental loop. Never autoplay with sound on
  page load — always require a user gesture (toggle button).
- Small interaction sounds (optional, subtle):
  - Leaf click open: soft "rustle" or chime (very short, <300ms)
  - Successful message submit: gentle "pop"/"chime"
- All sound effects must be mutable via the same global toggle, stored in
  `localStorage` so the preference persists across visits.

---

## 8. Admin Page

Route: `/admin` (protected — see Auth below).

### 8.1 Auth
- Supabase Auth, email/password, single admin account (or a short allow-list
  of emails). No public sign-up — admin user(s) created manually in
  Supabase dashboard.
- Simple login form; redirect to `/admin` dashboard on success.

### 8.2 Admin capabilities
1. **Site content editor**
   - Edit hero title, hero subtitle, footer closing message
   - Edit `[NAME]`'s display name and role (shown in hero/footer)
   - Upload/replace a hero background image if desired
2. **Messages (leaves) management**
   - Table/grid view of all submitted messages: name, role, message
     excerpt, photo thumbnail, submitted date, leaf type, **approved**
     status
   - Approve / Reject toggle — only **approved** messages render as leaves
     on the public tree (moderation step to prevent spam/inappropriate
     content)
   - Edit any field inline (fix typos, adjust leaf type/position)
   - Delete a message (also deletes its photo from Storage)
3. **Manual add** — admin can add a message on someone's behalf (e.g. from
   an offline card or email)
4. **Export** — button to export all approved messages as CSV/PDF (nice
   keepsake for [NAME] afterward)

### 8.3 Admin UI notes
- Keep this page purely functional (table + forms), doesn't need the
  decorative tree theme — clean dashboard style, light background, clear
  buttons (Approve = green, Reject/Delete = red, Save = terracotta accent
  to match brand).

---

## 9. Supabase Data Structure

### 9.1 Tables

```sql
-- Site-wide editable content (single row table)
create table site_settings (
  id uuid primary key default gen_random_uuid(),
  honoree_name text not null default '[NAME]',
  honoree_role text not null default 'Flavor Application Technologist',
  hero_title text not null default 'Our Flavor Tree for [NAME]',
  hero_subtitle text not null default 'Every leaf is a taste we shared.',
  footer_message text not null default 'Thank you for every flavor you brought to this team.',
  hero_background_url text,
  updated_at timestamptz not null default now()
);

-- Farewell messages ("leaves")
create table messages (
  id uuid primary key default gen_random_uuid(),
  sender_name text not null,
  sender_role text not null,
  message text not null,
  photo_url text,                     -- Supabase Storage public URL, nullable
  leaf_type text not null default 'mint',  -- 'mint' | 'bay' | 'citrus' | 'coffee' | 'vanilla' | 'basil'
  position_x float,                   -- optional: saved canopy position (0-1 normalized)
  position_y float,
  is_approved boolean not null default false,
  created_at timestamptz not null default now()
);

-- Admin users are managed via Supabase Auth (auth.users) directly;
-- no custom table needed unless you want role differentiation.
```

### 9.2 Storage bucket

- Bucket name: `farewell-photos`
- Public read access (so photos render on the public tree)
- Insert restricted to `anon` role via RLS policy scoped to the `messages`
  submit flow (or via a serverless function if you want stricter control)
- Recommended: client resizes images to max ~1600px before upload to keep
  storage/bandwidth low.

### 9.3 Row Level Security (RLS) — suggested policies

```sql
alter table messages enable row level security;

-- Public can insert new messages (pending approval)
create policy "Public can submit messages"
  on messages for insert
  to anon
  with check (is_approved = false);

-- Public can only read approved messages
create policy "Public can read approved messages"
  on messages for select
  to anon
  using (is_approved = true);

-- Authenticated (admin) can do everything
create policy "Admin full access"
  on messages for all
  to authenticated
  using (true)
  with check (true);

alter table site_settings enable row level security;

create policy "Public can read site settings"
  on site_settings for select
  to anon
  using (true);

create policy "Admin can update site settings"
  on site_settings for all
  to authenticated
  using (true)
  with check (true);
```

---

## 10. `.env` Template

```env
# Supabase
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

# Only needed if using a serverless function for moderation/admin actions
SUPABASE_SERVICE_ROLE_KEY=

# Optional: analytics
VITE_ANALYTICS_ID=

# Site config
VITE_SITE_TITLE="Our Flavor Tree"
```

---

## 11. Responsive / Accessibility Notes

- Mobile (<480px): consider a simplified layout — tree canopy stacked as
  scrollable rows of leaf "clusters" rather than one giant SVG, so leaves
  stay tappable (min touch target 44x44px).
- All interactive elements need visible focus states for keyboard nav.
- Alt text on all uploaded photos (fallback: `"[sender_name]'s photo"`).
- Respect `prefers-reduced-motion`.
- Color contrast: verify text on leaf/card backgrounds meets WCAG AA.

---

## 12. Suggested Build Order

1. Supabase project setup — run SQL above, create storage bucket, seed
   `site_settings` with one row.
2. Static tree SVG + hero section (no data yet).
3. Public message form → Supabase insert (unapproved by default).
4. Fetch + render approved messages as leaves on the tree.
5. Leaf click → message card interaction + animations.
6. Admin login + dashboard (approve/reject/edit/delete, export).
7. Sound toggle + ambient audio.
8. Polish: entrance animations, mobile layout, reduced-motion fallback.
