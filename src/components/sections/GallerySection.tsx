'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Zoom } from 'swiper/modules';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/zoom';

interface GalleryImage {
  src: string;
  alt: string;
}

interface GallerySectionProps {
  images: GalleryImage[];
}

const EASE_ELEGANT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&q=80',
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&q=80',
  'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&q=80',
  'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=400&q=80',
  'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=400&q=80',
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&q=80',
  'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&q=80',
  'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=400&q=80',
];

export default function GallerySection({ images }: GallerySectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const displayImages = images.length === 0 || images[0].src.includes('photo1.jpg')
    ? PLACEHOLDER_IMAGES.map((src, i) => ({ src, alt: `갤러리 ${i + 1}` }))
    : images;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASE_ELEGANT },
    },
  };

  return (
    <section ref={ref} className="py-20 bg-[var(--color-bg)] paper-texture overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE_ELEGANT }}
      >
        <div className="text-center mb-10 px-6">
          <p className="section-title mb-3">GALLERY</p>
          <h2 className="font-display text-[30px] tracking-[-0.01em]">Our Moments</h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="px-4"
        >
          <motion.div
            variants={imageVariants}
            onClick={() => setSelectedIndex(0)}
            className="relative aspect-[4/5] cursor-pointer overflow-hidden shadow-editorial mb-4"
          >
            <Image
              src={displayImages[0]?.src || ''}
              alt={displayImages[0]?.alt || ''}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 430px) 100vw"
            />
            <div className="absolute inset-0 film-grain pointer-events-none" />
          </motion.div>

          <div className="grid grid-cols-3 gap-2">
            {displayImages.slice(1, 7).map((image, index) => (
              <motion.div
                key={index + 1}
                variants={imageVariants}
                onClick={() => setSelectedIndex(index + 1)}
                className="aspect-square relative cursor-pointer overflow-hidden"
                style={{
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                  sizes="(max-width: 430px) 33vw"
                />
              </motion.div>
            ))}
          </div>

          {displayImages.length > 7 && (
            <motion.div 
              variants={imageVariants}
              className="mt-6 text-center"
            >
              <button
                onClick={() => setSelectedIndex(7)}
                className="font-mono text-[11px] tracking-[0.2em] text-[var(--color-text-muted)] py-3 px-6 border border-[var(--color-border)] hover:bg-[var(--color-bg-secondary)] transition-colors"
              >
                +{displayImages.length - 7} MORE
              </button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          >
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-4 right-4 z-10 text-white/70 hover:text-white p-2 transition-colors"
            >
              <X size={28} strokeWidth={1} />
            </button>

            <Swiper
              modules={[Navigation, Pagination, Zoom]}
              initialSlide={selectedIndex}
              zoom={{ maxRatio: 3 }}
              navigation={{
                prevEl: '.swiper-button-prev-custom',
                nextEl: '.swiper-button-next-custom',
              }}
              pagination={{ 
                type: 'fraction',
                formatFractionCurrent: (num) => String(num).padStart(2, '0'),
                formatFractionTotal: (num) => String(num).padStart(2, '0'),
              }}
              className="w-full h-full gallery-swiper"
            >
              {displayImages.map((image, index) => (
                <SwiperSlide key={index} className="!flex items-center justify-center overflow-hidden">
                  <div className="swiper-zoom-container">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="max-w-full max-h-[80vh] object-contain"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <button className="swiper-button-prev-custom absolute left-3 z-10 text-white/50 hover:text-white p-2 transition-colors">
              <ChevronLeft size={36} strokeWidth={1} />
            </button>
            <button className="swiper-button-next-custom absolute right-3 z-10 text-white/50 hover:text-white p-2 transition-colors">
              <ChevronRight size={36} strokeWidth={1} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
