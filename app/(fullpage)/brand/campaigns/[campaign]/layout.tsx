"use client";

import React, { Suspense } from "react";
import SecondarySidebar from "@/components/brand/campaigns/SecondarySidebar";
import { useSearchParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

function MainContentWrapper({ children }: { children: React.ReactNode }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const isMobileDetailView = pathname.includes("/details") || pathname.endsWith("/analytics") || pathname.endsWith("/submissions") || /\/submissions\/[a-zA-Z0-9_-]+$/.test(pathname) || pathname.endsWith("/chat") || pathname.endsWith("/reviews");

    return (
        <main className={cn(
            "flex-1 h-full relative overflow-hidden",
            !isMobileDetailView ? "hidden lg:block" : "block"
        )}>
            {children}
        </main>
    );
}

export default function CampaignsDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-(--color-bg-primary)">
            <Suspense fallback={<div className="w-[280px] bg-(--color-bg-secondary) h-full border-r border-(--color-border) hidden lg:flex" />}>
                <SecondarySidebar />
            </Suspense>

            <Suspense fallback={<main className="flex-1 h-full relative overflow-hidden hidden lg:block">{children}</main>}>
                <MainContentWrapper>{children}</MainContentWrapper>
            </Suspense>
        </div>
    );
}