"use client";
import { Sidebar } from "./Sidebar";
import { BottomNav } from "./BottomNav";
import { useState } from "react";
import { MobileSidebar } from "./MobileSidebar";

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [expanded, setExpanded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Default to true for now

  return (
    <div className="flex flex-col md:flex-row h-[100dvh] w-full bg-background text-foreground overflow-hidden">
      {/* Sidebar: Visible only on Desktop now */}
      <div className={`hidden md:block h-full shrink-0 border-r z-50 transition-[width] duration-300 ease-out ${expanded ? "w-64" : "w-[70px]"} bg-background`}>
        <Sidebar
          expanded={expanded}
          setExpanded={setExpanded}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
      </div>

      <div className="flex flex-1 flex-col overflow-hidden relative min-w-0">
        {/* Mobile Header Bar - Visible only on mobile */}
        {/* <MobileSidebar
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        /> */}

        {/* Content */}
        <main className="flex-1 overflow-y-auto w-full pb-20 md:pb-0">
          {children}
        </main>

        {/* Bottom Nav: Mobile only */}
        <BottomNav
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
      </div>
    </div>
  );
}
