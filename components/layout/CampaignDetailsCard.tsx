"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SubmitContentModal from "./SubmitContentModal";

interface CampaignDetailsCardProps {
    campaign?: {
        title: string;
        company: string;
        categories: string[];
        platforms: string[];
        paidOut: string;
        totalBudget: string;
        cp: number;
        cpm: string;
        approval: string;
        views: string;
        creators: string;
        submissions: number;
        status: "active" | "ended" | "paid_out";
        image?: string;
    };
}

const defaultCampaign = {
    title: "Crown Coins x Terence Crawford",
    company: "Clipr Clipping",
    categories: ["CLIPPING", "ENTERTAINMENT"],
    platforms: ["instagram", "tiktok", "youtube"],
    paidOut: "$13,359.37",
    totalBudget: "$21,250",
    cp: 63,
    cpm: "$2.00",
    approval: "61%",
    views: "6.5M",
    creators: "1984",
    submissions: 1,
    status: "active" as const,
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png"
};

export default function CampaignDetailsCard({ campaign = defaultCampaign }: CampaignDetailsCardProps) {
    const isActive = campaign.status === "active";
    const isPaidOut = campaign.status === "paid_out";
    const router = useRouter();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const handleSubmitSuccess = () => {
        setHasSubmitted(true);
    };

    const handleViewSubmissions = (e: React.MouseEvent) => {
        e.stopPropagation();
        router.push("/joined/my-submissions");
    };

    return (
        <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 hover:border-[#d4af37]/30 h-full">
            <div className="p-5 flex flex-col gap-5 h-full">
                {/* Header Section - Discover Style */}
                <div className="flex flex-col gap-3">
                    <div className="flex items-start justify-between w-full">
                        <div className="relative w-20 h-14 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                            <Image
                                alt={campaign.title}
                                fill
                                className="object-cover"
                                src={campaign.image || "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png"}
                            />
                        </div>
                        <div className="flex flex-col gap-2 items-end justify-end flex-1">
                            <div className="flex gap-1 items-center justify-end flex-wrap">
                                {campaign.categories.map((category, index) => (
                                    <div key={index} className="inline-flex items-center justify-center px-2 py-1 rounded-full border border-border bg-muted">
                                        <span className="font-medium text-xs text-foreground whitespace-nowrap">
                                            {category}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            {isPaidOut && (
                                <div className="flex items-center gap-1.5">
                                    <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-xs font-semibold text-green-500">Paid Out</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h3 className="text-sm font-semibold text-foreground leading-tight line-clamp-2">
                            {campaign.title}
                        </h3>
                        <div className="flex gap-2 items-center min-w-0">
                            <span className="text-xs font-medium text-foreground truncate">
                                {campaign.company}
                            </span>
                            <div className="flex gap-1.5 items-center">
                                {campaign.platforms.map((platform, index) => (
                                    <div key={index} className="relative w-4 h-4 flex-shrink-0">
                                        {platform === 'instagram' && (
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-muted-foreground">
                                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
                                            </svg>
                                        )}
                                        {platform === 'tiktok' && (
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-muted-foreground">
                                                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                                            </svg>
                                        )}
                                        {platform === 'youtube' && (
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-muted-foreground">
                                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                            </svg>
                                        )}
                                        {platform === 'x' && (
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-muted-foreground">
                                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                            </svg>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Section - Discover Style */}
                <div className="flex flex-col gap-4 mt-auto">
                    <div className="flex items-end justify-between w-full">
                        <div className="flex flex-col justify-center gap-1">
                            <span className="text-xs font-medium text-muted-foreground">
                                Paid Out
                            </span>
                            <p className="text-base font-semibold text-foreground whitespace-nowrap">
                                {campaign.paidOut}{" "}
                                <span className="text-xs text-muted-foreground">
                                    / {campaign.totalBudget}
                                </span>
                            </p>
                        </div>
                        <div className="flex flex-col justify-center text-right gap-1">
                            <span className="text-xs font-medium text-muted-foreground">
                                CPM
                            </span>
                            <p className="text-base font-semibold text-foreground whitespace-nowrap">
                                {campaign.cpm}{" "}
                                <span className="text-xs text-muted-foreground">
                                    / 1k views
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative w-full h-1 bg-muted rounded-full overflow-hidden">
                        <div
                            className="absolute left-0 top-0 h-full bg-orange-500 rounded-full transition-all duration-500"
                            style={{
                                width: `${campaign.cp}%`,
                            }}
                        ></div>
                    </div>
                </div>

                {/* Stats Section - Discover Style */}
                <div className="flex items-start justify-between w-full pt-2 border-t border-border">
                    <div className="flex flex-col gap-1 items-start flex-1">
                        <div className="cursor-help">
                            <span className="text-xs font-medium text-muted-foreground">
                                Approval
                            </span>
                        </div>
                        <span className="text-xs font-semibold text-green-600">
                            {campaign.approval}
                        </span>
                    </div>
                    <div className="flex flex-col gap-1 items-start justify-center flex-1">
                        <div className="cursor-help">
                            <span className="text-xs font-medium text-muted-foreground">
                                Views
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="text-xs font-semibold text-foreground whitespace-nowrap">
                                {campaign.views}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 items-start flex-1">
                        <div className="cursor-help">
                            <span className="text-xs font-medium text-muted-foreground">
                                Creators
                            </span>
                        </div>
                        <span className="text-xs font-semibold text-foreground">
                            {campaign.creators}
                        </span>
                    </div>
                </div>

                {/* Action Buttons - Campaign Features */}
                <div className="flex flex-col gap-2.5 pt-2 border-t border-border">
                    {/* Your Submissions */}
                    <div
                        onClick={handleViewSubmissions}
                        className="bg-muted/30 border border-border rounded-xl p-3 flex items-center justify-between hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                        <span className="text-sm font-semibold text-foreground">
                            Your Submissions
                        </span>
                        <div className="w-8 h-8 bg-background border border-border rounded-lg flex items-center justify-center">
                            <span className="text-sm font-bold text-foreground">
                                {campaign.submissions}
                            </span>
                        </div>
                    </div>

                    {/* Submit Button - Only for Active Campaigns */}
                    {isActive && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsModalOpen(true);
                            }}
                            disabled={hasSubmitted}
                            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-muted disabled:to-muted disabled:cursor-not-allowed rounded-xl p-3.5 text-base font-bold text-text-primary disabled:text-muted-foreground transition-all duration-300 shadow-lg hover:shadow-xl disabled:shadow-none"
                        >
                            {hasSubmitted ? "Submitted" : "Submit"}
                        </button>
                    )}
                </div>
            </div>

            {/* Submit Content Modal */}
            <SubmitContentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                campaignTitle={campaign.title}
                onSubmitSuccess={handleSubmitSuccess}
            />
        </div>
    );
}
