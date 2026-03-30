
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, DollarSign, Send, Users } from "lucide-react";

export function LandingGoals() {
    return (
        <section className="py-24 bg-gradient-to-br from-zinc-950 to-black text-text-primary relative">
            <div className="absolute inset-0 bg-black/60 z-0"></div>
            <div className="container px-4 md:px-6 mx-auto relative z-10">
                <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-400">
                    What is Your Goal?
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">

                    {/* Brand Card */}
                    <div className="group relative overflow-hidden rounded-[2rem] border border-page-border bg-zinc-900 shadow-2xl hover:shadow-[0_0_50px_rgba(59,130,246,0.3)] transition-all duration-300">
                        {/* Background Image Placeholder */}
                        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-blue-900/40 via-blue-900/10 to-transparent pointer-events-none" />
                        <div className="absolute -top-32 -left-32 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />
                        <div className="p-8 md:p-12 space-y-8 z-10 relative">
                            <div className="space-y-4">
                                <div className="inline-flex items-center rounded-lg bg-blue-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-300 border border-blue-500/30">
                                    For Brands
                                </div>
                                <h3 className="text-3xl font-bold md:text-4xl text-text-primary">Scale Campaigns</h3>
                                <p className="text-zinc-400 text-lg max-w-sm leading-relaxed">
                                    Connect with authentic creators who align with your brand values. Scale your reach with verified engagement.
                                </p>
                                <Button size="lg" className="w-full sm:w-auto bg-white text-black hover:bg-zinc-200 shadow-xl mt-4 border-0" asChild>
                                    <Link href="/campaign/start">Start Hiring <ArrowRight className="ml-2 h-4 w-4" /></Link>
                                </Button>
                            </div>

                            {/* Mock Dashboard UI */}
                            <div className="relative h-64 w-full rounded-2xl bg-zinc-950 border border-zinc-800 p-4 shadow-inner group-hover:scale-[1.02] transition-transform duration-500 border-b-0 space-y-4 overflow-hidden">
                                <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
                                    <div className="h-3 w-24 bg-zinc-800 rounded"></div>
                                    <div className="h-4 w-16 bg-blue-500/20 text-blue-400 rounded flex items-center justify-center text-[10px] font-bold">ACTIVE</div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="bg-zinc-900 h-24 w-1/3 rounded-lg border border-zinc-800 p-2 space-y-2">
                                        <div className="h-2 w-8 bg-zinc-700 rounded"></div>
                                        <div className="h-4 w-12 bg-zinc-600 rounded"></div>
                                    </div>
                                    <div className="bg-zinc-900 h-24 w-2/3 rounded-lg border border-zinc-800 relative overflow-hidden">
                                        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-blue-500 via-blue-700 to-transparent opacity-30"></div>
                                        <div className="absolute bottom-2 left-2 w-4 h-8 bg-blue-500 rounded-t"></div>
                                        <div className="absolute bottom-2 left-8 w-4 h-12 bg-blue-600 rounded-t"></div>
                                        <div className="absolute bottom-2 left-14 w-4 h-6 bg-blue-400 rounded-t"></div>
                                    </div>
                                </div>
                                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full pointer-events-none" />
                            </div>

                        </div>
                    </div>


                    {/* Creator Card */}
                    <div className="group relative overflow-hidden rounded-[2rem] border border-page-border bg-zinc-900 shadow-2xl hover:shadow-[0_0_50px_rgba(168,85,247,0.3)] transition-all duration-300">
                        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-purple-900/40 via-purple-900/10 to-transparent pointer-events-none" />
                        <div className="absolute -top-32 -right-32 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />

                        <div className="p-8 md:p-12 space-y-8 z-10 relative">
                            <div className="space-y-4">
                                <div className="inline-flex items-center rounded-lg bg-purple-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-purple-300 border border-purple-500/30">
                                    For Creators
                                </div>
                                <h3 className="text-3xl font-bold md:text-4xl text-text-primary">Monetize Content</h3>
                                <p className="text-zinc-400 text-lg max-w-sm leading-relaxed">
                                    Monetize your creativity instantly. Get paid for verified views and engagement with transparent pricing.
                                </p>
                                <Button size="lg" variant="secondary" className="w-full sm:w-auto bg-black text-text-primary hover:bg-zinc-900 border border-zinc-800 shadow-xl mt-4" asChild>
                                    <Link href="/join">Start Earning <ArrowRight className="ml-2 h-4 w-4" /></Link>
                                </Button>
                            </div>

                            {/* Mock Mobile UI */}
                            <div className="relative h-64 w-full flex justify-center pt-8">
                                <div className="w-[80%] bg-zinc-950 border border-zinc-800 rounded-t-3xl shadow-2xl p-4 space-y-6 relative group-hover:-translate-y-2 transition-transform duration-500">
                                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-zinc-800 rounded-full"></div>

                                    <div className="flex justify-between items-center mt-2">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-zinc-500">Total Balance</span>
                                            <span className="text-2xl font-bold text-text-primary">$12,450</span>
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                                            <DollarSign className="w-4 h-4" />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 p-3 bg-zinc-900 rounded-xl border border-zinc-800">
                                            <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                                                <ArrowRight className="w-4 h-4 -rotate-45" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="h-2 w-20 bg-zinc-700 rounded mb-1"></div>
                                                <div className="h-2 w-12 bg-zinc-800 rounded"></div>
                                            </div>
                                            <div className="text-green-400 text-sm font-bold">+$450</div>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 bg-zinc-900 rounded-xl border border-zinc-800 opacity-60">
                                            <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                                                <Send className="w-4 h-4" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="h-2 w-16 bg-zinc-700 rounded mb-1"></div>
                                                <div className="h-2 w-10 bg-zinc-800 rounded"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
