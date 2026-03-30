import React, { useState } from "react";
import {
    ChevronDown,
    Plus,
    X,
    Check,
    Link as LinkIcon,
    FileText,
    Instagram,
    Youtube,
    Pencil,
    GripVertical,
} from "lucide-react";
import { CampaignFormData, PlatformReward } from "../types";
import ThumbnailUploader from "../ThumbnailUploader";

interface Step7SummaryProps {
    formData: CampaignFormData;
    setFormData: React.Dispatch<React.SetStateAction<CampaignFormData>>;
}

// ─── Reusable field wrapper ─────────────────────────────────────────────────

const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="rounded-2xl border border-white/5 bg-white/[0.03] overflow-hidden">
        <div className="px-5 py-3 border-b border-white/5">
            <p className="text-xs font-semibold uppercase tracking-widest text-(--color-text-secondary)">{title}</p>
        </div>
        <div className="px-5 py-4 space-y-4">{children}</div>
    </div>
);

const FieldRow = ({
    label,
    children,
}: {
    label: React.ReactNode;
    children: React.ReactNode;
}) => (
    <div className="space-y-1.5">
        <label className="text-xs font-medium text-(--color-text-secondary) block w-full">{label}</label>
        {children}
    </div>
);

// ─── Pill tag ───────────────────────────────────────────────────────────────

const Pill = ({ children, onRemove }: { children: React.ReactNode; onRemove: () => void }) => (
    <span className="inline-flex items-center gap-1.5 bg-(--color-bg-input) border border-white/10 text-(--color-text-primary) text-xs font-medium px-2.5 py-1 rounded-full">
        {children}
        <button onClick={onRemove} className="text-(--color-text-secondary) hover:text-white transition-colors">
            <X className="w-3 h-3" />
        </button>
    </span>
);

// ─── Common styles ───────────────────────────────────────────────────────────

const inputClass =
    "w-full rounded-lg border border-[var(--color-border-input)] bg-[var(--color-bg-input)] bg-yellow-radial px-3 py-2 text-sm leading-5 tracking-[0.14px] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] outline-none transition-all focus:border-[var(--color-border-input-foc)] focus:ring-1 focus:ring-[var(--color-border-input-foc)]";

// ─── Inline reward mini-form ─────────────────────────────────────────────────

const RewardGrid = ({
    values,
    onChange,
}: {
    values: { rewardPerView: string; minPayout: string; maxPayout: string; submissionLimit: string; maxPayoutPerCreator: string };
    onChange: (field: string, val: string) => void;
}) => (
    <div className="space-y-3">
        <FieldRow label="Reward / 1M views (₹)">
            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-(--color-text-secondary)">₹</span>
                <input type="number" value={values.rewardPerView} onChange={(e) => onChange("rewardPerView", e.target.value)} className={`${inputClass} pl-7 no-spinners`} placeholder="10.00" />
            </div>
        </FieldRow>
        <div className="grid grid-cols-2 gap-3">
            <FieldRow label="Min Payout (₹)">
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-(--color-text-secondary)">₹</span>
                    <input type="number" value={values.minPayout} onChange={(e) => onChange("minPayout", e.target.value)} className={`${inputClass} pl-7 no-spinners`} placeholder="0.00" />
                </div>
            </FieldRow>
            <FieldRow label="Max Payout (₹)">
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-(--color-text-secondary)">₹</span>
                    <input type="number" value={values.maxPayout} onChange={(e) => onChange("maxPayout", e.target.value)} className={`${inputClass} pl-7 no-spinners`} placeholder="0.00" />
                </div>
            </FieldRow>
        </div>
        <div className="grid grid-cols-2 gap-3">
            <FieldRow label="Submission Limit">
                <input type="number" value={values.submissionLimit} onChange={(e) => onChange("submissionLimit", e.target.value)} className={`${inputClass} no-spinners`} placeholder="10" />
            </FieldRow>
            <FieldRow label="Max Payout / Creator (₹)">
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-(--color-text-secondary)">₹</span>
                    <input type="number" value={values.maxPayoutPerCreator} onChange={(e) => onChange("maxPayoutPerCreator", e.target.value)} className={`${inputClass} pl-7 no-spinners`} placeholder="0.00" />
                </div>
            </FieldRow>
        </div>
    </div>
);

