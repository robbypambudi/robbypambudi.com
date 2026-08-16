'use client';

import { IconArrowRight, IconEye } from '@tabler/icons-react';
import { motion } from 'motion/react';
import { Link } from 'next-view-transitions';
import { useContext, useMemo, useState } from 'react';

import { FirstLoadContext } from '@/components/layout/first-load-animation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useArticleViewCounts } from '@/hooks/use-article-view-counts';
import {
  ARTICLE_CATEGORIES,
  type ArticleCategory,
} from '@/lib/article-categories';
import { type Article, formatArticleDate } from '@/lib/articles';
import { cn } from '@/lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const },
  },
};

type FilterValue = 'All' | ArticleCategory;

type ArticlesContentProps = {
  articles: Article[];
};

function formatCount(n: number) {
  return new Intl.NumberFormat('en', {
    notation: n >= 1000 ? 'compact' : 'standard',
    maximumFractionDigits: 1,
  }).format(n);
}

export default function ArticlesContent({ articles }: ArticlesContentProps) {
  const firstLoadComplete = useContext(FirstLoadContext);
  const [filter, setFilter] = useState<FilterValue>('All');

  const availableCategories = useMemo(() => {
    const used = new Set(articles.map((article) => article.category));
    return ARTICLE_CATEGORIES.filter((category) => used.has(category));
  }, [articles]);

  const filtered = useMemo(() => {
    if (filter === 'All') return articles;
    return articles.filter((article) => article.category === filter);
  }, [articles, filter]);

  const { data: viewCounts = {} } = useArticleViewCounts(
    articles.map((article) => article.slug),
  );

  const filters: FilterValue[] = ['All', ...availableCategories];

  return (
    <main className='min-h-screen section-shell'>
      <div className='mx-auto max-w-7xl'>
        <div className='mb-8 sm:mb-12'>
          <h1 className='mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl md:text-4xl'>
            Articles
          </h1>
          <p className='max-w-2xl text-base text-foreground/80 sm:text-lg'>
            Writing on technology, career, and ideas beyond the IDE—notes for
            curious readers, not only recruiters.
          </p>
        </div>

        {articles.length > 0 ? (
          <div
            className='mb-6 flex flex-wrap gap-2 sm:mb-8'
            role='tablist'
            aria-label='Filter articles by category'
          >
            {filters.map((value) => {
              const active = filter === value;
              return (
                <button
                  key={value}
                  type='button'
                  role='tab'
                  aria-selected={active}
                  onClick={() => setFilter(value)}
                  className={cn(
                    'min-h-11 border-2 border-border px-3 py-1.5 text-sm font-bold transition-colors',
                    active
                      ? 'bg-main text-main-foreground shadow-shadow'
                      : 'bg-secondary-background text-foreground hover:bg-background',
                  )}
                >
                  {value}
                </button>
              );
            })}
          </div>
        ) : null}

        {filtered.length === 0 ? (
          <p className='text-foreground/70'>
            {articles.length === 0
              ? 'No articles published yet.'
              : `No articles in ${filter} yet.`}
          </p>
        ) : (
          <motion.div
            className='grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2'
            variants={containerVariants}
            initial='hidden'
            animate={firstLoadComplete ? 'visible' : 'hidden'}
          >
            {filtered.map((article) => {
              const views = viewCounts[article.slug] ?? 0;
              return (
                <motion.div key={article.slug} variants={cardVariants}>
                  <Card className='flex h-full flex-col bg-secondary-background'>
                    <CardHeader>
                      <div className='mb-2 flex flex-wrap items-center gap-2 text-sm text-foreground/60'>
                        <span className='border-2 border-border bg-background px-2 py-0.5 text-xs font-bold text-foreground'>
                          {article.category}
                        </span>
                        <span>{formatArticleDate(article.date)}</span>
                        {article.metadata?.readingTime ? (
                          <span>
                            ·{' '}
                            {Math.max(
                              1,
                              Math.ceil(article.metadata.readingTime),
                            )}{' '}
                            min read
                          </span>
                        ) : null}
                        <span className='inline-flex items-center gap-1'>
                          · <IconEye className='size-3.5' aria-hidden='true' />
                          <span className='tabular-nums'>
                            {formatCount(views)}
                          </span>
                        </span>
                      </div>
                      <CardTitle className='text-lg leading-snug md:text-xl'>
                        <Link
                          href={article.permalink}
                          className='transition-colors hover:text-main'
                        >
                          {article.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className='text-base'>
                        {article.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className='flex-1'>
                      {article.tags.length > 0 ? (
                        <ul className='flex flex-wrap gap-2'>
                          {article.tags.map((tag) => (
                            <li
                              key={tag}
                              className='border-2 border-border bg-background px-2 py-0.5 text-xs font-semibold'
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </CardContent>
                    <CardFooter>
                      <Link
                        href={article.permalink}
                        className='inline-flex min-h-11 items-center gap-2 text-sm font-bold underline-offset-4 hover:underline'
                      >
                        Read article
                        <IconArrowRight className='size-4' aria-hidden='true' />
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </main>
  );
}
