"use client";

import React from "react";
import { Shield, Eye, Lock } from "lucide-react";

export default function PrivacySettingsPage() {
    return (
        <div className="bg-background text-foreground">
            <div className="max-w-4xl mx-auto py-6 md:py-10 px-4 md:px-6">
                <header className="mb-8 md:mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Privacy & Safety</h1>
                    <p className="text-muted-foreground mt-2">Manage your data and privacy settings.</p>
                </header>

                <div className="max-w-2xl">
                    <div className="py-20 flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in duration-300">
                        <div className="p-4 bg-zinc-900 rounded-3xl">
                            <Shield size={32} className="text-muted-foreground/30" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">Privacy Controls</h3>
                            <p className="text-muted-foreground">This section is coming soon.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
