'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Phone, MessageCircle, X } from 'lucide-react';

interface Person {
  name: string;
  phone: string;
}

interface ContactSectionProps {
  groom: {
    name: string;
    phone: string;
    parents: { father: Person; mother: Person };
  };
  bride: {
    name: string;
    phone: string;
    parents: { father: Person; mother: Person };
  };
}

const EASE_ELEGANT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function ContactSection({ groom, bride }: ContactSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showParentsModal, setShowParentsModal] = useState(false);

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleSms = (phone: string) => {
    window.location.href = `sms:${phone}`;
  };

  const ContactCard = ({ name, phone, type }: { name: string; phone: string; type: 'groom' | 'bride' }) => (
    <div className="flex items-center justify-between py-5 border-b border-[var(--color-border)] last:border-0">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-[13px] tracking-wide
          ${type === 'groom' ? 'bg-[var(--color-groom)]' : 'bg-[var(--color-bride)]'}`}
        >
          {type === 'groom' ? '신랑' : '신부'}
        </div>
        <p className="font-display text-[20px]">{name}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => handleCall(phone)}
          className="w-11 h-11 rounded-full flex items-center justify-center bg-[var(--color-bg-secondary)] transition-all active:scale-95 hover:bg-[var(--color-border)]"
        >
          <Phone size={18} strokeWidth={1.5} className="text-[var(--color-text)]" />
        </button>
        <button
          onClick={() => handleSms(phone)}
          className="w-11 h-11 rounded-full flex items-center justify-center bg-[var(--color-bg-secondary)] transition-all active:scale-95 hover:bg-[var(--color-border)]"
        >
          <MessageCircle size={18} strokeWidth={1.5} className="text-[var(--color-text)]" />
        </button>
      </div>
    </div>
  );

  return (
    <section ref={ref} className="py-20 px-6 bg-[var(--color-bg-secondary)] paper-texture">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE_ELEGANT }}
      >
        <div className="text-center mb-10">
          <p className="section-title mb-3">CONTACT</p>
          <h2 className="font-display text-[30px] tracking-[-0.01em]">연락하기</h2>
        </div>

        <div className="bg-white p-5 shadow-editorial">
          <ContactCard name={groom.name} phone={groom.phone} type="groom" />
          <ContactCard name={bride.name} phone={bride.phone} type="bride" />
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowParentsModal(true)}
          className="w-full mt-4 py-4 text-[14px] text-[var(--color-text-light)] border border-[var(--color-border)] bg-white font-mono tracking-wide hover:bg-[var(--color-bg-secondary)] transition-colors"
        >
          혼주에게 연락하기
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {showParentsModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowParentsModal(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ ease: EASE_ELEGANT }}
              className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white z-50 p-6 pb-8"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-display text-[22px]">혼주에게 연락하기</h3>
                <button onClick={() => setShowParentsModal(false)}>
                  <X size={24} strokeWidth={1.5} className="text-[var(--color-text-light)]" />
                </button>
              </div>

              <div className="space-y-8">
                <div>
                  <p className="text-[13px] tracking-[0.15em] text-[var(--color-groom)] mb-4 font-medium">신랑측</p>
                  <div className="space-y-3">
                    {[groom.parents.father, groom.parents.mother].map((parent) => (
                      <div key={parent.name} className="flex items-center justify-between py-2">
                        <span className="text-[15px]">{parent.name}</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleCall(parent.phone)}
                            className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--color-bg-secondary)] transition-all active:scale-95"
                          >
                            <Phone size={16} strokeWidth={1.5} className="text-[var(--color-text)]" />
                          </button>
                          <button
                            onClick={() => handleSms(parent.phone)}
                            className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--color-bg-secondary)] transition-all active:scale-95"
                          >
                            <MessageCircle size={16} strokeWidth={1.5} className="text-[var(--color-text)]" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[13px] tracking-[0.15em] text-[var(--color-bride)] mb-4 font-medium">신부측</p>
                  <div className="space-y-3">
                    {[bride.parents.father, bride.parents.mother].map((parent) => (
                      <div key={parent.name} className="flex items-center justify-between py-2">
                        <span className="text-[15px]">{parent.name}</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleCall(parent.phone)}
                            className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--color-bg-secondary)] transition-all active:scale-95"
                          >
                            <Phone size={16} strokeWidth={1.5} className="text-[var(--color-text)]" />
                          </button>
                          <button
                            onClick={() => handleSms(parent.phone)}
                            className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--color-bg-secondary)] transition-all active:scale-95"
                          >
                            <MessageCircle size={16} strokeWidth={1.5} className="text-[var(--color-text)]" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
