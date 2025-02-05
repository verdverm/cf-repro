import Link from 'next/link';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

import ATProtoLogin from "@/components/atproto/login-button"

import { cn } from '@/lib/utils';

export default function TopBar(props: {
  crumbs?: [string]
}) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2">
      <div className="flex items-center gap-2 px-4 w-full">
        <SidebarTrigger className="-ml-1" />

        <Separator orientation="vertical" className="mr-2 h-4" />

        <Link href="/" className="flex gap-2">
          <Avatar className="h-10 w-10 rounded-lg">
            <AvatarImage src="/web-app-manifest-192x192.png" alt="verdverm" />
            <AvatarFallback className="rounded-lg">VV</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">verdverm</span>
            <span className="truncate text-xs">a personal atproto site</span>
          </div>
        </Link>

        <span>
          { props.crumbs?.map ((c) => {
            return (
              <div key={c} className="flex items-center gap-2 px-4">
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Link href={`/${c}`}>{c}</Link>

            </div>)
          })}
        </span>

        <ATProtoLogin className="ml-auto"/>

      </div>
    </header>
  )
}