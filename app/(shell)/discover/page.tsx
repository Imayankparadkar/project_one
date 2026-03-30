"use client";

import { useState, useMemo } from "react";
import CampaignCard from "@/components/layout/CampaignCard";
import DropdownFilter from "@/components/layout/DropdownFilter";
import { SparklesIcon } from "@/components/SparklesIcon";
import { TopBar } from "@/components/layout/TopBar";
import Link from "next/link";
import { Youtube, Instagram, Twitter, LucideYoutube } from "lucide-react";

const DOTS = [
  { x: "11.11%", y: "47.42%" },
  { x: "41.89%", y: "5.13%" },
  { x: "35.03%", y: "7.45%" },
  { x: "80.88%", y: "80.59%" },
  { x: "74.75%", y: "36.04%" },
  { x: "13.26%", y: "67.56%" },
  { x: "24.47%", y: "5.85%" },
  { x: "76.96%", y: "19.21%" },
  { x: "86.64%", y: "68.25%" },
  { x: "42.49%", y: "59.25%" },
  { x: "36.76%", y: "60.63%" },
  { x: "51.78%", y: "38.15%" },
  { x: "1.95%", y: "74.74%" },
  { x: "50.25%", y: "18.91%" },
  { x: "44.54%", y: "50.65%" },
  { x: "27.74%", y: "3.35%" },
  { x: "82.69%", y: "78.75%" },
  { x: "64.91%", y: "11.62%" },
  { x: "49.10%", y: "76.48%" },
  { x: "50.89%", y: "53.55%" },
];

const MOCK_CAMPAIGNS = [
  {
    id: 1,
    title: "Eleven Labs Clipping Campaign - [1]",
    company: "Eleven Labs",
    categories: ["CLIPPING"],
    platforms: ["youtube"],
    paidOut: "8,245.12",
    totalBudget: "15,000",
    cp: 55,
    cpm: "1.80",
    approval: "73%",
    views: "4.2M",
    creators: "1234",
    image: "/campaign-swiggy.jpg",
  },
  {
    id: 2,
    title: "Mumford & Sons | Album Promo",
    company: "Scene Society",
    categories: ["MUSIC"],
    platforms: ["instagram", "youtube"],
    paidOut: "18,750.00",
    totalBudget: "25,000",
    cp: 75,
    cpm: "2.50",
    approval: "82%",
    views: "8.1M",
    creators: "567",
    image: "/campaign-zomato.jpg",
  },
  {
    id: 3,
    title: "Cadbury Dairy Milk",
    company: "Cadbury",
    categories: ["UGC"],
    platforms: ["instagram", "youtube"],
    paidOut: "8,000.00",
    totalBudget: "100,000",
    cp: 8,
    cpm: "3.00",
    approval: "90%",
    views: "10M",
    creators: "30",
    image: "/campaign-cadbury.jpg",
  },
  {
    id: 4,
    title: "Spotify Wrapped Clips",
    company: "Spotify",
    categories: ["Logo"],
    platforms: ["youtube"],
    paidOut: "225,000.00",
    totalBudget: "500,000",
    cp: 45,
    cpm: "5.00",
    approval: "99%",
    views: "20M",
    creators: "120",
    image: "/campaign-swiggy.jpg",
  },
  {
    id: 5,
    title: "Nike India Campaign",
    company: "Nike",
    categories: ["UGC"],
    platforms: ["instagram"],
    paidOut: "15,500.00",
    totalBudget: "25,000",
    cp: 62,
    cpm: "4.50",
    approval: "95%",
    views: "15M",
    creators: "55",
    image: "/campaign-nike.jpg",
  },

];

