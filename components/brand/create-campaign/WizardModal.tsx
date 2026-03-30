"use client";

import React, { useState } from "react";
import { X, ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface WizardModalProps {
    onClose: () => void;
}

const TOTAL_STEPS = 4;

export default function WizardModal({ onClose }: WizardModalProps) {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);

    const handleNext = () => {
        if (currentStep < TOTAL_STEPS) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const handleGetStarted = () => {
        console.log("Wizard completed!");
        onClose();
    };

    const stepContent = [
        {
            title: "Create Your Campaign",
            description: "Learn how to set up your first campaign and start receiving content from creators.",
            image: "https://placehold.co/800x450/111/FFF?text=Step+1+Video",
        },
        {
            title: "Track Analytics",
            description: "Monitor performance metrics and track the success of your campaigns in real-time.",
            image: "https://placehold.co/800x450/111/FFF?text=Step+2+Analytics",
        },
        {
            title: "Set Your Budget",
            description: "Determine the budget and rewards for the creators participating in your campaign.",
            image: "https://placehold.co/800x450/111/FFF?text=Step+3+Budget",
        },
        {
            title: "Review and Launch",
            description: "Review all campaign details and launch it to the platform.",
            image: "https://placehold.co/800x450/111/FFF?text=Step+4+Launch",
        },
    ];

    const currentContent = stepContent[currentStep - 1];

    return (
        <div
            className="absolute inset-0 z-10 flex items-center justify-center bg-(--color-bg-modal) backdrop-blur-sm p-4 animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-3xl bg-(--color-bg-modal) border border-orange-500/20 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button Overlay */}
                <button
                    onClick={() => router.push("/brand/campaigns")}
                    className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* TOP: Visual Media Area */}
                <div className="w-full aspect-video bg-(--color-bg-secondary) relative flex items-center justify-center">
                    <img
                        src={currentContent.image}
                        alt={currentContent.title}
                        className="w-full h-full object-cover opacity-90"
                    />
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-xl">
                            <div className="w-0 h-0 border-t-8 border-t-transparent border-l-14 border-l-white border-b-8 border-b-transparent ml-1"></div>
                        </div>
                    </div>
                </div>

                {/* BOTTOM: Content & Controls */}
                <div className="p-6 bg-(--color-bg-modal) border-t border-(--color-border-subtle)">

                    {/* Progress Bars */}
                    <div className="flex gap-2 mb-6">
                        {Array.from({ length: TOTAL_STEPS }).map((_, index) => {
                            const step = index + 1;

                            return (
                                <div
                                    key={index}
                                    className={cn(
                                        "h-1 flex-1 rounded-full transition-colors duration-300",
                                        step < currentStep
                                            ? "bg-(--progress-bar-wizard-prev)"
                                            : step === currentStep
                                                ? "bg-(--progress-bar-wizard-active)"
                                                : "bg-(--progress-bar-wizard-inactive)"
                                    )}
                                />
                            );
                        })}
                    </div>

                    {/* Text Content */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-(--color-text-primary) mb-2">{currentContent.title}</h2>
                        <p className="text-(--color-text-secondary) text-base leading-relaxed">{currentContent.description}</p>
                    </div>

                    {/* Footer Navigation */}
                    <div className="flex items-center justify-between pt-2">

                        {/* Previous Button */}
                        <div className="w-24">
                            {currentStep > 1 ? (
                                <button
                                    onClick={handlePrevious}
                                    className="group flex items-center gap-1.5 px-4 py-2 rounded-xl text-(--color-text-muted) font-medium text-sm transition-all duration-200 hover:text-(--color-text-secondary) hover:bg-(--color-surface-hover) active:scale-95"
                                >
                                    <ChevronLeft className="w-4 h-4 transition-transform" />
                                    Previous
                                </button>
                            ) : (
                                <div />
                            )}
                        </div>

                        {/* Step Counter */}
                        <span className="text-(--color-text-muted) font-medium text-sm">
                            {currentStep} of {TOTAL_STEPS}
                        </span>

                        {/* Next / Get Started Button */}
                        <div className="justify-self-end text-(--color-text-primary)">
                            {currentStep < TOTAL_STEPS ? (
                                <button
                                    onClick={handleNext}
                                    className="px-5 py-2 rounded-lg bg-(--next-btn-color) border border-(--next-btn-color-border) hover:bg-(--next-bth-color-hover) transition-all font-medium flex items-center gap-2 text-sm"
                                >
                                    Next <ChevronRight className="w-4 h-4" />
                                </button>
                            ) : (
                                <button
                                    onClick={handleGetStarted}
                                    className="btn-get-started border group flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm shadow-lg transition-all duration-200 hover:shadow-orange-900/20 active:scale-[0.94] whitespace-nowrap"
                                >
                                    Get Started
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}