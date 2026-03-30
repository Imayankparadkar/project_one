"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "./Sidebar";
import { Menu, X } from "lucide-react";
import { UserRoundIcon } from "@/components/UserRoundIcon";

export function MobileSidebar({
  isLoggedIn,
  setIsLoggedIn,
}: {
  isLoggedIn: boolean;
  setIsLoggedIn: (v: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Add Profile or Login based on state
  const authItem = isLoggedIn
    ? { name: "Profile", href: "/profile", icon: UserRoundIcon }
    : { name: "Login", href: "#", icon: UserRoundIcon, onClick: () => setIsLoggedIn(true) };

  const currentNavItems = [...navItems, authItem];

  return (
    <>
      {/* Mobile Header Bar - Only visible on mobile */}
      <div className="md:hidden sticky top-0 z-30 bg-background border-b px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpen(true)}
            className="p-2 -ml-2 text-foreground hover:bg-muted/50 rounded-md transition-colors"
            aria-label="Open Menu"
          >
            <Menu size={24} />
          </button>
          <span className="font-semibold text-sm">BennyBucks</span>
        </div>
      </div>

      {/* Overlay - smooth fade in/out */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-[1px] transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[280px] bg-background border-r shadow-2xl transition-transform duration-300 ease-out transform ${open ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <span className="text-xl font-bold tracking-tight text-foreground ml-2">BennyBucks</span>
          <button
            onClick={() => setOpen(false)}
            className="rounded-full p-2 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-col gap-1 p-3 overflow-y-auto h-[calc(100%-65px)]">
          {currentNavItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            const content = (
              <>
                <Icon className={`h-5 w-5 ${active ? "text-primary" : "text-muted-foreground"}`} />
                <span>{item.name}</span>
              </>
            );

            const className = `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all
              ${active
                ? "bg-primary/10 text-primary hover:bg-primary/15"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }
            `;

            if ('onClick' in item && item.onClick) {
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    item.onClick?.();
                    setOpen(false);
                  }}
                  className={className}
                >
                  {content}
                </button>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className={className}
              >
                {content}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
