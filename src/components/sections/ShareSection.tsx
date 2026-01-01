'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Link2, Check, Share2 } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

interface ShareSectionProps {
  groomName: string;
  brideName: string;
  date: Date;
  venue: string;
}

const EASE_ELEGANT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function ShareSection({
  groomName,
  brideName,
  date,
  venue,
}: ShareSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [copied, setCopied] = useState(false);

  const formatDate = (d: Date) => {
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    return `${year}년 ${month}월 ${day}일 ${dayNames[d.getDay()]}요일`;
  };

  const handleCopyLink = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const success = await copyToClipboard(url);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = () => {
    const shareText = `${groomName} ♥ ${brideName} 결혼합니다\n\n${formatDate(date)}\n${venue}`;
    const url = typeof window !== 'undefined' ? window.location.href : '';
    
    if (navigator.share) {
      navigator.share({
        title: `${groomName} ♥ ${brideName} 결혼합니다`,
        text: shareText,
        url: url,
      });
    } else {
      window.open(`https://sharer.kakao.com/talk/friends/picker/link?url=${encodeURIComponent(url)}`, '_blank');
    }
  };

  return (
    <section ref={ref} className="py-20 px-6 bg-[var(--color-bg-secondary)] paper-texture">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE_ELEGANT }}
      >
        <div className="text-center mb-10">
          <p className="section-title mb-3">SHARE</p>
          <h2 className="font-display text-[28px] tracking-[-0.01em]">공유하기</h2>
        </div>

        <div className="flex gap-3">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleShare}
            className="flex-1 flex items-center justify-center gap-3 py-4 bg-[var(--color-accent)] text-[var(--color-text)] font-mono text-[12px] tracking-wide transition-all hover:bg-[var(--color-accent-dark)]"
          >
            <Share2 size={18} strokeWidth={1.5} />
            <span>SHARE</span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleCopyLink}
            className="flex-1 flex items-center justify-center gap-3 py-4 bg-white border border-[var(--color-border)] font-mono text-[12px] tracking-wide transition-all hover:bg-[var(--color-bg-secondary)]"
          >
            {copied ? (
              <>
                <Check size={18} strokeWidth={1.5} className="text-[var(--color-primary)]" />
                <span className="text-[var(--color-primary)]">COPIED</span>
              </>
            ) : (
              <>
                <Link2 size={18} strokeWidth={1.5} />
                <span>COPY LINK</span>
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
