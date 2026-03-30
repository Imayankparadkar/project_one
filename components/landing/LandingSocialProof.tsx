
import { Box, DollarSign, TrendingUp, Users } from "lucide-react";

const stats = [
    { label: "Paid to Creators", value: "$25M+", icon: DollarSign },
    { label: "Active Creators", value: "10K+", icon: Users },
    { label: "Clips Generated", value: "500K+", icon: Box },
    { label: "Campaigns Launched", value: "1200+", icon: TrendingUp },
];

const brands = [
    "Acme Corp", "TechFlow", "GlobalStyles", "LuxeLife", "NextGen", "Vitality"
];

export function LandingSocialProof() {
    return (
        <section className="py-20 bg-muted/40 border-y border-border">
            <div className="container px-4 md:px-6 mx-auto space-y-20">

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center bg-card p-8 rounded-3xl border border-border shadow-sm">
                    {stats.map((stat, i) => (
                        <div key={i} className="flex flex-col items-center justify-center space-y-4 group">
                            <div className="p-4 rounded-full bg-primary/10 text-primary transition-all duration-300">
                                <stat.icon className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="text-4xl font-extrabold tracking-tight text-foreground mb-1">
                                    {stat.value}
                                </h3>
                                <p className="text-muted-foreground font-medium text-sm">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Brands */}
                <div className="space-y-10 text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        TRUSTED BY INDUSTRY LEADERS
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500 px-4">
                        {brands.map((brand, i) => (
                            <div key={i} className="flex items-center justify-center font-black text-2xl md:text-3xl text-foreground hover:text-primary transition-colors cursor-default select-none tracking-tighter">
                                {brand}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
