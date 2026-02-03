'use client';

import { useState, useEffect } from 'react';
import { weddingData } from '@/config/wedding';
import IntroSection from '@/components/sections/IntroSection';
import HeroSection from '@/components/sections/HeroSection';
import GreetingSection from '@/components/sections/GreetingSection';
import ContactSection from '@/components/sections/ContactSection';
import CalendarSection from '@/components/sections/CalendarSection';
import GallerySection from '@/components/sections/GallerySection';
import MapSection from '@/components/sections/MapSection';
import AccountSection from '@/components/sections/AccountSection';
import GuestbookSection from '@/components/sections/GuestbookSection';
import ShareSection from '@/components/sections/ShareSection';
import FooterSection from '@/components/sections/FooterSection';

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = () => {
    setShowIntro(false);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = 'hidden';
    }
  }, [showIntro]);

  return (
    <>
      {showIntro && (
        <IntroSection
          groomName={weddingData.groom.name}
          brideName={weddingData.bride.name}
          time={weddingData.wedding.time}
          onComplete={handleIntroComplete}
        />
      )}

      <div className={showIntro ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>
        <HeroSection
          groomName={weddingData.groom.name}
          brideName={weddingData.bride.name}
          date={weddingData.wedding.date}
          time={weddingData.wedding.time}
          venue={weddingData.wedding.venue.name}
        />

        <GreetingSection
          title={weddingData.greeting.title}
          message={weddingData.greeting.message}
          groomName={weddingData.groom.name}
          brideName={weddingData.bride.name}
          groomParents={{
            father: weddingData.groom.parents.father.name,
            mother: weddingData.groom.parents.mother.name,
          }}
          brideParents={{
            father: weddingData.bride.parents.father.name,
            mother: weddingData.bride.parents.mother.name,
          }}
        />

        <ContactSection
          groom={{
            name: weddingData.groom.name,
            phone: weddingData.groom.phone,
            parents: weddingData.groom.parents,
          }}
          bride={{
            name: weddingData.bride.name,
            phone: weddingData.bride.phone,
            parents: weddingData.bride.parents,
          }}
        />

        <CalendarSection
          date={weddingData.wedding.date}
          groomName={weddingData.groom.name}
          brideName={weddingData.bride.name}
        />

        <GallerySection images={weddingData.gallery} />

        <MapSection venue={weddingData.wedding.venue} />

        <AccountSection
          groom={{
            name: weddingData.groom.name,
            account: weddingData.groom.account,
            parentsAccounts: weddingData.groom.parentsAccounts,
          }}
          bride={{
            name: weddingData.bride.name,
            account: weddingData.bride.account,
            parentsAccounts: weddingData.bride.parentsAccounts,
          }}
        />

        <GuestbookSection />

        <ShareSection
          groomName={weddingData.groom.name}
          brideName={weddingData.bride.name}
          date={weddingData.wedding.date}
          venue={weddingData.wedding.venue.name}
        />

        <FooterSection />
      </div>
    </>
  );
}
