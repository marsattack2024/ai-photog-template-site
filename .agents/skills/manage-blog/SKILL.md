---
name: manage-blog
description: >
  Manage P2P blog content in Supabase — create, update, and publish blog posts
  (articles, video posts, case studies) directly via the Supabase MCP. Use this
  skill whenever the user wants to: add a new blog post, publish a draft, update
  an existing post, convert a YouTube video into a blog post, add a transcript,
  interlink between blog pages, manage blog SEO, check what's published, or do
  anything related to blog content management. Also trigger when the user shares
  a YouTube URL, video transcript, or says things like "new blog", "publish this",
  "update the blog about X", "add a post", "blog from this video", or "link these
  posts together".
---

# Blog Content Management

This skill manages P2P blog content directly in Supabase using the Supabase MCP.
No backend server is needed — all operations go through `execute_sql` which uses
the service role key and bypasses RLS.

## Before You Start

1. Read `references/schema.md` in this skill directory — it has the exact table
   structures and column definitions you need for every SQL statement.
2. Confirm the Supabase MCP is connected by checking for `mcp__claude_ai_Supabase__execute_sql`
   in your available tools. If it's not available, tell the user to connect the
   Supabase MCP in their Codex settings.

## Core Workflow

### Step 1: Understand What the User Wants

Blog posts come in three types. Ask which one if unclear:

| Type           | When to use                   | Key fields                                           |
| -------------- | ----------------------------- | ---------------------------------------------------- |
| **article**    | Written content, guides, tips | `content` (HTML body)                                |
| **video**      | YouTube video breakdowns      | `youtube_id`, insights, transcript                   |
| **case-study** | Client success stories        | `client_name`, `genre`, stats, `pull_quote`, `story` |

### Step 2: Gather Content

**For articles**: The user provides the text. Convert it to clean HTML for the
`content` field. Use semantic tags (`<h2>`, `<p>`, `<ul>`, `<blockquote>`) — the
frontend renders this with DOMPurify sanitization.

**For YouTube videos**: The user provides a YouTube URL or video ID. Extract:

- `youtube_id` from the URL (the `v=` parameter or path after `youtu.be/`)
- Title and description (user provides or you extract from the URL)
- Transcript — **auto-fetch using Python** (see Step 2b below)

### Step 2b: Auto-Fetch YouTube Transcript (CRITICAL — DO NOT SKIP)

The `youtube-transcript-api` Python package is installed globally (`pip3`). Use it
to automatically pull transcripts — **never ask the user to paste a transcript**.

```bash
python3 -c "
from youtube_transcript_api import YouTubeTranscriptApi
ytt_api = YouTubeTranscriptApi()
transcript = ytt_api.fetch('VIDEO_ID_HERE')
for entry in transcript:
    mins = int(entry.start // 60)
    secs = int(entry.start % 60)
    print(f'{mins}:{secs:02d} {entry.text}')
"
```

**Processing the raw transcript:**

- Raw YouTube captions are fragmented (1 line per ~2 seconds) — unusable as-is
- Group into ~5-minute chunks and **summarize** each chunk into 2-4 coherent sentences
- This produces readable transcript segments for the blog post
- Extract 4-7 key insights from the full transcript for `post_insights`
- Write a compelling `intro` and `outro` based on the video content

**If the transcript fetch fails** (video has no captions, or API error):

- Fall back to asking the user for the transcript
- Note it as a TODO in the post for later addition

**For case studies**: Gather client name, genre, stats (value/label pairs),
a pull quote, and the story narrative.

### Step 3: Generate the Slug

Create a URL-friendly slug from the title:

- Lowercase, hyphens instead of spaces
- Remove special characters
- Keep it concise (3-6 words ideal)
- Check it doesn't already exist: query `SELECT slug FROM posts WHERE slug = '<slug>'`

### Step 4: Generate SEO Metadata

For every post, generate:

- `seo_title`: 50-60 chars, include primary keyword (defaults to title if not set)
- `seo_description`: 150-160 chars, compelling summary with keyword
- `excerpt`: 1-2 sentence preview for blog listing cards
- `category`: Must be one of: Strategy, Case Studies, Education, SEO, Video, Tools
- `tags`: Array of relevant tags (lowercase)
- `read_time`: Estimate based on word count (~250 words/min)

