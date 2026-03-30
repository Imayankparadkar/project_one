"use client";
import {
    Instagram,
    ExternalLink,
    Users,
    Bell,
    Search,
} from "lucide-react";

const isRewardsEnded = true;

type Submission = {
    title: string;
    status: string;
    statusType: "pending" | "rejected";
    views: number;
    reward: string;
    payout: string;
};

const submissions: Submission[] = [
        {
            title: "Clip Rayston's YouTube Videos",
            status: "Decision any moment",
            statusType: "pending",
            views: 12_430,
            reward: "$1.00 / 1K",
            payout: "$12.43",
        },
        {
            title: "Instagram Reels - Motivational Clips",
            status: "Decision any moment",
            statusType: "pending",
            views: 4_980,
            reward: "$1.50 / 1K",
            payout: "$7.47",
        },
        {
            title: "Short-form TikTok Edits",
            status: "Rejected",
            statusType: "rejected",
            views: 2_100,
            reward: "$2.00 / 1K",
            payout: "$0.00",
        },
        {
            title: "Podcast Highlight Clips",
            status: "Rejected",
            statusType: "rejected",
            views: 860,
            reward: "$1.00 / 1K",
            payout: "$0.00",
        },
    ];

export default function MySubmissions() {
    return (
        <div className="w-full">
            <Header />
            <div className="pb-10 md:pb-6">
                <Tabs />
                <Actions />

                <div className="px-4 md:px-6">
                    <Table submissions={submissions} ended={isRewardsEnded} />
                </div>
            </div>
        </div>
    );
}

function Header() {
    return (
        <div className="flex items-center justify-between border-b px-4 md:px-6 py-4 sticky top-0 bg-background z-10 transition-colors">
            <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center font-bold text-green-600">
                    $
                </div>
                <h1 className="text-lg font-semibold text-foreground">Content Rewards</h1>
            </div>

            <div className="flex items-center gap-4 text-muted-foreground">
                <Users size={18} className="hover:text-foreground transition-colors cursor-pointer" />
                <Bell size={18} className="hover:text-foreground transition-colors cursor-pointer" />
                <Search size={18} className="hover:text-foreground transition-colors cursor-pointer" />
            </div>
        </div>
    );
}

function Tabs() {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b px-4 md:px-6 gap-2 sm:gap-0 sticky top-14 sm:top-0 bg-background z-10">
            <div className="flex gap-6 text-sm overflow-x-auto no-scrollbar">
                <button className="py-3 border-b-2 border-primary font-medium text-foreground whitespace-nowrap">
                    My submissions
                </button>
            </div>

            <button className="text-xs text-muted-foreground hover:text-foreground py-2 sm:py-0 text-left sm:text-right">
                How do Content Rewards work?
            </button>
        </div>
    );
}


function Actions() {
    return (
        <div className="flex items-center justify-between px-4 md:px-6 py-4">
            <button className="rounded-full border bg-background hover:bg-muted/50 px-3 py-1.5 text-xs text-foreground transition-colors">
                Status
            </button>

            <button className="rounded-md border bg-background hover:bg-muted/50 px-3 py-1.5 text-xs text-foreground transition-colors">
                Edit
            </button>
        </div>
    );
}


function Table({ submissions, ended }: { submissions: Submission[]; ended: boolean }) {
  return (
    <div className="mt-2">
      <div className="overflow-hidden rounded-xl border bg-muted/10 shadow-sm">
        <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="border-b bg-muted/30 text-muted-foreground uppercase text-[11px] tracking-wider">
                <tr>
                <th className="px-4 md:px-6 py-3 font-medium">Title</th>
                <th className="px-4 md:px-6 py-3 font-medium">Status</th>
                <th className="px-4 md:px-6 py-3 text-right font-medium">Total views</th>
                <th className="px-4 md:px-6 py-3 text-center font-medium">Submission</th>
                <th className="px-4 md:px-6 py-3 font-medium">Reward rate</th>
                <th className="px-4 md:px-6 py-3 text-right font-medium">Paid out</th>
                </tr>
            </thead>

            <tbody className="divide-y relative">
                {submissions.length > 0 ? (
                submissions.map((item, i) => (
                    <tr key={i} className="group hover:bg-muted/40 transition-colors">
                    <td className="px-4 md:px-6 py-4 font-medium max-w-[200px] md:max-w-[240px] truncate text-foreground">
                        {item.title}
                    </td>
                    <td className="px-4 md:px-6 py-4">
                        <StatusPill label={item.status} type={item.statusType} />
                    </td>
                    <td className="px-4 md:px-6 py-4 text-right tabular-nums text-foreground group-hover:font-medium">
                        {item.views.toLocaleString()}
                    </td>
                    <td className="px-4 md:px-6 py-4">
                        <div className="flex justify-center gap-3">
                        <div className="p-1.5 rounded-md hover:bg-muted cursor-pointer transition-colors text-muted-foreground hover:text-pink-500">
                             <Instagram size={18} />
                        </div>
                        <div className="p-1.5 rounded-md hover:bg-muted cursor-pointer transition-colors text-muted-foreground hover:text-blue-500">
                             <ExternalLink size={18} />
                        </div>
                        </div>
                    </td>
                    <td className="px-4 md:px-6 py-4 text-muted-foreground">{item.reward}</td>
                    <td className="px-4 md:px-6 py-4 text-right font-bold text-green-600 tabular-nums">
                        {item.payout}
                    </td>
                    </tr>
                ))
                ) : (
                <tr>
                    <td colSpan={6} className="h-64">
                    <EmptyRow ended={ended} />
                    </td>
                </tr>
                )}
            </tbody>
            </table>
        </div>
      </div>

       {/* Mobile hint */}
      <div className="mt-3 flex items-center justify-center gap-2 md:hidden text-[11px] text-muted-foreground">
         <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40"></span>
         <span>Swipe table to see more details</span>
         <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40"></span>
      </div>
    </div>
  );
}

function StatusPill({
  label,
  type,
}: {
  label: string;
  type: "pending" | "rejected";
}) {
  const styles =
    type === "pending"
      ? "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20"
      : "bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/20";

  return (
    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium whitespace-nowrap ${styles}`}>
      {label}
    </span>
  );
}

function EmptyRow({ ended }: { ended: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-12">
      <div className="h-16 w-16 mb-4 rounded-full bg-muted/50 flex items-center justify-center">
            <Search className="w-8 h-8 text-muted-foreground/50" />
      </div>

      {ended ? (
        <div className="text-center">
          <p className="text-base font-semibold text-foreground">
            No active <span className="text-green-500">submissions</span>
          </p>
          <p className="text-sm text-muted-foreground mt-1 max-w-[250px] mx-auto">
            This Content Rewards campaign has ended. Check back later!
          </p>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-base font-semibold text-foreground">
            Start <span className="text-green-500">submitting</span> content
          </p>
          <p className="text-sm text-muted-foreground mt-1 mb-4">
            Upload your clips to earn rewards.
          </p>

          <button className="inline-flex items-center justify-center rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-text-primary hover:bg-green-600 transition-colors shadow-sm">
            Start submission
          </button>
        </div>
      )}
    </div>
  );
}
