// "use client" // No longer needed if we only render children

import type React from "react"

// Removed imports for SidebarProvider, AppSidebar, TopNav, useState, useEffect, usePathname
// as the main app shell is now handled by the root app/layout.tsx

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // This layout now simply passes through its children, as the main app shell
  // is provided by the root layout (app/layout.tsx) for all authenticated pages.
  return <>{children}</>
}
