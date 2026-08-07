'use client';

import { IconExternalLink } from '@tabler/icons-react';
import { motion } from 'motion/react';
import { useContext } from 'react';

import { FirstLoadContext } from '@/components/layout/first-load-animation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import data from '@/lib/data.json';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const },
  },
};

export default function PublicationsContent() {
  const { publications } = data;
  const firstLoadComplete = useContext(FirstLoadContext);

  return (
    <main className='min-h-screen section-shell'>
      <div className='mx-auto max-w-7xl'>
        <div className='mb-8 sm:mb-12'>
          <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4'>
            Publications
          </h1>
          <p className='text-base sm:text-lg max-w-2xl text-foreground/80'>
            Peer-reviewed research from CV—DiLLeMA distributed LLM inference and
            image steganography.
          </p>
        </div>
        <motion.div
          className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6'
          variants={containerVariants}
          initial='hidden'
          animate={firstLoadComplete ? 'visible' : 'hidden'}
        >
          {publications.map((pub) => (
            <motion.div key={pub.doi} variants={cardVariants}>
              <Card className='h-full bg-secondary-background flex flex-col'>
                <CardHeader>
                  <CardTitle className='text-lg md:text-xl leading-snug'>
                    {pub.title}
                  </CardTitle>
                  <CardDescription className='text-base'>
                    {pub.venue}
                  </CardDescription>
                </CardHeader>
                <CardContent className='flex-1'>
                  <p className='text-sm text-foreground/70'>DOI: {pub.doi}</p>
                </CardContent>
                <CardFooter>
                  <Button
                    asChild
                    className='w-full bg-chart-2 text-main-foreground'
                  >
                    <a
                      href={pub.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      aria-label={`Open ${pub.title}`}
                    >
                      <IconExternalLink className='size-4' aria-hidden='true' />
                      Read paper
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
