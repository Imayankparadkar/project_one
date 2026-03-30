import React from "react";
import { ArrowRight, IndianRupee } from "lucide-react";
import { CampaignFormData } from "../types";

interface Step6FundProps {
    formData: CampaignFormData;
}

export default function Step6Fund({ formData }: Step6FundProps) {
    const budgetAmount = parseFloat(formData.budget || "0").toFixed(2);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-1">
                <h2 className="text-base font-medium text-(--color-text-primary)">Fund campaign</h2>
                <p className="text-sm text-(--color-text-secondary)">{formData.name}</p>
            </div>

            <div className="p-4 rounded-xl border border-(--color-border-input) bg-(--color-bg-input)">
                <p className="text-sm text-(--color-text-secondary)">
                    You'll be funding this campaign with the budget amount you defined in step 2.
                </p>
            </div>

            <div className="p-6 rounded-xl bg-(--color-orange-button-light) border border-(--color-border-input) flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-(--color-border-input) flex items-center justify-center text-(--color-text-primary)">
                    <IndianRupee className="w-5 h-5" />
                </div>
                <div>
                    <p className="text-xs text-(--color-text-secondary)">Campaign budget</p>
                    <p className="text-xl font-bold text-(--color-text-primary)">₹{budgetAmount}</p>
                </div>
            </div>

            <div className="p-5 rounded-xl border border-(--color-border-card) bg-(--color-bg-card) space-y-3">
                <p className="text-sm font-semibold text-(--color-text-primary)">What happens next:</p>
                <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-(--color-text-secondary)">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFB900]" />
                        Campaign will be created with all your settings
                    </li>
                    <li className="flex items-center gap-2 text-sm text-(--color-text-secondary)">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFB900]" />
                        You'll complete payment for ₹{budgetAmount}
                    </li>
                    <li className="flex items-center gap-2 text-sm text-(--color-text-secondary)">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFB900]" />
                        Campaign becomes active immediately after payment
                    </li>
                </ul>
            </div>

            <button className="w-full rounded-lg bg-(--color-orange-button-dark) border border-(--color-orange-button-border-bright) py-3 text-sm font-semibold text-(--color-text-primary) hover:bg-(--color-bg-input) transition-all flex items-center justify-center gap-2 group hover:cursor-pointer">
                Fund & Activate (₹{budgetAmount})
                <ArrowRight className="w-4 h-4 transition-transform" />
            </button>
        </div>
    );
}