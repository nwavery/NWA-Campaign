'use client';

import React from 'react';
import IssueCard from './IssueCard'; // Import the new IssueCard component

// Placeholder data for issues (can be moved or fetched)
const issues = [
  {
    id: 1,
    title: 'Affordable Housing',
    description: 'Implementing policies to increase the availability of affordable housing options.',
    icon: '🏠',
  },
  {
    id: 2,
    title: 'Education Reform',
    description: 'Investing in public schools and supporting teachers.',
    icon: '📚',
  },
  {
    id: 3,
    title: 'Healthcare Access',
    description: 'Working towards making healthcare more accessible and affordable.',
    icon: '🏥',
  },
   {
    id: 4,
    title: 'Environment',
    description: 'Championing initiatives for clean energy and conservation.',
    icon: '🌳',
  },
   {
    id: 5,
    title: 'Economy',
    description: 'Fostering job growth and supporting local businesses.',
    icon: '💼',
  },
   {
    id: 6,
    title: 'Infrastructure',
    description: 'Upgrading roads, bridges, and public transit systems.',
    icon: '🏗️',
  },
];

export default function IssuesSection() {
  return (
    <section id="issues" className="py-16 md:py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-brand-primary dark:text-blue-400">
          Issues & Platform
        </h2>
        {/* Use the IssueCard component in the grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {issues.map((issue) => (
            <IssueCard
              key={issue.id}
              id={issue.id}
              title={issue.title}
              description={issue.description}
              icon={issue.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 