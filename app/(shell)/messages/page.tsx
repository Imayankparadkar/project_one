"use client";

import React, { useState } from "react";
import { Search, Edit, Send, Smile, Image as ImageIcon, Paperclip, MoreVertical } from "lucide-react";
import { playSound } from "@/lib/sounds";

// ... (rest of imports and interfaces)

interface Message {
  id: string;
  sender: "user" | "other";
  content: string;
  timestamp: string;
  date?: string;
}

interface Conversation {
  id: string;
  user: {
    name: string;
    username: string;
    avatar: string;
    isOnline?: boolean;
  };
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  messages: Message[];
}

// Sample conversations data
const conversationsData: Conversation[] = [
  {
    id: "1",
    user: {
      name: "Batelo",
      username: "@batelo",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=batelo",
      isOnline: true
    },
    lastMessage: "Batelo: Hey hitesh!. Thank's for installing...",
    timestamp: "8:43pm",
    unread: true,
    messages: [
      { id: "1", sender: "other", content: "Hey hitesh!", timestamp: "8:43 PM", date: "Feb 05, 2026 8:43 AM" },
      { id: "2", sender: "other", content: "Thank's for installing our app!", timestamp: "8:43 PM" }
    ]
  },
  {
    id: "2",
    user: {
      name: "Damian",
      username: "@damian",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=damian",
      isOnline: true
    },
    lastMessage: "Damian: Hey hitesh 🎉 Damian here — I ...",
    timestamp: "6:42pm",
    unread: true,
    messages: [
      { id: "1", sender: "other", content: "Hey hitesh 🎉", timestamp: "6:42 PM" },
      { id: "2", sender: "other", content: "Damian here — I wanted to reach out!", timestamp: "6:42 PM" }
    ]
  },
  {
    id: "3",
    user: {
      name: "Mahesh Singh",
      username: "@maheshsingh",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mahesh"
    },
    lastMessage: "Mahesh Singh: Yes",
    timestamp: "Tue",
    unread: false,
    messages: [
      { id: "1", sender: "other", content: "Yes", timestamp: "8:43 AM", date: "Feb 05, 2026 8:43 AM" },
      { id: "2", sender: "user", content: "How many pages u have and of what niche", timestamp: "11:30 AM", date: "Feb 05, 2026 11:30 AM" },
      { id: "3", sender: "other", content: "are u working in whop", timestamp: "10:57 PM", date: "Sunday 10:57 PM" },
      { id: "4", sender: "other", content: "Hey?", timestamp: "11:05 AM", date: "Monday 11:05 AM" },
      { id: "5", sender: "other", content: "Yes", timestamp: "2:57 PM", date: "Tuesday 2:57 PM" }
    ]
  },
  {
    id: "4",
    user: {
      name: "Peter Matrix",
      username: "@petermatrix",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=peter"
    },
    lastMessage: "Peter Matrix: How was your day going ?",
    timestamp: "Thu",
    unread: false,
    messages: [
      { id: "1", sender: "other", content: "Hey there!", timestamp: "10:30 AM" },
      { id: "2", sender: "other", content: "How was your day going ?", timestamp: "10:31 AM" }
    ]
  },
  {
    id: "5",
    user: {
      name: "Gabriel",
      username: "@gabriel",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=gabriel"
    },
    lastMessage: "Gabriel: 🎉 hey hitesh, welcome aboard! ...",
    timestamp: "9/1",
    unread: false,
    messages: [
      { id: "1", sender: "other", content: "🎉 hey hitesh, welcome aboard!", timestamp: "9:15 AM" }
    ]
  }
];

