'use client';

import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import { useState } from 'react';

import type { GalleryItem } from '@/components/photo-stack';

type GalleryGridProps = {
  items: GalleryItem[];
  activeId: string;
  onSelect: (id: string) => void;
  ready?: boolean;
};

export default function GalleryGrid({
  items,
  activeId,
  onSelect,
  ready = true,
}: GalleryGridProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      {items.map((item, index) => {
        const isActive = item.id === activeId;
        const isOpen = openId === item.id;
        const fitMode =
          item.fit ?? (item.span === 'wide' ? 'contain' : 'cover');

        return (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{
              duration: 0.4,
              delay: 0.04 * Math.min(index, 8),
              ease: 'easeOut',
            }}
            className={`overflow-hidden rounded-base border-4 border-border bg-main shadow-shadow ${
              isActive ? 'ring-2 ring-ring' : ''
            }`}
          >
            <button
              type='button'
              onClick={() => {
                onSelect(item.id);
                setOpenId((prev) => (prev === item.id ? null : item.id));
              }}
              aria-expanded={isOpen}
              aria-label={`${item.place} ${item.year}: ${item.moment}. ${
                isOpen ? 'Hide' : 'Show'
              } who is in the photo.`}
              className='group relative block aspect-[4/3] w-full overflow-hidden text-left outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset'
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                className={
                  fitMode === 'contain'
                    ? 'object-contain transition-transform duration-300 group-hover:scale-[1.02]'
                    : 'object-cover transition-transform duration-300 group-hover:scale-[1.03]'
                }
                style={item.focus ? { objectPosition: item.focus } : undefined}
              />
              <div
                className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent'
                aria-hidden='true'
              />
              <div className='pointer-events-none absolute inset-x-0 bottom-0 p-3'>
                <p className='w-fit border-2 border-border bg-chart-3 px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-foreground shadow-shadow'>
                  {item.place} · {item.year}
                </p>
                <p className='mt-1.5 text-sm font-bold text-white drop-shadow'>
                  {item.moment}
                </p>
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className='overflow-hidden border-t-4 border-border bg-secondary-background'
                >
                  <div className='p-3 sm:p-4'>
                    <p className='mb-2 text-[0.65rem] font-bold uppercase tracking-wide text-foreground/60'>
                      In this frame
                    </p>
                    <ul className='space-y-2'>
                      {item.people.map((person) => (
                        <li key={person.name} className='leading-snug'>
                          <span className='block text-sm font-bold text-foreground'>
                            {person.name}
                          </span>
                          <span className='block text-xs text-foreground/70'>
                            {person.note}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.article>
        );
      })}
    </div>
  );
}
