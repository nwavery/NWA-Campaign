'use client';

import React, { useRef } from 'react';
import Image from 'next/image';

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} id="about" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
      {/* Optional: Add a background element here for parallax if needed */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900 z-0 opacity-50"></div> */}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-brand-primary dark:text-blue-400">
          About Nathan Avery
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Candidate Photo */}
          <div ref={photoRef} className="w-full md:w-1/3 flex justify-center">
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-lg border-4 border-brand-secondary dark:border-green-400">
              {/* Use the actual image path */}
              <Image
                src="/nathan-avery.jpg" // Updated image path
                alt="Nathan Avery"
                fill
                className="object-cover"
                // Removed placeholder background class
                priority // Keep priority as it's likely high on the page
              />
            </div>
          </div>

          {/* Bio and Policies */}
          <div ref={textContentRef} className="w-full md:w-2/3 text-center md:text-left">
            <h3 className="text-2xl font-semibold mb-4">Nathan Avery</h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              {/* Replace with actual bio */}
              [Placeholder Bio: Nathan Avery is dedicated to serving the people of Oklahoma's 3rd District... Add detailed bio here.] Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <h4 className="text-xl font-semibold mb-3 text-brand-accent dark:text-amber-400">Key Policies</h4>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
              {/* Replace with actual policies */}
              <li>Policy Item 1: [Specific policy focus for Nathan Avery]</li>
              <li>Policy Item 2: [Specific policy focus for Nathan Avery]</li>
              <li>Policy Item 3: [Specific policy focus for Nathan Avery]</li>
            </ul>
            {/* Fade-in text animation is handled by page.tsx */}
          </div>
        </div>
      </div>
    </section>
  );
} 