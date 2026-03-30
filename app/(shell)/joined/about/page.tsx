"use client";

import { useState } from "react";
import {
  Play,
  Pause,
  Volume2,
  Maximize2,
  Download,
  Check,
  Zap,
  Target,
  Sparkles,
  Users,
} from "lucide-react";

export default function About() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[45vh] min-h-[320px] w-full bg-gradient-to-br from-primary/20 via-background to-secondary/10 flex items-center justify-center">
        <div className="absolute inset-0 bg-background/70 backdrop-blur-[3px]" />

        <div className="relative z-10 px-6 text-center max-w-4xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-medium">
            <Sparkles size={14} />
            Trusted Content Clipping Partner
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
            Rayston Heem Clipping
          </h1>

          <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
            Helping creators turn long-form content into high-performing,
            scroll-stopping short clips.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-14 space-y-20">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          {/* Left */}
          <div className="space-y-10">
            {/* About */}
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                About Our Brand
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              </h2>

              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                Rayston Heem Clipping is a performance-driven content clipping
                platform focused on helping creators grow faster through
                high-quality short-form edits.
              </p>

              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                Our team blends creative storytelling with data-backed editing
                strategies to maximize reach, retention, and revenue.
              </p>
            </div>

            {/* Mission Strip */}
            <div className="flex items-start gap-4 p-5 rounded-xl bg-muted/30 border border-border/50">
              <Target className="text-primary mt-1" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">
                  Our Mission
                </h4>
                <p className="text-sm text-muted-foreground">
                  Empower creators with edits that convert views into growth and
                  consistent earnings.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <StatCard value="500+" label="Projects Completed" />
              <StatCard value="50K+" label="Happy Clients" />
            </div>
          </div>

          {/* Right */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold">
              Featured Work
            </h2>

            {/* Video */}
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 group">
              <img
                src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80"
                alt="Video Thumbnail"
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                  isPlaying ? "opacity-40" : "opacity-80"
                }`}
              />

              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="h-16 w-16 rounded-full bg-text-primary/10 backdrop-blur-md flex items-center justify-center hover:scale-110 transition-all group-hover:bg-primary group-hover:text-text-primary"
                >
                  {isPlaying ? (
                    <Pause size={30} />
                  ) : (
                    <Play size={30} className="ml-1" />
                  )}
                </button>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between text-text-primary/90 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs">01:24 / 03:45</span>
                <div className="flex gap-3">
                  <Volume2 size={18} />
                  <Maximize2 size={18} />
                </div>
              </div>
            </div>

            {/* Download Card */}
            <div className="bg-muted/20 rounded-xl p-6 border border-border/50">
              <h3 className="text-lg font-semibold mb-2">
                Sample Project Showcase
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                A glimpse into our editing quality, pacing, and storytelling
                style.
              </p>
              <button className="flex items-center gap-2 px-6 py-2.5 bg-foreground text-background rounded-lg hover:opacity-90 transition">
                <Download size={16} />
                Download Portfolio
              </button>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="pt-12 border-t border-border/40">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Why Choose Us
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Check size={24} />}
              color="bg-green-500"
              title="Quality First"
              desc="Precision editing with platform-optimized storytelling."
            />
            <FeatureCard
              icon={<Zap size={24} />}
              color="bg-blue-500"
              title="Fast Turnaround"
              desc="Consistent delivery timelines creators can rely on."
            />
            <FeatureCard
              icon={<Users size={24} />}
              color="bg-purple-500"
              title="Creator Focused"
              desc="Built specifically for growth-focused creators."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* Reusable Components */

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="group bg-muted/30 hover:bg-muted/50 border border-border/50 rounded-xl p-6 text-center transition">
      <div className="text-3xl font-bold group-hover:scale-110 transition">
        {value}
      </div>
      <div className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  color,
  title,
  desc,
}: {
  icon: React.ReactNode;
  color: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="p-6 rounded-2xl bg-muted/20 hover:bg-muted/40 border border-transparent hover:border-border/50 transition text-center">
      <div
        className={`h-12 w-12 rounded-xl ${color} text-text-primary flex items-center justify-center mx-auto mb-4`}
      >
        {icon}
      </div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}
