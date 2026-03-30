"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function BrandHeader() {
  const [progress, setProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? (el.scrollTop / max) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navButtonClass =
    "flex items-center gap-1.5 text-text-brand-header hover:text-text-primary transition-colors capitalize tracking-wider text-[1rem] font-medium border-b-2 border-transparent leading-6 hover:bg-text-brand-header-hover px-4 py-3 rounded-md";

  const dropdownButtonClass =
    "block px-4 py-3 text-[1rem] text-text-brand-header hover:text-text-primary rounded-md transition-colors capitalize tracking-wider leading-6 hover:bg-text-brand-header-hover";

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-page-surface-alt backdrop-blur-md border-b border-page-border">
      <div className="h-[3px] bg-page-surface">
        <div
          className="h-full bg-brand-red transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="w-full flex items-center justify-between px-4 sm:px-8 py-2">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <svg width="34" height="34" viewBox="0 0 28 28" fill="none">
              <path
                d="M4 6l4 12 6-8 6 8 4-12"
                stroke="#e5383b"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-2xl font-bold text-text-primary/90 tracking-tight">
              bennybucks
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-6 md:gap-8 font-semibold text-sm">
          {/* Nav Links */}
          <div className="hidden lg:flex items-center ">
            {/* Verticals Dropdown */}
            <div className="relative group">
              <button className={navButtonClass}>
                Verticals
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              {/* Invisible hover bridge */}
              <div className="absolute top-full left-0 w-full h-4"></div>

              <div className="absolute top-[calc(100%+8px)] -left-4 w-48 bg-page-surface border border-page-border rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-xl z-50 p-2 flex flex-col gap-1">
                <Link href="/ugc" className={dropdownButtonClass}>
                  UGC
                </Link>
                <Link href="/clipping" className={dropdownButtonClass}>
                  Clipping
                </Link>
                <Link href="/music" className={dropdownButtonClass}>
                  Music
                </Link>
                <Link href="/logo" className={dropdownButtonClass}>
                  Logo
                </Link>
              </div>
            </div>

            <Link href="/creators" className={navButtonClass}>
              Creator
            </Link>
            <Link href="/brand-campaign" className={navButtonClass}>
              Brands
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 lg:ml-6">
            <Link
              href="/login"
              className="hidden md:block rounded-md bg-text-primary hover:bg-text-primary/90 text-page-surface text-[1rem] font-medium px-5 py-2 transition-all shadow-md hover:shadow-lg Capitalize tracking-wider border border-transparent leading-6"
            >
              Join As Creator
            </Link>

            <Link
              href="/brand"
              className="hidden md:block rounded-md  bg-[#1754d8] hover:bg-[#1240a6] text-[1rem] font-medium px-4 py-2 transition-all shadow-md hover:shadow-lg Capitalize tracking-wider border border-transparent leading-6"
            >
              Launch Your Campaign
            </Link>

            {/* <button className="rounded-md bg-[#1754d8] hover:bg-[#1240a6] text-white text-[1rem] font-medium px-4 sm:px-6 py-2.5 transition-colors Capitalize tracking-wider leading-6">
              Launch <span className="hidden sm:inline">Your Campaign</span>
            </button> */}

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 -mr-2 text-text-primary/80 hover:text-text-primary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-page-surface-alt/95 backdrop-blur-md border-b border-page-border flex flex-col px-6 py-6 gap-6 shadow-2xl">
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/ugc"
                  className="bg-text-primary/5 border border-page-border rounded-lg p-3 text-sm font-semibold hover:bg-text-primary/10 transition-colors uppercase tracking-wider text-center"
                >
                  UGC
                </Link>
                <Link
                  href="/clipping"
                  className="bg-text-primary/5 border border-page-border rounded-lg p-3 text-sm font-semibold hover:bg-text-primary/10 transition-colors uppercase tracking-wider text-center"
                >
                  Clipping
                </Link>
                <Link
                  href="/music"
                  className="bg-text-primary/5 border border-page-border rounded-lg p-3 text-sm font-semibold hover:bg-text-primary/10 transition-colors uppercase tracking-wider text-center"
                >
                  Music
                </Link>
                <Link
                  href="/logo"
                  className="bg-text-primary/5 border border-page-border rounded-lg p-3 text-sm font-semibold hover:bg-text-primary/10 transition-colors uppercase tracking-wider text-center"
                >
                  Logo
                </Link>
              </div>
            </div>

            <div className="h-[1px] bg-text-primary/10 w-full" />

            <div className="flex flex-col gap-4">
              <Link
                href="/creators"
                className="text-lg font-bold hover:text-text-primary/80 transition-colors uppercase tracking-wider"
              >
                Creator
              </Link>
              <Link
                href="/brand-campaign"
                className="text-lg font-bold hover:text-text-primary/80 transition-colors uppercase tracking-wider"
              >
                Brands
              </Link>
            </div>

            <div className="h-[1px] bg-text-primary/10 w-full" />

            <Link
              href="/login"
              className="w-full rounded-xl bg-text-primary hover:bg-text-primary/90 text-page-surface text-sm font-medium px-5 py-3.5 transition-all shadow-md border border-transparent uppercase tracking-wider"
            >
              Join as creator
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
