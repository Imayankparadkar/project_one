"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Home,
    Megaphone,
    CirclePlus,
    CreditCard,
    FileText,
    Wallet,
    Settings,
    Users,
    HelpCircle,
    LogOut,
    X,
    MoreHorizontal,
    Monitor,
    Sun,
    Moon,
    Check,
    ChevronUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/providers/ThemeProvider";

// --- CONSTANTS ---

const NAV_ITEMS = [
    { label: "Quick Create", icon: CirclePlus, href: "/brand/create-campaign" },
    { label: "Home", icon: Home, href: "/brand" },
    { label: "Campaigns", icon: Megaphone, href: "/brand/campaigns" },
    { label: "Payments", icon: CreditCard, href: "/brand/payments" },
    { label: "Invoices", icon: FileText, href: "/brand/invoices" },
    { label: "Payouts", icon: Wallet, href: "/brand/payouts" },
    { label: "Settings", icon: Settings, href: "/brand/settings" },
    { label: "Team", icon: Users, href: "/brand/team" },
    { label: "Help & Support", icon: HelpCircle, href: "/brand/help-support" },
    { label: "Logout", icon: LogOut, href: "/" },
];

const LANGUAGES = [
    { code: "EN", label: "English", flag: "🇺🇸" },
    { code: "DE", label: "Deutsch", flag: "🇩🇪" },
    { code: "ES", label: "Español", flag: "🇪🇸" },
    { code: "FR", label: "Français", flag: "🇫🇷" },
    { code: "PT", label: "Português", flag: "🇵🇹" },
    { code: "CN", label: "中文", flag: "🇨🇳" },
    { code: "IT", label: "Italiano", flag: "🇮🇹" },
    { code: "NL", label: "Nederlands", flag: "🇳🇱" },
    { code: "PL", label: "Polski", flag: "🇵🇱" },
    { code: "JP", label: "日本語", flag: "🇯🇵" },
    { code: "TR", label: "Türkçe", flag: "🇹🇷" },
];



