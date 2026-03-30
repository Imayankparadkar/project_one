import { Calendar, Users, Instagram, Youtube } from "lucide-react";
import Image from "next/image";

interface CampaignCardProps {
  campaign?: {
    title: string;
    company: string;
    categories: string[];
    platforms: string[];
    paidOut: string;
    totalBudget: string;
    cp: number;
    cpm: string;
    approval: string;
    views: string;
    creators: string;
    image?: string;
    dateRange?: string;
  };
}

const campaignData = [
  {
    title: "Cadbury Dairy Milk",
    company: "Cadbury",
    categories: ["UGC", "Product"],
    platforms: ["instagram", "youtube"],
    paidOut: "₹87,000",
    totalBudget: "₹1,00,000",
    cp: 87,
    cpm: "₹3,000",
    approval: "90%",
    views: "10M",
    creators: "+30",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png",
    dateRange: "01 Mar 2026 — 31 Mar 2026"
  }
];

const getCategoryStyle = (cat: string) => {
  const normalized = cat.toUpperCase();
  if (normalized === "UGC") return "bg-[#0EA5E9] text-white";
  if (normalized === "MUSIC") return "bg-[#DB2777] text-white";
  if (normalized === "CLIPPING") return "bg-[#6D28D9] text-white";
  if (normalized === "LOGO") return "bg-[#059669] text-white";
  return "bg-page-surface-alt text-text-primary outline outline-1 outline-page-border/50";
};

const PlatformIcon = ({ platform }: { platform: string }) => {
  if (platform === 'instagram') {
    return (
      <div className="w-6 h-6 rounded-full bg-page-surface-alt border border-page-border/50 flex items-center justify-center text-[#e1306c]">
        <Instagram className="w-3.5 h-3.5" strokeWidth={2.5} />
      </div>
    );
  }
  if (platform === 'youtube') {
    return (
      <div className="w-6 h-6 rounded-full bg-page-surface-alt border border-page-border/50 flex items-center justify-center text-[#ff0000]">
        <Youtube className="w-3.5 h-3.5" strokeWidth={2.5} />
      </div>
    );
  }

  return null;
};

export default function CampaignCard({ campaign = campaignData[0] }: CampaignCardProps) {
  return (
    <div className="group relative flex flex-col bg-page-surface border border-page-border rounded-[20px] overflow-hidden transition-all duration-300 ease-out 
    
   shadow-lg transition-all hover:shadow-xl
    ">
      {/* Top Image Section */}
      <div className="relative w-full h-[220px] bg-page-surface-alt overflow-hidden">
        {/* Inner shadow overlay for 3D depth */}
        <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <Image
          alt={campaign.title}
          fill
          unoptimized
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          src={campaign.image || "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png"}
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2 z-10">
          {campaign.categories.map((category, index) => (
            <div
              key={index}
              className={`px-3 py-1 rounded-full text-[12px] font-semibold tracking-wide capitalize ${getCategoryStyle(category)} shadow-sm`}
            >
              {category.toLowerCase() === 'ugc' ? 'UGC' : category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
            </div>
          ))}
        </div>

        {/* Date Container */}
        <div className="absolute right-4 bottom-4 flex items-center gap-1 rounded-full bg-white/80 px-2.5 py-1 text-[11px] text-[#737B8C] backdrop-blur-sm">
          <Calendar className="w-3 h-3 stroke-[2.5]" />
          <span className=" font-medium tracking-wide">{campaign.dateRange || "01 Mar 2026 — 31 Mar 2026"}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col gap-6 bg-page-surface">

        {/* Header */}
        <div className="flex justify-between items-start gap-4">
          <div className="flex flex-col gap-0.5 min-w-0">
            <h3 className="text-[18px] font-bold text-text-primary leading-tight truncate">
              {campaign.title}
            </h3>
            <span className="text-sm font-medium text-text-secondary">
              {campaign.company}
            </span>
          </div>

          <div className="flex gap-1.5 flex-shrink-0">
            {campaign.platforms.map((platform, idx) => (
              <PlatformIcon key={idx} platform={platform} />
            ))}
          </div>
        </div>

        {/* Stats Table */}
        <div className="flex flex-col gap-3.5 w-full">
          <div className="flex justify-between items-center w-full">
            <span className="text-sm text-text-secondary font-medium">
              Creators
            </span>
            <span className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
              <Users className="w-4 h-4 text-text-muted" strokeWidth={2.5} />
              {campaign.creators}
            </span>
          </div>

          <div className="flex justify-between items-center w-full">
            <span className="text-sm text-text-secondary font-medium">Budget</span>
            <span className="text-sm font-semibold text-foreground text-green-600 ">&#8377;{campaign.totalBudget}</span>
          </div>

          <div className="flex flex-col gap-2.5 w-full">
            <div className="flex justify-between items-center w-full">
              <span className="text-sm text-text-secondary font-medium">Budget Used</span>
              <span className="text-sm font-semibold text-foreground">{campaign.cp}%</span>
            </div>
            {/* Progress Bar */}
            <div className="
            
            relative w-full h-1 bg-muted rounded-full overflow-hidden
            ">
              {/* w-full h-2.5 bg-page-surface-alt border border-page-border/30 */}
              <div
                className="
                absolute left-0 top-0 h-full bg-orange-500 rounded-full transition-all duration-300 
                "
                style={{ width: `${campaign.cp}%` }}
              />
            </div>
          </div>
        </div>

      </div>

      {/* Rate Footer */}
      <div className="mt-auto border-t border-page-border bg-page-surface p-4.5 py-4 flex flex-col items-center justify-center gap-1">
        <span className="text-[13px] text-text-muted font-medium">Rate per 1M Views</span>
        <span className="text-[20px] font-semibold text-foreground text-green-600">&#8377;{campaign.cpm}</span>
      </div>
    </div>
  );
}
