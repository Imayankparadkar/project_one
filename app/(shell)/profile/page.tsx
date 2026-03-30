"use client";

import React, { useState } from "react";
import {
    MapPin,
    Calendar,
    MoreHorizontal,
    Rocket
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("created");

    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="max-w-4xl mx-auto py-6 md:py-10 px-4 md:px-6">
                {/* Banner & Header */}
                <div className="relative mb-16 md:mb-20">
                    <div className="w-full h-32 md:h-48 bg-zinc-900 rounded-2xl relative">
                        <div className="absolute top-4 right-4">
                            <button className="p-2 bg-black/40 hover:bg-black/60 rounded-full transition-colors backdrop-blur-md">
                                <MoreHorizontal size={20} className="text-text-primary/70" />
                            </button>
                        </div>
                    </div>

                    <div className="absolute -bottom-12 md:-bottom-16 left-4 md:left-8 flex items-end gap-6">
                        <div className="relative">
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-background overflow-hidden bg-zinc-800 flex items-center justify-center shadow-xl">
                                <Image
                                    src="https://raw.githubusercontent.com/shivag04/assets/main/avatar.png"
                                    alt="Avatar"
                                    width={96}
                                    height={96}
                                    className="w-20 h-20 md:w-24 md:h-24"
                                    priority
                                />
                            </div>
                            <div className="absolute bottom-1 right-1 md:bottom-2 md:right-2 w-4 h-4 md:w-5 md:h-5 bg-green-500 border-2 md:border-4 border-background rounded-full"></div>
                        </div>
                    </div>
                </div>

                {/* User Info */}
                <div className="px-2 md:px-8 space-y-4">
                    <div className="space-y-1">
                        <h1 className="text-2xl md:text-3xl font-bold">shiv</h1>
                        <p className="text-sm md:text-base text-muted-foreground">@shivag04</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                            <MapPin size={14} className="md:w-4 md:h-4" />
                            <span>Nashik, IN</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Calendar size={14} className="md:w-4 md:h-4" />
                            <span>Joined Feb 2026</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 text-sm font-semibold">
                        <div className="flex gap-1.5 cursor-pointer hover:underline decoration-muted-foreground/50">
                            <span className="text-foreground font-bold">0</span>
                            <span className="text-muted-foreground">Followers</span>
                        </div>
                        <div className="flex gap-1.5 cursor-pointer hover:underline decoration-muted-foreground/50">
                            <span className="text-foreground font-bold">0</span>
                            <span className="text-muted-foreground">Following</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 pt-4">
                        <Link
                            href="/settings"
                            className="flex-1 sm:flex-none text-center px-6 md:px-8 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-foreground rounded-xl text-sm font-bold transition-all"
                        >
                            Edit profile
                        </Link>
                        <button className="flex-1 sm:flex-none px-6 md:px-8 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-foreground rounded-xl text-sm font-bold transition-all">
                            Manage orders
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mt-8 md:mt-12 px-2 md:px-8">
                    <div className="flex gap-6 md:gap-8 border-b border-border text-sm overflow-x-auto no-scrollbar">
                        {['Created', 'Joined', 'Reviews'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab.toLowerCase())}
                                className={`pb-4 px-1 font-bold transition-all relative whitespace-nowrap ${activeTab === tab.toLowerCase() ? "text-foreground" : "text-muted-foreground hover:text-foreground/80"
                                    }`}
                            >
                                {tab}
                                {activeTab === tab.toLowerCase() && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="py-16 md:py-24 flex flex-col items-center justify-center space-y-4">
                        <div className="p-4 bg-zinc-800/50 rounded-2xl flex items-center justify-center mb-2">
                            <Rocket size={24} className="md:w-7 md:h-7 text-muted-foreground/50" />
                        </div>
                        <div className="text-center space-y-1">
                            <h3 className="font-bold text-lg">No businesses created</h3>
                            <div className="pt-4">
                                <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-text-primary rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-500/20">
                                    Create a business
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
