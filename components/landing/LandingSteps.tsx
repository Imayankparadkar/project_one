
import { BadgeCheck, CreditCard, LayoutDashboard, UserPlus } from "lucide-react";

const steps = [
    {
        number: "01",
        title: "Launch Campaigns",
        description: "Brands create detailed briefs and set budgets in minutes.",
        icon: LayoutDashboard,
        color: "from-blue-600 to-blue-400",
    },
    {
        number: "02",
        title: "Creators Create",
        description: "Vetted creators apply and produce authentic content.",
        icon: UserPlus,
        color: "from-purple-600 to-purple-400",
    },
    {
        number: "03",
        title: "AI Verification",
        description: "Our AI tracks engagement to ensure real impact.",
        icon: BadgeCheck,
        color: "from-green-500 to-emerald-400",
    },
    {
        number: "04",
        title: "Fast Payments",
        description: "Funds are released automatically upon milestone completion.",
        icon: CreditCard,
        color: "from-amber-500 to-yellow-400",
    },
];

export function LandingSteps() {
    return (
        <section className="py-24 bg-black relative overflow-hidden">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-soft-light"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

            <div className="container px-4 md:px-6 mx-auto relative z-10">
                <div className="text-center mb-20 space-y-4">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-text-primary">
                        How It Works
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        A seamless workflow designed for efficiency and transparency.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-[60px] left-[10%] w-[80%] h-[2px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent -z-10" />

                    {steps.map((step, index) => (
                        <div key={index} className="group relative flex flex-col items-center text-center space-y-6">

                            {/* Icon Container with Glow */}
                            <div className="relative">
                                <div className={`absolute -inset-4 bg-gradient-to-br ${step.color} rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>
                                <div className={`relative w-28 h-28 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl flex items-center justify-center transform group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-300 z-10`}>
                                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-10 rounded-3xl`}></div>
                                    <step.icon className="w-10 h-10 text-text-primary" />

                                    {/* Step Number Badge */}
                                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-500 shadow-lg">
                                        {step.number}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 max-w-[260px]">
                                <h3 className="text-xl font-bold text-text-primary group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-400 transition-all duration-300">
                                    {step.title}
                                </h3>
                                <p className="text-zinc-400 text-sm leading-relaxed">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