export default function Sidebar() {
    const [mounted, setMounted] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const [language, setLanguage] = useState(LANGUAGES[0]);
    const pathname = usePathname();
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
                setIsMobileMenuOpen(false);
                setIsLangMenuOpen(false);
            }
        };

        if (isMobileMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMobileMenuOpen]);

    const cycleTheme = () => {
        if (theme === "system") setTheme("light");
        else if (theme === "light") setTheme("dark");
        else setTheme("system");
    };

    const checkIsActive = (href: string) => {
        if (href === '/brand' || href === '/') {
            return pathname === href;
        }
        return pathname.startsWith(href);
    };

    // --- MOBILE & DESKTOP HELPERS ---
    const mobilePrimaryItems = NAV_ITEMS.slice(0, 3);
    const mobileSecondaryItems = NAV_ITEMS.slice(3);

    // --- SUB-COMPONENTS ---

    // 1. Language List (Dropdown content)
    const LanguageList = () => (
        <div className="flex flex-col max-h-[200px] overflow-y-auto no-scrollbar">
            {LANGUAGES.map((lang) => (
                <button
                    key={lang.code}
                    onClick={(e) => {
                        e.stopPropagation();
                        setLanguage(lang);
                        setIsLangMenuOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-(--color-surface-hover) transition-colors text-left group"
                >
                    <span className="text-lg">{lang.flag}</span>
                    <span className={cn("text-sm flex-1", language.code === lang.code ? "text-(--color-text-primary) font-medium" : "text-(--color-text-secondary) group-hover:text-(--color-text-primary)")}>
                        {lang.label}
                    </span>
                    {language.code === lang.code && <Check className="w-4 h-4 text-(--color-text-primary)" />}
                </button>
            ))}
        </div>
    );

    // 2. Segmented Theme Control (Used in Mobile & Expanded Desktop)
    const SegmentedThemeControl = () => (
        <div className="flex bg-(--color-surface-elevated) rounded-lg p-1 gap-1 flex-1 h-10 items-center">
            <button
                onClick={() => setTheme("system")}
                className={cn(
                    "flex-1 flex items-center justify-center h-full rounded-md transition-all",
                    (!mounted || theme === "system") ? "bg-(--color-surface-active) text-(--color-text-primary) shadow-sm" : "text-(--color-text-muted) hover:text-(--color-text-secondary)"
                )}
            >
                <Monitor className="w-4 h-4" />
            </button>
            <button
                onClick={() => setTheme("light")}
                className={cn(
                    "flex-1 flex items-center justify-center h-full rounded-md transition-all",
                    (mounted && theme === "light") ? "bg-(--color-surface-active) text-(--color-text-primary) shadow-sm" : "text-(--color-text-muted) hover:text-(--color-text-secondary)"
                )}
            >
                <Sun className="w-4 h-4" />
            </button>
            <button
                onClick={() => setTheme("dark")}
                className={cn(
                    "flex-1 flex items-center justify-center h-full rounded-md transition-all",
                    (mounted && theme === "dark") ? "bg-(--color-surface-active) text-(--color-text-primary) shadow-sm" : "text-(--color-text-muted) hover:text-(--color-text-secondary)"
                )}
            >
                <Moon className="w-4 h-4" />
            </button>
        </div>
    );

    // 3. Desktop Footer
    const DesktopFooter = () => (
        <div className="w-full mt-auto">

            {/* --- SLIM VIEW (Default) --- 
                Visible when group is NOT hovered. 
                Shows single icon cycling through themes. 
            */}
            <div className="w-full flex justify-center py-4 group-hover:hidden transition-all duration-200">
                <button
                    onClick={cycleTheme}
                    className="w-10 h-10 rounded-xl bg-(--color-icon-bg) hover:bg-(--color-surface-hover) flex items-center justify-center text-(--color-text-secondary) hover:text-(--color-text-primary) transition-all"
                >
                    {!mounted ? <Monitor className="w-5 h-5" /> : (
                        <>
                            {theme === "system" && <Monitor className="w-5 h-5" />}
                            {theme === "light" && <Sun className="w-5 h-5" />}
                            {theme === "dark" && <Moon className="w-5 h-5" />}
                        </>
                    )}
                </button>
            </div>

            {/* --- EXPANDED VIEW (On Hover) --- 
                Visible ONLY when group IS hovered.
                Shows Segmented Control + Language Button.
            */}
            <div className="hidden group-hover:flex flex-col w-full p-4 border-t border-(--color-border) animate-in fade-in slide-in-from-left-2 duration-200">
                <div className="flex items-center gap-2 w-full">
                    {/* Theme Segmented Control */}
                    <SegmentedThemeControl />

                    {/* Language Button */}
                    <div className="relative">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsLangMenuOpen(!isLangMenuOpen);
                            }}
                            className="h-10 w-10 flex items-center justify-center bg-(--color-surface-elevated) rounded-lg text-(--color-text-primary) text-sm font-medium border border-transparent hover:border-(--color-border) transition-all shrink-0"
                        >
                            {language.code}
                        </button>

                        {/* Language Popup (Absolute) */}
                        {isLangMenuOpen && (
                            <div className="absolute left-full bottom-0 ml-3 w-48 bg-(--color-bg-tertiary) border border-(--color-border) rounded-xl shadow-2xl overflow-hidden z-60 ring-1 ring-black/20">
                                <div className="p-2 bg-(--color-surface-elevated) border-b border-(--color-border-subtle)">
                                    <p className="text-xs font-semibold text-(--color-text-secondary) px-2">Select Language</p>
                                </div>
                                <LanguageList />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            {/* --- DESKTOP SIDEBAR --- */}
            <aside className="hidden lg:flex flex-col sticky top-0 h-screen bg-(--color-bg-sidebar) text-(--color-text-primary) font-semibold transition-[width] duration-300 ease-in-out w-[80px] hover:w-64 group z-100 border-r border-(--color-border) shrink-0 overflow-y-auto no-scrollbar overflow-x-hidden">

                {/* Logo Section */}
                <div className="h-16 flex items-center px-6 overflow-hidden whitespace-nowrap shrink-0">
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-(--color-logo-from) to-(--color-logo-to)">
                        <span className="block group-hover:hidden">B</span>
                        <span className="hidden group-hover:block">BennyBucks</span>
                    </span>
                </div>

                {/* Nav Items */}
                <nav className="flex-1 py-6 flex flex-col gap-2 overflow-y-auto overflow-x-hidden no-scrollbar">
                    {NAV_ITEMS.map((item) => {
                        const isActive = checkIsActive(item.href);
                        return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center px-6 py-3 transition-colors hover:bg-(--color-surface-hover) group-hover:px-6 relative",
                                isActive ? "text-(--color-text-primary)" : "text-(--color-text-secondary)"
                            )}
                        >
                            <item.icon className="min-w-[24px] w-6 h-6" />
                            <span className="ml-4 text-base opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-75 whitespace-nowrap overflow-hidden">
                                {item.label}
                            </span>
                            {isActive && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-(--color-nav-indicator) rounded-r-full" />
                            )}
                        </Link>
                    )})}
                </nav>

                {/* Desktop Footer (Theme & Lang) */}
                <DesktopFooter />
            </aside>

            {/* --- MOBILE BOTTOM BAR --- */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-(--color-bg-sidebar) text-(--color-text-primary) border-t border-(--color-border) z-100 px-4 py-2 pb-safe">
                <nav className="flex justify-around items-center w-full max-w-md mx-auto">

                    {/* Primary Mobile Items */}
                    {mobilePrimaryItems.map((item) => {
                        const isActive = checkIsActive(item.href);
                        return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center p-2 rounded-lg transition hover:bg-(--color-surface-hover)",
                                isActive ? "text-(--color-text-primary)" : "text-(--color-text-secondary)"
                            )}
                        >
                            <item.icon className="w-6 h-6" />
                        </Link>
                    )})}

                    {/* "More" Button */}
                    <div className="relative" ref={mobileMenuRef}>
                        <button
                            onClick={() => {
                                setIsMobileMenuOpen(!isMobileMenuOpen);
                                setIsLangMenuOpen(false); // Reset nested menu
                            }}
                            className={cn(
                                "flex flex-col items-center justify-center p-2 rounded-lg transition hover:bg-(--color-surface-hover)",
                                isMobileMenuOpen ? "text-(--color-text-primary) bg-(--color-surface-hover)" : "text-(--color-text-secondary)"
                            )}
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MoreHorizontal className="w-6 h-6" />}
                        </button>

                        {/* "More" Popup Window */}
                        {isMobileMenuOpen && (
                            <div className="absolute bottom-full right-0 mb-4 w-64 bg-(--color-bg-tertiary) border border-(--color-border) rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 ring-1 ring-black/20">

                                {/* Header / Lang Back Button */}
                                {isLangMenuOpen ? (
                                    <div className="flex items-center gap-2 p-3 border-b border-(--color-border-subtle) bg-(--color-surface-elevated)">
                                        <button onClick={() => setIsLangMenuOpen(false)} className="p-1 hover:bg-(--color-surface-hover) rounded-md">
                                            <ChevronUp className="w-4 h-4 -rotate-90 text-(--color-text-secondary)" />
                                        </button>
                                        <span className="text-sm font-semibold text-(--color-text-primary)">Select Language</span>
                                    </div>
                                ) : (
                                    <div className="flex flex-col p-1">
                                        {mobileSecondaryItems.map((item) => (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="flex items-center gap-3 px-4 py-3 text-sm text-(--color-text-secondary) hover:bg-(--color-surface-hover) hover:text-(--color-text-primary) transition-colors rounded-lg"
                                            >
                                                <item.icon className="w-4 h-4" />
                                                {item.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}

                                {/* Divider */}
                                {!isLangMenuOpen && <div className="h-px bg-(--color-border-subtle) mx-2 my-1" />}

                                {/* Bottom Controls (Theme & Lang) */}
                                {isLangMenuOpen ? (
                                    <LanguageList />
                                ) : (
                                    <div className="p-3 flex gap-2">
                                        <SegmentedThemeControl />
                                        <button
                                            onClick={() => setIsLangMenuOpen(true)}
                                            className="h-10 px-3 bg-(--color-surface-elevated) rounded-lg text-(--color-text-primary) text-sm font-medium border border-transparent hover:border-(--color-border) transition-colors"
                                        >
                                            {language.code}
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </>
    );
}