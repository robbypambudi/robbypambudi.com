import { NextResponse } from 'next/server';

import { getSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

export async function GET(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      {
        configured: false,
        views: {},
        message: 'Supabase is not configured',
      },
      { status: 200 },
    );
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { error: 'Supabase client unavailable' },
      { status: 500 },
    );
  }

  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug')?.trim();
  const slugsParam = searchParams.get('slugs')?.trim();

  const slugs = slug
    ? [slug]
    : slugsParam
      ? slugsParam
          .split(',')
          .map((value) => value.trim())
          .filter(Boolean)
      : [];

  if (slugs.length === 0) {
    return NextResponse.json(
      { error: 'slug or slugs is required' },
      { status: 400 },
    );
  }

  const { data, error } = await supabase.rpc('get_article_view_counts', {
    p_slugs: slugs,
  });

  if (error) {
    return NextResponse.json(
      { error: error.message, configured: true },
      { status: 500 },
    );
  }

  const views = (data ?? {}) as Record<string, number>;

  return NextResponse.json({
    configured: true,
    views,
    view_count: slug ? Number(views[slug] ?? 0) : undefined,
  });
}

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: 'Supabase is not configured' },
      { status: 503 },
    );
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { error: 'Supabase client unavailable' },
      { status: 500 },
    );
  }

  let body: { slug?: string; visitorId?: string } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const slug = body.slug?.trim();
  const visitorId = body.visitorId?.trim();

  if (!slug) {
    return NextResponse.json({ error: 'slug is required' }, { status: 400 });
  }

  if (!visitorId || visitorId.length < 8) {
    return NextResponse.json(
      { error: 'visitorId is required' },
      { status: 400 },
    );
  }

  const { data, error } = await supabase.rpc('record_article_view', {
    p_slug: slug,
    p_visitor_id: visitorId,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    configured: true,
    slug,
    view_count: Number(data?.view_count ?? 0),
    counted: Boolean(data?.counted),
  });
}
