'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SETTINGS_MENU } from './SidebarSettings'

export function MobileSidebarSettings() {
    const [open, setOpen] = useState(false)
    const pathname = usePathname()

    return (
        <>
            <div className="md:hidden sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b px-4 h-14 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setOpen(true)}
                        className="p-2 -ml-2 text-foreground hover:bg-muted/50 rounded-md transition-colors"
                    >
                        <Menu size={20} />
                    </button>
                    <span className="font-bold text-sm">Settings</span>
                </div>
            </div>

            {/* Overlay */}
            <div
                className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px] transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setOpen(false)}
            />

            {/* Drawer */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-[280px] bg-background border-r shadow-2xl transition-transform duration-300 ease-out transform ${open ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="flex items-center justify-between p-4 border-b">
                    <span className="text-lg font-bold">Account Settings</span>
                    <button
                        onClick={() => setOpen(false)}
                        className="rounded-full p-2 hover:bg-muted"
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="px-3 py-6 space-y-1">
                    {SETTINGS_MENU.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className={`flex items-center gap-4 rounded-xl px-4 py-3 text-[15px] transition-all duration-200
                  ${isActive
                                        ? 'bg-zinc-800 text-text-primary font-bold'
                                        : 'text-zinc-500 hover:text-zinc-300 font-medium'
                                    }`}
                            >
                                <span className={isActive ? 'text-text-primary' : 'text-zinc-500'}>
                                    {item.icon}
                                </span>
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </aside>
        </>
    )
}
