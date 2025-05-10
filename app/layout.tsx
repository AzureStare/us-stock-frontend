"use client" // Required for usePathname

import type { Metadata } from 'next'
import { usePathname } from 'next/navigation' // For conditional layout
import './globals.css'
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { TopNav } from "@/components/top-nav"

// Metadata export removed because "use client" directive is used in this file.
// Metadata should be handled differently, e.g., in page components or via generateMetadata if needed.
// export const metadata: Metadata = {
//   title: 'v0 App',
//   description: 'Created with v0',
//   generator: 'v0.dev',
// }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const noShellRoutes = ["/login", "/forgot-password"] // Add other routes that shouldn't have the shell

  if (noShellRoutes.includes(pathname)) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    )
  }

  // Default layout with App Shell
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <div className="flex min-h-screen flex-col">
            <TopNav />
            <div className="flex flex-1">
              <AppSidebar />
              <main className="flex-1 p-6">{children}</main>
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  )
}