### Step 5: Insert the Post

Use `mcp__claude_ai_Supabase__execute_sql` for all database operations.

**Insert the main post row first** — you need the returned `id` for relation tables.

**CRITICAL: The `id` column has NO auto-increment.** You must manually assign it:

```sql
-- First, get the next available ID:
SELECT MAX(id) FROM posts;
-- Use MAX + 1 as the new id
```

```sql
INSERT INTO posts (
  id, slug, title, excerpt, content, post_type, category, tags,
  featured_image, youtube_id, cover_image, hero_image,
  date, read_time, featured, status,
  author, author_title, author_bio,
  intro, outro, client_name, genre, pull_quote, story,
  seo_title, seo_description, og_image_url, canonical_url
) VALUES (
  <next_id>, '<slug>', '<title>', '<excerpt>', '<content>', '<post_type>',
  '<category>', ARRAY['<tag1>', '<tag2>'],
  '<featured_image_url>', '<youtube_id>', '<cover_image_url>', '<hero_image_url>',
  '<YYYY-MM-DD>', '<N min>', false, 'draft',
  'Humberto Garcia', 'Founder, Photography to Profits', NULL,
  '<intro>', '<outro>', '<client_name>', '<genre>', '<pull_quote>', '<story>',
  '<seo_title>', '<seo_description>', '<og_image_url>', NULL
)
RETURNING id;
```

**Always start as 'draft'** — publish is a separate, deliberate step.

**For video posts**: Use the YouTube thumbnail as featured_image if none provided:
`https://img.youtube.com/vi/<youtube_id>/maxresdefault.jpg`

### Step 6: Insert Related Data

After getting the post `id`, insert related rows as needed:

**Insights** (video posts — key takeaways from the video):

```sql
INSERT INTO post_insights (post_id, num, title, body, sort_order) VALUES
  (<id>, '01', 'Insight Title', 'Insight explanation...', 0),
  (<id>, '02', 'Another Insight', 'More detail...', 1);
```

**Resources** (any post type — links to tools, references, related content):

```sql
INSERT INTO post_resources (post_id, title, url, description, sort_order) VALUES
  (<id>, 'Resource Name', 'https://...', 'Brief description', 0);
```

**Transcript** (video and case-study posts):

```sql
INSERT INTO post_transcripts (post_id, time, text, sort_order) VALUES
  (<id>, '0:00', 'First segment of transcript...', 0),
  (<id>, '2:15', 'Next segment...', 1);
```

**Stats** (case studies only — achievement metrics):

```sql
INSERT INTO post_stats (post_id, value, label, sort_order) VALUES
  (<id>, '$50K', 'Revenue increase', 0),
  (<id>, '3x', 'Booking rate', 1);
```

### Step 7: Verify the Post

After inserting, query the post back to confirm it looks right:

```sql
SELECT id, slug, title, post_type, status, date, category,
       seo_title, seo_description
FROM posts WHERE slug = '<slug>';
```

Show the user a summary of what was created.

### Step 8: Publish (When Ready)

Only publish when the user explicitly says to:

```sql
UPDATE posts SET status = 'published' WHERE slug = '<slug>';
```

**CRITICAL — Date rule:** Always use today's date for new posts unless the user
explicitly requests a historical date. The blog listing sorts by `date DESC` — a
historical date buries the post below 70+ entries and makes it invisible.

After publishing:

1. The blog listing page (`/blog`) shows it **immediately** via client-side Supabase fetch
2. But the individual post URL (`/blog/<slug>`) does NOT exist until a **Vercel deploy**
3. **Always deploy after publishing** — run `npx vercel --prod` or `/deploy`
4. The deploy prerenders the new route and adds it to the sitemap

**Two-layer data model:**

- **Listing page** = live Supabase query (instant updates, no deploy needed)
- **Post pages** = prerendered static HTML (deploy required for new/updated/deleted posts)

---

## Updating Existing Posts

When the user wants to update a post:

1. **Find it first**: `SELECT id, slug, title, post_type, status FROM posts WHERE slug LIKE '%<keyword>%' OR title ILIKE '%<keyword>%';`
2. **Show what exists** so the user can confirm which post to update
3. **Update only the fields that changed** — use targeted UPDATE statements
4. **For relation tables** (insights, resources, transcripts, stats): delete existing rows and re-insert. This is simpler and safer than trying to diff individual rows:
   ```sql
   DELETE FROM post_insights WHERE post_id = <id>;
   INSERT INTO post_insights (post_id, num, title, body, sort_order) VALUES ...;
   ```

