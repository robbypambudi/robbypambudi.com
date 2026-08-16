import {
  ARTICLE_CATEGORIES,
  type ArticleCategory,
} from '@/lib/article-categories';
import { type Article, articles } from '#site/content';

const isProduction = process.env.NODE_ENV === 'production';

function isPublished(article: Article) {
  return isProduction ? !article.draft : true;
}

export function getArticles(): Article[] {
  return articles
    .filter(isPublished)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getArticle(slug: string): Article | undefined {
  return getArticles().find((article) => article.slug === slug);
}

export function getArticleSlugs(): string[] {
  return getArticles().map((article) => article.slug);
}

export function getArticleCategories(): ArticleCategory[] {
  const used = new Set(getArticles().map((article) => article.category));
  return ARTICLE_CATEGORIES.filter((category) => used.has(category));
}

export function formatArticleDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}

export type { Article };
