# 📖 Project Documentation: Creator & Brand Dashboard

This document provides a technical deep-dive into the features, architecture, and implementation details of the Creator/Brand Campaign Dashboard.

---

## 🏗️ Architectural Overview

The project is built using the **Next.js App Router**. It features a hybrid layout system designed to handle two distinct experiences:
1.  **Discovery Phase**: Users browsing and exploring public campaigns.
2.  **Campaign Dashboard (`/joined`)**: A dedicated environment for creators to manage their participation in a specific campaign.

### 📱 Responsive Design Strategy
To ensure a "Native App" feel on mobile, we implemented the following:
- **`h-[100dvh]`**: Used dynamic viewport height units in the `AppShellJoined` to prevent the browser address bar from cutting off content.
- **Scroll Management**: Centralized scrolling in the `AppShell` to avoid "nested scrollbar" issues where sub-pages become stuck or unscrollable on iOS/Android.
- **Adaptive Sidebars**: 72px fixed sidebar for desktop and a gesture-friendly overlay drawer for mobile.

---

## 🛠️ Main Features

### 1. 🛡️ Multi-Step Social Verification
Located at `/joined/accounts`, this is the project's most complex technical feature. It uses a 3-step state-driven UI to simulate real-world API verification.

- **Step 1 (Identification)**: Collects the platform handle.
- **Step 2 (Validation Instruction)**: Generates a unique `WHOP-XXXXXX` code using a crypto-style randomization logic. It uses a `copy-to-clipboard` utility for user convenience.
- **Step 3 (Bio-Scan Simulation)**: Uses an asynchronous timer-based state to simulate a backend "API Deep-Scan". It visually indicates checking the profile bio, follower counts, and engagement consistency.
- **Status Persistence**: Once verified, the account state is updated globally across the platform.

### 2. 💰 Rewards & Campaign Progress
Located at `/joined/rewards`, this module tracks the financial state of a campaign contribution.
- **Progress Tracking**: Uses CSS-in-JS (Tailwind) to render real-time progress bars showing the ratio of "Available vs. Paid Out" funds.
- **Engagement Cards**: Real-time stats for "Max per Post", "CPM Rates", and "Views Example" using high-contrast glassmorphism styles.

### 3. 🗺️ Intelligent Navigation (SidebarJoined)
The sidebar at `/components/layout/SidebarJoined.tsx` is context-aware:
- **Active State Mapping**: Automatically highlights items based on the current URL path using `usePathname`.
- **Enhanced Visual Cues**: Each section has a unique color identity (e.g., Rewards = Yellow, Accounts = Cyan, Assets = Purple) to help user navigation.

---

## 🧩 Key Components

### `AppShellJoined.tsx`
The "Master Layout" for the joined section. It manages the layout grid:
- `flex-col` for mobile (Header + Content).
- `flex-row` for desktop (Sidebar + Main).
- Uses `overflow-hidden` on the parent and `overflow-y-auto` on the content container to ensure the scroll position is preserved correctly.

### `Accounts Page` State Logic
The verification modal uses a state machine to track steps:
```typescript
{
  id: string;             // Platform ID (e.g., 'instagram')
  step: 'username' | 'instruction' | 'verifying'; // Current UI Step
  username: string;       // User's handle
  code: string;           // The unique WHOP-XXXX verification code
}
```

---

## 🚀 Solved Technical Challenges

### 1. The Mobile "Stuck" Scroll Bug
**Bug**: Sub-pages like `About` and `Assets` were not scrolling to the bottom on mobile.
**Cause**: Nested `h-full overflow-y-auto` divs inside another scrollable parent.
**Fix**: Flattened the page structure. Removed internal overflows and let the `AppShell` container handle the main scroll.

### 2. Duplicate Viewport Height
**Bug**: Footer content was disappearing behind mobile navigation bars.
**Fix**: Switched from `100vh` to `100dvh`, ensuring the layout respects the browser's dynamic UI elements.

---

## 🔜 Future Enhancements
- **Backend Integration**: Replace simulated verify logic with real OAuth2 or Scraping APIs.
- **Live Notifications**: Implement WebSockets for real-time campaign updates.
- **Submission Uploads**: Real-time file processing for video clips.

---
*Last Updated: February 2026*
