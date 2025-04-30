'use client'; // Can be client or server component, make it client for potential future interaction

import React from 'react';
import Link from 'next/link';

export default function ThankYouPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-gray-50 dark:bg-gray-800">
      <h1 className="text-4xl md:text-5xl font-bold text-brand-primary dark:text-blue-400 mb-4">
        Thank You!
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-prose">
        Your generous contribution to the campaign is greatly appreciated. Together, we can make a difference for Oklahoma's 3rd District.
      </p>
      <Link href="/"
        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-brand-secondary hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-secondary transition duration-150 ease-in-out"
      >
        Return to Homepage
      </Link>
    </div>
  );
} 