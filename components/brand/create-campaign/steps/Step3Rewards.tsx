import React, { useEffect } from "react";
import { Instagram, Youtube } from "lucide-react";
import { CampaignFormData, PlatformReward } from "../types";

const inputClass = "w-full rounded-lg border border-[var(--color-border-input)] bg-[var(--color-bg-input)] bg-yellow-radial px-3 py-2 text-sm leading-5 tracking-[0.14px] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] outline-none transition-all focus:border-[var(--color-border-input-foc)] focus:ring-1 focus:ring-[var(--color-border-input-foc)]";

// --- MOVED OUTSIDE: This prevents the input from losing focus on re-render ---
const RewardInputs = ({
    values,
    onChange
}: {
    values: { rewardPerView: string, minPayout: string, maxPayout: string, submissionLimit: string, maxPayoutPerCreator: string },
    onChange: (field: string, val: string) => void
}) => {

    // Helper to calculate estimated views
    const calculateViews = (amountStr: string, cpmStr: string) => {
        const amount = parseFloat(amountStr) || 0;
        const cpm = parseFloat(cpmStr) || 0;
        if (amount === 0 || cpm === 0) return "0 views";

        const views = (amount / cpm) * 1000;

        if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M views`;
        if (views >= 1000) return `${(views / 1000).toFixed(1)}k views`;
        return `${Math.floor(views)} views`;
    };

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <label className="text-sm font-semibold text-(--color-text-secondary)">Reward per 1M views <span className="text-[#f9a84b]">*</span></label>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-(--color-text-secondary)">₹</span>
                    <input
                        type="number"
                        value={values.rewardPerView}
                        onChange={(e) => onChange("rewardPerView", e.target.value)}
                        className={`${inputClass} pl-7 no-spinners`}
                        placeholder="10.00"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-(--color-text-secondary)">Minimum Payout <span className="text-[#f9a84b]">*</span></label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-(--color-text-secondary)">₹</span>
                        <input
                            type="number"
                            value={values.minPayout}
                            onChange={(e) => onChange("minPayout", e.target.value)}
                            className={`${inputClass} pl-7 no-spinners`}
                            placeholder="0.00"
                            min={0}
                        />
                    </div>
                    <p className="text-xs text-(--color-text-muted)">~ {calculateViews(values.minPayout, values.rewardPerView)}</p>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-(--color-text-secondary)">Maximum Payout <span className="text-[#f9a84b]">*</span></label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-(--color-text-secondary)">₹</span>
                        <input
                            type="number"
                            value={values.maxPayout}
                            onChange={(e) => onChange("maxPayout", e.target.value)}
                            className={`${inputClass} pl-7 no-spinners`}
                            placeholder="0.00"
                            min={0}
                        />
                    </div>
                    <p className="text-xs text-(--color-text-muted)">~ {calculateViews(values.maxPayout, values.rewardPerView)}</p>
                </div>
            </div>

            {/* Submission Limit & Max Payout per Creator */}
            <div className="grid grid-cols-2 gap-4 pt-1">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-(--color-text-primary)">Submission Limit</label>
                    <div className="relative">
                        <input
                            type="number"
                            value={values.submissionLimit}
                            onChange={(e) => onChange("submissionLimit", e.target.value)}
                            className={`${inputClass} no-spinners`}
                            placeholder="10"
                            min={1}
                        />
                    </div>
                    <p className="text-xs text-(--color-text-muted)">Max posts per creator</p>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-(--color-text-primary)">Max Payout / Creator</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-(--color-text-secondary)">₹</span>
                        <input
                            type="number"
                            value={values.maxPayoutPerCreator}
                            onChange={(e) => onChange("maxPayoutPerCreator", e.target.value)}
                            className={`${inputClass} pl-7 no-spinners`}
                            placeholder="0.00"
                            min={0}
                        />
                    </div>
                    <p className="text-xs text-(--color-text-muted)">Cap earnings per creator</p>
                </div>
            </div>
        </div>
    );
};

interface Step3RewardsProps {
    formData: CampaignFormData;
    setFormData: React.Dispatch<React.SetStateAction<CampaignFormData>>;
}

export default function Step3Rewards({ formData, setFormData }: Step3RewardsProps) {
    const platformsList = [
        { id: "Instagram", icon: Instagram, label: "Instagram" },
        { id: "YouTube", icon: Youtube, label: "YouTube" },
    ];

    const togglePlatform = (p: string) => {
        const current = formData.platforms || [];
        if (current.includes(p)) {
            setFormData({ ...formData, platforms: current.filter(item => item !== p) });
        } else {
            setFormData({ ...formData, platforms: [...current, p] });
        }
    };

    const updatePlatformReward = (platformId: string, field: keyof PlatformReward, value: string) => {
        const currentRewards = formData.perPlatformRewards || {};
        const platformData = currentRewards[platformId] || { rewardPerView: "", minPayout: "", maxPayout: "", submissionLimit: "10", maxPayoutPerCreator: "" };

        setFormData(prev => ({
            ...prev,
            perPlatformRewards: {
                ...currentRewards,
                [platformId]: {
                    ...platformData,
                    [field]: value
                }
            }
        }));
    };

    // Initialize perPlatformRewards object if it doesn't exist
    useEffect(() => {
        if (!formData.perPlatformRewards) {
            setFormData(prev => ({ ...prev, perPlatformRewards: {} }));
        }
    }, []);

    // Toggle logic for the "Per platform" button
    const handlePerPlatformToggle = () => {
        const newState = !formData.usePerPlatformRewards;
        setFormData(prev => ({ ...prev, usePerPlatformRewards: newState }));
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            {/* PLATFORM SELECTION */}
            <div className="space-y-3">
                <label className="text-sm font-semibold text-(--color-text-primary)">Platforms <span className="text-[#f9a84b]">*</span></label>
                <div className="grid grid-cols-2 gap-3">
                    {platformsList.map((p) => {
                        const isSelected = formData.platforms?.includes(p.id);
                        return (
                            <button
                                key={p.id}
                                onClick={() => togglePlatform(p.id)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all ${isSelected
                                    ? "border-[#FFB900] bg-[#FFB900]/10 text-(--color-text-secondary)"
                                    : "border-white/10 bg-(--color-bg-input) text-(--color-text-muted) hover:border-white/20"
                                    }`}
                            >
                                <p.icon className="w-5 h-5" />
                                <span className="text-sm font-medium">{p.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* REWARDS HEADER & TOGGLE */}
            <div className="flex items-center justify-between pt-2">
                <label className="text-sm font-semibold text-(--color-text-primary)">Rewards</label>
                <button
                    onClick={handlePerPlatformToggle}
                    className={`text-(--color-text-primary) text-xs font-medium px-3 py-1.5 rounded-md border transition-all ${formData.usePerPlatformRewards
                        ? "bg-(--next-bth-color-hover) border-(--color-border-input-foc)"
                        : "bg-(--color-bg-input) border-(--color-border-input)"
                        }`}
                >
                    Per platform
                </button>
            </div>

            {/* REWARDS INPUTS AREA */}
            {formData.usePerPlatformRewards ? (
                // --- PER PLATFORM MODE ---
                <div className="space-y-6">
                    {(!formData.platforms || formData.platforms.length === 0) && (
                        <div className="p-4 rounded-lg border border-dashed border-zinc-700 text-center">
                            <p className="text-sm text-(--color-text-muted)">Select platforms above to configure rewards.</p>
                        </div>
                    )}

                    {formData.platforms?.map(platformId => {
                        const platformDef = platformsList.find(p => p.id === platformId);
                        const data = formData.perPlatformRewards?.[platformId] || { rewardPerView: "", minPayout: "", maxPayout: "" };

                        return (
                            <div key={platformId} className="p-5 rounded-2xl space-y-4">
                                <div className="flex items-center gap-2 mb-2 pb-3 border-b border-white/5">
                                    {platformDef && <platformDef.icon className="w-4 h-4 text-(--color-text-secondary)" />}
                                    <span className="text-sm font-bold text-(--color-text-secondary)">{platformDef?.label}</span>
                                </div>
                                <RewardInputs
                                    values={data}
                                    onChange={(field, val) => updatePlatformReward(platformId, field as keyof PlatformReward, val)}
                                />
                            </div>
                        );
                    })}
                </div>
            ) : (
                 // --- GLOBAL MODE ---
                <RewardInputs
                    values={{
                        rewardPerView: formData.rewardPerView,
                        minPayout: formData.minPayout,
                        maxPayout: formData.maxPayout,
                        submissionLimit: formData.submissionLimit,
                        maxPayoutPerCreator: formData.maxPayoutPerCreator
                    }}
                    onChange={(field, val) => setFormData(prev => ({ ...prev, [field]: val }))}
                />
            )}
        </div>
    );
}