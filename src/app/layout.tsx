import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteTitle = "Nathan Avery for Congress";
const siteDescription = "Official campaign website for Nathan Avery, running for U.S. Representative in Oklahoma.";
const siteUrl = process.env.PRODUCTION_URL || 'http://localhost:3000'; // Use production URL or fallback
const ogImageUrl = `${siteUrl}/nathan-avery.jpg`; // Construct full URL for the OG image

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  // Add Open Graph tags
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    type: 'website',
    images: [
      {
        url: ogImageUrl,
        width: 800, // Provide dimensions if known
        height: 800, // Provide dimensions if known
        alt: 'Nathan Avery',
      },
    ],
  },
  // Optionally, add Twitter specific tags if desired
  // twitter: {
  //   card: 'summary_large_image',
  //   title: siteTitle,
  //   description: siteDescription,
  //   images: [ogImageUrl],
  //   // Add creator handle if available
  //   // creator: '@YourTwitterHandle',
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}
      >
        {children}
      </body>
    </html>
  );
}
