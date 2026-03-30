import React from "react";
import { Campaign } from "@/lib/data/campaigns";
import { Youtube, Instagram, Eye, Pause, CircleDollarSign, Pencil, ChevronRight, IndianRupee, Play } from "lucide-react";
import { cn } from "@/lib/utils";

// Helper for formatting large numbers (e.g. 8100000 -> 8.1M)
const formatNumber = (num: number) => {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num.toString();
};

const formatCurrency = (amount: number | string) => {
    const num = typeof amount === "string" ? parseFloat(amount) : amount;
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2,
    }).format(num || 0);
};



export default function CampaignCard({ campaign }: { campaign: Campaign }) {
    // Calculate progress percentage
    const progress = Math.min((campaign.paidOut / campaign.budget) * 100, 100) || 0;

    return (
        <div className="group bg-(--color-bg-card) border border-(--color-border-subtle) rounded-2xl overflow-hidden hover:border-(--color-border) hover:shadow-lg transition-all duration-200 p-3 md:p-4 flex flex-col md:flex-row gap-4 md:gap-6 w-full min-h-min md:h-auto lg:h-[240px] xl:h-[200px]">
            {/* Image section */}
            <div className="w-full md:w-56 lg:w-64 xl:w-72 h-48 md:h-auto md:min-h-[160px] lg:h-full rounded-xl overflow-hidden relative border border-(--color-border-subtle) shrink-0 bg-(--color-bg-tertiary)">
                {campaign.thumbnail ? (
                    <img suppressHydrationWarning src={campaign.thumbnail} alt={campaign.name} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-linear-to-br from-orange-400 to-orange-600" />
                )}
            </div>

            {/* Content section */}
            <div className="flex flex-col flex-1 py-1 md:pr-1 justify-between space-y-4 md:space-y-0 text-sm overflow-hidden">

                {/* Top Row: Title, Views, Submissions */}
                <div className="flex flex-col xl:flex-row xl:justify-between xl:items-start gap-2 lg:gap-3">
                    <h3 className="text-lg md:text-xl font-bold text-(--color-text-primary) leading-snug lg:pr-2 line-clamp-2">
                        {campaign.name}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-(--color-text-primary) shrink-0">
                        <div className="flex items-center gap-1.5">
                            <Eye className="w-4 h-4 text-(--color-text-secondary)" />
                            <span>{formatNumber(campaign.views)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Play className="w-4 h-4 text-(--color-text-secondary) fill-current opacity-70" />
                            <span>{formatNumber(campaign.creators)}</span>
                        </div>
                        <div className={cn(
                            "px-3 py-1.5 rounded-lg text-xs font-bold tracking-tight uppercase",
                            campaign.status === "Active" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" :
                                (campaign.status === "Draft" || campaign.status === "Pending") ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20" :
                                    campaign.status === "Paused" ? "bg-orange-500/10 text-orange-500 border border-orange-500/20" :
                                        "bg-slate-500/10 text-slate-500 border border-slate-500/20"
                        )}>
                            {campaign.status}
                        </div>
                    </div>
                </div>

                {/* Middle Row: Badges & Socials */}
                <div className="flex flex-wrap items-center gap-4 my-1 md:my-2">
                    <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[11px] font-bold rounded-full tracking-wide">
                            {campaign.type}
                        </span>
                        <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[11px] font-bold rounded-full tracking-wide">
                            {campaign.category}
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        {campaign.platforms?.includes("Instagram") && <Instagram className="w-[18px] h-[18px] text-(--color-text-primary)" />}
                        {campaign.platforms?.includes("Youtube") && <Youtube className="w-[18px] h-[18px] text-(--color-text-primary)" />}
                    </div>
                </div>

                {/* Bottom Row: Progress & Actions */}
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mt-auto pt-2">

                    {/* Progress */}
                    <div className="flex flex-col xl:flex-row xl:flex-nowrap sm:flex-row sm:flex-wrap sm:items-center gap-1.5 xl:gap-1 text-sm sm:text-xs xl:text-[12px] font-bold text-(--color-text-primary) w-full lg:w-auto">
                        <div className="flex items-center justify-between sm:justify-start gap-1 w-full xl:w-auto sm:w-auto shrink-0 tracking-tight">
                            <span className="text-(--color-text-secondary) shrink-0">{formatCurrency(campaign.paidOut)} / {formatCurrency(campaign.budget)}</span>
                        </div>

                        <div className="flex items-center gap-1.5 w-full xl:w-auto sm:w-auto sm:flex-1 shrink-0">
                            <div className="flex-1 sm:w-16 md:w-20 lg:w-24 xl:w-16 2xl:w-32 h-1.5 bg-(--color-border) rounded-full overflow-hidden shrink-0">
                                <div
                                    className="h-full bg-gray-400"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>

                            <span className="shrink-0">{Math.round(progress)}%</span>
                        </div>

                        <span className="text-(--color-text-secondary) font-normal text-xs sm:text-[11px] xl:text-[10px] shrink-0 whitespace-nowrap tracking-tight">
                            {formatCurrency(campaign.rewardPerView)} / 1k views
                        </span>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-row flex-wrap xl:flex-nowrap items-center gap-2 lg:gap-3 shrink-0 mt-2 xl:mt-0">

                        <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 lg:px-4 py-2 rounded-xl bg-(--color-bg-tertiary) border border-(--color-border-subtle) text-sm font-semibold transition-colors text-(--color-text-primary) whitespace-nowrap">
                            <Pencil className="w-4 h-4 fill-current opacity-70 shrink-0" />
                            <span className="inline sm:hidden lg:inline">Edit</span>
                        </button>
                        <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 lg:px-4 py-2 rounded-xl bg-(--color-bg-tertiary) border border-(--color-border-subtle) text-sm font-semibold transition-colors text-(--color-text-primary) whitespace-nowrap">
                            <Pause className="w-4 h-4 fill-current opacity-70 shrink-0" />
                            <span className="inline sm:hidden lg:inline">{campaign.status === "Paused" ? "Paused" : "Pause"}</span>
                        </button>
                        <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} className="flex-1 sm:flex-none btn-get-started border group flex items-center justify-center gap-2 px-4 md:px-5 py-2 rounded-xl font-semibold text-sm shadow-lg transition-all duration-200 hover:shadow-orange-900/20 active:scale-[0.94] text-(--color-text-primary) whitespace-nowrap">
                            {campaign.status === "Draft" ? (
                                <Pencil className="w-4 h-4 shrink-0" />
                            ) : (
                                <IndianRupee className="w-4 h-4 shrink-0" />
                            )}
                            <span>{campaign.status === "Draft" ? "Draft" : "Fund"}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
