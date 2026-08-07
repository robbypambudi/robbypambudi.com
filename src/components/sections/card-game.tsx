'use client';

import {
  IconBrandDocker,
  IconBrandNextjs,
  IconBrandPython,
  IconBrandReact,
  IconBrandTypescript,
  IconCardsFilled,
  IconDatabase,
  IconDeviceGamepad2,
  IconRefresh,
  IconRotateClockwise,
} from '@tabler/icons-react';
import { motion } from 'motion/react';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';

type GameState = 'idle' | 'playing' | 'ended';

type TechIconType = React.ComponentType<{
  className?: string;
  size?: number;
}>;

type Card = {
  id: string;
  techIcon: TechIconType;
  techKey: string;
  flipped: boolean;
  matched: boolean;
};

const TECH_STACK: { icon: TechIconType; key: string }[] = [
  { icon: IconBrandPython, key: 'python' },
  { icon: IconBrandTypescript, key: 'typescript' },
  { icon: IconBrandNextjs, key: 'nextjs' },
  { icon: IconBrandReact, key: 'react' },
  { icon: IconBrandDocker, key: 'docker' },
  { icon: IconDatabase, key: 'postgresql' },
];

const CARD_FRONT_COLOR = 'var(--chart-2)';
const CARD_BACK_COLOR = 'var(--chart-10)';

const idleFlipSequence: number[][] = [
  [0, 5, 10],
  [3, 4, 9],
  [1, 7, 11],
  [2, 6, 8],
];

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const STAGGER_DELAY = 0.05;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: STAGGER_DELAY,
      delayChildren: 0,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: 'easeOut' as const,
    },
  },
};

export type CardGameProps = {
  entranceReady?: boolean;
};

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function createInitialCards(): Card[] {
  const pairs = [...TECH_STACK, ...TECH_STACK];
  const shuffled = shuffleArray(pairs);
  return shuffled.map((tech, idx) => ({
    id: `${idx}-${tech.key}`,
    techIcon: tech.icon,
    techKey: tech.key,
    flipped: false,
    matched: false,
  }));
}