export default function DiscoverPage() {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortFilter, setSortFilter] = useState("Newest");
  const [platformFilters, setPlatformFilters] = useState<string[]>(["youtube", "instagram"]);

  const togglePlatform = (platform: string) => {
    setPlatformFilters(prev =>
      prev.includes(platform) ? prev.filter(p => p !== platform) : [...prev, platform]
    );
  };

  const processedCampaigns = useMemo(() => {
    let results = [...MOCK_CAMPAIGNS];

    // Filter by category
    if (categoryFilter !== "All") {
      results = results.filter((c) =>
        c.categories.some(cat => cat.toUpperCase() === categoryFilter.toUpperCase())
      );
    }

    // Filter by platform
    if (platformFilters.length === 0) {
      return [];
    }

    results = results.filter((c) =>
      c.platforms.some(p => platformFilters.includes(p.toLowerCase()))
    );

    // Parse helper
    const parseCurrency = (str: string) => parseFloat(str.replace(/[^0-9.]/g, '')) || 0;

    // Sort by type
    if (sortFilter === "Highest Budget") {
      results.sort((a, b) => parseCurrency(b.totalBudget) - parseCurrency(a.totalBudget));
    } else if (sortFilter === "Highest Available Budget") {
      results.sort((a, b) => {
        const availA = parseCurrency(a.totalBudget) - parseCurrency(a.paidOut);
        const availB = parseCurrency(b.totalBudget) - parseCurrency(b.paidOut);
        return availB - availA;
      });
    } else if (sortFilter === "Highest CPM") {
      results.sort((a, b) => parseCurrency(b.cpm) - parseCurrency(a.cpm));
    } else if (sortFilter === "Most Paid Out") {
      results.sort((a, b) => parseCurrency(b.paidOut) - parseCurrency(a.paidOut));
    } else if (sortFilter === "Most Creators") {
      results.sort((a, b) => parseInt(b.creators) - parseInt(a.creators));
    } else if (sortFilter === "Newest") {
      // Assuming mock data is generally chronologically added or reversed
      results.sort((a, b) => b.id - a.id);
    }

    return results;
  }, [categoryFilter, sortFilter, platformFilters]);

  return (
    <div className="bg-background relative min-h-screen">
      <TopBar />

      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between px-5 py-4 backdrop-blur-lg bg-transparent">
        {/* Left */}
        <div className="flex items-center gap-3">
          <a
            href="/discover"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted transition"
            aria-label="Back"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-foreground"
            >
              <path
                d="M6.2334 2.70605C6.5337 2.4209 7.00869 2.43318 7.29395 2.7334C7.57915 3.03369 7.56684 3.50868 7.2666 3.79395L3.62891 7.25H14.25C14.6642 7.25 15 7.58582 15 8C15 8.41421 14.6642 8.75 14.25 8.75H3.62891L7.2666 12.2061C7.56687 12.4913 7.57912 12.9663 7.29395 13.2666C7.00868 13.5669 6.53371 13.5792 6.2334 13.2939L1.2334 8.54395C1.08438 8.40235 1 8.20556 1 8C1.00002 7.79445 1.08437 7.59763 1.2334 7.45605L6.2334 2.70605Z"
                fill="currentColor"
              />
            </svg>
          </a>

          <span className="text-base font-semibold text-foreground">
            Discover Content Rewards
          </span>
        </div>

        {/* Right */}
        <a
          href="/apps/app_QRxsQodZgK1r4D/install/"
          target="_blank"
          className="rounded-full bg-muted font-500 px-4 py-2 text-sm font-medium text-foreground hover:bg-muted/80 transition"
        >
          Install app in your BennyBucks
        </a>
      </header>

      {/* Hero */}
      <section className="text-center mt-8 px-4 relative ">
        {/* Radial Glow */}
        <div
          className="pointer-events-none absolute inset-x-0 -top-87.5 md:-top-112.5 h-150 md:h-200 overflow-hidden"
        >
          <div className="mx-auto w-[120%] md:w-[900px] h-full">
            <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(251,191,36,0.15)_0%,rgba(251,191,36,0)_100%)]" />
          </div>
        </div>

        {/* DOTS BACKGROUND */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[260px]">
            {DOTS.map((dot, i) => (
              <span
                key={i}
                className="absolute rounded-full bg-[#FBBF24] opacity-70"
                style={{
                  width: 3,
                  height: 3,
                  left: dot.x,
                  top: dot.y,
                }}
              />
            ))}
          </div>
        </div>

        {/* CONTENT SLOT */}
        <div className="mx-auto mb-6 h-12 w-12 rounded-2xl bg-orange-500 text-text-primary flex items-center justify-center shadow-lg">
          <SparklesIcon />
        </div>

        <h1 className="text-6xl lg:text-7xl font-medium text-foreground mb-3">
          Discover Campaigns
        </h1>
        <p className="text-lg text-muted-foreground">Get paid for posting</p>

        {/* Search */}
        <div className="relative mx-auto mt-8 w-full max-w-2xl">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <input
            placeholder="Mr. Beast Clips..."
            className="w-full rounded-full bg-[color-mix(in_oklab,#f87f14_6%,transparent)] border border-orange-200 py-4 pl-12 pr-4 text-base text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300 shadow-sm"
          />
        </div>

        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
          <p className="text-sm text-muted-foreground">{processedCampaigns.length} campaigns live</p>
        </div>
      </section>

      {/* Filters */}
      <section className="mt-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <DropdownFilter
                options={["All", "UGC", "Music", "Clipping", "Logo"]}
                value={categoryFilter}
                onChange={setCategoryFilter}
              />
              <DropdownFilter
                options={["Newest", "Highest Budget", "Highest Available Budget", "Highest CPM", "Most Paid Out", "Most Creators"]}
                value={sortFilter}
                onChange={setSortFilter}
              />
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Platform</span>
              <div className="flex gap-2">
                <button
                  onClick={() => togglePlatform('youtube')}
                  className={`p-1 border-orange-300 border rounded-lg transition-all ${Math.abs(platformFilters.length) && platformFilters.includes('youtube') ? 'bg-orange-500/10 text-foreground scale-105 shadow-sm' : 'bg-[linear-gradient(to right, rgba(251, 191, 36, 0.08), rgba(251, 191, 36, 0.08))] hover:bg-muted text-muted-foreground'}`}
                >
                  <LucideYoutube className="w-[18px] h-[18px]" strokeWidth={2} />
                </button>
                <button
                  onClick={() => togglePlatform('instagram')}
                  className={`p-1 border-orange-300 border rounded-lg transition-all ${platformFilters.includes('instagram') ? 'bg-orange-500/10 text-foreground scale-105 shadow-sm' : 'bg-[linear-gradient(to right, rgba(251, 191, 36, 0.08), rgba(251, 191, 36, 0.08))] hover:bg-muted text-muted-foreground'}`}
                >
                  <Instagram className="w-[18px] h-[18px]" strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="px-4 pt-8 pb-24">
        <div className="max-w-7xl mx-auto">
          {processedCampaigns.length > 0 ? (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-6">
              {processedCampaigns.map((campaignData) => (
                <Link key={campaignData.id} href="joined/rewards">
                  {/* href="/campaign/mumford-and-sons" */}
                  <CampaignCard campaign={campaignData} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="w-full py-16 text-center text-muted-foreground">
              {platformFilters.length === 0
                ? "No platform selected. Please select a platform to view campaigns."
                : "No campaigns found matching your filters."}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
