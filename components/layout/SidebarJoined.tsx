'use client'

import { useState } from 'react'
import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  ChevronDown,
  Home,
  BookOpen,
  FolderOpen,
  Users,
  Trophy,
  FileText,
  UserRound,
  MessageCircleCode,
} from 'lucide-react'

export type SidebarItemType = {
  label: string
  href: string
  active?: boolean
}

export type SidebarSectionType = {
  key: string
  title: string
  icon: React.ReactNode
  items?: SidebarItemType[]
  href?: string
}



export const SIDEBAR_MENU: SidebarSectionType[] = [
  {
    key: 'About',
    title: 'About',
    icon: <Home size={16} />,
    href: "/joined/about"
  },
  {
    key: 'Rewards',
    title: 'Rewards',
    icon: <Trophy size={16} />,
    href: "/joined/rewards"
  },
  // {
  //   key: 'Community',
  //   title: 'Community',
  //   icon: <Users size={16} />,
  //   items: [
  //     { label: 'Chat', href: '/chat' },
  //     { label: 'Leaderboard', href: '/leaderboard' },
  //   ],
  // },

  {
    key: 'Chat',
    title: 'Chat',
    icon: <MessageCircleCode size={16} />,
    href: "/joined/chat"
  },

  {
    key: 'My Submissions',
    title: 'My Submissions',
    icon: <BookOpen size={16} />,
    href: "/joined/my-submissions"
  },

]


export default function SidebarJoined() {
  const [open, setOpen] = useState<string | null>('Home')
  const pathname = usePathname()

  return (
    <aside className="hidden md:block w-72 h-screen sticky top-0 bg-background border-r overflow-y-auto">
      {/* Header image */}
      <div className="border-b">
        <img
          src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/bb/a3/97/predator-ride-in-the.jpg?w=900&h=500&s=1"
          className="w-full"
          alt="Campaign Banner"
        />
        <div className="p-5">
          <p className="font-semibold text-sm">Rayston Heem Clipping</p>
          <span className="text-xs text-green-500 flex items-center gap-2 mt-1.5">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            Online
          </span>
        </div>
      </div>

      {/* Profile */}
      <div className="px-5 py-6 border-b flex items-center gap-4">
        <img
          src="https://placehold.co/40"
          className="h-10 w-10 rounded-lg object-cover"
          alt="Profile"
        />
        <div>
          <p className="font-semibold text-[14px] leading-tight">Rayston Heem Clipping</p>
          <p className="text-[10px] font-bold text-muted-foreground mt-0.5 tracking-wider">JOINED</p>
        </div>
      </div>

      {/* Menu */}
      <div className="px-4 py-6 space-y-2 text-[14px]">
        {SIDEBAR_MENU.map((section) =>
          section.items ? (
            <Dropdown
              key={section.key}
              title={section.title}
              icon={section.icon}
              open={open === section.key}
              onClick={() =>
                setOpen(open === section.key ? null : section.key)
              }
            >
              {section.items.map((item) => (
                <Item
                  key={item.label}
                  label={item.label}
                  href={item.href}
                  active={pathname === item.href}
                />
              ))}
            </Dropdown>
          ) : (
            <Item
              key={section.key}
              label={section.title}
              href={section.href!}
              icon={section.icon}
              active={pathname === section.href}
            />
          )
        )}
      </div>

    </aside>
  )
}
export function Dropdown({
  title,
  icon,
  open,
  onClick,
  children,
}: {
  title: string
  icon: React.ReactNode
  open: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <div>
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm transition-colors text-muted-foreground hover:bg-muted"
      >
        <div className="flex items-center gap-4">
          <span className="transition-colors text-muted-foreground">
            {icon}
          </span>
          <span className="font-medium">{title}</span>
        </div>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''} text-muted-foreground`}
        />
      </button>

      {open && (
        <div className="ml-8 mt-1 space-y-1">
          {children}
        </div>
      )}
    </div>
  )
}

export function Item({
  label,
  href,
  active,
  icon,
}: {
  label: string
  href: string
  active?: boolean
  icon?: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-4 rounded-xl px-3 py-3 text-[16px] transition-all duration-200
        ${active
          ? 'bg-muted text-foreground'
          : 'text-muted-foreground hover:bg-muted'
        }`}
    >
      <span className={`transition-colors ${active ? 'text-foreground' : 'text-muted-foreground'
        }`}>
        <span className={`${active ? '' : 'opacity-70 hover:opacity-100'
          } transition-opacity`}>
          <span className={
            active ? 'text-foreground' :
              label === 'About' ? 'text-blue-500' :
                label === 'Rewards' ? 'text-yellow-500' :
                  // label === 'Community' ? 'text-orange-500' :
                  label === 'My Submissions' ? 'text-pink-500' :
                    label === 'Chat' ? 'text-green-500' :
                      label === 'Accounts' ? 'text-cyan-500' :
                        'text-muted-foreground'
          }>
            {icon}
          </span>
        </span>
      </span>
      {label}
    </Link>
  )
}
