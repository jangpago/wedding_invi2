'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { MapPin, Phone, Car, Train, Bus } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

declare global {
  interface Window {
    kakao: {
      maps: {
        load: (callback: () => void) => void;
        LatLng: new (lat: number, lng: number) => unknown;
        Map: new (container: HTMLElement, options: { center: unknown; level: number }) => unknown;
        Marker: new (options: { position: unknown; map: unknown }) => unknown;
      };
    };
    Kakao: {
      init: (appKey: string) => void;
      isInitialized: () => boolean;
      Share: {
        sendDefault: (settings: Record<string, unknown>) => void;
      };
    };
  }
}

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
  const mapRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [copied, setCopied] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const kakaoMapApiKey = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY;
    if (!kakaoMapApiKey || !mapRef.current) return;

    const initializeMap = () => {
      if (!mapRef.current) return;
      const coords = new window.kakao.maps.LatLng(venue.coordinates.lat, venue.coordinates.lng);
      const map = new window.kakao.maps.Map(mapRef.current, {
        center: coords,
        level: 5,
      });
      new window.kakao.maps.Marker({
        position: coords,
        map: map,
      });
      setMapLoaded(true);
    };

    if (window.kakao?.maps) {
      window.kakao.maps.load(initializeMap);
      return;
    }

    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapApiKey}&autoload=false`;
    script.async = true;
    script.onload = () => window.kakao.maps.load(initializeMap);
    document.head.appendChild(script);
  }, [venue.coordinates.lat, venue.coordinates.lng]);

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
          <h2 className="font-display text-[30px] tracking-[-0.01em] mb-2">오시는 길</h2>
          <p className="text-[var(--color-text)] font-display text-[20px]">{venue.name}</p>
          <p className="text-[14px] text-[var(--color-text-muted)] font-mono tracking-wide">{venue.hall}</p>
        </div>

        <div className="w-full aspect-[4/3] bg-[var(--color-bg-secondary)] mb-4 overflow-hidden border border-[var(--color-border)] relative">
          <div ref={mapRef} className="w-full h-full" />
          {!mapLoaded && (
            <div className="absolute inset-0 flex items-center justify-center text-[var(--color-text-muted)]">
              <div className="text-center">
                <MapPin size={28} strokeWidth={1} className="mx-auto mb-3 opacity-40" />
                <p className="font-mono text-[11px] tracking-wide">지도를 불러오는 중...</p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white p-5 mb-4 shadow-editorial">
          <div className="flex items-start gap-4 mb-4 pb-4 border-b border-[var(--color-border)]">
            <MapPin size={18} strokeWidth={1.5} className="text-[var(--color-primary)] mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-[15px] leading-relaxed">{venue.address}</p>
              <button
                onClick={handleCopyAddress}
                className="font-mono text-[12px] tracking-wide text-[var(--color-primary)] mt-2 hover:underline"
              >
                {copied ? 'COPIED!' : 'COPY ADDRESS'}
              </button>
            </div>
          </div>
          {venue.phone && (
            <div className="flex items-center gap-4">
              <Phone size={18} strokeWidth={1.5} className="text-[var(--color-primary)] flex-shrink-0" />
              <a href={`tel:${venue.phone}`} className="text-[15px] text-[var(--color-text)]">
                {venue.phone}
              </a>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-8">
          <button
            onClick={openNaverMap}
            className="py-4 bg-[var(--color-primary)] text-white text-[14px] font-mono tracking-wide transition-all active:scale-[0.98] hover:bg-[var(--color-primary-dark)]"
          >
            NAVER MAP
          </button>
          <button
            onClick={openKakaoMap}
            className="py-4 bg-[var(--color-accent)] text-[var(--color-text)] text-[14px] font-mono tracking-wide transition-all active:scale-[0.98] hover:bg-[var(--color-accent-dark)]"
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
                  <p className="font-mono text-[11px] tracking-[0.2em] text-[var(--color-text-muted)] mb-1">{item.label.toUpperCase()}</p>
                  <p className="text-[14px] text-[var(--color-text-light)] leading-relaxed whitespace-pre-line">
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
