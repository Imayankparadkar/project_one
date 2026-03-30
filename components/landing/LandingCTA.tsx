
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Rocket } from "lucide-react";

export function LandingCTA() {
    return (
        <section className="py-32 bg-gradient-to-br from-blue-700 to-purple-800 text-text-primary relative overflow-hidden">
            {/* Background patterns */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-text-primary/10 rounded-full blur-[120px] -mr-32 -mt-32 animate-pulse-slow" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-text-primary/5 rounded-full blur-[100px] -ml-32 -mb-32" />

            <div className="container px-4 md:px-6 relative z-10 mx-auto text-center space-y-12">
                <h2 className="text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl max-w-4xl mx-auto leading-tight drop-shadow-xl">
                    Ready to Amplify Your Brand?
                </h2>

                <p className="mx-auto max-w-[700px] text-blue-100 md:text-2xl/relaxed font-medium">
                    Join thousands of visionary brands and creators on Bennybucks today.
                </p>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-6 w-full sm:w-auto mt-12">
                    <Button size="lg" className="h-16 px-10 text-lg font-bold bg-white text-blue-800 hover:bg-zinc-100 shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all hover:scale-105 border-0 rounded-full" asChild>
                        <Link href="/campaign/start">
                            Launch Your Campaign <Rocket className="ml-2 w-5 h-5" />
                        </Link>
                    </Button>
                    <div className="text-sm text-blue-200 mt-4 sm:mt-0 font-medium">
                        No credit card required for creators
                    </div>
                </div>
            </div>
        </section>
    );
}
