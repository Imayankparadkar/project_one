/* eslint-disable @next/next/no-img-element */
"use client";

import {
  ArrowLeft,
  Info as InfoIcon,
  Instagram,
  Youtube,
} from "lucide-react";

export default function ContentRewardsBennyBucksExact() {
  // Mock configuration demonstrating how dynamic data will bind real currency prefixes/rates.
  // In production, sync this variable with the backend API response config directly.
  const currencySymbol = "₹";

  // Additional mock parameters representing future dynamic layout data:
  const campaignData = {
    title: "Trader Mayne Clips Q4 2025",
    paidOutAmount: "22,562.65",
    totalAmount: "27,475.96",
    percentagePaidOut: "82%",
    rewardRate: "1.00 / 1K"
  };

  return (
    <div className="w-full min-h-full flex flex-col relative bg-white dark:bg-[#0b0b0b] text-text-primary transition-colors">
      {/* HEADER */}
      <div className="h-14 flex items-center gap-3 px-6 border-b border-gray-100 dark:border-white/10 shrink-0">

        <span className="text-[14px] font-semibold text-[#111] dark:text-[#f3f3f3]">Content Rewards</span>
      </div>

      {/* CONTENT */}
      <div className="flex-1 w-full mx-auto px-6 py-8 space-y-10 pb-10">

        {/* TOP SECTION: BANNER AND NOTICE */}
        <div className="space-y-6">

          {/* SUBMISSIONS */}
          <div className="flex items-center gap-3 rounded-[12px] py-3.5 px-5 text-[13px] font-[600] text-[#b57b2a] bg-[#fcf4ce] dark:text-[#efb822] dark:bg-[#2c2104]">
            <InfoIcon size={18} strokeWidth={2.5} className="shrink-0" />
            <span>Only views after you submit count towards payout. Submit as soon as you post to get paid for all of your views.</span>
          </div>
        </div>

        {/* PAID OUT */}
        <div className="space-y-1.5">
          <p className="text-[16px] font-[500] text-gray-400 uppercase mb-1.5">PAID OUT</p>
          <div className="flex justify-between items-end pb-1.5">
            <span className="text-[14.5px] font-[700] text-[#111] dark:text-[#f3f3f3]">
              {currencySymbol}{campaignData.paidOutAmount} of {currencySymbol}{campaignData.totalAmount} paid out
            </span>
            <span className="text-[14.5px] font-[700] text-[#111] dark:text-[#f3f3f3]">
              {campaignData.percentagePaidOut}
            </span>
          </div>

          <div className="h-2 rounded-full bg-[#f4f4f5] dark:bg-white/10 overflow-hidden">
            <div className="h-full w-[82%] bg-[#fb8c00] rounded-full" />
          </div>
        </div>

        {/* GLOBAL INFO */}
        <div className="flex flex-wrap items-end gap-x-12 gap-y-7">
          {/* <Info title="REWARD" value={`${currencySymbol}${campaignData.rewardRate}`} blue /> */}
          <Info title="TYPE" value="Clipping" />
          {/* <Info title="MINIMUM PAYOUT" value={`${currencySymbol}1.00`} /> */}
          {/* <Info title="MAXIMUM PAYOUT" value={`${currencySymbol}500.00`} /> */}
          <Info title="CATEGORY" value="Personal brand" />
        </div>

        {/* PLATFORM PAYOUT STATS */}
        <div className="space-y-4 pt-2">
          <p className="text-[16px] font-medium text-gray-400 uppercase">PAYOUT</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <PlatformCard
              platform="Instagram"
              icon={<Instagram className="w-[22px] h-[22px] text-[#e1306c] drop-shadow-sm" strokeWidth={2} />}
              stats={{
                maxPerPost: `${currencySymbol}500.00`,
                minPerPost: `${currencySymbol}1.00`,
                cpm: `${currencySymbol}10000`,
                submissionLimit: "3",
                maxPerCreator: `${currencySymbol}2,000.00`
              }}
            />
            <PlatformCard
              platform="YouTube"
              icon={<Youtube className="w-[24px] h-[24px] text-[#ff0000] drop-shadow-sm" strokeWidth={2} />}
              stats={{
                maxPerPost: `${currencySymbol}1,000.00`,
                minPerPost: `${currencySymbol}5.00`,
                cpm: `${currencySymbol}10000`,
                submissionLimit: "1",
                maxPerCreator: `${currencySymbol}5,000.00`
              }}
            />
          </div>
        </div>

        {/* REQUIREMENTS */}
        <div className="space-y-3 pt-2">
          <p className="text-[16px] font-medium text-gray-400 uppercase ">REQUIREMENTS</p>
          <div className="flex flex-col gap-3">
            {[
              "Video must feature Mayne",
              "Must tag @tradermayne",
              "Video must have added elements (captions, graphics, etc)",
              "Must follow @tradermayne on Instagram, TikTok, and YouTube (send DM to confirm)",
              "ENGAGEMENT MUST BE ORGANIC (bots or purchases views will result in a ban)",
              "No reposting other Whop users content",
              "Audience must be primarily US/UK based",
              "Disclaimer: We reserve the right to reject videos from accounts that don't meet our standards.",
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4 rounded-xl bg-[#fafafa] dark:bg-[#111] border border-gray-100 dark:border-white/10 text-[#111] dark:text-[#f3f3f3]">
                <span className="flex items-center justify-center text-[12.5px] font-extrabold shrink-0">
                  {i + 1}.
                </span>
                <span className="text-[14px] font-semibold">{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ASSETS */}
        <div className="space-y-3 pt-2">
          <p className="text-[16px] font-medium text-gray-400 uppercase">ASSETS</p>

          <div className="flex items-center gap-4 p-3 rounded-[12px] border border-gray-200 dark:border-white/10 bg-white dark:bg-[#111] cursor-pointer hover:border-gray-300 dark:hover:border-white/20 transition-all">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/d/da/Google_Drive_logo.png"
              className="w-10 h-10 object-contain drop-shadow-sm"
              alt="Google Drive"
            />
            <div className="flex flex-col min-w-0 pr-4">
              <p className="text-[14px] font-[600] text-[#3b5bdb] truncate mb-0.5">drive.google.com</p>
              <p className="text-[12.5px] font-[500] text-gray-500 truncate">https://drive.google.com/drive/folders/1rfHtZbR-_Ex2FGVLos_eFanBmmXjuhPY?usp=sharing</p>
            </div>
          </div>
        </div>

      </div>

      {/* FOOTER (STICKY BOTTOM) */}
      <div className="sticky bottom-0 w-full bg-white/95 dark:bg-[#0b0b0b]/95 backdrop-blur-md border-t border-gray-100 dark:border-white/10 shrink-0 z-20">
        <div className="mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col w-full sm:w-auto text-center sm:text-left">
            <span className="text-[15.5px] font-[800] text-[#111] dark:text-[#f3f3f3]">{campaignData.title}</span>
            <span className="text-[12.5px] font-[600] text-gray-400 mt-0.5">{currencySymbol}{campaignData.rewardRate}</span>
          </div>

          <button className="w-full sm:w-auto px-12 py-2.5 rounded-[10px] bg-[#3b5bdb] hover:bg-[#324fc2] text-white text-[14.5px] font-[700] transition-colors focus:ring-4 focus:ring-blue-500/20 active:scale-[0.98]">
            Submit
          </button>
        </div>
      </div>

    </div>
  );
}

/* ---------- helpers ---------- */

function Info({
  title,
  value,
  blue,
}: {
  title: string;
  value: string;
  blue?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-[16px] font-medium text-gray-400 uppercase">{title}</p>
      <div className={`px-2.5 py-1 w-fit rounded-[8px] text-[13.5px] font-[600] ${blue ? "bg-[#3b5bdb] text-white" : "bg-[#f4f4f5] dark:bg-white/5 text-[#222] dark:text-[#eee]"}`}>
        {value}
      </div>
    </div>
  );
}

function PlatformCard({ platform, icon, stats }: { platform: string, icon: React.ReactNode, stats: { maxPerPost: string, minPerPost: string, cpm: string, submissionLimit: string, maxPerCreator: string } }) {
  return (
    <div className="border border-gray-100 dark:border-white/10 rounded-[16px] p-5 bg-[#fafafa] dark:bg-[#111] flex flex-col overflow-hidden relative">
      <div className="flex items-center gap-3 mb-6 relative z-10">
        {icon}
        <span className="text-[15px] font-[700] text-[#111] dark:text-[#f3f3f3]">{platform}</span>
      </div>

      <div className="grid grid-cols-2 gap-y-5 gap-x-4 relative z-10">
        <PlatformStat title="CPM" value={stats.cpm} highlight />
        <PlatformStat title="Max Submission per acc" value={stats.submissionLimit} />
        <PlatformStat title="MIN PAYOUT (POST)" value={stats.minPerPost} />
        <PlatformStat title="MAX PAYOUT (POST)" value={stats.maxPerPost} />
        <PlatformStat title="MAX (CREATOR)" value={stats.maxPerCreator} />
      </div>
    </div>
  );
}

function PlatformStat({ title, value, highlight }: { title: string, value: string, highlight?: boolean }) {
  return (
    <div className="flex flex-col gap-1 align-top">
      <span className="text-[16px] font-medium text-gray-400 leading-relaxed uppercase pr-2">{title}</span>
      {highlight ? (
        <span className="w-fit px-2.5 py-0.5 mt-0.5 rounded-[6px] text-[13px] font-[700] bg-[#3b5bdb] text-white shadow-sm">
          {value}
        </span>
      ) : (
        <span className="text-[14px] mt-0.5 font-bold text-[#111] dark:text-[#f3f3f3]">{value}</span>
      )}
    </div>
  );
}
