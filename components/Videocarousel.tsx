"use client";

import { useRef, useEffect, useState, useCallback } from "react";

export interface VideoCarouselItem {
    /** URL of the video file */
    video: string;
    /** Label shown in the pill at the bottom of the card */
    label: string;
}

interface VideoCarouselProps {
    items: VideoCarouselItem[];
    /** How many pixels to jump per button click (default: 340) */
    scrollAmount?: number;
}

const SCROLL_AMOUNT = 340;

export default function VideoCarousel({ items, scrollAmount = SCROLL_AMOUNT }: VideoCarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const updateScrollState = useCallback(() => {
        const el = scrollRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 8);
        setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
    }, []);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        updateScrollState();
        el.addEventListener("scroll", updateScrollState, { passive: true });
        return () => el.removeEventListener("scroll", updateScrollState);
    }, [updateScrollState]);

    const scrollLeft = () => {
        scrollRef.current?.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    };

    const scrollRight = () => {
        scrollRef.current?.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };

    return (
        <div className="relative w-full">

            {/* Left blur fade + button */}
            <div
                className={`absolute left-0 top-0 bottom-0 z-10 flex items-center pl-3 transition-opacity duration-300 pointer-events-none ${canScrollLeft ? "opacity-100" : "opacity-0"}`}
                style={{ width: "140px" }}
            >
                {/* Gradient overlay */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(to right, var(--color-page-surface) 30%, transparent 100%)",
                    }}
                />
                {/* Button */}
                <button
                    onClick={scrollLeft}
                    disabled={!canScrollLeft}
                    aria-label="Scroll left"
                    className="relative z-10 pointer-events-auto w-11 h-11 rounded-full bg-page-bg border border-page-border shadow-lg flex items-center justify-center text-text-primary hover:bg-text-primary hover:text-page-bg transition-all duration-200 ml-2 disabled:opacity-40"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>
            </div>

            {/* Right blur fade + button */}
            <div
                className={`absolute right-0 top-0 bottom-0 z-10 flex items-center justify-end pr-3 transition-opacity duration-300 pointer-events-none ${canScrollRight ? "opacity-100" : "opacity-0"}`}
                style={{ width: "140px" }}
            >
                {/* Gradient overlay */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(to left, var(--color-page-surface) 30%, transparent 100%)",
                    }}
                />
                {/* Button */}
                <button
                    onClick={scrollRight}
                    disabled={!canScrollRight}
                    aria-label="Scroll right"
                    className="relative z-10 pointer-events-auto w-11 h-11 rounded-full bg-page-bg border border-page-border shadow-lg flex items-center justify-center text-text-primary hover:bg-text-primary hover:text-page-bg transition-all duration-200 mr-2 disabled:opacity-40"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </button>
            </div>

            {/* Scrollable track */}
            <div
                ref={scrollRef}
                className="w-full overflow-x-auto snap-x snap-mandatory"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                <div className="flex gap-10 sm:gap-10 w-max px-4">
                    {items.map((item, i) => (
                        <div
                            key={i}
                            className="flex flex-col items-center gap-3 flex-shrink-0 snap-center"
                        >
                            {/* Video card */}
                            <div className="relative w-[260px] sm:w-[280px] md:w-[313px] aspect-[9/16] rounded-2xl md:rounded-[1.5rem] overflow-hidden group cursor-pointer shadow-md bg-page-bg">
                                <video
                                    src={item.video}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                                />
                                <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                            </div>
                            {/* Label below the card */}
                            <span className="bg-white text-black font-bold text-sm px-6 py-2.5 rounded-full shadow-xl">
                                {item.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}