'use client';

import { motion } from 'motion/react';
import { useContext } from 'react';

import { FirstLoadContext } from '@/components/layout/first-load-animation';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
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

export default function ActivitiesContent() {
  const { activities } = data;
  const firstLoadComplete = useContext(FirstLoadContext);

  return (
    <main className='min-h-screen section-shell'>
      <div className='mx-auto max-w-7xl'>
        <div className='mb-8 sm:mb-12'>
          <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4'>
            Activities
          </h1>
          <p className='text-base sm:text-lg max-w-2xl text-foreground/80'>
            Leadership, research programs, and community engineering from
            DigiFlood to ITS Expo.
          </p>
        </div>
        <motion.div
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'
          variants={containerVariants}
          initial='hidden'
          animate={firstLoadComplete ? 'visible' : 'hidden'}
        >
          {activities.map((activity) => (
            <motion.div key={activity.title} variants={cardVariants}>
              <Card className='h-full bg-secondary-background flex flex-col'>
                <CardHeader>
                  <CardTitle className='text-base sm:text-lg md:text-xl leading-snug break-words-safe'>
                    {activity.title}
                  </CardTitle>
                  <CardDescription className='text-sm sm:text-base'>
                    {activity.role} · {activity.duration}
                  </CardDescription>
                </CardHeader>
                <CardContent className='flex-1 space-y-3 sm:space-y-4'>
                  <p className='text-sm sm:text-base leading-relaxed text-foreground'>
                    {activity.description}
                  </p>
                  <Badge variant='chart3'>{activity.role}</Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
