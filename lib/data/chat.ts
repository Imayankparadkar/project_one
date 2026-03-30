import { Message } from "@/components/brand/campaigns/chat/MessageItem";

export const MOCK_MESSAGES: Message[] = [
    {
        id: "1",
        author: { name: "Prime Moment Clipper", color: "#6366f1" },
        content: "Reason behind rejection is mentioned. Only few videos are remaining to be reviewed, will review them very soon! Keep posting, keep getting views 📈 and get paid 💰.",
        timestamp: "Yesterday at 6:27 PM",
        reactions: [
            { emoji: "❤️", count: 1, active: true },
            { emoji: "🚀", count: 0 }
        ],
        readBy: 5
    },
    {
        id: "2",
        author: { name: "ClipItUp Community Bot", isBot: true, color: "#10b981" },
        content: "Okay.",
        timestamp: "Yesterday at 6:49 PM",
        replyToId: "1",
        replyToAuthor: "Prime Moment Clipper",
        replyToContent: "Reason behind rejection is mentioned...",
        reactions: [
            { emoji: "😆", count: 1, active: true }
        ],
        readBy: 5
    },
    {
        id: "3",
        author: { name: "Prime Moment Clipper", color: "#6366f1" },
        content: "Hello chat. If anyone have any doubt. Make sure to msg me directly! I will solve it and give you the solution!",
        timestamp: "Yesterday at 9:49 PM",
        reactions: [
            { emoji: "❤️", count: 0 },
            { emoji: "👍", count: 0 }
        ],
        readBy: 3
    }
];
