'use client';

import { IconExternalLink } from '@tabler/icons-react';
import { motion } from 'motion/react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import data from '@/lib/data.json';

export default function Experience() {
  const { experience } = data;

  return (
    <section
      id='experience'
      className='section-shell bg-chart-2 border-y-4 border-border text-main-foreground'
    >
      <div className='mx-auto max-w-7xl'>
        <motion.h2
          className='text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-12 text-main-foreground'
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          Experience
        </motion.h2>
        <div className='space-y-4 sm:space-y-6'>
          {experience.map((exp) => (
            <motion.div
              key={`${exp.company}-${exp.role}`}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <Card className='hover:shadow-lg transition-shadow duration-300'>
                <CardHeader className='space-y-2'>
                  <CardTitle className='text-lg sm:text-xl md:text-2xl leading-tight break-words-safe'>
                    {exp.role}
                  </CardTitle>
                  <div className='text-sm sm:text-base md:text-lg text-foreground break-words-safe'>
                    {exp.url ? (
                      <a
                        href={exp.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-flex items-center gap-1.5 underline-offset-2 hover:underline font-bold'
                      >
                        {exp.company}
                        <IconExternalLink
                          className='size-4 shrink-0'
                          aria-hidden='true'
                        />
                      </a>
                    ) : (
                      exp.company
                    )}{' '}
                    · {exp.duration}
                  </div>
                  {exp.location ? (
                    <div className='text-sm text-foreground/70'>
                      {exp.location}
                    </div>
                  ) : null}
                </CardHeader>
                <CardContent className='space-y-3 sm:space-y-4'>
                  <p className='text-sm sm:text-base md:text-lg text-foreground leading-relaxed'>
                    {exp.description}
                  </p>
                  <div className='flex flex-wrap gap-2'>
                    {exp.technologies.map((tech) => (
                      <Badge key={tech} variant='chart3'>
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
