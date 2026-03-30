"use client";

import React, { useState, useRef, useMemo } from "react";
import { useParams } from "next/navigation";
import {
    ChevronLeft,
    ChevronRight,
    Youtube,
    Instagram,
    Eye,
    Search,
    FolderOpen,
    IndianRupee,
} from "lucide-react";
import { generateChartData, DayData } from "@/lib/data/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import SubmissionsTable from "@/components/brand/campaigns/analytics/SubmissionsTable";
import { mockCampaigns } from "@/lib/data/campaigns";

// --- Date Picker helpers ---
const QUICK_PRESETS = [
    { label: "Today", days: 0 },
    { label: "Last 7 days", days: 7 },
    { label: "Last 30 days", days: 30 },
    { label: "This month", days: -1 },  // special
    { label: "This year", days: -2 },  // special
    { label: "All time", days: -3 },  // special
];

function getPresetRange(label: string): { start: Date; end: Date } {
    const now = new Date();
    const end = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    if (label === "Today") {
        return { start: new Date(end), end };
    } else if (label === "Last 7 days") {
        const start = new Date(end); start.setDate(end.getDate() - 6);
        return { start, end };
    } else if (label === "Last 30 days") {
        const start = new Date(end); start.setDate(end.getDate() - 29);
        return { start, end };
    } else if (label === "This month") {
        const start = new Date(now.getFullYear(), now.getMonth(), 1);
        return { start, end };
    } else if (label === "This year") {
        const start = new Date(now.getFullYear(), 0, 1);
        return { start, end };
    } else { // All time — just use a wide range
        const start = new Date(2020, 0, 1);
        return { start, end };
    }
}

function formatRangeLabel(start: Date, end: Date): string {
    const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" };
    if (start.toDateString() === end.toDateString()) {
        return start.toLocaleDateString("en-US", opts);
    }
    if (start.getFullYear() === end.getFullYear()) {
        return `${start.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${end.toLocaleDateString("en-US", opts)}`;
    }
    return `${start.toLocaleDateString("en-US", opts)} – ${end.toLocaleDateString("en-US", opts)}`;
}

const DAY_NAMES = ["M", "T", "W", "T", "F", "S", "S"];
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function isSameDay(a: Date, b: Date) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function isInRange(d: Date, start: Date, end: Date) {
    return d >= start && d <= end;
}

// --- Components ---

function SocialToggleButton({
    active,
    onClick,
    icon: Icon,
    disabled
}: {
    active: boolean;
    onClick: () => void;
    icon: React.ElementType;
    disabled: boolean;
}) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "w-8 h-8 flex items-center justify-center rounded-lg border transition-all duration-200",
                active
                    ? "bg-orange-500/10 border-orange-500/30 text-(--color-text-secondary)"
                    : "bg-(--color-bg-secondary) border-(--color-border) text-(--color-text-muted) hover:text-(--color-text-secondary)",
                disabled && "cursor-not-allowed"
            )}
            disabled={disabled}
        >
            <Icon className={cn("w-4 h-4", disabled && "opacity-60")} />
        </button>
    );
}

// --- Constants for Chart Colors ---
const CHART_THEMES = {
    Views: { button: "bg-purple-500 text-white", line: "#E879F9" },
    Likes: { button: "bg-indigo-500 text-white", line: "#818CF8" },
    Comments: { button: "bg-cyan-500 text-white", line: "#22D3EE" },
    Shares: { button: "bg-orange-500 text-white", line: "#FB923C" },
};

type ChartTab = keyof typeof CHART_THEMES;

