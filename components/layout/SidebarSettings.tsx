'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
    User,
    Shield,
    Bell,
    BadgeDollarSign,
    LifeBuoy,
} from 'lucide-react'

export type SidebarItemType = {
    label: string
    href: string
    icon: React.ReactNode
}

export const SETTINGS_MENU: SidebarItemType[] = [
    {
        label: 'Edit profile',
        href: '/settings',
        icon: <User size={18} />,
    },
    {
        label: 'Account security',
        href: '/settings/security',
        icon: <Shield size={18} />,
    },
    {
        label: 'Notifications',
        href: '/settings/notifications',
        icon: <Bell size={18} />,
    },
    {
        label: 'Balance',
        href: '/settings/balance',
        icon: <BadgeDollarSign size={18} />,
    },
    {
        label: 'Resolution center',
        href: '/settings/resolution',
        icon: <LifeBuoy size={18} />,
    },
]

export default function SidebarSettings() {
    const pathname = usePathname()

    return (
        <aside className="hidden md:block w-70 h-screen sticky top-0 bg-black border-r border-zinc-900 overflow-y-auto transition-all duration-300">
            {/* Header */}
            <div className="px-6 pt-10 pb-6">
                <h2 className="text-[12px] font-bold text-text-primary/50 uppercase tracking-widest">
                    Account Settings
                </h2>
            </div>

            {/* Menu */}
            <div className="px-2 ml-2 space-y-2">
                {SETTINGS_MENU.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`
            flex w-full items-center gap-3 rounded-xl px-4 py-2.5
            transition-colors duration-200
            ${isActive
                                    ? "bg-muted text-foreground"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"}
          `}
                        >
                            <span className={isActive ? 'text-text-primary' : 'text-zinc-500'}>
                                {item.icon}
                            </span>
                            {item.label}
                        </Link>
                    );
                })}
            </div>
        </aside>
    )
}
