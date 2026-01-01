'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { MapPin, Phone, Car, Train, Bus } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

interface MapSectionProps {
  venue: {
    name: string;
    hall: string;
    address: string;
    phone: string;
    coordinates: { lat: number; lng: number };
    transportation: {
      subway?: string;
      bus?: string;
      car?: string;
      etc?: string;
    };
  };
}

const EASE_ELEGANT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function MapSection({ venue }: MapSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = async () => {
    const success = await copyToClipboard(venue.address);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const openNaverMap = () => {
    window.open(
      `https://map.naver.com/v5/search/${encodeURIComponent(venue.address)}`,
      '_blank'
    );
  };

  const openKakaoMap = () => {
    window.open(
      `https://map.kakao.com/link/search/${encodeURIComponent(venue.name)}`,
      '_blank'
    );
  };

  const transportationItems = [
    { icon: Train, label: '지하철', content: venue.transportation.subway },
    { icon: Bus, label: '버스 / 셔틀', content: venue.transportation.bus },
    { icon: Car, label: '자가용', content: venue.transportation.car },
  ].filter(item => item.content);

  return (
    <section ref={ref} className="py-20 px-6 bg-[var(--color-bg)] paper-texture">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE_ELEGANT }}
      >
        <div className="text-center mb-10">
          <p className="section-title mb-3">LOCATION</p>
          <h2 className="font-display text-[28px] tracking-[-0.01em] mb-2">오시는 길</h2>
          <p className="text-[var(--color-text)] font-display text-[18px]">{venue.name}</p>
          <p className="text-[13px] text-[var(--color-text-muted)] font-mono tracking-wide">{venue.hall}</p>
        </div>

        <div className="w-full aspect-[4/3] bg-[var(--color-bg-secondary)] mb-4 overflow-hidden flex items-center justify-center border border-[var(--color-border)]">
          <div className="text-center text-[var(--color-text-muted)]">
            <MapPin size={28} strokeWidth={1} className="mx-auto mb-3 opacity-40" />
            <p className="font-mono text-[11px] tracking-wide">MAP AREA</p>
            <p className="text-[10px] mt-1 opacity-60">(카카오맵 API 연동 필요)</p>
          </div>
        </div>

        <div className="bg-white p-5 mb-4 shadow-editorial">
          <div className="flex items-start gap-4 mb-4 pb-4 border-b border-[var(--color-border)]">
            <MapPin size={18} strokeWidth={1.5} className="text-[var(--color-primary)] mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-[14px] leading-relaxed">{venue.address}</p>
              <button
                onClick={handleCopyAddress}
                className="font-mono text-[11px] tracking-wide text-[var(--color-primary)] mt-2 hover:underline"
              >
                {copied ? 'COPIED!' : 'COPY ADDRESS'}
              </button>
            </div>
          </div>
          {venue.phone && (
            <div className="flex items-center gap-4">
              <Phone size={18} strokeWidth={1.5} className="text-[var(--color-primary)] flex-shrink-0" />
              <a href={`tel:${venue.phone}`} className="text-[14px] text-[var(--color-text)]">
                {venue.phone}
              </a>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-8">
          <button
            onClick={openNaverMap}
            className="py-4 bg-[var(--color-primary)] text-white text-[13px] font-mono tracking-wide transition-all active:scale-[0.98] hover:bg-[var(--color-primary-dark)]"
          >
            NAVER MAP
          </button>
          <button
            onClick={openKakaoMap}
            className="py-4 bg-[var(--color-accent)] text-[var(--color-text)] text-[13px] font-mono tracking-wide transition-all active:scale-[0.98] hover:bg-[var(--color-accent-dark)]"
          >
            KAKAO MAP
          </button>
        </div>

        {transportationItems.length > 0 && (
          <div className="space-y-5">
            {transportationItems.map((item, index) => (
              <motion.div 
                key={index} 
                className="flex gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6, ease: EASE_ELEGANT }}
              >
                <div className="w-10 h-10 bg-[var(--color-bg-secondary)] flex items-center justify-center flex-shrink-0">
                  <item.icon size={18} strokeWidth={1.5} className="text-[var(--color-primary)]" />
                </div>
                <div className="flex-1">
                  <p className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-text-muted)] mb-1">{item.label.toUpperCase()}</p>
                  <p className="text-[13px] text-[var(--color-text-light)] leading-relaxed whitespace-pre-line">
                    {item.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
