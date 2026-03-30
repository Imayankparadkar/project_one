import { Play } from "lucide-react";

interface VideoPlaceholderProps {
    poster?: string;
    className?: string;
}

export function VideoPlaceholder({ className }: VideoPlaceholderProps) {
    return (
        <div className={`relative overflow-hidden rounded-xl border border-page-border bg-zinc-900 aspect-video group cursor-pointer ${className}`}>
            {/* Abstract Background pattern for placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-950 opacity-50" />
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-text-primary/10 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                    <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse" />
                    <Play className="h-8 w-8 text-text-primary fill-current relative z-10 ml-1" />
                </div>
            </div>
            <div className="absolute bottom-4 right-4 px-2 py-1 bg-black/50 backdrop-blur-md rounded text-xs font-mono text-text-primary/70 border border-page-border">
                VIDEO CONTENT
            </div>
        </div>
    );
}
