'use client';

import { motion } from 'motion/react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import data from '@/lib/data.json';

export default function Education() {
  const { education } = data;

  return (
    <section
      id='education'
      className='section-shell bg-chart-5 border-y-4 border-border'
    >
      <div className='mx-auto max-w-7xl'>
        <motion.h2
          className='text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-12 text-main-foreground'
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          Education
        </motion.h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6'>
          {education.map((edu) => (
            <motion.div
              key={`${edu.degree}-${edu.duration}`}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <Card className='h-full bg-secondary-background'>
                <CardHeader className='space-y-2'>
                  <CardTitle className='text-lg sm:text-xl md:text-2xl leading-tight break-words-safe'>
                    {edu.degree}
                  </CardTitle>
                  <div className='text-sm sm:text-base md:text-lg text-foreground break-words-safe'>
                    {edu.school}
                  </div>
                  <div className='text-sm text-foreground/70'>
                    {edu.duration} · {edu.location}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className='list-disc space-y-2 pl-5 text-sm sm:text-base leading-relaxed text-foreground'>
                    {edu.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
