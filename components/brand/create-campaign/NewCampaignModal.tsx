"use client";

import { useState } from "react";
import { ChevronRight, Eye, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { CampaignFormData } from "./types";
import CampaignPreviewCard from "./CampaignPreviewCard";

// Import Steps
import Step1Details from "./steps/Step1Details";
import Step2Budget from "./steps/Step2Budget";
import Step3Rewards from "./steps/Step3Rewards";
import Step4Requirements from "./steps/Step4Requirements";
import Step5Settings from "./steps/Step5Settings";
import Step6Fund from "./steps/Step6Fund";
import Step7Summary from "./steps/Step7Summary";

interface NewCampaignModalProps {
    onClose: () => void;
}

const TOTAL_STEPS = 7;

const DEFAULT_FORM_DATA: CampaignFormData = {
    name: "",
    description: "",
    type: "Both",
    category: "Music",
    thumbnail: "",
    budget: "",
    hasEndDate: false,
    campaignEndDate: "",
    platforms: ["Instagram", "YouTube"],
    rewardPerView: "",
    minPayout: "",
    maxPayout: "",
    submissionLimit: "10",
    maxPayoutPerCreator: "",

    usePerPlatformRewards: false,
    perPlatformRewards: {},

    requirements: [],
    contentLinks: [],
    faqs: [],
    applicationQuestions: [],

    requireApplication: false,
};

export default function NewCampaignModal({ onClose }: NewCampaignModalProps) {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [showDiscardModal, setShowDiscardModal] = useState(false);

    const [formData, setFormData] = useState<CampaignFormData>(DEFAULT_FORM_DATA);

    const handleCloseClick = () => {
        if (JSON.stringify(formData) !== JSON.stringify(DEFAULT_FORM_DATA)) {
            setShowDiscardModal(true);
        } else {
            onClose();
        }
    };

    const handleNext = () => {
        if (step < TOTAL_STEPS) setStep((prev) => prev + 1);
        if (step === TOTAL_STEPS) {
            console.log("Campaign Data:", formData);
            router.push("/brand/campaigns");
        }
    };

    const handleBack = () => {
        if (step > 1) setStep((prev) => prev - 1);
    };

    return (
        <div className="absolute inset-0 z-50 bg-(--color-bg-overlay) backdrop-blur-sm flex items-center justify-center p-0 lg:p-8 animate-in fade-in duration-200">
            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            {/* MODAL CONTAINER */}
            <div className="w-full max-w-5xl h-full lg:h-[85vh] bg-(--color-bg-modal) flex flex-col overflow-hidden border-x border-y lg:border border-(--color-border) lg:rounded-3xl shadow-2xl ring-1 ring-black/5 pb-10 lg:pb-0" onClick={(e) => e.stopPropagation()}>

                {/* 1. GLOBAL HEADER */}
                <div className="flex items-center px-6 py-5 border-b border-(--color-border-subtle) shrink-0 bg-(--color-bg-modal-header) z-20 gap-6">
                    <h2 className="text-lg font-bold text-(--color-text-primary) tracking-tight shrink-0">New Campaign</h2>

                    {/* Progress Bar */}
                    <div className="flex gap-1.5 flex-1 max-w-xs lg:max-w-md mx-auto">
                        {Array.from({ length: TOTAL_STEPS }).map((_, i) => {
                            const stepNum = i + 1;
                            const isActive = stepNum <= step;
                            return (
                                <div
                                    key={i}
                                    className={cn(
                                        "h-1 rounded-full transition-all duration-300 flex-1",
                                        isActive ? "bg-(--progress-bar-newCampaign-active)" : "bg-(--progress-bar-newCampaign-inactive)"
                                    )}
                                />
                            );
                        })}
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={handleCloseClick}
                        className="p-2 rounded-lg text-(--color-text-muted) hover:text-(--color-text-primary) hover:bg-(--color-surface-hover) transition-colors shrink-0"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* 2. SPLIT CONTENT BODY */}
                <div className="flex flex-col lg:flex-row flex-1 min-h-0 overflow-hidden relative">

                    {/* --- LEFT SIDE: FORM --- */}
                    <div className="order-2 lg:order-1 flex-[1.4] flex flex-col min-h-0 border-r border-(--color-border) bg-(--color-bg-form)">
                        <div className="flex-1 overflow-y-auto p-6 lg:px-8 no-scrollbar">
                            <div className="max-w-lg space-y-6 mx-auto lg:mx-0">
                                {step === 1 && <Step1Details formData={formData} setFormData={setFormData} />}
                                {step === 2 && <Step2Budget formData={formData} setFormData={setFormData} />}
                                {step === 3 && <Step3Rewards formData={formData} setFormData={setFormData} />}
                                {step === 4 && <Step4Requirements formData={formData} setFormData={setFormData} />}
                                {step === 5 && <Step5Settings formData={formData} setFormData={setFormData} />}
                                {step === 6 && <Step6Fund formData={formData} />}
                                {step === 7 && <Step7Summary formData={formData} setFormData={setFormData} />}

                            </div>
                        </div>

                        {/* FIXED FOOTER */}
                        <div className="text-(--color-text-primary) p-5 lg:px-8 border-t border-(--color-border-subtle) flex justify-between shrink-0 bg-(--color-bg-form-footer)">
                            <button
                                onClick={handleBack}
                                disabled={step === 1}
                                className="bg-yellow-radial inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border-3 border-(--color-border) text-sm font-medium text-(--color-text-secondary) transition-all duration-200 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                Back
                            </button>
                            <button
                                onClick={handleNext}
                                className="inline-flex text-white items-center justify-center gap-2 rounded-lg dark:border dark:border-[#53431a] bg-(--next-btn-newCampaign) hover:bg-(--next-btn-newCampaign-hover) bg-yellow-radial px-6 py-2 text-sm font-medium transition-all duration-200 hover:border-[#735c1e] hover:shadow-orange-900/20 active:scale-95"
                            >
                                {step === 6 ? "Summary" : step === 7 ? "Create Campaign" : "Next"}
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* --- RIGHT SIDE: PREVIEW --- */}
                    <div className="order-1 lg:order-2 w-full h-[45vh] lg:h-auto lg:w-[420px] bg-(--color-bg-preview) shrink-0 border-b lg:border-b-0 lg:border-l border-(--color-border) flex flex-col items-center justify-center relative py-6 lg:py-0 overflow-hidden">
                        <div className="absolute top-4 lg:top-6 left-0 right-0 flex justify-center pointer-events-none z-10">
                            <div className="inline-flex items-center gap-2 text-(--color-text-secondary) text-xs font-medium px-3 py-1">
                                <Eye className="w-3.5 h-3.5" />
                                Live Preview
                            </div>
                        </div>
                        <div className="w-full px-4 lg:px-6 flex justify-center transform scale-[0.70] lg:scale-100 transition-transform origin-center mt-6 lg:mt-0">
                            <CampaignPreviewCard data={formData} />
                        </div>
                    </div>

                </div>
            </div>

            {/* CONFIRMATION MODAL FOR UNSAVED CHANGES */}
            {showDiscardModal && (
                <div className="absolute inset-0 z-[60] bg-(--color-bg-overlay) backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={(e) => e.stopPropagation()}>
                    <div className="bg-(--color-bg-modal) border border-(--color-border) p-6 rounded-2xl shadow-xl max-w-sm w-full animate-in zoom-in-95 duration-200">
                        <h3 className="text-xl font-bold text-(--color-text-primary) mb-2">Unsaved Changes</h3>
                        <p className="text-(--color-text-secondary) mb-6 text-sm leading-relaxed">You have unsaved changes in your campaign details. Do you want to save them as a draft or discard them?</p>
                        
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => {
                                    console.log("Saving as draft...", formData);
                                    onClose(); // Triggers the router redirect logic via the parent
                                }}
                                className="btn-get-started w-full py-2.5 rounded-xl text-(--color-text-inverted) font-medium text-sm transition-all"
                            >
                                Save as Draft
                            </button>
                            <button
                                onClick={() => onClose()}
                                className="w-full py-2.5 rounded-xl border border-red-500/30 text-red-500 hover:bg-red-500/10 font-medium text-sm transition-all"
                            >
                                Discard Changes
                            </button>
                            <button
                                onClick={() => setShowDiscardModal(false)}
                                className="w-full py-2.5 rounded-xl text-(--color-text-muted) hover:text-(--color-text-primary) hover:bg-(--color-surface-hover) font-medium text-sm transition-all"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}