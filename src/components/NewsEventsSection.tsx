'use client';

// Sample data for news and events
const events = [
  {
    id: 1,
    type: 'Town Hall',
    title: 'Meet the Candidate Q&A',
    date: '2025-08-15',
    time: '7:00 PM',
    location: 'TBA',
    description: 'Join us for an open discussion and ask your questions directly to the candidate.'
  },
  {
    id: 2,
    type: 'Fundraiser',
    title: 'Campaign Kickoff',
    date: '2025-08-22',
    time: '6:30 PM',
    location: 'TBA',
    description: 'Support the campaign launch at our special kickoff fundraising event.'
  },
  {
    id: 3,
    type: 'Volunteer Day',
    title: 'Community Canvassing Event',
    date: '2025-09-01',
    time: '10:00 AM - 2:00 PM',
    location: 'TBA',
    description: 'Help us spread the word! Training and materials provided.'
  },
];

// Helper function to format date
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export default function NewsEventsSection() {
  return (
    <section id="news-events" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-brand-primary dark:text-blue-400">
          News & Upcoming Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 [perspective:1000px]">
          {events.map((event) => (
            <div
              key={event.id}
              className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md bg-white dark:bg-gray-900 group transition-transform duration-500 ease-out [transform-style:preserve-3d] hover:[transform:rotateY(10deg)] dark:hover:[transform:rotateY(-10deg)]"
            >
              <div className="[transform-style:preserve-3d]">
                <span className="inline-block bg-brand-accent dark:bg-amber-500 text-white text-xs font-semibold px-2 py-1 rounded mb-3 uppercase">
                  {event.type}
                </span>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {event.title}
                </h3>
                <p className="text-sm font-medium text-brand-secondary dark:text-green-400 mb-2">
                  {formatDate(event.date)} at {event.time}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  📍 {event.location}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 