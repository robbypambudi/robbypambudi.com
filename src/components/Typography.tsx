import * as React from 'react';

import clsxm from '@/lib/clsxm';

enum TypographyVariant {
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'p',
  's1',
  's2',
  'b1',
  'b2',
  'c1',
  'c2',
  'l1',
  'l2',
}

enum TypographyColor {
  'white',
  'primary',
  'gray',
  'danger',
  'success',
  'warning',
}

type TypographyProps<T extends React.ElementType> = {
  as?: T;
  className?: string;
  color?: keyof typeof TypographyColor;
  variant?: keyof typeof TypographyVariant;
  children: React.ReactNode;
};

export default function Typography<T extends React.ElementType>({
  as,
  children,
  className,
  color = 'primary',
  variant = 'p',
  ...rest
}: TypographyProps<T>) {
  const Component = as || 'p';

  return (
    <Component
      className={clsxm(
        // Variants
        [
          variant === 'h1' && 'text-4xl font-bold',
          variant === 'h2' && 'text-3xl font-semibold',
          variant === 'h3' && 'font-semibold text-xl',
          variant === 'h4' && 'text-xl font-normal',
          variant === 'h5' && 'text-lg font-normal',
          variant === 'h6' && 'text-base font-semibold',
          variant === 'p' && 'text-sm font-normal',
          variant === 's1' && 'text-sm font-semibold',
          variant === 's2' && 'text-xs font-semibold',
          variant === 'b1' && 'text-base font-medium',
          variant === 'b2' && 'text-sm font-medium',
          variant === 'c1' && 'text-base font-normal',
          variant === 'c2' && 'font-normal text-sm',
          variant === 'l1' && 'text-base font-light',
          variant === 'l2' && 'text-sm font-light',
        ],

        // Colors
        [
          color === 'white' && 'text-white',
          color === 'primary' && 'text-typo',
          color === 'gray' && 'text-typo-secondary',
          color === 'danger' && 'text-danger-500',
          color === 'success' && 'text-success-300',
          color === 'warning' && 'text-warning-100',
        ],
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
