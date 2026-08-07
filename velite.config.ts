import rehypePrettyCode from 'rehype-pretty-code';
import { defineConfig, s } from 'velite';

const slugFromPath = (path: string) => {
  const segments = path.split('/');
  return segments[segments.length - 1] ?? path;
};

export default defineConfig({
  root: 'content',
  collections: {
    articles: {
      name: 'Article',
      pattern: 'articles/**/*.md',
      schema: s
        .object({
          title: s.string().max(120),
          description: s.string().max(300),
          date: s.isodate(),
          tags: s.array(s.string()).default([]),
          draft: s.boolean().default(false),
          cover: s.image().optional(),
          metadata: s.metadata(),
          excerpt: s.excerpt(),
          content: s.markdown(),
          path: s.path(),
        })
        .transform((data) => ({
          ...data,
          slug: slugFromPath(data.path),
          permalink: `/articles/${slugFromPath(data.path)}`,
        })),
    },
  },
  markdown: {
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: 'github-light',
          keepBackground: false,
        },
      ],
    ],
  },
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
});
