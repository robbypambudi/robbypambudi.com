import * as React from 'react';

import NextImage from '@/components/NextImage';
import SEO from '@/components/SEO';
import Typography from '@/components/Typography';
import Layout from '@/layouts/Layout';

export default function BlogPage() {
  return (
    <Layout viewSidebar={false}>
      <SEO
        title='My Blog'
        description='These are my blog posts, enjoy reading!'
      />
      <main className='bg-primary-900'>
        <section className='hero'>
          <div className='layout h-screen flex items-center justify-center'>
            <div className='text-center'>
              <div>
                <Typography variant='h2'>
                  Hem... Something is&apos;t already yet
                </Typography>
                <NextImage
                  src='https://icons8.com/icon/KgisVcJhnUAQ/light-on'
                  width={200}
                  height={200}
                  alt='Light '
                />
              </div>
              <Typography variant='h3' className='text-gray-400 mt-2'>
                Wait for the next update to see my blog posts here :)
              </Typography>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
