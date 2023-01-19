import * as React from 'react';

import { UnstyledLinkProps } from '@/components/links/UnstyledLink';
import NextImage from '@/components/NextImage';
import Typography from '@/components/Typography';
import clsxm from '@/lib/clsxm';
import { SkillDataType } from '@/types/entitas/skill';

type SkillCardProps = {
  card: SkillDataType;
  onClick?: () => void;
} & Omit<UnstyledLinkProps, 'children' | 'href'>;

export default function SkillCard({ card, onClick }: SkillCardProps) {
  return (
    <button
      className={clsxm(
        'md:h-[220px] md:w-[220px] flex flex-col items-center justify-center shadow-lg',
        'shadow-primary-700 hover:scale-[1.05] duration-300',
        'h-[150px] w-[150px] '
      )}
      onClick={onClick}
    >
      <NextImage
        src={card.image}
        alt={card.technologie}
        width={128}
        height={128}
        className='w-24 h-24 md:w-32 md:h-32'
      />
      <Typography variant='h5' as='h5' color='white' className='mt-4'>
        {card.technologie}
      </Typography>
    </button>
  );
}
