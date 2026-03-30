"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import CampaignDetailsCard from "@/components/layout/CampaignDetailsCard";

// Sample campaign details data - discover style + campaign features
const campaignDetailsData = [
  {
    title: "Crown Coins x Terence Crawford",
    company: "Clipr Clipping",
    categories: ["CLIPPING", "ENTERTAINMENT"],
    platforms: ["instagram", "tiktok", "youtube"] as string[],
    paidOut: "$13,359.37",
    totalBudget: "$21,250",
    cp: 63,
    cpm: "$2.00",
    approval: "61%",
    views: "6.5M",
    creators: "1984",
    submissions: 3,
    status: "active" as const,
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png"
  },
  {
    title: "Eleven Labs Clipping Campaign - [1]",
    company: "Eleven Labs",
    categories: ["CLIPPING", "LIFESTYLE"],
    platforms: ["youtube", "tiktok"] as string[],
    paidOut: "$8,245.12",
    totalBudget: "$15,000",
    cp: 55,
    cpm: "$1.80",
    approval: "73%",
    views: "4.2M",
    creators: "1234",
    submissions: 1,
    status: "active" as const,
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png"
  },
  {
    title: "Mumford & Sons | Album Promo",
    company: "Scene Society",
    categories: ["MUSIC", "ENTERTAINMENT"],
    platforms: ["instagram", "youtube", "x"] as string[],
    paidOut: "$18,750.00",
    totalBudget: "$25,000",
    cp: 75,
    cpm: "$2.50",
    approval: "82%",
    views: "8.1M",
    creators: "567",
    submissions: 8,
    status: "active" as const,
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png"
  },
  {
    title: "Tech Product Launch Campaign",
    company: "TechVision Media",
    categories: ["TECH", "REVIEW"],
    platforms: ["youtube", "instagram"] as string[],
    paidOut: "$5,420.00",
    totalBudget: "$12,000",
    cp: 45,
    cpm: "$1.75",
    approval: "68%",
    views: "3.1M",
    creators: "892",
    submissions: 2,
    status: "active" as const,
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png"
  },
  {
    title: "Dubbing AI [GAMING] Campaign",
    company: "Dubbing AI",
    categories: ["GAMING", "TECH"],
    platforms: ["youtube", "tiktok"] as string[],
    paidOut: "$2,000.00",
    totalBudget: "$2,000.00",
    cp: 100,
    cpm: "$1.50",
    approval: "90%",
    views: "1.3M",
    creators: "456",
    submissions: 5,
    status: "paid_out" as const,
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png"
  }
];

export default function CampaignPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter campaign details based on search query
  const filteredCampaignDetails = campaignDetailsData.filter(campaign =>
    campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    campaign.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    campaign.categories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">Campaigns</h1>
        <p className="text-sm text-muted-foreground">
          Discover active campaigns from this <span className="text-[#d4af37]">Content Rewards Community</span>
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#d4af37]/20 focus:border-[#d4af37]/50 transition-all"
          />
        </div>
      </div>

      {/* My Active Campaigns Section */}
      <div className="mb-12">
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-1">My Active Campaigns</h2>
          <p className="text-sm text-muted-foreground">
            Track your progress and earnings
          </p>
        </div>

        {filteredCampaignDetails.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCampaignDetails.map((campaign, index) => (
              <div key={index}>
                <CampaignDetailsCard campaign={campaign} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 bg-card border border-border rounded-2xl">
            <div className="w-16 h-16 bg-muted/30 rounded-2xl flex items-center justify-center mb-4 border border-border">
              <Search className="text-muted-foreground" size={32} />
            </div>
            <h3 className="text-lg font-bold mb-2">No active campaigns found</h3>
            <p className="text-sm text-muted-foreground text-center max-w-sm">
              You haven&apos;t joined any campaigns yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
