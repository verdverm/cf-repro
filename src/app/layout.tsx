import Script from 'next/script';
import type { Metadata } from "next";
import { Inter } from "next/font/google"
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import LayoutMainDefaultLeftRight from "@/components/layout/main/default-left-right";
import LayoutMainDefaultTopBottom from "@/components/layout/main/default-top-bottom";

const inter = Inter({ subsets: ['latin']})

export const metadata: Metadata = {
  title: {
    default: "verdverm",
    template: `%s | verdverm`
  },
  description: "a personal @atproto site",
  icons: {
    icon: '/favicon.ico'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen font-sans antialiased",
        inter.className
      )}>
        {/* <LayoutMainDefaultTopBottom>
          {children}
        </LayoutMainDefaultTopBottom> */}
        <LayoutMainDefaultLeftRight>
          {children}
        </LayoutMainDefaultLeftRight>

      </body>
    </html>
  );
}
