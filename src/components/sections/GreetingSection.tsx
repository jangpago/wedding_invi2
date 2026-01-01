'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface GreetingSectionProps {
  title: string;
  message: string;
  groomName: string;
  brideName: string;
  groomParents: { father: string; mother: string };
  brideParents: { father: string; mother: string };
}

const EASE_ELEGANT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function GreetingSection({
  title,
  message,
  groomName,
  brideName,
  groomParents,
  brideParents,
}: GreetingSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: EASE_ELEGANT },
    },
  };

  const lineVariants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: { duration: 0.8, ease: EASE_ELEGANT },
    },
  };

  return (
    <section ref={ref} className="py-24 px-6 bg-[var(--color-bg)] paper-texture">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-sm mx-auto"
      >
        <motion.div variants={itemVariants} className="text-center mb-10">
          <p className="section-title mb-4">INVITATION</p>
          <h2 className="font-display text-[28px] leading-[1.3] tracking-[-0.01em] text-[var(--color-text)]">
            {title}
          </h2>
        </motion.div>

        <motion.div
          variants={lineVariants}
          className="w-px h-12 bg-[var(--color-border)] mx-auto mb-10 origin-top"
        />

        <motion.div
          variants={itemVariants}
          className="mb-12 text-center"
        >
          <p className="font-[family-name:var(--font-heading)] text-[15px] leading-[2.4] text-[var(--color-text-light)] whitespace-pre-line text-balance">
            {message}
          </p>
        </motion.div>

        <motion.div
          variants={lineVariants}
          className="w-px h-12 bg-[var(--color-border)] mx-auto mb-10 origin-top"
        />

        <motion.div variants={itemVariants} className="text-center">
          <div className="inline-flex items-center gap-6 text-sm">
            <div className="text-right">
              <p className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-text-muted)] mb-2">
                GROOM
              </p>
              <p className="text-[var(--color-text-light)] text-[13px] mb-1">
                {groomParents.father} · {groomParents.mother}
                <span className="text-[var(--color-text-muted)] ml-1 text-[12px]">의 아들</span>
              </p>
              <p className="font-display text-[20px] text-[var(--color-groom)]">{groomName}</p>
            </div>
            
            <div className="w-px h-16 bg-[var(--color-border)]" />
            
            <div className="text-left">
              <p className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-text-muted)] mb-2">
                BRIDE
              </p>
              <p className="text-[var(--color-text-light)] text-[13px] mb-1">
                {brideParents.father} · {brideParents.mother}
                <span className="text-[var(--color-text-muted)] ml-1 text-[12px]">의 딸</span>
              </p>
              <p className="font-display text-[20px] text-[var(--color-bride)]">{brideName}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
