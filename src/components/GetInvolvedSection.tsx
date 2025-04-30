'use client';

import React, { useState, FormEvent, useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function GetInvolvedSection() {
  // ... existing state (formData, statusMessage, etc.) ...
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interests: '',
  });
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  // ... existing handleChange and handleSubmit ...
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage(null);
    setIsError(false);

    try {
      const response = await fetch('/api/volunteer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong');
      }

      setStatusMessage(result.message || 'Sign-up successful!');
      setFormData({ name: '', email: '', phone: '', interests: '' }); // Clear form
    } catch (error) {
      console.error('Form submission error:', error);
      setIsError(true);
      setStatusMessage(error instanceof Error ? error.message : 'Failed to submit form.');
    } finally {
      setIsLoading(false);
    }
  };

  // GSAP Hover Effect
  useEffect(() => {
    if (!buttonRef.current || isLoading) return; // Don't animate if loading

    const button = buttonRef.current;
    let hoverTween: gsap.core.Tween | null = null;

    const handleMouseEnter = () => {
      // Kill previous tween if it exists
      if (hoverTween) hoverTween.kill();
      // Simple scale and background color transition
      hoverTween = gsap.to(button, {
        scale: 1.05,
        // Note: Direct background color tweening might conflict with Tailwind classes.
        // Prefer Tailwind hover states for color or use GSAP for transforms only.
        duration: 0.2,
        ease: 'power1.out'
      });
    };

    const handleMouseLeave = () => {
      if (hoverTween) hoverTween.kill();
      hoverTween = gsap.to(button, {
        scale: 1,
        duration: 0.3,
        ease: 'power1.out'
      });
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
      if (hoverTween) hoverTween.kill(); // Cleanup tween on unmount
    };
  }, [isLoading]); // Re-run effect if isLoading changes

  return (
    <section id="get-involved" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        {/* ... Section Title ... */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-brand-primary dark:text-blue-400">
          Get Involved
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ... Form Fields (Name, Email, Phone, Interests) ... */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-700 dark:text-white sm:text-sm"
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-700 dark:text-white sm:text-sm"
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Phone Number (Optional)
            </label>
            <input
              type="tel" // Use tel type for better mobile UX
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-700 dark:text-white sm:text-sm"
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="interests" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              How would you like to help? (Optional)
            </label>
            <textarea
              name="interests"
              id="interests"
              rows={4}
              value={formData.interests}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-700 dark:text-white sm:text-sm"
              placeholder="e.g., Door-knocking, phone banking, event setup..."
              disabled={isLoading}
            />
          </div>
          <div>
            <button
              ref={buttonRef} // Add ref to the button
              type="submit"
              // Rely on Tailwind for background color changes, use GSAP for transforms
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isLoading ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed' : 'bg-brand-primary hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary'} transition-colors duration-150 ease-in-out transform`} // Add transform for GSAP scaling
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Join the Team'}
            </button>
          </div>
          {/* ... Status Message ... */}
          {statusMessage && (
            <div className={`text-center text-sm ${isError ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
              {statusMessage}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
