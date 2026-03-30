"use client";

import React from "react";
import { GripVertical, ChevronsUpDown, Smile, ExternalLink } from "lucide-react";

export default function ResolutionCenterPage() {
    const columns = [
        { label: "Reason", sort: false, grip: false },
        { label: "Status", sort: false, grip: true },
        { label: "Product", sort: false, grip: true },
        { label: "Amount", sort: false, grip: true },
        { label: "Opened on", sort: true, grip: true },
        { label: "Due date", sort: true, grip: true },
        { label: "Closed on", sort: false, grip: true },
    ];

    // Sample data for demonstration
    const cases = [
        {
            reason: "Payment failure",
            status: "Closed",
            product: "Ultra Pass",
            amount: "$120.00",
            openedOn: "Feb 05, 2026",
            dueDate: "Feb 12, 2026",
            closedOn: "Feb 07, 2026"
        },
        {
            reason: "Access issue",
            status: "Pending",
            product: "Basic Tier",
            amount: "$29.00",
            openedOn: "Feb 14, 2026",
            dueDate: "Feb 21, 2026",
            closedOn: "-"
        }
    ];

    return (
        <div className="min-h-screen bg-black text-text-primary">
            <div className="w-full">
                {/* Unified Horizontal Scroll Container */}
                <div className="overflow-x-auto">
                    <div className="min-w-[1100px]">
                        {/* Table Header - Sticky vertically, scrolls horizontally with body */}
                        <div className="border-b border-zinc-900 sticky top-0 bg-black z-10">
                            <div className="flex items-center px-6 py-4">
                                {columns.map((col, i) => (
                                    <div
                                        key={i}
                                        className="flex-1 flex items-center gap-2 group cursor-default"
                                    >
                                        <span className="text-[13px] font-bold text-zinc-500 group-hover:text-zinc-300 transition-colors">
                                            {col.label}
                                        </span>
                                        {col.sort && (
                                            <ChevronsUpDown size={14} className="text-zinc-600" />
                                        )}
                                        {col.grip && (
                                            <GripVertical size={14} className="text-zinc-700 opacity-60" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Table Content */}
                        {cases.length > 0 ? (
                            <div className="divide-y divide-zinc-900/50">
                                {cases.map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center px-6 py-5 hover:bg-zinc-900/20 transition-colors group cursor-pointer"
                                    >
                                        <div className="flex-1 flex items-center gap-3">
                                            <span className="font-bold text-[15px]">{item.reason}</span>
                                            <ExternalLink size={14} className="text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                        <div className="flex-1">
                                            <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${item.status === 'Closed'
                                                    ? 'bg-zinc-800 text-zinc-400'
                                                    : 'bg-blue-600/10 text-blue-500 border border-blue-500/20'
                                                }`}>
                                                {item.status}
                                            </span>
                                        </div>
                                        <div className="flex-1 text-[14px] text-zinc-400">{item.product}</div>
                                        <div className="flex-1 text-[14px] font-bold">{item.amount}</div>
                                        <div className="flex-1 text-[14px] text-zinc-500">{item.openedOn}</div>
                                        <div className="flex-1 text-[14px] text-zinc-500">{item.dueDate}</div>
                                        <div className="flex-1 text-[14px] text-zinc-500">{item.closedOn}</div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            /* Empty State Content */
                            <div className="flex flex-col items-center justify-center py-40 px-6 text-center">
                                <div className="w-24 h-24 rounded-3xl bg-zinc-900/50 border border-zinc-800/50 flex items-center justify-center mb-8">
                                    <Smile size={48} className="text-zinc-500 opacity-40" />
                                </div>

                                <h2 className="text-xl font-bold mb-2">No resolution cases yet</h2>
                                <p className="text-sm text-zinc-500 max-w-md mx-auto leading-relaxed">
                                    When you report an issue with a Whop membership, it will be listed here.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
