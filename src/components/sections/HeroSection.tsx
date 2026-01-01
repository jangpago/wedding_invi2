'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { formatKoreanDate } from '@/lib/utils';

interface HeroSectionProps {
  groomName: string;
  brideName: string;
  date: Date;
  venue: string;
  mainImage?: string;
}

const EASE_ELEGANT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function HeroSection({
  groomName,
  brideName,
  date,
  venue,
  mainImage = '/mainimage/IMG_5638.jpg',
}: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex flex-col">
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: EASE_ELEGANT }}
        className="absolute inset-0 z-0"
      >
        <div className="relative w-full h-full">
          <Image
            src={mainImage}
            alt="메인 웨딩 사진"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/70" />
          <div className="absolute inset-0 film-grain" />
        </div>
      </motion.div>

      <div className="relative z-10 flex-1 flex flex-col justify-end pb-16 px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1, ease: EASE_ELEGANT }}
        >
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: EASE_ELEGANT }}
            className="font-mono text-[10px] tracking-[0.5em] text-white/60 mb-4"
          >
            SAVE THE DATE
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1, ease: EASE_ELEGANT }}
            className="text-white mb-6"
          >
            <span className="font-display text-[48px] leading-[1.1] tracking-[-0.02em] block">
              {groomName}
            </span>
            <span className="font-display text-[28px] text-white/60 tracking-wide inline-block my-2">&</span>
            <span className="font-display text-[48px] leading-[1.1] tracking-[-0.02em] block">
              {brideName}
            </span>
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 0.8, ease: EASE_ELEGANT }}
            className="w-20 h-px bg-white/40 mb-6 origin-left"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8, ease: EASE_ELEGANT }}
            className="space-y-1"
          >
            <p className="font-mono text-[11px] tracking-[0.15em] text-white/80">
              {formatKoreanDate(date)}
            </p>
            <p className="text-[13px] text-white/60">{venue}</p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
