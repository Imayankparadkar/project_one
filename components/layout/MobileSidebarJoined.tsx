"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { SIDEBAR_MENU, Dropdown, Item, type SidebarSectionType, type SidebarItemType } from "./SidebarJoined";

export function MobileSidebarJoined() {
  const [open, setOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>('Home');
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Header Bar - Only visible on mobile */}
      <div className="md:hidden sticky top-0 z-30 bg-background border-b px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <button 
            onClick={() => setOpen(true)} 
            className="p-2 -ml-2 text-foreground hover:bg-muted/50 rounded-md transition-colors"
            aria-label="Open Menu"
            >
            <Menu size={24} />
            </button>
            <span className="font-semibold text-sm">Joined</span>
        </div>
      </div>

      {/* Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-[1px] transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[280px] bg-background border-r shadow-2xl transition-transform duration-300 ease-out transform ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
           {/* Header image styled block like sidebar */}
            <div className="flex items-center gap-2 ml-2">
                <span className="font-bold text-lg">Joined</span>
            </div>
          <button 
            onClick={() => setOpen(false)}
            className="rounded-full p-2 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100%-65px)]">
            {/* Header image duplicated from sidebar */}
            <div className="border-b">
                <img
                src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/bb/a3/97/predator-ride-in-the.jpg?w=900&h=500&s=1"
                className="w-full object-cover h-32"
                alt="Community Banner"
                />
                <div className="p-3">
                <p className="font-semibold text-sm">Rayston Heem Clipping</p>
                <span className="text-xs text-green-500 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
                    Online
                </span>
                </div>
            </div>

            {/* Profile duplicated */}
            <div className="px-4 py-4 border-b flex items-center gap-3 bg-muted/20">
                <img
                src="https://placehold.co/40"
                className="h-10 w-10 rounded-lg object-cover"
                alt="User"
                />
                <div>
                <p className="font-semibold text-sm">Rayston Heem Clipping</p>
                <p className="text-xs text-muted-foreground">JOINED</p>
                </div>
            </div>

            <div className="px-2 py-3 space-y-1 text-sm">
            {SIDEBAR_MENU.map((section: SidebarSectionType) =>
                section.items ? (
                <Dropdown
                    key={section.key}
                    title={section.title}
                    icon={section.icon}
                    open={expandedSection === section.key}
                    onClick={() =>
                    setExpandedSection(expandedSection === section.key ? null : section.key)
                    }
                >
                    {section.items.map((item: SidebarItemType) => (
                    <div key={item.label} onClick={() => setOpen(false)}>
                        <Item
                            label={item.label}
                            href={item.href}
                            active={pathname === item.href}
                        />
                    </div>
                    ))}
                </Dropdown>
                ) : (
                    <div key={section.key} onClick={() => setOpen(false)}>
                    <Item
                        label={section.title}
                        href={section.href!}
                        icon={section.icon}
                        active={pathname === section.href}
                    />
                    </div>
                )
            )}
            </div>
        </div>
      </aside>
    </>
  );
}
