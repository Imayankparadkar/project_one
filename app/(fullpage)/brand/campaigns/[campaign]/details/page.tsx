"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, Instagram, Youtube, Edit2 } from "lucide-react";
import { mockCampaigns } from "@/lib/data/campaigns";
import Link from "next/link";
import EditCampaignModal from "@/components/brand/campaigns/EditCampaignModal";
import { CampaignFormData } from "@/components/brand/create-campaign/types";

export default function CampaignAnalyticsPage() {
    const params = useParams();
    const router = useRouter();
    const campaignId = params.campaign as string;

    const initialCampaign = mockCampaigns.find(c => c.id === campaignId);
    const [campaign, setCampaign] = useState(initialCampaign);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    if (!campaign) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-[var(--color-text-primary)]">
                <h2 className="text-2xl font-bold mb-4">Campaign Not Found</h2>
                <button
                    onClick={() => router.back()}
                    className="text-orange-500 hover:text-orange-400 flex items-center gap-2"
                >
                    <ChevronLeft className="w-5 h-5" /> Back to Campaigns
                </button>
            </div>
        );
    }

    const formatCurrency = (amount: number | string) => {
        const num = typeof amount === "string" ? parseFloat(amount) : amount;
        if (isNaN(num)) return "₹0.00";
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(num);
    };

    const getHostDomain = (url: string) => {
        try {
            return new URL(url).hostname.replace("www.", "");
        } catch {
            return url;
        }
    };

    const progressPercentage = campaign.budget > 0 ? Math.min(100, (campaign.paidOut / campaign.budget) * 100) : 0;

    const renderPlatformCard = (platform: "Instagram" | "Youtube", globalRewards: any, perPlatformData: any) => {
        const data = campaign.usePerPlatformRewards ? perPlatformData : globalRewards;
        if (!data) return null;

        const cpm = (parseFloat(data.rewardPerView || "0") * 1000).toString();

        return (
            <div key={platform} className="p-6 rounded-2xl bg-[var(--color-bg-tertiary)] border border-[var(--color-border-card)] flex flex-col gap-6">
                <div className="flex items-center gap-2">
                    {platform === "Instagram" ? (
                        <Instagram className="w-5 h-5 text-pink-500" />
                    ) : (
                        <Youtube className="w-5 h-5 text-red-500" />
                    )}
                    <span className="font-bold text-[var(--color-text-primary)]">{platform}</span>
                </div>

                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                    <div className="flex flex-col gap-1.5">
                        <span className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">CPM</span>
                        <div className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-md w-fit">
                            ₹{cpm}
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <span className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">MAX SUBMISSION PER ACC</span>
                        <span className="text-sm font-bold text-[var(--color-text-primary)]">{data.submissionLimit || "N/A"}</span>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <span className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">MIN PAYOUT (POST)</span>
                        <span className="text-sm font-bold text-[var(--color-text-primary)]">{formatCurrency(data.minPayout)}</span>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <span className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">MAX PAYOUT (POST)</span>
                        <span className="text-sm font-bold text-[var(--color-text-primary)]">{formatCurrency(data.maxPayout)}</span>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <span className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">MAX (CREATOR)</span>
                        <span className="text-sm font-bold text-[var(--color-text-primary)]">{formatCurrency(data.maxPayoutPerCreator || data.maxPayout)}</span>
                    </div>
                </div>
            </div>
        );
    };

    const handleSaveEdit = (updatedData: CampaignFormData) => {
        setCampaign(prev => {
            if (!prev) return prev;
            return {
                ...prev,
                ...updatedData,
                budget: parseFloat(updatedData.budget) || prev.budget,
                endDate: updatedData.hasEndDate ? updatedData.campaignEndDate : prev.endDate,
                type: updatedData.type as any,
                category: updatedData.category as any,
                platforms: updatedData.platforms as ("Instagram" | "Youtube")[],
                applicationQuestions: updatedData.applicationQuestions as any[],
                perPlatformRewards: updatedData.perPlatformRewards as any,
            };
        });
        setIsEditModalOpen(false);
    };

    return (
        <div className="flex-col h-full bg-campaigns-page text-[var(--color-text-primary)] overflow-y-auto w-full pb-32 lg:pb-0 relative">
            {campaign && (
                <EditCampaignModal 
                    isOpen={isEditModalOpen} 
                    onClose={() => setIsEditModalOpen(false)} 
                    campaign={campaign} 
                    onSave={handleSaveEdit} 
                />
            )}
            <div className="p-4 lg:p-8 pb-4 max-w-5xl mx-auto w-full">
                {/* Mobile back button */}
                <Link href={`/brand/campaigns/${campaignId}`} className="flex lg:hidden items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] mb-6 transition-colors font-medium">
                    <ChevronLeft className="w-5 h-5" />
                    <span>Back to Menu</span>
                </Link>

                {/* Desktop back button */}
                <Link href="/brand/campaigns" className="hidden lg:flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] mb-6 transition-colors font-medium">
                    <ChevronLeft className="w-5 h-5" />
                    <span>Back to Campaigns</span>
                </Link>

                {/* Campaign Header */}
                <div className="flex flex-col md:flex-row justify-between items-start mb-8 mt-2 gap-4">
                    <div className="flex flex-col">
                        <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-3">{campaign.name}</h1>
                        <p className="text-[var(--color-text-secondary)] max-w-3xl leading-relaxed text-sm">
                            {campaign.description}
                        </p>
                    </div>
                    
                    <button 
                        onClick={() => setIsEditModalOpen(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border-card)] rounded-lg text-sm font-medium text-[var(--color-text-primary)] transition-all shrink-0 active:scale-95"
                    >
                        <Edit2 className="w-4 h-4" />
                        Edit Campaign
                    </button>
                </div>

                {/* Paid Out Progress */}
                <div className="mb-10 flex flex-col gap-3">
                    <div className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">PAID OUT</div>
                    <div className="flex justify-between items-end mb-1">
                        <div className="text-sm font-medium text-[var(--color-text-secondary)]">
                            <span className="font-bold text-[var(--color-text-primary)]">{formatCurrency(campaign.paidOut)}</span> of {formatCurrency(campaign.budget)} paid out
                        </div>
                        <div className="text-sm font-bold text-[var(--color-text-primary)]">
                            {Math.round(progressPercentage)}%
                        </div>
                    </div>
                    <div className="h-2.5 w-full bg-[var(--color-bg-tertiary)] rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-orange-500 rounded-full"
                            style={{ width: `${progressPercentage}%` }}
                        />
                    </div>
                </div>

                {/* Type and Category Tags */}
                <div className="flex flex-col gap-3 mb-10">
                    <div className="flex gap-12">
                        <div className="flex flex-col gap-2">
                            <span className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">TYPE</span>
                            <div className="bg-[var(--color-bg-tertiary)] px-3 py-1.5 rounded-lg text-xs font-medium text-[var(--color-text-primary)] w-fit">
                                {campaign.type}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">CATEGORY</span>
                            <div className="bg-[var(--color-bg-tertiary)] px-3 py-1.5 rounded-lg text-xs font-medium text-[var(--color-text-primary)] w-fit">
                                {campaign.category}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payout Cards */}
                <div className="mb-12">
                    <div className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-4">PAYOUT</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {campaign.platforms.map((p) => {
                            const globalData = {
                                rewardPerView: campaign.rewardPerView,
                                minPayout: campaign.minPayout,
                                maxPayout: campaign.maxPayout,
                                submissionLimit: campaign.submissionLimit,
                                maxPayoutPerCreator: campaign.maxPayoutPerCreator
                            };
                            const perPlatformData = campaign.perPlatformRewards?.[p as "Instagram" | "Youtube"];
                            return renderPlatformCard(p as "Instagram" | "Youtube", globalData, perPlatformData);
                        })}
                    </div>
                </div>

                {/* Requirements */}
                {campaign.requirements && campaign.requirements.length > 0 && (
                    <div className="mb-12">
                        <div className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-4">REQUIREMENTS</div>
                        <div className="flex flex-col gap-3">
                            {campaign.requirements.map((req, idx) => (
                                <div key={idx} className="bg-[var(--color-bg-tertiary)] border border-[var(--color-border-card)] rounded-xl p-4 flex gap-4 items-start">
                                    <span className="font-bold text-[var(--color-text-primary)] shrink-0">{idx + 1}.</span>
                                    <span className="text-sm font-medium text-[var(--color-text-primary)] pt-0.5">{req}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Assets */}
                {campaign.contentLinks && campaign.contentLinks.length > 0 && (
                    <div className="mb-12">
                        <div className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-4">ASSETS</div>
                        <div className="flex flex-col gap-3">
                            {campaign.contentLinks.map((link, idx) => {
                                const domain = getHostDomain(link);
                                const isGoogleDrive = domain.includes("drive.google.com");
                                return (
                                    <a 
                                        key={idx} 
                                        href={link} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="bg-[var(--color-bg-tertiary)] border border-[var(--color-border-card)] rounded-xl p-4 flex items-center gap-4 hover:border-white/20 transition-colors group"
                                    >
                                        <div className="bg-white p-2 rounded-lg shrink-0">
                                            {isGoogleDrive ? (
                                                <svg className="w-6 h-6" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M14.075 27.5L6.675 14.65L13.15 3.40002H27.95L34.425 14.65L27.025 27.5H14.075ZM15.9 24.325H25.2L30.775 14.65L25.2 4.97502H15.9L10.325 14.65L15.9 24.325Z" fill="#34A853"/>
                                                    <path d="M19.675 36.6L12.3 23.8L18.775 12.55L26.15 25.35L19.675 36.6Z" fill="#FBBC05"/>
                                                    <path d="M33.725 36.6H18.925L12.45 25.35H27.25L33.725 36.6Z" fill="#4285F4"/>
                                                </svg>
                                            ) : (
                                                <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center text-blue-600 font-bold text-xs">🔗</div>
                                            )}
                                        </div>
                                        <div className="flex flex-col overflow-hidden">
                                            <span className="text-sm font-bold text-blue-500 group-hover:underline">{domain}</span>
                                            <span className="text-xs font-medium text-[var(--color-text-muted)] truncate">{link}</span>
                                        </div>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
