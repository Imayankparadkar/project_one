"use client";

import BrandHeader from "@/components/BrandHeader";
import BrandFooter from "@/components/BrandFooter";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { acidGroteskFont } from "@/lib/fonts";

const brandLogos = [
  "Sonos",
  "Virgin",
  "Condé Nast",
  "Chipotle",
  "Live Nation",
  "Microsoft",
  "Alphabet",
  "American Eagle",
];

const workItems = [
  {
    brand: "UGC",
    href: "/ugc",
    title: "App Preview",
    image:
      "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=2574&auto=format&fit=crop",
    video:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    brand: "Clipping",
    href: "/clipping",
    title: "Game Over",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2564&auto=format&fit=crop",
    video:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  },
  {
    brand: "Music",
    href: "/music",
    title: "Klarna",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2564&auto=format&fit=crop",
    video:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  },
  {
    brand: "Logo",
    href: "/logo",
    title: "Powered",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2564&auto=format&fit=crop",
    video:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  },
];

interface WorkItem {
  href: string;
  brand: string;
  video: string;
  image: string;
}

interface VerticalsSectionProps {
  workItems: WorkItem[];
}

function VerticalsSection({ workItems }: VerticalsSectionProps) {
  const carouselRef = useRef(null);

  return (
    <section className="overflow-hidden border-t border-page-border bg-page-bg py-24">
      <div className="mx-auto w-full max-w-[1480px] px-4 sm:px-8">        
        <div className="max-w-3xl">
          <h2
            className={`${acidGroteskFont.className} text-center text-4xl font-medium leading-[1.1] -tracking-[0.055625em] sm:text-5xl md:text-left lg:text-[4.3rem]`}
          >
            Our Verticals
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-text-primary/65 md:mx-0 md:text-left md:text-lg">
            Explore performance-first formats built for modern creator-led
            campaigns, from UGC and clipping to music and logo-led content.
          </p>
        </div>        

        <div
          ref={carouselRef}
          className="mt-10 overflow-x-auto pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="flex w-max gap-5 sm:gap-6">
            {workItems.map((item) => (
              <div key={item.href} className="snap-start shrink-0">
                <Link
                  href={item.href}
                  className="group relative block w-[260px] overflow-hidden rounded-[1.75rem] border border-page-border bg-page-surface aspect-[9/16] sm:w-[300px] lg:w-[318px]"
                  aria-label={`${item.brand} vertical`}
                >
                  <video
                    src={item.video}
                    poster={item.image}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 h-full w-full object-cover opacity-85 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-white">
                    <h3
                      className={`${acidGroteskFont.className} mt-2 text-3xl font-medium leading-none sm:text-[2.1rem]`}
                    >
                      {item.brand}
                    </h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>        
      </div>
    </section>
  );
}

export default function BrandCampaign() {
  const [heroIndex, setHeroIndex] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHeroIndex(Math.floor(Math.random() * workItems.length));
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const services = [
    {
      art: "performance",
      title: "Pay Only for Performance",
      desc: "Your budget goes directly toward content that generates engagement, eliminating wasted marketing spend.",
    },
    {
      art: "verified",
      title: "AI-Verified Engagement",
      desc: "Every view and interaction is automatically verified to ensure the engagement is real and authentic.",
    },
    {
      art: "dashboard",
      title: "Access the Smart Dashboard",
      desc: "Track all your clips and their performance in one simple dashboard so you can monitor results and take action quickly.",
    },
    {
      art: "audience",
      title: "Reach Niche Audiences",
      desc: "Target specific creator communities by providing all your requirements to get your brand in front of the right people.",
    },
    {
      art: "creators",
      title: "Select the Right Creators",
      desc: "Launch a campaign draft, review creator profiles, scripts, or sample videos, and select the most suitable talent before committing your full budget.",
    },
    {
      art: "community",
      title: "Create Community",
      desc: "We help you create a community of creators around your brand. Creators can use a chat feature to talk and share ideas, so they make better and more consistent content.",
    },
  ];

  const serviceArtworkPanel =
    "relative h-40 overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#343434] shadow-[0_14px_30px_rgba(0,0,0,0.24)]";
  const serviceArtworkHighlight =
    "absolute inset-x-0 top-0 h-11 bg-linear-to-b from-white/10 to-transparent";

  const renderServiceArtwork = (art: string) => {
    switch (art) {
      // ─── performance ────────────────────────────────────────────────────────────
    case "performance":
      return (
        <div className={serviceArtworkPanel}>
          <div className={serviceArtworkHighlight} />

          {/* Left Card: Views (Eye) */}
          <div className="absolute left-4 top-4 w-32 rounded-[1.25rem] bg-[#1f1f1f] p-4 shadow-[0_10px_22px_rgba(0,0,0,0.18)]">
            {/* Eye shape */}
            <div className="relative mx-auto flex h-12 w-20 items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-[#FA4616]/70" style={{ borderRadius: "50%" }} />
              {/* Eyelid mask — top & bottom arcs via clip */}
              <div className="absolute inset-0 overflow-hidden rounded-full">
                <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#FA4616]/70" />
              </div>
              {/* Iris */}
              <div className="relative h-6 w-6 rounded-full border-2 border-[#FA4616]/80 bg-[#FA4616]/10 flex items-center justify-center">
                {/* Pupil */}
                <div className="h-2.5 w-2.5 rounded-full bg-[#FA4616]" />
              </div>
            </div>
            <div className="mt-3 h-2 w-full rounded-full bg-white/14" />
            <p className="mt-2 text-center text-[9px] font-semibold tracking-[0.15em] text-[#FA4616]/70">VIEWS</p>
          </div>

          {/* Centre proportional symbol */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-white/25 select-none">
            ∝
          </div>

          {/* Right Card: Payments (Bag) */}
          <div className="absolute right-4 top-4 w-32 rounded-[1.25rem] bg-[#1f1f1f] p-4 shadow-[0_10px_22px_rgba(0,0,0,0.18)]">
            {/* Bag body */}
            <div className="relative mx-auto flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#DBF505]/70 bg-[#DBF505]/07">
              <span className="text-xl font-bold leading-none text-[#DBF505]">₹</span>
              {/* Bag knot — small pill above circle */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 h-2.5 w-5 rounded-full border-2 border-[#DBF505]/60 bg-[#1f1f1f]" />
            </div>
            <div className="mt-3 h-2 w-full rounded-full bg-white/14" />
            <p className="mt-2 text-center text-[9px] font-semibold tracking-[0.15em] text-[#DBF505]/70">PAYMENTS</p>
          </div>

          {/* Bottom Floating Indicators */}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/8 px-3 py-2">
            <div className="h-2.5 w-2.5 rounded-full bg-[#FA4616]" />
            <div className="h-2.5 w-2.5 rounded-full bg-white/35" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#DBF505]" />
          </div>
        </div>
      );


    // ─── verified ────────────────────────────────────────────────────────────────
    case "verified":
      return (
        <div className={serviceArtworkPanel}>
          <div className={serviceArtworkHighlight} />

          {/* Main Chip Card */}
          <div className="absolute left-1/2 top-4 w-36 -translate-x-1/2 rounded-[1.25rem] bg-[#1f1f1f] p-5 shadow-[0_10px_22px_rgba(0,0,0,0.18)]">
            {/* Octagon-approximation using border-radius tricks */}
            <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-[#DBF505]/60 bg-[#DBF505]/06">
              <span className="text-xl font-bold tracking-tight text-[#DBF505]">AI</span>
              {/* Corner node dots */}
              <div className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-[#FA4616]/70" />
              <div className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-[#FA4616]/70" />
              <div className="absolute -bottom-1 -left-1 h-2 w-2 rounded-full bg-[#DBF505]/70" />
              <div className="absolute -bottom-1 -right-1 h-2 w-2 rounded-full bg-[#DBF505]/70" />
            </div>
            <div className="mt-4 h-2 w-full rounded-full bg-white/14" />
            <div className="mt-2 h-2 w-3/4 mx-auto rounded-full bg-white/8" />
          </div>

          {/* Bottom Card: Circuit terminal rows */}
          <div className="absolute bottom-10 left-1/2 w-44 -translate-x-1/2 rounded-[1.25rem] bg-[#1f1f1f] px-4 py-3 shadow-[0_10px_22px_rgba(0,0,0,0.18)]">
            <div className="flex items-center justify-between">
              <div className="flex gap-1.5">
                <div className="h-2 w-2 rounded-full bg-[#FA4616]/70" />
                <div className="h-2 w-2 rounded-full bg-white/25" />
                <div className="h-2 w-2 rounded-full bg-[#DBF505]/70" />
              </div>
              {/* Live badge */}
              <div className="flex items-center gap-1 rounded-full bg-[#DBF505]/12 px-2 py-0.5">
                <div className="h-1.5 w-1.5 rounded-full bg-[#DBF505]" />
                <span className="text-[8px] font-semibold tracking-widest text-[#DBF505]/80">LIVE</span>
              </div>
            </div>
            <div className="mt-2.5 h-2 w-full rounded-full bg-white/10" />
          </div>

          {/* Bottom Floating Indicators */}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/8 px-3 py-2">
            <div className="h-2.5 w-2.5 rounded-full bg-[#FA4616]" />
            <div className="h-2.5 w-2.5 rounded-full bg-white/35" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#DBF505]" />
          </div>
        </div>
      );


    // ─── dashboard ───────────────────────────────────────────────────────────────
    case "dashboard":
      return (
        <div className={serviceArtworkPanel}>
      <div className={serviceArtworkHighlight} />
 
      {/* Chart card */}
      <div className="absolute left-4 right-4 top-4 rounded-[1.25rem] bg-[#252525] p-4 shadow-[0_10px_22px_rgba(0,0,0,0.28)]">
        {/* Y-axis labels + chart area */}
        <div className="flex gap-2">
          {/* Y-axis */}
          <div className="flex flex-col justify-between pb-1 text-right" style={{ height: 88 }}>
            {["₹10k", "₹5k", "₹2.5k", "₹1k"].map((label) => (
              <span key={label} className="text-[8px] font-medium leading-none text-white/35">
                {label}
              </span>
            ))}
          </div>
 
          {/* SVG line chart */}
          <div className="relative flex-1">
            {/* Horizontal grid lines */}
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 180 88">
              {[0, 29, 58, 87].map((y) => (
                <line key={y} x1="0" y1={y} x2="180" y2={y} stroke="white" strokeOpacity="0.06" strokeWidth="1" />
              ))}
            </svg>
 
            {/* Lines */}
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 180 88">
              <defs>
                <filter id="glow-lime">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="glow-orange">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
 
              {/* Lime line — high performer */}
              <polyline
                points="0,70 36,52 72,60 108,38 144,44 180,8"
                fill="none"
                stroke="#DBF505"
                strokeWidth="2.5"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              {/* Lime endpoint dot */}
              <circle cx="180" cy="8" r="5" fill="#DBF505"  />
              <circle cx="180" cy="8" r="3" fill="#1a1a1a" />
              <circle cx="180" cy="8" r="1.5" fill="#DBF505" />
 
              {/* Orange line — lower performer */}
              <polyline
                points="0,68 36,44 72,30 108,54 144,62 180,50"
                fill="none"
                stroke="#FA4616"
                strokeWidth="2.5"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              {/* Orange endpoint dot */}
              <circle cx="180" cy="50" r="5" fill="#FA4616" />
              <circle cx="180" cy="50" r="3" fill="#1a1a1a" />
              <circle cx="180" cy="50" r="1.5" fill="#FA4616" />
            </svg>
          </div>
        </div>
 
        {/* Bottom label row */}
        <div className="mt-3 flex items-center justify-between">
          <div className="h-2 w-16 rounded-full bg-white/10" />
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="h-1.5 w-4 rounded-full bg-[#DBF505]/70" />
              <div className="h-1.5 w-8 rounded-full bg-white/15" />
            </div>
            <div className="flex items-center gap-1">
              <div className="h-1.5 w-4 rounded-full bg-[#FA4616]/70" />
              <div className="h-1.5 w-8 rounded-full bg-white/15" />
            </div>
          </div>
        </div>
      </div>
 
    </div>
      );


    // ─── audience ────────────────────────────────────────────────────────────────
    case "audience":
      return (
        <div className={serviceArtworkPanel}>
          <div className={serviceArtworkHighlight} />

          {/* Left Person (faded) */}
          <div className="absolute left-4 top-4 w-24 rounded-[1.25rem] bg-[#1f1f1f] p-4 opacity-40 shadow-[0_10px_22px_rgba(0,0,0,0.18)]">
            <div className="mx-auto h-9 w-9 rounded-full border-2 border-white/40" />
            <div className="mt-2 h-9 w-full rounded-t-full border-2 border-b-0 border-white/40" />
            <div className="mt-3 h-2 w-full rounded-full bg-white/14" />
          </div>

          {/* Right Person (faded) */}
          <div className="absolute right-4 top-4 w-24 rounded-[1.25rem] bg-[#1f1f1f] p-4 opacity-40 shadow-[0_10px_22px_rgba(0,0,0,0.18)]">
            <div className="mx-auto h-9 w-9 rounded-full border-2 border-white/40" />
            <div className="mt-2 h-9 w-full rounded-t-full border-2 border-b-0 border-white/40" />
            <div className="mt-3 h-2 w-full rounded-full bg-white/14" />
          </div>

          {/* Centre Person (highlighted target) */}
          <div className="absolute left-1/2 top-2 w-28 -translate-x-1/2 rounded-[1.25rem] bg-[#1f1f1f] p-4 shadow-[0_10px_22px_rgba(0,0,0,0.18)] ring-2 ring-[#FA4616]/50">
            <div className="mx-auto h-11 w-11 rounded-full border-[2.5px] border-[#FA4616]" />
            <div className="mt-2 h-10 w-full rounded-t-full border-[2.5px] border-b-0 border-[#DBF505]" />
            <div className="mt-3 h-2 w-full rounded-full bg-white/20" />
          </div>

          {/* Targeting bracket — top-left corner */}
          {/* <div className="absolute left-[calc(50%-52px)] top-2 h-4 w-4 border-l-2 border-t-2 border-[#DBF505]/70 rounded-tl" /> */}
          {/* Targeting bracket — top-right corner */}
          {/* <div className="absolute left-[calc(50%+36px)] top-2 h-4 w-4 border-r-2 border-t-2 border-[#DBF505]/70 rounded-tr" /> */}

          {/* Bottom Floating Indicators */}
          {/* <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/8 px-3 py-2">
            <div className="h-2.5 w-2.5 rounded-full bg-[#FA4616]" />
            <div className="h-2.5 w-2.5 rounded-full bg-white/35" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#DBF505]" />
          </div> */}
        </div>
      );


    // ─── creators ────────────────────────────────────────────────────────────────
    case "creators":
      return (
        <div className={serviceArtworkPanel}>
          <div className={serviceArtworkHighlight} />

          {/* Left Person (faded) */}
          <div className="absolute left-4 top-4 w-24 rounded-[1.25rem] bg-[#1f1f1f] p-4 opacity-40 shadow-[0_10px_22px_rgba(0,0,0,0.18)]">
            <div className="mx-auto h-9 w-9 rounded-full border-2 border-white/40" />
            <div className="mt-2 h-9 w-full rounded-t-full border-2 border-b-0 border-white/40" />
            <div className="mt-3 h-2 w-full rounded-full bg-white/14" />
          </div>

          {/* Right Person (faded) */}
          <div className="absolute right-4 top-4 w-24 rounded-[1.25rem] bg-[#1f1f1f] p-4 opacity-40 shadow-[0_10px_22px_rgba(0,0,0,0.18)]">
            <div className="mx-auto h-9 w-9 rounded-full border-2 border-white/40" />
            <div className="mt-2 h-9 w-full rounded-t-full border-2 border-b-0 border-white/40" />
            <div className="mt-3 h-2 w-full rounded-full bg-white/14" />
          </div>

          {/* Centre Person (highlighted target) */}
          <div className="absolute left-1/2 top-2 w-28 -translate-x-1/2 rounded-[1.25rem] bg-[#1f1f1f] p-4 shadow-[0_10px_22px_rgba(0,0,0,0.18)] ring-2 ring-[#FA4616]/50">
            <div className="mx-auto h-11 w-11 rounded-full border-[2.5px] border-[#FA4616]" />
            <div className="mt-2 h-10 w-full rounded-t-full border-[2.5px] border-b-0 border-[#DBF505]" />
            <div className="mt-3 h-2 w-full rounded-full bg-white/20" />
          </div>

          {/* Targeting bracket — top-left corner */}
          {/* <div className="absolute left-[calc(50%-52px)] top-2 h-4 w-4 border-l-2 border-t-2 border-[#DBF505]/70 rounded-tl" /> */}
          {/* Targeting bracket — top-right corner */}
          {/* <div className="absolute left-[calc(50%+36px)] top-2 h-4 w-4 border-r-2 border-t-2 border-[#DBF505]/70 rounded-tr" /> */}

          {/* Bottom Floating Indicators */}
          {/* <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/8 px-3 py-2">
            <div className="h-2.5 w-2.5 rounded-full bg-[#FA4616]" />
            <div className="h-2.5 w-2.5 rounded-full bg-white/35" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#DBF505]" />
          </div> */}
        </div>
      );
      // return (
      //   <div className={serviceArtworkPanel}>
      //     <div className={serviceArtworkHighlight} />

      //     {/* Platform card (roster of avatars) */}
      //     <div className="absolute left-4 right-4 top-4 rounded-[1.25rem] bg-[#1f1f1f] p-4 shadow-[0_10px_22px_rgba(0,0,0,0.18)]">
      //       {/* Header row */}
      //       <div className="mb-3 flex items-center justify-between">
      //         <div className="h-2.5 w-16 rounded-full bg-white/20" />
      //         <div className="h-2.5 w-8 rounded-full bg-white/10" />
      //       </div>

      //       {/* Avatar rows — 4 unselected creators */}
      //       {[0.18, 0.12, 0.10, 0.08].map((opacity, i) => (
      //         <div key={i} className="mb-2 flex items-center gap-3">
      //           <div className="h-7 w-7 flex-shrink-0 rounded-full border-2 border-white/20" style={{ opacity }} />
      //           <div className="flex flex-1 flex-col gap-1.5" style={{ opacity }}>
      //             <div className="h-2 w-3/4 rounded-full bg-white/20" />
      //             <div className="h-2 w-1/2 rounded-full bg-white/12" />
      //           </div>
      //           <div className="h-5 w-8 flex-shrink-0 rounded-full bg-white/10" style={{ opacity }} />
      //         </div>
      //       ))}
      //     </div>

      //     {/* Selected creator badge — lifted out at the bottom of the panel */}
      //     <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-2xl bg-[#1f1f1f] px-4 py-3 shadow-[0_10px_22px_rgba(0,0,0,0.18)]">
      //       {/* Glowing avatar */}
      //       <div className="relative h-8 w-8 flex-shrink-0 rounded-full border-2 border-[#FA4616] shadow-[0_0_8px_rgba(250,70,22,0.5)]" />
      //       <div>
      //         <div className="h-2.5 w-20 rounded-full bg-white/25" />
      //         <div className="mt-1.5 h-2 w-14 rounded-full bg-white/14" />
      //       </div>
      //       {/* Selected lime dot */}
      //       <div className="ml-1 h-3 w-3 flex-shrink-0 rounded-full bg-[#DBF505] shadow-[0_0_6px_rgba(219,245,5,0.6)]" />
      //     </div>

      //     {/* Bottom Floating Indicators */}
      //     <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/8 px-3 py-2">
      //       <div className="h-2.5 w-2.5 rounded-full bg-[#FA4616]" />
      //       <div className="h-2.5 w-2.5 rounded-full bg-white/35" />
      //       <div className="h-2.5 w-2.5 rounded-full bg-[#DBF505]" />
      //     </div>
      //   </div>
      // );
      case "community":
        return (
          <div className={serviceArtworkPanel}>
            <div className={serviceArtworkHighlight} />
            
            {/* Left Card: Group Avatar */}
            <div className="absolute left-4 top-4 w-34 rounded-[1.25rem] bg-[#1f1f1f] p-4 shadow-[0_10px_22px_rgba(0,0,0,0.18)]">
              <div className="relative mx-auto h-20 w-24">
                <div className="absolute left-1/2 top-0 h-8 w-8 -translate-x-1/2 rounded-full border-2 border-white/85" />
                <div className="absolute left-0 top-4 h-7 w-7 rounded-full border-2 border-white/65" />
                <div className="absolute right-0 top-4 h-7 w-7 rounded-full border-2 border-white/65" />
                <div className="absolute left-1/2 top-8 h-10 w-14 -translate-x-1/2 rounded-t-full border-2 border-b-0 border-white/85" />
                <div className="absolute left-1 top-10 h-8 w-10 rounded-t-full border-2 border-b-0 border-white/65" />
                <div className="absolute right-1 top-10 h-8 w-10 rounded-t-full border-2 border-b-0 border-white/65" />
              </div>
              <div className="mt-2 h-2.5 w-full rounded-full bg-white/14" />
            </div>

            {/* Right Card: Chat Bubble */}
            <div className="absolute right-4 top-4 w-36 rounded-[1.25rem] bg-[#1f1f1f] px-4 py-4 shadow-[0_10px_22px_rgba(0,0,0,0.18)]">
              <div className="mb-3 flex items-center justify-between">
                <div className="h-2.5 w-14 rounded-full bg-white/20" />
                {/* Brand Lime Dot */}
                <div className="h-3 w-3 rounded-full bg-[#DBF505]" />
              </div>
              <div className="space-y-2">
                <div className="h-2.5 w-20 rounded-full bg-white/18" />
                <div className="h-2.5 w-16 rounded-full bg-white/12" />
                <div className="h-2.5 w-12 rounded-full bg-white/10" />
              </div>
              <div className="absolute -bottom-2 right-6 h-5 w-5 rotate-45 rounded-sm bg-[#2a2d35]" />
            </div>

            {/* Bottom Floating Indicators */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/8 px-3 py-2">
              {/* Brand Orange */}
              <div className="h-2.5 w-2.5 rounded-full bg-[#FA4616]" />
              <div className="h-2.5 w-2.5 rounded-full bg-white/35" />
              {/* Brand Lime */}
              <div className="h-2.5 w-2.5 rounded-full bg-[#DBF505]" />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-page-bg text-text-primary selection:bg-blue-600 selection:text-text-primary">
      {/* ── Navbar ── */}
      <BrandHeader />

      {/* ── Hero ── */}
      {/* <section className="pt-[180px] pb-24 px-4 sm:px-8 flex flex-col items-center justify-center text-center">
        <div className="inline-block py-1 px-4 rounded-full bg-brand-neon/10 border border-brand-neon/30 text-brand-neon text-sm font-bold mb-8 tracking-widest uppercase">
          Let Your Brand Show Its Mark
        </div>
        <h1
          className={`${acidGroteskFont.className} text-5xl md:text-[5rem] lg:text-[6rem] font-extrabold -tracking-[2px] mb-8 leading-[1.05]`}
        >
          The Creator-Powered
          <br /> <span className="text-brand-red">Performance</span> First
          Marketing <span className="text-brand-red">Platform</span>
        </h1>
        <p className="text-xl md:text-2xl text-text-primary/60 max-w-3xl mx-auto leading-relaxed mb-12 font-medium">
          A performance-driven ecosystem where brands launch campaigns and
          creators produce authentic content that drives real engagement.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <button className="rounded-xl bg-[#1754d8] hover:bg-[#1240a6] text-white text-[1.3rem] font-medium px-6 py-4 transition-transform hover:scale-105  tracking-wide">
            Join As Creator
          </button>
          <button className="rounded-full bg-transparent border-2 border-text-primary/30 hover:border-text-primary/60 hover:bg-text-primary/5 text-text-primary flex items-center justify-center gap-3 text-[1.3rem] font-medium px-6 py-4 transition-colors  tracking-wide">
            Launch Your Campaign
          </button>
        </div>
      </section> */}

      {/* ── Hero ── */}
      {/* <section className="pt-[100px] pb-12 px-4 sm:px-8 bg-page-bg flex flex-col items-center justify-center">
        <div className="relative w-full mx-auto min-h-[80vh] rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden flex flex-col items-center justify-center border border-page-border shadow-2xl">
          <div className="absolute inset-0 z-0 bg-page-bg overflow-hidden">
            {heroIndex !== null && (
              <video
                src={workItems[heroIndex].video}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-80 scale-110 filter blur-[40px] md:blur-[60px]"
              />
            )}
            <div className="absolute inset-0 bg-black/10 backdrop-blur-3xl mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/50"></div>
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[280px] sm:max-w-[320px] md:max-w-[340px] lg:max-w-[380px] aspect-[9.5/16] rounded-[2.5rem] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.8)] group bg-page-surface mb-8">
            {heroIndex !== null ? (
              <img
                src={workItems[heroIndex].image}
                alt={workItems[heroIndex].brand}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-page-surface/50 animate-pulse"></div>
            )}
          </div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 overflow-hidden px-4">
            <div className="text-[15vw] sm:text-[13vw] md:text-[11vw] lg:text-[8.5vw] xl:text-[6.5vw] 2xl:text-[5.5vw] font-black tracking-tighter leading-[0.9] text-white/90 w-full max-w-[1480px] mx-auto flex flex-col justify-center h-full drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)] whitespace-nowrap mix-blend-overlay">
              <div className="text-center relative -translate-x-[20px] sm:-translate-x-[40px] md:-translate-x-[60px] lg:-translate-x-[90px] xl:-translate-x-[120px] 2xl:-translate-x-[140px] mb-1">THE</div>
              <div className="text-center relative translate-x-[20px] sm:translate-x-[40px] md:translate-x-[60px] lg:translate-x-[90px] xl:translate-x-[120px] 2xl:translate-x-[140px] mb-1">CREATOR</div>
              <div className="text-center relative -translate-x-[20px] sm:-translate-x-[40px] md:-translate-x-[60px] lg:-translate-x-[90px] xl:-translate-x-[120px] 2xl:-translate-x-[140px] mb-1">POWERED</div>
              <div className="text-center relative translate-x-[20px] sm:translate-x-[40px] md:translate-x-[60px] lg:translate-x-[90px] xl:translate-x-[120px] 2xl:translate-x-[140px]">PLATFORM</div>
            </div>
          </div>

          <div className="absolute bottom-10 sm:bottom-10 md:bottom-[38px] z-30 flex flex-col items-center justify-center w-full">
            <Link href="/home" className="bg-[#1754d8] hover:bg-[#1240a6] text-white font-extrabold text-lg md:text-xl px-10 py-4 md:px-12 md:py-5 rounded-xl shadow-[0_0_40px_rgba(23,84,216,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_rgba(23,84,216,0.6)] active:scale-95 flex items-center gap-3">
              Join as Creator
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </Link>
          </div>
        </div>
      </section> */}

      {/* ── Logos ── */}
      {/* <div className="py-12 border-b border-page-border bg-page-bg">
        <div className="w-full px-4 sm:px-8 flex flex-col lg:flex-row items-center justify-between gap-10">
          <h2 className="text-xl sm:text-2xl font-bold max-w-sm text-left leading-snug text-text-primary/90">
            The world&apos;s best brands trust Bennybucks for Creator Marketing.
          </h2>
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-x-10 gap-y-6 flex-1 opacity-60 font-extrabold text-xl sm:text-2xl uppercase tracking-tighter">
            {brandLogos.map((logo, i) => (
              <span key={i} className="hover:opacity-100 transition-opacity cursor-pointer">{logo}</span>
            ))}
          </div>
        </div>
      </div> */}

      {/* ── Stats ── */}
      {/* <section className="bg-page-bg">
        <div className="w-full px-4 sm:px-8 py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-page-surface rounded-[2rem] p-12 border border-page-border hover:border-page-border transition-colors">
              <h3 className="text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">50+ Million</h3>
              <p className="font-semibold text-lg text-text-primary/50 max-w-[200px] leading-snug">Access to 50+ Million Creators Worldwide</p>
            </div>
            <div className="bg-page-surface rounded-[2rem] p-12 border border-page-border hover:border-page-border transition-colors">
              <h3 className="text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">14.4+ Billion</h3>
              <p className="font-semibold text-lg text-text-primary/50 max-w-[200px] leading-snug">Total Aggregated Community Reach</p>
            </div>
            <div className="bg-page-surface rounded-[2rem] p-12 border border-page-border hover:border-page-border transition-colors">
              <h3 className="text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">Partners</h3>
              <p className="font-semibold text-lg text-text-primary/50 max-w-[200px] leading-snug">with All Major Social Platforms</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* ── Quote & Feature ── */}
      <section className="bg-gradient-to-b from-page-bg to-page-surface py-24 border-t border-page-border flex flex-col items-center">
        <div className="w-full max-w-[1480px] mx-auto px-4 sm:px-8">
          {/* <div className="text-center mb-20 md:mb-28">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-text-primary mb-4">
              “The Best Influencer Marketing Platform”
            </h2>
            <div className="text-4xl md:text-6xl font-black tracking-tighter uppercase">Digiday</div>
          </div> */}

          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2">
              <div className="w-full h-[450px] sm:h-[550px] lg:h-[700px] bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-[2rem] md:rounded-[2rem] overflow-hidden border border-page-border shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=2574&auto=format&fit=crop"
                  alt="Bennybucks Platform"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            <div className="w-full lg:w-1/2 text-left mt-8 lg:mt-0">
              <h2
                className={`${acidGroteskFont.className} text-4xl sm:text-5xl lg:text-[4.3rem] font-medium mb-8 -tracking-[.055625em] leading-[1.1]`}
              >
                India’s Most <span className="text-[#dbf505]">Intelligent</span>{" "}
                <br />
                Creator Marketing <br />
                Platform
              </h2>
              <p className="text-lg text-text-primary/70 leading-relaxed mb-6 font-medium">
                BennyBucks is reinventing how brands work with creators. Launch
                a campaign, tell creators what you need, and receive high-impact
                content designed for real audience engagement.
              </p>
              <p className="text-lg text-text-primary/70 leading-relaxed mb-10 font-medium">
                Every submission is verified by Whoofy, our intelligent engine,
                ensuring every rupee you spend drives authentic reach,
                measurable engagement, and real results.
              </p>
              <button className="rounded-xl bg-[#dbf505] hover:bg-[#E6FA3A] text-black text-[1.3rem] font-medium px-6 py-4 transition-transform hover:scale-105 tracking-wide">
                <div className="flex items-center gap-2">
                  Launch Your Campaign
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Verticals Carousel ── */}
      {/* <section className="overflow-hidden border-t border-page-border bg-page-bg py-24">
        <div className="mx-auto w-full max-w-[1480px] px-4 sm:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <h2
                className={`${acidGroteskFont.className} text-center text-4xl font-medium leading-[1.1] -tracking-[0.055625em] sm:text-5xl md:text-left lg:text-[4.3rem]`}
              >
                Our Verticals
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-text-primary/65 md:mx-0 md:text-left md:text-lg">
                Explore performance-first formats built for modern creator-led
                campaigns, from UGC and clipping to music and logo-led content.
              </p>
            </div>
          </div>

          <div
            className="-mx-4 mt-10 overflow-x-auto no-scrollbar pb-2 sm:mx-0 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex w-max gap-5 px-4 sm:gap-6 sm:px-0">
              {workItems.map((item) => (
                <div key={item.href} className="snap-start shrink-0">
                  <Link
                    href={item.href}
                    className="group relative block w-[260px] overflow-hidden rounded-[1.75rem] border border-page-border bg-page-surface aspect-9/16 sm:w-[300px] lg:w-[318px]"
                    aria-label={`${item.brand} vertical`}
                  >
                    <video
                      src={item.video}
                      poster={item.image}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      className="absolute inset-0 h-full w-full object-cover opacity-85 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-white">
                      <h3
                        className={`${acidGroteskFont.className} mt-2 text-3xl font-medium leading-none sm:text-[2.1rem]`}
                      >
                        {item.brand}
                      </h3>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}
      <VerticalsSection workItems={workItems} />


      {/* ── Marquee / Ticker ── */}
      <section className="py-4 sm:py-6 overflow-hidden border-page-border flex items-center">
        <style
          dangerouslySetInnerHTML={{
            __html: `
            @keyframes marquee-fast {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
          `,
          }}
        />
        <div
          className="flex w-max whitespace-nowrap selection:bg-black selection:text-brand-neon text-text-primary"
          style={{ animation: "marquee-fast 50s linear infinite" }}
        >
          {/* First set of words */}
          <div
            className={`${acidGroteskFont.className} flex gap-30 pr-30 text-text-primary text-center text-4xl font-medium leading-[1.1] -tracking-[0.055625em] sm:text-5xl md:text-left lg:text-[4.3rem]`}
            style={{ wordSpacing: ".5rem" }}
          >
            <span>
              Full Creator Network, Performance Tracking & Reporting Tool.
            </span>{" "}
            <span>
              Full Creator Network, Performance Tracking & Reporting Tool.
            </span>{" "}
            <span>
              Full Creator Network, Performance Tracking & Reporting Tool.
            </span>{" "}
          </div>
          {/* Identical duplicate set to seamlessly scroll */}
          <div
            className={`${acidGroteskFont.className} flex gap-30 pr-30 text-text-primary text-center text-4xl font-medium leading-[1.1] -tracking-[0.055625em] sm:text-5xl md:text-left lg:text-[4.3rem]`}
            style={{ wordSpacing: ".5rem" }}
          >
            <span>
              Full Creator Network, Performance Tracking & Reporting Tool.
            </span>{" "}
            <span>
              Full Creator Network, Performance Tracking & Reporting Tool.
            </span>{" "}
            <span>
              Full Creator Network, Performance Tracking & Reporting Tool.
            </span>{" "}
          </div>
        </div>
      </section>

      {/* ── Full Service grid ── */}
      <section className="relative overflow-hidden bg-[#121212] py-24 text-white">
        <div className="relative mx-auto w-full max-w-[1480px] px-4 sm:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((svc, i) => (
              <div
                key={i}
                // Removed aspect-square, added flex layout and h-full to keep grid rows even
                className="group flex h-full flex-col rounded-[1.4rem] border border-white/10 bg-[#1f1f1f] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-transform duration-300 hover:-translate-y-1"
              >
                {/* Render the artwork at the top */}
                <div className="relative w-full overflow-hidden rounded-xl">
                  {renderServiceArtwork(svc.art)}
                </div>

                {/* Text Container */}
                <div className="mt-6 flex flex-col flex-grow">
                  <h3 className="mb-2 text-xl font-semibold leading-snug text-white">
                    {svc.title}
                  </h3>
                  {/* Removed mb-10 and adjusted line-height for better readability */}
                  <p className="text-base font-normal leading-relaxed tracking-tight text-white/70">
                    {svc.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <section className="bg-[#EBEFE4] text-black w-full overflow-hidden">
        <div className="max-w-[1480px] mx-auto px-4 sm:px-8 pt-20 pb-4">
          <h2 className="text-5xl md:text-[5rem] lg:text-[6.5rem] font-bold text-center tracking-tight mb-20 md:mb-32 mt-12 text-[#111]">
            Let&apos;s meet up IRL
          </h2>

          <div className="flex flex-col mb-32 border-t border-black/30">
            <div className="flex flex-col md:flex-row md:items-center justify-between py-10 md:py-12 border-b border-black/30 w-full group">
              <div className="flex flex-col text-lg md:text-xl font-medium tracking-tight text-[#111]">
                <h3 className="font-extrabold uppercase mb-2 text-xl md:text-2xl tracking-tighter">SOCIAL MEDIA WEEK</h3>
                <p className="uppercase font-semibold">APRIL 14-16, 2026</p>
                <p className="font-semibold">New York, NY</p>
              </div>
              <div className="mt-8 md:mt-0 flex shrink-0 justify-start md:justify-end">
                <button className="bg-white text-black font-bold py-3 px-8 rounded-full shadow-md hover:scale-105 transition-transform text-sm md:text-base whitespace-nowrap">
                  Lets Connect
                </button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between py-10 md:py-12 border-b border-black/30 w-full group">
              <div className="flex flex-col text-lg md:text-xl font-medium tracking-tight max-w-sm text-[#111]">
                <h3 className="font-extrabold uppercase mb-2 text-xl md:text-2xl tracking-tighter">POSSIBLE</h3>
                <p className="uppercase font-semibold">APRIL 27-29, 2026</p>
                <p className="font-semibold">Miami, FL</p>
                <p className="text-sm md:text-base mt-4 leading-snug font-medium pr-4">
                  Hosted by Bennybucks and <span className="font-bold">Alexis Ohanian (776)</span>, aboard the Bennybucks Yacht, April 27th and 28th of Possible
                </p>
              </div>

              <div className="my-8 md:my-0 flex-1 flex justify-center w-full">
                <div className="w-full max-w-[280px] md:max-w-[320px] aspect-[4/3] rounded-[2rem] overflow-hidden shrink-0 shadow-xl transition-transform duration-700 group-hover:scale-105">
                  <img
                    src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop"
                    alt="Yacht in Miami"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="mt-8 md:mt-0 flex shrink-0 justify-start md:justify-end">
                <button className="bg-white text-black font-bold py-3 px-8 rounded-full shadow-md hover:scale-105 transition-transform text-sm md:text-base whitespace-nowrap">
                  Lets Connect
                </button>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* ── Footer / CTA ── */}
      <BrandFooter />
    </div>
  );
}