// ─── Main Component ──────────────────────────────────────────────────────────

export default function Step7Summary({ formData, setFormData }: Step7SummaryProps) {
    // Requirements
    const [newReq, setNewReq] = useState("");
    // Links
    const [newLink, setNewLink] = useState("");
    const [addingLink, setAddingLink] = useState(false);
    // FAQs
    const [addingFAQ, setAddingFAQ] = useState(false);
    const [newFAQ, setNewFAQ] = useState({ question: "", answer: "" });
    // Inline edit tracking for FAQ
    const [editingFAQIdx, setEditingFAQIdx] = useState<number | null>(null);
    const [editFAQVal, setEditFAQVal] = useState({ question: "", answer: "" });

    // Application Questions
    const [isAddingQuestion, setIsAddingQuestion] = useState(false);
    const [newQuestion, setNewQuestion] = useState({
        text: "",
        type: "Text",
        required: false,
        fileUrl: ""
    });

    const AIButton = () => (
        <div className="group/ai relative">
            <div className="p-[1.5px] rounded-lg bg-ai-gradient">
                <button 
                    type="button" 
                    className="text-(--color-text-muted) hover:text-(--color-text-secondary) bg-[var(--color-bg-card)] p-1.5 rounded-[7px] transition-all cursor-pointer active:scale-95 flex items-center justify-center shrink-0"
                >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-grow-in">
                        <path d="M3.3877 9.29102C3.64259 8.65445 4.54384 8.65455 4.79883 9.29102L5.14551 10.1572C5.27246 10.4746 5.5245 10.7264 5.8418 10.8535L6.70898 11.2002C7.34583 11.455 7.34565 12.3564 6.70898 12.6113L5.8418 12.958C5.52446 13.085 5.2726 13.337 5.14551 13.6543L4.79883 14.5215C4.54403 15.1585 3.64248 15.1585 3.3877 14.5215L3.04102 13.6543C2.91386 13.3371 2.66208 13.0849 2.34473 12.958L1.47852 12.6113C0.84189 12.3564 0.841704 11.455 1.47852 11.2002L2.34473 10.8535C2.66233 10.7265 2.91398 10.4748 3.04102 10.1572L3.3877 9.29102ZM4.09277 11.3193C3.928 11.5435 3.73096 11.7405 3.50684 11.9053C3.73104 12.07 3.92792 12.2681 4.09277 12.4922C4.25754 12.268 4.45458 12.0701 4.67871 11.9053C4.45485 11.7405 4.25736 11.5434 4.09277 11.3193ZM8.77832 1.66016C9.06321 0.779286 10.3342 0.779308 10.6191 1.66016L10.6436 1.75195L11.1445 3.91894C11.2521 4.38448 11.6155 4.74899 12.0811 4.85644L14.249 5.35644C15.2509 5.58813 15.251 7.01553 14.249 7.24707L12.0811 7.74707C11.6155 7.85455 11.2521 8.21806 11.1445 8.68359L10.6436 10.8516C10.4119 11.8535 8.98554 11.8535 8.75391 10.8516L8.25293 8.68359C8.14534 8.21807 7.78197 7.85456 7.31641 7.74707L5.14844 7.24707C4.14646 7.0155 4.14659 5.58815 5.14844 5.35644L7.31641 4.85644C7.78201 4.74899 8.14532 4.38448 8.25293 3.91894L8.75391 1.75195L8.77832 1.66016ZM9.69824 4.31641C9.44971 5.29199 8.68863 6.05261 7.71289 6.30078C8.6887 6.54886 9.44965 7.31054 9.69824 8.28613C9.94669 7.31074 10.7082 6.54914 11.6836 6.30078C10.7082 6.05233 9.94663 5.29178 9.69824 4.31641Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                </button>
            </div>
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/ai:opacity-100 transition-opacity pointer-events-none z-50">
                <div className="bg-zinc-800 text-white text-[9px] font-medium px-2 py-0.5 rounded shadow-xl whitespace-nowrap border border-white/10 uppercase tracking-tight">
                    Generate using AI
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-800" />
                </div>
            </div>
        </div>
    );


    const platforms = [
        { id: "Instagram", icon: Instagram },
        { id: "YouTube", icon: Youtube },
    ];

    const togglePlatform = (id: string) => {
        const current = formData.platforms || [];
        setFormData((prev) => ({
            ...prev,
            platforms: current.includes(id) ? current.filter((p) => p !== id) : [...current, id],
        }));
    };

    const updatePlatformReward = (platformId: string, field: keyof PlatformReward, val: string) => {
        const current = formData.perPlatformRewards || {};
        const existing = current[platformId] || { rewardPerView: "", minPayout: "", maxPayout: "", submissionLimit: "10", maxPayoutPerCreator: "" };
        setFormData((prev) => ({
            ...prev,
            perPlatformRewards: { ...current, [platformId]: { ...existing, [field]: val } },
        }));
    };

    const addReq = () => {
        if (!newReq.trim()) return;
        setFormData((prev) => ({ ...prev, requirements: [...(prev.requirements || []), newReq.trim()] }));
        setNewReq("");
    };

    const addLink = () => {
        if (!newLink.trim()) return;
        setFormData((prev) => ({ ...prev, contentLinks: [...(prev.contentLinks || []), newLink.trim()] }));
        setNewLink("");
        setAddingLink(false);
    };

    const addFAQ = () => {
        if (!newFAQ.question.trim() || !newFAQ.answer.trim()) return;
        setFormData((prev) => ({ ...prev, faqs: [...(prev.faqs || []), { ...newFAQ }] }));
        setNewFAQ({ question: "", answer: "" });
        setAddingFAQ(false);
    };

    const saveEditFAQ = (idx: number) => {
        const updated = [...(formData.faqs || [])];
        updated[idx] = { ...editFAQVal };
        setFormData((prev) => ({ ...prev, faqs: updated }));
        setEditingFAQIdx(null);
    };

    return (
        <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
            {/* Header */}
            <div className="space-y-0.5">
                <h2 className="text-base font-bold text-white">Review & confirm</h2>
                <p className="text-sm text-zinc-500">All fields are editable — make any final changes before launching.</p>
            </div>

            {/* ── Step 1: Details ───────────────────────────────────────── */}
            <SectionCard title="Campaign Details">
                {/* Thumbnail */}
                <FieldRow label="Thumbnail">
                    <ThumbnailUploader
                        previewUrl={formData.thumbnail}
                        onFileSelect={(url) => setFormData({ ...formData, thumbnail: url })}
                    />
                </FieldRow>

                {/* Name */}
                <FieldRow label={
                    <div className="flex items-center justify-between">
                        <span>Campaign Name</span>
                        <AIButton />
                    </div>
                }>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Untitled Campaign"
                        className={inputClass}
                    />
                </FieldRow>

                {/* Description */}
                <FieldRow label={
                    <div className="flex items-center justify-between">
                        <span>Description</span>
                        <AIButton />
                    </div>
                }>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="No description provided"
                        className={`${inputClass} min-h-[80px] resize-none`}
                    />
                </FieldRow>

                {/* Type & Category */}
                <div className="grid grid-cols-2 gap-3">
                    <FieldRow label="Type">
                        <div className="relative">
                            <select
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                className={`${inputClass} appearance-none cursor-pointer`}
                            >
                                <option value="UGC">UGC</option>
                                <option value="Music">Music</option>
                                <option value="Clipping">Clipping</option>
                                <option value="Logo">Logo</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                        </div>
                    </FieldRow>
                    <FieldRow label="Category">
                        <div className="relative">
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                disabled={formData.type !== "UGC"}
                                className={`${inputClass} appearance-none cursor-pointer`}
                            >
                                <option value="Brand">Brand</option>
                                <option value="Product">Product</option>
                                <option value="Service">Service</option>
                                <option value="Place">Place</option>
                                <option value="Awareness">Awareness</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                        </div>
                    </FieldRow>
                </div>
            </SectionCard>

            {/* ── Step 2: Budget ────────────────────────────────────────── */}
            <SectionCard title="Budget">
                <FieldRow label="Total Budget (₹)">
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-(--color-text-secondary)">₹</span>
                        <input
                            type="number"
                            value={formData.budget}
                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                            className={`${inputClass} pl-7 no-spinners`}
                            placeholder="500"
                            min={500}
                        />
                    </div>
                    <p className="text-xs text-(--color-text-muted) font-medium">Minimum budget is ₹500</p>
                </FieldRow>

                {/* End date toggle */}
                <div className="flex items-center justify-between py-1">
                    <div>
                        <p className="text-sm font-semibold text-(--color-text-primary)">Campaign End Date</p>
                        <p className="text-xs text-(--color-text-secondary)">Run indefinitely or set a deadline.</p>
                    </div>
                    <button
                        onClick={() =>
                            setFormData((prev) => ({
                                ...prev,
                                hasEndDate: !prev.hasEndDate,
                                campaignEndDate: !prev.hasEndDate && !prev.campaignEndDate ? new Date().toISOString().split("T")[0] : prev.campaignEndDate,
                            }))
                        }
                        className={`relative w-11 h-6 border rounded-full transition-colors shrink-0 ${formData.hasEndDate ? "bg-(--color-bg-input) border-(--color-border-input-foc)" : "border-(--color-border)"}`}
                    >
                        <span className={`absolute top-1 left-1 bg-(--color-input-toggle-button) w-4 h-4 rounded-full transition-transform ${formData.hasEndDate ? "translate-x-5" : "translate-x-0"}`} />
                    </button>
                </div>
                {formData.hasEndDate && (
                    <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                        <input
                            type="date"
                            value={formData.campaignEndDate}
                            onChange={(e) => setFormData({ ...formData, campaignEndDate: e.target.value })}
                            className={inputClass}
                            min={new Date().toISOString().split("T")[0]}
                        />
                    </div>
                )}
            </SectionCard>

            {/* ── Step 3: Rewards ───────────────────────────────────────── */}
            <SectionCard title="Platforms & Rewards">
                {/* Platform toggles */}
                <FieldRow label="Platforms">
                    <div className="grid grid-cols-2 gap-3">
                        {platforms.map(({ id, icon: Icon }) => {
                            const sel = formData.platforms?.includes(id);
                            return (
                                <button
                                    key={id}
                                    onClick={() => togglePlatform(id)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all ${sel ? "border-[#FFB900] bg-[#FFB900]/10 text-(--color-text-secondary)" : "border-white/10 bg-(--color-bg-input) text-(--color-text-muted) hover:border-white/20"}`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="text-sm font-medium">{id}</span>
                                </button>
                            );
                        })}
                    </div>
                </FieldRow>

                {/* Per-platform toggle */}
                <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-(--color-text-primary)">Reward Settings</p>
                    <button
                        onClick={() => setFormData((prev) => ({ ...prev, usePerPlatformRewards: !prev.usePerPlatformRewards }))}
                        className={`text-(--color-text-primary) text-xs font-medium px-3 py-1.5 rounded-md border transition-all ${formData.usePerPlatformRewards ? "bg-(--next-bth-color-hover) border-(--color-border-input-foc)" : "bg-(--color-bg-input) border-(--color-border-input)"}`}
                    >
                        Per platform
                    </button>
                </div>

                {formData.usePerPlatformRewards ? (
                    <div className="space-y-5">
                        {!formData.platforms?.length && (
                            <p className="text-sm text-(--color-text-muted) text-center py-2">Select platforms above to configure rewards.</p>
                        )}
                        {formData.platforms?.map((pid) => {
                            const def = platforms.find((p) => p.id === pid);
                            const data = formData.perPlatformRewards?.[pid] || { rewardPerView: "", minPayout: "", maxPayout: "", submissionLimit: "10", maxPayoutPerCreator: "" };
                            return (
                                <div key={pid} className="space-y-3 pt-2 border-t border-white/5">
                                    <div className="flex items-center gap-2">
                                        {def && <def.icon className="w-4 h-4 text-(--color-text-secondary)" />}
                                        <span className="text-sm font-bold text-(--color-text-secondary)">{pid}</span>
                                    </div>
                                    <RewardGrid
                                        values={data}
                                        onChange={(field, val) => updatePlatformReward(pid, field as keyof PlatformReward, val)}
                                    />
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <RewardGrid
                        values={{
                            rewardPerView: formData.rewardPerView,
                            minPayout: formData.minPayout,
                            maxPayout: formData.maxPayout,
                            submissionLimit: formData.submissionLimit,
                            maxPayoutPerCreator: formData.maxPayoutPerCreator,
                        }}
                        onChange={(field, val) => setFormData((prev) => ({ ...prev, [field]: val }))}
                    />
                )}
            </SectionCard>

            {/* ── Step 4: Requirements ─────────────────────────────────── */}
            <SectionCard title="Requirements & Assets">
                {/* Requirements pills */}
                <FieldRow label={
                    <div className="flex items-center justify-between">
                        <span>Campaign Requirements</span>
                        <AIButton />
                    </div>
                }>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {formData.requirements?.map((req, idx) => (
                            <Pill key={idx} onRemove={() => setFormData((prev) => ({ ...prev, requirements: prev.requirements.filter((_, i) => i !== idx) }))}>
                                {req}
                            </Pill>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newReq}
                            onChange={(e) => setNewReq(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && addReq()}
                            placeholder="Add a requirement"
                            className={inputClass}
                        />
                        <button onClick={addReq} className="px-4 py-2 rounded-lg bg-(--color-bg-input-foc) border border-(--color-border-input-foc) text-(--color-text-primary) text-sm font-medium hover:bg-(--color-bg-input) transition-colors shrink-0">
                            Add
                        </button>
                    </div>
                </FieldRow>

                {/* Content links */}
                <FieldRow label="Assets / Links">
                    <div className="space-y-2 mb-2">
                        {formData.contentLinks?.map((link, idx) => (
                            <div key={idx} className="flex items-center justify-between px-3 py-2.5 rounded-xl border border-white/10 bg-(--color-bg-input)">
                                <div className="flex items-center gap-2 overflow-hidden">
                                    <LinkIcon className="w-3.5 h-3.5 text-(--color-text-secondary) shrink-0" />
                                    <a href={link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-400 hover:underline truncate">{link}</a>
                                </div>
                                <button onClick={() => setFormData((prev) => ({ ...prev, contentLinks: prev.contentLinks.filter((_, i) => i !== idx) }))} className="p-1 text-zinc-600 hover:text-white transition-colors shrink-0 ml-2">
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        ))}
                    </div>
                    {addingLink ? (
                        <div className="space-y-2 animate-in fade-in zoom-in-95 duration-200">
                            <input type="url" value={newLink} onChange={(e) => setNewLink(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addLink()} placeholder="Paste URL" className={inputClass} autoFocus />
                            <div className="flex justify-end gap-2">
                                <button onClick={() => setAddingLink(false)} className="px-3 py-1.5 text-xs font-medium text-(--color-text-muted) hover:text-(--color-text-secondary) transition-colors">Cancel</button>
                                <button onClick={addLink} className="px-4 py-1.5 rounded-lg bg-(--color-bg-input-foc) border border-(--color-border-input-foc) text-(--color-text-primary) text-xs font-medium hover:bg-(--color-bg-input) transition-colors">Add Link</button>
                            </div>
                        </div>
                    ) : (
                        <button onClick={() => setAddingLink(true)} className="w-full py-2.5 rounded-xl border border-dashed border-(--color-border-input) bg-(--color-bg-input) text-(--color-text-secondary) text-sm font-medium transition-all flex items-center justify-center gap-2 hover:border-white/20">
                            <Plus className="w-4 h-4" /> Add content link
                        </button>
                    )}
                </FieldRow>

                {/* FAQs */}
                <FieldRow label="FAQs">
                    <div className="space-y-2 mb-2">
                        {formData.faqs?.map((faq, idx) =>
                            editingFAQIdx === idx ? (
                                <div key={idx} className="space-y-2 p-3 rounded-xl border border-(--color-border-input-foc) bg-(--color-bg-input) animate-in fade-in zoom-in-95 duration-150">
                                    <input type="text" value={editFAQVal.question} onChange={(e) => setEditFAQVal({ ...editFAQVal, question: e.target.value })} placeholder="Question" className={inputClass} autoFocus />
                                    <textarea value={editFAQVal.answer} onChange={(e) => setEditFAQVal({ ...editFAQVal, answer: e.target.value })} placeholder="Answer" className={`${inputClass} min-h-[60px] resize-none`} />
                                    <div className="flex justify-end gap-2">
                                        <button onClick={() => setEditingFAQIdx(null)} className="px-3 py-1.5 text-xs font-medium text-(--color-text-muted) hover:text-(--color-text-secondary) transition-colors">Cancel</button>
                                        <button onClick={() => saveEditFAQ(idx)} className="px-4 py-1.5 rounded-lg bg-(--color-bg-input-foc) border border-(--color-border-input-foc) text-(--color-text-primary) text-xs font-medium transition-colors flex items-center gap-1.5"><Check className="w-3 h-3" /> Save</button>
                                    </div>
                                </div>
                            ) : (
                                <div key={idx} className="flex items-start justify-between px-3 py-3 rounded-xl border border-white/10 bg-(--color-bg-input) group">
                                    <div className="flex gap-2.5 overflow-hidden">
                                        <FileText className="w-3.5 h-3.5 mt-0.5 text-(--color-text-secondary) shrink-0" />
                                        <div>
                                            <p className="text-sm font-medium text-(--color-text-primary) truncate">{faq.question}</p>
                                            <p className="text-xs text-(--color-text-secondary) line-clamp-1">{faq.answer}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-1 ml-2 shrink-0">
                                        <button onClick={() => { setEditingFAQIdx(idx); setEditFAQVal({ question: faq.question, answer: faq.answer }); }} className="p-1.5 text-zinc-600 hover:text-white hover:bg-white/10 rounded-lg transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                                        <button onClick={() => setFormData((prev) => ({ ...prev, faqs: prev.faqs.filter((_, i) => i !== idx) }))} className="p-1.5 text-zinc-600 hover:text-white hover:bg-white/10 rounded-lg transition-colors"><X className="w-3.5 h-3.5" /></button>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                    {addingFAQ ? (
                        <div className="space-y-2 animate-in fade-in zoom-in-95 duration-200">
                            <input type="text" value={newFAQ.question} onChange={(e) => setNewFAQ({ ...newFAQ, question: e.target.value })} placeholder="Question" className={inputClass} autoFocus />
                            <textarea value={newFAQ.answer} onChange={(e) => setNewFAQ({ ...newFAQ, answer: e.target.value })} placeholder="Answer" className={`${inputClass} min-h-[70px] resize-none`} />
                            <div className="flex justify-end gap-2">
                                <button onClick={() => setAddingFAQ(false)} className="px-3 py-1.5 text-xs font-medium text-(--color-text-muted) hover:text-(--color-text-secondary) transition-colors">Cancel</button>
                                <button onClick={addFAQ} className="px-4 py-1.5 rounded-lg bg-(--color-bg-input-foc) border border-(--color-border-input-foc) text-(--color-text-primary) text-xs font-medium hover:bg-(--color-bg-input) transition-colors">Add FAQ</button>
                            </div>
                        </div>
                    ) : (
                        <button onClick={() => setAddingFAQ(true)} className="w-full py-2.5 rounded-xl border border-dashed border-(--color-border-input) bg-(--color-bg-input) text-(--color-text-secondary) text-sm font-medium transition-all flex items-center justify-center gap-2 hover:border-white/20">
                            <Plus className="w-4 h-4" /> Add FAQ
                        </button>
                    )}
                </FieldRow>
            </SectionCard>

            {/* ── Step 5: Application settings ─────────────────────────── */}
            <SectionCard title="Application Settings">
                <div className="flex items-center justify-between py-1">
                    <div>
                        <p className="text-sm font-semibold text-(--color-text-primary)">Require Application</p>
                        <p className="text-xs text-(--color-text-secondary) max-w-[260px]">Creators must apply before submitting content.</p>
                    </div>
                    <button
                        onClick={() => setFormData({ ...formData, requireApplication: !formData.requireApplication })}
                        className={`relative w-11 h-6 border rounded-full transition-colors shrink-0 ${formData.requireApplication ? "bg-(--color-bg-input) border-(--color-border-input-foc)" : "border-(--color-border)"}`}
                    >
                        <span className={`absolute top-1 left-1 bg-(--color-input-toggle-button) w-4 h-4 rounded-full transition-transform ${formData.requireApplication ? "translate-x-5" : "translate-x-0"}`} />
                    </button>
                </div>

                {formData.requireApplication && (
                    <div className="space-y-3 pt-2 animate-in slide-in-from-top-2 fade-in duration-200">
                        {/* List of Added Questions */}
                        {(formData.applicationQuestions || []).map((q, idx) => (
                            <div key={idx} className="group relative bg-(--color-bg-card) border border-white/10 rounded-xl p-4 flex items-start gap-3">
                                <div className="mt-1 text-zinc-600 cursor-grab active:cursor-grabbing">
                                    <GripVertical className="w-4 h-4" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center gap-2">
                                        <h4 className="text-sm font-bold text-(--color-text-primary)">{q.text}</h4>
                                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-(--color-bg-input) text-[#FFB900] border border-(--color-border-input-foc)">
                                            {q.type}
                                        </span>
                                    </div>
                                    {q.fileUrl && (
                                        <div className="text-xs text-blue-400 mt-1 truncate max-w-[200px]">
                                            <a href={q.fileUrl} target="_blank" rel="noopener noreferrer">View Attached File</a>
                                        </div>
                                    )}
                                    {q.required && (
                                        <div className="flex items-center gap-1.5 text-xs text-(--color-text-secondary)">
                                            <div className="w-3.5 h-3.5 rounded-full bg-(--color-bg-input) flex items-center justify-center border border-(--color-border-input-foc)">
                                                <Check className="w-3 h-3 text-(--color-text-primary)" />
                                            </div>
                                            Required
                                        </div>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setFormData({ ...formData, applicationQuestions: formData.applicationQuestions.filter((_, i) => i !== idx) })}
                                        className="p-1.5 text-zinc-500 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* Add Question Form or Button */}
                        {isAddingQuestion ? (
                            <div className="bg-(--color-bg-card) border border-white/10 rounded-xl p-5 space-y-4 animate-in zoom-in-95 duration-200">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-(--color-text-secondary)">Question {(formData.applicationQuestions?.length || 0) + 1}</label>
                                    <input
                                        type="text"
                                        value={newQuestion.text}
                                        onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
                                        className={inputClass}
                                        placeholder="Enter question"
                                        autoFocus
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-(--color-text-secondary)">Question Type</label>
                                    <div className="relative">
                                        <select
                                            value={newQuestion.type}
                                            onChange={(e) => setNewQuestion({ ...newQuestion, type: e.target.value })}
                                            className={`${inputClass} appearance-none cursor-pointer`}
                                        >
                                            <option value="Text">Text</option>
                                            <option value="Image">Image</option>
                                            <option value="Video">Video</option>
                                            <option value="Doc">Doc</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                                    </div>
                                </div>

                                {newQuestion.type !== "Text" && (
                                    <div className="space-y-1.5 pt-2 animate-in fade-in slide-in-from-top-2">
                                        <label className="text-xs font-bold text-(--color-text-secondary)">Reference File (Optional)</label>
                                        <ThumbnailUploader 
                                            previewUrl={newQuestion.fileUrl}
                                            onFileSelect={(url) => setNewQuestion({ ...newQuestion, fileUrl: url })}
                                            fileType={newQuestion.type}
                                            accept={
                                                newQuestion.type === "Video" ? "video/mp4, video/quicktime, video/x-msvideo" :
                                                newQuestion.type === "Doc" ? ".pdf,.doc,.docx,.txt" :
                                                "image/png, image/jpeg"
                                            }
                                            helperText={
                                                newQuestion.type === "Video" ? "MP4, MOV, or AVI only" :
                                                newQuestion.type === "Doc" ? "PDF, DOC, DOCX, TXT only" :
                                                "PNG or JPG only"
                                            }
                                        />
                                    </div>
                                )}

                                <div className="flex items-center gap-2 py-1">
                                    <button
                                        onClick={() => setNewQuestion({ ...newQuestion, required: !newQuestion.required })}
                                        className={`w-4 h-4 rounded border flex items-center justify-center transition-all bg-(--color-bg-input) border-(--color-border-input-foc)`}
                                    >
                                        {newQuestion.required && <Check className="w-3 h-3 text-black" />}
                                    </button>
                                    <label onClick={() => setNewQuestion({ ...newQuestion, required: !newQuestion.required })} className="text-sm font-medium text-(--color-text-secondary) cursor-pointer select-none">
                                        Is required
                                    </label>
                                </div>

                                <div className="flex justify-end gap-2 mt-2">
                                    <button onClick={() => setIsAddingQuestion(false)} className="px-3 py-1.5 text-xs font-medium text-(--color-text-muted) hover:text-(--color-text-secondary) transition-colors">Cancel</button>
                                    <button 
                                        onClick={() => {
                                            if (!newQuestion.text.trim()) return;
                                            const questionObj = { id: Date.now().toString(), ...newQuestion };
                                            setFormData({ ...formData, applicationQuestions: [...(formData.applicationQuestions || []), questionObj] });
                                            setNewQuestion({ text: "", type: "Text", required: false, fileUrl: "" });
                                            setIsAddingQuestion(false);
                                        }} 
                                        className="px-4 py-1.5 rounded-lg bg-(--color-bg-input-foc) border border-(--color-border-input-foc) text-(--color-text-primary) text-xs font-medium hover:bg-(--color-bg-input) transition-colors shrink-0"
                                    >
                                        Add Question
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsAddingQuestion(true)}
                                className="w-full py-3 rounded-xl border border-dashed border-(--color-border-input) bg-(--color-bg-input) text-(--color-text-secondary) text-sm font-medium hover:cursor-pointer transition-all flex items-center justify-center gap-2"
                            >
                                <Plus className="w-4 h-4" /> Add question
                            </button>
                        )}
                    </div>
                )}
            </SectionCard>
        </div>
    );
}