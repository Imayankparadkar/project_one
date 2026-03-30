"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, GripVertical, Plus, Settings, X, Check, Copy, Rocket, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { mockUsers } from "@/lib/data/users";
import { mockAuditLogs } from "@/lib/data/auditLogs";
import { mockCampaigns } from "@/lib/data/campaigns";
import Image from "next/image";
import { TeamModals } from "@/components/brand/team/TeamModals";

// Helper function for relative times
function timeAgo(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return `${diffInDays} days ago`;
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) return `${diffInMonths} months ago`;
    return `${Math.floor(diffInMonths / 12)} years ago`;
}

type MemberTabType = "members" | "invites";

type ColumnDef = {
    id: string;
    label: string;
    visible: boolean;
};

const defaultAuditColumns: ColumnDef[] = [
    { id: "resource", label: "Resource ID", visible: false },
    { id: "changes", label: "Changes", visible: true },
    { id: "date", label: "Date", visible: true },
];

export default function TeamPage() {
    const [activeTab, setActiveTab] = useState<MemberTabType>("members");
    const [require2FA, setRequire2FA] = useState(false);

    // Audit logs state
    const [auditColumns, setAuditColumns] = useState<ColumnDef[]>(defaultAuditColumns);
    const [draggedColIndex, setDraggedColIndex] = useState<number | null>(null);
    const [dragOverColIndex, setDragOverColIndex] = useState<number | null>(null);
    const [isEditColsOpen, setIsEditColsOpen] = useState(false);

    // Member Table Drag State
    const [memberColumns, setMemberColumns] = useState<ColumnDef[]>([
        { id: "role", label: "Role", visible: true },
        { id: "email", label: "Email", visible: true },
        { id: "auth", label: "Auth", visible: true },
        { id: "pay", label: "Pay", visible: true },
    ]);
    const [memberDraggedColIndex, setMemberDraggedColIndex] = useState<number | null>(null);
    const [memberDragOverColIndex, setMemberDragOverColIndex] = useState<number | null>(null);

    // Filter Dropdowns State
    const [openFilter, setOpenFilter] = useState<string | null>(null);
    const [resourceFilter, setResourceFilter] = useState<string[]>([]);
    const [eventFilter, setEventFilter] = useState<string[]>([]);
    const [dateFilter, setDateFilter] = useState<string | null>(null);

    // Member Options Dropdown State
    const [memberOptionsOpenId, setMemberOptionsOpenId] = useState<string | null>(null);
    const [memberDetailsOpenId, setMemberDetailsOpenId] = useState<string | null>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [roleDropdownOpenId, setRoleDropdownOpenId] = useState<string | null>(null);
    const [memberRoles, setMemberRoles] = useState<Record<string, string>>({});

    const handleCopyId = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText(id);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [isPerPageOpen, setIsPerPageOpen] = useState(false);

    // Modals State
    const [isManageRolesModalOpen, setIsManageRolesModalOpen] = useState(false);
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [selectedModalRole, setSelectedModalRole] = useState("Owner");

    const editColsRef = useRef<HTMLDivElement>(null);
    const filterRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const perPageRef = useRef<HTMLDivElement>(null);

    // Close dropdowns on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (editColsRef.current && !editColsRef.current.contains(event.target as Node)) {
                setIsEditColsOpen(false);
            }
            if (openFilter) {
                const currentRef = filterRefs.current[openFilter];
                if (currentRef && !currentRef.contains(event.target as Node)) {
                    setOpenFilter(null);
                }
            }
            if (perPageRef.current && !perPageRef.current.contains(event.target as Node)) {
                setIsPerPageOpen(false);
            }
            // Close member options if clicking outside (simplified check for demo)
            if (!(event.target as Element).closest('.member-options-container')) {
                setMemberOptionsOpenId(null);
                setMemberDetailsOpenId(null);
            }
            if (!(event.target as Element).closest('.role-dropdown-container')) {
                setRoleDropdownOpenId(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [openFilter]);


    // Filters Data Processing
    const toggleFilterItem = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
        if (list.includes(item)) setList(list.filter(i => i !== item));
        else setList([...list, item]);
    };

    const clearFilter = (filterId: string) => {
        if (filterId === 'resource') setResourceFilter([]);
        else if (filterId === 'event') setEventFilter([]);
        else if (filterId === 'date') setDateFilter(null);
    };

    const filteredLogs = mockAuditLogs.filter(log => {
        if (resourceFilter.length > 0 && !resourceFilter.includes(log.resourceType)) return false;
        if (eventFilter.length > 0 && !eventFilter.includes(log.eventType)) return false;
        if (dateFilter) {
            const logDate = new Date(log.date);
            const now = new Date();
            const diffDays = (now.getTime() - logDate.getTime()) / (1000 * 3600 * 24);
            if (dateFilter === "Today") { if (diffDays >= 1) return false; }
            else if (dateFilter === "Last 7 days") { if (diffDays > 7) return false; }
            else if (dateFilter === "Last 4 weeks") { if (diffDays > 28) return false; }
            else if (dateFilter === "Last 3 months") { if (diffDays > 90) return false; }
            else if (dateFilter === "Last 12 months") { if (diffDays > 365) return false; }
        }
        return true;
    });

    const totalPages = Math.max(1, Math.ceil(filteredLogs.length / itemsPerPage));
    const paginatedLogs = filteredLogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [resourceFilter, eventFilter, dateFilter, itemsPerPage]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    // --- Drag and Drop for Columns ---
    const handleDragStart = useCallback((e: React.DragEvent, index: number) => {
        setDraggedColIndex(index);
        e.dataTransfer.effectAllowed = "move";
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
            setAuditColumns(prev => {
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

    const toggleColumnVisibility = (id: string) => {
        setAuditColumns(prev => prev.map(col => col.id === id ? { ...col, visible: !col.visible } : col));
    }

    // --- Drag and Drop for Member Columns ---
    const handleMemberDragStart = useCallback((e: React.DragEvent, index: number) => {
        setMemberDraggedColIndex(index);
        e.dataTransfer.effectAllowed = "move";
        const ghost = document.createElement("div");
        ghost.style.opacity = "0";
        document.body.appendChild(ghost);
        e.dataTransfer.setDragImage(ghost, 0, 0);
        setTimeout(() => document.body.removeChild(ghost), 0);
    }, []);

    const handleMemberDragOver = useCallback((e: React.DragEvent, index: number) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        setMemberDragOverColIndex(index);
    }, []);

    const handleMemberDragEnd = useCallback(() => {
        if (memberDraggedColIndex !== null && memberDragOverColIndex !== null && memberDraggedColIndex !== memberDragOverColIndex) {
            setMemberColumns(prev => {
                const newCols = [...prev];
                const [draggedCol] = newCols.splice(memberDraggedColIndex, 1);
                newCols.splice(memberDragOverColIndex, 0, draggedCol);
                return newCols;
            });
        }
        setMemberDraggedColIndex(null);
        setMemberDragOverColIndex(null);
    }, [memberDraggedColIndex, memberDragOverColIndex]);

    const handleMemberDragLeave = useCallback(() => {
        setMemberDragOverColIndex(null);
    }, []);

    // Resolvers
    const getUserName = (id: string) => mockUsers.find(u => u.id === id)?.name || id;
    const getUserAvatar = (id: string) => mockUsers.find(u => u.id === id)?.profilePicture || "";
    const getResourceName = (type: string, id: string) => {
        if (type === "Campaign") return mockCampaigns.find(c => c.id === id)?.name || id;
        return id;
    };

    return (
        <div className={`flex flex-col bg-campaigns-page text-(--color-text-primary) overflow-y-auto w-full border-x-0 min-h-screen h-full pb-32 lg:pb-0`}>
            <div className={`w-full mx-auto p-4 lg:p-8 pb-4 max-w-7xl space-y-8`}>

                {/* Two Factor Auth Section */}
                <div className="bg-(--color-bg-card) border border-(--color-border-subtle) rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-(--color-border-subtle)">
                        <h2 className="text-sm font-semibold text-(--color-text-primary)">Two-factor authentication</h2>
                    </div>
                    <div className="px-6 py-5 flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-medium text-(--color-text-primary)">Require 2FA</h3>
                            <p className="text-xs text-(--color-text-secondary) mt-0.5">Require your team members to enable two-factor authentication to make their accounts more secure.</p>
                        </div>
                        {/* Custom Switch */}
                        <button
                            type="button"
                            role="switch"
                            aria-checked={require2FA}
                            onClick={() => setRequire2FA(!require2FA)}
                            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${require2FA ? 'bg-blue-600' : 'bg-(--color-border)'}`}
                        >
                            <span
                                aria-hidden="true"
                                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${require2FA ? 'translate-x-4' : 'translate-x-0'}`}
                            />
                        </button>
                    </div>
                </div>

                {/* Team Members Section */}
                <div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 border-b border-(--color-border) gap-4 sm:gap-0">
                        {/* Tabs */}
                        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-px">
                            <button
                                onClick={() => setActiveTab("members")}
                                className={`relative px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeTab === "members"
                                    ? "text-(--color-text-primary)"
                                    : "text-(--color-text-secondary) hover:text-(--color-text-primary)"
                                    }`}
                            >
                                Members
                                {activeTab === "members" && (
                                    <motion.div
                                        layoutId="memberActiveTab"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                            </button>
                            <button
                                onClick={() => setActiveTab("invites")}
                                className={`relative px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeTab === "invites"
                                    ? "text-(--color-text-primary)"
                                    : "text-(--color-text-secondary) hover:text-(--color-text-primary)"
                                    }`}
                            >
                                Invites
                                {activeTab === "invites" && (
                                    <motion.div
                                        layoutId="memberActiveTab"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                            </button>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap items-center gap-2 pb-2 sm:pb-0">
                            <button className="h-8 px-3 flex items-center gap-2 bg-(--color-bg-secondary) border border-(--color-border) rounded-md text-xs font-medium text-(--color-text-secondary) hover:text-(--color-text-primary) transition-colors">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-open"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
                                Documentation
                            </button>
                            <button
                                onClick={() => setIsManageRolesModalOpen(true)}
                                className="h-8 px-3 flex items-center gap-2 bg-(--color-bg-secondary) border border-(--color-border) rounded-md text-xs font-medium text-(--color-text-secondary) hover:text-(--color-text-primary) transition-colors"
                            >
                                <Settings size={14} />
                                Manage roles
                            </button>
                            <button
                                onClick={() => setIsInviteModalOpen(true)}
                                className="h-8 px-3 flex items-center gap-2 bg-(--color-bg-primary) border border-(--color-border) rounded-md text-xs font-medium text-(--color-text-primary) hover:bg-(--color-surface-hover) transition-colors shadow-sm ml-1"
                            >
                                <Plus size={14} />
                                Invite team member
                            </button>
                        </div>
                    </div>

                    {/* Members Table */}
                    <div className="bg-(--color-bg-card) border border-(--color-border-subtle) rounded-t-xl mt-4 relative z-10 w-full overflow-hidden">
                        <div className="overflow-x-auto w-full">
                            <div className={`min-w-[800px] ${activeTab === "members" ? "min-h-[250px]" : ""}`}>
                                <div className="flex text-xs font-semibold text-(--color-text-secondary) border-b border-(--color-border-subtle)">
                                    <div className="px-6 py-3 w-[25%]">Team member</div>
                                    {memberColumns.filter(c => c.visible).map((col) => {
                                        const actualIndex = memberColumns.findIndex(c => c.id === col.id);
                                        return (
                                            <div
                                                key={col.id}
                                                draggable
                                                onDragStart={(e) => handleMemberDragStart(e, actualIndex)}
                                                onDragEnd={handleMemberDragEnd}
                                                onDragOver={(e) => handleMemberDragOver(e, actualIndex)}
                                                onDragLeave={handleMemberDragLeave}
                                                onDrop={handleMemberDragEnd}
                                                className={`py-3 flex-1 flex items-center gap-1 cursor-grab active:cursor-grabbing transition-colors hover:bg-(--color-surface-hover)
                                                ${memberDraggedColIndex === actualIndex ? "opacity-30 scale-95" : ""}
                                                ${memberDragOverColIndex === actualIndex && memberDraggedColIndex !== null && memberDraggedColIndex !== actualIndex ? "bg-(--color-border-subtle) border border-(--color-border) border-dashed" : ""}
                                            `}
                                            >
                                                {col.label} <GripVertical size={12} className="opacity-50 shrink-0" />
                                            </div>
                                        );
                                    })}
                                    <div className="w-12 border-l border-transparent"></div>
                                </div>

                                {activeTab === "members" && (
                                    mockUsers.map((member) => (
                                        <div key={member.id} className={`flex items-center border-b border-(--color-border-subtle) last:border-0 transition-colors group relative ${memberOptionsOpenId === member.id || roleDropdownOpenId === member.id ? 'z-20' : 'z-0'}`}>
                                            <div className="px-6 py-3 w-[25%] flex items-center gap-3">
                                                <Image
                                                    src={member.profilePicture}
                                                    alt={member.name}
                                                    width={24}
                                                    height={24}
                                                    className="w-6 h-6 rounded-full object-cover shrink-0"
                                                />
                                                <span className="text-sm font-medium text-(--color-text-primary)">{member.name}</span>
                                            </div>

                                            {memberColumns.filter(c => c.visible).map((col) => {
                                                if (col.id === "role") {
                                                    return (
                                                        <div key={col.id} className="py-3 flex-1 pr-4 relative role-dropdown-container">
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setRoleDropdownOpenId(roleDropdownOpenId === member.id ? null : member.id);
                                                                }}
                                                                className="flex items-center justify-between w-[90px] px-2 py-1 text-xs border border-(--color-border) rounded-md bg-(--color-bg-primary) text-(--color-text-primary) shadow-sm hover:bg-(--color-surface-hover) transition-colors"
                                                            >
                                                                {memberRoles[member.id] || "Owner"}
                                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                                            </button>

                                                            <AnimatePresence>
                                                                {roleDropdownOpenId === member.id && (
                                                                    <motion.div
                                                                        initial={{ opacity: 0, y: -5 }}
                                                                        animate={{ opacity: 1, y: 0 }}
                                                                        exit={{ opacity: 0, y: -5 }}
                                                                        transition={{ duration: 0.15 }}
                                                                        className="absolute top-10 left-0 w-36 bg-(--color-bg-card) border border-(--color-border) shadow-xl rounded-xl z-30 overflow-hidden"
                                                                    >
                                                                        <div className="flex flex-col py-1">
                                                                            {["Owner", "Operations", "Sales", "Support"].map((roleOption) => (
                                                                                <button
                                                                                    key={roleOption}
                                                                                    onClick={(e) => {
                                                                                        e.stopPropagation();
                                                                                        setMemberRoles(prev => ({ ...prev, [member.id]: roleOption }));
                                                                                        setRoleDropdownOpenId(null);
                                                                                    }}
                                                                                    className={`text-left px-4 py-2 hover:bg-(--color-surface-hover) text-xs mx-2 rounded-lg transition-colors ${(memberRoles[member.id] || "Owner") === roleOption ? 'text-blue-500 font-medium bg-blue-500/10 hover:bg-blue-500/20' : 'text-(--color-text-primary)'}`}
                                                                                >
                                                                                    {roleOption}
                                                                                </button>
                                                                            ))}
                                                                        </div>
                                                                    </motion.div>
                                                                )}
                                                            </AnimatePresence>
                                                        </div>
                                                    );
                                                }
                                                if (col.id === "email") {
                                                    return <div key={col.id} className="py-3 flex-1 text-xs text-(--color-text-secondary) pr-4">{member.email || "-"}</div>;
                                                }
                                                if (col.id === "auth") {
                                                    return (
                                                        <div key={col.id} className="py-3 flex-1 pr-4">
                                                            <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-yellow-500/10 text-yellow-600 border border-yellow-500/10">
                                                                One-step
                                                            </span>
                                                        </div>
                                                    );
                                                }
                                                if (col.id === "pay") {
                                                    return (
                                                        <div key={col.id} className="py-3 flex-1 pr-4">
                                                            <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-[#d4ff00] text-black">
                                                                Pay
                                                            </span>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            })}

                                            <div className="w-12 py-3 flex justify-center items-center border-l border-(--color-border-subtle) relative member-options-container">
                                                <button
                                                    onClick={() => setMemberOptionsOpenId(memberOptionsOpenId === member.id ? null : member.id)}
                                                    className="text-(--color-text-muted) hover:text-(--color-text-primary) transition-colors p-1"
                                                >
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></svg>
                                                </button>

                                                <AnimatePresence>
                                                    {memberOptionsOpenId === member.id && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 5 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: 5 }}
                                                            transition={{ duration: 0.15 }}
                                                            className="absolute top-10 right-8 w-48 bg-(--color-bg-card) border border-(--color-border) shadow-xl rounded-xl z-30 overflow-hidden"
                                                        >
                                                            <div className="flex flex-col py-1">
                                                                <button className="text-left px-4 py-2 hover:bg-(--color-surface-hover) text-sm mx-2 rounded-lg text-(--color-text-primary) transition-colors">
                                                                    Remove user
                                                                </button>
                                                                <button className="text-left px-4 py-2 hover:bg-(--color-surface-hover) text-sm mx-2 rounded-lg text-(--color-text-primary) transition-colors">
                                                                    Transfer ownership
                                                                </button>
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setMemberDetailsOpenId(memberDetailsOpenId === member.id ? null : member.id);
                                                                    }}
                                                                    className="text-left px-4 py-2 hover:bg-(--color-surface-hover) text-sm text-(--color-text-primary) mx-2 rounded-lg flex items-center justify-between transition-colors font-medium"
                                                                >
                                                                    Details
                                                                    <ChevronRight size={14} className={`text-(--color-text-muted) transition-transform ${memberDetailsOpenId === member.id ? 'translate-x-0.5 text-(--color-text-primary)' : ''}`} />
                                                                </button>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>

                                                <AnimatePresence>
                                                    {memberOptionsOpenId === member.id && memberDetailsOpenId === member.id && (
                                                        <motion.div
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            exit={{ opacity: 0, x: -10 }}
                                                            transition={{ duration: 0.15 }}
                                                            className="absolute top-[140px] right-8 sm:top-[88px] sm:right-[215px] w-48 sm:w-auto min-w-[180px] bg-(--color-bg-card) border border-(--color-border) shadow-xl rounded-xl z-40 overflow-hidden"
                                                        >
                                                            <div className="p-2">
                                                                <div
                                                                    onClick={(e) => handleCopyId(member.id, e)}
                                                                    className="bg-(--color-bg-secondary) border border-(--color-border-subtle) rounded-lg px-3 py-2 text-xs text-(--color-text-primary) break-all font-mono shadow-sm cursor-pointer hover:border-blue-500/50 hover:bg-blue-500/5 transition-all flex items-center justify-between group"
                                                                    title="Copy ID"
                                                                >
                                                                    <span className="truncate mr-3">{member.id}</span>
                                                                    {copiedId === member.id ? (
                                                                        <Check size={14} className="text-green-500 shrink-0" />
                                                                    ) : (
                                                                        <Copy size={14} className="text-(--color-text-muted) opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {activeTab !== "members" && (
                            <div className="flex flex-col items-center justify-center py-16 px-6">
                                <div className="w-16 h-16 bg-(--color-bg-card) rounded-2xl flex items-center justify-center mb-4 border border-(--color-border) shadow-sm">
                                    <Rocket className="text-(--color-text-secondary)" size={28} />
                                </div>
                                <h3 className="text-lg font-bold mb-1 text-(--color-text-primary)">
                                    No pending team invites yet
                                </h3>
                                <p className="text-sm text-(--color-text-secondary) text-center max-w-sm">
                                    You don't have any pending team invites yet. Once you do, they will show up here.
                                </p>
                            </div>
                        )}
                    </div>
                    {/* Pagination */}
                    <div className="bg-(--color-bg-card) border border-t-0 border-(--color-border-subtle) px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center gap-4 sm:gap-0 justify-between rounded-b-xl text-xs text-(--color-text-secondary)">
                        <div className="w-full sm:flex-1 text-center sm:text-left">Showing 1 to 1 of 1</div>
                        <div className="w-full sm:flex-1 flex justify-center items-center gap-1">
                            <button disabled className="p-1 rounded hover:bg-(--color-surface-hover) disabled:opacity-50"><ChevronLeft size={14} /></button>
                            <button className="min-w-[24px] h-6 flex items-center justify-center rounded bg-(--color-border) text-(--color-text-primary) font-medium">1</button>
                            <button disabled className="p-1 rounded hover:bg-(--color-surface-hover) disabled:opacity-50"><ChevronRight size={14} /></button>
                        </div>
                        <div className="w-full sm:flex-1 flex items-center justify-center sm:justify-end gap-2">
                            <span>Show</span>
                            <button className="flex items-center gap-1 px-2 py-1 rounded bg-(--color-bg-secondary) border border-(--color-border)">
                                10 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Audit Logs Section */}
                {activeTab === "members" && (
                    <div className="pt-4">
                        <h2 className="text-base font-bold text-(--color-text-primary) mb-4">Audit logs</h2>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 relative">
                            {/* Filters */}
                            <div className="flex items-center gap-2 flex-wrap">
                                {[
                                    { id: "resource", label: "Resource Type" },
                                    { id: "event", label: "Event Type" },
                                    { id: "date", label: "Date Created" }
                                ].map((filter) => {
                                    const activeCount = filter.id === 'resource' ? resourceFilter.length : filter.id === 'event' ? eventFilter.length : dateFilter ? 1 : 0;
                                    const isActive = activeCount > 0;

                                    return (
                                        <div key={filter.id} className="relative" ref={el => { if (el) filterRefs.current[filter.id] = el; }}>
                                            <button
                                                onClick={() => setOpenFilter(openFilter === filter.id ? null : filter.id)}
                                                className={`h-8 px-3 rounded-full border border-dashed flex items-center gap-1.5 text-xs font-medium transition-all ${isActive ? 'border-blue-500 bg-blue-500/10 text-blue-500' : 'border-(--color-border) bg-transparent text-(--color-text-secondary) hover:border-solid hover:bg-(--color-surface-hover)'}`}
                                            >
                                                {isActive ? (
                                                    <X
                                                        size={14}
                                                        className="text-blue-500 hover:text-blue-600"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            clearFilter(filter.id);
                                                        }}
                                                    />
                                                ) : (
                                                    <Plus size={14} className="text-(--color-text-muted)" />
                                                )}
                                                {filter.label}
                                                {isActive && filter.id !== 'date' && <span className="ml-1 px-1.5 bg-blue-500 text-white rounded-full text-[10px] leading-4">{activeCount}</span>}
                                                {isActive && filter.id === 'date' && <span className="ml-1 font-semibold border-l border-blue-500/30 pl-1.5">{dateFilter}</span>}
                                            </button>

                                            <AnimatePresence>
                                                {openFilter === filter.id && filter.id !== "date" && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 5 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: 5 }}
                                                        transition={{ duration: 0.15 }}
                                                        className="absolute top-full left-0 mt-2 w-48 bg-(--color-bg-card) border border-(--color-border) shadow-xl rounded-lg z-20 overflow-hidden"
                                                    >
                                                        <div className="p-2 space-y-1">
                                                            {(filter.id === "resource" ? ["Company", "Campaign", "Product", "Plan", "Authorized User", "Discord Server", "Affiliate", "App", "Promo Code", "Stripe Account"]
                                                                : ["Create", "Update", "Delete"]).map((item) => {
                                                                    const isChecked = filter.id === 'resource' ? resourceFilter.includes(item) : eventFilter.includes(item);
                                                                    return (
                                                                        <label key={item} className="flex items-center gap-2 px-2 py-1.5 hover:bg-(--color-surface-hover) rounded-md cursor-pointer text-sm text-(--color-text-primary)">
                                                                            <input
                                                                                type="checkbox"
                                                                                checked={isChecked}
                                                                                onChange={() => toggleFilterItem(
                                                                                    filter.id === 'resource' ? resourceFilter : eventFilter,
                                                                                    filter.id === 'resource' ? setResourceFilter : setEventFilter,
                                                                                    item
                                                                                )}
                                                                                className="rounded border-(--color-border-subtle) bg-transparent"
                                                                            />
                                                                            {item}
                                                                        </label>
                                                                    );
                                                                })}
                                                        </div>
                                                    </motion.div>
                                                )}
                                                {openFilter === filter.id && filter.id === "date" && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 5 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: 5 }}
                                                        transition={{ duration: 0.15 }}
                                                        className="absolute top-full left-0 sm:left-auto right-auto sm:left-0 mt-2 w-[calc(100vw-2rem)] sm:w-auto sm:min-w-[320px] max-w-[340px] sm:max-w-none bg-(--color-bg-card) border border-(--color-border) shadow-xl rounded-lg z-20 overflow-hidden"
                                                    >
                                                        <div className="p-3 sm:p-4 flex flex-col sm:flex-row gap-4 sm:gap-6">
                                                            <div className="w-full sm:w-[130px] flex sm:block overflow-x-auto no-scrollbar gap-2 sm:gap-0 sm:space-y-0.5 border-b sm:border-b-0 sm:border-r border-(--color-border) pb-3 sm:pb-0 sm:pr-4">
                                                                {["Today", "Last 7 days", "Last 4 weeks", "Last 3 months", "Last 12 months"].map((item) => (
                                                                    <div
                                                                        key={item}
                                                                        onClick={() => setDateFilter(dateFilter === item ? null : item)}
                                                                        className={`shrink-0 px-3 py-1.5 text-sm rounded-md cursor-pointer ${dateFilter === item ? 'bg-(--color-surface-hover) text-(--color-text-primary)' : 'text-(--color-text-secondary) hover:bg-(--color-surface-hover)'}`}
                                                                    >
                                                                        {item}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <div className="flex-1 w-full sm:w-auto sm:min-w-[200px]">
                                                                {/* Decorative Calendar View for Mockup parity */}
                                                                <div className="flex justify-between items-center mb-4">
                                                                    <button className="p-1 px-1.5 border border-(--color-border) rounded-md bg-(--color-bg-secondary) hover:bg-(--color-surface-hover)"><ChevronLeft size={14} /></button>
                                                                    <div className="flex gap-2">
                                                                        <button className="bg-transparent border border-(--color-border) rounded-md text-sm px-2 py-1 hover:bg-(--color-surface-hover) flex items-center gap-1">March <ChevronRight size={12} className="rotate-90 text-(--color-text-muted)" /></button>
                                                                        <button className="bg-transparent border border-(--color-border) rounded-md text-sm px-2 py-1 hover:bg-(--color-surface-hover) flex items-center gap-1">2026 <ChevronRight size={12} className="rotate-90 text-(--color-text-muted)" /></button>
                                                                    </div>
                                                                    <button className="p-1 px-1.5 border border-(--color-border) rounded-md bg-(--color-bg-secondary) hover:bg-(--color-surface-hover)"><ChevronRight size={14} /></button>
                                                                </div>
                                                                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                                                                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d} className="text-xs font-bold text-(--color-text-secondary)">{d}</div>)}
                                                                </div>
                                                                <div className="grid grid-cols-7 gap-y-2 gap-x-1 text-center">
                                                                    {Array.from({ length: 31 }).map((_, i) => <div key={i} className="text-sm p-1 text-(--color-text-secondary) hover:bg-(--color-surface-hover) rounded cursor-pointer">{i + 1}</div>)}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Edit Columns */}
                            <div className="relative" ref={editColsRef}>
                                <button
                                    onClick={() => setIsEditColsOpen(!isEditColsOpen)}
                                    className="h-8 px-3 rounded-md border border-(--color-border-subtle) bg-(--color-bg-secondary) flex items-center gap-1.5 text-xs font-medium text-(--color-text-primary) hover:bg-(--color-surface-hover) transition-all"
                                >
                                    <Settings size={14} className="text-(--color-text-muted)" />
                                    Edit
                                </button>

                                <AnimatePresence>
                                    {isEditColsOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 5 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute top-full right-0 mt-2 w-56 bg-(--color-bg-card) border border-(--color-border) shadow-xl rounded-lg z-20"
                                        >
                                            <div className="p-3 border-b border-(--color-border-subtle)">
                                                <span className="text-xs font-semibold text-(--color-text-muted)">Columns</span>
                                            </div>
                                            <div className="p-2 space-y-1">
                                                {/* Draggable Columns */}
                                                {auditColumns.map((col, index) => (
                                                    <div
                                                        key={col.id}
                                                        draggable
                                                        onDragStart={(e) => handleDragStart(e, index)}
                                                        onDragEnd={handleDragEnd}
                                                        onDragOver={(e) => handleDragOver(e, index)}
                                                        onDragLeave={handleDragLeave}
                                                        onDrop={handleDragEnd}
                                                        className={`group flex items-center justify-between px-2 py-1.5 rounded-md text-sm text-(--color-text-primary) transition-all cursor-grab active:cursor-grabbing hover:bg-(--color-surface-hover)
                                                        ${draggedColIndex === index ? "opacity-30 scale-95" : ""} 
                                                        ${dragOverColIndex === index && draggedColIndex !== null && draggedColIndex !== index ? "bg-(--color-border-subtle) border border-(--color-border) border-dashed" : "border border-transparent"}`
                                                        }
                                                    >
                                                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => toggleColumnVisibility(col.id)}>
                                                            <div className="w-4 h-4 flex items-center justify-center">
                                                                {col.visible && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                                                            </div>
                                                            {col.label}
                                                        </div>
                                                        <GripVertical size={14} className="text-(--color-text-muted) group-hover:text-(--color-text-primary) transition-colors" />
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Audit Logs Table */}
                        <div className="bg-(--color-bg-card) border border-(--color-border-subtle) rounded-t-xl overflow-x-auto">
                            <div className="min-w-[800px]">
                                <div className="flex text-xs font-semibold text-(--color-text-secondary) border-b border-(--color-border-subtle)">
                                    <div className="px-6 py-3 w-[60%] border-r border-transparent">Event</div>
                                    {/* Map active columns to be draggable directly on the table header */}
                                    {auditColumns.filter(c => c.visible).map((col) => {
                                        // To allow dragging columns on header directly, we need to map the visible column index back to original auditColumns index to apply changes.
                                        const actualIndex = auditColumns.findIndex(c => c.id === col.id);

                                        return (
                                            <div
                                                key={col.id}
                                                draggable
                                                onDragStart={(e) => handleDragStart(e, actualIndex)}
                                                onDragEnd={handleDragEnd}
                                                onDragOver={(e) => handleDragOver(e, actualIndex)}
                                                onDragLeave={handleDragLeave}
                                                onDrop={handleDragEnd}
                                                className={`px-6 py-3 flex-1 flex items-center gap-1 cursor-grab active:cursor-grabbing transition-colors hover:bg-(--color-surface-hover)
                                                ${draggedColIndex === actualIndex ? "opacity-30 scale-95" : ""}
                                                ${dragOverColIndex === actualIndex && draggedColIndex !== null && draggedColIndex !== actualIndex ? "bg-(--color-border-subtle) border border-(--color-border) border-dashed" : ""}
                                            `}
                                            >
                                                {col.label} <GripVertical size={12} className="opacity-50" />
                                            </div>
                                        );
                                    })}
                                </div>

                                {paginatedLogs.length === 0 ? (
                                    <div className="py-12 text-center text-(--color-text-secondary) text-sm">No audit logs matching filters found.</div>
                                ) : paginatedLogs.map((log) => {
                                    const userName = getUserName(log.userId);
                                    const avatar = getUserAvatar(log.userId);
                                    const resourceName = getResourceName(log.resourceType, log.resourceId);
                                    const actionText = `${log.eventType.toLowerCase()} ${log.resourceType.toLowerCase()}`;
                                    const eventFullString = `${userName} ${actionText} ${resourceName}`;

                                    return (
                                        <div key={log.id} className="flex items-center text-sm border-b border-(--color-border-subtle) last:border-0 hover:bg-(--color-surface-hover) transition-colors">
                                            <div className="px-6 py-3 w-[60%] flex items-center gap-2">
                                                {avatar ? (
                                                    <Image
                                                        src={avatar}
                                                        alt={userName}
                                                        width={20}
                                                        height={20}
                                                        className="w-5 h-5 rounded-full object-cover shrink-0"
                                                    />
                                                ) : (
                                                    <div className="w-5 h-5 rounded-full bg-(--color-border) flex shrink-0" />
                                                )}
                                                <div className="group/tooltip relative max-w-[calc(100%-24px)] flex">
                                                    <div className="truncate text-(--color-text-primary)">
                                                        <span className="font-semibold text-(--color-text-primary)">{userName}</span>{" "}
                                                        <span className="text-(--color-text-secondary)">{actionText}</span>{" "}
                                                        <span className="text-blue-500">{resourceName}</span>
                                                    </div>
                                                    {/* Tooltip on hover if string is too long */}
                                                    {eventFullString.length > 80 && (
                                                        <div className="pointer-events-none absolute top-full left-0 mt-1 opacity-0 group-hover/tooltip:opacity-100 transition-opacity bg-(--color-bg-tertiary) text-(--color-text-primary) text-xs px-3 py-2 rounded-lg shadow-lg border border-(--color-border) max-w-[400px] z-10 whitespace-normal break-words">
                                                            <span className="font-semibold">{userName}</span>{" "}
                                                            <span className="text-(--color-text-secondary)">{actionText}</span>{" "}
                                                            <span className="text-blue-500">{resourceName}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Render values based on dynamic columns */}
                                            {auditColumns.filter(c => c.visible).map((col) => (
                                                <div key={col.id} className="px-6 py-3 flex-1 text-xs text-(--color-text-secondary)">
                                                    {col.id === 'changes' ? log.changes : col.id === 'date' ? timeAgo(log.date) : col.id === 'resource' ? log.resourceId : '-'}
                                                </div>
                                            ))}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        {/* Pagination */}
                        <div className="bg-(--color-bg-card) border border-t-0 border-(--color-border-subtle) px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center gap-4 sm:gap-0 justify-between rounded-b-xl text-xs text-(--color-text-secondary)">
                            <div className="w-full text-center sm:text-left">
                                {filteredLogs.length > 0 ? (
                                    <span>Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredLogs.length)} of {filteredLogs.length}</span>
                                ) : (
                                    <span>Showing 0 to 0 of 0</span>
                                )}
                            </div>
                            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto justify-center sm:justify-end">
                                <div className="flex items-center gap-1">
                                    <button
                                        disabled={currentPage === 1}
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        className="p-1 rounded hover:bg-(--color-surface-hover) disabled:opacity-50"
                                    >
                                        <ChevronLeft size={14} />
                                    </button>

                                    {Array.from({ length: totalPages }).map((_, i) => {
                                        const pageNum = i + 1;
                                        const isActive = currentPage === pageNum;
                                        // simple pagination ellipsis logic is skipped for simplicity since we don't have that many pages, just map them all
                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => handlePageChange(pageNum)}
                                                className={`min-w-[24px] h-6 flex items-center justify-center rounded transition-colors ${isActive ? 'bg-(--color-border) text-(--color-text-primary) font-medium' : 'hover:bg-(--color-surface-hover)'}`}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    })}

                                    <button
                                        disabled={currentPage === totalPages}
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        className="p-1 rounded hover:bg-(--color-surface-hover) disabled:opacity-50"
                                    >
                                        <ChevronRight size={14} />
                                    </button>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span>Show</span>
                                    <div className="relative" ref={perPageRef}>
                                        <button
                                            onClick={() => setIsPerPageOpen(!isPerPageOpen)}
                                            className="flex items-center gap-1 px-2 py-1 rounded bg-(--color-bg-secondary) border border-(--color-border) hover:bg-(--color-surface-hover) transition-colors"
                                        >
                                            {itemsPerPage} <ChevronDownIcon />
                                        </button>
                                        <AnimatePresence>
                                            {isPerPageOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 5 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 5 }}
                                                    transition={{ duration: 0.15 }}
                                                    className="absolute bottom-full right-0 mb-1 w-20 bg-(--color-bg-card) border border-(--color-border) shadow-xl rounded-lg z-20 overflow-hidden"
                                                >
                                                    <div className="p-1">
                                                        {[10, 25, 50].map(num => (
                                                            <div
                                                                key={num}
                                                                onClick={() => {
                                                                    setItemsPerPage(num);
                                                                    setIsPerPageOpen(false);
                                                                }}
                                                                className={`px-2 py-1.5 text-center rounded-md cursor-pointer hover:bg-(--color-surface-hover) ${itemsPerPage === num ? 'font-medium bg-(--color-surface-hover)' : ''}`}
                                                            >
                                                                {num}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <TeamModals
                isManageRolesModalOpen={isManageRolesModalOpen}
                isInviteModalOpen={isInviteModalOpen}
                onClose={() => {
                    setIsManageRolesModalOpen(false);
                    setIsInviteModalOpen(false);
                }}
                selectedModalRole={selectedModalRole}
                setSelectedModalRole={setSelectedModalRole}
            />
        </div>
    );
}

function ChevronDownIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
    )
}
