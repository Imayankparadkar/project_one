"use client";

import React, { useState, useCallback } from "react";
import { Rocket, ChevronLeft, ChevronRight, GripVertical } from "lucide-react";
import { motion } from "motion/react";

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
    <div className={`${isSettingsView ? "p-4 md:p-8 min-h-0" : "min-h-screen p-6 md:p-10"} bg-background text-foreground`}>
      {/* Header */}
      {!isSettingsView && (
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Balance</h1>
        </div>
      )}

      {/* Balance Card */}
      <div className={`${isSettingsView ? "max-w-2xl" : "max-w-2xl"} mx-auto mb-8`}>
        <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
          {/* Total Balance */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-medium text-muted-foreground">Total balance</h2>
              <div className="w-4 h-4 rounded-full bg-muted flex items-center justify-center">
                <span className="text-[10px] text-muted-foreground">?</span>
              </div>
            </div>
            <div className="text-4xl font-bold">${totalBalance.toFixed(2)}</div>
          </div>

          {/* Available Balance */}
          <div className="flex items-center justify-between py-4 border-t border-border">
            <span className="text-sm text-muted-foreground">Available balance</span>
            <span className="text-sm font-semibold">${availableBalance.toFixed(2)}</span>
          </div>

          {/* Verify Identity Button */}
          <button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-text-primary font-semibold rounded-lg transition-colors">
            Verify your identity
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className={`${isSettingsView ? "max-w-4xl" : "max-w-6xl"} mx-auto`}>
        <div className="flex items-center gap-1 border-b border-border mb-6">
          <button
            onClick={() => setActiveTab("withdrawals")}
            className={`relative px-4 py-3 text-sm font-semibold transition-colors ${activeTab === "withdrawals"
              ? "text-[#d4af37]"
              : "text-muted-foreground hover:text-foreground"
              }`}
          >
            Withdrawals
            {activeTab === "withdrawals" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d4af37]"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab("deposits")}
            className={`relative px-4 py-3 text-sm font-semibold transition-colors ${activeTab === "deposits"
              ? "text-[#d4af37]"
              : "text-muted-foreground hover:text-foreground"
              }`}
          >
            Deposits
            {activeTab === "deposits" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d4af37]"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab("deductions")}
            className={`relative px-4 py-3 text-sm font-semibold transition-colors ${activeTab === "deductions"
              ? "text-[#d4af37]"
              : "text-muted-foreground hover:text-foreground"
              }`}
          >
            Deductions
            {activeTab === "deductions" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d4af37]"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        </div>

        {/* Table Container with Horizontal Scroll */}
        <div className="bg-card border border-border rounded-t-2xl overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Table Header */}
            <div className={`grid grid-cols-6 gap-0 px-6 py-4 text-xs font-semibold text-muted-foreground border-b border-border`}>
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
                          ? "bg-[#d4af37]/10 border border-[#d4af37]/30 border-dashed"
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
                        className="cursor-grab active:cursor-grabbing p-1 rounded hover:bg-muted/50 transition-colors"
                        title="Drag to reorder column"
                      >
                        <GripVertical size={12} className="text-muted-foreground/50 hover:text-muted-foreground transition-colors" />
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>

            {/* Empty State */}
            {transactions.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 px-6">
                <div className="w-16 h-16 bg-muted/30 rounded-2xl flex items-center justify-center mb-4 border border-border">
                  <Rocket className="text-muted-foreground" size={32} />
                </div>
                <h3 className="text-lg font-bold mb-2">
                  No {activeTab} yet
                </h3>
                <p className="text-sm text-muted-foreground text-center max-w-sm">
                  {activeTab === "withdrawals"
                    ? "When you withdraw money from your BennyBucks account, it will be displayed here."
                    : `Your ${activeTab} will appear here.`
                  }
                </p>
              </div>
            )}
            {/* Pagination */}
            {transactions.length === 0 && (
              <div className="bg-card border-t border-border px-6 py-4 flex items-center justify-between rounded-b-2xl">
                <button
                  disabled
                  className="px-3 py-1.5 text-sm font-medium text-muted-foreground bg-muted/30 rounded-md cursor-not-allowed opacity-50"
                >
                  <ChevronLeft size={16} className="inline mr-1" />
                  Previous
                </button>
                <button
                  disabled
                  className="px-3 py-1.5 text-sm font-medium text-muted-foreground bg-muted/30 rounded-md cursor-not-allowed opacity-50"
                >
                  Next
                  <ChevronRight size={16} className="inline ml-1" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className={`${isSettingsView ? "max-w-4xl" : "max-w-6xl"} mx-auto mt-6`}>
        <p className="text-xs text-muted-foreground text-center leading-relaxed">
          *BennyBucks is a technology company, not a bank. Payment services are provided by BennyBucks&apos;s payment partners, including Stripe. BennyBucks Balances are held for you by Cross River Bank (member FDIC) at another partner bank. BennyBucks Balances are not FDIC insured.
        </p>
      </div>
    </div>
  );
}
