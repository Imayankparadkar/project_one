"use client";

import BalancePage from "../../balance/page";

export default function SettingsBalancePage() {
    return <div className="min-h-screen text-text-primary p-4 md:p-8">
        <div className="">
            <h1 className="text-2xl font-bold">Balance</h1>
        </div>
        <BalancePage isSettingsView={true} />
    </div>
        ;
}
