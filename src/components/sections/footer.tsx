'use client';

import { motion } from 'motion/react';

import LikeCounter from '@/components/like-counter';
import data from '@/lib/data.json';

export default function Footer() {
  return (
    <motion.footer
      className='border-t-4 border-border py-6 sm:py-8'
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className='section-shell-x mx-auto max-w-7xl pb-[max(0.5rem,env(safe-area-inset-bottom))]'>
        <div className='flex flex-col items-center justify-center gap-4 text-foreground sm:flex-row sm:justify-between'>
          <p className='text-sm sm:text-base break-words-safe text-center sm:text-left'>
            © {new Date().getFullYear()} {data.personal.name}. All rights
            reserved.
          </p>
          <LikeCounter compact />
        </div>
      </div>
    </motion.footer>
  );
}
