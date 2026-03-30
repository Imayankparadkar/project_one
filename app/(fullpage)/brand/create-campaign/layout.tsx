import React from "react";

export default function CreateCampaignLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        // Simple full-screen container, no sidebars
        <div className="h-screen w-full bg-(--color-bg-primary) relative overflow-hidden">
            {children}
        </div>
    );
}