'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { calculateDday } from '@/lib/utils';

interface CalendarSectionProps {
  date: Date;
  groomName: string;
  brideName: string;
}

const EASE_ELEGANT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function CalendarSection({ date, groomName, brideName }: CalendarSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [dday, setDday] = useState<number>(0);

  useEffect(() => {
    setDday(calculateDday(date));
  }, [date]);

  const year = date.getFullYear();
  const month = date.getMonth();
  const targetDay = date.getDate();
  const dayOfWeek = date.getDay();
  
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
  
  const days: (number | null)[] = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let i = 1; i <= lastDateOfMonth; i++) {
    days.push(i);
  }

  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const dayNamesEn = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASE_ELEGANT },
    },
  };

  return (
    <section ref={ref} className="py-20 px-6 bg-[var(--color-bg-secondary)] paper-texture">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants} className="text-center mb-8">
          <p className="section-title mb-6">CALENDAR</p>
          
          <p className="font-mono text-[11px] tracking-[0.4em] text-[var(--color-text-muted)] mb-2">
            {dayNames[dayOfWeek]}요일
          </p>
          <motion.p 
            className="font-display text-[100px] leading-none tracking-[-0.03em] text-[var(--color-text)]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8, ease: EASE_ELEGANT }}
          >
            {String(targetDay).padStart(2, '0')}
          </motion.p>
          <p className="font-display text-[24px] mt-2 text-[var(--color-text-light)]">
            {year}년 {month + 1}월
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="max-w-[280px] mx-auto mb-10">
          <div className="border-t border-b border-[var(--color-border)] py-4">
            <div className="grid grid-cols-7 gap-0 mb-3">
              {dayNames.map((day, idx) => (
                <div
                  key={day}
                  className={`text-[11px] text-center font-mono tracking-wider ${
                    idx === 0 ? 'text-[var(--color-accent-dark)]' : idx === 6 ? 'text-[var(--color-groom)]' : 'text-[var(--color-text-muted)]'
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-0">
              {days.map((day, idx) => (
                <div
                  key={idx}
                  className={`relative aspect-square flex items-center justify-center text-[13px]
                    ${day === targetDay ? 'text-white font-medium' : ''}
                    ${idx % 7 === 0 && day !== targetDay ? 'text-[var(--color-accent-dark)]' : ''}
                    ${idx % 7 === 6 && day !== targetDay ? 'text-[var(--color-groom)]' : ''}
                    ${day && day !== targetDay ? 'text-[var(--color-text-light)]' : ''}
                  `}
                >
                  {day === targetDay && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                      className="absolute inset-1 bg-[var(--color-accent)] rounded-full"
                    />
                  )}
                  <span className="relative z-10">{day}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="text-center"
        >
          <div className="inline-block px-8 py-5 bg-white shadow-editorial">
            <p className="font-mono text-[11px] tracking-[0.3em] text-[var(--color-text-muted)] mb-3">
              {groomName} & {brideName}
            </p>
            <p className="font-display text-[var(--color-primary)]">
              {dday > 0 ? (
                <>
                  <span className="text-[36px] tracking-[-0.02em]">{dday}</span>
                  <span className="text-[15px] ml-2 text-[var(--color-text-light)]">일 남았습니다</span>
                </>
              ) : dday === 0 ? (
                <span className="text-[24px]">오늘이 결혼식입니다</span>
              ) : (
                <>
                  <span className="text-[36px] tracking-[-0.02em]">{Math.abs(dday)}</span>
                  <span className="text-[15px] ml-2 text-[var(--color-text-light)]">일 지났습니다</span>
                </>
              )}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
