-- Run this in Supabase SQL Editor (Dashboard → SQL → New query)

-- Counter per target (portfolio, project slug, etc.)
create table if not exists public.like_targets (
  slug text primary key,
  like_count bigint not null default 0 check (like_count >= 0),
  updated_at timestamptz not null default now()
);

-- One like per visitor per target
create table if not exists public.like_events (
  id uuid primary key default gen_random_uuid(),
  target_slug text not null references public.like_targets (slug) on delete cascade,
  visitor_id text not null,
  created_at timestamptz not null default now(),
  constraint like_events_target_visitor_unique unique (target_slug, visitor_id)
);

create index if not exists like_events_target_slug_idx
  on public.like_events (target_slug);

-- Seed the global portfolio counter
insert into public.like_targets (slug, like_count)
values ('portfolio', 0)
on conflict (slug) do nothing;

-- Read counters publicly
alter table public.like_targets enable row level security;
alter table public.like_events enable row level security;

drop policy if exists "Public read like_targets" on public.like_targets;
create policy "Public read like_targets"
  on public.like_targets
  for select
  to anon, authenticated
  using (true);

-- No direct inserts/updates from clients — only via RPC
revoke insert, update, delete on public.like_targets from anon, authenticated;
revoke insert, update, delete on public.like_events from anon, authenticated;
revoke select on public.like_events from anon, authenticated;

-- Atomic like: returns { like_count, already_liked, just_liked }
create or replace function public.toggle_or_add_like(
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

  -- Ensure target row exists
  insert into public.like_targets (slug)
  values (p_slug)
  on conflict (slug) do nothing;

  select exists (
    select 1
    from public.like_events
    where target_slug = p_slug
      and visitor_id = p_visitor_id
  ) into v_exists;

  if v_exists then
    select like_count into v_count
    from public.like_targets
    where slug = p_slug;

    return jsonb_build_object(
      'like_count', v_count,
      'already_liked', true,
      'just_liked', false
    );
  end if;

  insert into public.like_events (target_slug, visitor_id)
  values (p_slug, p_visitor_id);

  update public.like_targets
  set like_count = like_count + 1,
      updated_at = now()
  where slug = p_slug
  returning like_count into v_count;

  return jsonb_build_object(
    'like_count', v_count,
    'already_liked', false,
    'just_liked', true
  );
end;
$$;

revoke all on function public.toggle_or_add_like(text, text) from public;
grant execute on function public.toggle_or_add_like(text, text) to anon, authenticated;

-- Optional: check whether this visitor already liked
create or replace function public.get_like_status(
  p_slug text,
  p_visitor_id text default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_count bigint := 0;
  v_liked boolean := false;
begin
  select coalesce(like_count, 0) into v_count
  from public.like_targets
  where slug = p_slug;

  if p_visitor_id is not null and length(trim(p_visitor_id)) >= 8 then
    select exists (
      select 1
      from public.like_events
      where target_slug = p_slug
        and visitor_id = p_visitor_id
    ) into v_liked;
  end if;

  return jsonb_build_object(
    'like_count', coalesce(v_count, 0),
    'already_liked', v_liked
  );
end;
$$;

revoke all on function public.get_like_status(text, text) from public;
grant execute on function public.get_like_status(text, text) to anon, authenticated;
