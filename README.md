# Nathan Avery for Congress - Website

This project is the official campaign website for Nathan Avery, candidate for U.S. Representative from Oklahoma. It is built with modern web technologies:

*   **Framework**: [Next.js](https://nextjs.org/) (App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **3D Graphics**: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
*   **Animations**: [GSAP](https://greensock.com/gsap/)

## Getting Started

### Prerequisites

*   Node.js (v18 or later recommended)
*   npm (or yarn/pnpm/bun)

### Installation

1.  Clone the repository (if applicable).
2.  Navigate to the project directory (`nwa-campaign` if you followed the setup steps).
3.  Install dependencies:

    ```bash
    npm install
    ```

### Environment Variables

Create a `.env.local` file in the `nwa-campaign` directory and add the following variables (replace placeholder values):

```env
# Google Sheets API for Volunteer Form
GOOGLE_SHEET_ID=<Your_Google_Sheet_ID>
GOOGLE_SHEET_RANGE=<Your_Target_Sheet_Name>!A1 # e.g., Volunteers!A1
GOOGLE_APPLICATION_CREDENTIALS=google-credentials.json # Path to your service account key file

# Stripe Integration for Donations
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_... # Your Stripe Publishable Key
STRIPE_SECRET_KEY=sk_test_... # Your Stripe Secret Key

# Base URL for redirects (development/production)
NEXT_PUBLIC_BASE_URL=http://localhost:3000 # or https://yourdomain.com
PRODUCTION_URL=https://averyforok.com # Your production domain

# Google Service Account JSON
# Place the downloaded google-credentials.json file in the root of the nwa-campaign directory.
# Ensure it's added to .gitignore!
```

### Running the Development Server

Run the following command to start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

*   The page auto-updates as you edit files.
*   The site defaults to dark mode.

### Building for Production

To create an optimized production build:

```bash
npm run build
```

To run the production build locally:

```bash
npm start
```

## Project Structure

*   `src/app/`: Contains the application pages and API routes.
    *   `layout.tsx`: Main application layout, sets metadata and forces dark mode via `<html>` class.
    *   `page.tsx`: The home page, orchestrates sections and page-level animations (GSAP).
    *   `api/volunteer/route.ts`: API endpoint for volunteer sign-ups (writes to Google Sheets).
    *   `api/create-checkout-session/route.ts`: API endpoint for creating Stripe Checkout sessions.
*   `src/components/`: Reusable React components for each section (Hero3D, About, Issues, GetInvolved, Donate, NewsEvents, Footer).
*   `public/`: Static assets (images, 3D models like `campaign-logo.glb`, `nathan-avery.jpg`).
*   `tailwind.config.ts`: Tailwind CSS configuration (includes brand colors).
*   `next.config.ts`: Next.js configuration.
*   `.env.local`: Environment variables (should not be committed).
*   `google-credentials.json`: Service account key for Google API access (should not be committed).

## Features Implemented

*   **Sections:** Hero (3D), About, Issues, Get Involved, Donate, News/Events, Footer.
*   **3D Hero:** Loads and displays `campaign-logo.glb` using React Three Fiber.
*   **Styling:** Tailwind CSS with custom brand colors, dark mode enforced.
*   **Animations:**
    *   GSAP ScrollTrigger fade-in and parallax on About section.
    *   GSAP hover effect on "Join the Team" button.
    *   React Three Fiber hover effect (rotation) on Issue icons.
    *   CSS hover effect on News/Events cards.
*   **Integrations:**
    *   Volunteer form submits data to Google Sheets via API route.
    *   Donation section integrates with Stripe Checkout via API route.

## Remaining Tasks / Areas for Improvement

*   **Footer Icons:** Replace placeholder text/icons with actual social media icons (e.g., using `react-icons`).
*   **News/Events:** Refine content and potentially fetch from a CMS or API.
*   **Accessibility:** Perform thorough audit (ARIA attributes, focus management, color contrast).
*   **SEO:** Basic setup done (robots.txt, meta tags, sitemap.xml). Further enhancements like structured data (JSON-LD) could be added.
*   **Responsiveness:** Test and refine layouts/performance on various screen sizes, especially 3D elements.
*   **Error Handling:** Enhance user feedback for API errors (Stripe, Sheets).
*   **Code Cleanup:** Review and refactor components as needed.

## Learn More

To learn more about the technologies used, take a look at the following resources:

*   [Next.js Documentation](https://nextjs.org/docs)
*   [React Three Fiber Documentation](https://docs.pmnd.rs/react-three-fiber)
*   [Tailwind CSS Documentation](https://tailwindcss.com/docs)
*   [GSAP Documentation](https://greensock.com/docs/)
*   [Stripe Checkout Documentation](https://stripe.com/docs/checkout)
*   [Google Sheets API Documentation](https://developers.google.com/sheets/api)
