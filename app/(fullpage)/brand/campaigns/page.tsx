"use client";

import React, { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import {
    PlusCircle, Home, BarChart3, Users, Wallet,
    HelpCircle, Folder, Play, Clock, XCircle, ChevronLeft, Pause, Hourglass
} from "lucide-react";
import { cn } from "@/lib/utils";

import Link from "next/link";
import { mockCampaigns } from "@/lib/data/campaigns";
import { mockSubmissions } from "@/lib/data/submissions";
import CampaignCard from "@/components/brand/campaigns/CampaignCard";

function DashboardContent() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<string>("All Campaigns");

    const handleCreateClick = () => {
        router.push("/brand/create-campaign");
    };

    const counts = {
        "All Campaigns": mockCampaigns.length,
        "Active": mockCampaigns.filter(c => c.status === "Active").length,
        "Drafts": mockCampaigns.filter(c => c.status === "Draft" || c.status === "Pending").length,
        "Ended": mockCampaigns.filter(c => c.status === "Ended").length,
        "Paused": mockCampaigns.filter(c => c.status === "Paused").length,
    };

    const tabs = [
        { id: "All Campaigns", label: "All Campaigns" },
        { id: "Active", label: "Active", icon: Play, iconColor: "text-emerald-500 fill-emerald-500" },
        { id: "Drafts", label: "Drafts", icon: Clock, iconColor: "text-yellow-500 fill-yellow-500" },
        { id: "Ended", label: "Ended", icon: Hourglass, iconColor: "text-slate-500 fill-slate-500" },
        { id: "Paused", label: "Paused", icon: Pause, iconColor: "text-amber-500 fill-amber-500" },
    ];

    const filteredCampaigns = activeTab === "All Campaigns"
        ? mockCampaigns
        : mockCampaigns.filter(c => {
            if (activeTab === "Drafts") return c.status === "Draft" || c.status === "Pending";
            return c.status === activeTab;
        });

    return (
        <div className="min-h-screen flex-col h-full bg-campaigns-page text-(--color-text-primary) overflow-y-auto w-full pb-32 lg:pb-0 flex">
            <div className="p-4 lg:p-8 pb-4 max-w-7xl mx-auto w-full">

                {/* Campaigns List Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl lg:text-2xl font-bold text-(--color-text-primary)">My Campaigns</h2>

                    <button
                        onClick={handleCreateClick}
                        className="btn-get-started border group flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm shadow-lg transition-all duration-200 hover:shadow-orange-900/20 active:scale-[0.94] whitespace-nowrap"
                    >
                        <PlusCircle className="w-4 h-4" />
                        <span className="hidden lg:inline">New Campaign</span>
                        <span className="lg:hidden">New</span>
                    </button>
                </div>

                {/* Status Sorter Tabs */}
                <div className="flex items-center gap-6 border-b border-(--color-border-subtle) mb-6 overflow-x-auto no-scrollbar pb-px">
                    {tabs.map(tab => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "flex items-center gap-2 pb-3 border-b-2 transition-colors whitespace-nowrap",
                                    isActive ? "border-(--progress-bar-newCampaign-active) text-(--color-text-primary)" : "border-transparent text-(--color-text-secondary) hover:text-(--color-text-primary)"
                                )}
                            >
                                {tab.icon && (
                                    <tab.icon className={cn("w-4 h-4", tab.iconColor, isActive ? "" : "opacity-70")} />
                                )}
                                <span className={cn(isActive ? "font-medium" : "font-normal")}>{tab.label}</span>
                                <span className={cn(
                                    "text-xs px-2 py-0.5 rounded-md font-medium",
                                    isActive ? "bg-(--color-brand-primary)/10 text-(--color-brand-primary) border border-(--color-brand-primary)/20" : "bg-(--color-bg-tertiary) text-(--color-text-secondary) border border-transparent"
                                )}>
                                    {counts[tab.id as keyof typeof counts]}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Campaign Cards Grid */}
                {filteredCampaigns.length > 0 ? (
                    <div className="flex flex-col gap-2 lg:gap-3">
                        {filteredCampaigns.map((campaign) => {
                            const pendingSubmissions = mockSubmissions.filter(s => s.actionStatus === "Pending");
                            const sortedPending = pendingSubmissions.sort((a, b) => new Date(a.dateSubmitted).getTime() - new Date(b.dateSubmitted).getTime());
                            const firstPending = sortedPending.length > 0 ? sortedPending[0] : undefined;
                            const href = firstPending
                                ? `/brand/campaigns/${campaign.id}/submissions/${firstPending.id}?tab=Pending`
                                : `/brand/campaigns/${campaign.id}/submissions`;
                            return (
                            <Link
                                href={href}
                                key={campaign.id}
                            >
                                <CampaignCard campaign={campaign} />
                            </Link>
                        )})}
                    </div>
                ) : (
                    <div className="bg-(--color-bg-card) border border-(--color-border-subtle) rounded-xl p-8 lg:p-12 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 bg-(--color-bg-tertiary) rounded-full flex items-center justify-center mb-4 border border-(--color-border)">
                            <Play className="w-8 h-8 text-(--color-text-muted) fill-current" />
                        </div>
                        <h3 className="text-lg font-medium text-(--color-text-primary) mb-2">No campaigns found</h3>
                        <p className="text-(--color-text-secondary) text-sm max-w-md mb-6">
                            You haven't created any campaigns yet. Create your first campaign to start rewarding your community.
                        </p>
                        <button
                            onClick={handleCreateClick}
                            className="btn-get-started border group flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm shadow-lg transition-all duration-200 hover:shadow-orange-900/20 active:scale-[0.94] whitespace-nowrap"
                        >
                            <PlusCircle className="w-4 h-4" />
                            Create New Campaign
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function CampaignsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DashboardContent />
        </Suspense>
    );
}