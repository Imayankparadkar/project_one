"use client";

import React, { useState, Suspense } from "react";
import { useParams } from "next/navigation";
import {
    FolderOpen, ChevronLeft, ChevronDown, CheckCircle2, Clock,
    Flag, XCircle, Search, Info
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { mockCampaigns } from "@/lib/data/campaigns";
import { mockSubmissions, SubmissionData, ActionStatus } from "@/lib/data/submissions";
import SubmissionsTable from "@/components/brand/campaigns/submissions/SubmissionsTable";

function SubmissionsContent() {
    const params = useParams();
    const campaignId = params.campaign as string;
    const campaign = mockCampaigns.find(c => c.id === campaignId);

    const [activeTab, setActiveTab] = useState<string>("Pending");
    const [submissions, setSubmissions] = useState<SubmissionData[]>(mockSubmissions);

    const handleAction = (id: string, newStatus: ActionStatus) => {
        setSubmissions(prev => prev.map(sub => sub.id === id ? { ...sub, actionStatus: newStatus } : sub));
    };

    if (!campaign) {
        return (
            <div className="flex flex-col items-center justify-center p-8 h-full text-(--color-text-primary)">
                <h2 className="text-2xl font-bold mb-4">Campaign Not Found</h2>
                <Link href="/brand/campaigns" className="text-orange-500 hover:text-orange-400 flex items-center gap-2">
                    <ChevronLeft className="w-5 h-5" /> Back to Campaigns
                </Link>
            </div>
        );
    }

    const counts = {
        "All Submissions": submissions.length,
        "Approved": submissions.filter(s => s.actionStatus === "Approved").length,
        "Pending": submissions.filter(s => s.actionStatus === "Pending").length,
        "Flagged": submissions.filter(s => s.actionStatus === "Flagged").length,
        "Rejected": submissions.filter(s => s.actionStatus === "Rejected").length,
    };

    const tabs = [
        { id: "All Submissions", label: "All Submissions" },
        { id: "Approved", label: "Approved", icon: CheckCircle2, iconColor: "text-white fill-emerald-500" },
        { id: "Pending", label: "Pending", icon: Clock, iconColor: "text-white fill-yellow-500" },
        { id: "Flagged", label: "Flagged", icon: Flag, iconColor: "text-white fill-orange-500" },
        { id: "Rejected", label: "Rejected", icon: XCircle, iconColor: "text-white fill-red-500" },
    ];

    return (
        <div className="flex-col h-full bg-campaigns-page text-(--color-text-primary) overflow-y-auto w-full pb-32 lg:pb-0">
            <div className="p-4 lg:p-8 pb-4 max-w-7xl mx-auto w-full">
                {/* Mobile back button: goes to sidebar */}
                <Link href={`/brand/campaigns/${campaignId}`} className="flex lg:hidden items-center gap-2 text-(--color-text-secondary) hover:text-(--color-text-primary) mb-6 transition-colors font-medium">
                    <ChevronLeft className="w-5 h-5" />
                    <span>Back to Menu</span>
                </Link>

                {/* Desktop back button: goes to campaigns list */}
                <Link href="/brand/campaigns" className="hidden lg:flex items-center gap-2 text-(--color-text-secondary) hover:text-(--color-text-primary) mb-6 transition-colors font-medium">
                    <ChevronLeft className="w-5 h-5" />
                    <span>Back to Campaigns</span>
                </Link>

                {/* Status Sorter Tabs */}
                <div className="flex items-center gap-6 border-b border-(--color-border-subtle) mb-8 overflow-x-auto no-scrollbar pb-px">
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

                <SubmissionsTable
                    activeTab={activeTab}
                    platforms={campaign.platforms}
                    campaignId={campaignId}
                    submissions={submissions}
                    onAction={handleAction}
                    campaign={campaign}
                />

            </div>
        </div>
    );
}

export default function SubmissionsPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-full text-(--color-text-primary)">Loading...</div>}>
            <SubmissionsContent />
        </Suspense>
    );
}
