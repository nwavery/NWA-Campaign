'use client';

import React, { useState, FormEvent, useRef, useEffect } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

// Define a type for field errors
type FieldErrors = {
  name?: string[];
  email?: string[];
  zip?: string[];
  phone?: string[];
};

export default function GetInvolvedSection() {
  // Update state: remove interests, add zip
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    zip: '', // Changed from interests
  });
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({}); // State for specific field errors

  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { // Only inputs now
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear the specific field error when the user types
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage(null);
    setIsError(false);
    setFieldErrors({}); // Clear previous field errors

    // Include zip in the body, remove interests
    const bodyToSend = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      zip: formData.zip,
    };

    try {
      const response = await fetch('/api/volunteer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyToSend),
      });

      const result = await response.json();

      if (!response.ok) {
        // Check if it's a validation error (400) with field details
        if (response.status === 400 && result.errors) {
          setFieldErrors(result.errors);
          setStatusMessage('Please correct the errors below.'); 
        } else {
          // Handle other non-ok responses (e.g., 500)
          setStatusMessage(result.message || 'Something went wrong');
        }
        setIsError(true);
        // No need to throw here, we handled the error display logic
        return; // Stop execution after handling error
      }

      setStatusMessage(result.message || 'Sign-up successful!');
      // Update form clearing logic
      setFormData({ name: '', email: '', phone: '', zip: '' }); 
      setFieldErrors({}); // Clear errors on success
    } catch (error) {
      console.error('Form submission error:', error);
      setIsError(true);
      setFieldErrors({}); // Clear field errors on unexpected errors
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

  // Common input styling
  const inputClasses = "block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 sm:text-sm";
  const errorTextClasses = "mt-1 text-xs text-red-600 dark:text-red-400";

  return (
    /* Apply background to the section, add relative positioning */
    <section 
      id="get-involved" 
      className="py-16 md:py-24 dark:bg-gray-900 relative bg-cover bg-top" 
      style={{ backgroundImage: "url('/nathanaverygetinvolved.png')" }}
    >
      {/* Container still useful for centering/padding */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Position form column to the right half on medium+ screens */}
        <div className="relative md:w-1/2 md:ml-auto p-8 rounded-lg shadow-lg min-h-[600px] flex flex-col justify-center">
          {/* Added min-h-[600px] here to ensure section height */}
          {/* Added flex flex-col justify-center again */}
          
          {/* Add Campaign Logo */}
          <div className="flex justify-center mb-6"> {/* Center the image horizontally */}
            <Image 
              src="/bigcampaignlogo.png" 
              alt="Campaign Logo"
              width={225}
              height={225}
            />
          </div>
          
          {/* Form Heading */}
          <div className="text-center mb-8"> 
            <h2 className="text-3xl md:text-4xl font-bold text-brand-primary dark:text-blue-400">
              Join Our Campaign
            </h2>
            <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
              For info and updates
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate> {/* Added noValidate to rely on server errors */}
            {/* Row 1: Name and Zip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div> {/* Wrapper div for name input + error */}
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  placeholder="Name*"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClasses}
                  autoComplete="name"
                  disabled={isLoading}
                  aria-invalid={!!fieldErrors.name} // Accessibility hint
                  aria-describedby={fieldErrors.name ? "name-error" : undefined}
                />
                {fieldErrors.name && <p id="name-error" className={errorTextClasses}>{fieldErrors.name[0]}</p>}
              </div>
              <div> {/* Wrapper div for zip input + error */}
                <input
                  type="text"
                  name="zip"
                  id="zip"
                  required
                  placeholder="Zip*"
                  value={formData.zip}
                  onChange={handleChange}
                  className={inputClasses}
                  autoComplete="postal-code"
                  disabled={isLoading}
                  aria-invalid={!!fieldErrors.zip} // Accessibility hint
                  aria-describedby={fieldErrors.zip ? "zip-error" : undefined}
                />
                {fieldErrors.zip && <p id="zip-error" className={errorTextClasses}>{fieldErrors.zip[0]}</p>}
              </div>
            </div>

            {/* Row 2: Email */}
            <div className="mb-4">
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Email*"
                value={formData.email}
                onChange={handleChange}
                className={inputClasses}
                autoComplete="email"
                disabled={isLoading}
                aria-invalid={!!fieldErrors.email} // Accessibility hint
                aria-describedby={fieldErrors.email ? "email-error" : undefined}
              />
              {fieldErrors.email && <p id="email-error" className={errorTextClasses}>{fieldErrors.email[0]}</p>}
            </div>

            {/* Row 3: Phone and Button */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="col-span-2">
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={inputClasses}
                  autoComplete="tel"
                  disabled={isLoading}
                  aria-invalid={!!fieldErrors.phone} // Accessibility hint
                  aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
                />
                {fieldErrors.phone && <p id="phone-error" className={errorTextClasses}>{fieldErrors.phone[0]}</p>}
              </div>
              <button
                ref={buttonRef}
                type="submit"
                className={`col-span-1 h-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isLoading ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed' : 'bg-brand-primary hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary'} transition-colors duration-150 ease-in-out transform`} 
                disabled={isLoading}
              >
                {isLoading ? 'Submitting...' : 'JOIN US'}
              </button>
            </div>
            
            {/* Disclaimer Text */}
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-4">
              Sign up here to receive automated text messages and phone calls. By providing your phone number, you consent to recurring automated campaign & donation messages from Nathan Avery to the phone number you provide. No consent required to buy. Msg & data rates may apply. Terms of Service & Privacy Policy apply.
            </p>

            {/* Status Message */}
            {statusMessage && (
              <div className={`text-center text-sm mt-4 ${isError ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                {statusMessage}
              </div>
            )}
          </form>
        </div> 
      </div>
    </section>
  );
}