---

## YouTube Video to Blog Post

This is the most common workflow. When the user shares a YouTube video:

1. **Extract the video ID** from the URL
   - `youtube.com/watch?v=VIDEO_ID`
   - `youtu.be/VIDEO_ID`
   - `youtube.com/embed/VIDEO_ID`

2. **Auto-fetch the transcript** using Python (Step 2b above). This is NOT
   optional — always fetch automatically before asking the user for anything.

3. **Get video metadata**: Title and description from the user, or infer from
   the transcript content if the user only provided the URL.

4. **Create the post as type "video"** with:
   - `youtube_id` set
   - `featured_image` = YouTube thumbnail URL
   - `intro` = compelling hook based on the video description
   - `insights` = 4-7 key takeaways extracted from the transcript
   - `outro` = call to action or closing thought
   - `transcript` = timestamped segments
   - `resources` = any links mentioned in the video

5. **Generate SEO metadata** optimized for the video topic

---

## Interlinking Between Posts

When the user asks to interlink posts or you notice interlinking opportunities:

### For Article Posts (HTML content)

Add internal links directly in the `content` HTML:

```html
<p>
  As we covered in our guide on
  <a href="/blog/pricing-strategies-for-photographers">pricing strategies</a>,
  setting the right rates is crucial.
</p>
```

### For Video/Case-Study Posts (structured fields)

Add cross-references via the `post_resources` table:

```sql
INSERT INTO post_resources (post_id, title, url, description, sort_order) VALUES
  (<this_post_id>, 'Related: Pricing Strategies Guide', '/blog/pricing-strategies-for-photographers',
   'Deep dive into setting rates that reflect your value', 0);
```

### Finding Interlinking Opportunities

Query existing posts to find related content:

```sql
SELECT slug, title, category, tags, excerpt
FROM posts
WHERE status = 'published'
  AND slug != '<current_slug>'
  AND (
    category = '<current_category>'
    OR tags && ARRAY['<tag1>', '<tag2>']
  )
ORDER BY date DESC
LIMIT 10;
```

Suggest 2-3 relevant interlinks per post. Interlinking helps SEO and keeps
readers on the site longer.

---

## Quick Reference Commands

| Task             | Key SQL                                                                          |
| ---------------- | -------------------------------------------------------------------------------- |
| List all posts   | `SELECT id, slug, title, post_type, status, date FROM posts ORDER BY date DESC;` |
| List drafts      | `SELECT id, slug, title FROM posts WHERE status = 'draft' ORDER BY date DESC;`   |
| Find by keyword  | `SELECT id, slug, title FROM posts WHERE title ILIKE '%keyword%';`               |
| Publish          | `UPDATE posts SET status = 'published' WHERE slug = '<slug>';`                   |
| Unpublish        | `UPDATE posts SET status = 'draft' WHERE slug = '<slug>';`                       |
| Delete           | `DELETE FROM posts WHERE slug = '<slug>';` (cascades to all relations)           |
| Check categories | `SELECT name FROM categories ORDER BY id;`                                       |

---

## Content Guidelines for P2P

When writing or editing blog content for Photography to Profits:

- **Voice**: Authoritative but approachable. Humberto speaks as a mentor, not a lecturer.
- **Audience**: Professional photographers who want to grow their business
- **Topics**: Pricing, marketing, client experience, business systems, mindset, SEO
- **Author defaults**: Humberto Garcia / Founder, Photography to Profits
- **CTAs**: Link to P2P programs, free resources, or related blog posts
- **Images**: Use the `blog-media` Supabase storage bucket for custom images,
  or YouTube thumbnails for video posts

---

## Future: MCP/API Integration

The current approach (Supabase MCP `execute_sql`) works perfectly for Codex
sessions. When you're ready to build a separate interface:

- The same SQL patterns work via any Supabase client library
- The `anon` key + RLS restricts public reads to published posts only
- Admin operations need the `service_role` key (what the MCP uses)
- No schema changes needed — the tables support all current and planned workflows
