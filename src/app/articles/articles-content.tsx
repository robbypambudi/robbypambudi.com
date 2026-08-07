'use client';

import { IconArrowRight } from '@tabler/icons-react';
import { motion } from 'motion/react';
import { Link } from 'next-view-transitions';
import { useContext } from 'react';

import { FirstLoadContext } from '@/components/layout/first-load-animation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { type Article, formatArticleDate } from '@/lib/articles';

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

type ArticlesContentProps = {
  articles: Article[];
};

export default function ArticlesContent({ articles }: ArticlesContentProps) {
  const firstLoadComplete = useContext(FirstLoadContext);

  return (
    <main className='min-h-screen section-shell'>
      <div className='mx-auto max-w-7xl'>
        <div className='mb-8 sm:mb-12'>
          <h1 className='mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl md:text-4xl'>
            Articles
          </h1>
          <p className='max-w-2xl text-base text-foreground/80 sm:text-lg'>
            Notes on production AI systems, RAG, and distributed
            inference—written for engineers and hiring managers who care about
            shipping.
          </p>
        </div>

        {articles.length === 0 ? (
          <p className='text-foreground/70'>No articles published yet.</p>
        ) : (
          <motion.div
            className='grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2'
            variants={containerVariants}
            initial='hidden'
            animate={firstLoadComplete ? 'visible' : 'hidden'}
          >
            {articles.map((article) => (
              <motion.div key={article.slug} variants={cardVariants}>
                <Card className='flex h-full flex-col bg-secondary-background'>
                  <CardHeader>
                    <p className='mb-2 text-sm text-foreground/60'>
                      {formatArticleDate(article.date)}
                      {article.metadata?.readingTime
                        ? ` · ${Math.max(1, Math.ceil(article.metadata.readingTime))} min read`
                        : null}
                    </p>
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
            ))}
          </motion.div>
        )}
      </div>
    </main>
  );
}
