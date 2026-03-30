"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronRight, Pin } from "lucide-react";
import { cn } from "@/lib/utils";

interface PinnedMessageProps {
    campaignName: string;
    pinnedContent: string;
}

export default function PinnedMessage({ campaignName, pinnedContent }: PinnedMessageProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="bg-(--color-bg-secondary) border-b border-(--color-border) overflow-hidden transition-all duration-300">
            <div 
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-(--color-surface-hover) transition-colors"
            >
                <div className="flex items-center gap-2">
                    <Pin className="w-4 h-4 text-blue-500 fill-blue-500/20" />
                    <span className="text-xs font-bold text-blue-500 uppercase tracking-tight">
                        Pinned Message (1/1)
                    </span>
                    <span className="text-xs font-medium text-(--color-text-primary) ml-2">
                        {campaignName}
                    </span>
                </div>
                {isCollapsed ? (
                    <ChevronRight className="w-4 h-4 text-(--color-text-muted)" />
                ) : (
                    <ChevronDown className="w-4 h-4 text-(--color-text-muted)" />
                )}
            </div>
            
            {!isCollapsed && (
                <div className="px-4 pb-4 pt-1">
                    <div className="bg-(--color-bg-primary)/50 border border-(--color-border-subtle) rounded-lg p-3 text-sm text-(--color-text-secondary) leading-relaxed line-clamp-2 overflow-hidden">
                        {pinnedContent}
                    </div>
                </div>
            )}
        </div>
    );
}
