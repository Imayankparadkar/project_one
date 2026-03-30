import React from "react";
import { ChevronDown } from "lucide-react";
import { CampaignFormData } from "../types";
import ThumbnailUploader from "../ThumbnailUploader";
import { mockUsers } from "@/lib/data/users";

interface Step1DetailsProps {
    formData: CampaignFormData;
    setFormData: React.Dispatch<React.SetStateAction<CampaignFormData>>;
}

export default function Step1Details({ formData, setFormData }: Step1DetailsProps) {
    const activeUser = mockUsers[0]; // Assuming Frieren is the active user
    const inputClass = "w-full rounded-lg border border-[var(--color-border-input)] bg-[var(--color-bg-input)] bg-yellow-radial px-3 py-2 text-sm leading-5 tracking-[0.14px] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] outline-none transition-all focus:border-[var(--color-border-input-foc)] focus:ring-1 focus:ring-[var(--color-border-input-foc)]";

    const AIButton = () => (
        <div className="group/ai relative">
            <div className="p-[1.5px] rounded-lg bg-ai-gradient">
                <button 
                    type="button" 
                    className="text-(--color-text-muted) hover:text-(--color-text-secondary) bg-[var(--color-bg-card)] p-1.5 rounded-[7px] transition-all cursor-pointer active:scale-95 flex items-center justify-center shrink-0"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-grow-in">
                        <path d="M3.3877 9.29102C3.64259 8.65445 4.54384 8.65455 4.79883 9.29102L5.14551 10.1572C5.27246 10.4746 5.5245 10.7264 5.8418 10.8535L6.70898 11.2002C7.34583 11.455 7.34565 12.3564 6.70898 12.6113L5.8418 12.958C5.52446 13.085 5.2726 13.337 5.14551 13.6543L4.79883 14.5215C4.54403 15.1585 3.64248 15.1585 3.3877 14.5215L3.04102 13.6543C2.91386 13.3371 2.66208 13.0849 2.34473 12.958L1.47852 12.6113C0.84189 12.3564 0.841704 11.455 1.47852 11.2002L2.34473 10.8535C2.66233 10.7265 2.91398 10.4748 3.04102 10.1572L3.3877 9.29102ZM4.09277 11.3193C3.928 11.5435 3.73096 11.7405 3.50684 11.9053C3.73104 12.07 3.92792 12.2681 4.09277 12.4922C4.25754 12.268 4.45458 12.0701 4.67871 11.9053C4.45485 11.7405 4.25736 11.5434 4.09277 11.3193ZM8.77832 1.66016C9.06321 0.779286 10.3342 0.779308 10.6191 1.66016L10.6436 1.75195L11.1445 3.91894C11.2521 4.38448 11.6155 4.74899 12.0811 4.85644L14.249 5.35644C15.2509 5.58813 15.251 7.01553 14.249 7.24707L12.0811 7.74707C11.6155 7.85455 11.2521 8.21806 11.1445 8.68359L10.6436 10.8516C10.4119 11.8535 8.98554 11.8535 8.75391 10.8516L8.25293 8.68359C8.14534 8.21807 7.78197 7.85456 7.31641 7.74707L5.14844 7.24707C4.14646 7.0155 4.14659 5.58815 5.14844 5.35644L7.31641 4.85644C7.78201 4.74899 8.14532 4.38448 8.25293 3.91894L8.75391 1.75195L8.77832 1.66016ZM9.69824 4.31641C9.44971 5.29199 8.68863 6.05261 7.71289 6.30078C8.6887 6.54886 9.44965 7.31054 9.69824 8.28613C9.94669 7.31074 10.7082 6.54914 11.6836 6.30078C10.7082 6.05233 9.94663 5.29178 9.69824 4.31641Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                </button>
            </div>
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/ai:opacity-100 transition-opacity pointer-events-none z-50">
                <div className="bg-zinc-800 text-white text-[10px] font-medium px-2 py-1 rounded shadow-xl whitespace-nowrap border border-white/10">
                    Generate using AI
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-800" />
                </div>
            </div>
        </div>
    );


    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            {/* Campaign Name */}
            <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-(--color-text-primary)">
                        Campaign Name <span className="text-[#f9a84b]">*</span>
                    </label>
                    <AIButton />
                </div>
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={`${activeUser.name}'s Campaign`}
                    className={inputClass}
                />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-(--color-text-primary)">
                        Description
                    </label>
                    <AIButton />
                </div>
                <textarea
                    value={formData.description}
                    onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Describe your campaign..."
                    className={inputClass + " min-h-[100px] resize-none"}
                />
            </div>

            {/* Type & Category */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-(--color-text-primary)">
                        Type <span className="text-[#f9a84b]">*</span>
                    </label>
                    <div className="relative">
                        <select
                            value={formData.type}
                            onChange={(e) =>
                                setFormData({ ...formData, type: e.target.value })
                            }
                            className={inputClass + " appearance-none cursor-pointer"}
                        >
                            <option value="UGC">UGC</option>
                            <option value="Music">Music</option>
                            <option value="Clipping">Clipping</option>
                            <option value="Logo">Logo</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                    </div>
                </div>
                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-(--color-text-primary)">
                        Category <span className="text-[#f9a84b]">*</span>
                    </label>
                    <div className="relative">
                        <select
                            value={formData.category}
                            onChange={(e) =>
                                setFormData({ ...formData, category: e.target.value })
                            }
                            className={inputClass + " appearance-none cursor-pointer"}
                            disabled={formData.type !== "UGC"}
                        >
                            <option value="Brand">Brand</option>
                            <option value="Product">Product</option>
                            <option value="Service">Service</option>
                            <option value="Place">Place</option>
                            <option value="Awareness">Awareness</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Thumbnail */}
            <div className="space-y-1.5">
                <label className="text-sm font-semibold text-(--color-text-primary)">
                    Campaign Thumbnail <span className="text-[#f9a84b]">*</span>
                </label>
                <ThumbnailUploader
                    previewUrl={formData.thumbnail}
                    onFileSelect={(url) =>
                        setFormData({ ...formData, thumbnail: url })
                    }
                />
            </div>
        </div>
    );
}