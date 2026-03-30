"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CampaignRootPage() {
    const router = useRouter();

    useEffect(() => {
        // Only redirect on desktop sizes to show details immediately.
        // On mobile, landing on the root shows the menu (Sidebar).
        const checkAndRedirect = () => {
            if (window.innerWidth >= 1024) {
                router.replace(window.location.pathname + "/details");
            }
        };

        checkAndRedirect();
        window.addEventListener('resize', checkAndRedirect);
        return () => window.removeEventListener('resize', checkAndRedirect);
    }, [router]);

    return null;
}
