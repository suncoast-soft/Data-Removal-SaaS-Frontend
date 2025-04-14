# Data Removal SaaS – Frontend

**Overview:**
This project is the frontend for a SaaS platform that automates personal data removal requests from data broker websites. Built with Next.js and styled using TailwindCSS, it integrates Supabase for authentication and backend, Sanity CMS for content, and Stripe for billing.

**Features:**
- Secure authentication with Supabase and magic links
- Personal data management dashboard
- Campaign builder and removal workflow interface
- Sanity-powered content management (FAQs, blog, pages)
- Stripe integration for subscription plans and billing
- Fully styled with TailwindCSS and Radix UI components

**Project Structure:**
- `app/` – App Router structure with pages, layouts, loading, etc.
- `components/` – UI and reusable components
- `hooks/`, `utils/` – Custom utilities and reusable logic
- `styles/` – Tailwind and global CSS
- `supabase/` – Supabase client, auth, and DB integration
- `sanity.config.ts` – Sanity studio and API config
- `public/` – Static assets

**Tech Stack:**
- **Framework:** Next.js 15 App Router
- **Styling:** TailwindCSS + Radix UI + styled-components
- **CMS:** Sanity v3
- **Auth & DB:** Supabase
- **Payments:** Stripe
- **Analytics & Monitoring:** Sentry
- **Forms & Validation:** React Hook Form, Zod

**Getting Started:**
```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env.local  # then update values inside

# Start the dev server
npm run dev
```

**Author:**
Dewayne Johnson (<dj@suncoast-software.com>)
