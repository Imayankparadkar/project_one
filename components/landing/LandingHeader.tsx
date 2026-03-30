
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, SparklesIcon } from "lucide-react";

export function LandingHeader() {
    return (
        <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
            <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-8 mx-auto">
                <div className="flex items-center gap-2">
                    {/* Logo */}
                    <Link href="/home" className="flex items-center gap-2 font-bold text-xl md:text-2xl tracking-tight text-foreground hover:opacity-80 transition-opacity">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            <SparklesIcon className="h-5 w-5 fill-current" />
                        </div>
                        Bennybucks
                    </Link>
                </div>

                <nav className="flex items-center gap-4">
                    <Button variant="ghost" asChild className="hidden md:flex">
                        <Link href="/login">Log in</Link>
                    </Button>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" asChild className="hidden sm:flex">
                            <Link href="/campaign/start">Launch Your Campaign</Link>
                        </Button>
                        <Button asChild>
                            <Link href="/join">Join as Creator</Link>
                        </Button>
                    </div>
                </nav>
            </div>
        </header>
    );
}
