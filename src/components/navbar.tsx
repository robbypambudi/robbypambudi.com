'use client';

import { IconMenu, IconMoon, IconSun } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'motion/react';
import { useTheme } from 'next-themes';
import { Link } from 'next-view-transitions';
import { useContext, useEffect, useState } from 'react';

import { FirstLoadContext } from '@/components/layout/first-load-animation';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useIsClient } from '@/hooks/use-is-client';
import data from '@/lib/data.json';

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
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const themeIconVariants = {
  initial: { rotate: -90, scale: 0, opacity: 0 },
  animate: { rotate: 0, scale: 1, opacity: 1 },
  exit: { rotate: 90, scale: 0, opacity: 0 },
};

const themeIconTransition = { duration: 0.15, ease: 'easeOut' } as const;

function NavLink({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className?: string;
}) {
  const isHashLink =
    href.includes('#') && (href.startsWith('/#') || href.startsWith('#'));

  if (isHashLink) {
    return (
      <a href={href} className={className}>
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

export default function Navbar() {
  const { navbar, personal } = data;
  const { setTheme, resolvedTheme, theme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const mounted = useIsClient();
  const firstLoadComplete = useContext(FirstLoadContext);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const brandLabel = personal.name.split(' ')[0];
  const logoVariant =
    mounted && resolvedTheme === 'dark' && !isScrolled ? 'dark' : 'main';

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 section-shell-x ${
        isScrolled
          ? 'border-b-4 border-border bg-main'
          : 'border-b-0 bg-background'
      }`}
    >
      <div className='mx-auto flex max-w-7xl items-center justify-between gap-3 h-14 sm:h-16 md:h-20'>
        <motion.div
          className='min-w-0 shrink'
          initial={{ opacity: 0, x: -20 }}
          animate={
            firstLoadComplete ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
          }
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <Link
            href='/'
            className='inline-flex max-w-[min(100%,11rem)] sm:max-w-none items-center min-h-11'
            aria-label={`${personal.name} home`}
          >
            <Logo variant={logoVariant} />
            <span className='sr-only'>{brandLabel}</span>
          </Link>
        </motion.div>

        <motion.div
          className='hidden lg:flex items-center gap-2 xl:gap-3'
          variants={containerVariants}
          initial='hidden'
          animate={firstLoadComplete ? 'visible' : 'hidden'}
        >
          {navbar.links.map((link) => (
            <motion.div
              key={link.href}
              variants={itemVariants}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <Button variant='neutral' size='sm' asChild>
                <NavLink href={link.href} label={link.label} />
              </Button>
            </motion.div>
          ))}
          <motion.div
            variants={itemVariants}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <Button
              variant='neutral'
              onClick={handleThemeToggle}
              aria-label='Toggle dark mode'
              className='relative overflow-hidden cursor-pointer size-11'
            >
              {mounted ? (
                <AnimatePresence mode='sync' initial={false}>
                  {theme === 'dark' ? (
                    <motion.div
                      key='sun'
                      initial={themeIconVariants.initial}
                      animate={themeIconVariants.animate}
                      exit={themeIconVariants.exit}
                      transition={themeIconTransition}
                      className='absolute inset-0 flex items-center justify-center'
                    >
                      <IconSun className='size-5' aria-hidden='true' />
                    </motion.div>
                  ) : (
                    <motion.div
                      key='moon'
                      initial={{ rotate: 90, scale: 0, opacity: 0 }}
                      animate={themeIconVariants.animate}
                      exit={{ rotate: -90, scale: 0, opacity: 0 }}
                      transition={themeIconTransition}
                      className='absolute inset-0 flex items-center justify-center'
                    >
                      <IconMoon className='size-5' aria-hidden='true' />
                    </motion.div>
                  )}
                </AnimatePresence>
              ) : (
                <IconMoon className='size-5' aria-hidden='true' />
              )}
            </Button>
          </motion.div>
        </motion.div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant='neutral'
              size='icon'
              className='lg:hidden size-11 shrink-0'
              aria-label='Open menu'
            >
              <IconMenu className='size-5 sm:size-6' aria-hidden='true' />
            </Button>
          </SheetTrigger>
          <SheetContent
            side='right'
            className='w-[min(100vw-1rem,22rem)] sm:max-w-sm'
          >
            <SheetHeader className='pr-12'>
              <SheetTitle className='text-xl'>Menu</SheetTitle>
            </SheetHeader>
            <div className='flex flex-col gap-3 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]'>
              {navbar.links.map((link) => (
                <SheetClose key={link.href} asChild>
                  <Button
                    variant='neutral'
                    size='lg'
                    className='w-full justify-start text-base h-14 px-4'
                    asChild
                  >
                    <NavLink href={link.href} label={link.label} />
                  </Button>
                </SheetClose>
              ))}
              <Button
                variant='neutral'
                size='lg'
                className='w-full justify-start text-base h-14 px-4'
                onClick={handleThemeToggle}
                aria-label='Toggle dark mode'
              >
                {mounted && theme === 'dark' ? (
                  <>
                    <IconSun className='size-6' aria-hidden='true' />
                    Light Mode
                  </>
                ) : (
                  <>
                    <IconMoon className='size-6' aria-hidden='true' />
                    Dark Mode
                  </>
                )}
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
