import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import { AppSidebar } from "@/components/layout/app-sidebar"
import TopBar from '@/components/layout/top-bar'


export default function LayoutMainDefaultLeftRight({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <TopBar />
        {children}

      </SidebarInset>
    </SidebarProvider>
  );
}