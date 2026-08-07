import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Link } from 'next-view-transitions';

import { formatArticleDate, getArticle, getArticleSlugs } from '@/lib/articles';

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    return { title: 'Article not found' };
  }

  return {
    title: article.title,
    description: article.description,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <main className='min-h-screen section-shell'>
      <article className='mx-auto max-w-3xl'>
        <Link
          href='/articles'
          className='mb-8 inline-flex min-h-11 items-center text-sm font-bold underline-offset-4 hover:underline'
        >
          ← Back to articles
        </Link>

        <header className='mb-10 border-b-2 border-border pb-8'>
          <p className='mb-3 text-sm text-foreground/60'>
            {formatArticleDate(article.date)}
            {article.metadata?.readingTime
              ? ` · ${Math.max(1, Math.ceil(article.metadata.readingTime))} min read`
              : null}
          </p>
          <h1 className='mb-4 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl'>
            {article.title}
          </h1>
          <p className='text-base text-foreground/80 sm:text-lg'>
            {article.description}
          </p>
          {article.tags.length > 0 ? (
            <ul className='mt-6 flex flex-wrap gap-2'>
              {article.tags.map((tag) => (
                <li
                  key={tag}
                  className='border-2 border-border bg-secondary-background px-2 py-0.5 text-xs font-semibold'
                >
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
        </header>

        <div
          className='article-prose'
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>
    </main>
  );
}
