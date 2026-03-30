"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import {
    Search,
    Settings2,
    ChevronDown,
    ChevronUp,
    Check,
    MoreHorizontal,
    ExternalLink,
    AlertCircle,
    Clock,
    CheckCircle2,
    XCircle,
    Flag,
    Filter,
    GripVertical
} from "lucide-react";
import { mockSubmissions, SubmissionData, ActionStatus } from "@/lib/data/submissions";
import { Campaign } from "@/lib/data/campaigns";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

type SortField = "followers" | "impressions" | "price" | "er" | "dateSubmitted" | "aiScore";
type SortDirection = "asc" | "desc";

// Define our columns for the customizer
const ALL_COLUMNS = [
    { id: "creator", label: "Creator Account", defaultVisible: true },
    { id: "tierToggle", label: "Enable Tier", defaultVisible: true },
    { id: "genderToggle", label: "Enable Gender", defaultVisible: true },
    { id: "niche", label: "Category / Niche", defaultVisible: false },
    { id: "link", label: "Content Link", defaultVisible: true },
    { id: "aiStatus", label: "AI Verification Status", defaultVisible: false },
    { id: "impressions", label: "Impressions", defaultVisible: false },
    { id: "detailedEr", label: "ER", defaultVisible: true },
    { id: "hashtags", label: "Hashtags used", defaultVisible: false },
    { id: "appeal", label: "Appeal option", defaultVisible: false },
    { id: "payment", label: "Payment status", defaultVisible: false },
    { id: "totalViews", label: "Total Views", defaultVisible: true },
    { id: "eligibleViews", label: "Eligible views", defaultVisible: true },
    { id: "estPayout", label: "Est. Payout", defaultVisible: true },
    { id: "actions", label: "Actions", defaultVisible: true },
];

const SORT_OPTIONS = [
    { id: "newest", label: "Newest", field: "dateSubmitted", direction: "desc" },
    { id: "oldest", label: "Oldest", field: "dateSubmitted", direction: "asc" },
    { id: "highestViews", label: "Highest Views", field: "impressions", direction: "desc" },
    { id: "lowestViews", label: "Lowest Views", field: "impressions", direction: "asc" },
    { id: "highestBot", label: "Highest Bot Confidence", field: "er", direction: "asc" },
    { id: "lowestBot", label: "Lowest Bot Confidence", field: "er", direction: "desc" },
] as const;

function ActionButtons({ submissionId, currentStatus, onAction }: { submissionId: string, currentStatus: string, onAction?: (id: string, newStatus: ActionStatus) => void }) {
    const handleAction = (e: React.MouseEvent, newStatus: ActionStatus) => {
        e.stopPropagation();
        if (onAction) onAction(submissionId, newStatus);
    };

    const isPending = currentStatus === "Pending";

    return (
        <div className="flex items-center gap-1 justify-center">
            <button
                onClick={(e) => handleAction(e, "Approved")}
                disabled={!isPending}
                className={cn(
                    "p-1.5 rounded-lg transition-colors",
                    isPending ? "text-green-600 hover:bg-green-500/10" :
                        currentStatus === "Approved" ? "text-green-600 bg-green-500/10 cursor-not-allowed" : "text-(--color-text-muted) opacity-50 cursor-not-allowed"
                )}
                title="Approve"
            >
                <CheckCircle2 className="w-5 h-5" />
            </button>
            <button
                onClick={(e) => handleAction(e, "Rejected")}
                disabled={!isPending}
                className={cn(
                    "p-1.5 rounded-lg transition-colors",
                    isPending ? "text-red-600 hover:bg-red-500/10" :
                        currentStatus === "Rejected" ? "text-red-600 bg-red-500/10 cursor-not-allowed" : "text-(--color-text-muted) opacity-50 cursor-not-allowed"
                )}
                title="Reject"
            >
                <XCircle className="w-5 h-5" />
            </button>
            <button
                onClick={(e) => handleAction(e, "Flagged")}
                disabled={!isPending}
                className={cn(
                    "p-1.5 rounded-lg transition-colors",
                    isPending ? "text-orange-600 hover:bg-orange-500/10" :
                        currentStatus === "Flagged" ? "text-orange-600 bg-orange-500/10 cursor-not-allowed" : "text-(--color-text-muted) opacity-50 cursor-not-allowed"
                )}
                title="Flag"
            >
                <Flag className="w-5 h-5" />
            </button>
        </div>
    );
}

