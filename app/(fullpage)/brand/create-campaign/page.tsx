"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import NewCampaignModal from "@/components/brand/create-campaign/NewCampaignModal";
import WizardModal from "@/components/brand/create-campaign/WizardModal";

export default function CreateCampaignPage() {
    const router = useRouter();
    // Wizard shows by default every time this route is visited
    const [showWizard, setShowWizard] = useState(true);

    const handleClose = () => {
        // When closing the main creation form, go back to the dashboard
        router.push("/brand/campaigns");
    };

    return (
        <>
            {/* LAYER 1: The Creation Form (Background) 
                - We pass handleClose to redirect users if they cancel creation
            */}
            <div className="absolute inset-0 z-10">
                <NewCampaignModal onClose={handleClose} />
            </div>

            {/* LAYER 2: The Wizard (Foreground)
                - Only visible if showWizard is true
                - z-index must be higher than NewCampaignModal (which is usually z-50)
            */}
            {showWizard && (
                <div className="absolute inset-0 z-60">
                    <WizardModal onClose={() => setShowWizard(false)} />
                </div>
            )}
        </>
    );
}