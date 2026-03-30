"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface SliderItem {
  title: string;
  description: string;
  video: string;
  poster: string;
}

const ITEMS: SliderItem[] = [
  {
    title: "UGC",
    description: "Create authentic content in your own voice and get paid for every view and engagement.",
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    poster: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=2574&auto=format&fit=crop",
  },
  {
    title: "Clipping",
    description: "Clip long-form content into highlights and moments, and earn every time someone watches.",
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    poster: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=2574&auto=format&fit=crop",
  },
  {
    title: "Music",
    description: "Feature songs in your content. Help tracks go viral and get paid for shaping trends.",
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    poster: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=2574&auto=format&fit=crop",
  },
  {
    title: "Logo",
    description: "Integrate brand logo into content your way and earn for every impression.",
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    poster: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=2574&auto=format&fit=crop",
  },
];

export default function CreatorsSlider({ fontClassName }: { fontClassName?: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const children = Array.from(containerRef.current.children);
    let closestIndex = 0;
    let minDistance = Infinity;

    children.forEach((child, index) => {
      if (index === 0 || index === children.length - 1) return;
      const rect = child.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      const containerCenter = window.innerWidth / 2;
      const distance = Math.abs(center - containerCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index - 1;
      }
    });

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
  };

  const scrollTo = useCallback((index: number) => {
    if (!containerRef.current) return;
    const children = containerRef.current.children;
    if (children[index + 1]) {
      children[index + 1].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, []);

  const nextSlide = useCallback(() => {
    const next = (activeIndex + 1) % ITEMS.length;
    scrollTo(next);
  }, [activeIndex, scrollTo]);

  const prevSlide = useCallback(() => {
    const prev = (activeIndex - 1 + ITEMS.length) % ITEMS.length;
    scrollTo(prev);
  }, [activeIndex, scrollTo]);

  // Auto-slide effect
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [nextSlide, isAutoPlaying]);

  useEffect(() => {
    const timer = setTimeout(() => scrollTo(0), 100);
    return () => clearTimeout(timer);
  }, [scrollTo]);

  return (
    <div
      className="relative w-full overflow-hidden group/slider no-scrollbar"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Navigation Buttons */}
      <div className="absolute inset-y-0 left-0 z-30 flex items-center px-4 md:px-8 pointer-events-none">
        <button
          onClick={prevSlide}
          className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/40 hover:scale-110 transition-all pointer-events-auto opacity-0 group-hover/slider:opacity-100"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 z-30 flex items-center px-4 md:px-8 pointer-events-none">
        <button
          onClick={nextSlide}
          className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/40 hover:scale-110 transition-all pointer-events-auto opacity-0 group-hover/slider:opacity-100"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Scrollable Container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex gap-8 md:gap-12 overflow-x-auto snap-x snap-mandatory px-6 sm:px-12 pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full items-center pt-10"
      >
        <div className="flex-none w-[5vw] md:w-[20vw] lg:w-[24vw]"></div>

        {ITEMS.map((item, index) => {
          const isActive = activeIndex === index;

          return (
            <motion.div
              key={index}
              onClick={() => scrollTo(index)}
              initial={false}
              animate={{
                scale: isActive ? 1 : 0.85,
                opacity: isActive ? 1 : 0.4,
              }}
              transition={{
                duration: 0.5,
                ease: [0.32, 0.72, 0, 1],
              }}
              className={cn(
                "flex-none w-[85vw] md:w-[60vw] lg:w-[52vw] snap-center flex flex-col md:flex-row items-center gap-8 md:gap-12 cursor-pointer transition-colors duration-500",
                !isActive && "pointer-events-auto"
              )}
            >
              {/* Media Card */}
              <div className="w-full md:w-[280px] lg:w-[320px] aspect-[4/5] md:aspect-[9/16] rounded-3xl overflow-hidden relative shadow-2xl flex-shrink-0 group">
                <video
                  src={item.video}
                  poster={item.poster}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className={cn(
                    "absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105",
                    isActive ? "opacity-100" : "opacity-80"
                  )}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"></div>
              </div>

              {/* Text Content */}
              <div className={cn(
                "w-full md:w-3/5 lg:w-[400px] text-left transition-all duration-500",
                isActive ? "translate-x-0 opacity-100" : "translate-x-4 opacity-50"
              )}>
                <h2
                  className={cn(
                    fontClassName,
                    "text-4xl sm:text-5xl lg:text-[4.3rem] font-medium mb-4 -tracking-[.055625em] leading-[1.1]"
                  )}
                >
                  {item.title}
                </h2>
                <p className="text-lg text-text-primary/70 leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}

        <div className="flex-none w-[5vw] md:w-[20vw] lg:w-[24vw]"></div>
      </div>

      {/* Navigation Indicators */}
      <div className="flex justify-center gap-3 mt-4">
        {ITEMS.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              activeIndex === index
                ? "bg-brand-neon w-8"
                : "bg-text-primary/20 hover:bg-text-primary/40"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
