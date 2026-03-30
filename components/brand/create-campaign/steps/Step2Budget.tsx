import React from "react";
import { CampaignFormData } from "../types";

interface Step2BudgetProps {
    formData: CampaignFormData;
    setFormData: React.Dispatch<React.SetStateAction<CampaignFormData>>;
}

export default function Step2Budget({ formData, setFormData }: Step2BudgetProps) {
    const inputClass = "w-full rounded-lg border border-[var(--color-border-input)] bg-[var(--color-bg-input)] bg-yellow-radial px-3 py-2 text-sm leading-5 tracking-[0.14px] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] outline-none transition-all focus:border-[var(--color-border-input-foc)] focus:ring-1 focus:ring-[var(--color-border-input-foc)]";

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-1.5">
                <label className="text-sm font-semibold text-(--color-text-primary)">
                    Budget <span className="text-[#f9a84b]">*</span>
                </label>
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
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <label className="text-sm font-semibold text-(--color-text-primary)">Set Campaign End Date</label>
                        <p className="text-xs text-(--color-text-secondary) max-w-[280px]">Run the campaign indefinitely or set a specific end date.</p>
                    </div>
                    <button
                        onClick={() => {
                            setFormData(prev => {
                                const newHasEndDate = !prev.hasEndDate;
                                return {
                                    ...prev,
                                    hasEndDate: newHasEndDate,
                                    // Optionally clear or set end date depending on requirements
                                    campaignEndDate: newHasEndDate && !prev.campaignEndDate ? new Date().toISOString().split('T')[0] : prev.campaignEndDate
                                };
                            });
                        }}
                        className={`relative w-11 h-6 border rounded-full transition-colors shrink-0 ${formData.hasEndDate ? "bg-(--color-bg-input) border-(--color-border-input-foc)" : "border-(--color-border)"}`}
                    >
                        <span className={`absolute top-1 left-1 bg-(--color-input-toggle-button) w-4 h-4 rounded-full transition-transform ${formData.hasEndDate ? "translate-x-5" : "translate-x-0"}`} />
                    </button>
                </div>

                {/* Conditional Date Input */}
                {formData.hasEndDate && (
                    <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="relative">
                            <input
                                type="date"
                                value={formData.campaignEndDate}
                                onChange={(e) => setFormData({ ...formData, campaignEndDate: e.target.value })}
                                className={inputClass}
                                min={new Date().toISOString().split('T')[0]}
                            />
                        </div>
                        <p className="text-xs text-(--color-text-muted) font-medium">When should the campaign close for submissions?</p>
                    </div>
                )}
            </div>
        </div>
    );
}