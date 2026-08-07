'use client';

import { IconArrowRight, IconExternalLink } from '@tabler/icons-react';
import { motion } from 'motion/react';
import { Link } from 'next-view-transitions';

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

export default function PublicationsTeaser() {
  const { publications } = data;

  return (
    <section id='publications' className='section-shell'>
      <div className='mx-auto max-w-7xl'>
        <div className='flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-12'>
          <motion.h2
            className='text-2xl sm:text-3xl md:text-4xl font-bold'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
          >
            Publications
          </motion.h2>
          <Button
            variant='neutral'
            asChild
            className='w-full sm:w-auto shrink-0'
          >
            <Link href='/publications'>
              View all
              <IconArrowRight className='size-4' aria-hidden='true' />
            </Link>
          </Button>
        </div>

        <motion.div
          className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6'
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-50px' }}
        >
          {publications.map((pub) => (
            <motion.div key={pub.doi} variants={cardVariants}>
              <Card className='h-full bg-secondary-background justify-between'>
                <CardHeader>
                  <CardTitle className='text-base sm:text-lg md:text-xl leading-snug break-words-safe'>
                    {pub.title}
                  </CardTitle>
                  <CardDescription className='text-sm sm:text-base'>
                    {pub.venue}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className='text-sm text-foreground/70 break-all'>
                    DOI: {pub.doi}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    asChild
                    className='bg-chart-2 text-main-foreground w-full sm:w-auto'
                  >
                    <a
                      href={pub.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      aria-label={`Open publication ${pub.title}`}
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
    </section>
  );
}
