'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronDown, Copy, Check } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';
import type { BankAccount } from '@/types';

interface AccountSectionProps {
  groom: {
    name: string;
    account: BankAccount;
    parentsAccounts?: BankAccount[];
  };
  bride: {
    name: string;
    account: BankAccount;
    parentsAccounts?: BankAccount[];
  };
}

const EASE_ELEGANT: [number, number, number, number] = [0.22, 1, 0.36, 1];

function AccountCard({
  type,
  name,
  account,
  parentsAccounts,
}: {
  type: 'groom' | 'bride';
  name: string;
  account: BankAccount;
  parentsAccounts?: BankAccount[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (accountNumber: string, index: number) => {
    const success = await copyToClipboard(accountNumber);
    if (success) {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  const allAccounts = [
    { ...account, label: name },
    ...(parentsAccounts || []).map((acc) => ({ ...acc, label: acc.holder })),
  ];

  const accentColor = type === 'groom' ? 'text-[var(--color-groom)]' : 'text-[var(--color-bride)]';
  const bgAccent = type === 'groom' ? 'bg-[var(--color-groom)]' : 'bg-[var(--color-bride)]';

  return (
    <div className="bg-white overflow-hidden shadow-editorial">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 flex items-center justify-between hover:bg-[var(--color-bg-secondary)] transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 ${bgAccent} flex items-center justify-center`}>
            <span className="text-white text-[10px] font-mono tracking-wider">
              {type === 'groom' ? 'HIM' : 'HER'}
            </span>
          </div>
          <div className="text-left">
            <p className={`font-mono text-[10px] tracking-[0.2em] ${accentColor} mb-1`}>
              {type === 'groom' ? 'GROOM' : 'BRIDE'}
            </p>
            <p className="text-[14px]">계좌번호 보기</p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: EASE_ELEGANT }}
        >
          <ChevronDown size={20} strokeWidth={1.5} className="text-[var(--color-text-muted)]" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_ELEGANT }}
          >
            <div className="px-5 pb-5 space-y-4">
              {allAccounts.map((acc, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-4 border-t border-[var(--color-border)]"
                >
                  <div>
                    <p className="font-mono text-[10px] tracking-wide text-[var(--color-text-muted)] mb-1">
                      {acc.bank}
                    </p>
                    <p className="text-[14px] font-mono tracking-wide">{acc.accountNumber}</p>
                    <p className="text-[12px] text-[var(--color-text-muted)] mt-1">
                      {acc.label}
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopy(acc.accountNumber, index)}
                    className="flex items-center gap-2 px-4 py-2 bg-[var(--color-bg-secondary)] text-[11px] font-mono tracking-wide transition-all active:scale-95"
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check size={14} className="text-[var(--color-primary)]" />
                        <span className="text-[var(--color-primary)]">COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>COPY</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AccountSection({ groom, bride }: AccountSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 px-6 bg-[var(--color-bg-secondary)] paper-texture">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE_ELEGANT }}
      >
        <div className="text-center mb-10">
          <p className="section-title mb-3">ACCOUNT</p>
          <h2 className="font-display text-[28px] tracking-[-0.01em] mb-2">
            마음 전하실 곳
          </h2>
          <p className="text-[13px] text-[var(--color-text-muted)]">
            축하의 마음을 담아 축의금을 전달해 보세요
          </p>
        </div>

        <div className="space-y-4">
          <AccountCard
            type="groom"
            name={groom.name}
            account={groom.account}
            parentsAccounts={groom.parentsAccounts}
          />
          <AccountCard
            type="bride"
            name={bride.name}
            account={bride.account}
            parentsAccounts={bride.parentsAccounts}
          />
        </div>
      </motion.div>
    </section>
  );
}
