import type { ReactNode } from 'react';

export default function Marquee({ items }: { items: ReactNode[] }) {
  return (
    <div
      role='region'
      aria-label='Technical skills'
      className='relative flex w-full overflow-x-hidden border-b-4 border-t-4 border-border bg-secondary-background text-foreground font-medium motion-reduce:overflow-x-auto'
    >
      <div className='animate-marquee whitespace-nowrap py-6 sm:py-8 md:py-12 motion-reduce:animate-none motion-reduce:flex motion-reduce:flex-wrap motion-reduce:gap-2 motion-reduce:whitespace-normal motion-reduce:justify-center motion-reduce:px-4'>
        {items.map((item, index) => (
          <span
            key={index}
            className='mx-2 sm:mx-3 md:mx-4 inline-flex items-center gap-2 text-xl sm:text-2xl md:text-4xl'
          >
            {item}
          </span>
        ))}
      </div>

      <div
        className='absolute top-0 animate-marquee2 whitespace-nowrap py-6 sm:py-8 md:py-12 motion-reduce:hidden'
        aria-hidden='true'
      >
        {items.map((item, index) => (
          <span
            key={`dup-${index}`}
            className='mx-2 sm:mx-3 md:mx-4 inline-flex items-center gap-2 text-xl sm:text-2xl md:text-4xl'
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
