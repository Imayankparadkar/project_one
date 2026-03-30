
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendIcon, Sparkles } from "lucide-react";

export function LandingForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        details: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        // Add submission logic here
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section className="py-24 bg-black border-t border-zinc-900 relative">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>

            <div className="container px-4 md:px-6 mx-auto max-w-5xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

                    <div className="space-y-8">
                        <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-text-primary leading-tight">
                            Start Your First Campaign
                        </h2>
                        <p className="text-zinc-400 text-lg leading-relaxed">
                            Tell us about your goals and we'll help get you started. Our team of experts will review your request and get back to you within 24 hours.
                        </p>
                        <div className="space-y-6 pt-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                                    <Sparkles className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-text-primary text-lg">Curated Creators</h4>
                                    <p className="text-zinc-500 text-sm">We match you with the perfect influencers.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500 border border-purple-500/20">
                                    <SendIcon className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-text-primary text-lg">Fast Turnaround</h4>
                                    <p className="text-zinc-500 text-sm">Launch your campaign in record time.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-zinc-900/50 backdrop-blur-md border border-page-border rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden group">
                        <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-blue-500/20 transition-colors duration-500" />

                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-zinc-300">
                                        Your Name
                                    </label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="John Doe"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="h-12 bg-black/50 border-zinc-800 focus:border-blue-500 text-text-primary placeholder:text-zinc-600 rounded-xl"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-zinc-300">
                                        Email Address
                                    </label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="h-12 bg-black/50 border-zinc-800 focus:border-blue-500 text-text-primary placeholder:text-zinc-600 rounded-xl"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="company" className="text-sm font-medium text-zinc-300">
                                    Company / Artist Name
                                </label>
                                <Input
                                    id="company"
                                    name="company"
                                    placeholder="Acme Inc."
                                    required
                                    value={formData.company}
                                    onChange={handleChange}
                                    className="h-12 bg-black/50 border-zinc-800 focus:border-blue-500 text-text-primary placeholder:text-zinc-600 rounded-xl"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="details" className="text-sm font-medium text-zinc-300">
                                    Campaign Details
                                </label>
                                <textarea
                                    id="details"
                                    name="details"
                                    className="flex min-h-[140px] w-full rounded-xl border border-zinc-800 bg-black/50 px-4 py-3 text-base ring-offset-background placeholder:text-zinc-600 focus-visible:outline-none focus:border-blue-500 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-text-primary resize-none"
                                    placeholder="Describe what you want to achieve..."
                                    required
                                    value={formData.details}
                                    onChange={handleChange}
                                />
                            </div>

                            <Button type="submit" size="lg" className="w-full h-14 text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-text-primary shadow-lg shadow-blue-500/20 border-0 rounded-xl transition-all hover:scale-[1.02]">
                                Submit Request <SendIcon className="ml-2 h-5 w-5" />
                            </Button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
}
