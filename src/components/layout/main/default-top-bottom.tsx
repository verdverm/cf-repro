import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import { AppSidebar } from "@/components/layout/app-sidebar"
import TopBar from '@/components/layout/top-bar'


export default function LayoutMainDefaultTopBottom({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <TopBar />
      <div>
        <AppSidebar />
        <SidebarInset>
          {children}
        </SidebarInset> 
      </div>
    </SidebarProvider>
  );
}
