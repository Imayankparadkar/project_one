import Sidebar from "@/components/brand/Sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-(--color-bg-primary) text-(--color-text-primary) lg:flex">
            <Sidebar />

            {/* Main Content Area */}
            <main className="flex-1 min-w-0 min-h-screen">
                <div className="pb-[80px] lg:pb-0">
                    {children}
                </div>
            </main>
        </div>
    );
}