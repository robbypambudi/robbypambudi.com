import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <main className='flex min-h-[70vh] flex-col items-center justify-center section-shell text-center'>
      <p className='text-5xl sm:text-6xl md:text-8xl font-bold text-main'>
        404
      </p>
      <h1 className='mt-4 text-2xl sm:text-3xl md:text-4xl font-bold'>
        Page not found
      </h1>
      <p className='mt-3 max-w-md text-sm sm:text-base md:text-lg text-foreground/80'>
        The page you are looking for might have been removed, renamed, or is
        temporarily unavailable.
      </p>
      <Button asChild size='xl' className='mt-8 w-full sm:w-auto'>
        <Link href='/'>Back home</Link>
      </Button>
    </main>
  );
}
