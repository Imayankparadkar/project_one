"use client";

import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Review {
    id: string;
    author: {
        name: string;
        handle: string;
        avatar?: string;
        initials?: string;
        color?: string;
    };
    rating: number;
    content: string;
    date: string;
    timestamp: number;
    reply?: {
        content: string;
        date: string;
        authorName: string;
    };
}

interface ReviewCardProps {
    review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
    return (
        <div className="bg-(--color-bg-card) border border-(--color-border-card) rounded-2xl p-6 transition-all hover:border-orange-500/30 hover:shadow-lg group">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    {review.author.avatar ? (
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-(--color-border)">
                            <img 
                                src={review.author.avatar} 
                                alt={review.author.name} 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ) : (
                        <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border border-(--color-border)"
                            style={{ 
                                backgroundColor: review.author.color || "var(--color-bg-tertiary)",
                                color: "var(--color-text-primary)"
                            }}
                        >
                            {review.author.initials || review.author.name.substring(0, 2).toUpperCase()}
                        </div>
                    )}
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-(--color-text-primary)">
                            {review.author.name}
                        </span>
                        <span className="text-xs text-(--color-text-muted)">
                            @{review.author.handle}
                        </span>
                    </div>
                </div>
                <span className="text-xs font-medium text-(--color-text-muted)">
                    {review.date}
                </span>
            </div>

            <div className="flex items-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((s) => (
                    <Star 
                        key={s} 
                        className={cn(
                            "w-3.5 h-3.5",
                            s <= review.rating ? "text-orange-500 fill-orange-500" : "text-(--color-text-muted) fill-transparent opacity-30"
                        )} 
                    />
                ))}
            </div>

            <p className="text-sm text-(--color-text-secondary) leading-relaxed line-clamp-4">
                {review.content}
            </p>
        </div>
    );
}
