"use client";

import React from "react";
import { Hash, Search, Link as LinkIcon, Bell, Menu } from "lucide-react";

interface ChatHeaderProps {
    campaignName: string;
}

export default function ChatHeader({ campaignName }: ChatHeaderProps) {
    return (
        <header className="h-14 border-b border-(--color-border) flex items-center justify-between px-4 bg-(--color-bg-primary) shrink-0 z-10">
            <div className="flex items-center gap-3">
                {/* Mobile Menu Icon (Placeholder for sidebar toggle) */}
                <button className="lg:hidden text-(--color-text-secondary) hover:text-(--color-text-primary)">
                    <Menu className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2">
                    <Hash className="w-5 h-5 text-(--color-text-muted)" />
                    <h2 className="font-bold text-base text-(--color-text-primary)">
                        {campaignName}'s Chat
                    </h2>
                </div>
            </div>

            <div className="flex items-center gap-4 text-(--color-text-secondary)">
                <button className="p-1.5 hover:bg-(--color-surface-hover) rounded-md transition-colors">
                    <Search className="w-5 h-5" />
                </button>
                <button className="p-1.5 hover:bg-(--color-surface-hover) rounded-md transition-colors">
                    <LinkIcon className="w-5 h-5" />
                </button>
                <button className="p-1.5 hover:bg-(--color-surface-hover) rounded-md transition-colors">
                    <Bell className="w-5 h-5" />
                </button>
            </div>
        </header>
    );
}
