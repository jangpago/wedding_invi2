'use client';

import { motion } from 'framer-motion';

const EASE_ELEGANT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function FooterSection() {
  return (
    <footer className="py-12 px-6 bg-[var(--color-bg)] border-t border-[var(--color-border)]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE_ELEGANT }}
        className="text-center"
      >
        <div className="mb-6">
          <svg
            className="w-6 h-6 mx-auto text-[var(--color-primary)]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-text-muted)]">
          MADE WITH LOVE
        </p>
      </motion.div>
    </footer>
  );
}
