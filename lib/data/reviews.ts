import { Review } from "@/components/brand/campaigns/reviews/ReviewCard";

export const MOCK_REVIEWS: Review[] = [
    {
        id: "1",
        author: { name: "Emmanuel Chukwu King", handle: "emmanuel", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emmanuel" },
        rating: 1,
        content: "I just wasted my precious time with your clip. The instructions were misleading and I got no feedback.",
        date: "Written January 28, 2026",
        timestamp: new Date("2026-01-28").getTime(),
        reply: {
            content: "Hi Emmanuel, we're sorry to hear about your experience. We've updated our brief to be more clear and would love to offer you a direct collaboration to make it right. Check your DMs!",
            date: "Replied February 02, 2026",
            authorName: "Brand Team"
        }
    },
    {
        id: "2",
        author: { name: "Pranay Singh", handle: "pranay", initials: "PS", color: "#6366f1" },
        rating: 1,
        content: "They don't review or pay. Been waiting for 3 weeks and zero response from the brand team.",
        date: "Written October 27, 2025",
        timestamp: new Date("2025-10-27").getTime(),
        reply: {
            content: "Hello Pranay, we apologize for the delay. We had a surge in submissions but we've now processed all pending reviews including yours. Your payout has been initiated.",
            date: "Replied October 30, 2025",
            authorName: "Brand Team"
        }
    },
    {
        id: "3",
        author: { name: "ramzan shaloli", handle: "surefit", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ramzan" },
        rating: 5,
        content: "Nice. The payout was instant and the brief was very clear. I will definitely participate in more campaigns from this brand!",
        date: "Written August 15, 2025",
        timestamp: new Date("2025-08-15").getTime()
    },
    {
        id: "4",
        author: { name: "rev0546", handle: "blueskies5431", initials: "RE", color: "#10b981" },
        rating: 5,
        content: "great. Loved the product and high flexibility with the content style. One of the best brand collaborations I've had lately.",
        date: "Written July 10, 2025",
        timestamp: new Date("2025-07-10").getTime()
    },
    {
        id: "5",
        author: { name: "Sarah Content", handle: "sarahc", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah" },
        rating: 4,
        content: "Really good experience. The only minor thing was the assets took a bit longer to download, but overall very professional.",
        date: "Written May 22, 2025",
        timestamp: new Date("2025-05-22").getTime()
    },
    {
        id: "6",
        author: { name: "Alex Rivers", handle: "arivers", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex" },
        rating: 3,
        content: "Average experience. The brief was okay, but the communication could have been better.",
        date: "Written April 12, 2025",
        timestamp: new Date("2025-04-12").getTime()
    },
    {
        id: "7",
        author: { name: "Jordan Smith", handle: "jsmith", initials: "JS", color: "#f97316" },
        rating: 2,
        content: "Not great. The rewards were changed halfway through the campaign which felt unfair.",
        date: "Written March 05, 2025",
        timestamp: new Date("2025-03-05").getTime(),
        reply: {
            content: "Hi Jordan, we appreciate your feedback. We encountered a technical issue with the reward calculations during that period, and we've since addressed it. We've sent you a bonus for the trouble!",
            date: "Replied March 07, 2025",
            authorName: "Brand Team"
        }
    }
];

export const RATING_DISTRIBUTION = [
    { stars: 5, count: 42, percentage: 59, color: "bg-emerald-500" },
    { stars: 4, count: 9, percentage: 13, color: "bg-lime-500" },
    { stars: 3, count: 2, percentage: 3, color: "bg-yellow-500" },
    { stars: 2, count: 2, percentage: 3, color: "bg-orange-500" },
    { stars: 1, count: 16, percentage: 23, color: "bg-red-500" }
];
