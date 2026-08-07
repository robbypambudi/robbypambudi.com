# Supabase Like Counter

## Setup

1. Buat project di [supabase.com](https://supabase.com).
2. Buka **SQL Editor**, paste & run isi file [`supabase/schema.sql`](./schema.sql).
3. Di **Settings → API**, salin:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` `public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Tambahkan ke `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
```

5. Restart `pnpm dev`.

## Behavior

- Counter global target: `portfolio`
- 1 like / visitor (disimpan di `localStorage` + unik di table `like_events`)
- UI di Hero + Footer
- API: `GET/POST /api/likes`

Tanpa env Supabase, tombol tetap tampil tapi disabled (count 0).
