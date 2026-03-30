"use client";

import { useState, useEffect, useRef } from "react";

type Section = { id: string; label: string };

const sections: Section[] = [
  { id: "intro", label: "Introduction" },
  { id: "what-is", label: "What is a whop?" },
  { id: "examples", label: "Real examples" },
  { id: "how-it-works", label: "How it works" },
  { id: "get-started", label: "Getting started" },
];

function TopNav({ progress }: { progress: number }) {
  return (
    <header className="sticky top-0 z-50 bg-page-surface-alt border-b border-page-border">
      <div className="h-[3px] bg-page-surface">
        <div
          className="h-full bg-brand-red transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mx-auto flex max-w-[1480px] items-center justify-between px-8 py-4">
        <div className="flex items-center gap-3">
          <svg width="34" height="34" viewBox="0 0 28 28" fill="none">
            <path
              d="M4 6l4 12 6-8 6 8 4-12"
              stroke="#e5383b"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-xl font-bold text-text-primary/90 tracking-tight">
            bennybucks
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="text-base text-text-primary/70 hover:text-text-primary font-medium px-2 transition-colors"
          >
            Join Our Community
          </a>
          <button className="rounded-xl bg-blue-600 hover:bg-blue-700 text-text-primary text-base font-semibold px-6 py-2.5 transition-colors">
            Launch Campaign
          </button>
        </div>
      </div>
    </header>
  );
}

