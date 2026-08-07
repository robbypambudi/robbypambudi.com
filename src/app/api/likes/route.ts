import { NextResponse } from 'next/server';

import { getSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

const DEFAULT_TARGET = 'portfolio';

export async function GET(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      {
        configured: false,
        like_count: 0,
        already_liked: false,
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
  const target = searchParams.get('target')?.trim() || DEFAULT_TARGET;
  const visitorId = searchParams.get('visitorId')?.trim() || null;

  const { data, error } = await supabase.rpc('get_like_status', {
    p_slug: target,
    p_visitor_id: visitorId,
  });

  if (error) {
    return NextResponse.json(
      { error: error.message, configured: true },
      { status: 500 },
    );
  }

  return NextResponse.json({
    configured: true,
    target,
    like_count: Number(data?.like_count ?? 0),
    already_liked: Boolean(data?.already_liked),
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

  let body: { target?: string; visitorId?: string } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const target = body.target?.trim() || DEFAULT_TARGET;
  const visitorId = body.visitorId?.trim();

  if (!visitorId || visitorId.length < 8) {
    return NextResponse.json(
      { error: 'visitorId is required' },
      { status: 400 },
    );
  }

  const { data, error } = await supabase.rpc('toggle_or_add_like', {
    p_slug: target,
    p_visitor_id: visitorId,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    configured: true,
    target,
    like_count: Number(data?.like_count ?? 0),
    already_liked: Boolean(data?.already_liked),
    just_liked: Boolean(data?.just_liked),
  });
}
