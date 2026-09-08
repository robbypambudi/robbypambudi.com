'use client';

import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import { useState } from 'react';

export type GalleryPerson = {
  name: string;
  note: string;
  x: number;
  y: number;
};

export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  place: string;
  year: string;
  moment: string;
  span: 'tall' | 'wide' | 'square';
  /** How the photo fills the stack card. Wide group shots should use contain. */
  fit?: 'cover' | 'contain';
  /** CSS object-position, e.g. "50% 20%" */
  focus?: string;
  people: GalleryPerson[];
};

type PhotoStackProps = {
  items: GalleryItem[];
  ready?: boolean;
  activeId?: string;
  onActiveIdChange?: (id: string) => void;
};

const STACK_OFFSETS = [
  { x: 0, y: 0, rotate: -2.5, z: 30 },
  { x: 18, y: 14, rotate: 3.5, z: 20 },
  { x: -14, y: 24, rotate: -6, z: 10 },
  { x: 22, y: 36, rotate: 7, z: 5 },
] as const;

export default function PhotoStack({
  items,
  ready = true,
  activeId,
  onActiveIdChange,
}: PhotoStackProps) {
  const activeIndex = Math.max(
    0,
    activeId ? items.findIndex((item) => item.id === activeId) : 0,
  );
  const [behind, setBehind] = useState(() =>
    items.map((_, i) => i).filter((i) => i !== 0),
  );
  const [fanned, setFanned] = useState(false);
  const [showCast, setShowCast] = useState(false);

  const order = [
    activeIndex,
    ...behind.filter((i) => i !== activeIndex),
    ...items
      .map((_, i) => i)
      .filter((i) => i !== activeIndex && !behind.includes(i)),
  ];

  const bringIndexToFront = (itemIndex: number) => {
    if (itemIndex === activeIndex) return;
    setBehind((prev) => {
      const next = prev.filter((i) => i !== itemIndex && i !== activeIndex);
      return [activeIndex, ...next];
    });
    setShowCast(false);
    onActiveIdChange?.(items[itemIndex].id);
  };

  const visibleOrder = order.slice(0, Math.min(4, items.length));

  return (
    <div className='mx-auto w-full max-w-[360px] px-3 pb-10 sm:max-w-[400px] sm:px-4 sm:pb-12 lg:mx-0 lg:max-w-none'>
      <motion.div
        className='relative z-10 mx-auto aspect-[4/5] w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px]'
        initial={{ opacity: 0, y: 20 }}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        onMouseEnter={() => setFanned(true)}
        onMouseLeave={() => {
          setFanned(false);
          setShowCast(false);
        }}
      >
        {visibleOrder.map((itemIndex, stackPos) => {
          const item = items[itemIndex];
          const offset =
            STACK_OFFSETS[Math.min(stackPos, STACK_OFFSETS.length - 1)];
          const isFront = stackPos === 0;
          const fanBoost = fanned && !isFront ? 1.45 : 1;
          const fitMode =
            item.fit ?? (item.span === 'wide' ? 'contain' : 'cover');

          return (
            <motion.div
              key={item.id}
              role={isFront ? undefined : 'button'}
              tabIndex={isFront ? undefined : 0}
              aria-label={
                isFront
                  ? undefined
                  : `${item.place} ${item.year}. Click to bring to front.`
              }
              onClick={() => {
                if (isFront) return;
                bringIndexToFront(itemIndex);
              }}
              onKeyDown={(event) => {
                if (isFront) return;
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  bringIndexToFront(itemIndex);
                }
              }}
              className={`absolute inset-0 overflow-hidden rounded-base border-4 border-border bg-main text-left shadow-shadow outline-none ${
                isFront
                  ? ''
                  : 'cursor-pointer focus-visible:ring-2 focus-visible:ring-ring'
              }`}
              style={{ zIndex: offset.z }}
              animate={{
                x: offset.x * fanBoost,
                y: offset.y * fanBoost,
                rotate: offset.rotate * (fanned ? 1.15 : 1),
                scale: isFront ? 1 : 0.97,
              }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                priority={isFront}
                sizes='(max-width: 1024px) 380px, 420px'
                className={
                  fitMode === 'contain' ? 'object-contain' : 'object-cover'
                }
                style={item.focus ? { objectPosition: item.focus } : undefined}
              />
              <div
                className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent'
                aria-hidden='true'
              />

              {isFront ? (
                <>
                  <button
                    type='button'
                    aria-label={
                      showCast
                        ? 'Hide who is in this photo'
                        : 'Who is in this photo?'
                    }
                    aria-expanded={showCast}
                    onClick={(event) => {
                      event.stopPropagation();
                      setShowCast((prev) => !prev);
                    }}
                    className='absolute top-3 right-3 z-30 flex size-9 items-center justify-center rounded-base border-2 border-border bg-secondary-background text-lg font-black text-foreground shadow-shadow transition-transform hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_var(--border)] focus-visible:ring-2 focus-visible:ring-ring active:translate-y-0 sm:top-4 sm:right-4'
                  >
                    ?
                  </button>

                  <div className='pointer-events-none absolute inset-x-0 bottom-0 p-3 sm:p-4'>
                    <p className='w-fit border-2 border-border bg-chart-3 px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-foreground shadow-shadow'>
                      {item.place} · {item.year}
                    </p>
                    <p className='mt-1.5 text-sm font-bold text-white drop-shadow sm:text-base'>
                      {item.moment}
                    </p>
                  </div>

                  <AnimatePresence>
                    {showCast ? (
                      <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 12 }}
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 28,
                        }}
                        className='absolute inset-x-3 top-14 z-20 sm:inset-x-4 sm:top-16'
                      >
                        <div className='border-2 border-border bg-secondary-background/95 p-3 shadow-shadow backdrop-blur-sm'>
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
                </>
              ) : null}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
