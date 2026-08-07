'use client';

import {
  IconBrandDocker,
  IconBrandGit,
  IconBrandJavascript,
  IconBrandMongodb,
  IconBrandNextjs,
  IconBrandNodejs,
  IconBrandPython,
  IconBrandReact,
  IconBrandTypescript,
  IconCode,
  IconDatabase,
  IconSql,
} from '@tabler/icons-react';
import { motion } from 'motion/react';

import Marquee from '@/components/ui/marquee';
import data from '@/lib/data.json';

const iconMap: Record<
  string,
  React.ComponentType<{ className?: string; size?: number | string }>
> = {
  Python: IconBrandPython,
  TypeScript: IconBrandTypescript,
  JavaScript: IconBrandJavascript,
  SQL: IconSql,
  'Next.js': IconBrandNextjs,
  React: IconBrandReact,
  FastAPI: IconCode,
  LangChain: IconCode,
  Docker: IconBrandDocker,
  PostgreSQL: IconDatabase,
  MongoDB: IconBrandMongodb,
  MySQL: IconDatabase,
  Git: IconBrandGit,
  'Node.js': IconBrandNodejs,
  Ray: IconCode,
  vLLM: IconCode,
};

export default function TechSkills() {
  const { techSkills } = data;

  const skillItems = techSkills.map((skill) => {
    const Icon = iconMap[skill.name] || IconCode;
    return (
      <div
        key={skill.name}
        className='inline-flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 md:p-3'
      >
        <Icon className='size-7 sm:size-9 md:size-12' aria-hidden='true' />
        <span className='text-lg sm:text-xl md:text-2xl font-medium'>
          {skill.name}
        </span>
      </div>
    );
  });

  return (
    <section id='skills' className='py-8 sm:py-12 md:py-16 lg:py-24'>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <Marquee items={skillItems} />
      </motion.div>
    </section>
  );
}
