# 📖 Project Handover Document: Creator & Brand Campaign Dashboard

Welcome to the **Creator & Brand Campaign Dashboard** project! This comprehensive handover document is intended to onboard new developers, agencies, or stakeholders and provide a detailed technical, structural, and functional overview of the repository.

This document serves as the single source of truth for the project setup, architectural choices, and main feature logic.

---

## 1. 🚀 Executive Summary

This project is a premium, highly interactive web application designed to serve as a dashboard for creators and brands. It allows creators to discover brand campaigns, submit content, verify social media accounts, track payouts (CPM rates), and access brand assets.

The application is heavily focused on offering a "Native App" experience with ultra-smooth micro-animations, a refined dark-mode-first aesthetic (though fully supporting theming), and deep responsive behavior.

---

## 2. 🛠️ Tech Stack & Dependencies

The project is built on a modern React ecosystem optimized for performance, scalability, and UX:

- **Core Framework**: [Next.js 16.1.6](https://nextjs.org/) (App Router approach preferred)
- **Library**: [React 19.2.3](https://react.dev/)
- **Programming Language**: [TypeScript](https://www.typescriptlang.org/) for static typing and safer refactoring.
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) mapped with PostCSS for rapid utility-class styling.
- **Animations**: [Framer Motion v12](https://www.framer.com/motion/) used widely across the dashboard for page transitions, hover states, and complex animated feedback elements.
- **UI Components**: Built using [Radix UI](https://www.radix-ui.com/) primitives and [Shadcn UI](https://ui.shadcn.com/) implementations.
- **Icons**: [Lucide React](https://lucide.dev/) for consistent, customizable vector iconography.

---

## 3. 🏁 Getting Started (Local Development)

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js**: LTS version (v20+ recommended).
- **Package Manager**: `npm` is configured (you may also use `yarn` or `pnpm`).

### Installation & Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/ShivamAgrawal04/clone-web-next.git
   cd my-app
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

   _Note: Since this relies heavily on React 19 and Next 16, ensure you do not use legacy peer dependency flags unless strictly necessary to avoid versioning conflicts._

3. **Run the local development server**:

   ```bash
   npm run dev
   ```

4. **Linting Context**:
   - The project uses `eslint-config-next`. Run `npm run lint` before committing to ensure code consistency.

---

## 4. 📁 Project Structure & Architecture

The application is structured using the **Next.js App Router** (`app/` directory paradigm) which heavily relies on nested layouts and Route Groups.

```text
/my-app
├── app/
│   ├── (fullpage)/         # Routes that take up the full screen (No main Sidebar)
│   │   ├── brand-campaign/
│   │   ├── creators/
│   │   ├── landing-page/
│   │   └── ugc/            # User Generated Content flows
│   ├── (shell)/            # Routes wrapped in the main AppShell layout (Has Sidebar/Nav)
│   │   ├── discover/       # Browsing campaigns
│   │   ├── home/           # Dashboard home
│   │   ├── joined/         # Specific contexts for a campaign a user has joined
│   │   │   ├── about/
│   │   │   ├── accounts/   # Complex verification flow
│   │   │   ├── assets/     # Downloadable assets for creators
│   │   │   ├── my-submissions/
│   │   │   └── rewards/    # Financials, CPM display
│   │   ├── messages/
│   │   └── settings/
│   ├── login/              # Authentication entry paths
│   ├── layout.tsx          # Master HTML wrapper (Injects ThemeProvider & Fonts)
│   └── page.tsx            # Global redirect map (Currently redirects to /home)
├── components/
│   ├── layout/             # Topbar, Sidebars, AppShell implementations
│   ├── ui/                 # Reusable generic components (Buttons, Inputs, Modals)
│   └── landing/            # Landing page specific components
├── lib/                    # Utility functions, API connectors, constant data
├── public/                 # Static assets (images, base icons, SVGs)
└── DOCUMENTATION.md        # Legacy internal notes
```

### Route Groups `(shell)` vs `(fullpage)`

- `(shell)`: Wraps all inner routes in a persistent layout that includes bottom navigation (for mobile) and a side navigation drawer (for desktop).
- `(fullpage)`: Used for landing pages, auth gateways, and deep interactive steps that need to hide normal navigation elements to maintain user focus.

---

## 5. �️ Application Routing Guide

This application heavily utilizes Next.js Route Groups layout functionalities to serve specific User Interfaces based on the context of the page.

### 🏠 Global Layout Entry

- `/` -> Redirects immediately to `/home`. Managed by `app/page.tsx`.

### 🗂️ Route Group: `(shell)`

The `(shell)` route group wraps its interior routes in the main application shell containing the sidebar on desktop, and the bottom navigation bar on mobile. These are the primary authenticated dashboard interfaces.

| Route            | Description                                                                                        |
| ---------------- | -------------------------------------------------------------------------------------------------- |
| `/home`          | The main dashboard landing page. An overview of the creator’s current status.                      |
| `/discover`      | A marketplace/hub where creators can discover new brand campaigns to join, with filtering options. |
| `/campaign`      | Details related to discovering specific campaigns (often dynamic or overview interfaces).          |
| `/profile`       | User profile management, displaying personal creator stats, past earnings, and portfolio items.    |
| `/settings`      | General account settings, preferences, and security options.                                       |
| `/messages`      | In-app messaging interface for creators and brands to communicate.                                 |
| `/notifications` | Activity feed, alerts on payouts, campaign status changes, and new verifications.                  |
| `/accounts`      | Global view of linked social accounts (Instagram, TikTok, YouTube, etc.).                          |
| `/balance`       | Financial hub tracking cumulative earnings and available payout balances.                          |

#### 📂 Nested Route Group: `(shell)/joined`

A sequestered sub-layout inside `(shell)` for users who have actively joined a specific campaign. It replaces the main sidebar with a context-aware "Campaign Navigation Sidebar" (`SidebarJoined.tsx`).

| Sub-Route                | Description                                                                                 |
| ------------------------ | ------------------------------------------------------------------------------------------- |
| `/joined/about`          | Brief summary and core requirements of the specific campaign.                               |
| `/joined/requirements`   | Detailed timeline, content requirements, and specific deliverables needed from the creator. |
| `/joined/assets`         | File hub where creators download brand assets, mood boards, or shared drive links.          |
| `/joined/my-submissions` | Where creators submit their drafts, videos, or posts for brand review natively.             |
| `/joined/rewards`        | Tracks the specific financial payout and CPMs for the active campaign using progress bars.  |
| `/joined/accounts`       | Campaign-specific multi-step social verification flow (deep-scan simulation UI).            |

### 🖼️ Route Group: `(fullpage)`

The `(fullpage)` route group hides standard app navigation (no sidebar or bottom nav) to render immersive, full-page experiences such as marketing pages or dedicated flows.

| Route             | Description                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------------- |
| `/landing-page`   | The primary public-facing landing page of the platform.                                     |
| `/creators`       | Public marketing/informational page targeting creators ("Leading Home for Creator Talent"). |
| `/brand-campaign` | Public or isolated view for a specific brand campaign showcase.                             |
| `/campaign`       | A full-page variant for campaign overviews depending on the campaign type.                  |
| `/clipping`       | An isolated full-page tool/flow related to clipping content or streams.                     |
| `/logo`           | Contains promotional or branding video flows highlighting platform partners.                |
| `/music`          | A specialized marketing or showcase page focusing on music campaigns.                       |
| `/ugc`            | Specialized flow/showcase focusing on User-Generated Content specific layouts.              |

### 🔐 Authentication Entry

- `/login` | Entry flow handling Email, OTP, and multi-step onboarding (Name, DOB, Profile Picture, Password).

---

## 6. �🔍 Core Features Deep Dive

### A. The "Joined Campaign" Experience (`/joined`)

Once a creator joins a campaign, they enter a sequestered layout. This layout provides a context-aware sidebar (`SidebarJoined.tsx`) which isolates navigation logic strictly to the active campaign contexts:

- **Assets (`/joined/assets`)**: Displays mood boards, brand files, and Google Drive links.
- **Rewards (`/joined/rewards`)**: Renders sophisticated financial UI displaying "Available vs Paid Out", CPM thresholds, and maximum earning potential through Framer Motion-driven progress bars.

### B. Intelligent Social Verification (`/joined/accounts`)

This is arguably the most complex logic node in the current application. It uses a **Three-Step State Machine** to mimic an API deep-scan for verifying creator identity:

1. **Identification**: Captures standard input handles (e.g., @username).
2. **Instruction/Validation**: Issues a localized unique code (e.g., `WHOP-XXXX`) and instructs the user to momentarily place it in their Instagram/YouTube bio.
3. **Deep-Scan Execution**: Submits an async timeout UI check simulating connection to GraphAPIs or scraping layers to cross-reference the unique ID against the live biography.

_Developer Note for Handover: This system currently simulates the API logic on the frontend. A critical next step for backend engineers is to replace the simulated `setTimeout` functions with real backend polling endpoints._

### C. Advanced Layout Responsiveness

- **`100dvh` Implementation**: To combat the infamous Safari/Android bottom-nav bar overlay issue on mobile, the application layouts rely strictly on `100dvh` rather than `100vh` to prevent hidden content.
- **Mobile Scrolling**: Sub-pages use flattened architectures without excessive nested overflows to ensure touch-swiping behaves frictionlessly inside the master `AppShell`.

---

## 7. 🎨 Styling and UI Considerations

- **Global Theming**: Integrated via `next-themes` and `ThemeProvider` in `app/layout.tsx`. Supports light, dark, and system modes natively.
- **Glassmorphism**: Leverages heavy `backdrop-blur`, semi-transparent `bg-background/80`, and discrete `border` utilities from Tailwind.
- **Icons as Components**: SVG Icons in the `components/` layer (e.g., `HouseIcon.tsx`, `BellIcon.tsx`) are parameterized for standardized rendering sizes and stroke widths.

---

## 8. 🚀 Deployment Guide

This project is natively optimized for **Vercel**, but can be deployed to any Node.js compatible hosting environment.

**Deploying to Vercel (Recommended):**

1. Push the repository to GitHub/GitLab/Bitbucket.
2. Sign in to [Vercel](https://vercel.com/) and create a new project.
3. Import the repository. Vercel will automatically detect **Next.js** and configure build settings:
   - Build Command: `next build`
   - Output Directory: `.next`
   - Install Command: `npm install`
4. Add any environment variables (currently non-essential, but vital once APIs attach).
5. Click **Deploy**.

**Docker/Self-Hosting:**
Run `npm run build` and follow the Next.js custom server setup if utilizing a containerized workflow like Docker/Kubernetes.

---

## 9. 📝 Roadmap & Known Tasks for Incoming Devs

If you are picking up this project, address the following immediate areas:

1. **Backend Integration**: Replace the state-simulated verification (`/joined/accounts`) with active OAuth 2.0 or scraping API routes.
2. **Submission Uploads**: Connect a bucket storage provider (AWS S3, Cloudinary) to handle user video/picture submissions locally instead of mock states.
3. **Database Hookup**: Hook up Prisma/Drizzle ORM for server-side persistence of Campaign stats and user profiles.

---

_Created by Antigravity (AI Assistant) • Prepared for Seamless Handover_
