"use client";

import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingDistribution {
    stars: number;
    count: number;
    percentage: number;
    color: string;
}

interface ReviewSummaryProps {
    averageRating: number;
    totalRatings: number;
    distribution: RatingDistribution[];
}

export default function ReviewSummary({ averageRating, totalRatings, distribution }: ReviewSummaryProps) {
    return (
        <div className="bg-(--color-bg-card) border border-(--color-border-card) rounded-2xl p-6 lg:p-8 flex flex-col md:flex-row gap-8 lg:gap-12 transition-all hover:shadow-lg">
            {/* Left side: Big Average */}
            <div className="flex flex-col items-center justify-center text-center md:border-r md:border-(--color-border) md:pr-12 shrink-0">
                <h2 className="text-5xl font-black text-(--color-text-primary) mb-2">
                    {averageRating.toFixed(1)}
                </h2>
                <div className="flex items-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((s) => (
                        <Star 
                            key={s} 
                            className={cn(
                                "w-5 h-5",
                                s <= Math.round(averageRating) ? "text-orange-500 fill-orange-500" : "text-(--color-text-muted) fill-transparent"
                            )} 
                        />
                    ))}
                </div>
                <span className="text-sm font-bold text-(--color-text-secondary)">
                    {totalRatings.toLocaleString()} ratings
                </span>
            </div>

            {/* Right side: Distribution Bars */}
            <div className="flex-1 flex flex-col gap-3 justify-center">
                {distribution.map((d) => (
                    <div key={d.stars} className="flex items-center gap-4 group">
                        <div className="flex items-center gap-1.5 w-8 shrink-0">
                            <span className="text-xs font-bold text-(--color-text-primary)">{d.stars}</span>
                            <Star className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                        </div>
                        <div className="flex-1 h-2 bg-(--color-bg-tertiary) rounded-full overflow-hidden">
                            <div 
                                className={cn("h-full rounded-full transition-all duration-1000 ease-out", d.color)}
                                style={{ width: `${d.percentage}%` }}
                            />
                        </div>
                        <div className="w-16 text-right shrink-0">
                            <span className="text-xs font-bold text-(--color-text-primary)">
                                {d.percentage}%
                            </span>
                            <span className="text-[10px] text-(--color-text-muted) ml-1.5 font-medium tracking-tight">
                                ({d.count})
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