export default function LandingPage() {
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<"listen" | "contents" | "summary">(
    "contents",
  );
  const [activeSection, setActiveSection] = useState("intro");
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? (el.scrollTop / max) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          if (e.isIntersecting) setActiveSection(e.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px" },
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) =>
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="min-h-screen bg-page-bg text-text-primary">
      <TopNav progress={progress} />

      {/* ══════════ HERO ══════════ */}
      <section className="bg-page-surface-alt border-b border-page-border">
        <div className="mx-auto max-w-[1480px] px-8 py-16 md:py-20 flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Left text */}
          <div className="flex-1 min-w-0">
            <div className="mb-5 flex items-center gap-2 text-base text-text-primary/50">
              <a href="#" className="hover:text-text-primary/80 transition-colors">
                Blog
              </a>
              <span>→</span>
              <span className="text-text-primary/80">Whop</span>
            </div>
            <p className="text-base text-text-primary/50 mb-4">Sep 22, 2025</p>
            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold leading-[1.12] text-text-primary">
              What is a whop?
              <br />A complete guide to whops
            </h1>
            <div className="mt-7 flex flex-wrap items-center gap-4 text-base text-text-primary/60">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-sm font-black text-text-primary">
                  E
                </div>
                <span>
                  By <span className="text-text-primary/90 font-semibold">East</span>
                </span>
                <span className="text-blue-400 text-lg">✔</span>
              </div>
              <span className="text-text-primary/30 text-xl">|</span>
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-sm font-black text-text-primary">
                  K
                </div>
                <span>
                  Reviewed by{" "}
                  <span className="text-blue-600 font-semibold hover:underline cursor-pointer">
                    Keisha Singleton
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Right: Hero mockup — bigger */}
          <div className="w-full md:w-[520px] xl:w-[580px] flex-shrink-0">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-page-surface to-page-bg border border-page-border aspect-[4/3] shadow-2xl shadow-black/60">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-purple-900/30 to-indigo-900/40" />
              <div className="relative z-10 w-full h-full flex">
                {/* Mock sidebar */}
                <div
                  className="w-18 bg-page-surface-alt/80 flex flex-col items-center py-5 gap-5 border-r border-page-border"
                  style={{ width: "72px" }}
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-red/90 flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 28 28" fill="none">
                      <path
                        d="M4 6l4 12 6-8 6 8 4-12"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-xl bg-text-primary/10 flex items-center justify-center"
                    >
                      <div className="w-4 h-4 rounded bg-white/30" />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-xl bg-blue-600/60 flex items-center justify-center mt-1">
                    <svg
                      width="15"
                      height="15"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </div>
                </div>
                {/* Mock content */}
                <div className="flex-1 p-4 flex flex-col gap-3">
                  <div className="text-xs text-text-primary/40 font-semibold tracking-wide">
                    $500 IN 7 DAYS ▾
                  </div>
                  <div className="bg-[#1a1a2e]/60 rounded-xl p-3 text-[11px] text-text-primary/70 border border-page-border">
                    <div className="font-bold text-text-primary/40 mb-2 text-[9px] tracking-widest">
                      ADMIN AREA
                    </div>
                    <div className="flex items-center gap-2 py-1.5 border-b border-page-border">
                      <div className="w-2.5 h-2.5 rounded-sm bg-white/20" />
                      <span>Checklist</span>
                    </div>
                    <div className="flex items-center gap-2 py-1.5">
                      <div className="w-2.5 h-2.5 rounded-sm bg-white/20" />
                      <span>Dashboard</span>
                    </div>
                  </div>
                  <div className="flex-1 rounded-xl overflow-hidden bg-gradient-to-b from-purple-800/50 via-pink-800/30 to-indigo-900/60 flex items-end p-3 border border-page-border">
                    <div className="text-[10px] text-text-primary/40 font-medium">
                      Whop App Preview
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ BODY ══════════ */}
      <div className="mx-auto max-w-[1480px] px-8 py-12 flex gap-10 xl:gap-14 items-start">
        {/* ══ LEFT STICKY SIDEBAR ══ */}
        <aside className="hidden lg:block w-[340px] xl:w-[380px] flex-shrink-0 sticky top-[68px] self-start space-y-6">
          {/* Listen / Contents / Summary */}
          <div className="rounded-2xl border border-page-border bg-page-surface overflow-hidden">
            <div className="flex border-b border-page-border">
              {(["listen", "contents", "summary"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3.5 text-sm font-semibold capitalize transition-colors flex items-center justify-center gap-2 ${activeTab === tab
                    ? "text-text-primary border-b-2 border-white"
                    : "text-text-primary/40 hover:text-text-primary/70"
                    }`}
                >
                  {tab === "listen" && (
                    <svg
                      width="13"
                      height="13"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                      <line x1="12" y1="19" x2="12" y2="23" />
                      <line x1="8" y1="23" x2="16" y2="23" />
                    </svg>
                  )}
                  {tab === "contents" && (
                    <svg
                      width="13"
                      height="13"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <line x1="8" y1="6" x2="21" y2="6" />
                      <line x1="8" y1="12" x2="21" y2="12" />
                      <line x1="8" y1="18" x2="21" y2="18" />
                      <line x1="3" y1="6" x2="3.01" y2="6" />
                      <line x1="3" y1="12" x2="3.01" y2="12" />
                      <line x1="3" y1="18" x2="3.01" y2="18" />
                    </svg>
                  )}
                  {tab === "summary" && (
                    <svg
                      width="13"
                      height="13"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                  )}
                  {tab}
                </button>
              ))}
            </div>
            <div className="p-5">
              {activeTab === "contents" && (
                <nav className="space-y-1">
                  {sections.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => scrollTo(s.id)}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-[15px] transition-colors ${activeSection === s.id
                        ? "bg-text-primary/10 text-text-primary font-semibold"
                        : "text-text-primary/50 hover:text-text-primary/80 hover:bg-text-primary/5"
                        }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </nav>
              )}
              {activeTab === "listen" && (
                <div className="py-6 text-center">
                  <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-text-primary/10 flex items-center justify-center">
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    </svg>
                  </div>
                  <p className="text-base text-text-primary/60 mb-4">
                    Listen to this article
                  </p>
                  <button className="rounded-xl bg-blue-600 text-text-primary text-sm font-semibold px-5 py-2.5">
                    Play audio
                  </button>
                </div>
              )}
              {activeTab === "summary" && (
                <div className="space-y-3 py-2 text-[15px] text-text-primary/60 leading-relaxed">
                  <p>
                    A whop is a customizable online business space for courses,
                    memberships, and communities.
                  </p>
                  <p>
                    Whop apps are modular building blocks that let creators add
                    features easily.
                  </p>
                  <p>
                    Built-in marketplace helps creators get discovered by
                    millions.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Promo card */}
          <div className="rounded-2xl border border-page-border bg-page-surface overflow-hidden">
            {/* Card image */}
            <div className="relative h-56 bg-gradient-to-br from-[#0d1117] via-[#1a1f2e] to-[#0d1117] overflow-hidden">
              <div className="absolute inset-0 p-4">
                <div className="w-full h-full bg-text-primary/5 rounded-xl border border-page-border p-3 overflow-hidden">
                  <div className="text-[9px] text-text-primary/40 mb-1.5 font-medium">
                    Today
                  </div>
                  <div className="flex justify-between text-[9px] text-green-400 mb-3">
                    <span>$906,424.42</span>
                    <span>$1,210,454.61</span>
                  </div>
                  <div className="relative h-20">
                    <svg
                      viewBox="0 0 200 60"
                      className="w-full h-full opacity-70"
                    >
                      <polyline
                        points="0,50 30,40 60,20 90,35 120,15 150,25 200,10"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="2"
                      />
                      <polyline
                        points="0,55 30,50 60,45 90,48 120,42 150,38 200,45"
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="1.5"
                        strokeDasharray="4,2"
                      />
                    </svg>
                  </div>
                  <div className="text-[9px] text-text-primary/40 mt-1">
                    $10,000,000.00
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-12 w-12 rounded-full bg-black/60 border border-page-border backdrop-blur-sm flex items-center justify-center">
                  <svg width="18" height="18" fill="white" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="p-5">
              <p className="text-base font-bold text-text-primary leading-snug">
                Start with an idea — we&apos;ll handle the rest
              </p>
              <p className="mt-2 text-sm text-text-primary/50 leading-relaxed">
                One platform for creating, hosting, and selling. Whop runs
                everything that powers your business.
              </p>
              <button className="mt-5 w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-text-primary text-base font-semibold py-3 transition-colors">
                Start selling today
              </button>
            </div>
          </div>
        </aside>

        {/* ══ MAIN ARTICLE ══ */}
        <main ref={articleRef} className="min-w-0 flex-1">
          {/* ── Intro ── */}
          <div id="intro" className="scroll-mt-24 mb-14">
            <p className="text-xl text-text-primary/80 leading-[1.8] mb-6">
              Whop is a platform for any online business. Learn what a whop is,
              explore real examples, and see how you can start selling your own
              offers—from memberships, to services, to coaching.
            </p>

            {/* Key takeaways */}
            <div className="my-8 rounded-2xl border border-page-border bg-page-surface p-7">
              <p className="text-base font-bold text-text-primary mb-4">
                Key takeaways
              </p>
              <ul className="space-y-4">
                {[
                  "A whop is a customizable online business space you can shape into courses, coaching, memberships, or any monetizable offer.",
                  "Apps are modular building blocks that let creators add specific features like chat, courses, and forums to their whop.",
                  "Whop combines creation tools with a built-in marketplace, helping creators both build and get discovered by millions of visitors.",
                ].map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-base text-text-primary/70 leading-relaxed"
                  >
                    <span className="mt-2 h-2 w-2 rounded-full bg-blue-600 flex-shrink-0" />
                    <span
                      dangerouslySetInnerHTML={{
                        __html: point.replace(
                          /(courses|coaching|memberships|monetizable offer|chat|forums|built-in marketplace|millions)/g,
                          '<span class="text-blue-600 font-medium">$1</span>',
                        ),
                      }}
                    />
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-lg text-text-primary/70 leading-relaxed">
              The internet has made it possible for{" "}
              <em className="text-text-primary not-italic font-semibold">anyone</em> to
              turn an idea into a business. Whether you want to teach, coach,
              build a community, or sell a service, all you need is the right
              place to bring it to life.
            </p>
            <p className="mt-5 text-lg text-text-primary/70 leading-relaxed">
              That&apos;s where{" "}
              <span className="text-blue-600 font-semibold">
                Whop comes in.
              </span>
            </p>
            <p className="mt-5 text-lg text-text-primary/70 leading-relaxed">
              Whop is the all-in-one platform and marketplace for online
              businesses of every kind. With Whop, you can create a whop—your
              own offer that people can buy, join, or book.
            </p>
            <p className="mt-5 text-lg text-text-primary/70 leading-relaxed">
              A whop can be anything: an online course, a membership, a coaching
              program, a consulting package, or even a hybrid offer that blends
              digital and in-person experiences.
            </p>
            <p className="mt-5 text-lg text-text-primary/70 leading-relaxed">
              Every whop comes with the tools you need to sell, manage, and
              scale your business in one place. And because Whop has its own
              built-in marketplace, millions of people each month can find and
              purchase offers just like yours.
            </p>
          </div>

          {/* ── What is a whop ── */}
          <div id="what-is" className="scroll-mt-24 mb-14">
            <h2 className="text-3xl font-extrabold text-text-primary mb-7">
              What is a whop?
            </h2>

            {/* Large section image */}
            <div className="mb-8 rounded-3xl overflow-hidden border border-page-border aspect-[16/8] bg-gradient-to-br from-purple-900 via-pink-900/60 to-indigo-900 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-b from-purple-800/20 to-indigo-900/80" />
              <div className="relative z-10 flex w-full h-full">
                <div
                  className="bg-black/50 flex flex-col items-center py-6 gap-5 border-r border-page-border"
                  style={{ width: "76px" }}
                >
                  <div className="w-11 h-11 rounded-xl bg-brand-red flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
                      <path
                        d="M4 6l4 12 6-8 6 8 4-12"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-11 h-11 rounded-xl bg-text-primary/10 flex items-center justify-center"
                    >
                      <div className="w-5 h-5 rounded bg-white/20" />
                    </div>
                  ))}
                </div>
                <div className="flex-1 p-6 flex flex-col justify-end">
                  <div className="rounded-2xl bg-black/50 backdrop-blur-md border border-page-border p-4 max-w-[260px]">
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="w-6 h-6 rounded bg-yellow-400/20 border border-yellow-400/30 flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-sm bg-yellow-400" />
                      </div>
                      <span className="text-sm text-text-primary/80 font-semibold">
                        Whop
                      </span>
                    </div>
                    <p className="text-sm text-text-primary/50">
                      Your customizable business space
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-[76px] right-0 h-1/2 bg-gradient-to-t from-purple-900/60 to-transparent" />
            </div>

            <p className="text-lg text-text-primary/70 leading-relaxed mb-5">
              A whop is your customizable online space built to fit whatever
              business or community you want to create.
            </p>
            <p className="text-lg text-text-primary/70 leading-relaxed mb-5">
              When you first{" "}
              <span className="text-blue-600 underline cursor-pointer">
                set up your whop
              </span>
              , it starts as a blank canvas. From there, you shape it into
              exactly what you need.
            </p>
            <p className="text-lg text-text-primary/70 leading-relaxed mb-5">
              Maybe your whop offers group coaching calls, exclusive courses, or
              member-only discussions. Maybe it&apos;s a booking hub for
              services, a paid newsletter, or a private community. With Whop,
              you decide how it looks, feels, and functions.
            </p>
          </div>

          {/* ── Real examples ── */}
          <div id="examples" className="scroll-mt-24 mb-14">
            <h2 className="text-3xl font-extrabold text-text-primary mb-7">
              Real examples of whops
            </h2>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-text-primary mb-5">
                Data Engineer Academy:{" "}
                <span className="text-text-primary/60 font-semibold">
                  $3,000/month
                </span>
              </h3>
              <div className="rounded-3xl border border-page-border bg-page-surface overflow-hidden">
                <div className="flex items-center gap-3 px-6 pt-6 pb-3">
                  <div className="w-8 h-8 rounded-lg bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center">
                    <svg
                      width="14"
                      height="14"
                      fill="none"
                      stroke="#eab308"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <path d="M9 9h6M9 12h6M9 15h4" />
                    </svg>
                  </div>
                  <span className="text-base font-bold text-text-primary">
                    Data Engineer Academy
                  </span>
                </div>
                <div className="mx-5 mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-[#0d1117] to-[#1a1f2e] border border-page-border p-8 text-center">
                  <h4 className="text-2xl font-extrabold text-text-primary leading-tight mb-3">
                    Learn how to code and land your
                    <br />
                    dream data engineer role.
                  </h4>
                  <p className="text-base text-text-primary/50 mb-7 max-w-md mx-auto leading-relaxed">
                    Unlock The Skills To Excel In Data Engineering With Our
                    Comprehensive Academy. Learn From Experts And Gain Hands-On
                    Experience.
                  </p>
                  <div className="mx-auto rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0b0b0b] border border-page-border max-w-[240px] p-5 flex items-center gap-4">
                    <div className="h-14 w-14 rounded-xl bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center">
                      <span className="text-2xl font-black text-yellow-400">
                        D
                      </span>
                    </div>
                    <span className="text-xl font-extrabold text-text-primary">
                      DE Academy
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-lg text-text-primary/70 leading-relaxed mb-6">
              A high-ticket education &amp; mentorship program preparing people
              for data engineering roles. This whop includes personalized
              curriculums, hands-on projects, mock interview prep, and placement
              support.
            </p>

            <div className="rounded-2xl border border-page-border bg-page-surface p-5 mb-5 flex items-center gap-5">
              <div className="h-16 w-16 rounded-2xl bg-pink-500/20 border border-pink-400/20 flex items-center justify-center text-2xl font-black text-pink-400 flex-shrink-0">
                P
              </div>
              <div>
                <p className="font-bold text-text-primary text-base">
                  Pop Mart Labubu Wonderland —{" "}
                  <span className="text-text-primary/60 font-semibold">$15/month</span>
                </p>
                <p className="text-sm text-text-primary/50 mt-1 leading-relaxed">
                  Exclusive collector&apos;s community with early access drops
                  and trading channels.
                </p>
              </div>
            </div>
          </div>

          {/* ── How it works ── */}
          <div id="how-it-works" className="scroll-mt-24 mb-14">
            <h2 className="text-3xl font-extrabold text-text-primary mb-7">
              How it works
            </h2>
            <p className="text-lg text-text-primary/70 leading-relaxed mb-8">
              Once you set up your whop, members can purchase access using a
              one-time payment or subscription. You control pricing, access
              levels, and what content they can see.
            </p>
            <div className="space-y-4">
              {[
                {
                  n: "01",
                  title: "Create your whop",
                  desc: "Sign up free and set up your digital storefront in minutes.",
                },
                {
                  n: "02",
                  title: "Add apps & content",
                  desc: "Choose from courses, community, coaching, newsletters, and more.",
                },
                {
                  n: "03",
                  title: "Set your price",
                  desc: "One-time, subscription, or free — you decide.",
                },
                {
                  n: "04",
                  title: "Get discovered",
                  desc: "List on the Whop marketplace and reach millions of buyers.",
                },
              ].map((s) => (
                <div
                  key={s.n}
                  className="flex items-start gap-6 rounded-2xl border border-page-border bg-page-surface px-7 py-5"
                >
                  <span className="text-3xl font-black text-text-primary/15 flex-shrink-0 leading-none mt-1">
                    {s.n}
                  </span>
                  <div>
                    <p className="font-bold text-text-primary text-base">{s.title}</p>
                    <p className="text-sm text-text-primary/50 mt-1 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8 rounded-3xl overflow-hidden border border-page-border aspect-[16/8] bg-gradient-to-br from-purple-900 via-pink-900/60 to-indigo-900 flex items-center justify-center relative">
            {/* <div className="absolute inset-0 bg-gradient-to-b from-purple-800/20 to-indigo-900/80" /> */}

            <video
              src="https://videos.pexels.com/video-files/7308103/7308103-hd_1920_1080_24fps.mp4"
              muted
              autoPlay
              controls
            ></video>

            {/* <div className="absolute bottom-0 left-[76px] right-0 h-1/2 bg-gradient-to-t from-purple-900/60 to-transparent" /> */}
          </div>

          {/* ── Get started ── */}
          <div id="get-started" className="scroll-mt-24 mb-14">
            <h2 className="text-3xl font-extrabold text-text-primary mb-7">
              Getting started
            </h2>
            <p className="text-lg text-text-primary/70 leading-relaxed mb-7">
              Getting started with Whop is completely free. You only pay when
              you make money — Whop takes a small percentage of your revenue, so
              there&apos;s no upfront cost.
            </p>
            <div className="rounded-2xl border border-page-border bg-gradient-to-br from-page-surface to-page-bg p-10 text-center">
              <p className="text-2xl font-bold text-text-primary mb-3">
                Ready to start your business?
              </p>
              <p className="text-base text-text-primary/50 mb-7">
                Join thousands of creators already earning on Whop.
              </p>
              <button className="rounded-2xl bg-blue-600 hover:bg-blue-700 text-text-primary font-bold text-lg px-10 py-4 transition-colors">
                Start selling for free →
              </button>
            </div>
          </div>

          {/* Author card */}
          <div className="mt-10 rounded-2xl border border-page-border bg-page-surface p-7 flex items-start gap-5">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-2xl font-black text-text-primary flex-shrink-0">
              E
            </div>
            <div>
              <p className="font-bold text-text-primary text-lg">East</p>
              <p className="text-sm text-text-primary/50 mt-1.5 leading-relaxed">
                Creator educator and clipping expert. Helping the next
                generation of digital entrepreneurs build sustainable income
                streams.
              </p>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <button className="text-sm text-text-primary/30 hover:text-text-primary/60 transition-colors">
              Report this content
            </button>
          </div>
        </main>
      </div>

      {/* Mobile bottom TOC */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-page-border bg-page-bg/95 backdrop-blur-md">
        <div className="px-4 py-2.5 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`flex-shrink-0 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${activeSection === s.id
                ? "bg-white text-black"
                : "bg-text-primary/10 text-text-primary/60"
                }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
      <div className="h-16 lg:hidden" />

      {/* ─── Footer ─── */}
      <footer className="border-t border-page-border bg-page-surface-alt text-text-primary">
        <div className="mx-auto max-w-[1480px] px-6 py-16">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr_1fr_1fr] gap-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                  <path
                    d="M4 6l4 12 6-8 6 8 4-12"
                    stroke="#e5383b"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-lg font-semibold tracking-wide">
                  Whop
                </span>
              </div>
              <p className="text-sm text-text-primary/50 leading-relaxed max-w-xs">
                The easiest way to sell access to anything online. Build,
                monetize, and grow your digital business.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-sm font-semibold mb-4 text-text-primary/80">
                Product
              </h4>
              <ul className="space-y-3 text-sm text-text-primary/50">
                <li>
                  <a href="#" className="hover:text-text-primary transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-text-primary transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-text-primary transition">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-text-primary transition">
                    Changelog
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-sm font-semibold mb-4 text-text-primary/80">
                Company
              </h4>
              <ul className="space-y-3 text-sm text-text-primary/50">
                <li>
                  <a href="#" className="hover:text-text-primary transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-text-primary transition">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-text-primary transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-text-primary transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-sm font-semibold mb-4 text-text-primary/80">
                Stay updated
              </h4>
              <p className="text-sm text-text-primary/50 mb-4">
                Get product updates and news straight to your inbox.
              </p>
              <div className="flex items-center bg-text-primary/5 border border-page-border rounded-lg overflow-hidden">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-transparent px-4 py-2 text-sm flex-1 outline-none text-text-primary placeholder:text-text-primary/30"
                />
                <button className="bg-brand-red hover:bg-[#c92f32] px-4 py-2 text-sm font-medium transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-page-border mt-16 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-text-primary/40">
            {/* Legal Links */}
            <div className="flex gap-6">
              <a href="#" className="hover:text-text-primary transition">
                Terms
              </a>
              <a href="#" className="hover:text-text-primary transition">
                Privacy
              </a>
              <a href="#" className="hover:text-text-primary transition">
                Cookies
              </a>
            </div>

            {/* Copyright */}
            <p>© {new Date().getFullYear()} Whop Inc. All rights reserved.</p>

            {/* Social Icons */}
            <div className="flex gap-4">
              <a href="#" className="hover:text-text-primary transition">
                Twitter
              </a>
              <a href="#" className="hover:text-text-primary transition">
                Instagram
              </a>
              <a href="#" className="hover:text-text-primary transition">
                Discord
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
