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
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-brand-accent dark:text-amber-400">
          About Nathan Avery
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Candidate Photo */}
          <div ref={photoRef} className="w-full md:w-1/3 flex justify-center">
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-lg border-4 border-brand-accent dark:border-amber-400">
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

          {/* Bio and Policies - Updated Bio */}
          <div ref={textContentRef} className="w-full md:w-2/3 text-center md:text-left">
            <h3 className="text-2xl font-semibold mb-4">Why I'm Running</h3> {/* Updated sub-heading */}
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              {/* Updated bio text */}
              "As AI and emerging technologies reshape our lives, Oklahoma deserves a voice in Washington who truly understands how they work—and how they should work for people," Nathan says. He believes in meeting constituents where they are—online, on the phone, or face-to-face—and using technology to build the most direct path between voters and their representative.
            </p>
            <h4 className="text-xl font-semibold mb-3 text-red-600 dark:text-red-400">Core Strengths & Values</h4>
            <ul className="list-none space-y-3 text-gray-700 dark:text-gray-300 mb-8">
              <li>
                <strong className="font-semibold">Communication:</strong> Whether breaking down technical concepts for neighbors in coffee shops or translating policy debates into plain English, Nathan excels at listening, clarifying, and connecting.
              </li>
              <li>
                <strong className="font-semibold">Empathy:</strong> From his years behind the wheel as an Uber driver to daily stand-ups with software teams, he prides himself on understanding diverse perspectives—and amplifying them.
              </li>
              <li>
                <strong className="font-semibold">Dedication:</strong> With only his loyal dog, Willow, by his side, Nathan has the freedom to devote 100% of his time to listening tours, town halls, and constituent services.
              </li>
            </ul>

            {/* Add new Vision section */}
            <h4 className="text-xl font-semibold mb-3 text-brand-primary dark:text-blue-400">Vision for OK-3</h4>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              Nathan's measure of success won't be how many bills he sponsors, but whether every Oklahoman in the 3rd District feels truly heard. He envisions a future where rural hospitals stay open, broadband reaches every farm and small town, and every constituent can track progress on their concerns with the same ease they order groceries online.
            </p>
            <blockquote className="text-lg italic text-gray-600 dark:text-gray-400 border-l-4 border-brand-secondary dark:border-amber-400 pl-4">
              "If people can see their ideas moving through me to Washington, then I've done my job."
            </blockquote>

            {/* Fade-in text animation is handled by page.tsx */}
          </div>
        </div>
      </div>
    </section>
  );
} 