const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
        case "Verified":
        case "Paid":
            return <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20"><CheckCircle2 className="w-3.5 h-3.5" /> {status}</span>;
        case "Pending":
        case "Processing":
            return <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-orange-500/10 text-orange-500 border border-orange-500/20"><Clock className="w-3.5 h-3.5" /> {status}</span>;
        case "Failed":
            return <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-500 border border-red-500/20"><XCircle className="w-3.5 h-3.5" /> {status}</span>;
        case "Requested":
            return <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-500 border border-purple-500/20"><AlertCircle className="w-3.5 h-3.5" /> {status}</span>;
        case "Resolved":
            return <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500 border border-blue-500/20"><CheckCircle2 className="w-3.5 h-3.5" /> {status}</span>;
        case "Flagged":
            return <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-orange-500/10 text-orange-500 border border-orange-500/20"><Flag className="w-3.5 h-3.5" /> {status}</span>;
        default:
            return <span className="text-xs text-(--color-text-secondary)">{status}</span>;
    }
};

export default function SubmissionsTable({
    activeTab = "All Submissions",
    platforms = [],
    campaignId = "1",
    submissions = mockSubmissions,
    onAction,
    campaign
}: {
    activeTab?: string,
    platforms?: string[],
    campaignId?: string,
    submissions?: SubmissionData[],
    onAction?: (id: string, newStatus: ActionStatus) => void,
    campaign?: Campaign
}) {
    const router = useRouter();
    // Search
    const [searchQuery, setSearchQuery] = useState("");

    // Sort
    const [sortField, setSortField] = useState<SortField>("dateSubmitted");
    const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
    const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

    // Platform Filter
    const [selectedPlatform, setSelectedPlatform] = useState<string>("All Platforms");
    const [platformDropdownOpen, setPlatformDropdownOpen] = useState(false);

    // Minimum Payout Filter
    const [minPayoutEnabled, setMinPayoutEnabled] = useState(false);

    // Column Customizer
    const [orderedColumns, setOrderedColumns] = useState(ALL_COLUMNS);
    const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(
        ALL_COLUMNS.reduce((acc, col) => ({ ...acc, [col.id]: col.defaultVisible }), {})
    );
    const [columnDropdownOpen, setColumnDropdownOpen] = useState(false);

    // Drag and Drop ordering
    const dragSourceIndex = useRef<number | null>(null);
    const dragOverIndex = useRef<number | null>(null);

    const handleDragStart = (e: React.DragEvent, index: number) => {
        dragSourceIndex.current = index;
        e.dataTransfer.effectAllowed = "move";
    };

    const handleDragEnter = (e: React.DragEvent, index: number) => {
        dragOverIndex.current = index;
    };

    const handleDrop = (e: React.DragEvent, index: number) => {
        e.preventDefault();

        // Prevent moving the creator column or moving any other column before the creator column
        if (dragSourceIndex.current !== null && (orderedColumns[dragSourceIndex.current].id === "creator" || orderedColumns[index].id === "creator")) {
            dragSourceIndex.current = null;
            dragOverIndex.current = null;
            return;
        }

        if (dragSourceIndex.current !== null && dragSourceIndex.current !== index) {
            setOrderedColumns((prev) => {
                const newCols = [...prev];
                const draggedItem = newCols[dragSourceIndex.current!];
                newCols.splice(dragSourceIndex.current!, 1);
                newCols.splice(index, 0, draggedItem);
                return newCols;
            });
        }
        dragSourceIndex.current = null;
        dragOverIndex.current = null;
    };

    const handleDragEnd = () => {
        dragSourceIndex.current = null;
        dragOverIndex.current = null;
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    // Click outside handlers
    const columnRef = useRef<HTMLDivElement>(null);
    const sortRef = useRef<HTMLDivElement>(null);
    const platformRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (columnRef.current && !columnRef.current.contains(event.target as Node)) {
                setColumnDropdownOpen(false);
            }
            if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
                setSortDropdownOpen(false);
            }
            if (platformRef.current && !platformRef.current.contains(event.target as Node)) {
                setPlatformDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Filter and Sort Data
    const filteredAndSortedData = useMemo(() => {
        let data = [...submissions];

        // 1. Filter by status tab
        if (activeTab !== "All Submissions") {
            data = data.filter(sub => {
                if (activeTab === "Approved") return sub.actionStatus === "Approved";
                if (activeTab === "Pending") return sub.actionStatus === "Pending";
                if (activeTab === "Flagged") return sub.actionStatus === "Flagged";
                if (activeTab === "Rejected") return sub.actionStatus === "Rejected";
                return true;
            });
        }

        // 2. Filter by search query
        if (searchQuery.trim() !== "") {
            const query = searchQuery.toLowerCase();
            data = data.filter(sub =>
                sub.creator.name.toLowerCase().includes(query) ||
                sub.creator.handle.toLowerCase().includes(query) ||
                sub.link.toLowerCase().includes(query)
            );
        }

        // 3. Filter by platform
        if (selectedPlatform !== "All Platforms") {
            data = data.filter(sub => {
                if (selectedPlatform.toLowerCase() === "instagram") return sub.platform.toLowerCase() === "instagram";
                if (selectedPlatform.toLowerCase() === "youtube") return sub.platform.toLowerCase() === "youtube";
                return true;
            });
        }

        // 4. Filter by Minimum Payout
        if (minPayoutEnabled && campaign) {
            data = data.filter(sub => {
                let requiredMinPayout = parseInt(String(campaign.minPayout || "0").replace(/[^0-9]/g, '')) || 0;
                
                if (campaign.usePerPlatformRewards && campaign.perPlatformRewards) {
                    const platformKey = Object.keys(campaign.perPlatformRewards).find(
                        k => k.toLowerCase() === sub.platform.toLowerCase()
                    );
                    
                    if (platformKey) {
                        const platformReward = campaign.perPlatformRewards[platformKey];
                        if (platformReward && platformReward.minPayout) {
                            requiredMinPayout = parseInt(String(platformReward.minPayout).replace(/[^0-9]/g, '')) || 0;
                        }
                    }
                }
                
                return sub.creator.price >= requiredMinPayout;
            });
        }

        // 5. Sort
        data.sort((a, b) => {
            let valA: any = "";
            let valB: any = "";

            switch (sortField) {
                case "followers":
                    valA = a.creator.followers; valB = b.creator.followers; break;
                case "impressions":
                    valA = a.impressions; valB = b.impressions; break;
                case "price":
                    valA = a.creator.price; valB = b.creator.price; break;
                case "er":
                    valA = a.er; valB = b.er; break;
                case "dateSubmitted":
                    valA = new Date(a.dateSubmitted).getTime(); valB = new Date(b.dateSubmitted).getTime(); break;
                case "aiScore":
                    valA = a.aiScore; valB = b.aiScore; break;
                default:
                    valA = new Date(a.dateSubmitted).getTime(); valB = new Date(b.dateSubmitted).getTime();
            }

            if (valA < valB) return sortDirection === "asc" ? -1 : 1;
            if (valA > valB) return sortDirection === "asc" ? 1 : -1;
            return 0;
        });

        return data;
    }, [searchQuery, sortField, sortDirection, activeTab, selectedPlatform, submissions, minPayoutEnabled, campaign]);

    const toggleColumn = (id: string) => {
        setVisibleColumns(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleSort = (field: SortField, direction: SortDirection) => {
        setSortField(field);
        setSortDirection(direction);
        setSortDropdownOpen(false);
    };

    const renderHeaderLabel = (col: typeof ALL_COLUMNS[0]) => {
        switch (col.id) {
            case "eligibleViews":
                return (
                    <div className="group/tooltip relative inline-flex items-center cursor-help">
                        <span className="border-b border-dashed border-(--color-text-muted)">Eligible views</span>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[200px] bg-(--color-bg-tertiary) border border-(--color-border) p-2 rounded-lg shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all text-xs font-normal text-(--color-text-secondary) z-50 whitespace-normal text-center pointer-events-none">
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-px border-4 border-transparent border-b-(--color-border)" />
                            Views are calculated after the submission of the uploaded content on BennyBucks
                        </div>
                    </div>
                );
            case "detailedEr":
                return (
                    <div className="group/tooltip relative inline-flex items-center cursor-help">
                        <span className="border-b border-dashed border-(--color-text-muted)">ER</span>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[220px] bg-(--color-bg-tertiary) border border-(--color-border) p-2 rounded-lg shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all text-xs font-normal text-(--color-text-secondary) z-50 whitespace-normal text-center pointer-events-none">
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-px border-4 border-transparent border-b-(--color-border)" />
                            ER = [(Likes + Comments + Shares + Saves) &divide; Total Views] &times; 100
                        </div>
                    </div>
                );
            default:
                return <span>{col.label}</span>;
        }
    };

    return (
        <div className="w-full bg-(--color-bg-card) border border-(--color-border) rounded-xl overflow-hidden shadow-sm">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-b border-(--color-border) gap-4">

                {/* Search */}
                <div className="relative w-full sm:max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-(--color-text-muted)" />
                    <input
                        type="text"
                        placeholder="Search by name, handle, or URL..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-(--color-bg-secondary) border border-(--color-border) rounded-lg text-sm text-(--color-text-primary) placeholder-(--color-text-muted) focus:outline-none focus:ring-1 focus:ring-(--color-text-primary) transition-all"
                    />
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full sm:gap-2 sm:w-auto">

                    {/* Platform Dropdown */}
                    <div className="relative" ref={platformRef}>
                        <button
                            onClick={() => setPlatformDropdownOpen(!platformDropdownOpen)}
                            className="flex items-center gap-1 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 bg-(--color-bg-secondary) border border-(--color-border) rounded-lg text-xs sm:text-sm font-medium text-(--color-text-secondary) hover:text-(--color-text-primary) hover:bg-(--color-surface-hover) transition-colors whitespace-nowrap"
                        >
                            <Filter className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">{selectedPlatform === "All Platforms" ? "All Platforms" : selectedPlatform}</span>
                            <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>

                        {platformDropdownOpen && (
                            <div className="absolute left-0 sm:left-auto sm:right-0 top-full mt-1.5 w-48 bg-(--color-bg-tertiary) border border-(--color-border) rounded-xl shadow-xl z-20 overflow-hidden isolate backdrop-blur-md">
                                <div className="p-1">
                                    {["All Platforms", ...platforms].map((platform) => (
                                        <button
                                            key={platform}
                                            onClick={() => { setSelectedPlatform(platform); setPlatformDropdownOpen(false); }}
                                            className={cn(
                                                "w-full text-left px-3 py-2 text-sm hover:bg-(--color-bg-secondary) rounded-lg transition-colors",
                                                selectedPlatform === platform ? "text-(--color-text-primary) font-medium" : "text-(--color-text-secondary) hover:text-(--color-text-primary)"
                                            )}
                                        >
                                            {platform}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sort Dropdown */}
                    <div className="relative" ref={sortRef}>
                        <button
                            onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                            className="flex items-center gap-1 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 bg-(--color-bg-secondary) border border-(--color-border) rounded-lg text-xs sm:text-sm font-medium text-(--color-text-secondary) hover:text-(--color-text-primary) hover:bg-(--color-surface-hover) transition-colors whitespace-nowrap"
                        >
                            <span className="hidden sm:inline">Sort:</span> <span className="text-(--color-text-primary) capitalize">
                                {SORT_OPTIONS.find(opt => opt.field === sortField && opt.direction === sortDirection)?.label || "Newest"}
                            </span>
                            <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>

                        {sortDropdownOpen && (
                            <div className="absolute right-0 sm:left-auto sm:right-0 top-full mt-1.5 w-56 bg-(--color-bg-tertiary) border border-(--color-border) rounded-xl shadow-xl z-20 overflow-hidden isolate backdrop-blur-md">
                                <div className="p-1">
                                    {SORT_OPTIONS.map((opt) => (
                                        <button
                                            key={opt.id}
                                            onClick={() => handleSort(opt.field as SortField, opt.direction)}
                                            className="w-full flex items-center justify-between px-3 py-2 text-sm text-(--color-text-secondary) hover:text-(--color-text-primary) hover:bg-(--color-bg-secondary) rounded-lg transition-colors text-left"
                                        >
                                            {opt.label}
                                            {sortField === opt.field && sortDirection === opt.direction && (
                                                <Check className="w-4 h-4 text-(--color-text-primary)" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Columns Customizer */}
                    <div className="relative" ref={columnRef}>
                        <button
                            onClick={() => setColumnDropdownOpen(!columnDropdownOpen)}
                            className="flex items-center gap-1 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 bg-(--color-bg-secondary) border border-(--color-border) rounded-lg text-xs sm:text-sm font-medium text-(--color-text-secondary) hover:text-(--color-text-primary) hover:bg-(--color-surface-hover) transition-colors whitespace-nowrap"
                        >
                            <Settings2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">Customize</span> Columns
                            <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>

                        {columnDropdownOpen && (
                            <div className="absolute right-0 top-full mt-1.5 w-56 bg-(--color-bg-tertiary) border border-(--color-border) rounded-xl shadow-xl z-20 overflow-hidden isolate backdrop-blur-md">
                                <div className="p-2 space-y-1 max-h-[300px] overflow-y-auto">
                                    {orderedColumns.map((col, index) => {
                                        const isFixed = col.id === "creator";
                                        return (
                                            <div
                                                key={col.id}
                                                draggable={!isFixed}
                                                onDragStart={!isFixed ? (e) => handleDragStart(e, index) : undefined}
                                                onDragEnter={!isFixed ? (e) => handleDragEnter(e, index) : undefined}
                                                onDragEnd={!isFixed ? handleDragEnd : undefined}
                                                onDragOver={!isFixed ? handleDragOver : undefined}
                                                onDrop={!isFixed ? (e) => handleDrop(e, index) : undefined}
                                                className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-(--color-text-secondary) hover:text-(--color-text-primary) hover:bg-(--color-bg-secondary) rounded-lg transition-colors"
                                            >
                                                <div className="cursor-grab active:cursor-grabbing p-1 -ml-1 hover:text-(--color-text-primary) shrink-0">
                                                    {!isFixed ? <GripVertical className="w-3.5 h-3.5 text-(--color-text-muted)" /> : <div className="w-3.5 h-3.5" />}
                                                </div>
                                                <button
                                                    onClick={() => toggleColumn(col.id)}
                                                    className="flex flex-1 items-center gap-3 text-left overflow-hidden"
                                                >
                                                    <div className={cn(
                                                        "w-4 h-4 rounded border flex items-center justify-center transition-colors shrink-0",
                                                        visibleColumns[col.id] ? "bg-(--color-text-primary) border-(--color-text-primary)" : "border-(--color-border-subtle)"
                                                    )}>
                                                        {visibleColumns[col.id] && <Check className="w-3 h-3 text-(--color-bg-primary)" />}
                                                    </div>
                                                    <span className="truncate">{col.label}</span>
                                                </button>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Minimum Payout Toggle */}
                    <div className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-1.5 sm:py-2 bg-(--color-bg-secondary) border border-(--color-border) rounded-lg" title="Filter submissions >= minimum payout">
                        <span className="text-xs sm:text-sm font-medium text-(--color-text-secondary)">
                            Min. Payout
                        </span>
                        <button
                            type="button"
                            role="switch"
                            aria-checked={minPayoutEnabled}
                            onClick={() => setMinPayoutEnabled(!minPayoutEnabled)}
                            className={cn(
                                "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out",
                                "bg-(--color-input-toggle-button)"
                            )}
                        >
                            <span className="sr-only">Use minimum payout</span>
                            <span
                                aria-hidden="true"
                                className={cn(
                                    "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-(--color-bg-primary) shadow ring-0 transition duration-200 ease-in-out",
                                    minPayoutEnabled ? "translate-x-4" : "translate-x-0"
                                )}
                            />
                        </button>
                    </div>
                </div>
            </div>

            {/* Table wrapper allowing horizontal scroll */}
            <div className="w-full overflow-x-auto min-h-[400px]">
                <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-(--color-bg-secondary) border-b border-(--color-border) text-(--color-text-secondary) font-medium text-xs">
                        <tr>
                            {orderedColumns.map((col, index) => {
                                if (!visibleColumns[col.id] || col.id === "tierToggle" || col.id === "genderToggle") return null;
                                const isFixed = col.id === "creator";
                                return (
                                    <th
                                        key={col.id}
                                        className={cn("px-2 sm:px-3 py-3.5 align-top group", col.id === "actions" && "text-center w-28")}
                                        draggable={!isFixed}
                                        onDragStart={!isFixed ? (e) => handleDragStart(e, index) : undefined}
                                        onDragEnter={!isFixed ? (e) => handleDragEnter(e, index) : undefined}
                                        onDragEnd={!isFixed ? handleDragEnd : undefined}
                                        onDragOver={!isFixed ? handleDragOver : undefined}
                                        onDrop={!isFixed ? (e) => handleDrop(e, index) : undefined}
                                    >
                                        <div className={cn("flex items-start gap-1.5", !isFixed && "cursor-grab active:cursor-grabbing", col.id === "actions" && "justify-center")}>
                                            {renderHeaderLabel(col)}
                                            {!isFixed && <GripVertical className="w-4 h-4 text-(--color-text-muted) hover:text-(--color-text-primary) mt-0.5 shrink-0" />}
                                        </div>
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-(--color-border-subtle)">
                        {filteredAndSortedData.length > 0 ? (
                            filteredAndSortedData.map((sub) => (
                                <tr
                                    key={sub.id}
                                    onClick={() => router.push(`/brand/campaigns/${campaignId}/submissions/${sub.id}?tab=${encodeURIComponent(activeTab)}&sort=${sortField}&dir=${sortDirection}&platform=${encodeURIComponent(selectedPlatform)}`)}
                                    className="hover:bg-(--color-surface-hover) transition-colors cursor-pointer"
                                >
                                    {orderedColumns.map((col) => {
                                        if (!visibleColumns[col.id] || col.id === "tierToggle" || col.id === "genderToggle") return null;

                                        switch (col.id) {
                                            case "creator":
                                                return (
                                                    <td key={col.id} className="px-2 sm:px-3 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-(--color-border-subtle) shrink-0 border border-(--color-border)" suppressHydrationWarning>
                                                                <Image src={sub.creator.image} alt={sub.creator.name} fill className="object-cover" suppressHydrationWarning />
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="font-bold text-(--color-text-primary)">{sub.creator.name}</span>
                                                                <div className="flex items-center gap-1.5 mt-0.5">
                                                                    {sub.platform === "Instagram" ? (
                                                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-pink-500 shrink-0">
                                                                            <path d="M12 2.16C15.2 2.16 15.58 2.17 16.85 2.23C18.12 2.29 18.81 2.5 19.27 2.68C19.88 2.92 20.31 3.22 20.77 3.68C21.23 4.14 21.53 4.58 21.76 5.18C21.94 5.64 22.15 6.33 22.21 7.6C22.27 8.87 22.28 9.25 22.28 12.45C22.28 15.65 22.27 16.03 22.21 17.3C22.15 18.57 21.94 19.26 21.76 19.72C21.53 20.32 21.23 20.76 20.77 21.22C20.31 21.68 19.88 21.98 19.27 22.22C18.81 22.4 18.12 22.61 16.85 22.67C15.58 22.73 15.2 22.74 12 22.74C8.8 22.74 8.42 22.73 7.15 22.67C5.88 22.61 5.19 22.4 4.73 22.22C4.12 21.98 3.69 21.68 3.23 21.22C2.77 20.76 2.47 20.32 2.24 19.72C2.06 19.26 1.85 18.57 1.79 17.3C1.73 16.03 1.72 15.65 1.72 12.45C1.72 9.25 1.73 8.87 1.79 7.6C1.85 6.33 2.06 5.64 2.24 5.18C2.47 4.58 2.77 4.14 3.23 3.68C3.69 3.22 4.12 2.92 4.73 2.68C5.19 2.5 5.88 2.29 7.15 2.23C8.42 2.17 8.8 2.16 12 2.16ZM12 0C8.74 0 8.33 0.01 7.05 0.07C5.77 0.13 4.9 0.33 4.14 0.63C3.36 0.93 2.69 1.34 2.03 2.03C1.36 2.69 0.94 3.36 0.64 4.14C0.34 4.9 0.14 5.77 0.08 7.05C0.01 8.33 0 8.74 0 12C0 15.26 0.01 15.67 0.08 16.95C0.14 18.23 0.34 19.1 0.64 19.86C0.94 20.64 1.36 21.31 2.03 21.97C2.69 22.64 3.36 23.06 4.14 23.36C4.9 23.66 5.77 23.86 7.05 23.93C8.33 23.99 8.74 24 12 24C15.26 24 15.67 23.99 16.95 23.93C18.23 23.86 19.1 23.66 19.86 23.36C20.64 23.06 21.31 22.64 21.97 21.97C22.64 21.31 23.06 20.64 23.36 19.86C23.66 19.1 23.86 18.23 23.92 16.95C23.99 15.67 24 15.26 24 12C24 8.74 23.99 8.33 23.92 7.05C23.86 5.77 23.66 4.9 23.36 4.14C23.06 3.36 22.64 2.69 21.97 2.03C21.31 1.34 20.64 0.93 19.86 0.63C19.1 0.33 18.23 0.13 16.95 0.07C15.67 0.01 15.26 0 12 0ZM12 5.84C8.6 5.84 5.84 8.6 5.84 12C5.84 15.4 8.6 18.16 12 18.16C15.4 18.16 18.16 15.4 18.16 12C18.16 8.6 15.4 5.84 12 5.84ZM12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16ZM18.41 4.15C17.62 4.15 16.97 4.79 16.97 5.59C16.97 6.38 17.62 7.03 18.41 7.03C19.2 7.03 19.84 6.38 19.84 5.59C19.84 4.79 19.2 4.15 18.41 4.15Z" fill="currentColor" />
                                                                        </svg>
                                                                    ) : (
                                                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-red-600 shrink-0">
                                                                            <path d="M21.58 6.55C21.33 5.58 20.58 4.8 19.64 4.54C17.91 4.08 12 4.08 12 4.08C12 4.08 6.09 4.08 4.36 4.54C3.42 4.8 2.67 5.58 2.42 6.55C1.96 8.37 1.96 12 1.96 12C1.96 12 1.96 15.63 2.42 17.45C2.67 18.42 3.42 19.2 4.36 19.46C6.09 19.92 12 19.92 12 19.92C12 19.92 17.91 19.92 19.64 19.46C20.58 19.2 21.33 18.42 21.58 17.45C22.04 15.63 22.04 12 22.04 12C22.04 12 22.04 8.37 21.58 6.55ZM9.96 15.33V8.67L15.68 12L9.96 15.33Z" fill="currentColor" />
                                                                        </svg>
                                                                    )}
                                                                    <span className="text-xs text-(--color-text-muted)">{sub.creator.handle}</span>
                                                                </div>
                                                                {(visibleColumns["tierToggle"] || visibleColumns["genderToggle"]) && (
                                                                    <span className="text-xs font-medium text-(--color-text-secondary) mt-0.5 whitespace-nowrap capitalize">
                                                                        {[visibleColumns["tierToggle"] ? sub.creator.tier : null, visibleColumns["genderToggle"] ? sub.creator.gender : null].filter(Boolean).join(" • ")}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </td>
                                                );
                                            case "niche":
                                                return (
                                                    <td key={col.id} className="px-2 sm:px-3 py-4">
                                                        <div className="whitespace-normal min-w-[120px] max-w-[150px] text-(--color-text-secondary) leading-snug">
                                                            {sub.niche}
                                                        </div>
                                                    </td>
                                                );
                                            case "link":
                                                return (
                                                    <td key={col.id} className="px-2 sm:px-3 py-4">
                                                        <Link href={sub.link} target="_blank" onClick={(e) => e.stopPropagation()} className={cn("flex items-center gap-1.5 transition-colors", sub.platform === "YouTube" ? "text-red-600 hover:text-red-500" : "text-pink-600 hover:text-pink-500")}>
                                                            <ExternalLink className="w-3.5 h-3.5" />
                                                            <span>{sub.platform === "YouTube" ? "View Short" : "View Reel"}</span>
                                                        </Link>
                                                    </td>
                                                );
                                            case "aiStatus":
                                                return (
                                                    <td key={col.id} className="px-2 sm:px-3 py-4">
                                                        <div className="flex flex-col gap-1">
                                                            <StatusBadge status={sub.aiVerificationStatus} />
                                                            <span className="text-[10px] text-(--color-text-muted)">Score: {sub.aiScore}/100</span>
                                                        </div>
                                                    </td>
                                                );
                                            case "impressions":
                                                return (
                                                    <td key={col.id} className="px-2 sm:px-3 py-4">
                                                        <span className="font-medium text-(--color-text-primary)">
                                                            {sub.impressions >= 10000 ? (sub.impressions / 1000).toFixed(1) + 'k' : sub.impressions.toLocaleString()}
                                                        </span>
                                                    </td>
                                                );
                                            case "detailedEr":
                                                return (
                                                    <td key={col.id} className="px-2 sm:px-3 py-4">
                                                        <span className="font-medium text-(--color-text-primary)">{sub.er}%</span>
                                                    </td>
                                                );
                                            case "hashtags":
                                                return (
                                                    <td key={col.id} className="px-2 sm:px-3 py-4">
                                                        <div className="flex items-center gap-1.5 flex-wrap max-w-[170px]">
                                                            {sub.hashtags.map(tag => (
                                                                <span key={tag} className="text-[10px] bg-(--color-bg-secondary) text-(--color-text-secondary) px-1.5 py-0.5 rounded cursor-default border border-(--color-border-subtle)">
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </td>
                                                );
                                            case "appeal":
                                                return (
                                                    <td key={col.id} className="px-2 sm:px-3 py-4">
                                                        {sub.appealOption === "None" ?
                                                            <span className="text-(--color-text-muted)">-</span>
                                                            : <StatusBadge status={sub.appealOption} />
                                                        }
                                                    </td>
                                                );
                                            case "payment":
                                                return (
                                                    <td key={col.id} className="px-2 sm:px-3 py-4">
                                                        <div className="flex flex-col gap-1">
                                                            <StatusBadge status={sub.paymentStatus} />
                                                            <span className="text-[10px] text-(--color-text-muted)">₹{sub.creator.price.toLocaleString()}</span>
                                                        </div>
                                                    </td>
                                                );
                                            case "totalViews":
                                                return (
                                                    <td key={col.id} className="px-2 sm:px-3 py-4">
                                                        <span className="font-medium text-(--color-text-primary)">
                                                            {sub.impressions >= 10000 ? (sub.impressions / 1000).toFixed(1) + 'k' : sub.impressions.toLocaleString()}
                                                        </span>
                                                    </td>
                                                );
                                            case "eligibleViews":
                                                return (
                                                    <td key={col.id} className="px-2 sm:px-3 py-4">
                                                        <span className="font-medium text-(--color-text-primary)">
                                                            {(sub.impressions * 0.9) >= 10000 ? ((sub.impressions * 0.9) / 1000).toFixed(1) + 'k' : Math.floor(sub.impressions * 0.9).toLocaleString()}
                                                        </span>
                                                    </td>
                                                );
                                            case "detailedEr":
                                                return (
                                                    <td key={col.id} className="px-2 sm:px-3 py-4">
                                                        <span className="font-medium text-(--color-text-primary)">{sub.er}%</span>
                                                    </td>
                                                );
                                            case "estPayout":
                                                return (
                                                    <td key={col.id} className="px-2 sm:px-3 py-4">
                                                        <span className="font-medium text-(--color-text-primary)">₹{sub.creator.price.toLocaleString()}</span>
                                                    </td>
                                                );
                                            case "actions":
                                                return (
                                                    <td key={col.id} className="px-2 sm:px-3 py-4 text-center">
                                                        <ActionButtons submissionId={sub.id} currentStatus={sub.actionStatus} onAction={onAction} />
                                                    </td>
                                                );
                                            default:
                                                return <td key={col.id}></td>;
                                        }
                                    })}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={10} className="px-5 py-12 text-center">
                                    <p className="text-(--color-text-secondary) font-medium mb-1">No submissions found</p>
                                    <p className="text-sm text-(--color-text-muted)">Try adjusting your search criteria or filters</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Simple Footer/Pagination summary */}
            <div className="p-4 border-t border-(--color-border) flex items-center justify-between text-xs text-(--color-text-muted)">
                <span>{filteredAndSortedData.length} submissions found</span>
                <span>Page 1 of 1</span>
            </div>
        </div>
    );
}