// Suggested users for empty state
const suggestedUsers = [
  { name: "Cameron Barr", username: "@cambarr", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=cameron" },
  { name: "Brent Taylor", username: "@brenttaylor42", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=brent" },
  { name: "Dawson", username: "@dawsonics", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=dawson" },
  { name: "Naya", username: "@nayasukhr", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=naya" },
  { name: "Lufa", username: "@lusqmz", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lufa" }
];

export default function MessagesPage() {
  const [conversations] = useState<Conversation[]>(conversationsData);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [activeTab, setActiveTab] = useState<"unread" | "requests">("unread");

  const filteredConversations = conversations.filter(conv =>
    conv.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const unreadConversations = filteredConversations.filter(conv => conv.unread);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Handle message sending logic here
      playSound('message'); // Trigger sound for visual/audio feedback
      setMessageInput("");
    }
  };

  return (
    <div className="flex h-full bg-background overflow-hidden">
      {/* Left Sidebar - Conversations List */}
      <div className={`w-full md:w-80 lg:w-96 border-r border-border flex flex-col bg-background z-10 ${selectedConversation ? "hidden md:flex" : "flex"}`}>
        {/* Search Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 bg-muted/50 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#d4af37]/20 focus:border-[#d4af37]/50 transition-all"
              />
            </div>
            <button className="p-2 hover:bg-muted rounded-lg transition-colors">
              <Edit size={20} className="text-foreground" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("unread")}
              className={`text-sm font-medium pb-2 border-b-2 transition-colors ${activeTab === "unread"
                ? "border-[#d4af37] text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
            >
              Unread {unreadConversations.length > 0 && (
                <span className="ml-1 text-xs bg-red-500 text-text-primary px-1.5 py-0.5 rounded-full">
                  {unreadConversations.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("requests")}
              className={`text-sm font-medium pb-2 border-b-2 transition-colors ${activeTab === "requests"
                ? "border-[#d4af37] text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
            >
              Requests
            </button>
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center p-8 text-center h-full">
              <div className="w-20 h-20 bg-muted/30 rounded-full flex items-center justify-center mb-4">
                <div className="text-4xl">💬</div>
              </div>
              <h3 className="text-lg font-bold mb-2">Welcome to BennyBucks DMs!</h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-xs">
                You can now direct message anyone on BennyBucks. Give it a try!
              </p>
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-text-primary rounded-full text-sm font-medium transition-colors">
                Search for a user
              </button>

              {/* Suggested Users */}
              <div className="w-full mt-8">
                <h4 className="text-xs font-semibold text-muted-foreground mb-3 text-left">Suggested</h4>
                <div className="space-y-1">
                  {suggestedUsers.map((user, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 hover:bg-muted/50 rounded-lg cursor-pointer transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">{user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.username}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            filteredConversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedConversation(conv)}
                className={`flex items-start gap-3 p-4 hover:bg-muted/50 cursor-pointer transition-colors border-b border-border/50 ${selectedConversation?.id === conv.id ? "bg-muted/30" : ""
                  }`}
              >
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                    <img src={conv.user.avatar} alt={conv.user.name} className="w-full h-full object-cover" />
                  </div>
                  {conv.user.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-background rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between mb-1">
                    <h4 className="text-sm font-semibold text-foreground truncate">{conv.user.name}</h4>
                    <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">{conv.timestamp}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                </div>
                {conv.unread && (
                  <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0 mt-2"></div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right Side - Chat Area */}
      <div className={`flex-1 flex flex-col bg-background w-full md:relative absolute md:static inset-0 z-20 transition-transform duration-300 ${selectedConversation ? "translate-x-0" : "translate-x-full md:translate-x-0"}`}>
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="h-16 border-b border-border flex items-center justify-between px-4 md:px-6 shrink-0 bg-background/80 backdrop-blur-md sticky top-0 z-30">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedConversation(null)}
                  className="md:hidden p-2 -ml-2 hover:bg-muted rounded-full transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
                </button>
                <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
                  <img src={selectedConversation.user.avatar} alt={selectedConversation.user.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{selectedConversation.user.name}</h3>
                  <p className="text-xs text-muted-foreground">{selectedConversation.user.username}</p>
                </div>
              </div>
              <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                <MoreVertical size={20} className="text-foreground" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 pb-32 md:pb-4 scroll-smooth">
              {selectedConversation.messages.map((message) => (
                <div key={message.id}>
                  {message.date && (
                    <div className="text-center mb-4">
                      <span className="text-xs text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
                        {message.date}
                      </span>
                    </div>
                  )}
                  <div className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] md:max-w-md ${message.sender === "user" ? "order-2" : "order-1"}`}>
                      {message.sender === "other" && (
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-6 h-6 rounded-full overflow-hidden bg-muted">
                            <img src={selectedConversation.user.avatar} alt="" className="w-full h-full object-cover" />
                          </div>
                          <span className="text-xs font-medium text-foreground">{selectedConversation.user.name}</span>
                          <span className="text-xs text-muted-foreground">• {message.timestamp}</span>
                        </div>
                      )}
                      <div
                        className={`px-4 py-2 rounded-2xl break-words ${message.sender === "user"
                          ? "bg-blue-600 text-text-primary rounded-tr-none"
                          : "bg-muted text-foreground rounded-tl-none"
                          }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                      {message.sender === "user" && (
                        <div className="text-right mt-1">
                          <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="fixed bottom-16 left-0 right-0 md:static md:bottom-0 border-t border-border p-3 md:p-4 bg-background z-40">
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-muted text-muted-foreground hover:text-foreground rounded-full transition-colors">
                  <ImageIcon size={20} />
                </button>
                <div className="flex-1 flex items-center gap-2 bg-muted/50 border border-border rounded-full px-4 py-2">
                  <input
                    type="text"
                    placeholder="Message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none min-w-0"
                  />
                  <button className="p-1 hover:text-foreground text-muted-foreground transition-colors">
                    <Smile size={20} />
                  </button>
                  <button className="p-1 hover:text-foreground text-muted-foreground transition-colors">
                    <Paperclip size={18} />
                  </button>
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim()}
                  className="p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-muted disabled:cursor-not-allowed rounded-full transition-colors flex-shrink-0 text-text-primary shadow-sm"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </>
        ) : (
          /* No Conversation Selected */
          <div className="hidden md:flex flex-1 items-center justify-center">
            <div className="text-center max-w-md p-8">
              <div className="w-24 h-24 bg-muted/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <div className="text-6xl">👀</div>
              </div>
              <h3 className="text-xl font-bold mb-2">Select a message</h3>
              <p className="text-sm text-muted-foreground">
                Choose from your existing conversations, start a new one, or just keep swimming.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
