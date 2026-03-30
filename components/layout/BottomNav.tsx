"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { UserRoundIcon } from "../UserRoundIcon";
import { MegaphoneIcon } from "../MegaphoneIcon";
import { HouseIcon } from "../HouseIcon";
import { MessageCircleIcon } from "../MessageCircleIcon";
import { BellIcon } from "../BellIcon";
import { CompassIcon } from "../CompassIcon";

export function BottomNav({
  isLoggedIn,
  setIsLoggedIn,
}: {
  isLoggedIn: boolean;
  setIsLoggedIn: (v: boolean) => void;
}) {
  const pathname = usePathname();

  const mobileNavItems = [
    { name: "Home", href: "/home", icon: HouseIcon },
    { name: "Discover", href: "/discover", icon: CompassIcon },
    { name: "Campaign", href: "/campaign", icon: MegaphoneIcon },
    { name: "Accounts", href: "/accounts", icon: UserRoundIcon },
    { name: "Messages", href: "/messages", icon: MessageCircleIcon },
    { name: "Notifications", href: "/notifications", icon: BellIcon },
    {
      name: isLoggedIn ? "Profile" : "Login",
      href: isLoggedIn ? "/profile" : "#",
      icon: UserRoundIcon,
      onClick: isLoggedIn ? undefined : () => setIsLoggedIn(true)
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[60] flex h-16 items-center justify-around border-t bg-background px-2 pb-safe shadow-[0_-1px_3px_rgba(0,0,0,0.05)] md:hidden">
      {mobileNavItems.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href;

        const content = (
          <div className={`flex flex-col items-center justify-center gap-1 p-2 transition-colors ${active ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}>
            <Icon className={`h-6 w-6 stroke-[1.5] ${active ? "stroke-[2.5]" : ""}`} />
            <span className="text-[10px] font-medium leading-none">{item.name}</span>
          </div>
        );

        if (item.onClick) {
          return (
            <button key={item.name} onClick={item.onClick} className="flex-1">
              {content}
            </button>
          );
        }

        return (
          <Link key={item.name} href={item.href} className="flex-1">
            {content}
          </Link>
        );
      })}
    </nav>
  );
}
