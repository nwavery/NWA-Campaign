'use client';

import React from 'react';
import Link from 'next/link';

// Placeholder social links
const socialLinks = [
  { name: 'Facebook', href: '#', icon: '📘' }, // Replace # and icon
  { name: 'Twitter', href: '#', icon: '🐦' }, // Replace # and icon
  { name: 'Instagram', href: '#', icon: '📸' }, // Replace # and icon
];

// Placeholder quick nav links (adjust based on final sections)
const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Issues', href: '#issues' },
  { name: 'Get Involved', href: '#get-involved' },
  { name: 'Donate', href: '#donate' },
  { name: 'Events', href: '#news-events' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-gray-300 dark:text-gray-400 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Contact Us</h3>
            <p className="mb-1">Email: <a href="mailto:info@averyforok.com" className="hover:text-white hover:underline">info@averyforok.com</a></p>
            <p>Phone: (405) 345-5881</p>
            {/* TODO: Add physical address if applicable */}
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-white hover:underline">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Follow Us!</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              {socialLinks.map((link) => (
                <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-white">
                  <span aria-label={link.name}>{link.icon}</span>
                  {/* TODO: Replace text icons with actual icons (e.g., from react-icons) */}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright and Disclaimer */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
          {/* Add padding, border, and rounded corners to this div */}
          <div className="p-6 border border-brand-accent rounded-md inline-block dark:border-amber-400"> 
            <p className="text-base text-brand-accent dark:text-amber-400">Paid for by Nathan Avery for Congress</p>
            {/* TODO: Add Privacy Policy/Terms links if required */}
          </div>
        </div>
      </div>
    </footer>
  );
} 