# Nathan Avery for Congress (Oklahoma's 3rd District) - Website

This project is the official campaign website for Nathan Avery, candidate for U.S. Representative in Oklahoma's 3rd Congressional District. It is built with modern web technologies:

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

### Running the Development Server

Run the following command to start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

*   The page auto-updates as you edit files.
*   A dark mode toggle is available in the bottom-right corner.

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
    *   `layout.tsx`: Main application layout, includes ThemeProvider & metadata.
    *   `page.tsx`: The home page, orchestrates sections and animations.
    *   `api/volunteer/route.ts`: Stub API endpoint for volunteer sign-ups.
*   `src/components/`: Reusable React components for each section (Hero3D, About, Issues, GetInvolved, Donate, NewsEvents, Footer).
*   `public/`: Static assets (images, etc.).
*   `tailwind.config.ts`: Tailwind CSS configuration.
*   `next.config.ts`: Next.js configuration.

## Next Steps (Based on Prompt & Progress)

*   Replace placeholders:
    *   3D model in `Hero3D.tsx` with actual campaign logo/mascot.
    *   Image in `AboutSection.tsx` (`/placeholder-candidate.jpg`).
    *   Bio and specific policy points in `AboutSection.tsx`.
    *   Contact info and social media links in `Footer.tsx`.
    *   Icons in `Footer.tsx` (use react-icons or similar).
    *   Refine Issue descriptions/icons in `IssuesSection.tsx`/`IssueCard.tsx`.
    *   Refine Event details in `NewsEventsSection.tsx`.
    *   Set `NEXT_PUBLIC_STRIPE_PUBLIC_KEY` environment variable.
*   Implement full Stripe integration (requires backend API route for session creation).
*   Implement parallax effects (e.g., in `AboutSection.tsx`).
*   Refine GSAP animations (add more sections, potentially more complex timelines).
*   Refine R3F hover effects (e.g., use actual models/icons in `IssueCard.tsx`).
*   Address Accessibility (ARIA attributes, focus management, color contrast).
*   Address SEO (sitemap, robots.txt, structured data, specific meta tags per page if needed).
*   Address Responsiveness (test/adjust layouts and canvas performance on different screen sizes).

## Learn More

To learn more about the technologies used, take a look at the following resources:

*   [Next.js Documentation](https://nextjs.org/docs)
*   [React Three Fiber Documentation](https://docs.pmnd.rs/react-three-fiber)
*   [Tailwind CSS Documentation](https://tailwindcss.com/docs)
*   [GSAP Documentation](https://greensock.com/docs/)
