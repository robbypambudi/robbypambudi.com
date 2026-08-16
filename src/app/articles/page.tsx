import type { Metadata } from 'next';

import ArticlesContent from '@/app/articles/articles-content';
import { getArticles } from '@/lib/articles';

export const metadata: Metadata = {
  title: 'Articles',
  description:
    'Articles by Robby Ulung Pambudi — technology, career, education, life, and opinion.',
};

export default function ArticlesPage() {
  const articles = getArticles();
  return <ArticlesContent articles={articles} />;
}