export default function CardGame({ entranceReady = true }: CardGameProps) {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [cards, setCards] = useState<Card[]>(createInitialCards);
  const [firstCard, setFirstCard] = useState<Card | null>(null);
  const [secondCard, setSecondCard] = useState<Card | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const idleIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const idleIndexRef = useRef(0);
  const previousSequenceIndicesRef = useRef<number[]>([]);

  const viewState: GameState =
    gameState === 'playing' &&
    cards.length > 0 &&
    cards.every((card) => card.matched)
      ? 'ended'
      : gameState;

  const startGame = () => {
    if (idleIntervalRef.current) {
      clearInterval(idleIntervalRef.current);
      idleIntervalRef.current = null;
    }
    setCards(createInitialCards());
    setFirstCard(null);
    setSecondCard(null);
    setGameState('playing');
    setIsFlipping(false);
    idleIndexRef.current = 0;
    setAnimationKey((prev) => prev + 1);
  };

  const handleCardClick = (card: Card) => {
    if (gameState !== 'playing' || card.flipped || card.matched || isFlipping)
      return;

    if (firstCard === null) {
      setCards((prev) =>
        prev.map((c) => (c.id === card.id ? { ...c, flipped: true } : c)),
      );
      setFirstCard(card);
    } else if (secondCard === null && card.id !== firstCard.id) {
      setCards((prev) =>
        prev.map((c) => (c.id === card.id ? { ...c, flipped: true } : c)),
      );
      setSecondCard(card);
      setIsFlipping(true);
    }
  };

  useEffect(() => {
    if (firstCard && secondCard && isFlipping) {
      const timer = setTimeout(() => {
        if (firstCard.techKey === secondCard.techKey) {
          setCards((prev) =>
            prev.map((c) =>
              c.techKey === firstCard.techKey ? { ...c, matched: true } : c,
            ),
          );
        } else {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstCard.id || c.id === secondCard.id
                ? { ...c, flipped: false }
                : c,
            ),
          );
        }
        setFirstCard(null);
        setSecondCard(null);
        setIsFlipping(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [firstCard, secondCard, isFlipping]);

  useEffect(() => {
    if (gameState === 'idle' && cards.length > 0 && !prefersReducedMotion()) {
      idleIntervalRef.current = setInterval(() => {
        const sequenceIndex = idleIndexRef.current % idleFlipSequence.length;
        const cardIndices = idleFlipSequence[sequenceIndex];
        const previousIndices = previousSequenceIndicesRef.current;

        setCards((prev) =>
          prev.map((card, idx) => {
            if (previousIndices.includes(idx)) {
              return { ...card, flipped: false };
            }
            if (cardIndices.includes(idx)) {
              return { ...card, flipped: true };
            }
            return card;
          }),
        );

        previousSequenceIndicesRef.current = cardIndices;
        idleIndexRef.current += 1;
      }, 1000);
    }

    return () => {
      if (idleIntervalRef.current) {
        clearInterval(idleIntervalRef.current);
        idleIntervalRef.current = null;
      }
    };
  }, [gameState, cards.length]);

  return (
    <div className='w-full border-4 border-border rounded-lg bg-main p-3 sm:p-4 md:p-6 flex flex-col gap-3 sm:gap-4 overflow-hidden'>
      <motion.div
        key={animationKey}
        className='grid grid-cols-4 gap-2 sm:gap-3 md:gap-4'
        variants={containerVariants}
        initial='hidden'
        animate={entranceReady ? 'visible' : 'hidden'}
      >
        {cards.map((card) => {
          const Icon = card.techIcon;
          const isFlipped = card.flipped || card.matched;

          return (
            <motion.button
              key={card.id}
              type='button'
              disabled={gameState !== 'playing' || card.matched}
              className='relative w-full aspect-square min-h-0 min-w-0 origin-center border-0 bg-transparent p-0 text-left shadow-none outline-none ring-0 perspective-[1000px] transition-transform duration-300 enabled:cursor-pointer disabled:cursor-default enabled:hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'
              onClick={() => handleCardClick(card)}
              variants={cardVariants}
              aria-label={
                card.flipped || card.matched
                  ? `Card showing ${card.techKey}`
                  : 'Hidden card - click to flip'
              }
            >
              <motion.div
                className='relative w-full h-full rounded-base sm:rounded-lg border-2 border-border shadow-shadow transform-3d'
                animate={{
                  rotateY: isFlipped ? 180 : 0,
                }}
                transition={{ duration: 0.5 }}
              >
                <div
                  className='absolute inset-0 rounded-base flex items-center justify-center backface-hidden transform-[rotateY(180deg)]'
                  style={{ backgroundColor: CARD_FRONT_COLOR }}
                >
                  <Icon className='size-5 sm:size-7 md:size-9 lg:size-11 text-secondary-background' />
                </div>
                <div
                  className='absolute inset-0 rounded-base flex items-center justify-center backface-hidden'
                  style={{ backgroundColor: CARD_BACK_COLOR }}
                >
                  <IconCardsFilled className='size-5 sm:size-7 md:size-9 lg:size-11 text-secondary-background' />
                </div>
              </motion.div>
              {card.matched && (
                <div className='absolute inset-0 rounded-base bg-main/10 pointer-events-none' />
              )}
            </motion.button>
          );
        })}
      </motion.div>

      <div className='flex justify-center'>
        {viewState === 'idle' && (
          <Button
            onClick={startGame}
            size='lg'
            className='bg-chart-2 text-main-foreground w-full sm:w-auto'
            aria-label='Start the memory card game'
          >
            <IconDeviceGamepad2 className='size-5' aria-hidden='true' />
            Start Game
          </Button>
        )}
        {viewState === 'playing' && (
          <Button
            onClick={startGame}
            size='lg'
            variant='neutral'
            className='bg-chart-4 text-main-foreground w-full sm:w-auto'
            aria-label='Restart the memory card game'
          >
            <IconRefresh className='size-5' aria-hidden='true' />
            Restart Game
          </Button>
        )}
        {viewState === 'ended' && (
          <Button
            onClick={startGame}
            size='lg'
            className='bg-chart-3 text-main-foreground w-full sm:w-auto'
            aria-label='Play the memory card game again'
          >
            <IconRotateClockwise className='size-5' aria-hidden='true' />
            Play Again
          </Button>
        )}
      </div>
    </div>
  );
}