export default function CampaignAnalyticsPage() {
    const params = useParams();
    const campaignId = params.campaign as string;
    const campaign = mockCampaigns.find(c => c.id === campaignId);

    const [platforms, setPlatforms] = useState<Record<string, boolean>>(() => {
        const initial: Record<string, boolean> = {};
        campaign?.platforms.forEach(p => {
            initial[p.toLowerCase()] = true;
        });
        return initial;
    });

    const isYoutubeAvailable = useMemo(() => campaign?.platforms.some(p => p.toLowerCase() === "youtube"), [campaign]);
    const isInstagramAvailable = useMemo(() => campaign?.platforms.some(p => p.toLowerCase() === "instagram"), [campaign]);

    // --- Date Picker State ---
    const [activePreset, setActivePreset] = useState("Last 30 days");
    const [dateRange, setDateRange] = useState<{ start: Date; end: Date }>(getPresetRange("Last 30 days"));

    // --- Dynamic Data Logic ---
    const allData = useMemo(() => generateChartData(400), []);
    const filteredData = useMemo(() => {
        const startStr = dateRange.start.toISOString().split("T")[0];
        const endStr = dateRange.end.toISOString().split("T")[0];
        return allData.filter((d: DayData) => d.dateKey >= startStr && d.dateKey <= endStr);
    }, [allData, dateRange]);

    const totals = useMemo(() => {
        const sum = { youtube: 0, instagram: 0, tiktok: 0 };
        filteredData.forEach((d: DayData) => {
            sum.youtube += d.youtube;
            sum.instagram += d.instagram;
            sum.tiktok += d.tiktok;
        });
        return sum;
    }, [filteredData]);

    const activeViews = (platforms.youtube ? totals.youtube : 0) + (platforms.instagram ? totals.instagram : 0);
    const activePayout = activeViews * parseFloat(campaign?.rewardPerView || "0.05");

    const chartDisplayData = useMemo(() => {
        return filteredData.map((d: DayData) => ({
            ...d,
            displayValue: (platforms.youtube ? d.youtube : 0) + (platforms.instagram ? d.instagram : 0)
        }));
    }, [filteredData, platforms]);

    const [pendingStart, setPendingStart] = useState<Date | null>(null);
    const [hoverDate, setHoverDate] = useState<Date | null>(null);
    const [calendarDate, setCalendarDate] = useState<Date>(() => new Date());
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const datePickerRef = useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
                setIsDatePickerOpen(false);
                setPendingStart(null);
                setHoverDate(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Build calendar cells for the current calendar month
    const calendarDays = useMemo(() => {
        const year = calendarDate.getFullYear();
        const month = calendarDate.getMonth();
        const firstDay = new Date(year, month, 1);
        let startOffset = firstDay.getDay() - 1;
        if (startOffset < 0) startOffset = 6;
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrev = new Date(year, month, 0).getDate();
        const cells: { date: Date; current: boolean }[] = [];
        for (let i = startOffset - 1; i >= 0; i--) {
            cells.push({ date: new Date(year, month - 1, daysInPrev - i), current: false });
        }
        for (let d = 1; d <= daysInMonth; d++) {
            cells.push({ date: new Date(year, month, d), current: true });
        }
        while (cells.length % 7 !== 0) {
            cells.push({ date: new Date(year, month + 1, cells.length - daysInMonth - startOffset + 1), current: false });
        }
        return cells;
    }, [calendarDate]);

    // The visible range while hovering (preview)
    const previewRange = pendingStart && hoverDate
        ? { start: pendingStart <= hoverDate ? pendingStart : hoverDate, end: pendingStart <= hoverDate ? hoverDate : pendingStart }
        : null;
    const displayRange = previewRange ?? dateRange;

    const handleDayClick = (date: Date) => {
        if (!pendingStart) {
            // First click: set start
            setPendingStart(date);
            setActivePreset("Custom");
        } else {
            // Second click: complete range
            const start = pendingStart <= date ? pendingStart : date;
            const end = pendingStart <= date ? date : pendingStart;
            setDateRange({ start, end });
            setPendingStart(null);
            setHoverDate(null);
            setIsDatePickerOpen(false);
        }
    };

    const handlePresetSelect = (preset: string) => {
        setActivePreset(preset);
        const range = getPresetRange(preset);
        setDateRange(range);
        setPendingStart(null);
        setHoverDate(null);
        setCalendarDate(new Date(range.end));
        setIsDatePickerOpen(false);
    };

    const prevMonth = () => setCalendarDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1));
    const nextMonth = () => setCalendarDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1));

    // Button label — show formatted range if custom or preset name otherwise
    const buttonLabel = activePreset === "Custom"
        ? formatRangeLabel(dateRange.start, dateRange.end)
        : activePreset;

    // Chart State
    const [activeChartTab, setActiveChartTab] = useState<ChartTab>("Views");

    const togglePlatform = (key: keyof typeof platforms) => {
        setPlatforms((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    // --- Chart Logic ---
    const currentTheme = CHART_THEMES[activeChartTab];

    if (!campaign) {
        return (
            <div className="flex flex-col items-center justify-center p-8 h-full text-(--color-text-primary)">
                <h2 className="text-2xl font-bold mb-4">Campaign Not Found</h2>
            </div>
        );
    }

    const formatMetrics = (num: number) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
        if (num >= 1000) return (num / 1000).toFixed(1) + "K";
        return num.toString();
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="flex-col h-full bg-campaigns-page text-(--color-text-primary) overflow-y-auto w-full pb-32 lg:pb-0">
            <div className="p-4 lg:p-8 pb-4 max-w-7xl mx-auto w-full">
                {/* Mobile back button: goes to sidebar */}
                <Link href={`/brand/campaigns/${campaignId}`} className="flex lg:hidden items-center gap-2 text-(--color-text-secondary) hover:text-(--color-text-primary) mb-6 transition-colors font-medium">
                    <ChevronLeft className="w-5 h-5" />
                    <span>Back to Menu</span>
                </Link>

                {/* Desktop back button: goes to campaigns list */}
                <Link href="/brand/campaigns" className="hidden lg:flex items-center gap-2 text-(--color-text-secondary) hover:text-(--color-text-primary) mb-6 transition-colors font-medium">
                    <ChevronLeft className="w-5 h-5" />
                    <span>Back to Campaigns</span>
                </Link>

                {/* --- HEADER --- */}
                <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 mb-8">
                    <div>
                        <h1 className=" text-2xl font-bold mb-1">Analytics: {campaign.name}</h1>
                        <p className="text-(--color-text-muted) text-xs font-medium tracking-wide">
                            {formatRangeLabel(dateRange.start, dateRange.end)}
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2 mr-2">
                            <SocialToggleButton active={!!platforms.youtube} disabled={!isYoutubeAvailable} onClick={() => togglePlatform("youtube")} icon={Youtube} />
                            <SocialToggleButton active={!!platforms.instagram} disabled={!isInstagramAvailable} onClick={() => togglePlatform("instagram")} icon={Instagram} />
                        </div>

                        <div className="relative" ref={datePickerRef}>
                            <button
                                onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                                className={cn(
                                    "h-8 px-4 rounded-lg border flex items-center gap-2 text-xs font-medium transition-all",
                                    isDatePickerOpen
                                        ? "border-orange-500/60 bg-(--color-bg-input) text-(--color-text-primary)"
                                        : "border-(--color-border) bg-(--color-bg-secondary) text-(--color-text-secondary) hover:text-(--color-text-primary) hover:bg-(--color-surface-hover)"
                                )}
                            >
                                {buttonLabel}
                            </button>

                            <AnimatePresence>
                                {isDatePickerOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 5, scale: 0.98 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 5, scale: 0.98 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute top-full left-0 xl:left-auto xl:right-0 mt-2 bg-(--color-bg-card) border border-(--color-border) shadow-2xl rounded-xl z-30 overflow-hidden flex flex-col xl:flex-row w-[min(calc(100vw-1.5rem),300px)] xl:w-auto"
                                    >
                                        {/* Mobile: horizontal scroll chip row — hidden on sm+ */}
                                        <div className="flex xl:hidden overflow-x-auto no-scrollbar gap-2 p-3 border-b border-(--color-border) shrink-0">
                                            {QUICK_PRESETS.map(({ label }) => (
                                                <button
                                                    key={label}
                                                    onClick={() => handlePresetSelect(label)}
                                                    className={cn(
                                                        "shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors whitespace-nowrap",
                                                        activePreset === label
                                                            ? "bg-(--color-bg-input-foc) border-orange-500/40 text-(--color-text-primary)"
                                                            : "border-(--color-border) text-(--color-text-secondary) hover:bg-(--color-surface-hover)"
                                                    )}
                                                >
                                                    {label}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Desktop: vertical sidebar — hidden on mobile */}
                                        <div className="hidden xl:flex w-[160px] border-r border-(--color-border) p-3 flex-col gap-0.5 shrink-0">
                                            <p className="text-xs font-semibold text-(--color-text-muted) uppercase tracking-wider mb-2 px-2">Quick select</p>
                                            {QUICK_PRESETS.map(({ label }) => (
                                                <button
                                                    key={label}
                                                    onClick={() => handlePresetSelect(label)}
                                                    className={cn(
                                                        "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                                                        activePreset === label
                                                            ? "bg-(--color-bg-input-foc) text-(--color-text-primary) font-medium"
                                                            : "text-(--color-text-secondary) hover:bg-(--color-surface-hover) hover:text-(--color-text-primary)"
                                                    )}
                                                >
                                                    {label}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Calendar */}
                                        <div className="p-3 xl:p-4 flex-1 min-w-0 xl:min-w-[280px]">
                                            {/* Month navigation */}
                                            <div className="flex items-center justify-between mb-3">
                                                <button
                                                    onClick={prevMonth}
                                                    className="p-1 rounded-md text-(--color-text-secondary) hover:bg-(--color-surface-hover) transition-colors"
                                                >
                                                    <ChevronLeft size={16} />
                                                </button>
                                                <span className="text-sm font-semibold text-(--color-text-primary)">
                                                    {MONTH_NAMES[calendarDate.getMonth()]} {calendarDate.getFullYear()}
                                                </span>
                                                <button
                                                    onClick={nextMonth}
                                                    className="p-1 rounded-md text-(--color-text-secondary) hover:bg-(--color-surface-hover) transition-colors"
                                                >
                                                    <ChevronRight size={16} />
                                                </button>
                                            </div>

                                            {/* Pending hint */}
                                            {pendingStart && (
                                                <p className="text-xs text-center text-orange-500/80 font-medium mb-2">
                                                    Now click an end date
                                                </p>
                                            )}

                                            {/* Day headers */}
                                            <div className="grid grid-cols-7 place-items-center mb-0.5">
                                                {DAY_NAMES.map((d, i) => (
                                                    <div key={i} className="w-7 xl:w-9 text-center text-[9px] xl:text-[10px] font-bold text-(--color-text-muted) py-0.5">{d}</div>
                                                ))}
                                            </div>

                                            {/* Calendar cells */}
                                            <div className="grid grid-cols-7 place-items-center">
                                                {calendarDays.map(({ date, current }, i) => {
                                                    const inRange = isInRange(date, displayRange.start, displayRange.end);
                                                    const isStart = isSameDay(date, displayRange.start);
                                                    const isEnd = isSameDay(date, displayRange.end);
                                                    const isToday = isSameDay(date, new Date());
                                                    const isPending = pendingStart && isSameDay(date, pendingStart);
                                                    return (
                                                        <div key={i} className="w-7 h-7 xl:w-9 xl:h-9 flex items-center justify-center">
                                                            <div
                                                                onClick={() => handleDayClick(date)}
                                                                onMouseEnter={() => pendingStart && setHoverDate(date)}
                                                                onMouseLeave={() => pendingStart && setHoverDate(null)}
                                                                className={cn(
                                                                    "w-6 h-6 xl:w-8 xl:h-8 flex items-center justify-center rounded-md text-xs xl:text-sm cursor-pointer transition-all select-none",
                                                                    !current && "opacity-30",
                                                                    current && inRange && !isStart && !isEnd && "bg-(--color-bg-input) text-(--color-text-primary)",
                                                                    current && (isStart || isEnd || isPending) && "bg-(--color-bg-input-foc) text-(--color-text-primary) font-semibold border border-orange-500/40",
                                                                    current && isToday && !inRange && !isPending && "border border-(--color-border-input) text-(--color-text-primary)",
                                                                    current && !inRange && !isToday && !isPending && "text-(--color-text-secondary) hover:bg-(--color-surface-hover)",
                                                                    !current && "text-(--color-text-muted) hover:bg-(--color-surface-hover)"
                                                                )}
                                                            >
                                                                {date.getDate()}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* --- STATS GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
                    {/* Card 1: Views */}
                    <div className="group relative overflow-visible rounded-xl border border-(--color-border) bg-(--color-bg-card) p-5 h-[110px] flex flex-col justify-between cursor-default transition-all duration-300 hover:shadow-lg hover:border-(--color-border-subtle)">
                        <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[120%] h-32 bg-purple-500/5 dark:bg-purple-500/30 blur-2xl group-hover:bg-purple-500/10 dark:group-hover:bg-purple-500/40 transition-all duration-500 rounded-[100%]" />
                        </div>
                        <div className="flex items-center gap-2 z-10">
                            <div className="p-1.5 rounded-full bg-purple-500/5 dark:bg-purple-500/10 text-(--color-text-secondary)"><Eye className="w-3.5 h-3.5" /></div>
                            <span className="text-xs font-medium text-(--color-text-secondary)">Views</span>
                        </div>
                        <div className="text-3xl font-bold text-(--color-text-primary) z-10">{formatMetrics(campaign.views || 0)}</div>
                        <div className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-[300px] bg-(--color-bg-tertiary) border border-(--color-border) rounded-xl p-5 shadow-2xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none z-50">
                            <h4 className="text-sm font-bold text-(--color-text-primary) mb-2">Views Generated</h4>
                            <p className="text-3xl font-bold text-(--color-text-primary) mb-3">{formatMetrics(campaign.views || 0)}</p>
                            <p className="text-xs text-(--color-text-secondary) leading-relaxed">Total approved views from all video submissions during the selected time period. This metric measures content reach.</p>
                        </div>
                    </div>
                    {/* Card 2: Payouts */}
                    <div className="group relative overflow-visible rounded-xl border border-(--color-border) bg-(--color-bg-card) p-5 h-[110px] flex flex-col justify-between cursor-default transition-all duration-300 hover:shadow-lg hover:border-(--color-border-subtle)">
                        <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[120%] h-32 bg-indigo-500/5 dark:bg-indigo-500/30 blur-2xl group-hover:bg-indigo-500/10 dark:group-hover:bg-indigo-500/40 transition-all duration-500 rounded-[100%]" />
                        </div>
                        <div className="flex items-center gap-2 z-10">
                            <div className="p-1.5 rounded-full bg-indigo-500/5 dark:bg-indigo-500/10 text-(--color-text-secondary)"><IndianRupee className="w-3.5 h-3.5" /></div>
                            <span className="text-xs font-medium text-(--color-text-secondary)">Total Payouts (Gross)</span>
                        </div>
                        <div className="text-3xl font-bold text-(--color-text-primary) z-10">{formatCurrency(campaign.paidOut || 0)}</div>
                        <div className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-[300px] bg-(--color-bg-tertiary) border border-(--color-border) rounded-xl p-5 shadow-2xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none z-50">
                            <h4 className="text-sm font-bold text-(--color-text-primary) mb-2">Total Payouts (Gross)</h4>
                            <p className="text-3xl font-bold text-(--color-text-primary) mb-3">{formatCurrency(campaign.paidOut || 0)}</p>
                            <p className="text-xs text-(--color-text-secondary) leading-relaxed">Total amount paid to creators for approved video submissions during the selected period. Payments are processed automatically.</p>
                        </div>
                    </div>
                    {/* Card 3: CPM */}
                    <div className="group relative overflow-visible rounded-xl border border-(--color-border) bg-(--color-bg-card) p-5 h-[110px] flex flex-col justify-between cursor-default transition-all duration-300 hover:shadow-lg hover:border-(--color-border-subtle)">
                        <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[120%] h-32 bg-cyan-500/5 dark:bg-cyan-500/30 blur-2xl group-hover:bg-cyan-500/10 dark:group-hover:bg-cyan-500/40 transition-all duration-500 rounded-[100%]" />
                        </div>
                        <div className="absolute top-4 right-4 z-10 text-right"><span className="text-[10px] font-bold text-green-500 tracking-wide block leading-tight"><span className="block sm:inline xl:block 2xl:inline">Running</span> <span className="block sm:inline xl:block 2xl:inline">Efficiently</span></span></div>
                        <div className="flex items-center gap-2 z-10">
                            <div className="p-1.5 rounded-full bg-cyan-500/5 dark:bg-cyan-500/10 text-(--color-text-secondary)"><Search className="w-3.5 h-3.5" /></div>
                            <span className="text-xs font-medium text-(--color-text-secondary)">CPM</span>
                        </div>
                        <div className="grid grid-cols-2 z-10 mt-1 w-full relative">
                            <div className="pr-2"><div className="text-2xl font-bold text-(--color-text-primary)">₹2.50</div><div className="text-[10px] text-(--color-text-muted) mt-0.5 truncate">Effective CPM</div></div>
                            <div className="pl-4 border-l border-(--color-border)"><div className="text-2xl font-bold text-(--color-text-secondary)">₹{campaign.rewardPerView || 3.00}</div><div className="text-[10px] text-(--color-text-muted) mt-0.5 truncate">Original CPM</div></div>
                        </div>
                        <div className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-[300px] bg-(--color-bg-tertiary) border border-(--color-border) rounded-xl p-5 shadow-2xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none z-50">
                            <h4 className="text-sm font-bold text-(--color-text-primary) mb-2">Cost Per Mille (CPM)</h4>
                            <p className="text-3xl font-bold text-(--color-text-primary) mb-1">₹2.50</p>
                            <p className="text-xs font-bold text-green-500 mb-3">Running efficiently</p>
                            <p className="text-xs text-(--color-text-secondary) leading-relaxed">Your effective CPM of ₹2.50 is below your original rate of ₹{campaign.rewardPerView || 3.00}, indicating optimal spending efficiency.</p>
                        </div>
                    </div>
                    {/* Card 4: Submissions */}
                    <div className="group relative overflow-visible rounded-xl border border-(--color-border) bg-(--color-bg-card) p-5 h-[110px] flex flex-col justify-between cursor-default transition-all duration-300 hover:shadow-lg hover:border-(--color-border-subtle)">
                        <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[120%] h-32 bg-orange-500/5 dark:bg-orange-500/30 blur-2xl group-hover:bg-orange-500/10 dark:group-hover:bg-orange-500/40 transition-all duration-500 rounded-[100%]" />
                        </div>
                        <div className="absolute top-4 right-4 z-10"><span className="text-[10px] font-bold text-orange-500 tracking-wide">{campaign.approval || 0}%</span></div>
                        <div className="flex items-center gap-2 z-10">
                            <div className="p-1.5 rounded-full bg-orange-500/5 dark:bg-orange-500/10 text-(--color-text-secondary)"><FolderOpen className="w-3.5 h-3.5" /></div>
                            <span className="text-xs font-medium text-(--color-text-secondary)">Submissions</span>
                        </div>
                        <div className="grid grid-cols-2 z-10 mt-1 w-full relative">
                            <div className="pr-2"><div className="text-2xl font-bold text-(--color-text-primary)">{campaign.creators || 0}</div><div className="text-[10px] text-(--color-text-muted) mt-0.5 truncate">Total</div></div>
                            <div className="pl-4 border-l border-(--color-border)"><div className="text-2xl font-bold text-(--color-text-secondary)">{Math.floor((campaign.creators || 0) * ((campaign.approval || 0) / 100))}</div><div className="text-[10px] text-(--color-text-muted) mt-0.5 truncate">Approved</div></div>
                        </div>
                        <div className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-[300px] bg-(--color-bg-tertiary) border border-(--color-border) rounded-xl p-5 shadow-2xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none z-50">
                            <h4 className="text-sm font-bold text-(--color-text-primary) mb-2">Submissions</h4>
                            <p className="text-3xl font-bold text-(--color-text-primary) mb-1">{campaign.creators || 0}</p>
                            <div className="flex items-baseline gap-2 mb-3"><span className="text-xs text-(--color-text-secondary)">Approval rate</span><span className="text-sm font-bold text-orange-500">{campaign.approval || 0}%</span></div>
                            <p className="text-xs text-(--color-text-secondary) leading-relaxed">{Math.floor((campaign.creators || 0) * ((campaign.approval || 0) / 100))} out of {campaign.creators || 0} eligible submissions approved. Only includes submissions meeting minimum view requirements.</p>
                        </div>
                    </div>
                </div>

                {/* --- CHART SECTION --- */}
                <div className="bg-yellow-radial bg-(--color-bg-card) border border-(--color-border) rounded-xl p-6 mb-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                        <div>
                            <h2 className="text-sm font-medium text-(--color-text-secondary) mb-1">{activeChartTab}</h2>
                            <p className="text-3xl font-bold text-(--color-text-primary)">
                                {activeChartTab === "Views" ? formatMetrics(campaign.views || 0) : "0"}
                            </p>
                        </div>

                        <div className="flex bg-(--color-bg-secondary) p-1 rounded-lg border border-(--color-border-subtle) overflow-x-auto no-scrollbar max-w-full">
                            {(Object.keys(CHART_THEMES) as ChartTab[]).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveChartTab(tab)}
                                    className={cn(
                                        "px-4 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap",
                                        activeChartTab === tab
                                            ? CHART_THEMES[tab].button
                                            : "text-(--color-text-secondary) hover:text-(--color-text-primary) hover:bg-(--color-surface-hover)"
                                    )}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* --- INTERACTIVE CHART --- */}
                    <div className="relative h-[300px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={chartDisplayData}
                                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                            >
                                <defs>
                                    <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={currentTheme.line} stopOpacity={0.25} />
                                        <stop offset="95%" stopColor={currentTheme.line} stopOpacity={0} />
                                    </linearGradient>
                                </defs>

                                <CartesianGrid vertical={false} stroke="var(--color-border)" strokeDasharray="3 3" />

                                <XAxis
                                    dataKey="date"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'var(--color-text-muted)', fontSize: 11 }}
                                    dy={10}
                                />
                                <YAxis
                                    orientation="right"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'var(--color-text-muted)', fontSize: 11 }}
                                    dx={10}
                                    tickFormatter={(value) => value >= 1000 ? formatMetrics(value) : value}
                                />

                                <Tooltip
                                    cursor={{ stroke: 'var(--color-border)', strokeWidth: 1, strokeDasharray: '3 3' }}
                                    content={({ active, payload, label }) => {
                                        if (active && payload && payload.length) {
                                            return (
                                                <div className="bg-(--color-bg-tertiary) border border-(--color-border) rounded-xl p-3 shadow-xl shrink-0">
                                                    <p className="text-xs font-medium text-(--color-text-secondary) mb-2">{label}</p>
                                                    <div className="flex flex-col gap-1">
                                                        {payload.map((entry: any) => (
                                                            <div key={entry.name} className="flex items-center gap-2">
                                                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color, opacity: entry.fillOpacity ?? 1 }} />
                                                                <span className="text-sm font-bold text-(--color-text-primary)">
                                                                    {entry.value?.toLocaleString()} <span className="text-xs font-normal text-(--color-text-secondary) capitalize">{entry.name}</span>
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />

                                {platforms.youtube && (
                                    <Area
                                        type="monotone"
                                        dataKey="youtube"
                                        stroke={currentTheme.line}
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorMetric)"
                                        activeDot={{ r: 4, strokeWidth: 0, fill: currentTheme.line }}
                                    />
                                )}
                                {platforms.instagram && (
                                    <Area
                                        type="monotone"
                                        dataKey="instagram"
                                        stroke={currentTheme.line}
                                        strokeOpacity={0.4}
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorMetric)"
                                        activeDot={{ r: 4, strokeWidth: 0, fill: currentTheme.line }}
                                    />
                                )}
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                {/* --- SUBMISSIONS TABLE --- */}
                <div className="mt-8">
                    <h3 className="text-lg font-bold text-(--color-text-primary) mb-4">Submissions Dashboard</h3>
                    <SubmissionsTable />
                </div>
            </div>
        </div >
    );
}
