"use client";

import React, { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import { mockCampaigns } from "@/lib/data/campaigns";
import ChatHeader from "@/components/brand/campaigns/chat/ChatHeader";
import PinnedMessage from "@/components/brand/campaigns/chat/PinnedMessage";
import MessageItem, { Message } from "@/components/brand/campaigns/chat/MessageItem";
import ChatInput from "@/components/brand/campaigns/chat/ChatInput";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { MOCK_MESSAGES } from "@/lib/data/chat";

export default function ChatPage() {
    const params = useParams();
    const campaignId = params.campaign as string;
    const campaign = mockCampaigns.find(c => c.id === campaignId);
    
    const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
    const [replyingTo, setReplyingTo] = useState<Message | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleReply = (message: Message) => {
        setReplyingTo(message);
    };

    const handleSendMessage = (text: string) => {
        const newMessage: Message = {
            id: Date.now().toString(),
            author: { name: "You (Brand)", color: "#f97316" },
            content: text,
            timestamp: "Just now",
            replyToId: replyingTo?.id,
            replyToAuthor: replyingTo?.author.name,
            replyToContent: replyingTo?.content.substring(0, 50) + (replyingTo?.content.length! > 50 ? "..." : ""),
        };
        setMessages([...messages, newMessage]);
    };

    const campaignName = campaign?.name || "Campaign";

    return (
        <div className="flex flex-col h-full bg-(--color-bg-primary) overflow-hidden border-l border-(--color-border)">
            <ChatHeader campaignName={campaignName} />
            
            <div className="lg:hidden px-4 pt-4 bg-(--color-bg-primary)">
                <Link href={`/brand/campaigns/${campaignId}`} className="flex items-center gap-2 text-(--color-text-secondary) hover:text-(--color-text-primary) mb-6 transition-colors font-medium">
                    <ChevronLeft className="w-5 h-5" />
                    <span>Back to Menu</span>
                </Link>
            </div>

            <div className="hidden lg:flex px-8 pt-4 bg-(--color-bg-primary)">
                <Link href="/brand/campaigns" className="flex items-center gap-2 text-(--color-text-secondary) hover:text-(--color-text-primary) mb-4 transition-colors font-medium">
                    <ChevronLeft className="w-5 h-5" />
                    <span>Back to Campaigns</span>
                </Link>
            </div>

            <PinnedMessage 
                campaignName={campaignName}
                pinnedContent={`Welcome to ${campaignName}'s official chat! Use this space to coordinate with creators and share important updates about the campaign.`}
            />

            {/* Chat History */}
            <div 
                ref={scrollRef}
                className="flex-1 min-h-0 overflow-y-auto custom-scrollbar pt-4 flex flex-col"
            >
                <div className="flex-1" /> {/* Spacer */}
                
                <div className="flex flex-col mt-auto">
                    <div className="px-4 py-8 flex flex-col items-center justify-center text-center opacity-40">
                        <div className="w-16 h-16 bg-(--color-bg-tertiary) rounded-full flex items-center justify-center mb-6">
                            <span className="text-2xl font-bold">#</span>
                        </div>
                        <h3 className="text-xl font-bold mb-1">Welcome to {campaignName}'s Chat!</h3>
                        <p className="text-sm max-w-sm">
                            This is the start of the #{campaignName}'s Chat history. 
                            Communicate with all your creators here!
                        </p>
                    </div>

                    <div className="h-px bg-(--color-border) mx-4 my-8 relative">
                        <span className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-(--color-bg-primary) px-4 text-[10px] font-bold text-(--color-text-muted) uppercase tracking-widest">
                            Beginning of Message History
                        </span>
                    </div>

                    {messages.map((m, idx) => (
                        <MessageItem 
                            key={m.id} 
                            message={m} 
                            onReply={handleReply}
                            isLastInGroup={idx === messages.length - 1}
                        />
                    ))}
                </div>
            </div>

            <ChatInput 
                campaignName={campaignName} 
                replyingTo={replyingTo}
                onCancelReply={() => setReplyingTo(null)}
                onSendMessage={handleSendMessage}
            />
        </div>
    );
}
