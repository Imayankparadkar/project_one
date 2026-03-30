"use client";

import React from "react";
import { LayoutDashboard, Rocket, Megaphone } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { mockUsers } from "@/lib/data/users";

export default function BrandDashboardPage() {
    return (
        <div className="min-h-screen flex-col h-full bg-campaigns-page text-(--color-text-primary) overflow-y-auto w-full pb-32 lg:pb-0">
            <div className="p-4 lg:p-8 pb-4 max-w-7xl mx-auto w-full">
                
                {/* --- HEADER --- */}
                <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 mb-8 mt-4">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Welcome Back {mockUsers[0].name}!</h1>
                        <p className="text-(--color-text-secondary) font-medium tracking-wide">
                            Here's what's happening with your brand today.
                        </p>
                    </div>
                </div>

                {/* --- WELCOME BANNER --- */}
                <div className="bg-(--color-bg-card) border border-(--color-border) rounded-2xl p-8 mb-8 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-yellow-radial opacity-50 pointer-events-none" />
                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-orange-500/10 rounded-lg">
                                    <Megaphone className="w-6 h-6 text-orange-500" />
                                </div>
                                <h2 className="text-2xl font-bold text-(--color-text-primary)">Ready to grow your reach?</h2>
                            </div>
                            <p className="text-(--color-text-secondary) max-w-xl mb-6">
                                Create new bounty campaigns to incentivize creators to share your message across the globe, or manage your active campaigns to track your performance.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link 
                                    href="/brand/create-campaign"
                                    className="btn-get-started flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm shadow-lg transition-all duration-200 active:scale-[0.96]"
                                >
                                    <Rocket className="w-5 h-5" />
                                    Launch New Campaign
                                </Link>
                                <Link 
                                    href="/brand/campaigns"
                                    className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm bg-(--color-surface-elevated) hover:bg-(--color-surface-active) text-(--color-text-primary) transition-all duration-200"
                                >
                                    <LayoutDashboard className="w-5 h-5" />
                                    Manage Campaigns
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- QUICK STATS PLACEHOLDERS --- */}
                <h3 className="text-lg font-bold text-(--color-text-primary) mb-4">Quick Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {[
                        { title: "Active Campaigns", value: "2", label: "Running smoothly" },
                        { title: "Total Reach", value: "1.4M", label: "Across all platforms" },
                        { title: "Total Spent", value: "$4,250", label: "This month" }
                    ].map((stat, i) => (
                        <div key={i} className="bg-(--color-bg-card) border border-(--color-border-subtle) rounded-xl p-6 hover:shadow-md hover:border-(--color-border) transition-all cursor-default">
                            <h4 className="text-sm font-medium text-(--color-text-secondary) mb-2">{stat.title}</h4>
                            <p className="text-3xl font-bold text-(--color-text-primary) mb-1">{stat.value}</p>
                            <p className="text-xs text-green-500 font-medium">{stat.label}</p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}