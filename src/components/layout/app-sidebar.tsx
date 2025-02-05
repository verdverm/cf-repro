"use client"

import * as React from "react"
import Image from 'next/image'
import Link from 'next/link'

import BlueskyButterfly from "@/components/atproto/bluesky-butterfly"

import {
  AtSign,
  Blocks,
  Boxes,
  BrainCircuit,
  ChevronRight,
  Codepen,
  Github,
  HardHat,
  LayoutList,
  LibraryBig,
  NotebookPen,
  SquareTerminal,
  UserPen,
  Variable,
  WandSparkles,
  type LucideIcon,
} from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  // useSidebar,
} from "@/components/ui/sidebar"

const Fofx = ()=>{
  return(<span className="flex items-center ml-[-6]">f<Variable size={18}/></span>)
}

const data = {
  navMain: [
    {
      title: "Blog",
      url: "/blog",
      icon: NotebookPen,
      // isActive: false,
      // items: [
      //   {
      //     title: "History",
      //     url: "#",
      //     icon: FolderClock,
      //   },
      //   {
      //     title: "Bookmarks",
      //     url: "#",
      //     icon: Bookmark,
      //   },
      // ],
    },
    {
      // writing and sharing what I'm learning about
      title: "Topics",
      url: "/topics",
      icon: LibraryBig,
      isActive: true,
      items: [
        {
          title: "ATProto",
          url: "/topics/atproto",
          icon: AtSign,
        },
        {
          title: "Cuelang",
          url: "/topics/cuelang",
          icon: Codepen,
        },
        {
          title: "Development",
          url: "/topics/development",
          icon: SquareTerminal,
        },
        // {
        //   title: "Machine Learning",
        //   url: "/machine-learning",
        //   icon: WandSparkles,
        // },
        // {
        //   title: "Reading",
        //   url: "/reading",
        //   icon: WandSparkles,
        // },
        // {
        //   title: "Changelog",
        //   url: "/changelog",
        //   icon: WandSparkles,
        // },
      ],
    },
    {
      title: "Projects",
      url: "/projects",
      icon: HardHat,
      isActive: true,
      items: [
        {
          title: "pge",
          url: "/projects/pge",
          icon: Fofx,
        },
        {
          title: "hofstadter",
          url: "/projects/hofstadter",
          icon: SquareTerminal,
        },
      ],
    },

    //
    // How can we turn this into a tree, graph, union, CUE?
    //
    {
      title: "ATProto Feeds",
      url: "",
      icon: LayoutList,
      isActive: true,
      items: [ {
        title: "ATProtoDev",
        url: "https://bsky.app/profile/verdverm.com/feed/atprotodev",
        icon: AtSign,
      }, {
        title: "Cuelang",
        url: "https://bsky.app/profile/verdverm.com/feed/cuelang",
        icon: Codepen,
      }, {
        title: "ML & AI",
        url: "https://bsky.app/profile/verdverm.com/feed/verdverm-ml",
        icon: BrainCircuit,
      }, {
        title: "Hermitcraft",
        url: "https://bsky.app/profile/verdverm.com/feed/hermitcraft",
        icon: Boxes,
      }, {
        title: "Me Feed",
        url: "https://bsky.app/profile/verdverm.com/feed/me",
        icon: UserPen,
      }],
    },
  ],
  navSecondary: [
    {
      title: "Consulting",
      url: "/consulting",
      icon: WandSparkles,
    },
    {
      title: "GitHub",
      url: "https://github.com/verdverm",
      icon: Github,
    },
    {
      title: "Bluesky",
      url: "https://bsky.app/profile/verdverm.com",
      icon: BlueskyButterfly,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <Image src="/viva-la-resistance.png" width={3000} height={1000} alt="viva la resistance"/>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <span className="text-xs text-center">
          Copyright @ 2025 - verdverm.com
        </span>
      </SidebarFooter>
    </Sidebar>
  )
}

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      icon: LucideIcon
      url: string
    }[]
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={item.title}>
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
              {item.items?.length ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                      <ChevronRight />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <Link href={subItem.url}>
                              { subItem.icon && <subItem.icon /> }
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : null}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}


export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
  }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild size="sm">
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}