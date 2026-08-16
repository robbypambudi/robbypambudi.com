# Supabase Like Counter

## Setup

1. Buat project di [supabase.com](https://supabase.com).
2. Buka **SQL Editor**, paste & run isi file [`supabase/schema.sql`](./schema.sql).
3. Untuk view counter artikel, jalankan juga [`supabase/article-views.sql`](./article-views.sql).
4. Di **Settings → API**, salin:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` `public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Tambahkan ke `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
```

6. Restart `pnpm dev`.

## Behavior

### Likes

- Counter global target: `portfolio`
- 1 like / visitor (disimpan di `localStorage` + unik di table `like_events`)
- UI di Hero + Footer
- API: `GET/POST /api/likes`

### Article views

- 1 view / visitor / artikel (unik di `article_view_events`)
- Ditampilkan di `/articles` (list) dan `/articles/[slug]` (detail + record)
- API: `GET/POST /api/views`

Tanpa env Supabase, tombol/view tetap tampil dengan count 0.
