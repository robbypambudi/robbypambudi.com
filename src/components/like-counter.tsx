'use client';

import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { motion } from 'motion/react';
import * as React from 'react';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { useIsClient } from '@/hooks/use-is-client';
import { cn } from '@/lib/utils';

const VISITOR_KEY = 'rp_visitor_id';
const DEFAULT_TARGET = 'portfolio';

type LikeStatus = {
  configured: boolean;
  like_count: number;
  already_liked: boolean;
  just_liked?: boolean;
  message?: string;
  error?: string;
};

function getOrCreateVisitorId() {
  if (typeof window === 'undefined') return '';

  const existing = window.localStorage.getItem(VISITOR_KEY);
  if (existing && existing.length >= 8) return existing;

  const id =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `v_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;

  window.localStorage.setItem(VISITOR_KEY, id);
  return id;
}

function formatCount(n: number) {
  return new Intl.NumberFormat('en', {
    notation: n >= 1000 ? 'compact' : 'standard',
    maximumFractionDigits: 1,
  }).format(n);
}

async function fetchLikeStatus(
  target: string,
  visitorId: string,
): Promise<LikeStatus> {
  const params = new URLSearchParams({ target });
  if (visitorId) params.set('visitorId', visitorId);

  const res = await fetch(`/api/likes?${params.toString()}`, {
    method: 'GET',
    cache: 'no-store',
  });
  const json = (await res.json()) as LikeStatus;
  if (!res.ok) {
    throw new Error(json.error || 'Failed to load likes');
  }
  return json;
}

async function postLike(
  target: string,
  visitorId: string,
): Promise<LikeStatus> {
  const res = await fetch('/api/likes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ target, visitorId }),
  });
  const json = (await res.json()) as LikeStatus & { error?: string };
  if (!res.ok) {
    throw new Error(json.error || 'Failed to send like');
  }
  return json;
}

type LikeCounterProps = {
  target?: string;
  className?: string;
  compact?: boolean;
};

export default function LikeCounter({
  target = DEFAULT_TARGET,
  className,
  compact = false,
}: LikeCounterProps) {
  const queryClient = useQueryClient();
  const isClient = useIsClient();
  const visitorId = React.useMemo(
    () => (isClient ? getOrCreateVisitorId() : ''),
    [isClient],
  );

  const queryKey = ['likes', target, visitorId] as const;

  const { data, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () => fetchLikeStatus(target, visitorId),
    enabled: isClient && Boolean(visitorId),
    staleTime: 30_000,
  });

  const mutation = useMutation({
    mutationFn: () => postLike(target, visitorId),
    onSuccess: (result) => {
      queryClient.setQueryData(queryKey, result);
      if (result.just_liked) {
        toast.success('Thanks for the like!');
      } else if (result.already_liked) {
        toast('You already liked this');
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Could not send like');
    },
  });

  const liked = Boolean(data?.already_liked);
  const count = data?.like_count ?? 0;
  const configured = Boolean(data?.configured);
  const busy = mutation.isPending || isLoading;
  const canLike = configured && !liked && !busy;

  return (
    <div className={cn('inline-flex items-center gap-2', className)}>
      <Button
        type='button'
        variant={liked ? 'default' : 'neutral'}
        size={compact ? 'default' : 'xl'}
        className={cn(
          'gap-2',
          liked && 'bg-chart-4 text-main-foreground',
          !configured && 'opacity-70',
        )}
        disabled={!canLike}
        aria-pressed={liked}
        aria-label={
          !configured
            ? 'Likes unavailable — check Supabase setup'
            : liked
              ? 'Already liked'
              : 'Like this portfolio'
        }
        onClick={() => mutation.mutate()}
      >
        <motion.span
          key={liked ? 'filled' : 'outline'}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 18 }}
          className='inline-flex'
        >
          {liked ? (
            <IconHeartFilled className='size-5' aria-hidden='true' />
          ) : (
            <IconHeart className='size-5' aria-hidden='true' />
          )}
        </motion.span>
        <span className='text-base md:text-sm'>{liked ? 'Liked' : 'Like'}</span>
        <span
          className='rounded-base border-2 border-border bg-secondary-background px-2 py-0.5 text-sm font-bold text-foreground tabular-nums'
          aria-live='polite'
        >
          {isLoading && !data ? '…' : formatCount(count)}
        </span>
      </Button>
      {isError ? (
        <span className='text-xs text-foreground/70'>offline</span>
      ) : null}
      {data && !configured ? (
        <span className='text-xs text-foreground/70'>setup needed</span>
      ) : null}
    </div>
  );
}
