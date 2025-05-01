'use client'; // Add 'use client' for hooks and effects

import { useRef, useEffect } from 'react'; // Import hooks
import gsap from 'gsap'; // Import gsap
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Import ScrollTrigger

// import Hero3D from '@/components/Hero3D';
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
      // Adjust or remove animations as needed now GetInvolved is at top
      if (aboutSectionWrapperRef.current) { 
        gsap.from(aboutSectionWrapperRef.current, {
          opacity: 0,
          y: 50,
          duration: 1,
          scrollTrigger: {
            trigger: aboutSectionWrapperRef.current,
            start: 'top 90%', // This might need adjustment now
            toggleActions: 'play none none none',
          },
        });
        // Parallax might not be desired for the second section, or needs re-triggering
        // Consider removing or adjusting this parallax effect
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
    <main ref={mainRef} className="flex min-h-screen flex-col">
      {/* 1. Remove the Hero3D div entirely */}
      
      {/* 2. Move GetInvolvedSection to the top */}
      <GetInvolvedSection />

      {/* 3. Place other sections directly after */}
      {/* Use contentWrapperRef for scoping if still needed, else remove */}
      <div ref={contentWrapperRef}> 
        {/* Remove the extra div wrapper around AboutSection? Review GSAP logic. */}
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
