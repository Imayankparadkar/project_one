import SidebarSettings from "@/components/layout/SidebarSettings";
import { MobileSidebarSettings } from "@/components/layout/MobileSidebarSettings";

export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex w-full flex-col md:flex-row min-h-screen">
            {/* Sidebar only on desktop */}
            <SidebarSettings />

            {/* Mobile Sidebar */}
            <MobileSidebarSettings />

            {/* Content */}
            <main className="flex-1 min-w-0 bg-background relative">
                {children}
            </main>
        </div>
    );
}
