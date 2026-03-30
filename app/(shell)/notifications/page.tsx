"use client";

import React, { useState } from "react";
import { Bell, Check, Filter } from "lucide-react";

// Notification types
type NotificationType = "post" | "update" | "announcement" | "system";

interface Notification {
  id: string;
  type: NotificationType;
  user: {
    name: string;
    username: string;
    avatar: string;
  };
  action: string;
  description: string;
  date: string;
  isRead: boolean;
  section?: "today" | "earlier";
}

// Sample notification data matching the reference image
const notificationsData: Notification[] = [
  {
    id: "1",
    type: "post",
    user: {
      name: "Nathan Johnson",
      username: "@everyone",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=nathan1"
    },
    action: "posted",
    description: "giveaway live, plsep announcements channel",
    date: "Feb 10, 2026",
    isRead: false,
    section: "today"
  },
  {
    id: "2",
    type: "post",
    user: {
      name: "Nathan Johnson",
      username: "@everyone",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=nathan2"
    },
    action: "posted",
    description: "$200 giveaway, free entry",
    date: "Feb 10, 2026",
    isRead: false,
    section: "today"
  },
  {
    id: "3",
    type: "post",
    user: {
      name: "Clipr Mod Team",
      username: "Clipr Mod Team",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=clipr1"
    },
    action: "posted",
    description: "Fanatics ✨",
    date: "Feb 4, 2026",
    isRead: true,
    section: "earlier"
  },
  {
    id: "4",
    type: "post",
    user: {
      name: "Clipr Mod Team",
      username: "Clipr Mod Team",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=clipr2"
    },
    action: "posted",
    description: "Fanatics SUBMISSION FORM:",
    date: "Feb 4, 2026",
    isRead: true,
    section: "earlier"
  },
  {
    id: "5",
    type: "update",
    user: {
      name: "Clipr Mod Team",
      username: "Clipr Mod Team",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=clipr3"
    },
    action: "posted",
    description: "CPM for Harry Jowsey Fan Edits has increased to $5!",
    date: "Jan 27, 2026",
    isRead: true,
    section: "earlier"
  },
  {
    id: "6",
    type: "update",
    user: {
      name: "Clipr Mod Team",
      username: "Clipr Mod Team",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=clipr4"
    },
    action: "posted",
    description: "Crown Coins Logo Campaign Rules Update 🚨",
    date: "Jan 15, 2026",
    isRead: true,
    section: "earlier"
  },
  {
    id: "7",
    type: "announcement",
    user: {
      name: "Clipr Mod Team",
      username: "Clipr Mod Team",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=clipr5"
    },
    action: "posted",
    description: "🚨 Reminder for Everyone: [READ INSTRUCTIONS PROPERLY]",
    date: "Jan 12, 2026",
    isRead: true,
    section: "earlier"
  },
  {
    id: "8",
    type: "post",
    user: {
      name: "Clipr Mod Team",
      username: "Clipr Mod Team",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=clipr6"
    },
    action: "posted",
    description: "New Rule for the Crown Coins Logo Campaign and Crown Coins x Terence Crawford! 🚨",
    date: "Jan 9, 2026",
    isRead: true,
    section: "earlier"
  },
  {
    id: "9",
    type: "post",
    user: {
      name: "Clipr Mod Team",
      username: "Clipr Mod Team",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=clipr7"
    },
    action: "posted",
    description: "Harry Jowsey Fan Edits 🔥",
    date: "Jan 4, 2026",
    isRead: true,
    section: "earlier"
  },
  {
    id: "10",
    type: "post",
    user: {
      name: "Clipr Mod Team",
      username: "Clipr Mod Team",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=clipr8"
    },
    action: "posted",
    description: "Harry Jowsey Fan Edits SUBMISSION FORM:",
    date: "Jan 4, 2026",
    isRead: true,
    section: "earlier"
  }
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(notificationsData);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const filteredNotifications = filter === "unread" 
    ? notifications.filter(n => !n.isRead)
    : notifications;

  const todayNotifications = filteredNotifications.filter(n => n.section === "today");
  const earlierNotifications = filteredNotifications.filter(n => n.section === "earlier");

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const NotificationItem = ({ notification }: { notification: Notification }) => (
    <div 
      className={`flex items-center justify-between px-6 py-4 hover:bg-muted/30 transition-colors border-b border-border/50 cursor-pointer group ${
        !notification.isRead ? 'bg-muted/10' : ''
      }`}
      onClick={() => markAsRead(notification.id)}
    >
      {/* Left side - Avatar and Content */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-muted border border-border">
            <img 
              src={notification.user.avatar} 
              alt={notification.user.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-sm font-semibold text-foreground">
              {notification.user.name}
            </span>
            <span className="text-sm text-muted-foreground">
              {notification.action}
            </span>
          </div>
          <p className="text-sm text-foreground mt-0.5 line-clamp-1">
            {notification.description}
          </p>
        </div>
      </div>

      {/* Right side - Date */}
      <div className="flex items-center gap-3 flex-shrink-0 ml-4">
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {notification.date}
        </span>
        {!notification.isRead && (
          <div className="w-2 h-2 rounded-full bg-[#d4af37]"></div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="w-full px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="text-foreground" size={24} />
              <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
              {unreadCount > 0 && (
                <span className="px-2.5 py-0.5 bg-[#d4af37] text-background text-xs font-bold rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              {/* Filter Toggle */}
              <button
                onClick={() => setFilter(filter === "all" ? "unread" : "all")}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filter === "unread" 
                    ? 'bg-[#d4af37] text-background' 
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                <Filter size={16} />
                <span className="hidden sm:inline">{filter === "all" ? "All" : "Unread"}</span>
              </button>

              {/* Mark all as read */}
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="flex items-center gap-2 px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-lg text-sm font-medium transition-colors"
                >
                  <Check size={16} />
                  <span className="hidden sm:inline">Mark all read</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Notifications List - Full Width */}
      <div className="w-full">
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="w-16 h-16 bg-muted/30 rounded-2xl flex items-center justify-center mb-4 border border-border">
              <Bell className="text-muted-foreground" size={32} />
            </div>
            <h3 className="text-lg font-bold mb-2">No notifications</h3>
            <p className="text-sm text-muted-foreground text-center max-w-sm">
              {filter === "unread" 
                ? "You&apos;re all caught up! No unread notifications."
                : "You don&apos;t have any notifications yet."}
            </p>
          </div>
        ) : (
          <>
            {/* Today Section */}
            {todayNotifications.length > 0 && (
              <div>
                <div className="sticky top-[73px] bg-background/95 backdrop-blur-sm px-6 py-3 border-b border-border">
                  <h2 className="text-sm font-bold text-foreground">Today</h2>
                </div>
                {todayNotifications.map(notification => (
                  <NotificationItem key={notification.id} notification={notification} />
                ))}
              </div>
            )}

            {/* Earlier Section */}
            {earlierNotifications.length > 0 && (
              <div>
                <div className="sticky top-[73px] bg-background/95 backdrop-blur-sm px-6 py-3 border-b border-border">
                  <h2 className="text-sm font-bold text-foreground">EARLIER</h2>
                </div>
                {earlierNotifications.map(notification => (
                  <NotificationItem key={notification.id} notification={notification} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
