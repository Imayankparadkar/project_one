import { Youtube, Instagram, Calendar, Users } from "lucide-react";
import { CampaignFormData } from "./types";
import { mockUsers } from "@/lib/data/users";

export default function CampaignPreviewCard({ data }: { data: CampaignFormData }) {
    const activeUser = mockUsers[0];

    const formatCurrency = (val: string) => {
        const num = parseFloat(val) || 0;
        return num.toLocaleString('en-IN');
    };

    return (
        <div className="w-full sm:w-[300px] lg:w-[320px] max-w-full mx-auto border border-(--color-border) rounded-xl md:rounded-[22px] overflow-hidden shadow-2xl font-sans flex flex-col bg-(--color-bg-modal)">
            
            {/* --- TOP BANNER IMAGE --- */}
            <div className="relative w-full h-24 sm:h-36 bg-linear-to-br from-[#774db8] to-[#512c8a] shrink-0">
                {data.thumbnail ? (
                    <img
                        src={data.thumbnail}
                        alt="Preview"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    // Placeholder background if no thumbnail
                    <div className="w-full h-full bg-linear-to-br from-[#6b42b0] to-[#452378] flex items-center justify-center opacity-80" />
                )}
                
                {/* Badge: top-left */}
                <div className="absolute top-4 left-4">
                    <span className="px-3.5 py-1 bg-[#00c2ff] text-white text-[11px] font-bold rounded-full tracking-wide shadow-sm">
                        {data.type?.toUpperCase() || "UGC"}
                    </span>
                </div>

                {/* Date: bottom-right */}
                <div className="absolute bottom-3 right-3">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm dark:bg-[#e4e4e7] text-gray-800 text-[10px] sm:text-xs font-semibold rounded-full shadow-sm">
                        <Calendar className="w-3.5 h-3.5 text-gray-600" />
                        <span>01 Mar 2026 — {data.campaignEndDate && data.campaignEndDate.length > 0 ? data.campaignEndDate : "31 Mar 2026"}</span>
                    </div>
                </div>
            </div>

            {/* --- MAIN CONTENT --- */}
            <div className="p-2.5 sm:p-4 flex flex-col gap-2 sm:gap-4">
                {/* Title & Brand */}
                <div>
                    <div className="flex justify-between items-start gap-2 mb-0.5">
                        <h3 className="text-(--color-text-primary) font-bold text-[14px] sm:text-[17px] leading-tight truncate">
                            {data.name || `${activeUser?.name || "Brand"}'s Campaign`}
                        </h3>
                        {/* Social Icons */}
                        <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
                            {(!data.platforms || data.platforms.includes("Instagram")) && (
                                <div className="w-6 h-6 rounded-full border border-(--color-border) flex items-center justify-center bg-(--color-bg-secondary)">
                                    <Instagram className="w-3.5 h-3.5 text-[#E4405F]" />
                                </div>
                            )}
                            {(!data.platforms || data.platforms.includes("YouTube")) && (
                                <div className="w-6 h-6 rounded-full border border-(--color-border) flex items-center justify-center bg-(--color-bg-secondary)">
                                    <Youtube className="w-3.5 h-3.5 text-[#FF0000]" />
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Note: BrandName doesn't exist on CampaignFormData, fallback to activeUser or placeholder */}
                    <p className="text-(--color-text-muted) text-sm font-medium truncate">{(data as any).brandName || activeUser?.name || "Cadbury"}</p>
                </div>

                {/* Stats List */}
                <div className="flex flex-col gap-1.5 sm:gap-3">
                    {/* Creators */}
                    <div className="flex justify-between items-center text-[11px] sm:text-[13px]">
                        <span className="text-(--color-text-muted) font-medium">Creators</span>
                        <div className="flex items-center gap-1.5 text-(--color-text-primary) font-bold">
                            <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-(--color-text-secondary)" />
                            <span>30</span>
                        </div>
                    </div>

                    {/* Budget */}
                    <div className="flex justify-between items-center text-[11px] sm:text-[13px]">
                        <span className="text-(--color-text-muted) font-medium">Budget</span>
                        <span className="text-[#00c853] font-bold">
                            {data.budget ? `₹${formatCurrency(data.budget)}` : "₹100,000"}
                        </span>
                    </div>

                    {/* Budget Used & Progress Bar */}
                    <div className="flex flex-col gap-1 sm:gap-1.5">
                        <div className="flex justify-between items-center text-[11px] sm:text-[13px]">
                            <span className="text-(--color-text-muted) font-medium">Budget Used</span>
                            <span className="text-(--color-text-primary) font-bold">8%</span>
                        </div>
                        <div className="w-full h-1.5 bg-(--color-border) rounded-full overflow-hidden">
                            <div className="h-full bg-[#ff5e00] w-[8%] rounded-full" />
                        </div>
                    </div>
                </div>
            </div>

            {/* --- BOTTOM ROW --- */}
            <div className="border-t border-(--color-border) p-2.5 sm:p-4 flex flex-col items-center justify-center">
                <span className="text-(--color-text-muted) text-[10px] sm:text-[12px] font-medium mb-0.5 sm:mb-1">Rate per 1M Views</span>
                <span className="text-[#00c853] font-bold text-[16px] sm:text-[20px]">
                    {data.rewardPerView ? `₹${formatCurrency(data.rewardPerView)}` : "₹3.00"}
                </span>
            </div>
            
        </div>
    );
}