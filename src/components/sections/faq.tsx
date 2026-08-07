'use client';

import {
  IconAsterisk,
  IconBrain,
  IconSettings,
  IconStar,
} from '@tabler/icons-react';
import { motion } from 'motion/react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import data from '@/lib/data.json';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  asterisk: IconAsterisk,
  brain: IconBrain,
  headphones: IconBrain,
  settings: IconSettings,
  star: IconStar,
};

export default function FAQ() {
  const { faq } = data;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  return (
    <section
      id='faqs'
      className='section-shell bg-chart-4 border-y-4 border-border'
    >
      <div className='mx-auto max-w-7xl'>
        <motion.h2
          className='text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-12 text-main-foreground'
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          Frequently asked questions
        </motion.h2>

        <motion.div
          className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6'
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-50px' }}
        >
          {faq.infoPanels.map((panel, index) => {
            const Icon = iconMap[panel.icon] || IconAsterisk;
            const isOdd = index === 1 || index === 2;
            return (
              <motion.div key={panel.title} variants={itemVariants}>
                <Card
                  className={`h-full hover:shadow-lg transition-shadow duration-300 ${
                    isOdd
                      ? 'bg-chart-3 text-main-foreground'
                      : 'bg-secondary-background'
                  }`}
                >
                  <CardHeader>
                    <div className='flex items-start gap-3'>
                      <Icon
                        className='size-8 sm:size-10 md:size-12 shrink-0 mt-0.5'
                        aria-hidden='true'
                      />
                      <CardTitle className='text-base sm:text-lg md:text-xl leading-tight break-words-safe'>
                        {panel.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p
                      className={`text-sm sm:text-base leading-relaxed ${
                        isOdd ? 'text-main-foreground' : 'text-foreground'
                      }`}
                    >
                      {panel.content}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
