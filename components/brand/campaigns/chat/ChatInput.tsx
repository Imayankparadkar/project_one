"use client";

import React, { useState } from "react";
import { PlusCircle, Smile, StickyNote, Gift, Mic, X, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Message } from "./MessageItem";

interface ChatInputProps {
    campaignName: string;
    replyingTo: Message | null;
    onCancelReply: () => void;
    onSendMessage: (text: string) => void;
}

export default function ChatInput({ campaignName, replyingTo, onCancelReply, onSendMessage }: ChatInputProps) {
    const [message, setMessage] = useState("");

    const handleSend = () => {
        if (message.trim()) {
            onSendMessage(message);
            setMessage("");
            onCancelReply();
        }
    };

    return (
        <div className="px-4 pb-4 lg:pb-6 bg-(--color-bg-primary) border-t border-(--color-border) pt-2">
            {/* Reply Preview */}
            {replyingTo && (
                <div className="flex items-center justify-between bg-(--color-bg-secondary) border border-(--color-border) rounded-t-xl px-4 py-2 border-b-0 transition-all">
                    <div className="flex items-center gap-2 overflow-hidden">
                        <span className="text-xs text-(--color-text-muted)">Replying to</span>
                        <span className="text-xs font-bold text-(--color-text-secondary) whitespace-nowrap">
                            {replyingTo.author.name}
                        </span>
                        <span className="text-xs text-(--color-text-muted) truncate italic">
                            "{replyingTo.content}"
                        </span>
                    </div>
                    <button 
                        onClick={onCancelReply}
                        className="p-1 hover:bg-(--color-surface-hover) rounded-full text-(--color-text-muted) transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}

            <div className={cn(
                "flex items-center gap-3 bg-(--color-bg-secondary) border border-(--color-border) p-2",
                replyingTo ? "rounded-b-xl" : "rounded-xl"
            )}>
                <button className="p-2 text-(--color-text-muted) hover:text-(--color-text-primary) transition-colors">
                    <PlusCircle className="w-5 h-5" />
                </button>

                <input 
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder={`Message ${campaignName}'s Chat`}
                    className="flex-1 bg-transparent border-none outline-none text-sm text-(--color-text-primary) placeholder:text-(--color-text-muted)"
                />

                <div className="flex items-center gap-2 pr-2">
                    <button className="hidden sm:flex p-1.5 text-(--color-text-muted) hover:text-(--color-text-primary) transition-colors">
                        <Smile className="w-5 h-5" />
                    </button>
                    <button className="hidden sm:flex p-1.5 text-(--color-text-muted) hover:text-(--color-text-primary) transition-colors">
                        <StickyNote className="w-5 h-5" />
                    </button>
                    <button className="hidden sm:flex p-1.5 text-(--color-text-muted) hover:text-(--color-text-primary) transition-colors">
                        <Gift className="w-5 h-5" />
                    </button>
                    <button className="p-1.5 text-(--color-text-muted) hover:text-(--color-text-primary) transition-colors">
                        <Mic className="w-5 h-5" />
                    </button>
                    {message.trim() && (
                        <button 
                            onClick={handleSend}
                            className="p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all active:scale-95"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
