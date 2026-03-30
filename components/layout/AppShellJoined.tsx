import SidebarJoined from "./SidebarJoined";
import { MobileSidebarJoined } from "./MobileSidebarJoined";

export default function AppShellJoined({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col md:flex-row">
      {/* Sidebar only on desktop */}
      <SidebarJoined />

      {/* Mobile Sidebar */}
      <MobileSidebarJoined />

      {/* Content */}
      <main className="flex-1 min-w-0 bg-background relative">
        {children}
      </main>
    </div>
  );
}
