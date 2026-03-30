
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Rocket, Play, CheckCircle2 } from "lucide-react";

export function LandingHero() {
    return (
        <section className="relative bg-zinc-950 pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-900/20 to-zinc-950 pointer-events-none" />
            <div className="absolute -top-20 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container px-4 md:px-6 mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    <div className="flex flex-col space-y-8 animate-fade-in-up">
                        <div className="inline-flex items-center self-start rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400">
                            <span className="flex h-2 w-2 rounded-full bg-blue-400 mr-2 animate-pulse"></span>
                            New: Creator Analytics 2.0
                        </div>

                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-text-primary">
                            The platform for <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">viral campaigns.</span>
                        </h1>

                        <p className="max-w-[600px] text-zinc-400 text-lg md:text-xl leading-relaxed">
                            Bennybucks connects brands with authentic creators to drive real engagement. Launch campaigns in minutes, track results in real-time.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button size="lg" className="h-14 px-8 text-base bg-blue-600 hover:bg-blue-500 text-text-primary shadow-lg shadow-blue-600/20 transition-all hover:scale-105" asChild>
                                <Link href="/campaign/start">
                                    Get Started - It's Free
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="h-14 px-8 text-base border-zinc-800 text-zinc-300 hover:bg-zinc-900 hover:text-text-primary transition-all group" asChild>
                                <Link href="/demo">
                                    <Play className="mr-2 h-4 w-4 fill-current group-hover:text-blue-400 transition-colors" /> View Demo
                                </Link>
                            </Button>
                        </div>

                        <div className="pt-8 flex flex-col gap-4">
                            <p className="text-sm text-zinc-500 font-medium uppercase tracking-wider">Trusted by top brands</p>
                            <div className="flex gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                                {/* Simple text logos for placeholder */}
                                <span className="text-xl font-bold text-zinc-300">ACME</span>
                                <span className="text-xl font-bold text-zinc-300">Vertex</span>
                                <span className="text-xl font-bold text-zinc-300">Bios</span>
                                <span className="text-xl font-bold text-zinc-300">Catalog</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative group perspective-1000">
                        {/* 3D Dashboard Mockup Placeholder */}
                        <div className="relative w-full aspect-[4/3] rounded-xl bg-zinc-900 border border-zinc-800 shadow-2xl overflow-hidden transform rotate-y-[-5deg] rotate-x-[5deg] group-hover:rotate-y-0 group-hover:rotate-x-0 transition-transform duration-700 ease-out">

                            {/* Simulated Window Header */}
                            <div className="h-8 bg-zinc-800 border-b border-zinc-700 flex items-center px-4 space-x-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                            </div>

                            {/* Dashboard Content Placeholder */}
                            <div className="p-6 space-y-6 bg-zinc-900/50">
                                <div className="flex justify-between items-center">
                                    <div className="h-8 w-32 bg-zinc-800 rounded animate-pulse"></div>
                                    <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                                        <CheckCircle2 className="w-4 h-4 text-text-primary" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="h-24 bg-zinc-800/50 rounded-lg p-3 space-y-2 border border-zinc-700/50">
                                        <div className="h-2 w-12 bg-zinc-700 rounded"></div>
                                        <div className="h-6 w-16 bg-zinc-600 rounded"></div>
                                    </div>
                                    <div className="h-24 bg-zinc-800/50 rounded-lg p-3 space-y-2 border border-zinc-700/50">
                                        <div className="h-2 w-12 bg-zinc-700 rounded"></div>
                                        <div className="h-6 w-16 bg-zinc-600 rounded"></div>
                                    </div>
                                    <div className="h-24 bg-zinc-800/50 rounded-lg p-3 space-y-2 border border-zinc-700/50">
                                        <div className="h-2 w-12 bg-zinc-700 rounded"></div>
                                        <div className="h-6 w-16 bg-zinc-600 rounded"></div>
                                    </div>
                                </div>

                                <div className="h-40 bg-zinc-800/30 rounded-lg border border-zinc-700/30 relative overflow-hidden">
                                    {/* Chart Line Placeholder */}
                                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-blue-500/20 to-transparent"></div>
                                    <svg className="absolute bottom-0 left-0 w-full h-full text-blue-500" preserveAspectRatio="none">
                                        <path d="M0,100 Q50,50 100,80 T200,40 T300,60 T400,20 V150 H0 Z" fill="url(#blue-gradient)" opacity="0.2" />
                                        <path d="M0,100 Q50,50 100,80 T200,40 T300,60 T400,20" fill="none" stroke="currentColor" strokeWidth="2" />
                                        <defs>
                                            <linearGradient id="blue-gradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="currentColor" />
                                                <stop offset="100%" stopColor="transparent" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                            </div>

                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/10 transition-colors cursor-pointer group/play">
                                <div className="w-16 h-16 bg-text-primary/10 backdrop-blur-md rounded-full flex items-center justify-center border border-page-border shadow-xl group-hover/play:scale-110 transition-transform">
                                    <Play className="w-6 h-6 text-text-primary fill-white ml-1" />
                                </div>
                            </div>

                        </div>

                        {/* Decorative Background Glow */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur-2xl opacity-20 -z-10 group-hover:opacity-30 transition-opacity duration-1000"></div>
                    </div>

                </div>
            </div>
        </section>
    );
}
