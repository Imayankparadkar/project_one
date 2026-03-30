"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { CornerDownRight, Reply, Smile, MoreHorizontal } from "lucide-react";

export interface Message {
    id: string;
    author: {
        name: string;
        avatar?: string;
        isBot?: boolean;
        color?: string;
    };
    content: string;
    timestamp: string;
    replyToId?: string;
    replyToAuthor?: string;
    replyToContent?: string;
    reactions?: Array<{ emoji: string; count: number; active?: boolean }>;
    readBy?: number;
}

interface MessageItemProps {
    message: Message;
    onReply: (message: Message) => void;
    isLastInGroup?: boolean;
}

export default function MessageItem({ message, onReply, isLastInGroup }: MessageItemProps) {
    return (
        <div className={cn(
            "group relative flex flex-col px-4 py-1 hover:bg-(--color-surface-hover) transition-colors mb-4",
            message.replyToId && "mt-6"
        )}>
            {/* Reply Context (Thread/Connector) */}
            {message.replyToId && (
                <div className="absolute left-9 bottom-full h-8 w-8 border-l-2 border-t-2 border-(--color-border) rounded-tl-xl ml-[-1px] mb-[-4px]" />
            )}
            
            {message.replyToId && (
                <div className="flex items-center gap-2 ml-12 mb-1 opacity-70">
                    <div className="w-4 h-4 rounded-full bg-(--color-bg-tertiary) flex items-center justify-center text-[10px] font-bold">
                        {message.replyToAuthor?.charAt(0)}
                    </div>
                    <span className="text-xs font-bold text-(--color-text-secondary)">
                        {message.replyToAuthor}
                    </span>
                    <span className="text-xs text-(--color-text-muted) truncate max-w-[200px]">
                        {message.replyToContent}
                    </span>
                </div>
            )}

            <div className="flex gap-4">
                {/* Avatar */}
                <div className="shrink-0 pt-0.5">
                    {message.author.avatar ? (
                        <img 
                            src={message.author.avatar} 
                            alt={message.author.name} 
                            className="w-10 h-10 rounded-full object-cover border border-(--color-border)"
                        />
                    ) : (
                        <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border border-(--color-border)"
                            style={{ 
                                backgroundColor: message.author.color || "var(--color-bg-tertiary)",
                                color: "var(--color-text-primary)"
                            }}
                        >
                            {message.author.name.substring(0, 2).toUpperCase()}
                        </div>
                    )}
                </div>

                {/* Content Area */}
                <div className="flex-1 flex flex-col min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-[var(--color-text-primary)] hover:underline cursor-pointer">
                            {message.author.name}
                        </span>
                        {message.author.isBot && (
                            <span className="bg-blue-600/20 text-blue-500 text-[10px] font-black px-1.5 py-0.5 rounded-sm uppercase tracking-tight">
                                BOT
                            </span>
                        )}
                        <span className="text-xs text-(--color-text-muted)">
                            {message.timestamp}
                        </span>
                    </div>

                    <div className="relative">
                        <p className="text-sm text-(--color-text-secondary) leading-relaxed break-words whitespace-pre-wrap">
                            {message.content}
                        </p>

                        {/* Reactions */}
                        {message.reactions && message.reactions.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                                {message.reactions.map((r, i) => (
                                    <button 
                                        key={i}
                                        className={cn(
                                            "flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-xs font-medium transition-all",
                                            r.active 
                                                ? "bg-orange-500/10 border-orange-500/30 text-orange-500" 
                                                : "bg-(--color-bg-secondary) border-(--color-border) text-(--color-text-secondary) hover:border-(--color-text-muted)"
                                        )}
                                    >
                                        <span>{r.emoji}</span>
                                        <span>{r.count}</span>
                                    </button>
                                ))}
                                <button className="p-1 rounded-md hover:bg-(--color-surface-hover) transition-colors text-(--color-text-muted)">
                                    <Smile className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        )}

                        {message.readBy && (
                            <span className="text-[10px] text-(--color-text-muted) block mt-1">
                                Read by {message.readBy}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Hover Actions */}
            <div className="absolute right-4 top-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
                <div className="flex items-center bg-(--color-bg-primary) border border-(--color-border) rounded-lg shadow-sm">
                    <button 
                        onClick={() => onReply(message)}
                        className="p-2 hover:bg-(--color-surface-hover) text-(--color-text-secondary) transition-colors"
                        title="Reply"
                    >
                        <Reply className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-(--color-surface-hover) text-(--color-text-secondary) transition-colors border-l border-(--color-border)">
                        <Smile className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-(--color-surface-hover) text-(--color-text-secondary) transition-colors border-l border-(--color-border)">
                        <MoreHorizontal className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
