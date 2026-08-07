'use client';

import { motion } from 'motion/react';
import {
  createContext,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

/** True after the first-load blur animation has completed. */
export const FirstLoadContext = createContext(false);

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function FirstLoadAnimation({ children }: { children: ReactNode }) {
  const hasAnimatedRef = useRef(false);
  const [done, setDone] = useState(false);

  const markDone = useCallback(() => {
    if (hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;
    setDone(true);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) {
      markDone();
      return;
    }

    // Fallback if animation complete never fires
    const timeout = window.setTimeout(markDone, 1200);
    return () => window.clearTimeout(timeout);
  }, [markDone]);

  if (done) {
    return (
      <FirstLoadContext.Provider value={true}>
        {children}
      </FirstLoadContext.Provider>
    );
  }

  return (
    <FirstLoadContext.Provider value={false}>
      <motion.div
        initial={{ filter: 'blur(12px)' }}
        animate={{ filter: 'blur(0px)' }}
        transition={{
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        onAnimationComplete={markDone}
        style={{ minHeight: '100vh' }}
      >
        {children}
      </motion.div>
    </FirstLoadContext.Provider>
  );
}
