"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { ChevronLeft, Star, ExternalLink, Filter, ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { mockCampaigns } from "@/lib/data/campaigns";
import ReviewSummary from "@/components/brand/campaigns/reviews/ReviewSummary";
import ReviewCard, { Review } from "@/components/brand/campaigns/reviews/ReviewCard";
import AllReviewsModal from "@/components/brand/campaigns/reviews/AllReviewsModal";
import { cn } from "@/lib/utils";
import { MOCK_REVIEWS, RATING_DISTRIBUTION } from "@/lib/data/reviews";

export default function ReviewsPage() {
    const params = useParams();
    const campaignId = params.campaign as string;
    const campaign = mockCampaigns.find(c => c.id === campaignId);
    
    const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const averageRating = 3.8;
    const totalRatings = 71;

    if (!campaign) {
        return <div className="p-8 text-center text-(--color-text-primary)">Campaign Not Found</div>;
    }

    return (
        <div className="flex-col h-full bg-campaigns-page text-(--color-text-primary) overflow-y-auto w-full pb-32 lg:pb-0">
            <div className="p-4 lg:p-8 pb-4 max-w-7xl mx-auto w-full">
                {/* Mobile back button */}
                <Link href={`/brand/campaigns/${campaignId}`} className="flex lg:hidden items-center gap-2 text-(--color-text-secondary) hover:text-(--color-text-primary) mb-6 transition-colors font-medium">
                    <ChevronLeft className="w-5 h-5" />
                    <span>Back to Menu</span>
                </Link>

                {/* Desktop back button */}
                <Link href="/brand/campaigns" className="hidden lg:flex items-center gap-2 text-(--color-text-secondary) hover:text-(--color-text-primary) mb-6 transition-colors font-medium">
                    <ChevronLeft className="w-5 h-5" />
                    <span>Back to Campaigns</span>
                </Link>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-(--color-text-primary) mb-2">Creator Feedback</h1>
                        <p className="text-sm text-(--color-text-secondary) max-w-2xl leading-relaxed">
                            See how creators feel about collaborating with **{campaign.name}**. Detailed reviews and rating distributions help you measure creator satisfaction.
                        </p>
                    </div>
                </div>

                {/* Rating Summary Card */}
                <div className="mb-12">
                    <ReviewSummary 
                        averageRating={averageRating} 
                        totalRatings={totalRatings} 
                        distribution={RATING_DISTRIBUTION} 
                    />
                </div>

                {/* Top Reviews Section Header */}
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-black text-(--color-text-primary) flex items-center gap-2">
                        Top reviews
                    </h3>
                    
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="text-sm font-bold text-orange-500 hover:text-orange-600 transition-colors flex items-center gap-1 group hover:cursor-pointer"
                    >
                        See all reviews                        
                    </button>
                </div>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-6">
                    {reviews.map((r) => (
                        <ReviewCard key={r.id} review={r} />
                    ))}
                </div>

                {/* Optional Footer Decoration */}
                <div className="mt-16 text-center opacity-40">
                    <div className="h-px bg-(--color-border) max-w-sm mx-auto mb-6" />
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-(--color-text-muted)">
                        End of highlights
                    </p>
                </div>
            </div>

            <AllReviewsModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                reviews={reviews}
                averageRating={averageRating}
                totalRatings={totalRatings}
            />
        </div>
    );
}
