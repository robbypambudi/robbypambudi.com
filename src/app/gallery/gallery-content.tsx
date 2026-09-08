'use client';

import { IconArrowRight } from '@tabler/icons-react';
import { motion } from 'motion/react';
import { Link } from 'next-view-transitions';
import { useContext, useState } from 'react';

import GalleryGrid from '@/components/gallery-grid';
import { FirstLoadContext } from '@/components/layout/first-load-animation';
import PhotoStack, { type GalleryItem } from '@/components/photo-stack';
import { Button } from '@/components/ui/button';
import data from '@/lib/data.json';

export default function GalleryContent() {
  const { gallery } = data;
  const firstLoadComplete = useContext(FirstLoadContext);
  const items = gallery.items as GalleryItem[];
  const [activeId, setActiveId] = useState(items[0]?.id ?? '');

  return (
    <main className='min-h-screen'>
      <section className='section-shell border-b-4 border-border bg-background'>
        <div className='mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[minmax(340px,1fr)_minmax(0,1.1fr)] lg:gap-14'>
          <PhotoStack
            key={items.map((item) => item.id).join('-')}
            items={items}
            ready={firstLoadComplete}
            activeId={activeId}
            onActiveIdChange={setActiveId}
          />

          <motion.div
            className='flex flex-col gap-5 sm:gap-6'
            initial={{ opacity: 0, y: 20 }}
            animate={
              firstLoadComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
          >
            <p className='text-sm font-bold uppercase tracking-wide text-foreground/70'>
              Gallery
            </p>
            <h1 className='text-3xl font-bold leading-tight sm:text-4xl md:text-5xl'>
              Frames &amp; friends
            </h1>
            <p className='max-w-xl text-base leading-relaxed text-foreground/85 sm:text-lg'>
              {gallery.headline}
            </p>
            <p className='max-w-xl text-sm leading-relaxed text-foreground/75 sm:text-base'>
              {gallery.lede}
            </p>
            <div className='flex flex-wrap gap-3 pt-1'>
              <Button
                asChild
                size='xl'
                className='bg-main text-main-foreground'
              >
                <Link href='/#contact'>
                  Get in touch
                  <IconArrowRight className='size-4' aria-hidden='true' />
                </Link>
              </Button>
              <Button asChild size='xl' variant='neutral'>
                <Link href='/articles'>Articles</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className='section-shell border-b-4 border-border bg-secondary-background'>
        <div className='mx-auto max-w-7xl'>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={
              firstLoadComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
            }
            transition={{ duration: 0.45, delay: 0.12, ease: 'easeOut' }}
            className='mb-8 max-w-2xl'
          >
            <p className='text-sm font-bold uppercase tracking-wide text-foreground/70'>
              All frames
            </p>
            <h2 className='mt-2 text-2xl font-bold sm:text-3xl'>
              The rest of the set
            </h2>
            <p className='mt-2 text-sm text-foreground/70 sm:text-base'>
              Newest first — hover or tap a frame to meet who&apos;s in it.
            </p>
          </motion.div>

          <GalleryGrid
            items={items}
            activeId={activeId}
            ready={firstLoadComplete}
            onSelect={setActiveId}
          />
        </div>
      </section>
    </main>
  );
}
