"use client";

import React from "react";

export default function AppearanceSettingsPage() {
    return (
        <div className="bg-background text-foreground">
            <div className="max-w-4xl mx-auto py-6 md:py-10 px-4 md:px-6">
                <header className="mb-8 md:mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Appearance</h1>
                    <p className="text-muted-foreground mt-2">Customize how BennyBucks looks for you.</p>
                </header>

                <div className="max-w-2xl">
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <section>
                            <h3 className="text-lg font-bold mb-4">Theme Preference</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <button className="flex flex-col gap-3 p-4 rounded-2xl border border-blue-500 bg-blue-500/5 ring-1 ring-blue-500/20 group text-left">
                                    <div className="w-full aspect-[4/3] bg-zinc-900 rounded-lg flex flex-col gap-2 p-3 overflow-hidden shadow-inner">
                                        <div className="h-2 w-2/3 bg-zinc-800 rounded-full" />
                                        <div className="h-2 w-full bg-zinc-800 rounded-full" />
                                        <div className="h-6 w-1/3 bg-blue-500/40 rounded-md mt-auto" />
                                    </div>
                                    <span className="text-sm font-bold px-1 flex items-center justify-between">
                                        Dark Mode
                                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                                    </span>
                                </button>
                                <button className="flex flex-col gap-3 p-4 rounded-2xl border border-border bg-zinc-900/10 hover:bg-zinc-900/20 transition-all text-left group">
                                    <div className="w-full aspect-[4/3] bg-zinc-100 rounded-lg flex flex-col gap-2 p-3 overflow-hidden shadow-inner">
                                        <div className="h-2 w-2/3 bg-zinc-200 rounded-full" />
                                        <div className="h-2 w-full bg-zinc-200 rounded-full" />
                                        <div className="h-6 w-1/3 bg-zinc-300 rounded-md mt-auto" />
                                    </div>
                                    <span className="text-sm font-bold px-1 text-muted-foreground group-hover:text-foreground transition-colors">
                                        Light Mode
                                    </span>
                                </button>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
