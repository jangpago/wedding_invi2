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

export default function HeroSection({
  groomName,
  brideName,
  date,
  venue,
  mainImage = '/images/main.jpg',
}: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex flex-col">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-0"
      >
        <div className="relative w-full h-full bg-gradient-to-b from-[var(--color-primary-light)] to-[var(--color-bg)]">
          <Image
            src={mainImage}
            alt="메인 웨딩 사진"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
        </div>
      </motion.div>

      <div className="relative z-10 flex-1 flex flex-col justify-end pb-16 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center"
        >
          <p className="text-[11px] tracking-[0.3em] text-[#E8D5C4] mb-6 font-light">
            SAVE THE DATE
          </p>
          
          <h1 className="font-[family-name:var(--font-heading)] text-[32px] mb-8 leading-relaxed">
            <span className="text-[#FFF9F0]">{groomName}</span>
            <span className="text-[#FFF9F0] mx-4 text-2xl align-middle">&</span>
            <span className="text-[#FFF9F0]">{brideName}</span>
          </h1>

          <div className="text-[13px] text-[#E8D5C4] tracking-wide">
            <p className="mb-1">{formatKoreanDate(date)}</p>
            <p className="text-[#D4A574]">{venue}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-8 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-text-muted)"
              strokeWidth="1.5"
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
