'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import { Link2, Check, MessageCircle } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

interface ShareSectionProps {
  groomName: string;
  brideName: string;
  date: Date;
  venue: string;
}

const KAKAO_APP_KEY = 'adc120281530091ebcf438a608843c74';
const SITE_URL = 'https://kim-and-jang-wedding-invitation.vercel.app';
const SHARE_IMAGE_PATH = '/images/QuickShare_2602221518/IMG_0027.jpg';
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
  const [kakaoReady, setKakaoReady] = useState(false);

  useEffect(() => {
    const initKakao = () => {
      if (typeof window !== 'undefined' && window.Kakao) {
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init(KAKAO_APP_KEY);
        }
        setKakaoReady(true);
      }
    };

    if (typeof window !== 'undefined' && window.Kakao) {
      initKakao();
      return;
    }

    const interval = setInterval(() => {
      if (typeof window !== 'undefined' && window.Kakao) {
        initKakao();
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const handleCopyLink = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const success = await copyToClipboard(url);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleKakaoShare = useCallback(() => {
    if (!kakaoReady || !window.Kakao) return;

    const title = `${groomName} ♥ ${brideName} 결혼합니다`;
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const description = `${year}년 ${month}월 ${day}일 ${dayNames[date.getDay()]}요일 오후 12시 30분\n${venue}`;

    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title,
        description,
        imageUrl: `${SITE_URL}${SHARE_IMAGE_PATH}`,
        imageWidth: 800,
        imageHeight: 1200,
        link: {
          mobileWebUrl: SITE_URL,
          webUrl: SITE_URL,
        },
      },
      buttons: [
        {
          title: '청첩장 보기',
          link: {
            mobileWebUrl: SITE_URL,
            webUrl: SITE_URL,
          },
        },
        {
          title: '위치 보기',
          link: {
            mobileWebUrl: `${SITE_URL}#location`,
            webUrl: `${SITE_URL}#location`,
          },
        },
      ],
    });
  }, [kakaoReady, groomName, brideName, date, venue]);

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
            onClick={handleKakaoShare}
            disabled={!kakaoReady}
            className="flex-1 flex items-center justify-center gap-3 py-4 bg-[#FEE500] text-[#191919] font-mono text-[12px] tracking-wide transition-all hover:bg-[#F5DC00] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <MessageCircle size={18} strokeWidth={1.5} />
            <span>KAKAOTALK</span>
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
