# Blog Database Schema Reference

## Table: `posts`

The main blog post table. All fields listed with types and defaults.

| Column            | Type              | Default                             | Notes                                      |
| ----------------- | ----------------- | ----------------------------------- | ------------------------------------------ |
| `id`              | bigint (identity) | auto                                | Primary key                                |
| `slug`            | text              | —                                   | **UNIQUE**, required                       |
| `title`           | text              | —                                   | Required                                   |
| `excerpt`         | text              | `''`                                | Short preview for cards                    |
| `content`         | text              | `''`                                | HTML body (articles)                       |
| `post_type`       | text              | `'article'`                         | `'video'` \| `'article'` \| `'case-study'` |
| `category`        | text              | `'Strategy'`                        | Must match `categories` table              |
| `tags`            | text[]            | `'{}'`                              | Array of lowercase tags                    |
| `featured_image`  | text              | NULL                                | Primary image URL                          |
| `youtube_id`      | text              | NULL                                | YouTube video ID (video/case-study)        |
| `cover_image`     | text              | NULL                                | Article cover image                        |
| `hero_image`      | text              | NULL                                | Case study hero image                      |
| `date`            | date              | `CURRENT_DATE`                      | Publication date                           |
| `read_time`       | text              | `'5 min'`                           | Estimated read time                        |
| `featured`        | boolean           | `false`                             | Show in featured section                   |
| `status`          | text              | `'draft'`                           | `'draft'` \| `'published'`                 |
| `author`          | text              | `'Humberto Garcia'`                 | Author name                                |
| `author_title`    | text              | `'Founder, Photography to Profits'` | Author role                                |
| `author_bio`      | text              | NULL                                | Defaults in frontend if NULL               |
| `intro`           | text              | NULL                                | Opening paragraph (video posts)            |
| `outro`           | text              | NULL                                | Closing paragraph (video posts)            |
| `client_name`     | text              | NULL                                | Case study client                          |
| `genre`           | text              | NULL                                | Case study genre                           |
| `pull_quote`      | text              | NULL                                | Case study highlight quote                 |
| `story`           | text              | NULL                                | Case study narrative (HTML)                |
| `seo_title`       | text              | NULL                                | Custom SEO title (50-60 chars)             |
| `seo_description` | text              | NULL                                | Custom meta description (150-160 chars)    |
| `og_image_url`    | text              | NULL                                | Open Graph image URL                       |
| `canonical_url`   | text              | NULL                                | Canonical URL override                     |
| `updated_at`      | timestamptz       | auto-trigger                        | Set by `posts_updated_at` trigger          |
| `created_at`      | timestamptz       | `now()`                             | Creation timestamp                         |

**Indexes**: `slug`, `status`, `date DESC`

---

## Table: `post_insights`

Key takeaways for video posts. Displayed as numbered cards.

| Column       | Type              | Notes                               |
| ------------ | ----------------- | ----------------------------------- |
| `id`         | bigint (identity) | Primary key                         |
| `post_id`    | bigint            | FK → `posts.id` ON DELETE CASCADE   |
| `num`        | text              | Display number, e.g. `'01'`, `'02'` |
| `title`      | text              | Insight heading                     |
| `body`       | text              | Insight explanation                 |
| `sort_order` | integer           | Display order (0-based)             |

---

## Table: `post_resources`

External links and related content. Used for all post types and for interlinking.

| Column        | Type              | Notes                                                    |
| ------------- | ----------------- | -------------------------------------------------------- |
| `id`          | bigint (identity) | Primary key                                              |
| `post_id`     | bigint            | FK → `posts.id` ON DELETE CASCADE                        |
| `title`       | text              | Link text                                                |
| `url`         | text              | Full URL (external) or path (internal like `/blog/slug`) |
| `description` | text              | Brief description (nullable)                             |
| `sort_order`  | integer           | Display order (0-based)                                  |

---

## Table: `post_transcripts`

Timestamped transcript segments for video and case-study posts.

| Column       | Type              | Notes                              |
| ------------ | ----------------- | ---------------------------------- |
| `id`         | bigint (identity) | Primary key                        |
| `post_id`    | bigint            | FK → `posts.id` ON DELETE CASCADE  |
| `time`       | text              | Timestamp, e.g. `'0:00'`, `'2:15'` |
| `text`       | text              | Transcript text for this segment   |
| `sort_order` | integer           | Display order (0-based)            |

---

## Table: `post_stats`

Achievement metrics for case study posts. Displayed as stat cards.

| Column       | Type              | Notes                                       |
| ------------ | ----------------- | ------------------------------------------- |
| `id`         | bigint (identity) | Primary key                                 |
| `post_id`    | bigint            | FK → `posts.id` ON DELETE CASCADE           |
| `value`      | text              | The metric, e.g. `'$50K'`, `'3x'`, `'200%'` |
| `label`      | text              | What the metric measures                    |
| `sort_order` | integer           | Display order (0-based)                     |

---

## Table: `categories`

Seeded category options. Posts reference these by name.

| Name         | ID  |
| ------------ | --- |
| All          | 1   |
| Strategy     | 2   |
| Case Studies | 3   |
| Education    | 4   |
| SEO          | 5   |
| Video        | 6   |
| Tools        | 7   |

---

## RLS Summary

| Table              | Public                            | Admin            |
| ------------------ | --------------------------------- | ---------------- |
| `posts`            | SELECT where `status='published'` | ALL              |
| `post_insights`    | SELECT (all)                      | via service role |
| `post_resources`   | SELECT (all)                      | via service role |
| `post_transcripts` | SELECT (all)                      | via service role |
| `post_stats`       | SELECT (all)                      | via service role |
| `categories`       | SELECT (all)                      | via service role |

The Supabase MCP's `execute_sql` uses the service role key, so all operations
bypass RLS entirely. This is the correct approach for admin content management.

---

## Storage: `blog-media` Bucket

- **Public read**: Anyone can view images
- **Admin write/update/delete**: Requires `is_admin()` or service role
- **URL pattern**: `https://<project>.supabase.co/storage/v1/object/public/blog-media/<path>`

Use for custom featured images, cover images, and hero images.
For video posts, the YouTube thumbnail is usually sufficient:
`https://img.youtube.com/vi/<youtube_id>/maxresdefault.jpg`
