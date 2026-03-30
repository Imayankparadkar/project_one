
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, LayoutDashboard, LineChart, ShieldCheck } from "lucide-react";
import Link from "next/link";

const steps = [
    {
        tag: "Campaign Management",
        title: "Create content that converts.",
        description: "Build detailed campaign briefs, set your budget, and define your target audience in minutes. Our intuitive dashboard makes it simple.",
        features: [
            "Customizable briefs",
            "Audience targeting",
            "Budget control",
        ],
        image: LayoutDashboard, // Placeholder component
        imageColor: "bg-blue-500",
        reverse: false,
    },
    {
        tag: "Analytics",
        title: "Track performance in real-time.",
        description: "Get detailed insights into your campaign performance. Track views, clicks, and engagement across all platforms.",
        features: [
            "Real-time data",
            "ROI tracking",
            "Exportable reports",
        ],
        image: LineChart, // Placeholder component
        imageColor: "bg-purple-500",
        reverse: true,
    },
    {
        tag: "Security",
        title: "Fraud-free influencer marketing.",
        description: "Our advanced AI detects and blocks bot activity, ensuring you only pay for genuine engagement from real people.",
        features: [
            "Bot detection",
            "Verified creators",
            "Secure payments",
        ],
        image: ShieldCheck, // Placeholder component
        imageColor: "bg-green-500",
        reverse: false,
    },
];

export function LandingFeatures() {
    return (
        <section className="py-24 bg-zinc-950 border-t border-zinc-900">
            <div className="container px-4 md:px-6 mx-auto space-y-32">
                {steps.map((step, index) => (
                    <div key={index} className={`flex flex-col lg:flex-row gap-16 lg:gap-24 items-center ${step.reverse ? 'lg:flex-row-reverse' : ''}`}>

                        {/* Text Content */}
                        <div className="flex-1 space-y-8 animate-fade-in-up">
                            <div className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs font-medium text-zinc-400 uppercase tracking-widest">
                                {step.tag}
                            </div>
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-text-primary leading-tight">
                                {step.title}
                            </h2>
                            <p className="text-zinc-400 text-lg leading-relaxed">
                                {step.description}
                            </p>
                            <ul className="space-y-4 pt-4">
                                {step.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-zinc-300">
                                        <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="pt-8">
                                <Button variant="link" className="text-blue-400 hover:text-blue-300 p-0 h-auto font-semibold text-base group" asChild>
                                    <Link href="/features">
                                        Learn more about {step.tag} <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        {/* Visual Content (Cards/Mockups) */}
                        <div className="flex-1 w-full perspective-1000">
                            <div className={`relative aspect-square w-full max-w-[500px] mx-auto rounded-3xl bg-zinc-900 border border-zinc-800 p-8 shadow-2xl flex items-center justify-center overflow-hidden group hover:border-zinc-700 transition-colors duration-500`}>

                                {/* Background Glow */}
                                <div className={`absolute -inset-20 opacity-20 blur-[80px] rounded-full ${step.imageColor} group-hover:opacity-30 transition-opacity duration-700`}></div>

                                {/* Abstract UI Elements */}
                                <div className="relative w-full h-full bg-zinc-950 rounded-2xl border border-zinc-800 shadow-inner flex flex-col overflow-hidden">
                                    <div className="h-10 border-b border-zinc-800 flex items-center px-4 gap-2 bg-zinc-900/50">
                                        <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                                    </div>
                                    <div className="p-6 flex-1 flex items-center justify-center text-zinc-600">
                                        <step.image className={`w-32 h-32 ${step.imageColor.replace('bg-', 'text-')} opacity-80`} />
                                    </div>

                                    {/* Floating Cards (Decoration) */}
                                    <div className="absolute top-20 -right-10 w-40 h-20 bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl transform rotate-12 opacity-80"></div>
                                    <div className="absolute bottom-10 -left-6 w-32 h-32 bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl transform -rotate-6 opacity-60"></div>
                                </div>

                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </section>
    );
}
