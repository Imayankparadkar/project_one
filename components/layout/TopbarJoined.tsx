"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "@/components/SearchIcon";
import { useTheme } from "@/components/theme-provider";
import { Moon, Sun } from "lucide-react";

import { useEffect, useState } from "react";

export function TopbarJoined() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return (
      <header className="flex h-14 items-center justify-between border-b border-border bg-background px-4" />
    );
  }

  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-background px-4 relative z-10">
      {/* Left */}
      <div className="flex items-center gap-3">
        <Button
          className="sm:hidden"
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label={
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          {theme === "dark" ? <Sun /> : <Moon />}
        </Button>
        <div className="hidden sm:block w-80 relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search BennyBucks" className="pl-10 rounded-full" />
        </div>
      </div>

      {/* Right (desktop only) */}
      <div className="hidden sm:flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === "dark" ? <Sun /> : <Moon />}
        </Button>
        <Button variant="ghost">API</Button>
        <Button variant="ghost">Sign in</Button>
        <Button className="rounded-full">Create a business</Button>
      </div>
    </header>
  );
}
