import type { Metadata } from 'next';

import ArticlesContent from '@/app/articles/articles-content';
import { getArticles } from '@/lib/articles';

export const metadata: Metadata = {
  title: 'Articles',
  description:
    'Engineering notes by Robby Ulung Pambudi on production RAG, LLM systems, and distributed inference.',
};

export default function ArticlesPage() {
  const articles = getArticles();
  return <ArticlesContent articles={articles} />;
}
