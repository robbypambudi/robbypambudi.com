import * as React from 'react';

import CollapsibleText from '@/components/CollapsibleText';
import ButtonLink from '@/components/links/ButtonLink';
import { UnstyledLinkProps } from '@/components/links/UnstyledLink';
import NextImage from '@/components/NextImage';
import Tag from '@/components/Tag';
import Typography from '@/components/Typography';
import clsxm from '@/lib/clsxm';
import { ProjectDataType } from '@/types/entitas/projects';

type ProjectCardProps = {
  card: ProjectDataType;
  onClick?: () => void;
} & Omit<UnstyledLinkProps, 'children' | 'href'>;

export default function ProjectCard({ card, onClick }: ProjectCardProps) {
  return (
    <div
      className={clsxm(
        'flex flex-col justify-between shadow-lg py-2 border border-primary-300 rounded-md',
        'group h-[400px] md:h-[480px] pb-4 hover:border-primary-100 overflow-y-auto overflow-x-hidden'
      )}
      onClick={onClick}
    >
      <div>
        <NextImage
          useSkeleton
          src={card.image}
          alt={card.name}
          width={800}
          height={400}
          className='w-full group-hover:scale-[1.06] transition-all duration-300'
          imgClassName='rounded-sm'
        />
        <div className='px-4 mt-4 w-full flex flex-col justify-center'>
          <div className='flex justify-between items-center gap-x-1'>
            <Typography
              variant='h3'
              as='h3'
              color='primary'
              className='font-secondary'
            >
              {card.name}
            </Typography>
            <div>
              <Typography
                variant='c2'
                color='gray'
                className='font-secondary  text-end'
              >
                {card.date_start} - {card.date_end}
              </Typography>
            </div>
          </div>
          <div className='flex flex-wrap gap-2 mt-2'>
            {card.technologies.map((tech, index) => (
              <Tag key={index} className=''>
                {tech}
              </Tag>
            ))}
          </div>
          <CollapsibleText className='mt-4'>{card.description}</CollapsibleText>
        </div>
      </div>
      <div className='mt-2 pl-4 flex gap-x-4'>
        <ButtonLink href={card.github} variant='primary' openNewTab>
          Github
        </ButtonLink>
        <ButtonLink href={card.url} variant='primary' openNewTab>
          Demo
        </ButtonLink>
      </div>
    </div>
  );
}
