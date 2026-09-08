'use client';

import Image from 'next/image';

import type { GalleryItem } from '@/components/photo-stack';

type GalleryFilmstripProps = {
  items: GalleryItem[];
  activeId: string;
  onSelect: (id: string) => void;
};

function FilmstripTrack({
  items,
  activeId,
  onSelect,
  ariaHidden,
}: GalleryFilmstripProps & { ariaHidden?: boolean }) {
  return (
    <>
      {items.map((item) => {
        const isActive = item.id === activeId;
        const fitMode =
          item.fit ?? (item.span === 'wide' ? 'contain' : 'cover');

        return (
          <button
            key={`${ariaHidden ? 'dup-' : ''}${item.id}`}
            type='button'
            tabIndex={ariaHidden ? -1 : 0}
            onClick={() => onSelect(item.id)}
            aria-label={`${item.place} ${item.year}: ${item.moment}`}
            aria-current={isActive ? 'true' : undefined}
            className={`relative mx-1.5 inline-block h-24 w-32 shrink-0 overflow-hidden rounded-base border-2 border-border bg-main align-middle shadow-shadow transition-transform outline-none focus-visible:ring-2 focus-visible:ring-ring sm:mx-2 sm:h-28 sm:w-40 ${
              isActive
                ? 'ring-2 ring-ring -translate-y-0.5'
                : 'hover:-translate-y-0.5'
            }`}
          >
            <Image
              src={item.src}
              alt=''
              fill
              sizes='160px'
              className={
                fitMode === 'contain' ? 'object-contain' : 'object-cover'
              }
              style={item.focus ? { objectPosition: item.focus } : undefined}
            />
            <span className='pointer-events-none absolute inset-x-0 bottom-0 bg-black/55 px-1.5 py-1 text-left text-[0.6rem] font-bold uppercase tracking-wide text-white'>
              {item.place}
            </span>
          </button>
        );
      })}
    </>
  );
}

export default function GalleryFilmstrip({
  items,
  activeId,
  onSelect,
}: GalleryFilmstripProps) {
  return (
    <div
      role='region'
      aria-label='Photo strip'
      className='group relative w-full overflow-x-hidden border-y-4 border-border bg-secondary-background text-foreground motion-reduce:overflow-x-auto'
    >
      <div className='animate-marquee whitespace-nowrap py-3 sm:py-4 motion-reduce:animate-none motion-reduce:flex motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-2 motion-reduce:whitespace-normal motion-reduce:px-3 group-hover:[animation-play-state:paused]'>
        <FilmstripTrack items={items} activeId={activeId} onSelect={onSelect} />
      </div>

      <div
        className='absolute top-0 animate-marquee2 whitespace-nowrap py-3 sm:py-4 motion-reduce:hidden group-hover:[animation-play-state:paused]'
        aria-hidden='true'
      >
        <FilmstripTrack
          items={items}
          activeId={activeId}
          onSelect={onSelect}
          ariaHidden
        />
      </div>
    </div>
  );
}
