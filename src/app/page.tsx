'use client'; // Add 'use client' for hooks and effects

import { useRef, useEffect } from 'react'; // Import hooks
import gsap from 'gsap'; // Import gsap
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Import ScrollTrigger

import AboutSection from '@/components/AboutSection';
import IssuesSection from '@/components/IssuesSection';
import GetInvolvedSection from '@/components/GetInvolvedSection';
import DonateSection from '@/components/DonateSection';
import NewsEventsSection from '@/components/NewsEventsSection';
import Footer from '@/components/Footer';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);
  const aboutSectionWrapperRef = useRef<HTMLDivElement>(null);
  // Removed unused contentWrapperRef

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animation for AboutSection
      if (aboutSectionWrapperRef.current) { 
        gsap.from(aboutSectionWrapperRef.current, {
          opacity: 0,
          y: 50,
          duration: 1,
          scrollTrigger: {
            trigger: aboutSectionWrapperRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        });
      }

      // TODO: Add animations for other sections

    }, mainRef); // Scope animations to the main container

    return () => ctx.revert(); // Cleanup GSAP animations on component unmount
  }, []);

  return (
    <main ref={mainRef} className="flex min-h-screen flex-col">
      {/* GetInvolvedSection at the top */}
      <GetInvolvedSection />

      {/* Other sections */}
      <div> 
        {/* Retaining wrapper for AboutSection animation */}
        <div ref={aboutSectionWrapperRef}> 
          <AboutSection />
        </div>
        <IssuesSection />
        <DonateSection />
        <NewsEventsSection />
        <Footer />
      </div>
    </main>
  );
}
