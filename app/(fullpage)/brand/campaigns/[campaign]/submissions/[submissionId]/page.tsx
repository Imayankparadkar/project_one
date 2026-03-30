"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
    ChevronLeft, ChevronRight, CheckCircle2, XCircle, Flag, VolumeX, ShieldCheck
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { mockCampaigns } from "@/lib/data/campaigns";
import { mockSubmissions, SubmissionData, ActionStatus } from "@/lib/data/submissions";
import { cn } from "@/lib/utils";

const mockTimeSeriesData = Array.from({ length: 7 }).map((_, i) => {
    const rand = ((i * 13) % 10) / 10;
    return {
        day: `Day ${i + 1}`,
        views: Math.floor(10000 + (rand * 20000 + 10000 * i)),
        likes: Math.floor(500 + (rand * 1000 + 500 * i)),
        comments: Math.floor(10 + (rand * 50 + 20 * i)),
        shares: Math.floor(5 + (rand * 20 + 10 * i)),
    };
});

function SubmissionDetailsCard({ submission, handleAction }: { submission: SubmissionData, handleAction: (status: ActionStatus) => void }) {
    const isPending = submission.actionStatus === "Pending";
    const isApproved = submission.actionStatus === "Approved";
    const isRejected = submission.actionStatus === "Rejected";
    const isFlagged = submission.actionStatus === "Flagged";

    const getPlatformLinkText = (url: string) => {
        const lower = url.toLowerCase();
        if (lower.includes("youtube.com") || lower.includes("youtu.be")) return "Watch short";
        if (lower.includes("instagram.com")) return "Watch reel";
        return "Watch video";
    };

    return (
        <div className="bg-(--color-bg-primary) border border-(--color-border) rounded-2xl overflow-hidden shadow-sm flex flex-col pointer-events-auto flex-1 lg:h-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 border-b border-(--color-border) gap-4 bg-(--color-bg-secondary) shrink-0">
                <div className="flex flex-col">
                    <h1 className="text-xl font-bold text-(--color-text-primary) flex items-center gap-3">
                        {submission.creator.name}
                        <span className="text-sm font-medium text-(--color-text-secondary) bg-(--color-bg-tertiary) px-2 py-0.5 rounded-full">
                            {submission.niche}
                        </span>
                    </h1>
                    <p className="text-sm text-(--color-text-secondary) mt-1">
                        ₹{submission.creator.price.toLocaleString()} / 1k views • {submission.creator.followers.toLocaleString()} Followers
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                    <button
                        onClick={() => isPending && handleAction("Flagged")}
                        disabled={!isPending}
                        className={cn(
                            "flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors border flex-1 sm:flex-none justify-center",
                            isPending ? "bg-(--color-bg-tertiary) hover:bg-orange-500/10 text-(--color-text-secondary) hover:text-orange-600 border-(--color-border)" :
                                isFlagged ? "bg-orange-500/10 text-orange-600 border-orange-500/20 cursor-not-allowed" :
                                    "bg-(--color-bg-tertiary) text-(--color-text-muted) border-transparent opacity-50 cursor-not-allowed hidden sm:flex"
                        )}
                    >
                        <Flag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        {isFlagged ? "Flagged" : "Flag"}
                    </button>

                    <button
                        onClick={() => isPending && handleAction("Approved")}
                        disabled={!isPending}
                        className={cn(
                            "flex items-center gap-1 sm:gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors border shadow-sm flex-1 sm:flex-none justify-center",
                            isPending ? "bg-emerald-500/10 hover:bg-emerald-500 hover:text-white text-emerald-600 border-emerald-500/20" :
                                isApproved ? "bg-emerald-500 text-white border-emerald-600 shadow-emerald-500/20 cursor-not-allowed" :
                                    "bg-(--color-bg-tertiary) text-(--color-text-muted) border-transparent opacity-50 cursor-not-allowed hidden sm:flex"
                        )}
                    >
                        <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        {isApproved ? "Approved" : "Approve"}
                    </button>

                    <button
                        onClick={() => isPending && handleAction("Rejected")}
                        disabled={!isPending}
                        className={cn(
                            "flex items-center gap-1 sm:gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors border shadow-sm flex-1 sm:flex-none justify-center",
                            isPending ? "bg-red-500/10 hover:bg-red-500 hover:text-white text-red-600 border-red-500/20" :
                                isRejected ? "bg-red-500/10 text-red-600 border-red-500/20 cursor-not-allowed" :
                                    "bg-(--color-bg-tertiary) text-(--color-text-muted) border-transparent opacity-50 cursor-not-allowed hidden sm:flex"
                        )}
                    >
                        <XCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        {isRejected ? "Rejected" : "Reject"}
                    </button>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] divide-y lg:divide-y-0 lg:divide-x divide-(--color-border) lg:min-h-0">
                {/* Left side */}
                <div className="p-4 sm:p-5 flex flex-col gap-3 bg-(--color-bg-primary) lg:overflow-y-auto lg:min-h-0">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <h3 className="text-base font-bold text-(--color-text-primary) flex items-center gap-1.5">
                                {submission.platform === "Instagram" ? (
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-pink-500 shrink-0">
                                        <path d="M12 2.16C15.2 2.16 15.58 2.17 16.85 2.23C18.12 2.29 18.81 2.5 19.27 2.68C19.88 2.92 20.31 3.22 20.77 3.68C21.23 4.14 21.53 4.58 21.76 5.18C21.94 5.64 22.15 6.33 22.21 7.6C22.27 8.87 22.28 9.25 22.28 12.45C22.28 15.65 22.27 16.03 22.21 17.3C22.15 18.57 21.94 19.26 21.76 19.72C21.53 20.32 21.23 20.76 20.77 21.22C20.31 21.68 19.88 21.98 19.27 22.22C18.81 22.4 18.12 22.61 16.85 22.67C15.58 22.73 15.2 22.74 12 22.74C8.8 22.74 8.42 22.73 7.15 22.67C5.88 22.61 5.19 22.4 4.73 22.22C4.12 21.98 3.69 21.68 3.23 21.22C2.77 20.76 2.47 20.32 2.24 19.72C2.06 19.26 1.85 18.57 1.79 17.3C1.73 16.03 1.72 15.65 1.72 12.45C1.72 9.25 1.73 8.87 1.79 7.6C1.85 6.33 2.06 5.64 2.24 5.18C2.47 4.58 2.77 4.14 3.23 3.68C3.69 3.22 4.12 2.92 4.73 2.68C5.19 2.5 5.88 2.29 7.15 2.23C8.42 2.17 8.8 2.16 12 2.16ZM12 0C8.74 0 8.33 0.01 7.05 0.07C5.77 0.13 4.9 0.33 4.14 0.63C3.36 0.93 2.69 1.34 2.03 2.03C1.36 2.69 0.94 3.36 0.64 4.14C0.34 4.9 0.14 5.77 0.08 7.05C0.01 8.33 0 8.74 0 12C0 15.26 0.01 15.67 0.08 16.95C0.14 18.23 0.34 19.1 0.64 19.86C0.94 20.64 1.36 21.31 2.03 21.97C2.69 22.64 3.36 23.06 4.14 23.36C4.9 23.66 5.77 23.86 7.05 23.93C8.33 23.99 8.74 24 12 24C15.26 24 15.67 23.99 16.95 23.93C18.23 23.86 19.1 23.66 19.86 23.36C20.64 23.06 21.31 22.64 21.97 21.97C22.64 21.31 23.06 20.64 23.36 19.86C23.66 19.1 23.86 18.23 23.92 16.95C23.99 15.67 24 15.26 24 12C24 8.74 23.99 8.33 23.92 7.05C23.86 5.77 23.66 4.9 23.36 4.14C23.06 3.36 22.64 2.69 21.97 2.03C21.31 1.34 20.64 0.93 19.86 0.63C19.1 0.33 18.23 0.13 16.95 0.07C15.67 0.01 15.26 0 12 0ZM12 5.84C8.6 5.84 5.84 8.6 5.84 12C5.84 15.4 8.6 18.16 12 18.16C15.4 18.16 18.16 15.4 18.16 12C18.16 8.6 15.4 5.84 12 5.84ZM12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16ZM18.41 4.15C17.62 4.15 16.97 4.79 16.97 5.59C16.97 6.38 17.62 7.03 18.41 7.03C19.2 7.03 19.84 6.38 19.84 5.59C19.84 4.79 19.2 4.15 18.41 4.15Z" fill="currentColor" />
                                    </svg>
                                ) : (
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-red-600 shrink-0">
                                        <path d="M21.58 6.55C21.33 5.58 20.58 4.8 19.64 4.54C17.91 4.08 12 4.08 12 4.08C12 4.08 6.09 4.08 4.36 4.54C3.42 4.8 2.67 5.58 2.42 6.55C1.96 8.37 1.96 12 1.96 12C1.96 12 1.96 15.63 2.42 17.45C2.67 18.42 3.42 19.2 4.36 19.46C6.09 19.92 12 19.92 12 19.92C12 19.92 17.91 19.92 19.64 19.46C20.58 19.2 21.33 18.42 21.58 17.45C22.04 15.63 22.04 12 22.04 12C22.04 12 22.04 8.37 21.58 6.55ZM9.96 15.33V8.67L15.68 12L9.96 15.33Z" fill="currentColor" />
                                    </svg>
                                )}
                                {submission.creator.handle}
                            </h3>
                            <p className="text-sm text-(--color-text-secondary) flex items-center gap-2 mt-0.5">
                                6 days ago by <Image suppressHydrationWarning src={submission.creator.image} alt="Agency" width={16} height={16} className="rounded-full" /> {submission.creator.name}
                            </p>
                        </div>
                        <div className={cn(
                            "px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1.5",
                            isPending ? "bg-yellow-500/10 text-yellow-600 border-yellow-500/20" :
                                isApproved ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" :
                                    isRejected ? "bg-red-500/10 text-red-600 border-red-500/20" :
                                        "bg-orange-500/10 text-orange-600 border-orange-500/20"
                        )}>
                            {isPending ? "Pending" : isApproved ? "Approved" : isRejected ? "Rejected" : "Flagged"}
                        </div>
                    </div>

                    <div className="flex items-center justify-between bg-(--color-bg-secondary) p-3 rounded-xl border border-(--color-border-subtle)">
                        <div className="flex flex-col">
                            <span className="text-xs text-(--color-text-secondary) font-medium">Est. payout</span>
                            <span className="text-lg font-bold text-emerald-500">₹{submission.creator.price.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-center w-10 h-10 bg-orange-500/10 rounded-xl border border-orange-500/20 text-orange-500 font-bold">
                            <ShieldCheck className="w-5 h-5 absolute opacity-10" />
                            {submission.aiScore}
                        </div>
                    </div>

                    <div className="flex-1 min-h-[300px] lg:min-h-0 bg-[#0A0A0A] rounded-xl border border-(--color-border) flex items-center justify-center relative overflow-hidden group">
                        <div className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-black/40 rounded-full text-white/70 hover:text-white hover:bg-black/60 transition-colors cursor-pointer backdrop-blur-sm">
                            <VolumeX className="w-4 h-4" />
                        </div>

                        <div className="flex flex-col items-center justify-center gap-2 z-10">
                            <Link
                                href={submission.link}
                                target="_blank"
                                className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white font-medium text-sm backdrop-blur-md transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2"
                            >
                                {getPlatformLinkText(submission.link)}
                            </Link>
                        </div>

                        <div className="absolute w-[280px] h-[580px] border border-white/5 rounded-[40px] pointer-events-none scale-90 sm:scale-100 opacity-50 bg-linear-to-b from-white/5 to-transparent shadow-2xl" />
                    </div>
                </div>

                {/* Right side */}
                <div className="p-4 sm:p-5 flex flex-col bg-(--color-bg-secondary)/30 lg:overflow-y-auto lg:min-h-0">
                    <div className="grid grid-cols-4 mb-4 sm:mb-6 shrink-0">
                        <div className="flex flex-col items-center p-3 border-b-2 bg-(--color-bg-primary) border-[#E879F9]">
                            <span className="text-xs font-medium text-(--color-text-secondary) mb-1">Views</span>
                            <span className="text-lg sm:text-lg font-bold text-(--color-text-primary)">
                                {submission.impressions.toLocaleString()}
                            </span>
                        </div>
                        <div className="flex flex-col items-center p-3 border-b-2 bg-(--color-bg-primary) border-[#818CF8]">
                            <span className="text-xs font-medium text-(--color-text-secondary) mb-1">Likes</span>
                            <span className="text-lg sm:text-lg font-bold text-(--color-text-primary)">
                                {mockTimeSeriesData[6].likes.toLocaleString()}
                            </span>
                        </div>
                        <div className="flex flex-col items-center p-3 border-b-2 bg-(--color-bg-primary) border-[#22D3EE]">
                            <span className="text-xs font-medium text-(--color-text-secondary) mb-1">Comments</span>
                            <span className="text-lg sm:text-lg font-bold text-(--color-text-primary)">
                                {mockTimeSeriesData[6].comments.toLocaleString()}
                            </span>
                        </div>
                        <div className="flex flex-col items-center p-3 border-b-2 bg-(--color-bg-primary) border-[#FB923C]">
                            <span className="text-xs font-medium text-(--color-text-secondary) mb-1">Shares</span>
                            <span className="text-lg sm:text-lg font-bold text-(--color-text-primary)">
                                {mockTimeSeriesData[6].shares.toLocaleString()}
                            </span>
                        </div>
                    </div>

                    <div className="flex-1 w-full min-h-[70vh] lg:min-h-[52vh] border border-(--color-border) bg-(--color-bg-primary) rounded-xl p-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={mockTimeSeriesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#E879F9" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#E879F9" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorLikes" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#818CF8" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#818CF8" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border-subtle)" />
                                <XAxis
                                    dataKey="day"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }}
                                    dx={-10}
                                    tickFormatter={(val: any) => val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'var(--color-bg-primary)',
                                        border: '1px solid var(--color-border)',
                                        borderRadius: '0.75rem',
                                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                                    }}
                                    itemStyle={{ fontSize: '12px', fontWeight: 500 }}
                                    labelStyle={{ color: 'var(--color-text-secondary)', marginBottom: '8px', fontSize: '12px' }}
                                />
                                <Area type="monotone" dataKey="views" name="Views" stroke="#E879F9" strokeWidth={2} fillOpacity={1} fill="url(#colorViews)" />
                                <Area type="monotone" dataKey="likes" name="Likes" stroke="#818CF8" strokeWidth={2} fillOpacity={1} fill="url(#colorLikes)" />
                                <Area type="monotone" dataKey="comments" name="Comments" stroke="#22D3EE" strokeWidth={2} fillOpacity={0} fill="none" />
                                <Area type="monotone" dataKey="shares" name="Shares" stroke="#FB923C" strokeWidth={2} fillOpacity={0} fill="none" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SubmissionDetailsContent() {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();
    const campaignId = params.campaign as string;
    const initialSubmissionId = params.submissionId as string;

    const activeTab = searchParams.get("tab") || "All Submissions";
    const sortField = searchParams.get("sort") || "dateSubmitted";
    const sortDirection = searchParams.get("dir") || "desc";
    const activePlatform = searchParams.get("platform") || "All Platforms";
    const [localSubmissions, setLocalSubmissions] = useState<SubmissionData[]>(mockSubmissions);

    const filteredSubmissions = useMemo(() => {
        let data = [...localSubmissions];
        if (activeTab === "Approved") data = data.filter(s => s.actionStatus === "Approved");
        else if (activeTab === "Pending") data = data.filter(s => s.actionStatus === "Pending");
        else if (activeTab === "Flagged") data = data.filter(s => s.actionStatus === "Flagged");
        else if (activeTab === "Rejected") data = data.filter(s => s.actionStatus === "Rejected");

        if (activePlatform !== "All Platforms") {
            data = data.filter(s => s.platform.toLowerCase() === activePlatform.toLowerCase());
        }

        data.sort((a, b) => {
            let valA: any = "";
            let valB: any = "";
            switch (sortField) {
                case "followers": valA = a.creator.followers; valB = b.creator.followers; break;
                case "impressions": valA = a.impressions; valB = b.impressions; break;
                case "price": valA = a.creator.price; valB = b.creator.price; break;
                case "er": valA = a.er; valB = b.er; break;
                case "dateSubmitted": valA = new Date(a.dateSubmitted).getTime(); valB = new Date(b.dateSubmitted).getTime(); break;
                case "aiScore": valA = a.aiScore; valB = b.aiScore; break;
                default: valA = new Date(a.dateSubmitted).getTime(); valB = new Date(b.dateSubmitted).getTime();
            }
            if (valA < valB) return sortDirection === "asc" ? -1 : 1;
            if (valA > valB) return sortDirection === "asc" ? 1 : -1;
            return 0;
        });

        return data;
    }, [activeTab, localSubmissions, sortField, sortDirection, activePlatform]);

    const initialIndex = filteredSubmissions.findIndex(s => s.id === initialSubmissionId);
    const safeInitialIndex = initialIndex >= 0 ? initialIndex : 0;

    const [currentIndex, setCurrentIndex] = useState(safeInitialIndex);
    const [direction, setDirection] = useState(0);

    // Force local state to sync with URL on mount or URL change. Overcomes Next.js shallow routing caches.
    useEffect(() => {
        const idFromUrl = initialSubmissionId;
        const newIndex = filteredSubmissions.findIndex(s => s.id === idFromUrl);
        if (newIndex >= 0) {
            setCurrentIndex(newIndex);
        }
    }, [initialSubmissionId, filteredSubmissions]);

    // Use absolute strict lookup for current submission
    const currentSubmission = filteredSubmissions[currentIndex] || localSubmissions.find(s => s.id === initialSubmissionId);
    const campaign = mockCampaigns.find(c => c.id === campaignId);

    const navigateTo = (offset: number) => {
        const newIndex = currentIndex + offset;
        if (newIndex >= 0 && newIndex < filteredSubmissions.length) {
            setDirection(offset > 0 ? 1 : -1);
            setCurrentIndex(newIndex);
            const nextSub = filteredSubmissions[newIndex];
            router.replace(`/brand/campaigns/${campaignId}/submissions/${nextSub.id}?tab=${encodeURIComponent(activeTab)}&sort=${sortField}&dir=${sortDirection}&platform=${encodeURIComponent(activePlatform)}`, { scroll: false });
        }
    };

    const handleNext = () => navigateTo(1);
    const handlePrev = () => navigateTo(-1);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") handleNext();
            if (e.key === "ArrowLeft") handlePrev();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [currentIndex, filteredSubmissions.length]);

    const handleAction = (newStatus: ActionStatus) => {
        if (!currentSubmission) return;

        // Persist local state across Next.js router navigations (mock data only)
        const persistingItem = mockSubmissions.find(s => s.id === currentSubmission.id);
        if (persistingItem) {
            persistingItem.actionStatus = newStatus;
        }

        setLocalSubmissions(prev => prev.map(s => s.id === currentSubmission.id ? { ...s, actionStatus: newStatus } : s));

        const willDropOut = activeTab !== "All Submissions" && activeTab !== newStatus;

        if (willDropOut) {
            const currentListIndex = filteredSubmissions.findIndex(s => s.id === currentSubmission.id);

            // Redirect back to main submissions table if the active list is now empty
            if (filteredSubmissions.length <= 1) {
                router.push(`/brand/campaigns/${campaignId}/submissions`);
                return;
            }

            let nextTargetIndex: number;
            // Determine visual swipe direction and next item based on current position
            if (currentListIndex === filteredSubmissions.length - 1) {
                nextTargetIndex = currentListIndex - 1;
                setDirection(-1);
            } else {
                nextTargetIndex = currentListIndex + 1;
                setDirection(1);
            }

            const nextSubId = filteredSubmissions[nextTargetIndex].id;

            // Adjust the component tracking index to match the new shorter array bounds
            setCurrentIndex(nextTargetIndex > currentListIndex ? nextTargetIndex - 1 : nextTargetIndex);

            router.replace(`/brand/campaigns/${campaignId}/submissions/${nextSubId}?tab=${encodeURIComponent(activeTab)}&sort=${sortField}&dir=${sortDirection}&platform=${encodeURIComponent(activePlatform)}`, { scroll: false });
        }
    };

    if (!campaign || !currentSubmission) {
        return (
            <div className="flex flex-col items-center justify-center p-8 h-full text-(--color-text-primary)">
                <h2 className="text-2xl font-bold mb-4">Submission Not Found</h2>
                <Link href={`/brand/campaigns/${campaignId}/submissions`} className="text-orange-500 hover:text-orange-400 flex items-center gap-2">
                    <ChevronLeft className="w-5 h-5" /> Back to Submissions
                </Link>
            </div>
        );
    }

    const WINDOW_SIZE = 1;

    const variants = {
        enter: (dir: number) => ({
            x: dir > 0 ? '100%' : '-100%',
            opacity: 0,
            scale: 0.95,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (dir: number) => ({
            zIndex: 0,
            x: dir < 0 ? '100%' : '-100%',
            opacity: 0,
            scale: 0.95,
        })
    };

    return (
        <div className="flex flex-col h-full overflow-y-auto bg-campaigns-page text-(--color-text-primary) w-full relative">
            <div className="p-4 lg:p-8 pb-4 lg:pb-3 max-w-7xl mx-auto w-full">
                <Link href={`/brand/campaigns/${campaignId}/submissions`} className="flex items-center gap-2 text-(--color-text-secondary) hover:text-(--color-text-primary) transition-colors font-medium w-fit pointer-events-auto">
                    <ChevronLeft className="w-5 h-5" />
                    <span>Back to Submissions</span>
                </Link>
            </div>

            <div className="w-full flex-1 flex flex-col relative z-10 px-4 lg:px-8 pb-32 lg:pb-8 max-w-[95vw] lg:max-w-[70vw] md:max-lg:max-w-[50vw] mx-auto">
                {/* Swipe controls positioned relative to max-w container */}
                <div className="absolute top-1/2 -translate-y-1/2 left-2 right-2 lg:-left-6 lg:-right-6 flex justify-between pointer-events-none z-40">
                    <button
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-(--color-bg-primary) border border-(--color-border) shadow-xl flex items-center justify-center text-(--color-text-primary) pointer-events-auto hover:bg-(--color-bg-secondary) disabled:opacity-30 disabled:pointer-events-none transition-all hover:scale-105 active:scale-95"
                    >
                        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 -ml-0.5" />
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={currentIndex === filteredSubmissions.length - 1}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-(--color-bg-primary) border border-(--color-border) shadow-xl flex items-center justify-center text-(--color-text-primary) pointer-events-auto hover:bg-(--color-bg-secondary) disabled:opacity-30 disabled:pointer-events-none transition-all hover:scale-105 active:scale-95"
                    >
                        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 ml-0.5" />
                    </button>
                </div>

                <AnimatePresence initial={false} mode="wait" custom={direction}>
                    <motion.div
                        key={currentSubmission.id}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 250, damping: 25, mass: 0.5 },
                            opacity: { duration: 0.2 },
                            scale: { duration: 0.2 }
                        }}
                        className="w-full flex-1 flex flex-col min-h-0"
                    >
                        <SubmissionDetailsCard
                            submission={currentSubmission}
                            handleAction={(action) => handleAction(action)}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="hidden">
                {filteredSubmissions
                    .slice(Math.max(0, currentIndex - WINDOW_SIZE), Math.min(filteredSubmissions.length, currentIndex + WINDOW_SIZE + 1))
                    .map(sub => (
                        <div key={`preload-${sub.id}`}>
                            <Image src={sub.creator.image} alt="" fill />
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default function SubmissionDetailsPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-full text-(--color-text-primary)">Loading...</div>}>
            <SubmissionDetailsContent />
        </Suspense>
    );
}
