'use client';

import React, { useState, useEffect } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';

// Placeholder values
const DONATION_GOAL = 10000;
const CURRENT_DONATIONS = 500;
// IMPORTANT: Replace with your actual public Stripe key
const STRIPE_PUBLIC_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || 'pk_test_YOUR_PUBLIC_KEY'; // Use environment variable

// Initialize Stripe promise loader
let stripePromise: Promise<Stripe | null> | null = null;
const getStripe = () => {
  if (!stripePromise && STRIPE_PUBLIC_KEY.startsWith('pk_')) {
    stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
  }
  return stripePromise;
};

// Log warning if using placeholder key
if (typeof window !== 'undefined' && STRIPE_PUBLIC_KEY === 'pk_test_YOUR_PUBLIC_KEY') {
  console.warn('Stripe public key not set. Using placeholder.');
}

export default function DonateSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isStripeReady, setIsStripeReady] = useState(false); // State for Stripe readiness
  const [donationAmount, setDonationAmount] = useState('10'); // Default amount $10

  // Check Stripe readiness on client side after initial render
  useEffect(() => {
    // Check if Stripe can be initialized (key exists and starts with pk_)
    if (STRIPE_PUBLIC_KEY.startsWith('pk_')) {
      setIsStripeReady(true);
    }
  }, []);

  const progressPercentage = Math.min((CURRENT_DONATIONS / DONATION_GOAL) * 100, 100);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers and potentially one decimal point
    const value = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(value)) { // Basic regex for currency format
        setDonationAmount(value);
    }
  };

  const handleDonateClick = async () => {
    const stripe = getStripe();
    if (!stripe || !isStripeReady) { // Check readiness state too
      setErrorMessage('Donation system is not ready. Please try again later.');
      return;
    }
    // Validate amount
    const amountInCents = Math.round(parseFloat(donationAmount) * 100);
    if (isNaN(amountInCents) || amountInCents <= 0) {
        setErrorMessage('Please enter a valid donation amount.');
        return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      // 1. Call backend API with the amount
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Pass the amount (in cents) to the backend
        body: JSON.stringify({ amount: amountInCents })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session.');
      }

      // 2. Get the session ID
      const session = await response.json();
      const sessionId = session.id;

      if (!sessionId) {
        throw new Error('Could not retrieve checkout session ID.');
      }

      // 3. Redirect to Stripe Checkout
      const stripeInstance = await stripe;
      if (!stripeInstance) throw new Error('Stripe failed to initialize.');

      const { error } = await stripeInstance.redirectToCheckout({
        sessionId: sessionId,
      });

      if (error) {
        console.error('Stripe redirect error:', error);
        throw new Error(error.message || 'Failed to redirect to donation page.');
      }
      // On successful redirect, user leaves the page.

    } catch (error) {
      console.error('Donation process error:', error);
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred.');
      setIsLoading(false); // Only set loading false on error
    }
  };

  return (
    <section id="donate" className="py-16 md:py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        {/* ... Section Title and Progress Bar ... */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-brand-primary dark:text-blue-400">
          Support the Campaign
        </h2>
        <p className="text-lg text-center text-gray-700 dark:text-gray-300 mb-12">
          Your contribution makes a difference! Help us reach our goal.
        </p>
        <div className="mb-12">
          <div className="flex justify-between mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            <span>${CURRENT_DONATIONS.toLocaleString()} Raised</span>
            <span>Goal: ${DONATION_GOAL.toLocaleString()}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
            <div
              className="bg-brand-secondary dark:bg-green-500 h-4 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progressPercentage}%` }}
              role="progressbar"
              aria-valuenow={progressPercentage}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Fundraising progress"
            >
            </div>
          </div>
        </div>

        {/* Donation Amount Input - Reduced width */}
        <div className="mb-8 max-w-xs mx-auto"> {/* Reduced max-width back to xs */}
            <label htmlFor="donationAmount" className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2 text-center"> {/* Increased text size and margin */}
                Donation Amount ($)
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"> {/* Increased padding */}
                    <span className="text-gray-500 dark:text-gray-400 sm:text-base"> $ </span> {/* Increased text size */}
                </div>
                <input
                    type="text"
                    name="donationAmount"
                    id="donationAmount"
                    // Increased text size, padding, and height
                    className="focus:ring-brand-primary focus:border-brand-primary block w-full pl-10 pr-16 sm:text-lg border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white text-center h-12"
                    placeholder="10.00"
                    value={donationAmount}
                    onChange={handleAmountChange}
                    aria-describedby="price-currency"
                    disabled={isLoading}
                    inputMode="decimal"
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none"> {/* Increased padding */}
                    <span className="text-gray-500 dark:text-gray-400 sm:text-base" id="price-currency"> {/* Increased text size */}
                        USD
                    </span>
                </div>
            </div>
        </div>

        {/* Donation Button */}
        <div className="text-center">
          <button
            onClick={handleDonateClick}
            disabled={isLoading || !isStripeReady || parseFloat(donationAmount) <= 0}
            className={`inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${isLoading || !isStripeReady || parseFloat(donationAmount) <= 0 ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed' : 'bg-brand-accent hover:bg-amber-600 dark:bg-amber-500 dark:hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent'} transition duration-150 ease-in-out`}
          >
            {isLoading ? 'Processing...' : `Donate $${donationAmount}`}
          </button>
          {errorMessage && (
            <p className="mt-4 text-sm text-red-600 dark:text-red-400">
              Error: {errorMessage}
            </p>
          )}
          <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            Secure donations processed via Stripe.
            {!isStripeReady && STRIPE_PUBLIC_KEY === 'pk_test_YOUR_PUBLIC_KEY' && ' Setup Required.'}
            {!isStripeReady && STRIPE_PUBLIC_KEY !== 'pk_test_YOUR_PUBLIC_KEY' && ' Initializing...'}
          </p>
        </div>
      </div>
    </section>
  );
}
