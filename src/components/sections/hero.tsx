'use client';

import { IconExternalLink, IconFileText } from '@tabler/icons-react';
import { motion } from 'motion/react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useContext, useState } from 'react';

import { FirstLoadContext } from '@/components/layout/first-load-animation';
import LikeCounter from '@/components/like-counter';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import data from '@/lib/data.json';

const cardGameSkeletonCellKeys = [
  'cg-sk-0',
  'cg-sk-1',
  'cg-sk-2',
  'cg-sk-3',
  'cg-sk-4',
  'cg-sk-5',
  'cg-sk-6',
  'cg-sk-7',
  'cg-sk-8',
  'cg-sk-9',
  'cg-sk-10',
  'cg-sk-11',
] as const;

const CardGameSkeleton = () => (
  <div className='w-full border-4 border-border rounded-lg bg-main p-3 sm:p-4 md:p-6 flex flex-col gap-3 sm:gap-4'>
    <div className='grid grid-cols-4 gap-2 sm:gap-3 md:gap-4'>
      {cardGameSkeletonCellKeys.map((cellKey) => (
        <Skeleton key={cellKey} className='w-full aspect-square' />
      ))}
    </div>
    <div className='flex justify-center'>
      <Skeleton className='h-11 w-36' />
    </div>
  </div>
);

const CardGame = dynamic(() => import('./card-game'), {
  ssr: false,
  loading: () => <CardGameSkeleton />,
});

const containerVariants = {
  initial: { opacity: 0, y: 30, scale: 0.95 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

const headingVariants = {
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
};

const heading1Variants = {
  initial: headingVariants.initial,
  animate: {
    ...headingVariants.animate,
    transition: { duration: 0.6, delay: 0.1, ease: 'easeOut' as const },
  },
};

const heading2Variants = {
  initial: headingVariants.initial,
  animate: {
    ...headingVariants.animate,
    transition: { duration: 0.6, delay: 0.2, ease: 'easeOut' as const },
  },
};

const heading3Variants = {
  initial: headingVariants.initial,
  animate: {
    ...headingVariants.animate,
    transition: { duration: 0.6, delay: 0.3, ease: 'easeOut' as const },
  },
};

const cardGameContainerVariants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.4, ease: 'easeOut' as const },
  },
};

const resumeLinkVariants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: 0.4, ease: 'easeOut' as const },
  },
};

export default function Hero() {
  const { personal, resumePath } = data;
  const firstLoadComplete = useContext(FirstLoadContext);
  const [cardGameWrapperEntered, setCardGameWrapperEntered] = useState(false);

  return (
    <section id='hero' className='section-shell'>
      <div className='mx-auto max-w-7xl flex flex-col lg:flex-row lg:items-center gap-8 md:gap-10 lg:gap-12'>
        <motion.div
          className='flex-1 min-w-0 space-y-3 sm:space-y-4 text-center lg:text-left'
          initial='initial'
          animate={firstLoadComplete ? 'animate' : 'initial'}
          variants={containerVariants}
        >
          <motion.h1
            className='text-[clamp(1.75rem,6vw,3.75rem)] font-bold break-words-safe'
            initial='initial'
            animate={firstLoadComplete ? 'animate' : 'initial'}
            variants={heading1Variants}
          >
            {personal.name}
          </motion.h1>
          <motion.h2
            className='text-[clamp(1.125rem,3.5vw,2.25rem)] font-bold text-main inline-block max-w-full break-words-safe'
            initial='initial'
            animate={firstLoadComplete ? 'animate' : 'initial'}
            variants={heading2Variants}
          >
            {personal.title}
          </motion.h2>

          <motion.p
            className='text-base sm:text-lg md:text-xl text-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed'
            initial='initial'
            animate={firstLoadComplete ? 'animate' : 'initial'}
            variants={heading3Variants}
          >
            {personal.bio}
          </motion.p>

          <motion.div
            className='flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-3 pt-1'
            initial='initial'
            animate={firstLoadComplete ? 'animate' : 'initial'}
            variants={resumeLinkVariants}
          >
            <Link
              href={resumePath}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex w-full sm:w-auto'
              aria-label='View resume'
            >
              <Button size='xl' className='w-full sm:w-auto'>
                <IconFileText className='size-5' />
                <span className='text-base md:text-sm'>View my Resume</span>
              </Button>
            </Link>
            {personal.company ? (
              <a
                href={personal.company.url}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex w-full sm:w-auto'
                aria-label={`Visit ${personal.company.name}`}
              >
                <Button
                  size='xl'
                  variant='neutral'
                  className='w-full sm:w-auto'
                >
                  <IconExternalLink className='size-5' />
                  <span className='text-base md:text-sm'>
                    {personal.company.role}, {personal.company.name}
                  </span>
                </Button>
              </a>
            ) : null}
            <LikeCounter className='w-full sm:w-auto justify-center' />
          </motion.div>
        </motion.div>
        <motion.div
          className='w-full lg:flex-1 min-w-0 max-w-xl mx-auto lg:max-w-none'
          initial='initial'
          animate={firstLoadComplete ? 'animate' : 'initial'}
          variants={cardGameContainerVariants}
          onAnimationComplete={() => {
            if (firstLoadComplete) setCardGameWrapperEntered(true);
          }}
        >
          <CardGame entranceReady={cardGameWrapperEntered} />
        </motion.div>
      </div>
    </section>
  );
}
