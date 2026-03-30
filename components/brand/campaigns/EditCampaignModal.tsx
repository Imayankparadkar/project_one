"use client";

import React, { useState, useEffect } from "react";
import { X, Save } from "lucide-react";
import { Campaign } from "@/lib/data/campaigns";
import { CampaignFormData } from "@/components/brand/create-campaign/types";
import Step7Summary from "@/components/brand/create-campaign/steps/Step7Summary";

interface EditCampaignModalProps {
    isOpen: boolean;
    onClose: () => void;
    campaign: Campaign;
    onSave: (data: CampaignFormData) => void;
}

export default function EditCampaignModal({ isOpen, onClose, campaign, onSave }: EditCampaignModalProps) {
    const [formData, setFormData] = useState<CampaignFormData>(() => {
        // Map Campaign to CampaignFormData
        return {
            name: campaign.name || "",
            description: campaign.description || "",
            type: campaign.type as any || "Both",
            category: campaign.category as any || "Brand",
            thumbnail: campaign.thumbnail || "",
            budget: campaign.budget?.toString() || "",
            hasEndDate: !!campaign.endDate,
            campaignEndDate: campaign.endDate ? campaign.endDate.split("T")[0] : "",
            platforms: campaign.platforms || [],
            rewardPerView: campaign.rewardPerView || "",
            minPayout: campaign.minPayout || "",
            maxPayout: campaign.maxPayout || "",
            submissionLimit: campaign.submissionLimit || "10",
            maxPayoutPerCreator: campaign.maxPayoutPerCreator || "",
            usePerPlatformRewards: campaign.usePerPlatformRewards || false,
            perPlatformRewards: (campaign.perPlatformRewards || {}) as any,
            requirements: campaign.requirements || [],
            contentLinks: campaign.contentLinks || [],
            faqs: campaign.faqs || [],
            applicationQuestions: campaign.applicationQuestions || [],
            requireApplication: campaign.requireApplication || false,
        };
    });

    // Reset formData when campaign changes
    useEffect(() => {
        if (isOpen) {
            setFormData({
                name: campaign.name || "",
                description: campaign.description || "",
                type: campaign.type as any || "Both",
                category: campaign.category as any || "Brand",
                thumbnail: campaign.thumbnail || "",
                budget: campaign.budget?.toString() || "",
                hasEndDate: !!campaign.endDate,
                campaignEndDate: campaign.endDate ? campaign.endDate.split("T")[0] : "",
                platforms: campaign.platforms || [],
                rewardPerView: campaign.rewardPerView || "",
                minPayout: campaign.minPayout || "",
                maxPayout: campaign.maxPayout || "",
                submissionLimit: campaign.submissionLimit || "10",
                maxPayoutPerCreator: campaign.maxPayoutPerCreator || "",
                usePerPlatformRewards: campaign.usePerPlatformRewards || false,
                perPlatformRewards: (campaign.perPlatformRewards || {}) as any,
                requirements: campaign.requirements || [],
                contentLinks: campaign.contentLinks || [],
                faqs: campaign.faqs || [],
                applicationQuestions: campaign.applicationQuestions || [],
                requireApplication: campaign.requireApplication || false,
            });
        }
    }, [isOpen, campaign]);

    if (!isOpen) return null;

    const handleSave = () => {
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 z-50 bg-(--color-bg-overlay) backdrop-blur-sm flex items-center justify-center p-4 lg:p-8 animate-in fade-in duration-200" onClick={onClose}>
            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
            
            <div 
                className="w-full max-w-2xl max-h-[90vh] bg-[var(--color-bg-modal)] flex flex-col overflow-hidden border border-[var(--color-border)] rounded-2xl shadow-2xl ring-1 ring-black/5" 
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-modal-header)] shrink-0 z-20">
                    <h2 className="text-lg font-bold text-[var(--color-text-primary)] tracking-tight">Edit Campaign</h2>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6 no-scrollbar bg-[var(--color-bg-form)]">
                    <Step7Summary formData={formData} setFormData={setFormData} />
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-form-footer)] flex justify-end gap-3 shrink-0">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg border border-[var(--color-border)] text-sm font-medium text-[var(--color-text-muted)] hover:text-white hover:bg-white/5 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[var(--next-btn-newCampaign)] hover:bg-[var(--next-btn-newCampaign-hover)] text-white text-sm font-medium bg-yellow-radial transition-all hover:shadow-orange-900/20 active:scale-95 border border-transparent hover:border-[#735c1e]"
                    >
                        <Save className="w-4 h-4" />
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
