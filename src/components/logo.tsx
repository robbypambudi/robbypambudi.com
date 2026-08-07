import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
  variant?: 'main' | 'dark';
};

export default function Logo({ className, variant = 'main' }: LogoProps) {
  const plate = variant === 'dark' ? '#3d2a52' : '#8b6bc9';
  const ink = variant === 'dark' ? '#ebebeb' : '#000000';

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 240 80'
      role='img'
      aria-label='Robby'
      className={cn('h-8 w-auto max-w-full sm:h-9 md:h-11', className)}
    >
      <title>Robby</title>
      <rect x='12' y='12' width='220' height='60' fill='#000' />
      <rect
        x='4'
        y='4'
        width='220'
        height='60'
        fill={plate}
        stroke='#000'
        strokeWidth='4'
      />
      <text
        x='114'
        y='44'
        textAnchor='middle'
        dominantBaseline='middle'
        fill={ink}
        style={{
          fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
          fontSize: '34px',
          fontWeight: 700,
          letterSpacing: '-0.4px',
        }}
      >
        Robby
      </text>
    </svg>
  );
}
