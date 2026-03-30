"use client";

import React, { useState, useCallback } from "react";
import { Rocket, ChevronLeft, ChevronRight, GripVertical, Upload } from "lucide-react";
import { motion } from "framer-motion";

type TabType = "withdrawals" | "deposits" | "deductions";

type Transaction = {
    id: string;
    amount: number;
    status: "completed" | "pending" | "failed";
    sentTo: string;
    initiatedAt: string;
    estimatedArrival: string;
    receipt?: string;
};

type ColumnDef = {
    id: string;
    label: string;
};

const defaultDepositColumns: ColumnDef[] = [
    { id: "amount", label: "Amount" },
    { id: "fee", label: "Fee" },
    { id: "net_amount", label: "Net amount" },
    { id: "status", label: "Status" },
    { id: "credit_type", label: "Credit type" },
    { id: "release_date", label: "Release date" },
];

export default function BalancePage({ isSettingsView = false }: { isSettingsView?: boolean }) {
    const [activeTab, setActiveTab] = useState<TabType>("withdrawals");
    const [transactions] = useState<Transaction[]>([]);
    const [depositColumns, setDepositColumns] = useState<ColumnDef[]>(defaultDepositColumns);
    const [draggedColIndex, setDraggedColIndex] = useState<number | null>(null);
    const [dragOverColIndex, setDragOverColIndex] = useState<number | null>(null);

    const totalBalance = 0.00;
    const availableBalance = 0.00;

    const handleDragStart = useCallback((e: React.DragEvent, index: number) => {
        setDraggedColIndex(index);
        e.dataTransfer.effectAllowed = "move";
        // Set a transparent drag image so default ghost doesn't show weirdly
        const ghost = document.createElement("div");
        ghost.style.opacity = "0";
        document.body.appendChild(ghost);
        e.dataTransfer.setDragImage(ghost, 0, 0);
        setTimeout(() => document.body.removeChild(ghost), 0);
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent, index: number) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        setDragOverColIndex(index);
    }, []);

    const handleDragEnd = useCallback(() => {
        if (draggedColIndex !== null && dragOverColIndex !== null && draggedColIndex !== dragOverColIndex) {
            setDepositColumns(prev => {
                const newCols = [...prev];
                const [draggedCol] = newCols.splice(draggedColIndex, 1);
                newCols.splice(dragOverColIndex, 0, draggedCol);
                return newCols;
            });
        }
        setDraggedColIndex(null);
        setDragOverColIndex(null);
    }, [draggedColIndex, dragOverColIndex]);

    const handleDragLeave = useCallback(() => {
        setDragOverColIndex(null);
    }, []);

    return (
        <div className={`flex flex-col bg-campaigns-page text-(--color-text-primary) overflow-y-auto w-full border-x-0 ${isSettingsView ? "min-h-0 bg-transparent" : "min-h-screen h-full pb-32 lg:pb-0"}`}>
            <div className={`w-full mx-auto ${isSettingsView ? "p-4 md:p-8" : "p-4 lg:p-8 pb-4 max-w-7xl"}`}>
                {/* Header */}
                {!isSettingsView && (
                    <div className="mb-8 mt-4">
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-(--color-text-primary)">Balance</h1>
                    </div>
                )}

                {/* Balance Section */}
                <div className={`${isSettingsView ? "max-w-4xl" : "max-w-6xl"} mx-auto mb-6`}>
                    <div className="space-y-4">
                        <div className="space-y-1 mt-6">
                            <h2 className="text-[15px] font-medium text-(--color-text-secondary)">Total balance</h2>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-semibold text-(--color-text-primary)">
                                    ${totalBalance.toFixed(2)}
                                </span>
                                <span className="text-[28px] text-(--color-text-secondary) font-medium">USD</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Withdraw Button */}
                <div className={`${isSettingsView ? "max-w-4xl" : "max-w-6xl"} mx-auto mb-8`}>
                    <button className="w-full h-11 bg-(--withdraw-btn-color) hover:bg-(--withdraw-btn-color-hover) text-[#235acf] rounded-lg flex items-center justify-center gap-2 font-medium transition-colors border border-blue-100 dark:border-[#1a2844]">
                        <Upload size={18} />
                        Withdraw
                    </button>
                </div>

                {/* Tabs */}
                <div className={`${isSettingsView ? "max-w-4xl" : "max-w-6xl"} mx-auto`}>
                    <div className="flex items-center gap-2 border-b border-(--color-border) mb-6 overflow-x-auto no-scrollbar pb-px">
                        <button
                            onClick={() => setActiveTab("withdrawals")}
                            className={`relative px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeTab === "withdrawals"
                                ? "text-(--color-text-primary)"
                                : "text-(--color-text-secondary) hover:text-(--color-text-primary)"
                                }`}
                        >
                            Withdrawals
                            {activeTab === "withdrawals" && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab("deposits")}
                            className={`relative px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeTab === "deposits"
                                ? "text-(--color-text-primary)"
                                : "text-(--color-text-secondary) hover:text-(--color-text-primary)"
                                }`}
                        >
                            Deposits
                            {activeTab === "deposits" && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab("deductions")}
                            className={`relative px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeTab === "deductions"
                                ? "text-(--color-text-primary)"
                                : "text-(--color-text-secondary) hover:text-(--color-text-primary)"
                                }`}
                        >
                            Deductions
                            {activeTab === "deductions" && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            )}
                        </button>
                    </div>

                    {/* Table Container */}
                    <div className={`${isSettingsView ? "bg-(--color-bg-primary)" : "bg-(--color-bg-card)"} border border-(--color-border-subtle) rounded-t-2xl overflow-hidden`}>
                        <div className="overflow-x-auto w-full">
                            <div className="min-w-[800px]">
                                {/* Table Header */}
                                <div className={`grid grid-cols-6 gap-0 px-6 py-4 text-xs font-semibold text-(--color-text-secondary) border-b border-(--color-border-subtle)`}>
                                    {activeTab === "withdrawals" ? (
                                        <>
                                            <div className="px-2">Amount</div>
                                            <div className="px-2">Status</div>
                                            <div className="px-2">Sent to</div>
                                            <div className="px-2">Initiated at</div>
                                            <div className="px-2">Estimated arrival</div>
                                            <div className="px-2">Receipt</div>
                                        </>
                                    ) : (
                                        <>
                                            {depositColumns.map((col, index) => (
                                                <div
                                                    key={col.id}
                                                    className={`flex items-center justify-between px-2 py-1 rounded-md transition-all duration-200 select-none ${draggedColIndex === index
                                                        ? "opacity-40 scale-95"
                                                        : ""
                                                        } ${dragOverColIndex === index && draggedColIndex !== null && draggedColIndex !== index
                                                            ? "bg-(--color-border-subtle) border border-(--color-border) border-dashed"
                                                            : "border border-transparent"
                                                        }`}
                                                    onDragOver={(e) => handleDragOver(e, index)}
                                                    onDragLeave={handleDragLeave}
                                                    onDrop={handleDragEnd}
                                                >
                                                    <span>{col.label}</span>
                                                    <div
                                                        draggable
                                                        onDragStart={(e) => handleDragStart(e, index)}
                                                        onDragEnd={handleDragEnd}
                                                        className="cursor-grab active:cursor-grabbing p-1 rounded hover:bg-(--color-surface-hover) transition-colors"
                                                        title="Drag to reorder column"
                                                    >
                                                        <GripVertical size={12} className="text-(--color-text-muted) hover:text-(--color-text-secondary) transition-colors" />
                                                    </div>
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Empty State */}
                        {transactions.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-20 px-6">
                                <div className="w-16 h-16 bg-(--color-bg-tertiary) rounded-2xl flex items-center justify-center mb-4 border border-(--color-border)">
                                    <Rocket className="text-(--color-text-muted)" size={32} />
                                </div>
                                <h3 className="text-lg font-bold mb-2 text-(--color-text-primary)">
                                    No {activeTab} yet
                                </h3>
                                <p className="text-sm text-(--color-text-secondary) text-center max-w-sm">
                                    {activeTab === "withdrawals"
                                        ? "When you withdraw money from your BennyBucks account, it will be displayed here."
                                        : `Your ${activeTab} will appear here.`
                                    }
                                </p>
                            </div>
                        )}
                        {/* Pagination */}
                        {transactions.length === 0 && (
                            <div className={`${isSettingsView ? "bg-(--color-bg-primary)" : "bg-(--color-bg-card)"} border-t border-(--color-border-subtle) px-6 py-4 flex items-center justify-between rounded-b-2xl`}>
                                <button
                                    disabled
                                    className="px-3 py-1.5 text-sm font-medium text-(--color-text-secondary) bg-(--color-bg-tertiary) rounded-md cursor-not-allowed opacity-50"
                                >
                                    <ChevronLeft size={16} className="inline mr-1" />
                                    Previous
                                </button>
                                <button
                                    disabled
                                    className="px-3 py-1.5 text-sm font-medium text-(--color-text-secondary) bg-(--color-bg-tertiary) rounded-md cursor-not-allowed opacity-50"
                                >
                                    Next
                                    <ChevronRight size={16} className="inline ml-1" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Note */}
                <div className={`${isSettingsView ? "max-w-4xl" : "max-w-6xl"} mx-auto mt-6`}>
                    <p className="text-xs text-(--color-text-secondary) text-center leading-relaxed">
                        *BennyBucks is a technology company, not a bank. Payment services are provided by BennyBucks&apos;s payment partners, including Stripe. BennyBucks Balances are held for you by Cross River Bank (member FDIC) at another partner bank. BennyBucks Balances are not FDIC insured.
                    </p>
                </div>
            </div>
        </div>
    );
}