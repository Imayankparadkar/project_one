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
    XCircle
} from "lucide-react";
import { mockSubmissions, SubmissionData } from "@/lib/data/submissions";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type SortField = "followers" | "impressions" | "price" | "er" | "dateSubmitted" | "aiScore";
type SortDirection = "asc" | "desc";

// Define our columns for the customizer
const ALL_COLUMNS = [
    { id: "creator", label: "Creator Account", defaultVisible: true },
    { id: "niche", label: "Category / Niche", defaultVisible: true },
    { id: "link", label: "Content Link", defaultVisible: true },
    { id: "aiStatus", label: "AI Verification Status", defaultVisible: true },
    { id: "impressions", label: "Impressions", defaultVisible: true },
    { id: "er", label: "ER", defaultVisible: true },
    { id: "hashtags", label: "Hashtags used", defaultVisible: true },
    { id: "appeal", label: "Appeal option", defaultVisible: false },
    { id: "payment", label: "Payment status", defaultVisible: true },
];

export default function SubmissionsTable() {
    // Search
    const [searchQuery, setSearchQuery] = useState("");

    // Sort
    const [sortField, setSortField] = useState<SortField>("dateSubmitted");
    const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
    const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

    // Column Customizer
    const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(
        ALL_COLUMNS.reduce((acc, col) => ({ ...acc, [col.id]: col.defaultVisible }), {})
    );
    const [columnDropdownOpen, setColumnDropdownOpen] = useState(false);

    // Click outside handlers
    const columnRef = useRef<HTMLDivElement>(null);
    const sortRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (columnRef.current && !columnRef.current.contains(event.target as Node)) {
                setColumnDropdownOpen(false);
            }
            if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
                setSortDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Filter and Sort Data
    const filteredAndSortedData = useMemo(() => {
        let data = [...mockSubmissions];

        // Filter
        if (searchQuery.trim() !== "") {
            const query = searchQuery.toLowerCase();
            data = data.filter(sub =>
                sub.creator.name.toLowerCase().includes(query) ||
                sub.creator.handle.toLowerCase().includes(query) ||
                sub.link.toLowerCase().includes(query)
            );
        }

        // Sort
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
    }, [searchQuery, sortField, sortDirection]);

    const toggleColumn = (id: string) => {
        setVisibleColumns(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(prev => prev === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("desc");
        }
        setSortDropdownOpen(false);
    };

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
            default:
                return <span className="text-xs text-(--color-text-secondary)">{status}</span>;
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

                <div className="flex items-center gap-3 w-full sm:gap-1 sm:w-auto">

                    {/* Sort Dropdown */}
                    <div className="relative" ref={sortRef}>
                        <button
                            onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                            className="flex items-center gap-1 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 bg-(--color-bg-secondary) border border-(--color-border) rounded-lg text-xs sm:text-sm font-medium text-(--color-text-secondary) hover:text-(--color-text-primary) hover:bg-(--color-surface-hover) transition-colors whitespace-nowrap"
                        >
                            <span className="hidden sm:inline">Sort:</span> <span className="text-(--color-text-primary) capitalize">{sortField.replace(/([A-Z])/g, ' $1').trim()}</span>
                            <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>

                        {sortDropdownOpen && (
                            <div className="absolute left-0 sm:left-auto sm:right-0 top-full mt-1.5 w-48 bg-(--color-bg-tertiary) border border-(--color-border) rounded-xl shadow-xl z-20 overflow-hidden isolate backdrop-blur-md">
                                <div className="p-1">
                                    {[
                                        { id: "followers", label: "Followers" },
                                        { id: "impressions", label: "Views" },
                                        { id: "price", label: "Creator Price" },
                                        { id: "er", label: "ER" },
                                        { id: "dateSubmitted", label: "Date submitted" },
                                        { id: "aiScore", label: "AI Performance Score" },
                                    ].map((opt) => (
                                        <button
                                            key={opt.id}
                                            onClick={() => handleSort(opt.id as SortField)}
                                            className="w-full flex items-center justify-between px-3 py-2 text-sm text-(--color-text-secondary) hover:text-(--color-text-primary) hover:bg-(--color-bg-secondary) rounded-lg transition-colors text-left"
                                        >
                                            {opt.label}
                                            {sortField === opt.id && (
                                                sortDirection === "desc" ? <ChevronDown className="w-3.5 h-3.5 text-(--color-text-primary)" /> : <ChevronUp className="w-3.5 h-3.5 text-(--color-text-primary)" />
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
                                    {ALL_COLUMNS.map((col) => (
                                        <button
                                            key={col.id}
                                            onClick={() => toggleColumn(col.id)}
                                            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-(--color-text-secondary) hover:text-(--color-text-primary) hover:bg-(--color-bg-secondary) rounded-lg transition-colors text-left"
                                        >
                                            <div className={cn(
                                                "w-4 h-4 rounded border flex items-center justify-center transition-colors shrink-0",
                                                visibleColumns[col.id] ? "bg-(--color-text-primary) border-(--color-text-primary)" : "border-(--color-border-subtle)"
                                            )}>
                                                {visibleColumns[col.id] && <Check className="w-3 h-3 text-(--color-bg-primary)" />}
                                            </div>
                                            <span className="truncate">{col.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Table wrapper allowing horizontal scroll */}
            <div className="w-full overflow-x-auto min-h-[400px]">
                <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-(--color-bg-secondary) border-b border-(--color-border) text-(--color-text-secondary) font-medium text-xs">
                        <tr>
                            {visibleColumns.creator && <th className="px-2 sm:px-3 py-3.5">Creator Account</th>}
                            {visibleColumns.niche && <th className="px-2 sm:px-3 py-3.5">Category / Niche</th>}
                            {visibleColumns.link && <th className="px-2 sm:px-3 py-3.5">Content Link</th>}
                            {visibleColumns.aiStatus && <th className="px-2 sm:px-3 py-3.5">AI Verification</th>}
                            {visibleColumns.impressions && <th className="px-2 sm:px-3 py-3.5">Impressions</th>}
                            {visibleColumns.er && <th className="px-2 sm:px-3 py-3.5">ER</th>}
                            {visibleColumns.hashtags && <th className="px-2 sm:px-3 py-3.5">Hashtags used</th>}
                            {visibleColumns.appeal && <th className="px-2 sm:px-3 py-3.5">Appeal option</th>}
                            {visibleColumns.payment && <th className="px-2 sm:px-3 py-3.5">Payment status</th>}
                            <th className="px-2 sm:px-3 py-3.5 text-center w-10"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-(--color-border-subtle)">
                        {filteredAndSortedData.length > 0 ? (
                            filteredAndSortedData.map((sub) => (
                                <tr key={sub.id} className="hover:bg-(--color-surface-hover) transition-colors">
                                    {/* Creator Column */}
                                    {visibleColumns.creator && (
                                        <td className="px-2 sm:px-3 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-(--color-border-subtle) shrink-0 border border-(--color-border)" suppressHydrationWarning>
                                                    <Image src={sub.creator.image} alt={sub.creator.name} fill className="object-cover" suppressHydrationWarning />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-(--color-text-primary)">{sub.creator.name}</span>
                                                    <span className="text-xs text-(--color-text-muted)">{sub.creator.handle}</span>
                                                    <span className="text-xs font-medium text-(--color-text-secondary) mt-0.5 whitespace-nowrap">
                                                        {sub.creator.tier} • {sub.creator.gender}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                    )}

                                    {/* Niche Column */}
                                    {visibleColumns.niche && (
                                        <td className="px-2 sm:px-3 py-4">
                                            <div className="whitespace-normal min-w-[120px] max-w-[150px] text-(--color-text-secondary) leading-snug">
                                                {sub.niche}
                                            </div>
                                        </td>
                                    )}

                                    {/* Link Column */}
                                    {visibleColumns.link && (
                                        <td className="px-2 sm:px-3 py-4">
                                            <Link href={sub.link} target="_blank" className="flex items-center gap-1.5 text-blue-500 hover:text-blue-400 transition-colors">
                                                <ExternalLink className="w-3.5 h-3.5" />
                                                <span>View Reel</span>
                                            </Link>
                                        </td>
                                    )}

                                    {/* AI Status Column */}
                                    {visibleColumns.aiStatus && (
                                        <td className="px-2 sm:px-3 py-4">
                                            <div className="flex flex-col gap-1">
                                                <StatusBadge status={sub.aiVerificationStatus} />
                                                <span className="text-[10px] text-(--color-text-muted)">Score: {sub.aiScore}/100</span>
                                            </div>
                                        </td>
                                    )}

                                    {/* Impressions Column */}
                                    {visibleColumns.impressions && (
                                        <td className="px-2 sm:px-3 py-4">
                                            <span className="font-medium text-(--color-text-primary)">
                                                {sub.impressions >= 10000 ? (sub.impressions / 1000).toFixed(1) + 'k' : sub.impressions.toLocaleString()}
                                            </span>
                                        </td>
                                    )}

                                    {/* ER Column */}
                                    {visibleColumns.er && (
                                        <td className="px-2 sm:px-3 py-4">
                                            <span className="font-medium text-(--color-text-primary)">{sub.er}%</span>
                                        </td>
                                    )}

                                    {/* Hashtags Column */}
                                    {visibleColumns.hashtags && (
                                        <td className="px-2 sm:px-3 py-4">
                                            <div className="flex items-center gap-1.5 flex-wrap max-w-[170px]">
                                                {sub.hashtags.map(tag => (
                                                    <span key={tag} className="text-[10px] bg-(--color-bg-secondary) text-(--color-text-secondary) px-1.5 py-0.5 rounded cursor-default border border-(--color-border-subtle)">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                    )}

                                    {/* Appeal Column */}
                                    {visibleColumns.appeal && (
                                        <td className="px-2 sm:px-3 py-4">
                                            {sub.appealOption === "None" ?
                                                <span className="text-(--color-text-muted)">-</span>
                                                : <StatusBadge status={sub.appealOption} />
                                            }
                                        </td>
                                    )}

                                    {/* Payment Column */}
                                    {visibleColumns.payment && (
                                        <td className="px-2 sm:px-3 py-4">
                                            <div className="flex flex-col gap-1">
                                                <StatusBadge status={sub.paymentStatus} />
                                                <span className="text-[10px] text-(--color-text-muted)">₹{sub.creator.price.toLocaleString()}</span>
                                            </div>
                                        </td>
                                    )}

                                    {/* Actions */}
                                    <td className="px-2 sm:px-3 py-4 text-center">
                                        <button className="p-1.5 text-(--color-text-muted) hover:text-(--color-text-primary) rounded-md hover:bg-(--color-bg-secondary) transition-colors">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={10} className="px-5 py-12 text-center">
                                    <p className="text-(--color-text-secondary) font-medium mb-1">No submissions found</p>
                                    <p className="text-sm text-(--color-text-muted)">Try adjusting your search criteria</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Simple Footer/Pagination summary */}
            <div className="p-4 border-t border-(--color-border) flex items-center justify-between text-xs text-(--color-text-muted)">
                <span>{filteredAndSortedData.length} submissions selected</span>
                <span>Page 1 of 1</span>
            </div>
        </div>
    );
}
