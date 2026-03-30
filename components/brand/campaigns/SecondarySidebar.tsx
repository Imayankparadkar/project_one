"use client";

import React, { useState } from "react";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import {
    LayoutDashboard,
    BarChart2,
    Image as ImageIcon,
    MoreHorizontal,
    Copy,
    ChevronRight,
    Settings,
    ChevronLeft,
    MessageCircle,
    Star
} from "lucide-react";
import { cn } from "@/lib/utils";
import EditBrandingModal from "../campaigns/EditBrandingModal";
import { mockCampaigns } from "@/lib/data/campaigns";
import Link from "next/link";

interface NavItem {
    id: string;
    label: string;
    icon: React.ElementType;
}

interface ContentItem {
    id: string;
    label: string;
}

export default function SecondarySidebar() {
    const params = useParams();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const campaignId = params.campaign as string;

    const isMobileDetailView = pathname.includes("/details") || pathname.endsWith("/analytics") || pathname.endsWith("/submissions") || /\/submissions\/[a-zA-Z0-9_-]+$/.test(pathname) || pathname.endsWith("/chat") || pathname.endsWith("/reviews");

    // Find active campaign
    const campaign = mockCampaigns.find(c => c.id === campaignId);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Determine active nav based on pathname
    const isAnalytics = pathname.includes("/analytics");
    const isSubmissions = pathname.includes("/submissions");
    const isChat = pathname.includes("/chat");
    const isReviews = pathname.includes("/reviews");
    const isDetails = pathname.includes("/details");
    const activeNavId = isAnalytics ? "analytics" : isSubmissions ? "submissions" : isChat ? "chat" : isReviews ? "reviews" : "details";

    // Default fallback if campaign not found
    const displayBanner = campaign?.thumbnail || "https://placehold.co/400x200/2a2a2a/FFFFFF/png?text=BBKI";
    const displayName = campaign?.name || "Campaign Name";

    const navItems: NavItem[] = [
        { id: "details", label: "Campaign Details", icon: LayoutDashboard },
        { id: "analytics", label: "Analytics", icon: BarChart2 },
        { id: "submissions", label: "Submissions", icon: ImageIcon },
        { id: "chat", label: "Chat", icon: MessageCircle },
        { id: "reviews", label: "Creator Reviews", icon: Star },
    ];

    return (
        <>
            <aside
                className={cn(
                    "shrink-0 border-r border-(--color-border) bg-(--color-bg-secondary) flex-col h-full overflow-y-auto custom-scrollbar pb-10 lg:pb-0",
                    isMobileDetailView ? "hidden lg:flex lg:w-[280px]" : "flex w-full lg:w-[280px]"
                )}
            >
                {/* Mobile Back Button */}
                <div className="lg:hidden p-4 border-b border-(--color-border-subtle) shrink-0 bg-(--color-bg-primary)">
                    <Link href="/brand/campaigns" className="flex items-center gap-2 text-(--color-text-secondary) hover:text-(--color-text-primary) font-medium transition-colors">
                        <ChevronLeft className="w-5 h-5" />
                        <span>Back to Campaigns</span>
                    </Link>
                </div>

                {/* 1. BRAND BANNER SECTION */}
                <div className="mb-6 relative group select-none shrink-0">
                    <div className="h-48 lg:h-32 overflow-hidden relative border-b border-(--color-border-subtle) bg-(--color-bg-tertiary)">
                        <img
                            src={displayBanner}
                            alt="Brand Banner"
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-50 transition-all duration-300"
                            suppressHydrationWarning
                        />
                        <div className="absolute inset-0 p-4 lg:p-3 flex flex-col justify-between z-10">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-xl lg:text-lg text-white drop-shadow-md line-clamp-1">{displayName}</h3>
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                        <span className="text-xs font-medium text-green-400 drop-shadow-sm shadow-black">
                                            1 online
                                        </span>
                                    </div>
                                </div>
                                <button className="text-white/70 hover:text-white transition-colors">
                                    <MoreHorizontal className="w-6 h-6 lg:w-5 lg:h-5 drop-shadow-md" />
                                </button>
                            </div>

                            <button
                                onClick={() => setIsEditModalOpen(true)}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-(--color-bg-tertiary)/80 hover:bg-(--color-surface-elevated) backdrop-blur-md border border-(--color-border) text-(--color-text-primary) text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-2"
                            >
                                <ImageIcon className="w-3.5 h-3.5" />
                                Edit banner
                            </button>

                            <div className="self-end">
                                <button className="bg-black/40 hover:bg-black/80 backdrop-blur-md border border-white/5 hover:border-white/20 text-white/90 text-xs lg:text-[10px] font-medium px-3 py-1.5 lg:px-2 lg:py-1 rounded-md flex items-center gap-1.5 transition-all">
                                    <Copy className="w-3.5 h-3.5 lg:w-3 lg:h-3" />
                                    Copy invite link
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. PRIMARY NAVIGATION */}
                <nav className="space-y-1 mb-4 px-3 shrink-0">
                    {navItems.map((item) => {
                        const href = `/brand/campaigns/${campaignId}/${item.id}`;

                        return (
                            <Link
                                key={item.id}
                                href={href}
                                className={cn(
                                    "w-full flex items-center gap-3 px-3 py-3 lg:py-2 rounded-lg text-base lg:text-sm font-medium transition-all duration-200",
                                    activeNavId === item.id
                                        ? "bg-(--color-surface-elevated) text-(--color-text-primary) border border-(--color-border)"
                                        : "text-(--color-text-secondary) hover:bg-(--color-surface-hover) hover:text-(--color-text-primary) border border-transparent"
                                )}
                            >
                                <item.icon
                                    className={cn(
                                        "w-5 h-5"
                                    )}
                                />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* <div className="pt-2 border-t border-(--color-border) flex-1 flex flex-col px-3 pb-8">
                    <div className="">
                        <button className="w-full flex items-center gap-3 px-3 py-3 lg:py-2 rounded-lg text-base lg:text-sm text-(--color-text-secondary) hover:bg-(--color-surface-hover) hover:text-(--color-text-primary) transition-colors">
                            <MessageCircle className="w-5 h-5 lg:w-4 lg:h-4 text-(--color-text-muted)" />
                            Chat
                        </button>
                        <button className="w-full flex items-center gap-3 px-3 py-3 lg:py-2 rounded-lg text-base lg:text-sm text-(--color-text-secondary) hover:bg-(--color-surface-hover) hover:text-(--color-text-primary) transition-colors">
                            <Star className="w-5 h-5 lg:w-4 lg:h-4 text-(--color-text-muted)" />
                            Creator Reviews
                        </button>
                    </div>
                </div> */}
            </aside>

            <EditBrandingModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                initialName={displayName}
                initialImage={displayBanner}
                onSave={(newName, newImage) =>
                    console.log("Saving banner edits, typically via API", newName, newImage)
                }
            />
        </>
    );
}