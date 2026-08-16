-- Article view counters (run in Supabase SQL Editor after likes schema)

create table if not exists public.article_views (
  slug text primary key,
  view_count bigint not null default 0 check (view_count >= 0),
  updated_at timestamptz not null default now()
);

-- One counted view per visitor per article
create table if not exists public.article_view_events (
  id uuid primary key default gen_random_uuid(),
  article_slug text not null references public.article_views (slug) on delete cascade,
  visitor_id text not null,
  created_at timestamptz not null default now(),
  constraint article_view_events_slug_visitor_unique unique (article_slug, visitor_id)
);

create index if not exists article_view_events_slug_idx
  on public.article_view_events (article_slug);

alter table public.article_views enable row level security;
alter table public.article_view_events enable row level security;

drop policy if exists "Public read article_views" on public.article_views;
create policy "Public read article_views"
  on public.article_views
  for select
  to anon, authenticated
  using (true);

revoke insert, update, delete on public.article_views from anon, authenticated;
revoke insert, update, delete on public.article_view_events from anon, authenticated;
revoke select on public.article_view_events from anon, authenticated;

-- Record a unique view; returns { view_count, counted }
create or replace function public.record_article_view(
  p_slug text,
  p_visitor_id text
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_count bigint;
  v_exists boolean;
begin
  if p_slug is null or length(trim(p_slug)) = 0 then
    raise exception 'slug required';
  end if;

  if p_visitor_id is null or length(trim(p_visitor_id)) < 8 then
    raise exception 'visitor_id required';
  end if;

  insert into public.article_views (slug)
  values (p_slug)
  on conflict (slug) do nothing;

  select exists (
    select 1
    from public.article_view_events
    where article_slug = p_slug
      and visitor_id = p_visitor_id
  ) into v_exists;

  if v_exists then
    select view_count into v_count
    from public.article_views
    where slug = p_slug;

    return jsonb_build_object(
      'view_count', v_count,
      'counted', false
    );
  end if;

  insert into public.article_view_events (article_slug, visitor_id)
  values (p_slug, p_visitor_id);

  update public.article_views
  set view_count = view_count + 1,
      updated_at = now()
  where slug = p_slug
  returning view_count into v_count;

  return jsonb_build_object(
    'view_count', v_count,
    'counted', true
  );
end;
$$;

revoke all on function public.record_article_view(text, text) from public;
grant execute on function public.record_article_view(text, text) to anon, authenticated;

-- Read one or many view counts
create or replace function public.get_article_view_counts(
  p_slugs text[]
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_result jsonb := '{}'::jsonb;
  v_slug text;
  v_count bigint;
begin
  if p_slugs is null then
    return v_result;
  end if;

  foreach v_slug in array p_slugs loop
    select coalesce(view_count, 0) into v_count
    from public.article_views
    where slug = v_slug;

    v_result := v_result || jsonb_build_object(v_slug, coalesce(v_count, 0));
  end loop;

  return v_result;
end;
$$;

revoke all on function public.get_article_view_counts(text[]) from public;
grant execute on function public.get_article_view_counts(text[]) to anon, authenticated;
