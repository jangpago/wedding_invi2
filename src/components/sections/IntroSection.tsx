'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface IntroSectionProps {
  groomName: string;
  brideName: string;
  onComplete: () => void;
}

const EASE_ELEGANT: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface Petal {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
  opacity: number;
}

const FIXED_PETALS: Petal[] = [
  { id: 0, x: 5, delay: 0, duration: 10, size: 16, rotation: 220, opacity: 0.5 },
  { id: 1, x: 12, delay: 0.3, duration: 12, size: 20, rotation: 280, opacity: 0.4 },
  { id: 2, x: 20, delay: 0.8, duration: 9, size: 14, rotation: 200, opacity: 0.6 },
  { id: 3, x: 28, delay: 1.5, duration: 11, size: 18, rotation: 320, opacity: 0.45 },
  { id: 4, x: 35, delay: 0.2, duration: 13, size: 22, rotation: 240, opacity: 0.35 },
  { id: 5, x: 42, delay: 1.0, duration: 10, size: 15, rotation: 300, opacity: 0.55 },
  { id: 6, x: 50, delay: 0.6, duration: 11, size: 19, rotation: 260, opacity: 0.4 },
  { id: 7, x: 58, delay: 1.3, duration: 14, size: 17, rotation: 340, opacity: 0.5 },
  { id: 8, x: 65, delay: 0.1, duration: 9, size: 21, rotation: 210, opacity: 0.45 },
  { id: 9, x: 72, delay: 0.9, duration: 12, size: 13, rotation: 290, opacity: 0.55 },
  { id: 10, x: 80, delay: 1.7, duration: 10, size: 16, rotation: 250, opacity: 0.4 },
  { id: 11, x: 88, delay: 0.4, duration: 11, size: 18, rotation: 310, opacity: 0.5 },
  { id: 12, x: 95, delay: 1.1, duration: 12, size: 15, rotation: 230, opacity: 0.45 },
  { id: 13, x: 8, delay: 2.0, duration: 10, size: 20, rotation: 270, opacity: 0.5 },
  { id: 14, x: 18, delay: 1.6, duration: 13, size: 17, rotation: 190, opacity: 0.4 },
  { id: 15, x: 32, delay: 2.2, duration: 11, size: 19, rotation: 330, opacity: 0.55 },
  { id: 16, x: 45, delay: 1.9, duration: 9, size: 14, rotation: 250, opacity: 0.5 },
  { id: 17, x: 55, delay: 2.5, duration: 12, size: 21, rotation: 300, opacity: 0.4 },
  { id: 18, x: 68, delay: 2.1, duration: 10, size: 16, rotation: 220, opacity: 0.55 },
  { id: 19, x: 78, delay: 2.8, duration: 14, size: 18, rotation: 280, opacity: 0.45 },
  { id: 20, x: 85, delay: 2.4, duration: 11, size: 15, rotation: 240, opacity: 0.5 },
  { id: 21, x: 92, delay: 3.0, duration: 13, size: 20, rotation: 310, opacity: 0.4 },
  { id: 22, x: 3, delay: 2.6, duration: 10, size: 17, rotation: 260, opacity: 0.55 },
  { id: 23, x: 25, delay: 3.2, duration: 12, size: 19, rotation: 200, opacity: 0.45 },
];

function FloatingPetal({ petal }: { petal: Petal }) {
  return (
    <motion.div
      initial={{ 
        x: petal.x + '%',
        y: -20,
        rotate: 0,
        opacity: 0,
      }}
      animate={{ 
        y: '120vh',
        rotate: petal.rotation,
        opacity: [0, petal.opacity, petal.opacity, 0],
      }}
      transition={{
        duration: petal.duration,
        delay: petal.delay,
        ease: 'linear',
        repeat: Infinity,
      }}
      className="absolute pointer-events-none"
      style={{
        width: petal.size,
        height: petal.size,
      }}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="text-[var(--color-accent-light)] w-full h-full">
        <ellipse cx="12" cy="12" rx="6" ry="10" />
      </svg>
    </motion.div>
  );
}

export default function IntroSection({ groomName, brideName, onComplete }: IntroSectionProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setShowContent(true), 500),
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(onComplete, 600);
      }, 4500),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: EASE_ELEGANT },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 1, ease: EASE_ELEGANT },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE_ELEGANT }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
        >
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, #FDF8F5 0%, #FAF5F0 30%, #F8F0EA 70%, #FDF8F5 100%)',
            }}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at 50% 30%, rgba(200, 170, 170, 0.15) 0%, transparent 60%)',
            }}
          />

          <div className="absolute inset-0 overflow-hidden">
            {FIXED_PETALS.map((petal) => (
              <FloatingPetal key={petal.id} petal={petal} />
            ))}
          </div>

          <div className="absolute inset-0 film-grain pointer-events-none opacity-50" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={showContent ? "visible" : "hidden"}
            className="relative text-center px-8 z-10"
          >
            <motion.p
              variants={fadeUpVariants}
              className="font-mono text-[11px] tracking-[0.5em] text-[var(--color-text-muted)] mb-6"
            >
              WEDDING INVITATION
            </motion.p>

            <motion.div 
              variants={lineVariants} 
              className="w-12 h-px bg-[var(--color-primary-light)] mx-auto mb-10 origin-center" 
            />

            <motion.div variants={fadeUpVariants} className="mb-4">
              <span className="font-nanum text-[44px] leading-[1] tracking-[-0.02em] text-[var(--color-text)] block">
                {groomName}
              </span>
            </motion.div>

            <motion.div variants={fadeUpVariants} className="mb-4">
              <span className="font-display text-[28px] text-[var(--color-accent)]">&</span>
            </motion.div>

            <motion.div variants={fadeUpVariants} className="mb-10">
              <span className="font-nanum text-[44px] leading-[1] tracking-[-0.02em] text-[var(--color-text)] block">
                {brideName}
              </span>
            </motion.div>

            <motion.div 
              variants={lineVariants} 
              className="w-12 h-px bg-[var(--color-primary-light)] mx-auto mb-8 origin-center" 
            />

            <motion.p
              variants={fadeUpVariants}
              className="font-mono text-[12px] tracking-[0.4em] text-[var(--color-text-muted)]"
            >
              2026. 04. 05
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={showContent ? { opacity: 1 } : {}}
            transition={{ delay: 2.5, duration: 0.5 }}
            className="absolute bottom-12 z-10"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-px h-6 bg-gradient-to-b from-transparent via-[var(--color-text-muted)] to-transparent" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-text-muted)]">
                SCROLL
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
