'use client';

import { IconEye } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as React from 'react';

import { useIsClient } from '@/hooks/use-is-client';
import { cn } from '@/lib/utils';
import { getOrCreateVisitorId } from '@/lib/visitor-id';

type ViewsResponse = {
  configured: boolean;
  views?: Record<string, number>;
  view_count?: number;
  counted?: boolean;
  error?: string;
};

function formatCount(n: number) {
  return new Intl.NumberFormat('en', {
    notation: n >= 1000 ? 'compact' : 'standard',
    maximumFractionDigits: 1,
  }).format(n);
}

type ArticleViewCountProps = {
  slug: string;
  /** When true, records a unique view for this visitor. */
  record?: boolean;
  className?: string;
  initialCount?: number;
};

export default function ArticleViewCount({
  slug,
  record = false,
  className,
  initialCount = 0,
}: ArticleViewCountProps) {
  const isClient = useIsClient();
  const queryClient = useQueryClient();
  const visitorId = React.useMemo(
    () => (isClient ? getOrCreateVisitorId() : ''),
    [isClient],
  );
  const queryKey = ['article-views', slug] as const;
  const recordedKey = `rp_viewed_${slug}`;
  const hasRequestedRef = React.useRef(false);

  const { data } = useQuery({
    queryKey,
    queryFn: async (): Promise<ViewsResponse> => {
      const res = await fetch(`/api/views?slug=${encodeURIComponent(slug)}`, {
        method: 'GET',
        cache: 'no-store',
      });
      return (await res.json()) as ViewsResponse;
    },
    enabled: isClient,
    staleTime: 60_000,
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/views', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, visitorId }),
      });
      const json = (await res.json()) as ViewsResponse & { error?: string };
      if (!res.ok) {
        throw new Error(json.error || 'Failed to record view');
      }
      return json;
    },
    onSuccess: (result) => {
      queryClient.setQueryData(queryKey, {
        configured: true,
        view_count: result.view_count,
        views: { [slug]: result.view_count ?? 0 },
      });
      try {
        window.sessionStorage.setItem(recordedKey, '1');
      } catch {
        // ignore storage errors
      }
    },
  });

  const recordView = mutation.mutate;

  React.useEffect(() => {
    if (!record || !isClient || !visitorId || hasRequestedRef.current) return;

    let alreadyRecorded = false;
    try {
      alreadyRecorded = window.sessionStorage.getItem(recordedKey) === '1';
    } catch {
      alreadyRecorded = false;
    }

    if (alreadyRecorded) return;

    hasRequestedRef.current = true;
    recordView();
  }, [record, isClient, visitorId, recordedKey, recordView]);

  const count = Number(data?.view_count ?? data?.views?.[slug] ?? initialCount);

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 text-sm text-foreground/60',
        className,
      )}
      aria-label={`${formatCount(count)} views`}
    >
      <IconEye className='size-4 shrink-0' aria-hidden='true' />
      <span className='tabular-nums'>{formatCount(count)}</span>
      <span className='sr-only'>views</span>
    </span>
  );
}
