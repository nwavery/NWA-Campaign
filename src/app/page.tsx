'use client'; // Add 'use client' for hooks and effects

import { useRef, useEffect } from 'react'; // Import hooks
import gsap from 'gsap'; // Import gsap
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Import ScrollTrigger

import Hero3D from '@/components/Hero3D';
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
  const aboutSectionWrapperRef = useRef<HTMLDivElement>(null); // Ref for the About section wrapper
  const contentWrapperRef = useRef<HTMLDivElement>(null); // Ref for the main content area

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ensure elements exist before animating
      if (aboutSectionWrapperRef.current && contentWrapperRef.current) {

        // About Section Scroll Animation (Fade-in)
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

        // About Section Parallax
        gsap.to(aboutSectionWrapperRef.current, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: aboutSectionWrapperRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // TODO: Add animations for other sections

    }, mainRef); // Scope animations to the main container

    return () => ctx.revert(); // Cleanup GSAP animations on component unmount
  }, []);

  return (
    // Add ref to the main container
    <main ref={mainRef} className="flex min-h-screen flex-col">
      {/* Hero section - Removed sticky positioning and ref */}
      <div className="h-[60vh]">
        <Hero3D />
      </div>

      {/* Content section starts directly below hero */}
      {/* Removed padding-top, add ref */}
      <div ref={contentWrapperRef} className="relative z-10 bg-gray-50 dark:bg-gray-800">
        <div ref={aboutSectionWrapperRef}>
          <AboutSection />
        </div>
        <IssuesSection />
        <GetInvolvedSection />
        <DonateSection />
        <NewsEventsSection />
        <Footer />
      </div>
    </main>
  );
}
