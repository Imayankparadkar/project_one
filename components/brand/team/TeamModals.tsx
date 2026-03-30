import React, { useState } from "react";
import { Plus, X, Eye, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TeamModalsProps {
    isManageRolesModalOpen: boolean;
    isInviteModalOpen: boolean;
    onClose: () => void;
    selectedModalRole: string;
    setSelectedModalRole: (role: string) => void;
}

export function TeamModals({
    isManageRolesModalOpen,
    isInviteModalOpen,
    onClose,
    selectedModalRole,
    setSelectedModalRole
}: TeamModalsProps) {

    const [isExpanded, setIsExpanded] = useState(false);
    const [isCreatingCustomRole, setIsCreatingCustomRole] = useState(false);
    const [customRoleName, setCustomRoleName] = useState("");
    const [customPermissions, setCustomPermissions] = useState<Record<string, boolean>>({});

    const handleClose = () => {
        setIsExpanded(false);
        setIsCreatingCustomRole(false);
        setCustomRoleName("");
        setCustomPermissions({});
        onClose();
    };
    const rolesList = [
        { id: "Owner", title: "Owner", desc: "Full access" },
        { id: "Operations", title: "Operations", desc: "Manage products, members, settings & payments" },
        { id: "Sales", title: "Sales", desc: "Members, plans, payments & promo codes" },
        { id: "Support", title: "Support", desc: "Chat, forums, support tickets & content moderation" },
        { id: "Advertiser", title: "Advertiser", desc: "Create & manage ad campaigns and spend company ba..." }
    ];

    const permissionsList = [
        { id: 'products', title: 'Products', desc: 'Manage, edit and delete products and apps. Attach and detach experiences. View and export product analytics' },
        { id: 'members', title: 'Members', desc: 'Manage members including kick, mute, ban and unban. View member emails, phone numbers and payment methods. Edit memberships. View and export member analytics' },
        { id: 'payments', title: 'Payments', desc: 'Charge and refund members. View and manage payment disputes. View and export payment history. Access the resolution center', alert: 'Affects revenue' },
        { id: 'invoices', title: 'Invoices', desc: 'View, create, edit and export invoices', alert: 'Affects billing' },
        { id: 'payouts', title: 'Payouts', desc: 'Add, edit and remove payout accounts. Initiate and view past withdrawals. Transfer funds between team members. Create and manage crypto wallets. View company balance', alert: 'Controls money movement' },
        { id: 'chat', title: 'Chat', desc: 'Read, send and delete messages. Create and manage DM channels. Manage chat webhooks' },
        { id: 'forums', title: 'Forums', desc: 'Read, create and moderate forum posts' },
        { id: 'support_tickets', title: 'Support tickets', desc: 'View, create and reply to support tickets' },
        { id: 'courses', title: 'Courses', desc: 'View and edit courses, including lessons and structure' },
        { id: 'content_rewards', title: 'Content rewards', desc: 'View, create, edit and delete campaigns. Approve and reject submissions. Export campaign data' },
        { id: 'affiliates', title: 'Affiliates', desc: 'View, add and edit affiliates and referral settings' },
        { id: 'promo_codes', title: 'Promo codes', desc: 'View, create, edit and delete promo codes' },
        { id: 'tracking_links', title: 'Tracking links', desc: 'Create, edit and delete tracking links. View and export link analytics' },
        { id: 'ads', title: 'Ads', desc: 'View, create and edit ad campaigns. Log conversions and add credits. View company dashboard stats. Spend company balance on ads', alert: 'Can spend company balance' },
        { id: 'livestreaming', title: 'Livestreaming', desc: 'Create, moderate and delete livestreams. Manage stream recordings and chat' },
        { id: 'notifications', title: 'Notifications', desc: 'Send email and push notifications to members' },
        { id: 'team', title: 'Team', desc: 'Invite and remove team members. Create, edit, assign and delete roles. View team member list and emails', alert: 'Controls access to your business' },
        { id: 'company_settings', title: 'Company settings', desc: 'Edit company profile, settings and tracking pixels. Manage legal and billing information', alert: 'Affects legal and billing' },
        { id: 'developer_tools', title: 'Developer tools', desc: 'Create and edit apps. Create and revoke API keys. Manage OAuth apps and webhooks. Manage app authorization grants and builds', alert: 'Controls API and app access' },
        { id: 'checkout', title: 'Checkout', desc: 'Create and delete checkout configurations. Create checkout sessions and requests. Manage company-wide checkout settings including payment methods', alert: 'Affects how customers pay' },
    ];

    const isSystemRolePermissionActive = (roleId: string, permId: string) => {
        if (roleId === 'Owner' || roleId === 'Operations') return true;
        if (roleId === 'Sales') {
            return ['products', 'members', 'payments', 'chat', 'forums', 'promo_codes', 'tracking_links', 'company_settings', 'checkout'].includes(permId);
        }
        if (roleId === 'Support') {
            return ['products', 'members', 'chat', 'forums', 'support_tickets', 'courses', 'content_rewards', 'tracking_links', 'livestreaming', 'company_settings', 'checkout'].includes(permId);
        }
        if (roleId === 'Advertiser') {
            return ['ads'].includes(permId);
        }
        return false;
    };

    return (
        <AnimatePresence>
            {(isManageRolesModalOpen || isInviteModalOpen) && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pb-20 md:pb-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                    />

                    {/* Modal Box */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className={`relative w-full ${isExpanded ? 'max-w-[850px] md:h-[650px]' : 'max-w-[440px]'} transition-all duration-300 bg-(--color-bg-card) border border-(--color-border-subtle) rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]`}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-5 border-b border-(--color-border-subtle) relative shrink-0">
                            {isExpanded && (
                                <button
                                    onClick={() => {
                                        setIsExpanded(false);
                                        setIsCreatingCustomRole(false);
                                    }}
                                    className="absolute left-5 flex items-center gap-1 text-(--color-text-secondary) hover:text-(--color-text-primary) transition-colors text-sm font-medium"
                                >
                                    <ChevronLeft size={16} /> Back
                                </button>
                            )}
                            <h2 className="text-lg font-bold text-(--color-text-primary) mx-auto">
                                {isManageRolesModalOpen ? "Manage roles" : "Add team member"}
                            </h2>
                            <button
                                onClick={handleClose}
                                className="absolute right-5 text-(--color-text-muted) hover:text-(--color-text-secondary) transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                            {/* LHS Roles List */}
                            <div className={`flex flex-col w-full ${isExpanded ? 'md:w-[340px] border-r border-(--color-border-subtle) shrink-0' : ''} overflow-y-auto h-full`}>
                                {isCreatingCustomRole ? (
                                    <div className="px-5 py-4 border-b border-(--color-border-subtle) bg-(--color-surface-hover) shrink-0">
                                        <input
                                            autoFocus
                                            type="text"
                                            placeholder="Role name"
                                            value={customRoleName}
                                            onChange={(e) => setCustomRoleName(e.target.value)}
                                            className="w-full bg-(--color-bg-primary) border border-(--color-border) rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-(--color-text-primary) placeholder:text-(--color-text-muted) shadow-sm"
                                        />
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setIsCreatingCustomRole(true);
                                            setIsExpanded(true);
                                            setSelectedModalRole("Custom");
                                        }}
                                        className="w-full shrink-0 text-left px-5 py-4 text-sm font-medium text-(--color-text-primary) border-b border-(--color-border-subtle) flex items-center gap-2 hover:bg-(--color-surface-hover) transition-colors"
                                    >
                                        <Plus size={16} /> New custom role
                                    </button>
                                )}

                                {/* Roles List */}
                                <div className="flex flex-col">
                                    {rolesList.map((role) => (
                                        <div
                                            key={role.id}
                                            onClick={() => {
                                                setSelectedModalRole(role.id);
                                                setIsCreatingCustomRole(false);
                                            }}
                                            className={`flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-(--color-surface-hover) transition-colors group ${selectedModalRole === role.id && !isCreatingCustomRole ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="mt-0.5 flex items-center justify-center shrink-0 w-5 h-5 rounded-full border border-(--color-border) bg-(--color-bg-primary)">
                                                    {selectedModalRole === role.id && !isCreatingCustomRole && <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-(--color-text-primary)">{role.title}</span>
                                                    <span className="text-xs text-(--color-text-secondary) mt-0.5 leading-snug">{role.desc}</span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedModalRole(role.id);
                                                    setIsCreatingCustomRole(false);
                                                    setIsExpanded(true);
                                                }}
                                                className="text-(--color-text-muted) hover:text-(--color-text-secondary) transition-colors p-1 rounded-md hover:bg-(--color-border-subtle)"
                                            >
                                                <Eye size={18} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* RHS Permissions List */}
                            {isExpanded && (
                                <div className="flex-1 overflow-y-auto bg-(--color-bg-primary) p-5 sm:p-6">
                                    <div className="text-xs text-(--color-text-secondary) mb-5">
                                        {isCreatingCustomRole || selectedModalRole === "Custom"
                                            ? "Configure custom permissions for this role"
                                            : "View only — system roles cannot be edited"}
                                    </div>
                                    <div className="flex flex-col gap-5">
                                        {permissionsList.map(perm => {
                                            const isCustom = isCreatingCustomRole || selectedModalRole === "Custom";
                                            const isActive = isCustom ? customPermissions[perm.id] : isSystemRolePermissionActive(selectedModalRole, perm.id);

                                            return (
                                                <div key={perm.id} className="flex gap-3">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-0.5">
                                                            <span className="font-medium text-[13px] text-(--color-text-primary)">{perm.title}</span>
                                                            {perm.alert && <span className="text-[11px] text-yellow-600 dark:text-yellow-500 font-medium flex items-center">⚠️ {perm.alert}</span>}
                                                        </div>
                                                        <p className="text-[12px] text-(--color-text-secondary) leading-relaxed">{perm.desc}</p>
                                                    </div>
                                                    <div className="pt-0.5 shrink-0">
                                                        <div
                                                            onClick={() => {
                                                                if (isCustom) {
                                                                    setCustomPermissions(prev => ({ ...prev, [perm.id]: !prev[perm.id] }));
                                                                }
                                                            }}
                                                            className={`relative w-10 h-5 md:w-11 md:h-6 rounded-full flex items-center p-0.5 md:p-1 transition-colors ${isCustom
                                                                    ? isActive
                                                                        ? 'bg-blue-600 cursor-pointer'
                                                                        : 'bg-gray-200 dark:bg-gray-700 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600'
                                                                    : isActive
                                                                        ? 'bg-blue-600 cursor-not-allowed opacity-80'
                                                                        : 'bg-gray-200 dark:bg-gray-700 cursor-not-allowed opacity-50'
                                                                }`}
                                                        >
                                                            <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform ${isActive ? 'translate-x-5' : 'translate-x-0'}`} />
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Manage Roles Footer */}
                        {isManageRolesModalOpen && isCreatingCustomRole && (
                            <div className="p-4 sm:p-5 flex items-center justify-end bg-(--color-bg-card) border-t border-(--color-border-subtle) w-full shrink-0">
                                <button
                                    disabled={!customRoleName.trim()}
                                    className={`px-4 sm:px-6 py-2 sm:py-2.5 font-medium text-sm rounded-lg transition-colors shadow-sm
                                        ${customRoleName.trim()
                                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                                            : 'bg-(--color-bg-secondary) border border-(--color-border) text-(--color-text-muted) cursor-not-allowed'
                                        }`}
                                >
                                    Create role
                                </button>
                            </div>
                        )}

                        {/* Invite Footer */}
                        {isInviteModalOpen && !isCreatingCustomRole && (
                            <div className="p-4 sm:p-5 flex items-center gap-2 sm:gap-3 bg-(--color-bg-card) border-t border-(--color-border-subtle) w-full shrink-0">
                                <input
                                    type="email"
                                    placeholder="email@company.com"
                                    className="flex-1 min-w-0 bg-(--color-bg-primary) border border-(--color-border) rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-(--color-text-primary) placeholder:text-(--color-text-muted) shadow-sm"
                                />
                                <button className="shrink-0 px-4 sm:px-5 py-2 sm:py-2.5 bg-(--color-bg-secondary) border border-(--color-border) text-(--color-text-muted) font-medium text-sm rounded-lg cursor-not-allowed hidden sm:block">
                                    Invite Team Member
                                </button>
                                <button className="shrink-0 px-4 sm:px-5 py-2 sm:py-2.5 bg-(--color-bg-secondary) border border-(--color-border) text-(--color-text-muted) font-medium text-sm rounded-lg cursor-not-allowed sm:hidden block">
                                    Invite
                                </button>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
