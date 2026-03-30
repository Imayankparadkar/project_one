"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatedIconWrapper } from "./AnimatedIconWrapper";

// Icons
import { HouseIcon } from "@/components/HouseIcon";
import { CompassIcon } from "@/components/CompassIcon";
import { MessageCircleIcon } from "@/components/MessageCircleIcon";
import { BellIcon } from "@/components/BellIcon";
import { UserRoundIcon } from "@/components/UserRoundIcon";
import { MegaphoneIcon } from "@/components/MegaphoneIcon";
import { useState } from "react";
import { BadgeDollarIcon } from "../BadgeDollarIcon";

export interface MenuItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
}

export const navItems: MenuItem[] = [
  { name: "Home", href: "/home", icon: HouseIcon },
  { name: "Discover", href: "/discover", icon: CompassIcon },
  { name: "Campaign", href: "/campaign", icon: MegaphoneIcon },
  { name: "Accounts", href: "/accounts", icon: UserRoundIcon },
  { name: "Messages", href: "/messages", icon: MessageCircleIcon },
  { name: "Notifications", href: "/notifications", icon: BellIcon },
  { name: "Balance", href: "/balance", icon: BadgeDollarIcon },
  // { name: "Create a business", href: "/finance", icon: TrendingUpDownIcon },
];

export function Sidebar({
  expanded,
  setExpanded,
  isLoggedIn,
  setIsLoggedIn,
}: {
  expanded: boolean;
  setExpanded: (v: boolean) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (v: boolean) => void;
}) {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Add Profile or Login based on state
  const authItem: MenuItem = isLoggedIn
    ? { name: "Profile", href: "/profile", icon: UserRoundIcon }
    : { name: "Login", href: "#", icon: UserRoundIcon, onClick: () => setIsLoggedIn(true) };

  const currentNavItems: MenuItem[] = [...navItems, authItem];

  return (
    <aside
      onMouseEnter={() => {
        if (typeof window !== 'undefined' && window.innerWidth >= 768) {
          setExpanded(true);
        }
      }}
      onMouseLeave={() => {
        setExpanded(false);
        setHoveredItem(null);
      }}
      className={`
        h-full border-r bg-background
        transition-[width] duration-300 ease-out
        ${expanded ? "w-64" : "w-20"}
      `}
    >
      <div className="px-7 py-6 text-xl font-semibold text-foreground">
        {expanded ? "BennyBucks" : "B"}
      </div>

      <nav className="space-y-2 px-2">
        {currentNavItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          const hovered = hoveredItem === item.name;

          const content = (
            <>
              {/* 👇 ONLY THIS ICON ANIMATES */}
              <AnimatedIconWrapper isHovered={hovered}>
                <Icon className="h-7 w-7 stroke-[1.75]" />
              </AnimatedIconWrapper>

              {expanded && (
                <span className="whitespace-nowrap transition-opacity duration-200">
                  {item.name}
                </span>
              )}
            </>
          );

          const className = `
            flex w-full items-center gap-3 rounded-xl px-4 py-2.5
            transition-colors duration-200
            ${active
              ? "bg-muted text-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"}
          `;

          if ('onClick' in item && item.onClick) {
            return (
              <button
                key={item.name}
                onClick={item.onClick}
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
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
              onMouseEnter={() => setHoveredItem(item.name)}
              onMouseLeave={() => setHoveredItem(null)}
              className={className}
            >
              {content}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
