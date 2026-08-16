export const ARTICLE_CATEGORIES = [
  'Technology',
  'Career',
  'Education',
  'Life',
  'Opinion',
] as const;

export type ArticleCategory = (typeof ARTICLE_CATEGORIES)[number];

export const DEFAULT_ARTICLE_CATEGORY: ArticleCategory = 'Technology';

export function isArticleCategory(value: string): value is ArticleCategory {
  return (ARTICLE_CATEGORIES as readonly string[]).includes(value);
}

export function formatCategoryLabel(category: string) {
  return category;
}
