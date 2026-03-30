// AS PER WHOP
export interface PlatformReward {
    rewardPerView: string;
    minPayout: string;
    maxPayout: string;
    submissionLimit: string;
    maxPayoutPerCreator: string;
}

export interface FAQ {
    question: string;
    answer: string;
}

export interface ApplicationQuestion {
    id: string;
    text: string;
    type: string; // "Text" | "Image" | "Video" | "Doc"
    required: boolean;
    fileUrl?: string;
}

export interface CampaignFormData {
    name: string;
    description: string;
    type: string;
    category: string;
    thumbnail: string;
    budget: string;
    hasEndDate: boolean;
    campaignEndDate: string;
    platforms: string[];

    // Global Rewards
    rewardPerView: string;
    minPayout: string;
    maxPayout: string;
    submissionLimit: string;
    maxPayoutPerCreator: string;

    // Per Platform Settings
    usePerPlatformRewards: boolean;
    perPlatformRewards: Record<string, PlatformReward>;

    requirements: string[];
    contentLinks: string[];
    faqs: FAQ[]; // Fixed: Was string[]

    applicationQuestions: ApplicationQuestion[];

    requireApplication: boolean;

    brandName?: string;
    objective?: string;
}


// AS PER THE DOC OF BennyBucks
// export interface CampaignFormData {
//     name: string;
//     description: string;
//     type: string;
//     objective: string;
//     budget: string;
//     thumbnail?: string;

//     // Dynamic Fields
//     brandName: string;
//     productName: string;
//     serviceName: string;
//     category: string;
//     campaignTheme: string;
//     channelName: string;
//     channelNiche: string;
//     songName: string;
//     songLanguage: string;
//     songType: string;
// }

// export type CampaignType = "Original UGC" | "Clipping" | "LogoDrop" | "Music";