
import Link from "next/link";
import { SparklesIcon, Instagram, Twitter, Facebook, Linkedin } from "lucide-react";

export function LandingFooter() {
    return (
        <footer className="bg-black border-t border-zinc-900 pt-24 pb-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none"></div>

            <div className="container px-4 md:px-6 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">

                <div className="space-y-6">
                    <Link href="/home" className="flex items-center gap-2 font-bold text-2xl tracking-tight text-text-primary hover:opacity-80 transition-opacity w-fit">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-text-primary shadow-[0_0_15px_rgba(37,99,235,0.5)]">
                            <SparklesIcon className="h-5 w-5 fill-current" />
                        </div>
                        Bennybucks
                    </Link>
                    <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
                        The platform empowering creators and brands to build authentic relationships and drive real results.
                    </p>
                    <div className="flex gap-4">
                        <Link href="#" className="p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-text-primary hover:bg-zinc-800 transition-all duration-300">
                            <Instagram className="h-5 w-5" />
                            <span className="sr-only">Instagram</span>
                        </Link>
                        <Link href="#" className="p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-text-primary hover:bg-zinc-800 transition-all duration-300">
                            <Twitter className="h-5 w-5" />
                            <span className="sr-only">Twitter</span>
                        </Link>
                        <Link href="#" className="p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-text-primary hover:bg-zinc-800 transition-all duration-300">
                            <Facebook className="h-5 w-5" />
                            <span className="sr-only">Facebook</span>
                        </Link>
                        <Link href="#" className="p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-text-primary hover:bg-zinc-800 transition-all duration-300">
                            <Linkedin className="h-5 w-5" />
                            <span className="sr-only">LinkedIn</span>
                        </Link>
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-sm font-bold tracking-wider uppercase text-zinc-500">Platform</h3>
                    <ul className="space-y-4 text-sm text-zinc-400">
                        <li><Link href="/home" className="hover:text-blue-400 transition-colors">Home</Link></li>
                        <li><Link href="/join" className="hover:text-blue-400 transition-colors">For Creators</Link></li>
                        <li><Link href="/campaign/start" className="hover:text-blue-400 transition-colors">For Brands</Link></li>
                        <li><Link href="#" className="hover:text-blue-400 transition-colors">Pricing</Link></li>
                    </ul>
                </div>

                <div className="space-y-6">
                    <h3 className="text-sm font-bold tracking-wider uppercase text-zinc-500">Support</h3>
                    <ul className="space-y-4 text-sm text-zinc-400">
                        <li><Link href="#" className="hover:text-blue-400 transition-colors">Help Center</Link></li>
                        <li><Link href="#" className="hover:text-blue-400 transition-colors">Contact Us</Link></li>
                        <li><Link href="#" className="hover:text-blue-400 transition-colors">FAQ</Link></li>
                        <li><Link href="#" className="hover:text-blue-400 transition-colors">Community</Link></li>
                    </ul>
                </div>

                <div className="space-y-6">
                    <h3 className="text-sm font-bold tracking-wider uppercase text-zinc-500">Legal</h3>
                    <ul className="space-y-4 text-sm text-zinc-400">
                        <li><Link href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
                        <li><Link href="#" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
                        <li><Link href="#" className="hover:text-blue-400 transition-colors">Cookie Policy</Link></li>
                    </ul>
                </div>
            </div>

            <div className="container px-4 md:px-6 mx-auto mt-20 pt-8 border-t border-zinc-900 text-center text-sm text-zinc-600">
                <p>&copy; {new Date().getFullYear()} Bennybucks Inc. All rights reserved.</p>
            </div>
        </footer>
    );
}
