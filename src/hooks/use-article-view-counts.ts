'use client';

import { useQuery } from '@tanstack/react-query';

import { useIsClient } from '@/hooks/use-is-client';

type ViewsResponse = {
  configured: boolean;
  views?: Record<string, number>;
};

export function useArticleViewCounts(slugs: string[]) {
  const isClient = useIsClient();
  const key = slugs.slice().sort().join(',');

  return useQuery({
    queryKey: ['article-views-batch', key],
    queryFn: async (): Promise<Record<string, number>> => {
      if (slugs.length === 0) return {};
      const res = await fetch(
        `/api/views?slugs=${encodeURIComponent(slugs.join(','))}`,
        { method: 'GET', cache: 'no-store' },
      );
      const json = (await res.json()) as ViewsResponse;
      return json.views ?? {};
    },
    enabled: isClient && slugs.length > 0,
    staleTime: 60_000,
  });
}
