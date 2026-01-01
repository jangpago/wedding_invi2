'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { X, Trash2, MessageSquare, Loader2 } from 'lucide-react';
import { db } from '@/lib/firebase';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
} from 'firebase/firestore';
import { simpleHash } from '@/lib/utils';
import type { GuestbookEntry, GuestbookFormData } from '@/types';

const EASE_ELEGANT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function GuestbookSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);
  const [deletePassword, setDeletePassword] = useState('');
  const [formData, setFormData] = useState<GuestbookFormData>({
    name: '',
    message: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'guestbook'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newEntries = snapshot.docs.map((docSnapshot) => {
        const data = docSnapshot.data();
        return {
          id: docSnapshot.id,
          name: data.name,
          message: data.message,
          passwordHash: data.passwordHash,
          createdAt: data.createdAt?.toDate() || new Date(),
        } as GuestbookEntry;
      });
      setEntries(newEntries);
    }, () => {
      setEntries([]);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.message.trim() || !formData.password.trim()) {
      setError('모든 항목을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await addDoc(collection(db, 'guestbook'), {
        name: formData.name.trim(),
        message: formData.message.trim(),
        passwordHash: simpleHash(formData.password),
        createdAt: Timestamp.now(),
      });

      setFormData({ name: '', message: '', password: '' });
      setShowWriteModal(false);
    } catch {
      setError('등록에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!showDeleteModal || !deletePassword.trim()) return;

    const entry = entries.find((e) => e.id === showDeleteModal);
    if (!entry) return;

    if (simpleHash(deletePassword) !== entry.passwordHash) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      await deleteDoc(doc(db, 'guestbook', showDeleteModal));
      setShowDeleteModal(null);
      setDeletePassword('');
      setError(null);
    } catch {
      setError('삭제에 실패했습니다.');
    }
  };

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  const sampleEntries = [
    { id: '1', name: '김미진', message: '두 사람의 앞길에 행복만 가득하길 기원합니다.', createdAt: new Date() },
    { id: '2', name: '최수혁', message: '정말 축하한다! 식날 보자!', createdAt: new Date() },
    { id: '3', name: '친구들', message: '내가 다 설레는거 있지~ 정말 축하해!!', createdAt: new Date() },
  ];

  const displayEntries = entries.length > 0 ? entries : sampleEntries;

  return (
    <section ref={ref} className="py-20 px-6 bg-[var(--color-bg)] paper-texture">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE_ELEGANT }}
      >
        <div className="text-center mb-10">
          <p className="section-title mb-3">GUESTBOOK</p>
          <h2 className="font-display text-[28px] tracking-[-0.01em] mb-2">방명록</h2>
          <p className="text-[13px] text-[var(--color-text-muted)]">
            축하의 마음을 남겨주세요
          </p>
        </div>

        <div className="space-y-4 mb-8 max-h-[420px] overflow-y-auto hide-scrollbar">
          {displayEntries.length === 0 ? (
            <div className="text-center py-16 text-[var(--color-text-muted)]">
              <MessageSquare size={28} strokeWidth={1} className="mx-auto mb-4 opacity-40" />
              <p className="font-mono text-[11px] tracking-wide">첫 번째 메시지를 남겨주세요</p>
            </div>
          ) : (
            displayEntries.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5, ease: EASE_ELEGANT }}
                className="bg-white p-5 shadow-editorial relative"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-primary)] mb-1">FROM</p>
                    <p className="text-[14px] font-medium">{entry.name}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-[var(--color-text-muted)]">
                      {formatDate(entry.createdAt)}
                    </span>
                    {'passwordHash' in entry && (
                       <button
                        onClick={() => {
                          setShowDeleteModal(entry.id);
                          setError(null);
                        }}
                        className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
                      >
                        <Trash2 size={14} strokeWidth={1.5} />
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-[14px] text-[var(--color-text-light)] whitespace-pre-line leading-relaxed">
                  {entry.message}
                </p>
              </motion.div>
            ))
          )}
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setShowWriteModal(true);
            setError(null);
          }}
          className="w-full py-4 bg-[var(--color-primary)] text-white font-mono text-[13px] tracking-wide shadow-editorial transition-all hover:bg-[var(--color-primary-dark)]"
        >
          WRITE MESSAGE
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {showWriteModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowWriteModal(false)}
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
                <h3 className="font-display text-[20px]">축하 메시지 작성</h3>
                <button onClick={() => setShowWriteModal(false)}>
                  <X size={24} strokeWidth={1.5} className="text-[var(--color-text-light)]" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-text-muted)] block mb-2">NAME</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-[var(--color-bg-secondary)] text-[14px] outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
                    maxLength={20}
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-text-muted)] block mb-2">MESSAGE</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 bg-[var(--color-bg-secondary)] text-[14px] outline-none resize-none focus:ring-1 focus:ring-[var(--color-primary)]"
                    maxLength={200}
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-text-muted)] block mb-2">PASSWORD</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-3 bg-[var(--color-bg-secondary)] text-[14px] outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
                    maxLength={20}
                  />
                </div>

                {error && (
                  <p className="text-[var(--color-accent)] text-[13px] text-center">{error}</p>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[var(--color-primary)] text-white font-mono text-[13px] tracking-wide disabled:opacity-50 flex items-center justify-center gap-2 transition-all hover:bg-[var(--color-primary-dark)]"
                >
                  {isSubmitting && <Loader2 size={16} className="animate-spin" />}
                  {isSubmitting ? 'SENDING...' : 'SUBMIT'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDeleteModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowDeleteModal(null);
                setDeletePassword('');
                setError(null);
              }}
              className="fixed inset-0 bg-black/50 z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ ease: EASE_ELEGANT }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[320px] bg-white z-50 p-6"
            >
              <h3 className="font-display text-[18px] text-center mb-6">메시지 삭제</h3>
              <div>
                <label className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-text-muted)] block mb-2">PASSWORD</label>
                <input
                  type="password"
                  value={deletePassword}
                  onChange={(e) => {
                    setDeletePassword(e.target.value);
                    setError(null);
                  }}
                  className="w-full px-4 py-3 bg-[var(--color-bg-secondary)] text-[14px] outline-none mb-4"
                />
              </div>
              {error && (
                <p className="text-[var(--color-accent)] text-[13px] text-center mb-4">{error}</p>
              )}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(null);
                    setDeletePassword('');
                    setError(null);
                  }}
                  className="flex-1 py-3 bg-[var(--color-bg-secondary)] font-mono text-[12px] tracking-wide"
                >
                  CANCEL
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 py-3 bg-[var(--color-primary-dark)] text-white font-mono text-[12px] tracking-wide"
                >
                  DELETE
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
