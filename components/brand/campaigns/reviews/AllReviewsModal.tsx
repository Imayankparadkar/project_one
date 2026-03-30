"use client";

import React, { useState, useMemo, useEffect } from "react";
import { X, Star, ChevronDown, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Review } from "./ReviewCard";
import { motion, AnimatePresence } from "framer-motion";

interface AllReviewsModalProps {
    isOpen: boolean;
    onClose: () => void;
    reviews: Review[];
    averageRating: number;
    totalRatings: number;
}

type SortOption = "newest" | "oldest";
type StarFilter = "all" | 5 | 4 | 3 | 2 | 1;

export default function AllReviewsModal({ isOpen, onClose, reviews: initialReviews, averageRating, totalRatings }: AllReviewsModalProps) {
    const [selectedStar, setSelectedStar] = useState<StarFilter>("all");
    const [sortBy, setSortBy] = useState<SortOption>("newest");
    const [isStarDropdownOpen, setIsStarDropdownOpen] = useState(false);
    
    // Local state to manage mock reviews and replies
    const [localReviews, setLocalReviews] = useState<Review[]>(initialReviews);
    const [replyInputs, setReplyInputs] = useState<Record<string, string>>({});
    const [isReplyingTo, setIsReplyingTo] = useState<string | null>(null);

    // Sync local reviews when initialReviews change
    useEffect(() => {
        setLocalReviews(initialReviews);
    }, [initialReviews]);

    // Derived filtered and sorted reviews
    const filteredReviews = useMemo(() => {
        let result = [...localReviews];
        
        // Filter by stars
        if (selectedStar !== "all") {
            result = result.filter(r => r.rating === selectedStar);
        }

        // Sort
        result.sort((a, b) => {
            if (sortBy === "newest") return b.timestamp - a.timestamp;
            return a.timestamp - b.timestamp;
        });

        return result;
    }, [localReviews, selectedStar, sortBy]);

    const handleReply = (reviewId: string) => {
        const content = replyInputs[reviewId];
        if (!content || !content.trim()) return;

        setIsReplyingTo(reviewId);

        // Simulate API delay
        setTimeout(() => {
            const now = new Date();
            const dateStr = `Replied ${now.toLocaleString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })}`;

            setLocalReviews(prev => prev.map(r => 
                r.id === reviewId 
                    ? { ...r, reply: { content, date: dateStr, authorName: "Brand Team" } }
                    : r
            ));
            
            // Clear input and state
            setReplyInputs(prev => {
                const updated = { ...prev };
                delete updated[reviewId];
                return updated;
            });
            setIsReplyingTo(null);
        }, 800);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-6">
                {/* Backdrop */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-(--color-bg-overlay) backdrop-blur-sm"
                />

                {/* Modal Card */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-2xl bg-(--color-bg-modal) border border-(--color-border) rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh]"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-(--color-border) bg-(--color-bg-modal-header) shrink-0">
                        <h2 className="text-xl font-black text-(--color-text-primary)">Reviews</h2>
                        <button 
                            onClick={onClose}
                            className="p-2 hover:bg-(--color-surface-hover) rounded-full transition-colors text-(--color-text-muted) hover:text-(--color-text-primary)"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-6 pt-8 bg-(--color-bg-modal)">
                        {/* Summary Header */}
                        <div className="flex flex-col items-center justify-center text-center mb-10">
                            <span className="text-xs font-bold text-(--color-text-muted) uppercase tracking-widest mb-2 font-sans">Overall rating</span>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-6xl font-black text-(--color-text-primary)">
                                    {averageRating.toFixed(2)}
                                </span>
                                <Star className="w-12 h-12 text-[#f87f14] fill-[#f87f14]" />
                            </div>
                            <p className="text-sm font-bold text-(--color-text-secondary)">
                                {totalRatings} ratings & reviews
                            </p>
                        </div>

                        {/* Filters & Sort */}
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 sticky top-0 bg-(--color-bg-modal) py-4 z-10 border-b border-(--color-border-subtle)">
                            {/* Star Filters */}
                            <div className="flex flex-col gap-2 shrink-0">
                                <span className="text-[10px] font-black text-(--color-text-muted) uppercase tracking-widest ml-1 font-sans">Filter by ratings</span>
                                
                                {/* Desktop Star Filters */}
                                <div className="hidden sm:flex items-center gap-2">
                                    <button 
                                        onClick={() => setSelectedStar("all")}
                                        className={cn(
                                            "px-4 py-2 rounded-full text-xs font-bold transition-all border border-transparent",
                                            selectedStar === "all" 
                                                ? "bg-(--color-text-primary) text-(--color-text-inverted) shadow-md" 
                                                : "bg-(--color-surface-elevated) text-(--color-text-secondary) hover:text-(--color-text-primary) hover:bg-(--color-surface-hover)"
                                        )}
                                    >
                                        All
                                    </button>
                                    {[5, 4, 3, 2, 1].map((s) => (
                                        <button 
                                            key={s}
                                            onClick={() => setSelectedStar(s as StarFilter)}
                                            className={cn(
                                                "flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold transition-all border border-transparent",
                                                selectedStar === s 
                                                    ? "bg-(--color-text-primary) text-(--color-text-inverted) border-white/20 shadow-md" 
                                                    : "bg-(--color-surface-elevated) text-(--color-text-secondary) hover:text-(--color-text-primary) hover:bg-(--color-surface-hover)"
                                            )}
                                        >
                                            <Star className={cn("w-3.5 h-3.5", selectedStar === s ? "fill-current" : "fill-[#f87f14] text-[#f87f14]")} />
                                            {s}
                                        </button>
                                    ))}
                                </div>

                                {/* Mobile Star Filter (Dropdown) */}
                                <div className="sm:hidden relative w-full">
                                    <button 
                                        onClick={() => setIsStarDropdownOpen(!isStarDropdownOpen)}
                                        className="w-full flex items-center justify-between px-4 py-3 bg-(--color-surface-elevated) rounded-xl text-sm font-bold text-(--color-text-primary)"
                                    >
                                        <span className="flex items-center gap-2">
                                            <Star className="w-4 h-4 text-[#f87f14] fill-[#f87f14]" />
                                            {selectedStar === "all" ? "All Stars" : `${selectedStar} Stars Only`}
                                        </span>
                                        <ChevronDown className={cn("w-4 h-4 transition-transform", isStarDropdownOpen && "rotate-180")} />
                                    </button>
                                    {isStarDropdownOpen && (
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-(--color-bg-modal) border border-(--color-border) rounded-xl shadow-xl overflow-hidden z-20">
                                            {["all", 5, 4, 3, 2, 1].map((s) => (
                                                <button 
                                                    key={s}
                                                    onClick={() => {
                                                        setSelectedStar(s as StarFilter);
                                                        setIsStarDropdownOpen(false);
                                                    }}
                                                    className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-(--color-surface-hover) transition-colors text-(--color-text-primary)"
                                                >
                                                    <span className="text-sm font-medium">
                                                        {s === "all" ? "All Stars" : `${s} Stars`}
                                                    </span>
                                                    {selectedStar === s && <Check className="w-4 h-4 text-[#f87f14]" />}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Sort Options */}
                            <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-4 sm:gap-2 shrink-0">
                                <span className="text-[10px] font-black text-(--color-text-muted) uppercase tracking-widest font-sans">Sort by</span>
                                <div className="flex items-center gap-2 bg-(--color-surface-elevated) p-1 rounded-full border border-(--color-border-subtle)">
                                    <button 
                                        onClick={() => setSortBy("newest")}
                                        className={cn(
                                            "px-4 py-1.5 rounded-full text-xs font-bold transition-all",
                                            sortBy === "newest" 
                                                ? "bg-(--color-text-primary) text-(--color-text-inverted) shadow-sm" 
                                                : "text-(--color-text-secondary) hover:text-(--color-text-primary)"
                                        )}
                                    >
                                        Newest
                                    </button>
                                    <button 
                                        onClick={() => setSortBy("oldest")}
                                        className={cn(
                                            "px-4 py-1.5 rounded-full text-xs font-bold transition-all",
                                            sortBy === "oldest" 
                                                ? "bg-(--color-text-primary) text-(--color-text-inverted) shadow-sm" 
                                                : "text-(--color-text-secondary) hover:text-(--color-text-primary)"
                                        )}
                                    >
                                        Oldest
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Results List */}
                        <div className="space-y-0 divide-y divide-(--color-border)">
                            {filteredReviews.length > 0 ? (
                                filteredReviews.map((r) => (
                                    <div key={r.id} className="py-5 transition-colors hover:bg-(--color-surface-hover) px-2 rounded-lg group">
                                        <div className="flex items-start gap-4 mb-3">
                                            {r.author.avatar ? (
                                                <img 
                                                    src={r.author.avatar} 
                                                    alt={r.author.name} 
                                                    className="w-10 h-10 rounded-full border border-(--color-border) shrink-0"
                                                />
                                            ) : (
                                                <div className="w-10 h-10 rounded-full bg-(--color-bg-tertiary) flex items-center justify-center font-bold border border-(--color-border) shrink-0 text-xs text-(--color-text-primary)">
                                                    {r.author.initials || r.author.name.substring(0, 1).toUpperCase()}
                                                </div>
                                            )}
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-0.5">
                                                    <h4 className="font-black text-sm text-(--color-text-primary)">{r.author.name}</h4>
                                                    <span className="text-[10px] text-(--color-text-muted) font-medium">{r.date}</span>
                                                </div>
                                                <div className="flex items-center gap-0.5 mb-2">
                                                    {[1, 2, 3, 4, 5].map((s) => (
                                                        <Star 
                                                            key={s} 
                                                            className={cn(
                                                                "w-2.5 h-2.5",
                                                                s <= r.rating ? "text-[#f87f14] fill-[#f87f14]" : "text-(--color-text-muted) fill-transparent opacity-20"
                                                            )} 
                                                        />
                                                    ))}
                                                </div>
                                                <p className="text-sm text-(--color-text-secondary) leading-relaxed">
                                                    {r.content}
                                                </p>
                                                
                                                {/* Reply Action / Input */}
                                                {!r.reply && (
                                                    <form 
                                                        onSubmit={(e) => {
                                                            e.preventDefault();
                                                            handleReply(r.id);
                                                        }}
                                                        className="mt-4 flex items-center gap-2"
                                                    >
                                                        <input 
                                                            type="text"
                                                            value={replyInputs[r.id] || ""}
                                                            onChange={(e) => setReplyInputs(prev => ({ ...prev, [r.id]: e.target.value }))}
                                                            placeholder="Write a reply to this creator..."
                                                            className="flex-1 bg-(--color-bg-input) border border-(--color-border-input) rounded-full px-4 py-2 text-xs text-(--color-text-primary) placeholder:text-(--color-text-muted) outline-none focus:border-[#f87f14]/50 transition-colors"
                                                            disabled={isReplyingTo === r.id}
                                                        />
                                                        <button 
                                                            type="submit"
                                                            disabled={isReplyingTo === r.id || !replyInputs[r.id]?.trim()}
                                                            className={cn(
                                                                "px-5 py-2 bg-[#f87f14] text-(--color-text-inverted) rounded-full text-[10px] font-black uppercase tracking-wider transition-all shrink-0 flex items-center gap-2",
                                                                (isReplyingTo === r.id || !replyInputs[r.id]?.trim()) ? "opacity-50 cursor-not-allowed" : "hover:brightness-110"
                                                            )}
                                                        >
                                                            {isReplyingTo === r.id ? <Loader2 className="w-3 h-3 animate-spin" /> : "Reply"}
                                                        </button>
                                                    </form>
                                                )}

                                                {/* Brand Reply */}
                                                {r.reply && (
                                                    <div className="mt-4 p-4 bg-(--color-bg-tertiary) border-l-2 border-[#f87f14]/50 rounded-r-xl relative group/reply transition-all">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-5 h-5 rounded-full bg-[#f87f14] flex items-center justify-center">
                                                                    <Check className="w-3 h-3 text-(--color-text-inverted)" />
                                                                </div>
                                                                <span className="text-[11px] font-black text-[#f87f14] uppercase tracking-wider">
                                                                    {r.reply.authorName}
                                                                </span>
                                                            </div>
                                                            <span className="text-[10px] text-(--color-text-muted)">{r.reply.date}</span>
                                                        </div>
                                                        <p className="text-sm text-(--color-text-primary) leading-relaxed italic opacity-90">
                                                            "{r.reply.content}"
                                                        </p>
                                                        
                                                        {/* Optional: Edit link for mock purposes */}
                                                        <button 
                                                            onClick={() => {
                                                                // Toggle back to input for editing mock
                                                                setReplyInputs(prev => ({ ...prev, [r.id]: r.reply?.content || "" }));
                                                                setLocalReviews(prev => prev.map(lr => lr.id === r.id ? { ...lr, reply: undefined } : lr));
                                                            }}
                                                            className="absolute top-4 right-4 text-[9px] font-bold text-(--color-text-muted) hover:text-[#f87f14] opacity-0 group-hover/reply:opacity-100 transition-opacity uppercase tracking-widest"
                                                        >
                                                            Edit reply
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="py-20 text-center">
                                    <p className="text-(--color-text-muted) text-sm">No reviews found for {selectedStar} stars.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
