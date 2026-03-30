<div align="center">

# 🚀 Creator & Brand Campaign Dashboard

**A premium, state-of-the-art dashboard built for creators and brands to manage campaigns, reward content contributors, and verify social engagement.**

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Framer Motion](https://img.shields.io/badge/framer--motion-black?style=for-the-badge&logo=framer&logoColor=white)

</div>

<br/>

This project features a high-end, responsive UI built with **Next.js 16**, **React 19**, and **Tailwind CSS v4**, featuring a custom dark-mode aesthetic with smooth glassmorphism and deep-scan social verification logic.

## ✨ Key Features

- **🎯 Discover Campaigns**: Browse and join premium campaigns from top creators.
- **🏆 Content Rewards**: Track payouts, CPM rates, and campaign progress with real-time financial tracking widgets.
- **🔒 Social Verification Engine**: A simulated 3-step verification system to link social media accounts using unique code bio-scans.
- **📁 Asset Management**: Centralized access to brand assets, Google Drive links, and community channels depending on the active campaign context.
- **📱 Native-App Feel**: Fully optimized for mobile with `100dvh` responsive handling, dedicated bottom navigation, and gesture-friendly sidebars.
- **🎨 Premium UI/UX**: Ultra-smooth micro-animations powered by Framer Motion.

## 🛠️ Tech Stack

- **Framework**: [Next.js App Router](https://nextjs.org/)
- **Core Engine**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons & UI**: [Lucide React](https://lucide.dev/) & [Shadcn UI](https://ui.shadcn.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (Latest LTS version v20+ recommended)
- `npm`, `yarn`, or `pnpm`

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/ShivamAgrawal04/clone-web-next.git
   cd my-app
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the local development server**:

   ```bash
   npm run dev
   ```

4. **Access the application**:
   Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## 🗺️ Project Navigation

The project utilizes Next.js App Router mechanics with distinct layout groups:

- `(shell)`: Authenticated dashboard routes containing persistent sidebars and mobile navigation (e.g., `/home`, `/discover`, `/balance`).
- `(shell)/joined`: Dedicated sub-routing for active campaigns with context-aware navigation.
- `(fullpage)`: Immersive experiences that hide the dashboard shell (e.g., `/landing-page`, `/creators`).
- `/login`: The sophisticated onboarding and authentication entry.

_For deep architectural details, routing logic, and instructions on how to take over this codebase, please see the internal [Developer Handover Document](./HANDOVER_DOCUMENT.md)._

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

If you are a new developer boarding this project, please make sure to read the [HANDOVER_DOCUMENT.md](./HANDOVER_DOCUMENT.md) carefully to understand the nested layout design, the responsive scrolling fixes, and how social verification is being mocked via frontend steps.

## 📄 License

This project is licensed under the MIT License.

<div align="center">
  <br/>
  <i>Built for the Creator Economy.</i>
</div>
